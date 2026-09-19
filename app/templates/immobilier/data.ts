/**
 * Atrium Immobilier — données de démonstration.
 *
 * Marque, biens, prix, références et coordonnées sont ENTIÈREMENT FICTIFS.
 * Aucune adresse réelle n'est utilisée : uniquement des quartiers génériques
 * (ville — quartier), jamais de numéro ni de rue.
 */

export type Transaction = "vente" | "location";
export type Family = "maison" | "appartement" | "professionnel";
export type VisualVariant = "facade" | "tower" | "riad" | "office" | "section" | "plan";
export type Tone = "sky" | "stone" | "clay" | "slate";

export type Spec = { label: string; value: string };

/**
 * Photographies libres de droits (Wikimedia Commons), téléchargées dans
 * `/public/templates/immobilier/`. Crédits complets : `/public/templates/CREDITS.md`,
 * mention visible dans le pied de page de la démo.
 *
 * Ce sont des images D'ILLUSTRATION : les biens de cette démo sont fictifs,
 * aucune photo ne prétend montrer le bien décrit. Les légendes disent
 * « ambiance », jamais « vue du salon ».
 */
export type Photo = {
  src: string;
  alt: string;
  /** Légende courte affichée sous la photo. */
  caption: string;
};

/** Verrière de patio vue en contre-plongée — bloc « L'agence ». */
export const AGENCY_PHOTO: Photo = {
  src: "/templates/immobilier/architecture-zellige.jpg",
  alt: "Contre-plongée sur une verrière de patio : cadre de bois sculpté et plâtre ciselé ouverts sur le ciel.",
  caption: "Ambiance — verrière de patio",
};

/** Façade blanche en contre-plongée — colonne haute du Hero (seule image prioritaire). */
export const HERO_PHOTO: Photo = {
  src: "/templates/immobilier/facade-blanche.jpg",
  alt: "Contre-plongée sur une façade blanche en béton : volumes décalés, loggias profondes et ciel clair.",
  caption: "Ambiance — volumes et loggias",
};

export const HERO_FEATURE_PHOTO: Photo = {
  src: "/templates/immobilier/villa-blanche.jpg",
  alt: "Façade blanche d'une maison entourée de lilas en fleurs et de grands arbres.",
  caption: "Architecture — villa blanche et jardin",
};

export const DETAIL_INTERIOR_PHOTO: Photo = {
  src: "/templates/immobilier/interieur-piece-vie.jpg",
  alt: "Cuisine contemporaine aux façades en bois sombre, ouverte sur une pièce de vie lumineuse.",
  caption: "Intérieur — cuisine & matières",
};

export const DETAIL_STAIR_PHOTO: Photo = {
  src: "/templates/immobilier/escalier-volumes.jpg",
  alt: "Vue en plongée d'un escalier architectural entre béton, miroirs et lignes graphiques.",
  caption: "Architecture — escalier & volumes",
};

export const NOTEBOOK_ARCH_PHOTO: Photo = {
  src: "/templates/immobilier/facade-lignes-blanches.jpg",
  alt: "Détail vertical d'une façade contemporaine blanche aux lignes géométriques nettes.",
  caption: "Architecture — lignes & lumière",
};

export const AGENCY_MAIN_PHOTO: Photo = {
  src: "/templates/immobilier/patio-arche-meknes.jpg",
  alt: "Grande arche marocaine sculptée ouvrant sur le patio lumineux d'une médersa à Meknès.",
  caption: "Architecture — arche & patio, Meknès",
};

/** Escalier extérieur en béton — grande image du « Carnet de visite ». */
export const NOTEBOOK_PHOTO: Photo = {
  src: "/templates/immobilier/detail-escalier-beton.jpg",
  alt: "Escalier extérieur en béton bordé d'une main courante, longeant un mur de panneaux métalliques perforés.",
  caption: "Ambiance — circulation extérieure",
};

/** Ombre portée d'un arbre sur un mur clair — bandeau de matière avant « Services ». */
export const TEXTURE_PHOTO: Photo = {
  src: "/templates/immobilier/detail-ombre-portee.jpg",
  alt: "Ombre portée du feuillage d'un arbre sur un mur clair, en fin d'après-midi.",
  caption: "Ambiance — lumière et ombre portée",
};

