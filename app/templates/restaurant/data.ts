/**
 * Contenu de la démo « KRUSH » — chaîne de restauration rapide fictive.
 *
 * Marque, produits, prix, adresses, comptes sociaux : TOUT est inventé et
 * n'existe que pour démontrer une direction artistique fast-food. Aucune
 * enseigne, aucune adresse et aucun compte réel ne sont utilisés.
 *
 * Deux règles de contenu tenues strictement dans ce fichier :
 *  1. AUCUNE boisson alcoolisée nulle part (carte, textes, photos) ;
 *  2. aucune allégation nutritionnelle ou de certification (« bio », « sans
 *     conservateurs », « 100 % naturel »…). On ne décrit que des gestes :
 *     smashé, grillé, pané, assemblé, servi.
 */

import { PHOTOS, type PhotoKey } from "./photos";

export const BRAND = {
  name: "KRUSH",
  /** Baseline courte, reprise en nav et en pied de page. */
  kicker: "Smash burgers & crispy chicken",
  slogan: "Smashé fort. Servi chaud.",
  claim:
    "Des steaks écrasés à la spatule sur la plancha brûlante, du poulet pané minute, des frites servies dans la foulée. Rien d'attendu, tout est monté à la commande.",
  instagram: "@krush.demo",
  tiktok: "@krush.demo",
  /** Mention affichée partout où une coordonnée serait attendue. */
  fictionNote: "Enseigne fictive présentée à titre de démonstration.",
} as const;

export type NavLink = { href: string; label: string };

export const NAV_LINKS: NavLink[] = [
  { href: "#best", label: "Best-sellers" },
  { href: "#signature", label: "Signature" },
  { href: "#menu", label: "Menu" },
  { href: "#crispy", label: "Crispy" },
  { href: "#spots", label: "Spots" },
];

/** Bande défilante du haut de page. Volontairement courte et scandée. */
export const MARQUEE_WORDS = [
  "SMASHÉ",
  "CROUSTILLANT",
  "BRÛLANT",
  "SAUCY",
  "LOADED",
  "FRAIS",
  "JUICY",
  "SERVI CHAUD",
] as const;

/* ------------------------------------------------------------------ */
/* Best-sellers                                                        */
/* ------------------------------------------------------------------ */

export type Product = {
  id: string;
  index: string;
  name: string;
  detail: string;
  /** Prix fictif en dirhams, sans unité : l'unité est écrite par le composant. */
  price: string;
  photo: PhotoKey;
  badge?: "signature" | "épicé" | "nouveau";
};

export const BEST_SELLERS: Product[] = [
  {
    id: "krush-double",
    index: "01",
    name: "Krush Double",
    detail: "Deux steaks smashés, double cheddar fondu, pickles, sauce Krush.",
    price: "78",
    photo: "signatureDouble",
    badge: "signature",
  },
  {
    id: "crispy-big",
    index: "02",
    name: "Crispy Big",
    detail: "Filet de poulet pané extra-croustillant, slaw rouge, sauce piquante.",
    price: "72",
    photo: "chickenSlaw",
    badge: "épicé",
  },
  {
    id: "bacon-smash",
    index: "03",
    name: "Bacon Smash",
    detail: "Steak smashé, bacon grillé, oignon caramélisé, cheddar orange.",
    price: "74",
    photo: "burgerAssiette",
  },
  {
    id: "tenders-box",
    index: "04",
    name: "Tenders Box 6",
    detail: "Six tenders panés minute, frites maison, deux sauces au choix.",
    price: "85",
    photo: "tenders",
    badge: "nouveau",
  },
];

/* ------------------------------------------------------------------ */
/* Produit signature — étiquettes révélées au scroll                   */
/* ------------------------------------------------------------------ */

/**
 * Une étiquette d'ingrédient posée sur la photo signature (desktop).
 *
 * `top` / `left` désignent la POINTE du filet, c'est-à-dire l'endroit exact de
 * la photo que l'étiquette montre — pas le coin de la boîte de texte. Le
 * composant `Signature` ancre l'élément en conséquence : bord gauche pour
 * `side: "right"`, bord droit pour `side: "left"`, et centrage vertical sur
 * `top`. Repositionner une étiquette se fait donc en lisant simplement les
 * coordonnées de l'ingrédient sur la photo.
 *
 * Les valeurs ci-dessous ont été relevées sur
 * `/templates/restaurant/signature-double-cheddar.jpg` telle qu'elle est
 * RECADRÉE dans son cadre 16/9 (`object-cover` rogne le haut et le bas de
 * l'image 3/2 d'origine) : un pourcentage lu sur le fichier source ne
 * correspond donc pas à un pourcentage lu dans le cadre.
 */
