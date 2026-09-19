/**
 * Contenu de la démo « Garage Vortex ».
 * Marque, tarifs, interventions, horaires et coordonnées sont ENTIÈREMENT
 * FICTIFS : cette page est une démonstration de direction artistique Evorya
 * pour le secteur automobile, pas un vrai établissement.
 */

export const GARAGE = {
  name: "Garage Vortex",
  wordmarkTop: "Garage",
  wordmarkMain: "Vortex",
  positioning:
    "Mécanique de précision, diagnostic électronique et entretien suivi — chaque intervention est mesurée, documentée et rendue dans les délais annoncés.",
  /** Numéro volontairement fictif (suite de zéros) — aucune ligne réelle. */
  phoneDisplay: "05 22 00 00 00",
  phoneHref: "tel:+212522000000",
  whatsappHref: "https://wa.me/212600000000",
  addressLine1: "14, rue des Ateliers",
  addressLine2: "Zone industrielle Sidi Maârouf — Casablanca",
  coordinates: "33.5361° N / 7.6560° W",
} as const;

/* ------------------------------------------------------------------ */
/* Photographies                                                        */
/* ------------------------------------------------------------------ */

export type Photo = {
  /** Fichier local : aucune image n'est chargée depuis un domaine externe. */
  src: string;
  /** Description réelle de la scène (jamais « photo d'atelier »). */
  alt: string;
  width: number;
  height: number;
};

/**
 * Neuf photographies libres (Wikimedia Commons), téléchargées une fois dans
 * `/public/templates/automobile/`. Voir `public/templates/CREDITS.md` et la
 * mention `PHOTO_CREDIT` affichée dans le pied de page.
 */
export const PHOTOS = {
  pont: {
    src: "/templates/automobile/atelier-pont-suspension.jpg",
    alt: "Mécanicien en combinaison soutenant un train arrière au vérin sous un véhicule levé sur pont élévateur",
    width: 1920,
    height: 2876,
  },
  commande: {
    src: "/templates/automobile/commande-pont-elevateur.jpg",
    alt: "Groupe hydraulique et boîtier de commande d'un pont élévateur deux colonnes, véhicule rouge levé en arrière-plan",
    width: 1920,
    height: 2876,
  },
  outillage: {
    src: "/templates/automobile/mur-outillage.jpg",
    alt: "Panneau mural d'atelier : clés plates et mixtes alignées par taille au-dessus d'un établi de tournevis et de pinces",
    width: 3840,
    height: 2563,
  },
  papillon: {
    src: "/templates/automobile/detail-papillon-admission.jpg",
    alt: "Gros plan sur un boîtier papillon démonté et ses durites dans un compartiment moteur",
    width: 3840,
    height: 2560,
  },
  bougie: {
    src: "/templates/automobile/bougie-allumage.jpg",
    alt: "Mains gantées d'un mécanicien extrayant une bougie d'allumage du cache-culbuteurs d'un moteur",
    width: 1920,
    height: 2886,
  },
  collecteur: {
    src: "/templates/automobile/collecteur-admission.jpg",
    alt: "Collecteur d'admission déposé au-dessus d'un moteur, carrosserie rouge visible autour du compartiment",
    width: 1920,
    height: 2876,
  },
  gomme: {
    src: "/templates/automobile/gomme-pneumatiques.jpg",
    alt: "Pneumatiques déposés et empilés, sculptures de bande de roulement vues de près",
    width: 1920,
    height: 2876,
  },
  freinage: {
    src: "/templates/automobile/freinage-disque-atelier.jpg",
    alt: "Disque de frein découvert dans le passage de roue d'une voiture en cours d'intervention",
    width: 1280,
    height: 853,
  },
  geometrie: {
    src: "/templates/automobile/geometrie-banc-atelier.jpg",
    alt: "Technicien réglant un banc de géométrie devant une roue montée sur la machine",
    width: 960,
    height: 1438,
  },
} as const satisfies Record<string, Photo>;

export type PhotoKey = keyof typeof PHOTOS;

/**
 * Mention d'attribution obligatoire : les photographies sont sous licence
 * CC BY / CC0, le crédit doit rester visible sur la page.
 */
