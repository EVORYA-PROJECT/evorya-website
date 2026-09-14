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
    lead: "Evorya accompagne les entreprises dans la création d'une présence digitale moderne, crédible et mémorable.",
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
    footnote:
      "Chez Evorya, nous faisons confiance à nos clients : aucun coût supplémentaire n'est jamais ajouté sans votre accord.",
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
