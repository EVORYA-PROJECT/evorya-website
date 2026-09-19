/**
 * Palette du faux cabinet — volontairement éloignée du noir/blanc cyber
 * d'Evorya : papier chaud, encre bleu nuit, filets gris froid, et un laiton
 * sourd utilisé avec parcimonie (numérotation, filets d'accent).
 */
export const C = {
  /** Fond principal, off-white légèrement chaud. */
  paper: "#F4F3EF",
  /** Blanc des panneaux/cartes. */
  paperPure: "#FCFBF9",
  /** Encre principale, bleu nuit presque noir. */
  ink: "#141B26",
  /** Aplat bleu nuit des blocs de couleur. */
  navy: "#1C2430",
  /** Bleu nuit plus clair, pour les nuances sur aplat. */
  navySoft: "#26303E",
  /** Texte secondaire sur fond clair. */
  slate: "#5A6472",
  /** Texte secondaire sur fond sombre. */
  fog: "#AAB4C2",
  /** Filet standard sur fond clair. */
  rule: "#D4D7DC",
  /** Filet appuyé sur fond clair. */
  ruleStrong: "#B4BAC3",
  /** Filet sur aplat sombre. */
  ruleDark: "rgba(244, 243, 239, 0.18)",
  /** Accent laiton, réservé aux numérotations et filets courts. */
  brass: "#9A7B4F",
} as const;

/** Courbe utilisée partout : sortie nette, sans rebond, sans mollesse. */
export const EASE = [0.22, 1, 0.36, 1] as const;