export const PHOTO_CREDIT =
  "Photographies : Wikimedia Commons — atelier, pont élévateur, moteurs et bougie (Shixart1985, CC BY 2.0), mur d'outillage (Nenad Stojkovic, CC BY 2.0), pneumatiques déposés (PheobeLongneck, CC0).";

export type ServiceFamily = "Mécanique" | "Électronique" | "Pneumatiques";

export const SERVICE_FAMILIES: readonly ServiceFamily[] = [
  "Mécanique",
  "Électronique",
  "Pneumatiques",
];

export type Service = {
  ref: string;
  title: string;
  family: ServiceFamily;
  description: string;
  price: string;
  duration: string;
};

export const SERVICES: Service[] = [
  {
    ref: "01",
    title: "Vidange & entretien périodique",
    family: "Mécanique",
    description:
      "Huile constructeur, filtres à huile, air et habitacle, contrôle des niveaux et remise à zéro du témoin d'entretien.",
    price: "dès 480 MAD",
    duration: "45 min",
  },
  {
    ref: "02",
    title: "Diagnostic électronique complet",
    family: "Électronique",
    description:
      "Lecture des calculateurs, analyse des trames capteurs en direct et rapport écrit des défauts avant tout devis.",
    price: "350 MAD",
    duration: "30 min",
  },
  {
    ref: "03",
    title: "Freinage : disques & plaquettes",
    family: "Mécanique",
    description:
      "Contrôle d'épaisseur au micromètre, remplacement par train complet, purge du circuit et essai routier de validation.",
    price: "dès 890 MAD",
    duration: "1 h 30",
  },
  {
    ref: "04",
    title: "Géométrie & parallélisme 3D",
    family: "Pneumatiques",
    description:
      "Mesure des angles de carrossage, chasse et pincement au banc 3D, réglage aux valeurs constructeur et fiche de contrôle.",
    price: "400 MAD",
    duration: "40 min",
  },
  {
    ref: "05",
    title: "Montage & équilibrage pneumatiques",
    family: "Pneumatiques",
    description:
      "Démontage sans pincement du talon, équilibrage dynamique à la roue et contrôle des valves et du couple de serrage.",
    price: "120 MAD / roue",
    duration: "20 min",
  },
  {
    ref: "06",
    title: "Climatisation : contrôle & recharge",
    family: "Électronique",
    description:
      "Recherche de fuite au traceur, tirage au vide, recharge pesée au gramme près et mesure de la température de soufflage.",
    price: "550 MAD",
    duration: "45 min",
  },
  {
    ref: "07",
    title: "Révision constructeur complète",
    family: "Mécanique",
    description:
      "Plan d'entretien intégral suivant kilométrage, contrôle en 42 points et carnet numérique remis le jour même.",
    price: "dès 1 450 MAD",
    duration: "3 h",
  },
];

export type JobArt = "engine" | "brake" | "gauge" | "suspension";

export type Job = {
  ref: string;
  art: JobArt;
  /** Fiches illustrées par une photo réelle ; les autres gardent la planche SVG. */
  photo?: PhotoKey;
  title: string;
  description: string;
  specs: readonly [string, string][];
};

export const JOBS: Job[] = [
  {
    ref: "VX-2417",
    art: "engine",
    photo: "collecteur",
    title: "Révision complète — Berline familiale",
    description:
      "Plan d'entretien 120 000 km : huile, filtration intégrale, bougies, courroie d'accessoires et contrôle en 42 points.",
    specs: [
      ["Atelier", "3 h 20"],
      ["Contrôle", "42 points"],
      ["Restitution", "Jour même"],
    ],
  },
  {
    ref: "VX-2402",
    art: "brake",
    photo: "freinage",
    title: "Freinage intégral — Citadine",
    description:
      "Disques et plaquettes avant/arrière, purge complète du circuit puis vérification du bloc ABS au banc de diagnostic.",
    specs: [
      ["Atelier", "2 h 10"],
      ["Pièces", "4 disques"],
      ["Essai", "12 km"],
    ],
  },
  {
    ref: "VX-2388",
    art: "gauge",
    photo: "bougie",
    title: "Diagnostic électronique — SUV",
    description:
      "Défaut intermittent au calculateur moteur : relevé des trames, test des capteurs sous charge puis reprogrammation.",
    specs: [
      ["Atelier", "1 h 45"],
      ["Codes lus", "12"],
      ["Résolu", "Sans dépose"],
    ],
  },
  {
    ref: "VX-2371",
    art: "suspension",
    photo: "geometrie",
    title: "Train avant & géométrie — Break",
    description:
      "Rotules et amortisseurs avant remplacés, puis réglage complet de la géométrie sur banc 3D et fiche de mesure remise.",
    specs: [
      ["Atelier", "4 h"],
      ["Tolérance", "±0,05°"],
      ["Banc", "3D"],
    ],
  },
];

