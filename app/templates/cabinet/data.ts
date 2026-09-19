/**
 * Contenu de la démonstration « Cabinet Verdon & Associés ».
 *
 * Marque, personnes, missions et coordonnées sont ENTIÈREMENT FICTIVES et
 * n'existent qu'à des fins de démonstration commerciale Evorya. Aucune
 * accréditation, aucun ordre professionnel, aucune qualification réglementée
 * n'est revendiqué : le cabinet est présenté comme une structure de conseil
 * et d'accompagnement généraliste.
 */

export const FIRM = {
  name: "Cabinet Verdon & Associés",
  shortName: "Verdon & Associés",
  monogram: "V&A",
  eyebrow: "Conseil et accompagnement des dirigeants",
  positioning:
    "Instruire les décisions qui engagent durablement l’entreprise.",
  intro:
    "Verdon & Associés accompagne dirigeants, directions générales et actionnaires lorsqu’une décision ne peut pas être prise à l’intuition : réorganisation, transmission, changement d’échelle, arbitrage d’investissement.",
  since: "2009",
  cities: "Paris · Lyon",
} as const;

/* -------------------------------------------------------------------------
 * Photographies
 *
 * Toutes libres de droits (Wikimedia Commons, CC0), téléchargées une fois
 * dans /public — jamais de hotlink. Architecture, matière et lieux de
 * travail uniquement : aucun portrait, donc aucun risque de laisser croire
 * qu'une personne réelle serait l'un des associés fictifs de cette page.
 * Les bâtiments photographiés n'ont évidemment aucun lien avec le cabinet.
 * ---------------------------------------------------------------------- */

export type PhotoAsset = {
  readonly src: string;
  readonly width: number;
  readonly height: number;
  readonly alt: string;
  /** Miniature 12px encodée en base64 : évite le trou sombre avant chargement. */
  readonly blur: string;
};

