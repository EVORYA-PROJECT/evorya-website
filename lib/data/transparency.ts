export type TransparencyPoint = {
  index: string;
  title: string;
  description: string;
};

export const TRANSPARENCY_POINTS: TransparencyPoint[] = [
  {
    index: "01",
    title: "Prix clair",
    description: "Le prix de création est défini avant le début du projet.",
  },
  {
    index: "02",
    title: "Frais externes",
    description:
      "Domaine, hébergement et éventuels services externes sont expliqués séparément.",
  },
  {
    index: "03",
    title: "Aucun coût surprise",
    description:
      "Les dépenses nécessaires sont communiquées et convenues avant le lancement.",
  },
  {
    index: "04",
    title: "Paiement",
    description:
      "Pour les prestations payantes, le règlement intervient selon les conditions convenues avec Evorya.",
  },
];
