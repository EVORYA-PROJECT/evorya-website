import type { Offer } from "@/types";

// Prix et prestations de lancement — modifiables ici sans toucher aux composants.
export const OFFERS: Offer[] = [
  {
    id: "essentiel",
    name: "Essentiel",
    price: "1 990 MAD",
    priceNote: "Prix de lancement",
    tagline: "Pour construire une présence digitale professionnelle.",
    features: [
      "Site vitrine premium",
      "3 à 5 pages",
      "Design responsive",
      "Formulaire de contact",
      "Intégration WhatsApp",
      "Google Maps",
      "SEO de base",
      "Mise en ligne",
    ],
    cta: "Choisir Essentiel",
  },
  {
    id: "signature",
    name: "Signature",
    price: "2 990 MAD",
    priceNote: "Prix de lancement",
    tagline: "Pour les entreprises qui souhaitent réellement se démarquer.",
    features: [
      "Tout le contenu de l'offre Essentiel",
      "Design davantage personnalisé",
      "Animations premium",
      "Galerie ou portfolio",
      "Sections avancées",
      "SEO renforcé",
      "Optimisation des performances",
      "Travail approfondi sur l'identité digitale",
    ],
    cta: "Choisir Signature",
    featured: true,
  },
  {
    id: "sur-mesure",
    name: "Sur Mesure",
    price: "À partir de 4 490 MAD",
    tagline: "Pour créer une expérience digitale entièrement personnalisée.",
    features: [
      "Architecture personnalisée",
      "Design sur mesure",
      "Animations avancées",
      "Fonctionnalités spécifiques",
      "Intégrations externes",
      "Accompagnement renforcé",
    ],
    cta: "Parler de mon projet",
  },
];