export const PHOTOS = {
  facade: {
    src: "/templates/cabinet/facade-grille.jpg",
    width: 1920,
    height: 1280,
    alt: "Angle d’un immeuble de bureaux contemporain : une trame régulière de fenêtres étroites creusées dans une façade de béton clair.",
    blur: "data:image/jpeg;base64,/9j/2wBDAAQDAwQDAwQEAwQFBAQFBgoHBgYGBg0JCggKDw0QEA8NDw4RExgUERIXEg4PFRwVFxkZGxsbEBQdHx0aHxgaGxr/2wBDAQQFBQYFBgwHBwwaEQ8RGhoaGhoaGhoaGhoaGhoaGhoaGhoaGhoaGhoaGhoaGhoaGhoaGhoaGhoaGhoaGhoaGhr/wAARCAANABQDASIAAhEBAxEB/8QAFwABAQEBAAAAAAAAAAAAAAAAAAUBBP/EACQQAAIBAwMEAwEAAAAAAAAAAAECAwQRIQAFEhMiMUFRYYEV/8QAFQEBAQAAAAAAAAAAAAAAAAAAAQP/xAAXEQEBAQEAAAAAAAAAAAAAAAAAEQFB/9oADAMBAAIRAxEAPwAxgq46N1jL0wYM+WSS56zHxmwKEEWPKy4sdctZNUrsdQWpw08nRhbgcxsjpxZgc3tKSMDt/NV6GmWVYZIwsKf2KqHpqMBUie31nqNe4962rjEO179UQ24rvFXF03AYAQACPj44juN/ZsucaolxJjoqCrMzVFPyKTSIl3ZuzmxXx8g3/dNVtmZGgmCK0apMYwFb0oC/H1poomP/2Q==",
  },
  architecture: {
    src: "/templates/cabinet/architecture-blanche.jpg",
    width: 1920,
    height: 2880,
    alt: "Bâtiment contemporain en béton clair vu en contre-plongée : portiques et terrasses dessinent une géométrie nette sur un ciel blanc.",
    blur: "data:image/jpeg;base64,/9j/2wBDAAQDAwQDAwQEAwQFBAQFBgoHBgYGBg0JCggKDw0QEA8NDw4RExgUERIXEg4PFRwVFxkZGxsbEBQdHx0aHxgaGxr/2wBDAQQFBQYFBgwHBwwaEQ8RGhoaGhoaGhoaGhoaGhoaGhoaGhoaGhoaGhoaGhoaGhoaGhoaGhoaGhoaGhoaGhoaGhr/wAARCAAeABQDASIAAhEBAxEB/8QAGQAAAgMBAAAAAAAAAAAAAAAAAAcBBAYI/8QAJRAAAQMEAgEEAwAAAAAAAAAAAQIDBAAFBhESISIHEzFBCCRR/8QAFwEBAQEBAAAAAAAAAAAAAAAAAgQBA//EABsRAAICAwEAAAAAAAAAAAAAAAABMeECESHw/9oADAMBAAIRAxEAPwDtEVNFVLpdIVlt70+7SExojOuayCSSTpKQB2VEkAAfJNdAQizRSlyz1VNjvLkS55TiGHqCEqagXacyZRQfhxwFxPEk76GxoA7O6KWgbQ2waz2dSFRMXlOtvTGVoUlz9FDapK0p3tLQc8eSukgnQG97HzWh/uqQf5M5de8HsCJUSz2m6Wm9vItrhkzn23QVNqUUhDaRxBCD58yRsaT91ikWUcL4yrDMXdeYvE7DMcuMtSZcmLcJUIyC4pCQVLUrZUfEJ5fYSNdaNFJbGLNi8y2+5PxK3MvjglSWpEhY6aQB5e4kq662Rs67JoqhJeVkTyad0f/Z",
  },
  tour: {
    src: "/templates/cabinet/tour-symetrie.jpg",
    width: 3840,
    height: 2160,
    alt: "Tour de bureaux photographiée depuis son pied : deux façades vitrées convergent en une arête verticale qui file vers le ciel.",
    blur: "data:image/jpeg;base64,/9j/2wBDAAQDAwQDAwQEAwQFBAQFBgoHBgYGBg0JCggKDw0QEA8NDw4RExgUERIXEg4PFRwVFxkZGxsbEBQdHx0aHxgaGxr/2wBDAQQFBQYFBgwHBwwaEQ8RGhoaGhoaGhoaGhoaGhoaGhoaGhoaGhoaGhoaGhoaGhoaGhoaGhoaGhoaGhoaGhoaGhr/wAARCAALABQDASIAAhEBAxEB/8QAGAAAAgMAAAAAAAAAAAAAAAAAAAkFBgf/xAAnEAABAwMCBQUBAAAAAAAAAAABAgMEAAURBiEHEhQxQQgyQmGRof/EABYBAQEBAAAAAAAAAAAAAAAAAAIDBP/EABoRAAIDAQEAAAAAAAAAAAAAAAABAgMRMWH/2gAMAwEAAhEDEQA/AKzp/Xmm5VzCYk1DjDSgHXmEFLWR3KVK92frbfbatutvHbStiiRnI0aXIaUw1IU0p5AcLSweVSMgAnAOUn9pePWPxbU507qm8sknB88pOalX7rNE+AkSF8otzaAM/EKAA/p/a027YgxSjwaNpf1NcLrxakyG9c2S2lKihca7SRAkNqAGQppzB89xlJ8E0Upy7OLEkELVlSASc9zk70VBV+i0/9k=",
  },
  archives: {
    src: "/templates/cabinet/archives-dossiers.jpg",
    width: 1920,
    height: 1280,
    alt: "Allée d’archives : deux rayonnages métalliques chargés de boîtes et de classeurs étiquetés se font face jusqu’au fond de la salle.",
    blur: "data:image/jpeg;base64,/9j/2wBDAAQDAwQDAwQEAwQFBAQFBgoHBgYGBg0JCggKDw0QEA8NDw4RExgUERIXEg4PFRwVFxkZGxsbEBQdHx0aHxgaGxr/2wBDAQQFBQYFBgwHBwwaEQ8RGhoaGhoaGhoaGhoaGhoaGhoaGhoaGhoaGhoaGhoaGhoaGhoaGhoaGhoaGhoaGhoaGhr/wAARCAANABQDASIAAhEBAxEB/8QAGAAAAwEBAAAAAAAAAAAAAAAAAAcIAwb/xAAhEAACAgICAgMBAAAAAAAAAAABAgMEBREGEgATByEiMf/EABUBAQEAAAAAAAAAAAAAAAAAAAID/8QAGxEAAgMAAwAAAAAAAAAAAAAAAAIBETESMlH/2gAMAwEAAhEDEQA/AOIlWary6xgMDebBY+JobVenNXRl7rLIAA/ZiiD7IXZX+gdR9CgOX1MrSyOGq8fxswyslxpqUuV9Ppg6rIoldK/7l0Jh1UdV2ASw19zhyvGHj2Ix+cu27GYzNj0yzST9EhHtfuQkarsEbI27P9E6140/krLtyjI8bjyEbxtHoxSV53ieMj9fllIZd9QNgg6/hHgms9HQo/knjUz3MPat5rI5WzZoOZpbNqWBQ0duxDqGGEBIYj6gyoO2uxJYknw8zzVDkVuribJ5M1mGWCcQJkKS2ZIUS5Yj6ezspbZQuSwLFnYknw8nKtellZePU//Z",
  },
  galerie: {
    src: "/templates/cabinet/galerie-bureaux.jpg",
    width: 1920,
    height: 1280,
    alt: "Galerie extérieure d’un quartier d’affaires, en noir et blanc : piliers de pierre alignés en enfilade et silhouette lointaine, de dos.",
    blur: "data:image/jpeg;base64,/9j/2wBDAAQDAwQDAwQEAwQFBAQFBgoHBgYGBg0JCggKDw0QEA8NDw4RExgUERIXEg4PFRwVFxkZGxsbEBQdHx0aHxgaGxr/wAALCAANABQBASIA/8QAFQABAQAAAAAAAAAAAAAAAAAABwj/xAApEAACAQIFAgUFAAAAAAAAAAABAgMEBQYGBxExAFEhMjRBUf/aAAgBAQAAPwCctOY+TUjJyMehzBbQd/j7uMHDdnrMEucbDZaqdqWRaLNNXRRtBTcHlo4TJuN+v7GcA/AH9wyaE0Dtplaypl256vyysB6mQdgcQ7l6Zkv9veEtHOtSjpKD1Vlb6wR8HdRhWa5VFZJb4JuLjSuNR+EKoWkcEEnbv298Vf4fqRJNLLWzNICamt7SsB6qX2Bx/9k=",
  },
  volumes: {
    src: "/templates/cabinet/volumes-blancs.jpg",
    width: 1920,
    height: 2880,
    alt: "Volumes blancs et verrières inclinées d’un bâtiment moderniste se détachant sur un ciel bleu clair.",
    blur: "data:image/jpeg;base64,/9j/2wBDAAQDAwQDAwQEAwQFBAQFBgoHBgYGBg0JCggKDw0QEA8NDw4RExgUERIXEg4PFRwVFxkZGxsbEBQdHx0aHxgaGxr/2wBDAQQFBQYFBgwHBwwaEQ8RGhoaGhoaGhoaGhoaGhoaGhoaGhoaGhoaGhoaGhoaGhoaGhoaGhoaGhoaGhoaGhoaGhr/wAARCAAeABQDASIAAhEBAxEB/8QAGQAAAgMBAAAAAAAAAAAAAAAAAAUDBAYH/8QAKxAAAQMDAwIGAQUAAAAAAAAAAQIDBAAFEQYHEiExExQVQVFhJDJCRFJT/8QAGAEAAwEBAAAAAAAAAAAAAAAAAAUGAQL/xAAdEQACAQUBAQAAAAAAAAAAAAAAARQCAyFRsRFB/9oADAMBAAIRAxEAPwDQOw2uXJ2TzUrsEJz3+zViJFjBl6Q60VJT0RzH6lfNavc/Tj9m3g0MzaDFtmnbxNRLnMIRydkPNOpCmEgji2wrklS/c5KRgGmu++ll6asYvehrZDD65zcSRHfeU3Fj+KopRJ4pBUQlWAW0YzyBGMHL+bS2lsnINSVTxgxcWX4TQShhs+5JTnrRXV0bNxZUaLIg3p+M29HbcUh2Kl3ClJBOCFDp17Ht80UTLW+hBvL5wh3Nt8KVrHb+X5+QyYcp0htEvihZK2+igoEnHcAEdfnFPN24bd10LdIzF2cYJlxF8kONrJCJKFFOCOxAwfo1HuYCrU+gCoklNyURn2OU013cbDugb0lYCh5iJ0Iz/LapCUPiyP7QR6Tb+MpvHlGfZH+afuir1uQn06HlKT+M1+0f0FFYdH//2Q==",
  },
  escalier: {
    src: "/templates/cabinet/escalier-courbe.jpg",
    width: 1920,
    height: 1440,
    alt: "Escalier de béton clair décrivant une large courbe régulière le long d’un mur nu.",
    blur: "data:image/jpeg;base64,/9j/2wBDAAQDAwQDAwQEAwQFBAQFBgoHBgYGBg0JCggKDw0QEA8NDw4RExgUERIXEg4PFRwVFxkZGxsbEBQdHx0aHxgaGxr/2wBDAQQFBQYFBgwHBwwaEQ8RGhoaGhoaGhoaGhoaGhoaGhoaGhoaGhoaGhoaGhoaGhoaGhoaGhoaGhoaGhoaGhoaGhr/wAARCAAPABQDASIAAhEBAxEB/8QAGQAAAgMBAAAAAAAAAAAAAAAAAAYCAwQI/8QAJRAAAQMDAwIGAQUAAAAAAAAAAQIDBAARMRJhBRMUIUFRYqHB/8QAFQEBAQAAAAAAAAAAAAAAAAAAAAL/xAAUEQEAAAAAAAAAAAAAAAAAAAAA/9oADAMBAAIRAxEAPwDq5sJxzAbfGoTZi4TJcjKTztabXHi/esqZxXpEYqCXDpCu11KxYD9NXqjojPaZwEiQg36e5LaFe1nKzsO2/ioDJwaUp/h7bxdbjJcupKV2AIxcA4Fwds2opVkSw86VyFBxw5JT9D0NqKD/2Q==",
  },
  salle: {
    src: "/templates/cabinet/salle-reunion.jpg",
    width: 1920,
    height: 1280,
    alt: "Salle de réunion sobre : longue table claire, chaises sombres alignées de part et d’autre et trois hautes fenêtres à croisillons.",
    blur: "data:image/jpeg;base64,/9j/2wBDAAQDAwQDAwQEAwQFBAQFBgoHBgYGBg0JCggKDw0QEA8NDw4RExgUERIXEg4PFRwVFxkZGxsbEBQdHx0aHxgaGxr/2wBDAQQFBQYFBgwHBwwaEQ8RGhoaGhoaGhoaGhoaGhoaGhoaGhoaGhoaGhoaGhoaGhoaGhoaGhoaGhoaGhoaGhoaGhr/wAARCAANABQDASIAAhEBAxEB/8QAFwABAQEBAAAAAAAAAAAAAAAABwADBv/EACUQAAICAgEDAwUAAAAAAAAAAAECAwQFEQYAEyEHEjEiMjNBQ//EABQBAQAAAAAAAAAAAAAAAAAAAAP/xAAaEQEAAwADAAAAAAAAAAAAAAABAAIhERKx/9oADAMBAAIRAxEAPwBb4thaGJoAZqjSp14chMks1jG6Sf35GN4VZv6+8aKqNk/IHg9d1LQxNLG3KM8VGnftTSTUIGrCFzBDeMkpiU6IVA4YgfaCGPg9GvpLxxq+AxPJs/aXMZrIRz2K8nYEMVCGRyhhhjBIHiL8h2/1MAQCQUVOG8dzvD8pxu9iY48RaZJmjrSPC6SowKSo4PuV1KjR+PGiCNgvUtbYa1MmeDrYq3WltWsherJZkEtfsY5pUkiKLpw3abYJ3++roI5Hzfnvow9Pjg5pd5GO3O627tSDuhEtz10UkoxbS11OySdk/AAHV0fY508ilFMZ/9k=",
  },
} as const satisfies Record<string, PhotoAsset>;

