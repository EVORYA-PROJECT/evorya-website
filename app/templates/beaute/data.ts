/**
 * Contenu de la démonstration sectorielle « Beauté / Spa ».
 *
 * Institut Soline est une marque ENTIÈREMENT FICTIVE, créée par Evorya pour
 * montrer un niveau de finition sur un site d'institut. Aucun avis, aucune
 * récompense, aucun chiffre réel : uniquement des soins, des tarifs et des
 * praticiennes inventés, cohérents entre eux.
 *
 * Tout le contenu éditorial de la page vit ici pour rester modifiable sans
 * toucher à la mise en page.
 */

export const INSTITUT = {
  nom: "Institut Soline",
  secteur: "Beauté & soins",
  ville: "Casablanca",
  baseline: "Un lieu calme, des gestes lents, une peau qui respire.",
  intro:
    "Institut de beauté et de soins du corps installé à Gauthier. Cabines individuelles, protocoles sur mesure et produits formulés à partir d'huiles végétales marocaines.",
  adresse: "12, rue des Orangers — Gauthier, Casablanca",
  telephone: "+212 5 22 00 18 40",
  telephoneLien: "+212522001840",
  email: "bonjour@institut-soline.ma",
} as const;

/**
 * Photographies réelles de la démo — fichiers locaux, téléchargés une fois
 * depuis Wikimedia Commons (licences CC BY-SA), jamais de hotlink. Voir
 * `public/templates/CREDITS.md` : la mention `PHOTO_CREDIT` ci-dessous doit
 * rester visible dans le pied de page.
 *
 * Les `alt` décrivent la SCÈNE (matière, lumière, composition) et n'affirment
 * jamais qu'il s'agit d'un reportage dans cet institut, qui est fictif.
 */
export type PhotoAsset = {
  readonly src: string;
  readonly width: number;
  readonly height: number;
  readonly alt: string;
  /** Miniature 12px encodée en base64 : évite le trou clair avant chargement. */
  readonly blur: string;
};

