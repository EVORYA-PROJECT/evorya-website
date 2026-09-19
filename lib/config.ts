import type { NavLink } from "@/types";

export const SITE = {
  name: "Evorya Project",
  shortName: "Evorya",
  url: "https://evoryaproject.com",
  email: "evoryaproject@gmail.com",
  location: "Casablanca, Maroc",
  founded: "2026",
  description:
    "Evorya imagine et développe des expériences web modernes pour les entreprises qui veulent marquer les esprits dès le premier regard.",
} as const;

// Le programme "Evorya First 10" (compteur, statut, textes) est désormais
// administrable depuis /admin/first10 et stocké dans Supabase
// (site_content, section "first10") — voir lib/cms/defaults.ts pour les
// valeurs par défaut tant que la migration SQL n'a pas été exécutée.

// Interrupteur temporaire : la section publique "Réalisations" (Portfolio)
// est masquée tant qu'Evorya n'a pas assez de projets clients réels à
// montrer. Rien n'est supprimé (CMS, Supabase, upload, admin /admin/realisations
// restent intacts) — repasser à `true` réaffiche la section ET son entrée
// de navigation d'un seul coup. Voir app/page.tsx.
export const SHOW_PORTFOLIO = false;

export const NAV_LINKS: NavLink[] = [
  { label: "Accueil", href: "/#accueil" },
  { label: "Services", href: "/#services" },
  { label: "Offres", href: "/#offres" },
  { label: "Templates", href: "/templates" },
  ...(SHOW_PORTFOLIO ? [{ label: "Réalisations", href: "/#realisations" }] : []),
  { label: "Evorya First 10", href: "/#evorya-first-10" },
  { label: "Contact", href: "/#contact" },
];

// CTA persistant mobile (voir components/ui/MobileCTA.tsx) : mêmes règles
// que le CTA principal du Hero / de la navbar.
export const PRIMARY_CTA_LABEL = "Démarrer un projet";
