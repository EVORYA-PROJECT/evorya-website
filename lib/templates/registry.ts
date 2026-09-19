import type { TemplateEntry, TemplateSlug } from "@/lib/templates/types";

/**
 * Les six démonstrations sectorielles. Chacune est un faux site client
 * complet (voir app/templates/<slug>/page.tsx), pas un thème graphique
 * Evorya : direction artistique, structure et animations propres à chaque
 * secteur — voir le README du dossier app/templates pour le détail.
 *
 * Marques et contenus entièrement fictifs, à but de démonstration.
 */
export const TEMPLATES: TemplateEntry[] = [
  {
    slug: "restaurant",
    index: "01",
    sectorLabel: "Fast-food / Restauration rapide",
    brandName: "KRUSH",
    tagline: "Donner faim en trois secondes.",
    direction: "Noir profond, rouge tomate, typographie massive, photographie produit contrastée.",
    accent: "#ff3b1f",
    accentSoft: "#f4efe6",
    status: "disponible",
    coverImage: {
      src: "/templates/restaurant/hero-smash-trio.jpg",
      alt: "Trois burgers smashés au cheddar fondu alignés sur une planche",
    },
  },
  {
    slug: "immobilier",
    index: "02",
    sectorLabel: "Immobilier",
    brandName: "Atrium Immobilier",
    tagline: "Donner envie de visiter avant même le premier appel.",
    direction: "Composition architecturale, lumière naturelle, lecture précise des biens.",
    accent: "#2b3a4a",
    accentSoft: "#c9d6df",
    status: "disponible",
    coverImage: {
      src: "/templates/immobilier/immeuble-balcons.jpg",
      alt: "Façade contemporaine à balcons blancs",
    },
  },
  {
    slug: "hotel",
    index: "03",
    sectorLabel: "Hôtel / Riad",
    brandName: "Riad Zellige",
    tagline: "Faire ressentir le séjour avant la réservation.",
    direction: "Immersion sensorielle, plein écran photographique, calme assumé.",
    accent: "#1f3d3a",
    accentSoft: "#d8c9a3",
    status: "disponible",
    coverImage: {
      src: "/templates/hotel/cour-nuit.jpg",
      alt: "Patio de riad éclairé de lanternes, la nuit",
    },
  },
  {
    slug: "beaute",
    index: "04",
    sectorLabel: "Beauté / Spa",
    brandName: "Institut Soline",
    tagline: "Poser une ambiance apaisante dès l'arrivée sur le site.",
    direction: "Douceur organique, espace généreux, mouvement lent.",
    accent: "#5c4a42",
    accentSoft: "#ead9ce",
    status: "disponible",
    coverImage: {
      src: "/templates/beaute/cabine-lumiere.jpg",
      alt: "Cabine de soin baignée de lumière naturelle",
    },
  },
  {
    slug: "cabinet",
    index: "05",
    sectorLabel: "Cabinet / Services professionnels",
    brandName: "Cabinet Verdon & Associés",
    tagline: "Inspirer confiance avant le premier échange.",
    direction: "Rigueur typographique, structure institutionnelle, sobriété.",
    accent: "#1c2430",
    accentSoft: "#aab4c2",
    status: "disponible",
    coverImage: {
      src: "/templates/cabinet/facade-grille.jpg",
      alt: "Façade de bureaux, trame de fenêtres régulière",
    },
  },
  {
    slug: "automobile",
    index: "06",
    sectorLabel: "Automobile / Garage",
    brandName: "Garage Vortex",
    tagline: "Montrer le sérieux technique dès la page d'accueil.",
    direction: "Précision mécanique, lignes techniques, rythme dynamique.",
    accent: "#b8231e",
    accentSoft: "#3a3d42",
    status: "disponible",
    coverImage: {
      src: "/templates/automobile/atelier-pont-suspension.jpg",
      alt: "Mécanicien intervenant sur une suspension, véhicule sur pont",
    },
  },
];

export function getTemplateBySlug(slug: string): TemplateEntry | undefined {
  return TEMPLATES.find((t) => t.slug === slug);
}

export function isTemplateSlug(value: string): value is TemplateSlug {
  return TEMPLATES.some((t) => t.slug === value);
}

/**
 * Chaîne humainement lisible stockée avec la demande de contact et affichée
 * telle quelle dans l'admin/l'email — voir contact_requests.template_interest.
 */
export function formatTemplateInterest(slug: string): string | null {
  const entry = getTemplateBySlug(slug);
  return entry ? `${entry.sectorLabel} — ${entry.brandName}` : null;
}
