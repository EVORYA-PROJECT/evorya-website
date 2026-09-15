"use server";

import { revalidatePath } from "next/cache";
import { createSupabaseServerClient } from "@/lib/supabase/server";
import type {
  OfferRow,
  ProjectInput,
  ProjectUpdate,
  SiteContentMap,
  SiteContentSection,
} from "@/lib/cms/types";

export type SaveResult = { ok: true; updatedAt?: string } | { ok: false; error: string; conflict?: boolean };

/**
 * Un incident réseau transitoire (ex. Wi-Fi instable, paquets perdus lors
 * de l'établissement de la connexion) fait échouer le `fetch` sous-jacent
 * avec `TypeError: fetch failed` (ou une annulation par timeout côté
 * lib/supabase/resilient-fetch.ts) ; postgrest-js ne retente jamais
 * automatiquement ce type d'erreur sur les requêtes non idempotentes
 * (PATCH/POST/DELETE, donc tous les enregistrements du CMS — voir
 * @supabase/postgrest-js/src/fetchWithRetry.ts), contrairement aux lectures
 * (GET) qui bénéficient déjà de 3 tentatives automatiques. C'est pour ça
 * qu'un simple aller-retour réseau raté rend une sauvegarde impossible alors
 * que la page continue de se charger normalement.
 */
const TRANSIENT_NETWORK_ERROR = /fetch failed|ECONNRESET|ETIMEDOUT|ENOTFOUND|EAI_AGAIN|ECONNREFUSED|EPIPE|ENETUNREACH|EHOSTUNREACH|UND_ERR_|AbortError|aborted/i;

function isTransientNetworkError(message: string | undefined | null): boolean {
  return !!message && TRANSIENT_NETWORK_ERROR.test(message);
}