export const PHOTOS = {
  cabine: {
    src: "/templates/beaute/cabine-lumiere.jpg",
    width: 2200,
    height: 1901,
    alt: "Cabine de soin en lumière naturelle : table habillée de linge blanc, chemin de table écru, bol chantant en laiton, rideaux de lin devant une grande baie voilée et flacons d'huile alignés sur une desserte en rotin.",
    blur: "data:image/jpeg;base64,/9j/2wBDABQODxIPDRQSEBIXFRQYHjIhHhwcHj0sLiQySUBMS0dARkVQWnNiUFVtVkVGZIhlbXd7gYKBTmCNl4x9lnN+gXz/2wBDARUXFx4aHjshITt8U0ZTfHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHz/wAARCAAKAAwDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAwX/xAAfEAACAQQCAwAAAAAAAAAAAAABAgMABBEhEzESUWH/xAAUAQEAAAAAAAAAAAAAAAAAAAAD/8QAFxEAAwEAAAAAAAAAAAAAAAAAAAEhAv/aAAwDAQACEQMRAD8ASKGFrqDkRQCTnOs6p7yGNJsIoUYGhTOqi2JCjPj3j5UV2PI2z37odRCKs//Z",
  },
  coupole: {
    src: "/templates/beaute/coupole-platre.jpg",
    width: 2200,
    height: 1650,
    alt: "Coupole de plâtre sculpté vue du dessous : entrelacs végétaux ciselés dans la masse, six oculi vitrés laissant filtrer le jour et une suspension de laiton au centre.",
    blur: "data:image/jpeg;base64,/9j/2wBDABQODxIPDRQSEBIXFRQYHjIhHhwcHj0sLiQySUBMS0dARkVQWnNiUFVtVkVGZIhlbXd7gYKBTmCNl4x9lnN+gXz/2wBDARUXFx4aHjshITt8U0ZTfHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHz/wAARCAAJAAwDASIAAhEBAxEB/8QAFgABAQEAAAAAAAAAAAAAAAAAAwIE/8QAIRAAAQMDBAMAAAAAAAAAAAAAAQACAxEhcRIyNEFhscH/xAAVAQEBAAAAAAAAAAAAAAAAAAABAv/EABQRAQAAAAAAAAAAAAAAAAAAAAD/2gAMAwEAAhEDEQA/ADkNxeo6JFE8biGgFxHjSs7+PBj6rl3DA9KS/9k=",
  },
  hammam: {
    src: "/templates/beaute/hammam-pierre.jpg",
    width: 2200,
    height: 1467,
    alt: "Salle chaude d'un bain traditionnel : pierre claire, niches en arc abritant des vasques de marbre, grande pierre centrale polie et coupole percée au-dessus.",
    blur: "data:image/jpeg;base64,/9j/2wBDABQODxIPDRQSEBIXFRQYHjIhHhwcHj0sLiQySUBMS0dARkVQWnNiUFVtVkVGZIhlbXd7gYKBTmCNl4x9lnN+gXz/2wBDARUXFx4aHjshITt8U0ZTfHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHz/wAARCAAIAAwDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAL/xAAZEAEBAAMBAAAAAAAAAAAAAAABAgARIYH/xAAUAQEAAAAAAAAAAAAAAAAAAAAD/8QAFhEBAQEAAAAAAAAAAAAAAAAAAAER/9oADAMBAAIRAxEAPwCogoC5ktec2ayb0V0TzGMHDWv/2Q==",
  },
  stuc: {
    src: "/templates/beaute/mur-stuc-bois.jpg",
    width: 2200,
    height: 1650,
    alt: "Panneau de plâtre sculpté couleur crème posé au-dessus d'une boiserie de cèdre : arcs découpés, rosace centrale et frises d'entrelacs très fins.",
    blur: "data:image/jpeg;base64,/9j/2wBDABQODxIPDRQSEBIXFRQYHjIhHhwcHj0sLiQySUBMS0dARkVQWnNiUFVtVkVGZIhlbXd7gYKBTmCNl4x9lnN+gXz/2wBDARUXFx4aHjshITt8U0ZTfHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHz/wAARCAAJAAwDASIAAhEBAxEB/8QAFgABAQEAAAAAAAAAAAAAAAAAAgAG/8QAHBAAAgIDAQEAAAAAAAAAAAAAAQIAAwQRMRKB/8QAFQEBAQAAAAAAAAAAAAAAAAAAAgP/xAAVEQEBAAAAAAAAAAAAAAAAAAAAEv/aAAwDAQACEQMRAD8AWRm00aWl0cM2ySRGbsOw+jeAT0bEyY58k3YKVh//2Q==",
  },
  arcades: {
    src: "/templates/beaute/salle-arcades.jpg",
    width: 2200,
    height: 1650,
    alt: "Grande salle d'accueil à arcades de plâtre sculpté : voûte percée d'oculi, lanterne de laiton suspendue, murs blancs et fenêtres de bois ajourées.",
    blur: "data:image/jpeg;base64,/9j/2wBDABQODxIPDRQSEBIXFRQYHjIhHhwcHj0sLiQySUBMS0dARkVQWnNiUFVtVkVGZIhlbXd7gYKBTmCNl4x9lnN+gXz/2wBDARUXFx4aHjshITt8U0ZTfHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHz/wAARCAAJAAwDASIAAhEBAxEB/8QAFgABAQEAAAAAAAAAAAAAAAAABAMF/8QAHxAAAgICAQUAAAAAAAAAAAAAAQIDBAARIRIxMnJz/8QAFAEBAAAAAAAAAAAAAAAAAAAAAv/EABURAQEAAAAAAAAAAAAAAAAAAAAR/9oADAMBAAIRAxEAPwCFqvFMyvCAmwCepiNnFxitHEiLETocnZ5OZd/wX3GLr9pPocEOv//Z",
  },
  sol: {
    src: "/templates/beaute/sol-marbre.jpg",
    width: 1650,
    height: 2200,
    alt: "Détail d'un sol de bain traditionnel : dalle de marbre percée de douze trous pour laisser monter la vapeur, encadrée de mosaïques noires et blanches en damier.",
    blur: "data:image/jpeg;base64,/9j/2wBDABQODxIPDRQSEBIXFRQYHjIhHhwcHj0sLiQySUBMS0dARkVQWnNiUFVtVkVGZIhlbXd7gYKBTmCNl4x9lnN+gXz/2wBDARUXFx4aHjshITt8U0ZTfHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHz/wAARCAAQAAwDASIAAhEBAxEB/8QAFwAAAwEAAAAAAAAAAAAAAAAAAQIDBf/EAB0QAAICAgMBAAAAAAAAAAAAAAECAAMRIQQSobH/xAAUAQEAAAAAAAAAAAAAAAAAAAAB/8QAFREBAQAAAAAAAAAAAAAAAAAAACH/2gAMAwEAAhEDEQA/AMKlctkfIt3IsNhAcjrrUnVeyYAb2BlyxLHcKY//2Q==",
  },
  preparation: {
    src: "/templates/beaute/preparation-huiles-spa.jpg",
    width: 1200,
    height: 1800,
    alt: "Flacon ambré, huile dorée et accessoires de soin disposés dans une lumière naturelle douce.",
    blur: "data:image/jpeg;base64,/9j/2wBDABIMDRANCxIQDhAUExIVGywdGxgYGzYnKSAsQDlEQz85Pj1HUGZXR0thTT0+WXlaYWltcnNyRVV9hnxvhWZwcm7/2wBDARMUFBsXGzQdHTRuST5Jbm5ubm5ubm5ubm5ubm5ubm5ubm5ubm5ubm5ubm5ubm5ubm5ubm5ubm5ubm5ubm7/wAARCAASAAwDASIAAhEBAxEB/8QAGQAAAgMBAAAAAAAAAAAAAAAAAAUBAgME/8QAIBAAAgEDBQEBAAAAAAAAAAAAAQIAAxEhBBITIjEFwf/EABUBAQEAAAAAAAAAAAAAAAAAAAIB/8QAGBEBAAMBAAAAAAAAAAAAAAAAAAECEUH/2gAMAwEAAhEDEQA/AHfCFQYmNRFDZkP9HmXTcVJxsJ349FsS7Umq2Y7Vx5uU/sm8LCzUVHXTdXYdx4Z2USTRS5viEI6hL//Z",
  },
  cabineGalerie: {
    src: "/templates/beaute/cabine-spa-lumiere-chaude.jpg",
    width: 1600,
    height: 2400,
    alt: "Cabine de soin avec table de massage blanche, linge roulé et grande fenêtre en lumière naturelle.",
    blur: "data:image/jpeg;base64,/9j/2wBDABIMDRANCxIQDhAUExIVGywdGxgYGzYnKSAsQDlEQz85Pj1HUGZXR0thTT0+WXlaYWltcnNyRVV9hnxvhWZwcm7/2wBDARMUFBsXGzQdHTRuST5Jbm5ubm5ubm5ubm5ubm5ubm5ubm5ubm5ubm5ubm5ubm5ubm5ubm5ubm5ubm5ubm7/wAARCAASAAwDASIAAhEBAxEB/8QAGAAAAgMAAAAAAAAAAAAAAAAAAAMEBQb/xAAiEAACAQQBBAMAAAAAAAAAAAABAgMABBESIQUTUWExQlL/xAAVAQEBAAAAAAAAAAAAAAAAAAAAAv/EABcRAQEBAQAAAAAAAAAAAAAAAAABESH/2gAMAwEAAhEDEQA/AH9QuI2tOzcTbIW1IB2Pz6FUNtZq8CHUjAxgjmtGegWKqDLPM0g++wHPoYpM8cMMmkEKBR+iQSfNV1NxDs5pCk5Mjk4HJY+aSrMY0JJyV80UUo//2Q==",
  },
  visage: {
    src: "/templates/beaute/soin-visage-massage.jpg",
    width: 1800,
    height: 2549,
    alt: "Praticienne réalisant un massage du visage dans une cabine lumineuse aux tons crème et bois.",
    blur: "data:image/jpeg;base64,/9j/2wBDABIMDRANCxIQDhAUExIVGywdGxgYGzYnKSAsQDlEQz85Pj1HUGZXR0thTT0+WXlaYWltcnNyRVV9hnxvhWZwcm7/2wBDARMUFBsXGzQdHTRuST5Jbm5ubm5ubm5ubm5ubm5ubm5ubm5ubm5ubm5ubm5ubm5ubm5ubm5ubm5ubm5ubm7/wAARCAASAAwDASIAAhEBAxEB/8QAGAAAAgMAAAAAAAAAAAAAAAAAAAMEBQb/xAAiEAACAQQBBAMAAAAAAAAAAAABAgMABBESIQUTUWExQlL/xAAVAQEBAAAAAAAAAAAAAAAAAAAAAv/EABcRAQEBAQAAAAAAAAAAAAAAAAABESH/2gAMAwEAAhEDEQA/AH9QuI2tOzcTbIW1IB2Pz6FUNtZq8CHUjAxgjmtGegWKqDLPM0g++wHPoYpM8cMMmkEKBR+iQSfNV1NxDs5pCk5Mjk4HJY+aSrMY0JJyV80UUo//2Q==",
  },
  massage: {
    src: "/templates/beaute/massage-huile-dos.jpg",
    width: 1800,
    height: 1200,
    alt: "Mains d'une praticienne préparant une huile de massage au-dessus du dos d'une cliente dans une lumière chaude.",
    blur: "data:image/jpeg;base64,/9j/2wBDABIMDRANCxIQDhAUExIVGywdGxgYGzYnKSAsQDlEQz85Pj1HUGZXR0thTT0+WXlaYWltcnNyRVV9hnxvhWZwcm7/2wBDARMUFBsXGzQdHTRuST5Jbm5ubm5ubm5ubm5ubm5ubm5ubm5ubm5ubm5ubm5ubm5ubm5ubm5ubm5ubm5ubm7/wAARCAASAAwDASIAAhEBAxEB/8QAGAAAAgMAAAAAAAAAAAAAAAAAAAMEBQb/xAAiEAACAQQBBAMAAAAAAAAAAAABAgMABBESIQUTUWExQlL/xAAVAQEBAAAAAAAAAAAAAAAAAAAAAv/EABcRAQEBAQAAAAAAAAAAAAAAAAABESH/2gAMAwEAAhEDEQA/AH9QuI2tOzcTbIW1IB2Pz6FUNtZq8CHUjAxgjmtGegWKqDLPM0g++wHPoYpM8cMMmkEKBR+iQSfNV1NxDs5pCk5Mjk4HJY+aSrMY0JJyV80UUo//2Q==",
  },
  serum: {
    src: "/templates/beaute/serum-pipette.jpg",
    width: 1800,
    height: 2696,
    alt: "Goutte de sérum déposée à la pipette dans une main, sur une table de soins baignée de lumière naturelle.",
    blur: "data:image/jpeg;base64,/9j/2wBDABIMDRANCxIQDhAUExIVGywdGxgYGzYnKSAsQDlEQz85Pj1HUGZXR0thTT0+WXlaYWltcnNyRVV9hnxvhWZwcm7/2wBDARMUFBsXGzQdHTRuST5Jbm5ubm5ubm5ubm5ubm5ubm5ubm5ubm5ubm5ubm5ubm5ubm5ubm5ubm5ubm5ubm7/wAARCAASAAwDASIAAhEBAxEB/8QAGAAAAgMAAAAAAAAAAAAAAAAAAAMEBQb/xAAiEAACAQQBBAMAAAAAAAAAAAABAgMABBESIQUTUWExQlL/xAAVAQEBAAAAAAAAAAAAAAAAAAAAAv/EABcRAQEBAQAAAAAAAAAAAAAAAAABESH/2gAMAwEAAhEDEQA/AH9QuI2tOzcTbIW1IB2Pz6FUNtZq8CHUjAxgjmtGegWKqDLPM0g++wHPoYpM8cMMmkEKBR+iQSfNV1NxDs5pCk5Mjk4HJY+aSrMY0JJyV80UUo//2Q==",
  },
} as const satisfies Record<string, PhotoAsset>;