/**
 * Photographies de la « Galerie architecturale » (section dédiée) et des
 * étapes du carnet de visite. Toutes libres de droits, téléchargées
 * localement — crédits complets dans `/public/templates/CREDITS.md`.
 */
export const GALLERY_RESIDENCE_PHOTO: Photo = {
  src: "/templates/immobilier/immeuble-balcons.jpg",
  alt: "Contre-plongée sur une résidence contemporaine blanche, aux balcons superposés et lignes épurées.",
  caption: "Architecture — résidence contemporaine",
};

export const GALLERY_ARCHES_PHOTO: Photo = {
  src: "/templates/immobilier/galerie-arches.jpg",
  alt: "Galerie d'arches en marbre clair se répétant en perspective, sol réfléchissant.",
  caption: "Ambiance — jeu d'arcades",
};

export const GALLERY_STONE_PHOTO: Photo = {
  src: "/templates/immobilier/detail-pierre.jpg",
  alt: "Détail d'un mur de pierre appareillée, joints fins et lumière rasante.",
  caption: "Matière — pierre appareillée",
};

export const GALLERY_BEDROOM_PHOTO: Photo = {
  src: "/templates/immobilier/chambre-lumiere.jpg",
  alt: "Chambre baignée de lumière naturelle, rideau clair devant une fenêtre haute.",
  caption: "Ambiance — chambre et lumière",
};

export const GALLERY_LOFT_PHOTO: Photo = {
  src: "/templates/immobilier/salon-loft.jpg",
  alt: "Salon meublé sobrement, plan ouvert et lumière latérale sur sol clair.",
  caption: "Ambiance — loft, plan ouvert",
};

export const GALLERY_POOL_PHOTO: Photo = {
  src: "/templates/immobilier/terrasse-piscine.jpg",
  alt: "Vue aérienne d'une piscine bordée de chaises longues, eau turquoise et dalles claires.",
  caption: "Ambiance — bassin et terrasse",
};

/** Étapes du « Carnet de visite » : une photo par temps de la visite. */
export const NOTEBOOK_STEPS: { index: string; title: string; note: string; measure: string; photo: Photo }[] = [
  {
    index: "01",
    title: "Arrivée — extérieur",
    note: "On regarde d'abord la façade, son orientation, l'ombre qu'elle porte à cette heure-ci.",
    measure: "Façade relevée au mètre laser",
    photo: HERO_PHOTO,
  },
  {
    index: "02",
    title: "Lumière — orientation",
    note: "Deux passages sont nécessaires : le matin dit une chose, le soir en dit une autre.",
    measure: "Boussole + deux passages",
    photo: GALLERY_BEDROOM_PHOTO,
  },
  {
    index: "03",
    title: "Matières — détails",
    note: "Sol, enduit, menuiserie : la qualité d'un bien se lit aussi dans ce qu'on touche.",
    measure: "Nomenclature des matériaux",
    photo: GALLERY_STONE_PHOTO,
  },
  {
    index: "04",
    title: "Plan — mesures",
    note: "Chaque pièce est mesurée au mètre laser ; le plan est redessiné dans la semaine.",
    measure: "Plan coté, échelle 1/100",
    photo: {
      src: "/templates/immobilier/architecture-patio.jpg",
      alt: "Patio de riad avec bassin rectangulaire et pavillon couvert sous une arcade.",
      caption: "Ambiance — relevé de patio",
    },
  },
  {
    index: "05",
    title: "Synthèse du bien",
    note: "Le dossier de visite rassemble photos, plan et points de vigilance avant publication.",
    measure: "Dossier remis en 48 h",
    photo: AGENCY_PHOTO,
  },
];

/**
 * Crédits des photographies, dans l'ordre d'apparition sur la page.
 * Rendus par `SiteFooter` : une seule source, pas de liste recopiée.
 * Détail complet (titre du fichier d'origine) : `/public/templates/CREDITS.md`.
 */