function sleep(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

/**
 * Retente jusqu'à 2 fois un appel Supabase lorsque l'échec est un incident
 * réseau transitoire — jamais sur une vraie erreur applicative (RLS,
 * validation, conflit de version), qui doit remonter immédiatement à
 * l'utilisateur. N'invente aucun succès : si toutes les tentatives
 * échouent, la dernière erreur réelle est renvoyée telle quelle.
 */
async function withNetworkRetry<T extends { error: { message: string } | null }>(
  run: () => PromiseLike<T>,
  attempts = 3,
): Promise<T> {
  let last: T;
  for (let i = 0; i < attempts; i++) {
    last = await run();
    if (!last.error || !isTransientNetworkError(last.error.message)) return last;
    if (i < attempts - 1) await sleep(400 * (i + 1));
  }
  return last!;
}

async function requireOwner() {
  const supabase = await createSupabaseServerClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  return { supabase, user };
}

/**
 * Enregistre le contenu complet d'une section (jamais un patch partiel : les
 * éditeurs admin renvoient toujours l'objet complet de la section). Contrôle
 * de version optimiste via `expectedUpdatedAt` : si la ligne a changé ailleurs
 * entre la lecture et l'écriture, l'enregistrement est refusé plutôt que
 * d'écraser silencieusement la modification concurrente.
 */
export async function updateSiteContentSection<K extends SiteContentSection>(
  section: K,
  content: SiteContentMap[K],
  expectedUpdatedAt: string | null,
): Promise<SaveResult> {
  const { supabase, user } = await requireOwner();
  if (!user) return { ok: false, error: "Authentification requise." };

  const nowIso = new Date().toISOString();

  if (expectedUpdatedAt) {
    const { data, error } = await withNetworkRetry(() =>
      supabase
        .from("site_content")
        .update({ content, updated_at: nowIso })
        .eq("section", section)
        .eq("updated_at", expectedUpdatedAt)
        .select("updated_at"),
    );

    if (error) return { ok: false, error: error.message };
    if (data && data.length > 0) {
      revalidatePath("/");
      return { ok: true, updatedAt: nowIso };
    }

    const { data: existing, error: fetchError } = await supabase
      .from("site_content")
      .select("updated_at")
      .eq("section", section)
      .maybeSingle();
    if (fetchError) return { ok: false, error: fetchError.message };
    if (existing) {
      // La tentative précédente a en réalité été appliquée côté serveur :
      // seule sa réponse a été perdue en route (incident réseau). Ce n'est
      // pas un conflit, mais un vrai succès.
      if (existing.updated_at === nowIso) {
        revalidatePath("/");
        return { ok: true, updatedAt: nowIso };
      }
      return {
        ok: false,
        error: "Ce contenu a été modifié ailleurs entre-temps. Rechargez la page avant de réessayer.",
        conflict: true,
      };
    }
    // La ligne n'existe pas encore (migration pas encore exécutée) : on l'insère.
  }

  const { error: insertError } = await withNetworkRetry(() =>
    supabase.from("site_content").insert({ section, content, updated_at: nowIso }),
  );
  if (insertError) return { ok: false, error: insertError.message };
  revalidatePath("/");
  return { ok: true, updatedAt: nowIso };
}

export type OfferSaveInput = Omit<OfferRow, "id" | "updated_at">;

export async function saveOffer(
  id: string,
  input: OfferSaveInput,
  expectedUpdatedAt: string | null,
): Promise<SaveResult> {
  const { supabase, user } = await requireOwner();
  if (!user) return { ok: false, error: "Authentification requise." };

  const nowIso = new Date().toISOString();

  if (expectedUpdatedAt) {
    const { data, error } = await withNetworkRetry(() =>
      supabase
        .from("offers")
        .update({ ...input, updated_at: nowIso })
        .eq("id", id)
        .eq("updated_at", expectedUpdatedAt)
        .select("updated_at"),
    );

    if (error) return { ok: false, error: error.message };
    if (data && data.length > 0) {
      revalidatePath("/");
      return { ok: true, updatedAt: nowIso };
    }

    const { data: existing, error: fetchError } = await supabase
      .from("offers")
      .select("updated_at")
      .eq("id", id)
      .maybeSingle();
    if (fetchError) return { ok: false, error: fetchError.message };
    if (existing) {
      if (existing.updated_at === nowIso) {
        revalidatePath("/");
        return { ok: true, updatedAt: nowIso };
      }
      return {
        ok: false,
        error: "Cette offre a été modifiée ailleurs entre-temps. Rechargez la page avant de réessayer.",
        conflict: true,
      };
    }
  }

  const { error: insertError } = await withNetworkRetry(() =>
    supabase.from("offers").insert({ id, ...input, updated_at: nowIso }),
  );
  if (insertError) return { ok: false, error: insertError.message };
  revalidatePath("/");
  return { ok: true, updatedAt: nowIso };
}

export async function createProject(
  input: ProjectInput,
): Promise<SaveResult & { id?: string }> {
  const { supabase, user } = await requireOwner();
  if (!user) return { ok: false, error: "Authentification requise." };

  let sortOrder = input.sort_order;
  if (sortOrder === undefined) {
    const { data: maxRow } = await supabase
      .from("projects")
      .select("sort_order")
      .order("sort_order", { ascending: false })
      .limit(1)
      .maybeSingle();
    sortOrder = (maxRow?.sort_order ?? -1) + 1;
  }

  const { data, error } = await supabase
    .from("projects")
    .insert({ ...input, sort_order: sortOrder })
    .select("id")
    .single();

  if (error) return { ok: false, error: error.message };
  revalidatePath("/");
  return { ok: true, id: data.id };
}

export async function updateProject(
  id: string,
  patch: ProjectUpdate,
  expectedUpdatedAt: string,
): Promise<SaveResult> {
  const { supabase, user } = await requireOwner();
  if (!user) return { ok: false, error: "Authentification requise." };

  const nowIso = new Date().toISOString();
  const { data, error } = await withNetworkRetry(() =>
    supabase
      .from("projects")
      .update({ ...patch, updated_at: nowIso })
      .eq("id", id)
      .eq("updated_at", expectedUpdatedAt)
      .select("updated_at"),
  );

  if (error) return { ok: false, error: error.message };
  if (!data || data.length === 0) {
    const { data: existing } = await supabase
      .from("projects")
      .select("updated_at")
      .eq("id", id)
      .maybeSingle();
    if (existing?.updated_at === nowIso) {
      revalidatePath("/");
      return { ok: true, updatedAt: nowIso };
    }
    return {
      ok: false,
      error: "Cette réalisation a été modifiée ailleurs entre-temps. Rechargez la page avant de réessayer.",
      conflict: true,
    };
  }
  revalidatePath("/");
  return { ok: true, updatedAt: nowIso };
}

export async function deleteProject(id: string): Promise<SaveResult> {
  const { supabase, user } = await requireOwner();
  if (!user) return { ok: false, error: "Authentification requise." };

  const { error } = await supabase.from("projects").delete().eq("id", id);
  if (error) return { ok: false, error: error.message };
  revalidatePath("/");
  return { ok: true };
}

export async function reorderProjects(orderedIds: string[]): Promise<SaveResult> {
  const { supabase, user } = await requireOwner();
  if (!user) return { ok: false, error: "Authentification requise." };

  const results = await Promise.all(
    orderedIds.map((id, index) =>
      supabase.from("projects").update({ sort_order: index }).eq("id", id),
    ),
  );
  const failed = results.find((r) => r.error);
  if (failed?.error) return { ok: false, error: failed.error.message };
  revalidatePath("/");
  return { ok: true };
}