export type PhotoKey = keyof typeof PHOTOS;

/**
 * Mention légale obligatoire (CC BY-SA) — affichée dans le pied de page.
 */
export const PHOTO_CREDIT =
  "Photographies : Wikimedia Commons (CC BY-SA 4.0) et Pexels — Ivan S, Kaboompics / Karolina Grabowska, PNW Production, Tuğba ÖZTÜRK et KoolShooters (licence Pexels).";

export const REPERES = [
  {
    titre: "Quatre cabines",
    texte: "Chacune insonorisée, en lumière naturelle indirecte, pour un soin à la fois.",
  },
  {
    titre: "Formules végétales",
    texte: "Argan, figue de barbarie, camomille : des actifs simples, sans parfum de synthèse.",
  },
  {
    titre: "Bilan avant chaque soin",
    texte: "Dix minutes d'écoute pour ajuster le protocole à votre peau du jour.",
  },
] as const;

export type Soin = {
  nom: string;
  description: string;
  duree: string;
  prix: string;
};

export type CategorieSoins = {
  id: string;
  label: string;
  titre: string;
  intro: string;
  soins: Soin[];
};

export const CATEGORIES: CategorieSoins[] = [
  {
    id: "visage",
    label: "Visage",
    titre: "Soins du visage",
    intro:
      "Des protocoles courts ou longs, toujours construits autour du même principe : peu de produits, beaucoup de temps de pose et de massage manuel.",
    soins: [
      {
        nom: "Lumière douce",
        description:
          "Nettoyage, gommage enzymatique et massage drainant du visage. Le soin d'entrée, idéal avant un événement.",
        duree: "60 min",
        prix: "480 MAD",
      },
      {
        nom: "Hydratation profonde",
        description:
          "Double masque à la figue de barbarie et sérum hyaluronique, pour les peaux qui tirent après l'hiver ou la climatisation.",
        duree: "75 min",
        prix: "620 MAD",
      },
      {
        nom: "Rituel fermeté argan",
        description:
          "Modelage lifting manuel, huile d'argan tiède et masque raffermissant. Notre protocole le plus complet.",
        duree: "90 min",
        prix: "850 MAD",
      },
      {
        nom: "Mise au net",
        description:
          "Nettoyage de peau, extraction douce et masque apaisant. Sans parfum, adapté aux peaux réactives.",
        duree: "45 min",
        prix: "360 MAD",
      },
    ],
  },
  {
    id: "corps",
    label: "Corps",
    titre: "Soins du corps",
    intro:
      "Gommages, enveloppements et rituels chauds, pensés comme des parenthèses longues plutôt que comme des prestations enchaînées.",
    soins: [
      {
        nom: "Gommage sel de Mogador",
        description:
          "Exfoliation au sel marin et huile d'olive, suivie d'une application de lait corps à la fleur d'oranger.",
        duree: "45 min",
        prix: "340 MAD",
      },
      {
        nom: "Enveloppement argile & camomille",
        description:
          "Argile verte tiède appliquée au pinceau, repos sous linge chaud, puis rinçage à la douche affusion.",
        duree: "60 min",
        prix: "520 MAD",
      },
      {
        nom: "Rituel hammam Soline",
        description:
          "Savon noir, gant de kessa, rhassoul et modelage à l'huile d'argan. Notre rituel signature, en cabine privative.",
        duree: "90 min",
        prix: "700 MAD",
      },
      {
        nom: "Jambes légères",
        description:
          "Drainage manuel ascendant et gel frais mentholé, pour les fins de journée debout.",
        duree: "40 min",
        prix: "300 MAD",
      },
    ],
  },
  {
    id: "massages",
    label: "Massages",
    titre: "Massages",
    intro:
      "Quatre pressions, quatre intentions. La praticienne ajuste l'intensité avec vous dès les premières minutes, puis le silence est de mise.",
    soins: [
      {
        nom: "Massage Soline",
        description:
          "Notre massage signature : huiles tièdes, mouvements lents et enveloppants, du dos jusqu'au cuir chevelu.",
        duree: "60 min",
        prix: "550 MAD",
      },
      {
        nom: "Pierres chaudes",
        description:
          "Basalte chauffé posé le long de la colonne, pour relâcher les tensions installées.",
        duree: "75 min",
        prix: "690 MAD",
      },
      {
        nom: "Deep tissue",
        description:
          "Travail profond et localisé sur les zones nouées : nuque, trapèzes, bas du dos.",
        duree: "60 min",
        prix: "600 MAD",
      },
      {
        nom: "Massage prénatal",
        description:
          "Installation latérale, pressions douces et huile neutre. À partir du quatrième mois.",
        duree: "50 min",
        prix: "480 MAD",
      },
    ],
  },
  {
    id: "bien-etre",
    label: "Bien-être",
    titre: "Bien-être",
    intro:
      "Des formats plus courts ou partagés, pour venir sans y consacrer une demi-journée — ou au contraire pour venir à deux.",
    soins: [
      {
        nom: "Réflexologie plantaire",
        description:
          "Pressions sur les zones réflexes des pieds, en position semi-allongée, lumière basse.",
        duree: "45 min",
        prix: "380 MAD",
      },
      {
        nom: "Dos & respiration",
        description:
          "Modelage du dos accompagné d'un guidage respiratoire simple, à refaire chez soi.",
        duree: "60 min",
        prix: "520 MAD",
      },
      {
        nom: "Parenthèse duo",
        description:
          "Deux praticiennes, une cabine double : gommage puis massage, en simultané.",
        duree: "2 × 60 min",
        prix: "1 150 MAD",
      },
      {
        nom: "Bilan peau & conseil",
        description:
          "Lecture de peau, questions d'habitudes et recommandation de rituel. Sans achat obligatoire.",
        duree: "30 min",
        prix: "Offert",
      },
    ],
  },
];