export type PhotoCredit = { subject: string; author: string; license: string };

export const PHOTO_CREDITS: PhotoCredit[] = [
  { subject: "villa blanche et jardin", author: "Frøy Hamstad", license: "CC0" },
  { subject: "cuisine contemporaine", author: "Nenad Stojković", license: "CC BY 2.0" },
  { subject: "escalier et miroirs", author: "Dmitri Popov", license: "CC0" },
  { subject: "façade minimaliste", author: "Adam Birkett", license: "CC0" },
  { subject: "arche et patio de Meknès", author: "Ariel Gera", license: "CC BY-SA 4.0" },
  { subject: "façade blanche", author: "Joel Filipe", license: "CC0" },
  { subject: "terrasse en zellige", author: "Ideophagous", license: "CC BY-SA 4.0" },
  { subject: "immeuble à balcons", author: "Grant Lemons", license: "CC0" },
  { subject: "plateau aménagé", author: "Breather", license: "CC0" },
  { subject: "cuisine ouverte", author: "Naomi Hébert", license: "CC0" },
  { subject: "escalier en béton", author: "Tobias van Schneider", license: "CC0" },
  { subject: "patio de riad", author: "Flickr / sdbj", license: "CC BY 2.0" },
  { subject: "ombre portée", author: "rawpixel.com", license: "CC0" },
  { subject: "verrière de patio", author: "Maverickhawkesley", license: "CC0" },
  { subject: "salon lumineux", author: "Jarosław Ceborski", license: "CC0" },
  { subject: "salon de loft", author: "Stephen Di Donato", license: "CC0" },
  { subject: "chambre de loft", author: "Gabriel Beaudry", license: "CC0" },
  { subject: "chambre et fenêtre", author: "Viktoria Hall-Waldhauser", license: "CC0" },
  { subject: "escalier blanc", author: "Todd Quackenbush", license: "CC0" },
  { subject: "galerie d'arches", author: "Alex Holyoake", license: "CC0" },
  { subject: "détail bois", author: "Teo Duldulao", license: "CC0" },
  { subject: "façade vitrée", author: "Joel Filipe", license: "CC0" },
  { subject: "bassin et terrasse", author: "Tim Gouw", license: "CC0" },
  { subject: "mur de pierre", author: "Reiner Knudsen", license: "CC0" },
  { subject: "patio de palais", author: "George Rex", license: "CC BY-SA 2.0" },
];

export type Property = {
  id: string;
  reference: string;
  name: string;
  type: string;
  transaction: Transaction;
  family: Family;
  city: string;
  district: string;
  /** Montant déjà formaté (espaces fines insécables) pour éviter tout écart serveur/client. */
  price: string;
  priceUnit: string;
  surface: number;
  rooms: number;
  bedrooms: number;
  bathrooms: number;
  tag?: string;
  visual: VisualVariant;
  tone: Tone;
  /** Photo d'ambiance en grand format : remplace le dessin comme visuel principal. */
  photo?: Photo;
  /** Photo d'appoint : petit format, à côté du plan et de la coupe. */
  photoAccent?: Photo;
  summary: string;
  description: string;
  highlights: string[];
  specs: Spec[];
};

export const TRANSACTION_FILTERS = [
  { id: "tout", label: "Tout" },
  { id: "vente", label: "Acheter" },
  { id: "location", label: "Louer" },
] as const;

export type TransactionFilter = (typeof TRANSACTION_FILTERS)[number]["id"];

export const FAMILY_FILTERS = [
  { id: "toutes", label: "Tous les biens" },
  { id: "maison", label: "Maison & villa" },
  { id: "appartement", label: "Appartement" },
  { id: "professionnel", label: "Professionnel" },
] as const;

export type FamilyFilter = (typeof FAMILY_FILTERS)[number]["id"];