/**
 * Mention de crédit — affichée dans SiteFooter. Les images sont en CC0
 * (attribution non exigée) : elle est conservée par courtoisie, et surtout
 * pour préciser que les lieux photographiés n'ont aucun rapport avec le
 * cabinet fictif présenté sur cette page.
 */
export const PHOTO_CREDIT =
  "Photographies : Wikimedia Commons, domaine public (CC0) — façade de bureaux (Echo Grid), architecture claire (Adam Birkett), tour de bureaux (Mike Wilson), archives et volumes blancs (Samuel Zeller), galerie d’affaires (Simon Launay), escalier (Daniel von Appen), salle de réunion (Breather). Les lieux photographiés n’ont aucun lien avec le cabinet fictif présenté ici.";

export const NAV_LINKS = [
  { href: "#cabinet", label: "Le cabinet" },
  { href: "#expertise", label: "Domaines" },
  { href: "#methode", label: "Méthode" },
  { href: "#missions", label: "Missions" },
  { href: "#equipe", label: "Équipe" },
] as const;

export const FACTS = [
  { value: "2009", label: "Année de création" },
  { value: "04", label: "Domaines d’intervention" },
  { value: "2", label: "Bureaux — Paris, Lyon" },
  { value: "3–18", label: "Durée des missions (mois)" },
] as const;

