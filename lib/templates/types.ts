export type TemplateSlug =
  | "restaurant"
  | "immobilier"
  | "hotel"
  | "beaute"
  | "cabinet"
  | "automobile";

export type TemplateStatus = "disponible" | "a-venir";

/**
 * Source unique de vérité pour tout ce qui décrit un template/démo
 * sectoriel — nom, secteur, direction artistique, accent visuel. Toute
 * surface qui affiche un template (galerie /templates, section homepage,
 * DemoBar, formulaire Contact, admin, email) lit ce type plutôt que de
 * dupliquer ces informations localement.
 */
export type TemplateEntry = {
  slug: TemplateSlug;
  /** Numéro d'ordre affiché ("01".."06"), cohérent avec l'ordre de la galerie. */
  index: string;
  /** Secteur tel qu'affiché au prospect, ex. "Restaurant / Café". */
  sectorLabel: string;
  /** Nom de la fausse marque démontrée, ex. "Brasserie Argan". */
  brandName: string;
  /** Une phrase courte, orientée résultat/usage, pour la galerie. */
  tagline: string;
  /** Direction artistique en quelques mots, ex. "Photographie généreuse...". */
  direction: string;
  /** Teinte d'accent utilisée pour l'aperçu abstrait (galerie/homepage). */
  accent: string;
  /** Teinte secondaire (dégradé) pour le même aperçu. */
  accentSoft: string;
  status: TemplateStatus;
  /**
   * Photo de couverture pour l'aperçu galerie/homepage (TemplatePreview) —
   * une des photos déjà intégrées dans la démo elle-même, jamais une image
   * dédiée. Optionnel : à défaut, TemplatePreview retombe sur le dégradé
   * abstrait seul.
   */
  coverImage?: { src: string; alt: string };
};
