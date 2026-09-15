import { SITE } from "@/lib/config";
import { SERVICES } from "@/lib/data/services";
import { TRANSPARENCY_POINTS } from "@/lib/data/transparency";
import { PROCESS_STEPS } from "@/lib/data/process";
import { OFFERS } from "@/lib/data/offers";
import type { OfferRow, SiteContentMap } from "@/lib/cms/types";

/**
 * Contenu par défaut — reprend exactement le texte actuellement codé en dur.
 * Utilisé comme filet de sécurité tant que la migration SQL n'a pas été
 * exécutée (ou si une requête Supabase échoue) : le site public ne doit
 * jamais afficher de champ vide ou "undefined".
 */
export const SITE_CONTENT_DEFAULTS: SiteContentMap = {
  hero: {
    title: "Votre présence digitale mérite mieux qu'un simple site.",
    subtitle: SITE.description,
    ctaPrimary: "Démarrer un projet",
    ctaSecondary: "Découvrir nos offres",
  },
  studio: {
    lead: "Evorya accompagne les entreprises dans la création d'une présence digitale qui leur ressemble et qui inspire confiance dès le premier regard.",
    body: "Nous ne créons pas simplement des pages web. Nous construisons une expérience pensée autour de votre entreprise, de votre clientèle et de votre identité.",
    tag: "PROJECT 001 — EVORYA",
  },
  services: {
    heading: "Nos services",
    items: SERVICES,
  },
  transparency: {
    heading: "Transparence avant tout.",
    subheading:
      "Un système simple, pensé pour qu'aucune surprise ne s'invite entre le premier échange et la mise en ligne.",
    points: TRANSPARENCY_POINTS,
    footnote: "Aucun frais supplémentaire sans votre accord préalable.",
  },
  process: {
    heading: "Une méthode claire, du premier échange à la mise en ligne",
    steps: PROCESS_STEPS,
  },
  contact: {
    heading: "Construisons quelque chose qui vous ressemble.",
    subheading:
      "Parlez-nous de votre entreprise et de votre projet. Nous reviendrons vers vous pour discuter de la meilleure solution.",
    directLine: "Vous préférez nous écrire directement ?",
    email: SITE.email,
  },
  footer: {
    tagline: "Création d'expériences digitales.",
    location: SITE.location,
  },
  first10: {
    title: "Evorya First 10",
    text1: "Nous sélectionnons les 10 premiers projets qui lanceront le portfolio Evorya.",
    text2: "Pour ces 10 premiers projets, la création du site est offerte.",
    feesNote1:
      "Les éventuels frais nécessaires à la mise en ligne — notamment le nom de domaine, l'hébergement ou certains services tiers — peuvent rester à la charge du client.",
    feesNote2: "Ces frais sont toujours définis ensemble et communiqués avant le début du projet.",
    current: 0,
    total: 10,
    status: "open",
  },
  why: {
    heading: "Pourquoi Evorya.",
    subheading:
      "Pas de promesse marketing vide : une méthode et un niveau d'exécution pensés pour durer.",
    points: [
      {
        index: "01",
        title: "Design pensé pour votre entreprise",
        description:
          "Chaque site est conçu à partir de votre activité et de votre clientèle, jamais depuis un template générique.",
      },
      {
        index: "02",
        title: "Responsive travaillé indépendamment",
        description:
          "Mobile, tablette et desktop sont pensés comme trois expériences à part entière, pas une simple mise à l'échelle.",
      },
      {
        index: "03",
        title: "Performance dès la conception",
        description:
          "Sites rapides et optimisés, construits avec des technologies modernes plutôt qu'ajustés après coup.",
      },
      {
        index: "04",
        title: "Accompagnement réel",
        description: "Evorya vous accompagne de la conception jusqu'à la mise en ligne, sans vous laisser seul.",
      },
      {
        index: "05",
        title: "Contrôle du projet",
        description:
          "Chaque décision — structure, contenu, direction — reste claire et validée avec vous avant d'être développée.",
      },
      {
        index: "06",
        title: "Attention aux détails",
        description:
          "Animations, typographie, espacements : le niveau de finition est le même sur l'ensemble du site.",
      },
    ],
  },
  faq: {
    heading: "Questions fréquentes",
    subheading: "Les réponses aux questions les plus utiles avant de démarrer un projet.",
    items: [
      {
        question: "Combien de temps prend la création d'un site ?",
        answer:
          "Le délai dépend de l'offre choisie et de la complexité du projet. Il est estimé ensemble dès le premier échange, avant le début du travail.",
      },
      {
        question: "Est-ce que le site fonctionne sur téléphone et tablette ?",
        answer:
          "Oui. Chaque site Evorya est pensé et testé spécifiquement pour smartphone, tablette et ordinateur, pas seulement adapté après coup.",
      },
      {
        question: "Qui paie le domaine et l'hébergement ?",
        answer:
          "Les éventuels frais externes (nom de domaine, hébergement, services tiers) sont définis et communiqués avec vous avant le début du projet — jamais après coup.",
      },
      {
        question: "Est-ce que je suis propriétaire de mon site ?",
        answer:
          "Oui. Une fois le projet livré, le site vous appartient, dans le cadre convenu ensemble avant son démarrage.",
      },
      {
        question: "Puis-je demander des modifications ?",
        answer:
          "Oui, des ajustements sont prévus pendant le projet. La portée exacte est précisée ensemble selon l'offre choisie.",
      },
      {
        question: "Que comprend Evorya First 10 ?",
        answer:
          "Pour les 10 premiers projets, la création du site est offerte. Les éventuels frais externes (domaine, hébergement) restent à la charge du client et sont toujours communiqués avant le début du projet.",
      },
      {
        question: "Est-ce qu'Evorya peut refaire un site existant ?",
        answer:
          "Oui, la refonte d'un site existant se prépare de la même façon : un échange initial permet de définir vos objectifs avant de démarrer.",
      },
      {
        question: "Comment démarrer un projet ?",
        answer:
          "Remplissez le formulaire de contact ou écrivez directement à evoryaproject@gmail.com. Nous revenons vers vous pour discuter de la meilleure solution.",
      },
    ],
  },
  scanner: {
    heading: "Project Scanner",
    subheading: "Avant de construire, Evorya passe chaque projet au travers des mêmes dimensions essentielles.",
    steps: [
      { index: "01", title: "Identité", description: "Direction visuelle, cohérence de marque, présence digitale." },
      { index: "02", title: "Structure", description: "Architecture du contenu et parcours utilisateur." },
      { index: "03", title: "Expérience", description: "Interactions, lisibilité, ergonomie et fluidité." },
      { index: "04", title: "Performance", description: "Rapidité, stabilité et optimisation technique." },
      { index: "05", title: "Responsive", description: "Expérience pensée séparément pour mobile, tablette et desktop." },
    ],
    finalHeading: "Ready to build.",
    finalTagline: "Chaque projet commence par une structure claire.",
    ctaLabel: "Démarrer un projet",
    matcherHeading: "Quelle offre correspond à votre projet ?",
    matcherCta: "Trouver mon offre",
  },
};

export const OFFERS_DEFAULTS: OfferRow[] = OFFERS.map((offer, i) => ({
  id: offer.id,
  name: offer.name,
  price: offer.price,
  price_note: offer.priceNote ?? null,
  tagline: offer.tagline,
  features: offer.features,
  cta: offer.cta,
  featured: offer.featured ?? false,
  sort_order: i,
  updated_at: new Date(0).toISOString(),
}));
