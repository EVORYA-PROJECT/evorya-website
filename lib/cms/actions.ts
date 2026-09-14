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
    const { data, error } = await supabase
      .from("site_content")
      .update({ content, updated_at: nowIso })
      .eq("section", section)
      .eq("updated_at", expectedUpdatedAt)
      .select("updated_at");

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
      return {
        ok: false,
        error: "Ce contenu a été modifié ailleurs entre-temps. Rechargez la page avant de réessayer.",
        conflict: true,
      };
    }
    // La ligne n'existe pas encore (migration pas encore exécutée) : on l'insère.
  }

  const { error: insertError } = await supabase
    .from("site_content")
    .insert({ section, content, updated_at: nowIso });
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
    const { data, error } = await supabase
      .from("offers")
      .update({ ...input, updated_at: nowIso })
      .eq("id", id)
      .eq("updated_at", expectedUpdatedAt)
      .select("updated_at");

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
      return {
        ok: false,
        error: "Cette offre a été modifiée ailleurs entre-temps. Rechargez la page avant de réessayer.",
        conflict: true,
      };
    }
  }

  const { error: insertError } = await supabase
    .from("offers")
    .insert({ id, ...input, updated_at: nowIso });
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
  const { data, error } = await supabase
    .from("projects")
    .update({ ...patch, updated_at: nowIso })
    .eq("id", id)
    .eq("updated_at", expectedUpdatedAt)
    .select("updated_at");

  if (error) return { ok: false, error: error.message };
  if (!data || data.length === 0) {
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