/* ------------------------------------------------------------------ */
/* Bande « Matière & outillage » : mosaïque diagonale de trois photos.  */
/* ------------------------------------------------------------------ */

export type MaterialShot = {
  photo: PhotoKey;
  /** Repère technique affiché en surimpression, dans l'esprit d'une cote. */
  tag: string;
  title: string;
  body: string;
};

export const MATERIALS: readonly MaterialShot[] = [
  {
    photo: "outillage",
    tag: "OUT—01",
    title: "Outillage rangé, jamais improvisé",
    body: "Clés au couple, douilles calibrées et servantes dédiées par poste : chaque serrage est fait avec l'outil prévu pour lui.",
  },
  {
    photo: "papillon",
    tag: "MEC—02",
    title: "Nettoyage boîtier papillon",
    body: "Dépose, décalaminage et réapprentissage du point zéro après remontage.",
  },
  {
    photo: "gomme",
    tag: "PNE—03",
    title: "Gomme contrôlée à la profondeur",
    body: "Témoins d'usure relevés à la jauge, dates de fabrication vérifiées avant remontage.",
  },
];

export type Stat = {
  value: number;
  suffix: string;
  label: string;
  caption: string;
};

export const STATS: Stat[] = [
  {
    value: 18,
    suffix: " ans",
    label: "d'atelier",
    caption: "Une équipe formée sur les mêmes bancs depuis l'ouverture.",
  },
  {
    value: 12400,
    suffix: "",
    label: "véhicules suivis",
    caption: "Historique d'entretien conservé pour chaque immatriculation.",
  },
  {
    value: 6,
    suffix: "",
    label: "postes de travail",
    caption: "Quatre ponts élévateurs, un banc 3D, une baie électronique.",
  },
  {
    value: 48,
    suffix: " h",
    label: "d'immobilisation moyenne",
    caption: "Délai annoncé avant travaux, tenu ou remboursé.",
  },
];

export const COMMITMENTS: readonly { title: string; body: string }[] = [
  {
    title: "Devis mesuré, jamais estimé",
    body: "Aucune pièce n'est commandée avant le relevé au banc et votre accord écrit sur le montant exact.",
  },
  {
    title: "Pièces tracées",
    body: "Référence, provenance et garantie de chaque pièce montée figurent sur la facture remise.",
  },
  {
    title: "Restitution documentée",
    body: "Fiche de contrôle chiffrée, photos des pièces déposées et prochaines échéances d'entretien.",
  },
];

export type HourRow = { day: string; hours: string; closed?: boolean };

export const HOURS: HourRow[] = [
  { day: "Lundi — Vendredi", hours: "08:00 — 19:00" },
  { day: "Samedi", hours: "08:00 — 14:00" },
  { day: "Dimanche", hours: "Fermé", closed: true },
];

export const FACILITIES: readonly string[] = [
  "Parking client couvert",
  "Salle d'attente et wifi",
  "Navette locale sur demande",
  "Véhicule de courtoisie (sous réserve)",
];

export const NAV_LINKS: readonly { href: string; label: string }[] = [
  { href: "#prestations", label: "Prestations" },
  { href: "#atelier", label: "Atelier" },
  { href: "#expertise", label: "Expertise" },
  { href: "#acces", label: "Accès" },
];