export const CABINET_PARAGRAPHS = [
  "Le cabinet a été fondé autour d’une conviction simple : une décision d’entreprise mal instruite coûte toujours plus cher que le temps qu’on aurait mis à l’instruire. Nous intervenons en amont, pendant l’arbitrage, et jusqu’à la mise en œuvre.",
  "Nous travaillons en équipe restreinte, directement avec le dirigeant et ses associés. Chaque mission fait l’objet d’un périmètre écrit, d’un calendrier et d’un livrable clairement définis avant le démarrage.",
] as const;

export const CABINET_PRINCIPLES = [
  {
    title: "Un interlocuteur associé",
    text: "L’associé qui cadre la mission est celui qui la conduit jusqu’au bout.",
  },
  {
    title: "Un périmètre écrit",
    text: "Objet, calendrier, livrables et honoraires sont arrêtés avant le démarrage.",
  },
  {
    title: "Une recommandation assumée",
    text: "Nous ne remettons pas une liste d’options : nous écrivons celle que nous recommandons.",
  },
] as const;

/**
 * Bande pleine largeur entre les domaines et la méthode : une respiration
 * photographique, une seule phrase. Rien à cliquer, rien à lire de plus.
 */
export const INTERLUDE = {
  eyebrow: "Notre parti pris",
  line: "Une décision structurante ne se prend pas sur une impression.",
  detail:
    "Tout ce que nous recommandons est instruit, écrit, daté et discutable point par point.",
} as const;