export type SignatureLabel = {
  /** Pointe du filet, en % de la hauteur du cadre photo. */
  top: number;
  /** Pointe du filet, en % de la largeur du cadre photo. */
  left: number;
  /** Côté où part la boîte de texte : le filet, lui, pointe vers l'ingrédient. */
  side: "left" | "right";
  title: string;
  note: string;
};

/*
 * Ordre = ordre d'apparition au scroll, de haut en bas de la photo.
 *
 * Aucune sauce n'est identifiable sur cette photographie : la quatrième
 * étiquette montre donc la tomate et la salade, qui y sont parfaitement
 * visibles, plutôt que de désigner un ingrédient absent de l'image.
 */
export const SIGNATURE_LABELS: SignatureLabel[] = [
  {
    /* Dôme du pain supérieur, au-dessus du premier steak. */
    top: 9,
    left: 52,
    side: "right",
    title: "Pain brioché",
    note: "Toasté au beurre sur la plancha",
  },
  {
    /* Grande coulée de cheddar qui nappe le steak du haut. */
    top: 27,
    left: 60,
    side: "right",
    title: "Double cheddar",
    note: "Fondu sous cloche, deux tranches",
  },
  {
    /* Croûte brune du premier steak, au centre de la photo. */
    top: 36,
    left: 52,
    side: "left",
    title: "2 × 80 g smashés",
    note: "Écrasés à la spatule, croûte caramélisée",
  },
  {
    /* Rondelle de tomate rouge, bordée de salade, sous le second steak. */
    top: 70,
    left: 47.5,
    side: "left",
    title: "Tomate & salade",
    note: "Tranchées au montage, jamais à l'avance",
  },
];

/* ------------------------------------------------------------------ */
/* Menu                                                                */
/* ------------------------------------------------------------------ */

export type MenuItem = {
  name: string;
  detail: string;
  price: string;
  tag?: "signature" | "épicé" | "nouveau";
};

export type MenuCategory = {
  id: string;
  label: string;
  note: string;
  photo: PhotoKey;
  items: MenuItem[];
};

