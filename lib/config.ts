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

export const NAV_LINKS: NavLink[] = [
  { label: "Accueil", href: "#accueil" },
  { label: "Services", href: "#services" },
  { label: "Offres", href: "#offres" },
  { label: "Réalisations", href: "#realisations" },
  { label: "Contact", href: "#contact" },
];