/** Deux images qui referment la section « Méthode », côté documentation. */
export const METHOD_PLATES = [
  {
    photo: "archives",
    caption: "Chaque mission laisse un dossier complet, consultable après la clôture.",
  },
  {
    photo: "galerie",
    caption: "Deux bureaux, des missions conduites là où se trouve l’entreprise.",
  },
] as const satisfies readonly { photo: keyof typeof PHOTOS; caption: string }[];

export type ExpertiseArea = {
  index: string;
  title: string;
  summary: string;
  items: readonly string[];
};

export const EXPERTISE: readonly ExpertiseArea[] = [
  {
    index: "01",
    title: "Conseil stratégique",
    summary:
      "Clarifier les options possibles, en mesurer les conséquences, puis arbitrer sur des éléments écrits.",
    items: ["Diagnostic et cadrage", "Plan de développement", "Arbitrage d’investissement"],
  },
  {
    index: "02",
    title: "Structuration & organisation",
    summary:
      "Donner à l’entreprise une architecture interne qui tient quand l’activité change d’échelle.",
    items: ["Organisation des équipes", "Gouvernance et instances", "Circuits de décision"],
  },
  {
    index: "03",
    title: "Accompagnement juridique général",
    summary:
      "Coordonner les sujets juridiques d’un projet en lien avec vos conseils habituels, sans s’y substituer.",
    items: ["Cadrage des sujets à traiter", "Coordination des intervenants", "Suivi documentaire"],
  },
  {
    index: "04",
    title: "Direction de projet",
    summary:
      "Tenir le calendrier, les engagements pris et le niveau d’exigence, du lancement à la mise en œuvre.",
    items: ["Pilotage de programme", "Conduite du changement", "Suivi des engagements"],
  },
] as const;

