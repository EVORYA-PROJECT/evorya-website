// Logique du "Project Matcher" (recommandation d'offre indicative).
// Volontairement en dur/local : questionnaire et scoring, pas du contenu
// commercial — voir lib/cms/types.ts::ScannerContent pour le texte du
// Project Scanner lui-même, qui est CMS-editable depuis /admin/contenu.

// Offres réellement gérées par le CMS (voir lib/data/offers.ts / table
// "offers") — ces ids doivent correspondre à OfferRow.id en base.
export type MatcherOfferId = "essentiel" | "signature" | "sur-mesure";

export type MatcherOption = {
  label: string;
  /** Points ajoutés à chaque offre si cette option est choisie. */
  scores: Partial<Record<MatcherOfferId, number>>;
};

export type MatcherQuestion = {
  id: string;
  question: string;
  options: MatcherOption[];
};

/**
 * Questionnaire volontairement court (5 questions, 2-5 options chacune).
 * Scoring local, déterministe, sans biais systématique vers une offre :
 * un besoin réellement simple doit pouvoir recommander Essentiel — voir
 * computeRecommendation ci-dessous pour la règle de départage.
 */
export const MATCHER_QUESTIONS: MatcherQuestion[] = [
  {
    id: "type",
    question: "Quel type de projet avez-vous en tête ?",
    options: [
      { label: "Nouveau site", scores: { essentiel: 2, signature: 1 } },
      { label: "Refonte d'un site existant", scores: { signature: 2, "sur-mesure": 1 } },
      { label: "Landing page", scores: { essentiel: 2 } },
      { label: "Site professionnel plus avancé", scores: { signature: 2, "sur-mesure": 1 } },
      { label: "Je ne sais pas encore", scores: { signature: 1 } },
    ],
  },
  {
    id: "personnalisation",
    question: "Quel niveau de personnalisation recherchez-vous ?",
    options: [
      { label: "Simple et efficace", scores: { essentiel: 3 } },
      { label: "Design plus travaillé", scores: { signature: 3 } },
      { label: "Entièrement sur mesure", scores: { "sur-mesure": 3 } },
    ],
  },
  {
    id: "contenu",
    question: "Quelle quantité de contenu et de pages envisagez-vous ?",
    options: [
      { label: "Quelques sections ou pages", scores: { essentiel: 2 } },
      { label: "Plusieurs pages et contenus", scores: { signature: 2 } },
      { label: "Structure complexe / besoins spécifiques", scores: { "sur-mesure": 3 } },
    ],
  },
  {
    id: "fonctionnalites",
    question: "Quel type de fonctionnalités votre site nécessite-t-il ?",
    options: [
      { label: "Principalement informatif", scores: { essentiel: 2 } },
      { label: "Formulaires / interactions avancées", scores: { signature: 2 } },
      { label: "Fonctionnalités spécifiques", scores: { "sur-mesure": 3 } },
    ],
  },
  {
    id: "accompagnement",
    question: "De quel accompagnement avez-vous besoin ?",
    options: [
      { label: "J'ai déjà une idée claire", scores: { essentiel: 1 } },
      { label: "Besoin d'aide sur la structure/design", scores: { signature: 2 } },
      { label: "Je veux qu'Evorya construise l'expérience avec moi", scores: { "sur-mesure": 2, signature: 1 } },
    ],
  },
];

export type MatcherAnswers = Record<string, number>; // questionId -> option index

/**
 * Recommandation déterministe : additionne les points de chaque réponse et
 * retient l'offre au score le plus haut. Égalité → Signature (offre
 * intermédiaire), conformément à la règle demandée. Ne biaise jamais vers
 * une offre par défaut : un besoin réellement simple recommande Essentiel.
 */
export function computeRecommendation(answers: MatcherAnswers): MatcherOfferId {
  const totals: Record<MatcherOfferId, number> = { essentiel: 0, signature: 0, "sur-mesure": 0 };

  MATCHER_QUESTIONS.forEach((q) => {
    const optionIndex = answers[q.id];
    if (optionIndex === undefined) return;
    const option = q.options[optionIndex];
    if (!option) return;
    (Object.keys(option.scores) as MatcherOfferId[]).forEach((offerId) => {
      totals[offerId] += option.scores[offerId] ?? 0;
    });
  });

  const max = Math.max(totals.essentiel, totals.signature, totals["sur-mesure"]);
  if (totals["sur-mesure"] === max && totals["sur-mesure"] > totals.signature) return "sur-mesure";
  if (totals.essentiel === max && totals.essentiel > totals.signature && totals.essentiel >= totals["sur-mesure"]) {
    return "essentiel";
  }
  return "signature";
}

/** Résumé compact des réponses, injecté (de façon éditable) dans le message de Contact. */
export function summarizeAnswers(answers: MatcherAnswers): string[] {
  return MATCHER_QUESTIONS.map((q) => {
    const optionIndex = answers[q.id];
    if (optionIndex === undefined) return null;
    return q.options[optionIndex]?.label ?? null;
  }).filter((label): label is string => Boolean(label));
}