export const RITUEL = [
  {
    numero: "01",
    titre: "L'accueil",
    texte:
      "Dix minutes au calme, une infusion, et quelques questions sur votre peau, votre sommeil, votre semaine.",
  },
  {
    numero: "02",
    titre: "Le soin",
    texte:
      "La praticienne annonce le déroulé une fois, puis se tait. Aucune vente, aucune interruption.",
  },
  {
    numero: "03",
    titre: "Le repos",
    texte:
      "Un quart d'heure dans le salon bas, sans obligation de repartir tout de suite.",
  },
  {
    numero: "04",
    titre: "Le conseil",
    texte:
      "Deux gestes à garder chez vous, notés sur une carte. Le reste peut attendre la prochaine fois.",
  },
] as const;

/**
 * Encart « matière » posé en regard du déroulé : il donne une contrepartie
 * concrète (ce qu'on applique) au texte de protocole (ce qu'on fait).
 */
export const MATIERE = {
  eyebrow: "Ce qu'on applique",
  titre: "Préparé le matin même.",
  texte:
    "Argile verte, rhassoul de l'Atlas, savon noir, huile d'argan tiédie au bain-marie. Les mélanges sont faits en petites quantités, le jour même, et jamais parfumés.",
  legende: "Plâtre sculpté et cèdre — mur du couloir d'entrée",
} as const;