export type MethodStep = {
  index: string;
  title: string;
  lead: string;
  body: string;
  outputs: readonly string[];
};

export const METHOD: readonly MethodStep[] = [
  {
    index: "01",
    title: "Cadrage",
    lead: "Un premier échange d’une heure, sans engagement, pour délimiter précisément le sujet.",
    body: "Nous écoutons la situation telle que vous la vivez, nous reformulons la question réellement posée, et nous vous disons franchement si le cabinet est le bon interlocuteur. À l’issue de cet échange, vous recevez une note de périmètre : objet, durée, livrables, honoraires.",
    outputs: ["Note de périmètre", "Calendrier indicatif", "Proposition d’honoraires"],
  },
  {
    index: "02",
    title: "Instruction",
    lead: "Nous réunissons les éléments, entendons les parties prenantes et documentons chaque option.",
    body: "L’instruction est la phase qui fait la différence. Nous croisons les documents internes, les entretiens et les contraintes externes du projet, afin qu’aucune décision ne repose sur une hypothèse non vérifiée. Vous êtes informé de l’avancement à intervalles fixes.",
    outputs: ["Entretiens des parties prenantes", "Revue documentaire", "Points d’étape planifiés"],
  },
  {
    index: "03",
    title: "Recommandation",
    lead: "Une note écrite, argumentée et chiffrée : options retenues, risques identifiés, calendrier.",
    body: "Nous remettons un document que vous pouvez présenter tel quel à vos associés ou à votre conseil. Il expose les options écartées et pourquoi, l’option recommandée et ses conditions de réussite, ainsi que les points qui restent à sécuriser.",
    outputs: ["Note de recommandation", "Séance de restitution", "Plan de mise en œuvre"],
  },
  {
    index: "04",
    title: "Accompagnement",
    lead: "Nous restons engagés jusqu’à la mise en œuvre effective de la décision prise.",
    body: "Une recommandation qui reste dans un tiroir n’a servi à rien. Selon le périmètre retenu, nous assurons le pilotage de la mise en œuvre, l’animation des instances et le suivi des engagements, jusqu’à la clôture formelle de la mission.",
    outputs: ["Pilotage de la mise en œuvre", "Suivi des engagements", "Clôture écrite de la mission"],
  },
] as const;

export type CaseStudy = {
  index: string;
  title: string;
  sector: string;
  duration: string;
  area: string;
  /** Illustration : une architecture, jamais une photo du « client ». */
  photo: keyof typeof PHOTOS;
  entries: readonly { term: string; detail: string }[];
};

export const CASE_STUDIES: readonly CaseStudy[] = [
  {
    index: "Cas A",
    title: "Réorganisation d’un groupe familial de 140 salariés",
    sector: "Industrie de second œuvre",
    duration: "9 mois",
    area: "Structuration & organisation",
    photo: "volumes",
    entries: [
      {
        term: "Contexte",
        detail:
          "Trois sociétés historiques, des fonctions support dupliquées et une direction générale accaparée par l’arbitrage quotidien.",
      },
      {
        term: "Intervention",
        detail:
          "Cartographie des responsabilités réelles, entretiens de l’ensemble de l’encadrement, puis proposition d’une organisation cible en deux pôles avec un calendrier de bascule en trois temps.",
      },
      {
        term: "Issue",
        detail:
          "Organisation cible adoptée par le conseil, mise en œuvre pilotée par le cabinet sur deux exercices, comité de direction réuni à cadence fixe.",
      },
    ],
  },
  {
    index: "Cas B",
    title: "Préparation d’une transmission d’entreprise",
    sector: "Services aux entreprises",
    duration: "6 mois",
    area: "Conseil stratégique",
    photo: "escalier",
    entries: [
      {
        term: "Contexte",
        detail:
          "Un dirigeant fondateur envisageant son retrait à cinq ans, sans successeur identifié en interne ni calendrier arrêté.",
      },
      {
        term: "Intervention",
        detail:
          "Instruction des scénarios de transmission, évaluation de leurs conséquences pour l’entreprise et pour les équipes, coordination des conseils extérieurs sollicités par le dirigeant.",
      },
      {
        term: "Issue",
        detail:
          "Scénario retenu et formalisé dans une note d’orientation, feuille de route à trente-six mois, points de contrôle semestriels confiés au cabinet.",
      },
    ],
  },
] as const;