export const PROPERTIES: Property[] = [
  {
    id: "villa-ombriere",
    reference: "ATR-118",
    name: "Villa Ombrière",
    type: "Villa contemporaine",
    transaction: "vente",
    family: "maison",
    city: "Casablanca",
    district: "Anfa",
    price: "8 450 000",
    priceUnit: "MAD",
    surface: 420,
    rooms: 7,
    bedrooms: 4,
    bathrooms: 3,
    tag: "Exclusivité",
    visual: "facade",
    tone: "sky",
    // Les six biens portent désormais une photo en visuel principal ; le
    // dessin (plan, coupe, élévation) reste présent en pièce d'appoint dans
    // « Le bien en détail » — la photo documente, le dessin explique.
    photo: {
      src: "/templates/immobilier/architecture-terrasse.jpg",
      alt: "Table basse en zellige sur une terrasse dallée, face à la mer en fin de journée.",
      caption: "Ambiance — terrasse et espace extérieur",
    },
    photoAccent: {
      src: "/templates/immobilier/terrasse-piscine.jpg",
      alt: "Vue aérienne d'une piscine bordée de chaises longues, eau turquoise et dalles claires.",
      caption: "Ambiance — bassin et terrasse",
    },
    summary: "Volumes horizontaux, patio central, lumière traversante toute la journée.",
    description:
      "Construite en deux volumes décalés autour d'un patio planté, la Villa Ombrière organise la vie de famille au rez-de-chaussée et l'intimité à l'étage. Les grandes baies sud-ouest cadrent le jardin et laissent entrer une lumière rasante en fin de journée ; les débords de dalle protègent les pièces de vie aux heures les plus chaudes.",
    highlights: [
      "Séjour traversant de 78 m² ouvert sur le patio",
      "Débords de dalle calculés pour l'ombrage d'été",
      "Suite parentale à l'étage avec terrasse privative",
      "Terrain paysagé de 900 m² et piscine longueur 14 m",
    ],
    specs: [
      { label: "Terrain", value: "900 m²" },
      { label: "Niveaux", value: "R+1" },
      { label: "Exposition", value: "Sud-ouest" },
      { label: "Livraison", value: "2021" },
      { label: "Stationnement", value: "3 places" },
      { label: "Chauffage", value: "Plancher réversible" },
    ],
  },
  {
    id: "appartement-cedre",
    reference: "ATR-204",
    name: "Appartement Cèdre",
    type: "Appartement d'angle",
    transaction: "vente",
    family: "appartement",
    city: "Casablanca",
    district: "Gauthier",
    price: "2 780 000",
    priceUnit: "MAD",
    surface: 142,
    rooms: 4,
    bedrooms: 3,
    bathrooms: 2,
    tag: "Nouveau",
    visual: "tower",
    tone: "stone",
    photo: {
      src: "/templates/immobilier/immeuble-balcons.jpg",
      alt: "Contre-plongée sur un immeuble contemporain blanc, balcons filants et angles nets sur ciel pâle.",
      caption: "Ambiance — immeuble et balcons",
    },
    photoAccent: {
      src: "/templates/immobilier/salon-lumiere.jpg",
      alt: "Salon lumineux au parquet clair, grande baie et mobilier sobre.",
      caption: "Ambiance — séjour",
    },
    summary: "Sixième étage d'angle, double orientation, balcon filant sur deux façades.",
    description:
      "Au sixième étage d'un immeuble des années 2000 tenu avec soin, cet appartement d'angle profite d'une double orientation est-sud. Le balcon filant relie le séjour à la cuisine et dégage une vue ouverte sur les arbres du quartier. Distribution nette : espaces de jour d'un côté, nuit de l'autre, sans couloir perdu.",
    highlights: [
      "Double orientation est et sud",
      "Balcon filant de 16 m² sur deux façades",
      "Cuisine indépendante avec cellier",
      "Ascenseur, gardiennage, place en sous-sol",
    ],
    specs: [
      { label: "Étage", value: "6ᵉ sur 8" },
      { label: "Balcon", value: "16 m²" },
      { label: "Exposition", value: "Est / Sud" },
      { label: "Construction", value: "2004" },
      { label: "Stationnement", value: "1 place" },
      { label: "Charges", value: "1 100 MAD / mois" },
    ],
  },
  {
    id: "riad-nassim",
    reference: "ATR-071",
    name: "Riad Nassim",
    type: "Riad restauré",
    transaction: "vente",
    family: "maison",
    city: "Marrakech",
    district: "Médina",
    price: "5 900 000",
    priceUnit: "MAD",
    surface: 310,
    rooms: 9,
    bedrooms: 5,
    bathrooms: 4,
    tag: "Exclusivité",
    visual: "riad",
    tone: "clay",
    photo: {
      src: "/templates/immobilier/patio-bahia.jpg",
      alt: "Porte à vitraux colorés ouvrant sur une cour du Palais de la Bahia, ses fontaines et ses mosaïques.",
      caption: "Ambiance — cour et vitraux",
    },
    // Photo d'appoint volontairement en petit format : le fichier source est
    // en basse définition (390 × 306) et deviendrait flou en grand.
    photoAccent: {
      src: "/templates/immobilier/architecture-patio.jpg",
      alt: "Patio de riad avec bassin rectangulaire et pavillon couvert sous une arcade.",
      caption: "Ambiance — patio",
    },
    summary: "Patio à quatre arcades, terrasse haute, restauration menée par des artisans.",
    description:
      "Le Riad Nassim tient son calme de son plan : quatre arcades refermées sur un patio planté, des pièces profondes qui restent fraîches, et une terrasse haute qui récupère toute la lumière du soir. La restauration a conservé les proportions d'origine — tadelakt, cèdre, zellige posés à la main — en intégrant discrètement les réseaux techniques.",
    highlights: [
      "Patio central à quatre arcades et bassin",
      "Terrasse haute de 90 m² avec vue dégagée",
      "Tadelakt, cèdre et zellige restaurés à la main",
      "Cinq chambres dont deux suites",
    ],
    specs: [
      { label: "Patio", value: "48 m²" },
      { label: "Terrasse", value: "90 m²" },
      { label: "Niveaux", value: "R+2" },
      { label: "Restauration", value: "2019" },
      { label: "Accès", value: "Derb carrossable" },
      { label: "Usage", value: "Résidentiel ou maison d'hôtes" },
    ],
  },
  {
    id: "plateau-horizon",
    reference: "ATR-312",
    name: "Plateau Horizon",
    type: "Plateau de bureaux",
    transaction: "location",
    family: "professionnel",
    city: "Casablanca",
    district: "Casa Finance City",
    price: "34 000",
    priceUnit: "MAD / mois",
    surface: 260,
    rooms: 6,
    bedrooms: 0,
    bathrooms: 2,
    tag: "Location",
    visual: "office",
    tone: "slate",
    photo: {
      src: "/templates/immobilier/plateau-bureaux.jpg",
      alt: "Plateau de bureaux clair : longue table de réunion, plafond technique et fenêtres hautes.",
      caption: "Ambiance — plateau aménagé",
    },
    photoAccent: {
      src: "/templates/immobilier/facade-vitree.jpg",
      alt: "Façade vitrée continue en trame régulière, reflets du ciel sur les panneaux.",
      caption: "Ambiance — façade vitrée",
    },
    summary: "Plateau libre au 11ᵉ étage, façade vitrée continue, aménagement au choix.",
    description:
      "Plateau livré nu au onzième étage, avec une façade vitrée continue sur deux orientations et une trame porteuse qui laisse l'aménagement entièrement libre. Faux plancher technique en place, climatisation centralisée, et un noyau de services regroupé pour dégager la surface utile.",
    highlights: [
      "Plateau libre de 260 m² sans poteau intermédiaire",
      "Façade vitrée continue, deux orientations",
      "Faux plancher technique et câblage catégorie 6",
      "Quatre places de parking incluses",
    ],
    specs: [
      { label: "Étage", value: "11ᵉ" },
      { label: "Trame", value: "1,35 m" },
      { label: "Hauteur libre", value: "2,80 m" },
      { label: "Livraison", value: "Plateau nu" },
      { label: "Stationnement", value: "4 places" },
      { label: "Charges", value: "38 MAD / m² / mois" },
    ],
  },
  {
    id: "duplex-serac",
    reference: "ATR-156",
    name: "Duplex Sérac",
    type: "Duplex avec terrasse",
    transaction: "vente",
    family: "appartement",
    city: "Rabat",
    district: "Hay Riad",
    price: "3 450 000",
    priceUnit: "MAD",
    surface: 196,
    rooms: 5,
    bedrooms: 3,
    bathrooms: 2,
    visual: "section",
    tone: "stone",
    photo: {
      src: "/templates/immobilier/interieur-cuisine.jpg",
      alt: "Cuisine contemporaine blanche avec îlot central, crédence sombre et suspensions noires.",
      caption: "Ambiance — cuisine ouverte",
    },
    photoAccent: {
      src: "/templates/immobilier/escalier-blanc.jpg",
      alt: "Escalier blanc à volée droite, garde-corps épuré et lumière zénithale.",
      caption: "Ambiance — escalier central",
    },
    summary: "Deux derniers niveaux, escalier central en béton ciré, terrasse de 40 m².",
    description:
      "Le Duplex Sérac occupe les deux derniers niveaux de l'immeuble. Un escalier central en béton ciré sépare le séjour double hauteur des chambres, et distribue à l'étage une mezzanine bureau qui reste ouverte sur le bas. La terrasse, orientée ouest, prolonge le séjour sans rupture de niveau.",
    highlights: [
      "Séjour double hauteur de 5,40 m",
      "Mezzanine bureau ouverte sur le séjour",
      "Terrasse ouest de 40 m² de plain-pied",
      "Derniers niveaux, aucun vis-à-vis",
    ],
    specs: [
      { label: "Niveaux", value: "7ᵉ et 8ᵉ" },
      { label: "Terrasse", value: "40 m²" },
      { label: "Exposition", value: "Ouest" },
      { label: "Construction", value: "2016" },
      { label: "Stationnement", value: "2 places" },
      { label: "Charges", value: "1 450 MAD / mois" },
    ],
  },
  {
    id: "loft-atelier-nord",
    reference: "ATR-233",
    name: "Loft Atelier Nord",
    type: "Loft d'atelier",
    transaction: "location",
    family: "appartement",
    city: "Casablanca",
    district: "Racine",
    price: "19 500",
    priceUnit: "MAD / mois",
    surface: 118,
    rooms: 3,
    bedrooms: 2,
    bathrooms: 1,
    tag: "Location",
    visual: "plan",
    tone: "clay",
    photo: {
      src: "/templates/immobilier/chambre-loft.jpg",
      alt: "Chambre de loft new-yorkais, poutrelles métalliques apparentes et grande fenêtre.",
      caption: "Ambiance — loft, coin nuit",
    },
    photoAccent: {
      src: "/templates/immobilier/detail-bois.jpg",
      alt: "Détail d'un parquet à motif géométrique en bois clair et foncé.",
      caption: "Ambiance — matière bois",
    },
    summary: "Ancien atelier, verrière nord, plan ouvert et sol béton d'origine.",
    description:
      "Ancien atelier de menuiserie transformé en loft, avec une verrière nord qui donne une lumière constante et sans contraste dur. Le plan reste ouvert : un seul bloc technique regroupe cuisine et salle d'eau, le reste de la surface est libre d'aménagement. Sol béton d'origine poncé, charpente métallique laissée apparente.",
    highlights: [
      "Verrière nord de 22 m² sur toute la longueur",
      "Plan ouvert, un seul bloc technique",
      "Charpente métallique et béton d'origine",
      "Hauteur sous charpente de 4,10 m",
    ],
    specs: [
      { label: "Hauteur", value: "4,10 m" },
      { label: "Verrière", value: "22 m²" },
      { label: "Exposition", value: "Nord" },
      { label: "Réhabilitation", value: "2022" },
      { label: "Stationnement", value: "Cour fermée" },
      { label: "Durée", value: "Bail 3 ans" },
    ],
  },
];

export const FEATURED_ID = "villa-ombriere";

export function filterProperties(
  transaction: TransactionFilter,
  family: FamilyFilter,
): Property[] {
  return PROPERTIES.filter(
    (p) =>
      (transaction === "tout" || p.transaction === transaction) &&
      (family === "toutes" || p.family === family),
  );
}