export const MENU: MenuCategory[] = [
  {
    id: "burgers",
    label: "Burgers",
    note: "Steaks écrasés à la commande, jamais avant.",
    photo: "burgerPlanche",
    items: [
      {
        name: "Krush Double",
        detail: "Deux steaks smashés, double cheddar, pickles, sauce Krush.",
        price: "78",
        tag: "signature",
      },
      {
        name: "Bacon Smash",
        detail: "Steak smashé, bacon grillé, oignon caramélisé, cheddar.",
        price: "74",
      },
      {
        name: "Classic Smash",
        detail: "Steak smashé, cheddar, salade, tomate, sauce blanche.",
        price: "58",
      },
      {
        name: "Triple Cheese",
        detail: "Trois steaks, trois cheddars, oignon frais. Pour les grandes faims.",
        price: "96",
      },
      {
        name: "Veggie Smash",
        detail: "Galette de légumes grillés, cheddar fondu, pickles, sauce Krush.",
        price: "62",
      },
    ],
  },
  {
    id: "chicken",
    label: "Chicken",
    note: "Pané minute, frit à la commande, servi brûlant.",
    photo: "chickenCheddar",
    items: [
      {
        name: "Crispy Big",
        detail: "Filet pané extra-croustillant, slaw rouge, sauce piquante.",
        price: "72",
        tag: "épicé",
      },
      {
        name: "Hot Chicken",
        detail: "Filet pané enrobé de beurre pimenté, pickles, pain toasté.",
        price: "76",
        tag: "épicé",
      },
      {
        name: "Tenders × 4",
        detail: "Quatre tenders panés, une sauce au choix.",
        price: "55",
      },
      {
        name: "Tenders × 6",
        detail: "Six tenders panés, deux sauces au choix.",
        price: "78",
      },
      {
        name: "Chicken Wrap",
        detail: "Tenders coupés, salade, cheddar, sauce blanche, galette roulée.",
        price: "58",
        tag: "nouveau",
      },
    ],
  },
  {
    id: "sides",
    label: "Sides",
    note: "Sorties de friteuse, salées à chaud.",
    photo: "fritesBol",
    items: [
      { name: "Frites maison", detail: "Coupe fine, double cuisson, sel fin.", price: "25" },
      {
        name: "Loaded Frites",
        detail: "Cheddar fondu, bacon grillé, ciboulette, sauce Krush.",
        price: "45",
        tag: "signature",
      },
      { name: "Onion Rings", detail: "Rondelles d'oignon panées, sauce barbecue.", price: "35" },
      { name: "Frites sauce Krush", detail: "Frites maison nappées de sauce Krush.", price: "32" },
      { name: "Coleslaw", detail: "Chou blanc et carotte, assaisonnement crémeux.", price: "22" },
    ],
  },
  {
    id: "shakes",
    label: "Shakes",
    note: "Mixés au moment, épais, servis très froids.",
    photo: "shake",
    items: [
      { name: "Shake Vanille", detail: "Glace vanille, lait entier, chantilly.", price: "38" },
      { name: "Shake Chocolat", detail: "Glace chocolat, sauce chocolat, éclats de cacao.", price: "38" },
      { name: "Shake Fraise", detail: "Glace fraise, coulis de fraise, chantilly.", price: "38" },
      {
        name: "Shake Cookies",
        detail: "Glace vanille, cookies concassés, sauce chocolat.",
        price: "42",
        tag: "signature",
      },
    ],
  },
  {
    id: "desserts",
    label: "Desserts",
    note: "Petits formats, à emporter d'une main.",
    photo: "sundae",
    items: [
      { name: "Sundae Fraise", detail: "Glace vanille, coulis de fraise, chantilly.", price: "32" },
      { name: "Cookie tiède", detail: "Sorti du four, cœur fondant au chocolat.", price: "25" },
      { name: "Brownie", detail: "Brownie chocolat noir, éclats de noix de pécan.", price: "30" },
      { name: "Cornet glacé", detail: "Glace à l'italienne, cornet gaufré.", price: "20" },
    ],
  },
  {
    id: "boissons",
    label: "Boissons",
    note: "Carte 100 % sans alcool.",
    photo: "plateauRouge",
    items: [
      { name: "Soda 33 cl", detail: "Cola, orange ou citron, servi glacé.", price: "18" },
      { name: "Limonade maison", detail: "Citron pressé, eau pétillante, menthe fraîche.", price: "22" },
      { name: "Thé glacé citron", detail: "Infusé à froid, peu sucré.", price: "20" },
      { name: "Eau minérale 50 cl", detail: "Plate ou gazeuse.", price: "12" },
    ],
  },
];

/* ------------------------------------------------------------------ */
/* Étapes « préparé chez nous »                                        */
/* ------------------------------------------------------------------ */

export type FreshStep = {
  step: string;
  title: string;
  text: string;
  photo: PhotoKey;
};

export const FRESH_STEPS: FreshStep[] = [
  {
    step: "01",
    title: "Écrasé",
    text: "La boulette part sur la plancha brûlante et se fait écraser à la spatule : la croûte se forme en quelques secondes.",
    photo: "planchaBacon",
  },
  {
    step: "02",
    title: "Pané",
    text: "Le filet de poulet est pané puis plongé au moment de la commande. Il sort doré, jamais en attente.",
    photo: "chickenFriture",
  },
  {
    step: "03",
    title: "Monté",
    text: "Pain toasté, cheddar fondu sous cloche, sauce, pickles. Assemblé à la seconde, emballé dans la foulée.",
    photo: "burgerMacro",
  },
];

/* ------------------------------------------------------------------ */
/* Mur photo                                                           */
/* ------------------------------------------------------------------ */

export type WallTile = {
  photo: PhotoKey;
  caption: string;
  /** Classe de grille : chaque case a une forme différente. */
  className: string;
  /** Rapport hauteur/largeur appliqué au cadre. */
  ratio: string;
  parallax: number;
  objectPosition?: string;
};