export type Member = {
  initials: string;
  name: string;
  role: string;
  focus: string;
};

export const TEAM: readonly Member[] = [
  {
    initials: "HV",
    name: "Hélène Verdon",
    role: "Associée fondatrice",
    focus: "Conseil stratégique, gouvernance, transmission.",
  },
  {
    initials: "MA",
    name: "Marc Aubriot",
    role: "Associé",
    focus: "Structuration, organisation, réorganisations complexes.",
  },
  {
    initials: "SB",
    name: "Sarah Belkacem",
    role: "Consultante senior",
    focus: "Direction de projet et conduite du changement.",
  },
  {
    initials: "TR",
    name: "Thomas Réal",
    role: "Consultant",
    focus: "Instruction des dossiers, analyse, points d’étape.",
  },
] as const;

export const FAQ = [
  {
    question: "Comment se déroule un premier rendez-vous ?",
    answer:
      "Il dure environ une heure, se tient dans nos bureaux ou en visioconférence, et n’engage à rien. Il sert à délimiter le sujet et à vérifier que le cabinet est le bon interlocuteur.",
  },
  {
    question: "Intervenez-vous en dehors de Paris et de Lyon ?",
    answer:
      "Oui. Nos bureaux sont à Paris et à Lyon, mais les missions se déroulent là où se trouve l’entreprise, avec un rythme de déplacement arrêté au cadrage.",
  },
  {
    question: "Quelle est la durée type d’une mission ?",
    answer:
      "De trois mois pour un cadrage stratégique à dix-huit mois lorsque le cabinet pilote également la mise en œuvre. La durée est écrite avant le démarrage.",
  },
  {
    question: "Comment vos honoraires sont-ils établis ?",
    answer:
      "Au forfait, par phase, sur la base du périmètre arrêté ensemble. Le montant est communiqué par écrit avant le démarrage et ne varie pas sans avenant signé.",
  },
] as const;

/**
 * Colonne de gauche des questions fréquentes : elle restait vide sous le
 * titre sur grand écran. Une sortie utile plutôt qu'un blanc involontaire.
 */
export const FAQ_ASIDE = {
  title: "Votre question n’y est pas ?",
  text: "Écrivez-nous en une ligne. C’est un associé qui lit et qui répond, sans intermédiaire.",
  linkLabel: "Écrire au cabinet",
} as const;

export const CONTACT = {
  addressLines: ["24 rue de la Boétie", "75008 Paris"],
  secondaryAddressLines: ["11 quai Général Sarrail", "69006 Lyon"],
  phone: "+33 1 84 00 00 00",
  email: "contact@verdon-associes.fr",
  hours: "Du lundi au vendredi, 9h – 19h",
  formNotice:
    "Formulaire de démonstration : aucune donnée n’est transmise ni enregistrée.",
} as const;

export const SUBJECTS = [
  "Conseil stratégique",
  "Structuration & organisation",
  "Accompagnement juridique général",
  "Direction de projet",
  "Autre sujet",
] as const;

export const FOOTER_COLUMNS = [
  {
    title: "Domaines",
    links: EXPERTISE.map((area) => ({ label: area.title, href: "#expertise" })),
  },
  {
    title: "Le cabinet",
    links: [
      { label: "Notre approche", href: "#cabinet" },
      { label: "Méthode d’intervention", href: "#methode" },
      { label: "Exemples de missions", href: "#missions" },
      { label: "Équipe", href: "#equipe" },
    ],
  },
] as const;

export const FOOTER_LEGAL = [
  "Mentions légales",
  "Politique de confidentialité",
  "Conditions d’intervention",
] as const;
