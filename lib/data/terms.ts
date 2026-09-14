export type TermsSection = {
  index: string;
  title: string;
  body: string[];
};

// Source unique du contenu des Conditions du projet — utilisée à la fois par
// la modal du formulaire de contact et par la page /conditions, afin de ne
// jamais avoir deux versions différentes du texte.
export const TERMS_INTRO =
  "Ces conditions encadrent simplement la relation entre Evorya Project et ses clients. Elles ne remplacent pas un contrat détaillé mais posent les bases claires de notre collaboration.";

export const TERMS_UPDATED_AT = "2026";

export const TERMS_SECTIONS: TermsSection[] = [
  {
    index: "01",
    title: "Informations communiquées",
    body: [
      "Le client confirme que les informations communiquées pour la réalisation du projet sont exactes.",
    ],
  },
  {
    index: "02",
    title: "Éléments à fournir",
    body: [
      "Le client s'engage à fournir dans des délais raisonnables les textes, images, logos et autres éléments nécessaires à la réalisation du site.",
    ],
  },
  {
    index: "03",
    title: "Règlement de la prestation",
    body: [
      "Pour les projets payants, le client s'engage à régler le montant convenu au plus tard dans les 5 jours suivant la mise en ligne ou la livraison finale du site, conformément à ce qui aura été convenu avec Evorya.",
    ],
  },
  {
    index: "04",
    title: "Frais externes",
    body: [
      "Les éventuels frais de nom de domaine, d'hébergement ou de services externes sont distincts du prix de création lorsqu'ils ne sont pas explicitement inclus.",
      "Les coûts liés au domaine et à l'hébergement sont communiqués et convenus avec le client avant le lancement du projet.",
    ],
  },
  {
    index: "05",
    title: "Programme de lancement",
    body: [
      "Pour les projets bénéficiant de l'offre de création gratuite du programme de lancement, la création du site peut être offerte, mais les éventuels frais externes (hébergement, domaine, services tiers, etc.) restent à la charge du client lorsqu'ils sont nécessaires.",
    ],
  },
  {
    index: "06",
    title: "Portfolio",
    body: [
      "Le client autorise Evorya à présenter le projet terminé dans son portfolio et ses réalisations, sauf accord contraire convenu avec Evorya.",
    ],
  },
  {
    index: "07",
    title: "Évolution du périmètre",
    body: [
      "Les demandes importantes hors périmètre initial peuvent nécessiter un nouveau devis.",
    ],
  },
  {
    index: "08",
    title: "Interruption du service",
    body: [
      "Evorya peut refuser ou interrompre un projet en cas d'utilisation abusive, frauduleuse ou manifestement illégale du service.",
    ],
  },
];

export const TERMS_DISCLAIMER =
  "Ce document présente les conditions générales de collaboration avec Evorya Project. Il ne constitue pas une garantie juridique absolue et peut être complété par un accord spécifique selon la nature du projet.";
