import "server-only";
import { createSupabaseServerClient } from "@/lib/supabase/server";
import { createSupabasePublicClient } from "@/lib/supabase/public";
import { SITE_CONTENT_DEFAULTS, OFFERS_DEFAULTS } from "@/lib/cms/defaults";
import {
  SITE_CONTENT_SECTIONS,
  type HeroContent,
  type StudioContent,
  type ServicesContent,
  type TransparencyContent,
  type ProcessContent,
  type ContactContent,
  type FooterContent,
  type First10Content,
  type OfferRow,
  type ProjectRow,
  type SiteContentMap,
  type SiteContentSection,
} from "@/lib/cms/types";
import type { OfferDbRow, SiteContentRow } from "@/types/database";

export type SiteContentQueryResult = {
  content: SiteContentMap;
  updatedAt: Partial<Record<SiteContentSection, string>>;
};

function isSiteContentSection(value: string): value is SiteContentSection {
  return (SITE_CONTENT_SECTIONS as string[]).includes(value);
}

function mergeRowsOverDefaults(rows: SiteContentRow[]): SiteContentQueryResult {
  const content: SiteContentMap = {
    hero: { ...SITE_CONTENT_DEFAULTS.hero },
    studio: { ...SITE_CONTENT_DEFAULTS.studio },
    services: { ...SITE_CONTENT_DEFAULTS.services },
    transparency: { ...SITE_CONTENT_DEFAULTS.transparency },
    process: { ...SITE_CONTENT_DEFAULTS.process },
    contact: { ...SITE_CONTENT_DEFAULTS.contact },
    footer: { ...SITE_CONTENT_DEFAULTS.footer },
    first10: { ...SITE_CONTENT_DEFAULTS.first10 },
  };
  const updatedAt: Partial<Record<SiteContentSection, string>> = {};

  for (const row of rows) {
    if (!isSiteContentSection(row.section)) continue;
    const section = row.section;
    const patch = (row.content ?? {}) as Record<string, unknown>;

    switch (section) {
      case "hero":
        content.hero = { ...content.hero, ...patch } as HeroContent;
        break;
      case "studio":
        content.studio = { ...content.studio, ...patch } as StudioContent;
        break;
      case "services":
        content.services = { ...content.services, ...patch } as ServicesContent;
        break;
      case "transparency":
        content.transparency = { ...content.transparency, ...patch } as TransparencyContent;
        break;
      case "process":
        content.process = { ...content.process, ...patch } as ProcessContent;
        break;
      case "contact":
        content.contact = { ...content.contact, ...patch } as ContactContent;
        break;
      case "footer":
        content.footer = { ...content.footer, ...patch } as FooterContent;
        break;
      case "first10":
        content.first10 = { ...content.first10, ...patch } as First10Content;
        break;
    }
    updatedAt[section] = row.updated_at;
  }

  return { content, updatedAt };
}

/**
 * Lit toutes les sections de contenu en un seul aller-retour (table minuscule,
 * 8 lignes au maximum). Si Supabase échoue ou si la table n'existe pas encore
 * (migration non exécutée), retombe sur le contenu actuellement codé en dur —
 * le site public ne doit jamais afficher de champ vide.
 */
export async function getSiteContentMap(): Promise<SiteContentQueryResult> {
  try {
    const supabase = createSupabasePublicClient();
    const { data, error } = await supabase.from("site_content").select("*");
    if (error) throw error;
    return mergeRowsOverDefaults(data ?? []);
  } catch (err) {
    console.warn("[cms] site_content indisponible, contenu par défaut utilisé :", err);
    return mergeRowsOverDefaults([]);
  }
}

function rowToOffer(row: OfferDbRow): OfferRow {
  return {
    id: row.id,
    name: row.name,
    price: row.price,
    price_note: row.price_note,
    tagline: row.tagline,
    features: Array.isArray(row.features) ? (row.features as string[]) : [],
    cta: row.cta,
    featured: row.featured,
    sort_order: row.sort_order,
    updated_at: row.updated_at,
  };
}

export async function getOffers(): Promise<OfferRow[]> {
  try {
    const supabase = createSupabasePublicClient();
    const { data, error } = await supabase
      .from("offers")
      .select("*")
      .order("sort_order", { ascending: true });
    if (error) throw error;
    if (!data || data.length === 0) return OFFERS_DEFAULTS;
    return data.map(rowToOffer);
  } catch (err) {
    console.warn("[cms] offers indisponible, contenu par défaut utilisé :", err);
    return OFFERS_DEFAULTS;
  }
}

/** Réalisations publiées uniquement — utilisé par la page publique. */
export async function getPublishedProjects(): Promise<ProjectRow[]> {
  try {
    const supabase = createSupabasePublicClient();
    const { data, error } = await supabase
      .from("projects")
      .select("*")
      .eq("published", true)
      .order("sort_order", { ascending: true });
    if (error) throw error;
    return data ?? [];
  } catch (err) {
    console.warn("[cms] projects indisponible, portfolio vide affiché :", err);
    return [];
  }
}

/**
 * Toutes les réalisations (brouillons compris) — réservé à /admin. Ne masque
 * pas les erreurs : si Supabase échoue ici, l'admin doit voir un état d'erreur
 * explicite plutôt qu'une liste vide silencieuse.
 */
export async function getAllProjectsAdmin(): Promise<ProjectRow[]> {
  const supabase = await createSupabaseServerClient();
  const { data, error } = await supabase
    .from("projects")
    .select("*")
    .order("sort_order", { ascending: true });
  if (error) throw new Error(error.message);
  return data ?? [];
}