/**
 * Bande pleine largeur qui sépare le déroulé de la carte : une respiration
 * photographique avant la partie tarifaire.
 */
export const BANDE = {
  eyebrow: "Le rituel hammam",
  titre: "Quatre-vingt-dix minutes,\nune seule personne à la fois.",
  texte:
    "Savon noir, gant de kessa, rhassoul, puis modelage à l'huile d'argan. Le hammam privatif n'accueille qu'une personne — ou un duo — par créneau.",
  legende: "Salle chaude — pierre claire et marbre",
} as const;

export type Praticienne = {
  initiales: string;
  nom: string;
  role: string;
  texte: string;
};

export const EQUIPE: Praticienne[] = [
  {
    initiales: "SB",
    nom: "Soline Berrada",
    role: "Fondatrice — soins du visage",
    texte:
      "Douze ans en institut avant d'ouvrir le sien, avec une idée fixe : moins de produits, plus de main.",
  },
  {
    initiales: "NE",
    nom: "Nadia El Ouafi",
    role: "Praticienne — massages",
    texte:
      "Formée aux techniques profondes et au massage prénatal. Ajuste la pression sans qu'on ait à le demander.",
  },
  {
    initiales: "IG",
    nom: "Inès Gharbi",
    role: "Praticienne — corps & hammam",
    texte:
      "Responsable du rituel hammam et des enveloppements. Choisit les argiles selon la saison.",
  },
];