/**
 * Les rapports ne sont pas choisis au hasard : sur une grille de 6 colonnes,
 * une case de 4 colonnes en 16/9 et une case de 2 colonnes en 8/9 ont
 * EXACTEMENT la même hauteur. Sans cet accord, la rangée prend la hauteur de
 * sa case la plus haute et les autres laissent un trou noir en dessous (vu,
 * corrigé). Les trois cases centrales en 3/4 sont plus hautes que les deux
 * rangées paysage : c'est la respiration de la mosaïque, pas un accident.
 */
export const WALL: WallTile[] = [
  {
    photo: "burgerBokeh",
    caption: "Classic Smash",
    className: "col-span-2 md:col-span-4",
    ratio: "16 / 9",
    parallax: 4,
  },
  {
    photo: "fritesBol",
    caption: "Frites maison",
    className: "col-span-2 md:col-span-2",
    ratio: "8 / 9",
    parallax: 6,
    objectPosition: "35% center",
  },
  {
    photo: "chickenFriture",
    caption: "Sortie de friteuse",
    className: "col-span-1 md:col-span-2",
    ratio: "3 / 4",
    parallax: 3,
    objectPosition: "60% center",
  },
  {
    photo: "sundae",
    caption: "Sundae fraise",
    className: "col-span-1 md:col-span-2",
    ratio: "3 / 4",
    parallax: 5,
  },
  {
    photo: "burgerArdoise",
    caption: "Vue de dessus",
    className: "col-span-2 md:col-span-2",
    ratio: "3 / 4",
    parallax: 4,
    objectPosition: "30% center",
  },
  {
    photo: "boiteVoiture",
    caption: "À emporter",
    className: "col-span-2 md:col-span-4",
    ratio: "16 / 9",
    parallax: 5,
  },
  {
    photo: "cornet",
    caption: "Cornet glacé",
    className: "col-span-2 md:col-span-2",
    ratio: "8 / 9",
    parallax: 6,
  },
];

/* ------------------------------------------------------------------ */
/* Spots (adresses fictives)                                           */
/* ------------------------------------------------------------------ */

export type Spot = {
  id: string;
  city: string;
  area: string;
  hours: string;
  services: string[];
  note: string;
  photo: PhotoKey;
};

export const SPOTS: Spot[] = [
  {
    id: "maarif",
    city: "Casablanca",
    area: "Maarif",
    hours: "11h – 00h",
    services: ["Sur place", "À emporter"],
    note: "Comptoir ouvert sur la rue, grande salle et bar à sauces.",
    photo: "salleVitrine",
  },
  {
    id: "ain-diab",
    city: "Casablanca",
    area: "Aïn Diab",
    hours: "12h – 01h",
    services: ["Sur place", "Terrasse"],
    note: "Terrasse face à la corniche, service continu jusqu'à tard.",
    photo: "plateauRouge",
  },
  {
    id: "agdal",
    city: "Rabat",
    area: "Agdal",
    hours: "11h30 – 23h30",
    services: ["À emporter", "Drive"],
    note: "Format compact, pensé pour la commande rapide et le drive.",
    photo: "boiteVoiture",
  },
  {
    id: "gueliz",
    city: "Marrakech",
    area: "Guéliz",
    hours: "Ouverture prochaine",
    services: ["Bientôt"],
    note: "Quatrième adresse en préparation, même carte, même plancha.",
    photo: "loadedBoites",
  },
];

/* ------------------------------------------------------------------ */
/* Crédits photographiques                                             */
/* ------------------------------------------------------------------ */

/**
 * Mention obligatoire : une partie des photographies est sous licence CC BY /
 * CC BY-SA, l'attribution doit rester visible sur la page (SiteFooter).
 * Les images CC0 n'exigent rien : elles sont créditées par courtoisie.
 */
export const PHOTO_CREDIT =
  "Photographies : Wikimedia Commons — série « DFC » (PattayaPatrol, CC BY-SA 4.0), « Smashburger and poutine from Two Dads One Truck » (The Bushranger, CC BY-SA 4.0), tenders (Missvain, CC BY 4.0) ; Niklas Rhöse, Eaters Collective, Markus Spiske, Brian Chan, Stephanie McCabe, Alex Jones, Christopher Flowers, Oliur Rahman et Jerry Kiesewetter (CC0).";

export { PHOTOS };
export type { PhotoKey };