/**
 * Mosaïque du lieu : quatre photographies réelles.
 */
export type VueGalerie = {
  legende: string;
  detail: string;
  /** Clé de PHOTOS. */
  photo?: PhotoKey;
};

export const GALERIE: readonly VueGalerie[] = [
  { legende: "Le salon bas", detail: "Temps de repos après le soin", photo: "arcades" },
  { legende: "Le geste", detail: "Massage manuel du visage", photo: "visage" },
  { legende: "Hammam privatif", detail: "Marbre percé, la vapeur monte du sol", photo: "sol" },
  { legende: "La matière", detail: "Sérum appliqué goutte à goutte", photo: "serum" },
  { legende: "Massage", detail: "Huile tiédie juste avant le soin", photo: "massage" },
  { legende: "Cabine 2", detail: "Lumière indirecte, linge chaud", photo: "cabineGalerie" },
];

export const HORAIRES = [
  { jour: "Lundi", heures: "Fermé" },
  { jour: "Mardi — Vendredi", heures: "10h00 — 20h00" },
  { jour: "Samedi", heures: "09h00 — 19h00" },
  { jour: "Dimanche", heures: "10h00 — 17h00" },
] as const;

export const NAV_LIENS = [
  { href: "#soins", label: "Soins" },
  { href: "#institut", label: "L'institut" },
  { href: "#equipe", label: "Équipe" },
  { href: "#infos", label: "Infos" },
] as const;
