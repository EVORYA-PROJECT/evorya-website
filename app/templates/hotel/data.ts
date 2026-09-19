import type { PanelVariant } from "./decor";

/**
 * Contenu de la démonstration « Riad Zellige ».
 *
 * Marque, chambres, tarifs, expériences et témoignages sont entièrement
 * FICTIFS : cette page sert uniquement à montrer un niveau de conception
 * hôtelier à un prospect Evorya. Aucun établissement réel n'est représenté.
 */

/* ------------------------------------------------------------------ */
/* Photographies                                                       */
/* ------------------------------------------------------------------ */

/**
 * Photographies réelles de la démo — fichiers locaux, téléchargés une fois
 * depuis Wikimedia Commons (licences CC BY-SA), jamais de hotlink. Voir
 * `public/templates/CREDITS.md` : la mention `PHOTO_CREDIT` ci-dessous doit
 * rester visible dans le pied de page.
 *
 * Les `alt` décrivent la SCÈNE (matière, lumière, composition). Ils
 * n'affirment jamais qu'il s'agit d'un reportage au Riad Zellige, qui est un
 * établissement fictif — ce sont des images d'ambiance de maisons marocaines.
 *
 * Les photographies portent les zones de contenu visuel ; les panneaux CSS/SVG
 * de `decor.tsx` restent réservés aux motifs et respirations décoratives.
 */
export type PhotoAsset = {
  readonly src: string;
  readonly width: number;
  readonly height: number;
  readonly alt: string;
  /** Miniature 12px en base64 : évite le trou sombre avant chargement. */
  readonly blur: string;
};

export const PHOTOS = {
  courNuit: {
    src: "/templates/hotel/cour-nuit.jpg",
    width: 1920,
    height: 1275,
    alt: "Cour intérieure de riad marocain à la tombée de la nuit : bassin carré éclairé de bougies, arcades de plâtre sculpté, lanternes de métal ajouré et banquette basse sous la galerie.",
    blur: "data:image/jpeg;base64,/9j/2wBDAAQDAwQDAwQEAwQFBAQFBgoHBgYGBg0JCggKDw0QEA8NDw4RExgUERIXEg4PFRwVFxkZGxsbEBQdHx0aHxgaGxr/2wBDAQQFBQYFBgwHBwwaEQ8RGhoaGhoaGhoaGhoaGhoaGhoaGhoaGhoaGhoaGhoaGhoaGhoaGhoaGhoaGhoaGhoaGhr/wAARCAANABQDASIAAhEBAxEB/8QAFwAAAwEAAAAAAAAAAAAAAAAAAAYHBf/EACQQAAICAQQBBAMAAAAAAAAAAAECAwQFABISIQYTFCJBIzFx/8QAFgEBAQEAAAAAAAAAAAAAAAAABgQF/8QAIhEAAQMDBAMBAAAAAAAAAAAAAQIRQQMhUQAEEzEScYGh/9oADAMBAAIRAxEAPwCU4e3DhvI8pdjtqZjU9C4XWQ7RPKeR/EysSeEZ6YEEDbTPfSnWqPat27eQuQ5KjPVqQSvLxnaNvSk+fykbieg7EKEAG7fuZeN0oM7k3nyKlveUY4rKJsocByp2IHIdhWHewKjcHTP5l49a8exqNdyj5dYTBJUaaFYpICiNw+UZAYKAQoI65HbRkcng5qORBAMNjL4tmVqykGyGBkE+7/nT/NZ2arpRtQxU1C12qwSRcRxUo8aspAH1sw2+9Gp1a91daOzHcliSWJAsZAfiqDgBv1v0g+h/NGs+ttuSqpal3JJmTqilu2ppAR0BI1//2Q==",
  },
  courLumiere: {
    src: "/templates/hotel/cour-lumiere.jpg",
    width: 1600,
    height: 1063,
    alt: "Patio de riad en fin de matinée : arcades ocre, banquette basse couverte de coussins, grandes jarres de terre cuite, palmiers en pot et angle d'un bassin carrelé de vert.",
    blur: "data:image/jpeg;base64,/9j/2wBDAAQDAwQDAwQEAwQFBAQFBgoHBgYGBg0JCggKDw0QEA8NDw4RExgUERIXEg4PFRwVFxkZGxsbEBQdHx0aHxgaGxr/2wBDAQQFBQYFBgwHBwwaEQ8RGhoaGhoaGhoaGhoaGhoaGhoaGhoaGhoaGhoaGhoaGhoaGhoaGhoaGhoaGhoaGhoaGhr/wAARCAANABQDASIAAhEBAxEB/8QAFwAAAwEAAAAAAAAAAAAAAAAAAAIFBv/EACQQAAICAgICAQUBAAAAAAAAAAECAwQFEQYAEhMhMUEHFBVh/8QAFQEBAQAAAAAAAAAAAAAAAAAABAb/xAAjEQABAgQGAwAAAAAAAAAAAAABAhEAAxMhBBIxQVFxgbHR/9oADAMBAAIRAxEAPwCLwW5lPqFw27lstRlpfi68pF6WApVtxiZQzRsR1BCOXOiAFU9djfVqOIrLj8bgueR5VsllXhSKjFakswUoe88ddYejIoicQyN7YA+tnWvM1wLD0+W5TkWU5Gs925DFAazfcyIsQnrsH/QHqxCt1XY0BvS/y7yerjqNrA0pMdFailL2AJGJ6CB2MaD5KhpXYKSVG/Q+fI1KyJhlSbb6aONnJ54D+7JaKWGrYlTgFhybtdh98xmOTYHj3Gc7bxtjHCeeLoZGRWYgsikBgh0jAEArskEH2f8ASeNXmp5LIZm1jcfBiY5L8nevAAIw4ChiigAKDrfX3r++HjAZoAzO/cARSWMyWbqP/9k=",
  },
  chambreSafran: {
    src: "/templates/hotel/chambre-safran.jpg",
    width: 1800,
    height: 1196,
    alt: "Chambre marocaine aux murs de tadelakt ocre : lit à baldaquin de bois drapé d'un voile jaune safran, appliques de métal ajouré, porte de cèdre sculptée ouverte sur la lumière.",
    blur: "data:image/jpeg;base64,/9j/2wBDAAQDAwQDAwQEAwQFBAQFBgoHBgYGBg0JCggKDw0QEA8NDw4RExgUERIXEg4PFRwVFxkZGxsbEBQdHx0aHxgaGxr/2wBDAQQFBQYFBgwHBwwaEQ8RGhoaGhoaGhoaGhoaGhoaGhoaGhoaGhoaGhoaGhoaGhoaGhoaGhoaGhoaGhoaGhoaGhr/wAARCAANABQDASIAAhEBAxEB/8QAFwAAAwEAAAAAAAAAAAAAAAAAAAQFB//EACIQAAICAQQDAQEBAAAAAAAAAAECAwQRAAUSIQYHQTEiFP/EABUBAQEAAAAAAAAAAAAAAAAAAAYF/8QAIhEAAQMDBAMBAAAAAAAAAAAAAQACAwQRIRKB8CIxkbHx/9oADAMBAAIRAxEAPwCOsU5o1UeOO3awWJqMxQr+syEjJAAJ7A09tG2Ri3VqTxrQ2+OBw2Ii0iOhUJGI+gAeQyc9Ag4P5rKfP/Ym57Tu9SzRJgq7Xcet/mjfgLESn+1dgM/3x+Y4g47+seJ+0d23i1UF2CqTWhCs45l5EXjhCWY4ACIBjH590DgoqqZoffp2+32Sx9RDG7TbPOd1tXqwUR4sRukdjcbYtSmSWSxO+MnIUcWUKACBx77z33o1d9UeAVfJfHLVy9YYFb0iRqIVPBOKMFz9xyPejSIxi+GjwFBBcc6va//Z",
  },
  suiteBahia: {
    src: "/templates/hotel/suite-bahia.jpg",
    width: 1800,
    height: 1196,
    alt: "Suite sous haut plafond : cheminée allumée habillée de zellige, mezzanine de bois, escalier étroit, lit bas et volets de bois ouverts sur la lumière du jour.",
    blur: "data:image/jpeg;base64,/9j/2wBDAAQDAwQDAwQEAwQFBAQFBgoHBgYGBg0JCggKDw0QEA8NDw4RExgUERIXEg4PFRwVFxkZGxsbEBQdHx0aHxgaGxr/2wBDAQQFBQYFBgwHBwwaEQ8RGhoaGhoaGhoaGhoaGhoaGhoaGhoaGhoaGhoaGhoaGhoaGhoaGhoaGhoaGhoaGhoaGhr/wAARCAANABQDASIAAhEBAxEB/8QAFgABAQEAAAAAAAAAAAAAAAAABgcA/8QAJBAAAgICAQQCAwEAAAAAAAAAAQIDBAURBgASEyExQQcUFWH/xAAVAQEBAAAAAAAAAAAAAAAAAAAEBv/EACARAAAEBwEBAAAAAAAAAAAAAAABAgMRFCFSodHwE0H/2gAMAwEAAhEDEQA/AJfxzl2Zw/BP52Db9+ocDDYWGw2xjFFWR5po2A7u3yNAew9w2zAAb9Ifxfm8sgzx5Ldp25XxCzY6F2laaVluQmVgutAGMtotrbEAfDaGw35cxleOVuUxVL1IQq6U6VZaMCRlAxiCJvSN5dMAQG7fY9+qdyrjvIsHxfDLLy+a/jqHiMVSTE1Ij44lcohljjWQga+yR/nxqXW+16Vp3fBVNsrS2RRiIU0/H5qtIu8sbCuoYri1bvJJJYnyDZO+t0RrzsatfXoCJfvrdLlivPGgOYO0s7H/2Q==",
  },
  terrasseSuite: {
    src: "/templates/hotel/terrasse-suite.jpg",
    width: 1800,
    height: 1350,
    alt: "Terrasse de toit ombragée par des voilages de lin : banquette basse garnie de coussins clairs, table basse gravée, jarres de terre cuite et bougainvillier en fleurs.",
    blur: "data:image/jpeg;base64,/9j/2wBDAAQDAwQDAwQEAwQFBAQFBgoHBgYGBg0JCggKDw0QEA8NDw4RExgUERIXEg4PFRwVFxkZGxsbEBQdHx0aHxgaGxr/2wBDAQQFBQYFBgwHBwwaEQ8RGhoaGhoaGhoaGhoaGhoaGhoaGhoaGhoaGhoaGhoaGhoaGhoaGhoaGhoaGhoaGhoaGhr/wAARCAAPABQDASIAAhEBAxEB/8QAGAAAAgMAAAAAAAAAAAAAAAAAAAYEBwj/xAAkEAACAgEEAwEBAQAAAAAAAAABAgMEBQAGERIhBxQiMRVBIv/EABYBAQEBAAAAAAAAAAAAAAAAAAUCA//EAB8RAAIBBAIDAAAAAAAAAAAAAAECAAMRMUEEExSh8P/aAAwDAQACEQMRAD8AiZylVr26+JhiRqyTMzmOP2RoyRlIwzL8CrGCOxPHZzqvd6bazlDJJlts4V8pgTjzlbktQxMJIomWFj1PLEIzqSAD/vb9ch/y+yfItFF3tjdnV90bNsmW9LJ/OpWueuch5OC/yNef69Qrn5zprtfjpuLemOpybntwbOkuSRx5DF4SU+ulRB7n2yks9yw/SJB2b1pyzAEALovkLSDXbJilIsRYaipt7y95WiovivHIvXsJhJmxwNfbItLFIn14y4Rvqlv2eeOCRydGtY4ehFgcfHitnMMNiKRaKKCMs3LdizuzE9ndmZizsSWPJJ+6NY9z6YyPFU5+9T//2Q==",
  },
  terrasseCrepuscule: {
    src: "/templates/hotel/terrasse-crepuscule.jpg",
    width: 1920,
    height: 1275,
    alt: "Terrasse sur les toits d'une médina à l'heure bleue : transats de bois, jarres et orangers en pot, garde-corps de fer forgé et minaret éclairé sur un ciel bleu nuit.",
    blur: "data:image/jpeg;base64,/9j/2wBDAAQDAwQDAwQEAwQFBAQFBgoHBgYGBg0JCggKDw0QEA8NDw4RExgUERIXEg4PFRwVFxkZGxsbEBQdHx0aHxgaGxr/2wBDAQQFBQYFBgwHBwwaEQ8RGhoaGhoaGhoaGhoaGhoaGhoaGhoaGhoaGhoaGhoaGhoaGhoaGhoaGhoaGhoaGhoaGhr/wAARCAANABQDASIAAhEBAxEB/8QAFwABAQEBAAAAAAAAAAAAAAAABQAEB//EACUQAAICAQQBAwUAAAAAAAAAAAECAwQRAAUSIQYHQTEiFP/EABYBAQEBAAAAAAAAAAAAAAAAAAMEBf/EACYRAAEBBgQHAAAAAAAAAAAAAAECAAMFESExBhJx0gQHFkFRgaH/2gAMAwEAAhEDEQA/AOcWq1aN3j+sgZZDGSwAXkDjHLPH+6HjpG7b9NTRpZ2TksaRPyIxkHGM4PXf50vumz1fLKHlu8bSh2FtnjEMNaPEsapxBATIDIRno8icdaL2+hJftytLfuLYsV0ZWSdlVI+KkJgEMewO+XelccwePUgh7lHYmRpS8gTO4MvRZkYDhpKVuMxHjNetqgSsR9YRdssW1E1f0rxPnixsIucEg9Eg+4I/WrWfcPKrG33JYY68DsGw7suS5H25JOT7KPn41a1er4uokpS7I0XuacYYhKaErnqna3//2Q==",
  },
  tableDuSoir: {
    src: "/templates/hotel/table-du-soir.jpg",
    width: 1800,
    height: 1157,
    alt: "Cour de riad au crépuscule : tables dressées de blanc entre les colonnes, fauteuils bas de bois clair, lanternes posées au sol autour d'un bassin et bananiers en bordure.",
    blur: "data:image/jpeg;base64,/9j/2wBDAAQDAwQDAwQEAwQFBAQFBgoHBgYGBg0JCggKDw0QEA8NDw4RExgUERIXEg4PFRwVFxkZGxsbEBQdHx0aHxgaGxr/2wBDAQQFBQYFBgwHBwwaEQ8RGhoaGhoaGhoaGhoaGhoaGhoaGhoaGhoaGhoaGhoaGhoaGhoaGhoaGhoaGhoaGhoaGhr/wAARCAANABQDASIAAhEBAxEB/8QAGAAAAgMAAAAAAAAAAAAAAAAAAAgDBgf/xAAoEAACAgEDAwIHAQAAAAAAAAABAgMEEQAFIQYSExQxByIjQVFSYYH/xAAVAQEBAAAAAAAAAAAAAAAAAAABBf/EAB0RAAIBBAIDAAAAAAAAAAAAAAECAAMEESExMkH/2gAMAwEAAhEDEQA/AFKh6C6ieF5tv263PbrosgWvC5lBL/Tx2j3YYZcZz75zxqe5u3XO7zGrYk3W23pPWyQrCwEPjZlB7AvykOnbn9ifudMR8E713ddpu7YbCinRsqhWeFZy8CgSeAd3Cx+RmkAAyGdiDzq29abSd1iktIakEKU5EeA0Y5A+WznLcg4yP9OpIZSpdhnEqizbTGI9J6yN/NYprO1kLMHlXkggD+fjRraty6B2TeZ1tTxWKs3jVJBUnMaOwGO7tIOCRj2440aBd0/YcGoeup//2Q==",
  },
  bassinZellige: {
    src: "/templates/hotel/bassin-zellige.jpg",
    width: 1600,
    height: 1200,
    alt: "Bassin peu profond carrelé de zellige vert, bordé d'une frise de carreaux bleus et blancs, où se découpe en plein soleil l'ombre nette d'un palmier.",
    blur: "data:image/jpeg;base64,/9j/2wBDAAQDAwQDAwQEAwQFBAQFBgoHBgYGBg0JCggKDw0QEA8NDw4RExgUERIXEg4PFRwVFxkZGxsbEBQdHx0aHxgaGxr/2wBDAQQFBQYFBgwHBwwaEQ8RGhoaGhoaGhoaGhoaGhoaGhoaGhoaGhoaGhoaGhoaGhoaGhoaGhoaGhoaGhoaGhoaGhr/wAARCAAPABQDASIAAhEBAxEB/8QAGQAAAgMBAAAAAAAAAAAAAAAAAAcEBQYI/8QAJBAAAgIBBAEEAwAAAAAAAAAAAQIDBAUABhESIQcUEjFBUf/EABcBAAMBAAAAAAAAAAAAAAAAAAIDBAX/xAAfEQACAqEGAAAAAAAAAAAAAAABAgAREiExUYHR8P/aAAwDAQACEQMRAD8AwGxLT7twtXAwbKazO1ZVuZOvZWlDIEYgif4OXiZSqGPsAQqEKp1a5f0fsZezDk7Zwy0a9buIXNu28g6/JPtWIIHKgH48KFHA41JwG8vZYR3zNhatIVp68grRt27P0d1Tj65UEA/otzpvbcze2/eYvIItnIB3jrVZfbr+Gs0kBkj6QOw7AAKGd2JPJAVfvQqhJ4kTnMMaKaCc1Y308ynqYlnP0az1K81mVUjfKzVuqhiQoUr5ChgoPnkL/eRo0t97Z3eOG3PklyW5MhXu27El2ytW5LHEZZXZ3ZFVuApJJA4B8+Rzo0sq4Ohp5eaithAblJPdp//Z",
  },
  bassinPatio: {
    src: "/templates/hotel/bassin-patio-riad.jpg",
    width: 1600,
    height: 1068,
    alt: "Petit bassin de zellige vert sur la terrasse d'un riad de Marrakech, entouré de palmiers en pot et de transats sous une lumière chaude.",
    blur: "data:image/jpeg;base64,/9j/2wBDABIMDRANCxIQDhAUExIVGywdGxgYGzYnKSAsQDlEQz85Pj1HUGZXR0thTT0+WXlaYWltcnNyRVV9hnxvhWZwcm7/2wBDARMUFBsXGzQdHTRuST5Jbm5ubm5ubm5ubm5ubm5ubm5ubm5ubm5ubm5ubm5ubm5ubm5ubm5ubm5ubm5ubm5ubm7/wAARCAAIAAwDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAP/xAAdEAEBAAICAwEAAAAAAAAAAAABAgADBBEFEiEi/8QAFQEBAQAAAAAAAAAAAAAAAAAAAgP/xAAaEQACAgMAAAAAAAAAAAAAAAABAgADERNR/9oADAMBAAIRAxEAPwCNc/U6/fdx51zT+DtVctN+OuZptlQ7EfmMYNj9krAqNgAT/9k=",
  },
  hammamMarrakech: {
    src: "/templates/hotel/hammam-marrakech.jpg",
    width: 1500,
    height: 2000,
    alt: "Voûte claire d'un hammam de Marrakech, soulignée de lignes rouges, percée d'oculi et éclairée par une lanterne en métal.",
    blur: "data:image/jpeg;base64,/9j/2wBDABIMDRANCxIQDhAUExIVGywdGxgYGzYnKSAsQDlEQz85Pj1HUGZXR0thTT0+WXlaYWltcnNyRVV9hnxvhWZwcm7/2wBDARMUFBsXGzQdHTRuST5Jbm5ubm5ubm5ubm5ubm5ubm5ubm5ubm5ubm5ubm5ubm5ubm5ubm5ubm5ubm5ubm5ubm7/wAARCAAQAAwDASIAAhEBAxEB/8QAFgABAQEAAAAAAAAAAAAAAAAABAID/8QAHhAAAgICAgMAAAAAAAAAAAAAAQIDEQAhBFESEzH/xAAUAQEAAAAAAAAAAAAAAAAAAAAC/8QAFREBAQAAAAAAAAAAAAAAAAAAACH/2gAMAwEAAhEDEQA/AGQyhgT8OV7nUkHe+sPPBPF4GC3UsLobrN14xIsuwPWAo//Z",
  },
  ruelleMedina: {
    src: "/templates/hotel/ruelle-medina-marrakech.jpg",
    width: 1600,
    height: 2133,
    alt: "Ruelle étroite de la médina de Marrakech bordée de murs ocre, de portes sombres et de lanternes murales.",
    blur: "data:image/jpeg;base64,/9j/2wBDABIMDRANCxIQDhAUExIVGywdGxgYGzYnKSAsQDlEQz85Pj1HUGZXR0thTT0+WXlaYWltcnNyRVV9hnxvhWZwcm7/2wBDARMUFBsXGzQdHTRuST5Jbm5ubm5ubm5ubm5ubm5ubm5ubm5ubm5ubm5ubm5ubm5ubm5ubm5ubm5ubm5ubm5ubm7/wAARCAAQAAwDASIAAhEBAxEB/8QAFgABAQEAAAAAAAAAAAAAAAAABAIF/8QAIRAAAgEDAwUAAAAAAAAAAAAAAQIDAAQRBRITISJRYqH/xAAVAQEBAAAAAAAAAAAAAAAAAAAAAv/EABkRAAIDAQAAAAAAAAAAAAAAAAARAQIhEv/aAAwDAQACEQMRAD8ANo99wW7ozhWJ7ftZ8su5ySRmptSYoj7dTRJFKuRjPinK0ubvD//Z",
  },
  chambreMenthe: {
    src: "/templates/hotel/chambre-menthe.jpg",
    width: 1600,
    height: 1063,
    alt: "Chambre de riad avec lit à baldaquin drapé de rouge, zellige noir et blanc, mobilier en fer forgé et portes de bois ouvertes sur la lumière.",
    blur: "data:image/jpeg;base64,/9j/2wBDABIMDRANCxIQDhAUExIVGywdGxgYGzYnKSAsQDlEQz85Pj1HUGZXR0thTT0+WXlaYWltcnNyRVV9hnxvhWZwcm7/2wBDARMUFBsXGzQdHTRuST5Jbm5ubm5ubm5ubm5ubm5ubm5ubm5ubm5ubm5ubm5ubm5ubm5ubm5ubm5ubm5ubm5ubm7/wAARCAAIAAwDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAX/xAAhEAACAAUEAwAAAAAAAAAAAAABAgADBRESBBMhIjJR8f/EABUBAQEAAAAAAAAAAAAAAAAAAAAC/8QAFxEBAQEBAAAAAAAAAAAAAAAAAQACEf/aAAwDAQACEQMRAD8AgYy2dgJZPUd7+VhzYH3FmlVBKbo9mdhuMxchjyL/ACEIAVOlOX//2Q==",
  },
} as const satisfies Record<string, PhotoAsset>;

/**
 * Mention obligatoire (licences CC BY-SA) — rendue dans SiteFooter.
 */
export const PHOTO_CREDIT =
  "Photographies : Wikimedia Commons — Marrakechriads (CC BY-SA 3.0), calflier001 et Michal Osmenda (CC BY-SA 2.0), Arnaud 25 (CC BY-SA 3.0), R Prazeres, Ymblanter et Dutch Morocco Investments SARL (CC BY-SA 4.0). Images d'ambiance : elles illustrent l'architecture marocaine, pas un établissement réel.";

export type Room = {
  id: string;
  name: string;
  /** Catégorie affichée au-dessus du nom. */
  kind: string;
  surface: string;
  sleeps: string;
  /** Prix indicatif fictif, en dirhams, par nuit. */
  pricePerNight: number;
  blurb: string;
  amenities: string[];
  /** Repli décoratif (CSS/SVG) — utilisé quand la chambre n'a pas de photo. */
  panel: PanelVariant;
  /**
   * Photographie d'ambiance de la chambre. Volontairement absente sur une des
   * quatre chambres : la grille alterne matière photographique et panneau
   * dessiné, ce qui évite le catalogue de vignettes identiques.
   */
  photo?: PhotoAsset;
};

export const ROOMS: Room[] = [
  {
    id: "menthe",
    name: "Chambre Menthe",
    kind: "Chambre",
    surface: "18 m²",
    sleeps: "2 voyageurs",
    pricePerNight: 1200,
    blurb:
      "La plus petite, la plus fraîche. Murs de tadelakt vert pâle, fenêtre basse sur la galerie, lumière indirecte du matin jusqu'au milieu de l'après-midi.",
    amenities: ["Lit queen", "Vue galerie", "Douche tadelakt", "Climatisation"],
    panel: "chambre",
    photo: PHOTOS.chambreMenthe,
  },
  {
    id: "safran",
    name: "Chambre Safran",
    kind: "Chambre supérieure",
    surface: "24 m²",
    sleeps: "2 voyageurs",
    pricePerNight: 1550,
    blurb:
      "Ouverte plein sud sur la cour. On y entend l'eau du bassin toute la journée, et la lumière traverse les moucharabiehs jusque sur le lit en fin de journée.",
    amenities: ["Lit king", "Balcon sur cour", "Bureau", "Coffre-fort"],
    panel: "cour",
    photo: PHOTOS.chambreSafran,
  },
  {
    id: "bahia",
    name: "Suite Bahia",
    kind: "Suite",
    surface: "38 m²",
    sleeps: "2 à 3 voyageurs",
    pricePerNight: 2400,
    blurb:
      "Un salon séparé sous voûte, une baignoire creusée dans le tadelakt, et le silence particulier des pièces hautes. Notre chambre préférée en hiver.",
    amenities: ["Salon séparé", "Baignoire tadelakt", "Cheminée", "Lit d'appoint possible"],
    panel: "arcade",
    photo: PHOTOS.suiteBahia,
  },
  {
    id: "terrasse",
    name: "Suite Terrasse",
    kind: "Suite avec terrasse",
    surface: "46 m²",
    sleeps: "2 à 4 voyageurs",
    pricePerNight: 3100,
    blurb:
      "Le dernier niveau, pour vous seuls : terrasse privative orientée ouest, banquette basse, et la ligne des toits de la médina jusqu'à l'Atlas les jours clairs.",
    amenities: ["Terrasse privative", "Double exposition", "Coin salon extérieur", "Service en chambre"],
    panel: "toit",
    photo: PHOTOS.terrasseSuite,
  },
];

export type Experience = {
  index: string;
  title: string;
  description: string;
  detail: string;
};

export const EXPERIENCES: Experience[] = [
  {
    index: "01",
    title: "Hammam & soins",
    description:
      "Hammam traditionnel chauffé deux fois par jour, gommage au savon noir, massage à l'huile d'argan.",
    detail: "Sur réservation la veille — 11h à 19h",
  },
  {
    index: "02",
    title: "La table du riad",
    description:
      "Un menu unique chaque soir, écrit le matin selon le marché. Service dans la cour ou sur la terrasse.",
    detail: "Dîner à 20h — 380 MAD par personne",
  },
  {
    index: "03",
    title: "Petit-déjeuner en terrasse",
    description:
      "Pains cuits sur place, msemen, fruits de saison, jus pressés et thé à la menthe, servis à votre heure.",
    detail: "Inclus dans toutes les nuitées",
  },
  {
    index: "04",
    title: "Cour & bassin",
    description:
      "La cour reste fraîche toute la journée : orangers, banquettes basses, bassin peu profond pour se rafraîchir.",
    detail: "Accès libre — 7h à 23h",
  },
  {
    index: "05",
    title: "Conciergerie",
    description:
      "Transfert depuis l'aéroport, guide francophone, réservations en ville : nous organisons tout en amont du séjour.",
    detail: "Sur demande avant l'arrivée",
  },
];

/**
 * Mosaïque « heure par heure ». Chaque case porte une photographie ; les
 * hauteurs et les portées de colonnes restent volontairement inégales.
 */
export type GalleryItem = {
  /** Repli décoratif, utilisé quand `photo` est absent. */
  panel: PanelVariant;
  photo?: PhotoAsset;
  /** Cadrage de la photo dans sa case (object-position). */
  focus?: string;
  caption: string;
  /** Heure de la journée — repère éditorial affiché en petites capitales. */
  hour: string;
  /** Classes de placement dans la grille de la galerie (desktop). */
  span: string;
  /** Hauteurs par palier — la galerie n'est jamais une grille de carrés. */
  height: string;
};

export const GALLERY: GalleryItem[] = [
  {
    panel: "cour",
    photo: PHOTOS.tableDuSoir,
    focus: "50% 48%",
    caption: "La cour, quand les tables sont dressées",
    hour: "19 h 40",
    span: "lg:col-span-7",
    height: "h-64 sm:h-80 lg:h-[32rem]",
  },
  {
    panel: "lanternes",
    photo: PHOTOS.courNuit,
    focus: "50% 52%",
    caption: "La galerie, à la nuit tombée",
    hour: "22 h 00",
    span: "lg:col-span-5",
    height: "h-56 sm:h-80 lg:h-[32rem]",
  },
  {
    panel: "terrasse",
    photo: PHOTOS.terrasseSuite,
    focus: "50% 38%",
    caption: "La terrasse, à l'ombre des voilages",
    hour: "17 h 20",
    span: "lg:col-span-5",
    height: "h-64 sm:h-80 lg:h-[30rem]",
  },
  {
    panel: "hammam",
    photo: PHOTOS.hammamMarrakech,
    focus: "50% 62%",
    caption: "Le hammam, chauffé deux fois par jour",
    hour: "11 h 00",
    span: "lg:col-span-4",
    height: "h-56 sm:h-72 lg:h-[26rem]",
  },
  {
    panel: "bassin",
    photo: PHOTOS.bassinPatio,
    focus: "58% 72%",
    caption: "Le bassin, à l'heure la plus chaude",
    hour: "14 h 10",
    span: "lg:col-span-3",
    height: "h-56 sm:h-72 lg:h-[22rem]",
  },
];

export type Testimonial = {
  quote: string;
  author: string;
  context: string;
};

/** Témoignages illustratifs et fictifs — signalés comme tels dans la page. */
export const TESTIMONIALS: Testimonial[] = [
  {
    quote:
      "On est arrivés fatigués d'une semaine de route, et le silence de la cour a fait le reste. Trois nuits qui en valaient six ailleurs.",
    author: "Camille & Nadir",
    context: "Suite Bahia — mars",
  },
  {
    quote:
      "Le petit-déjeuner sur la terrasse à l'heure qu'on voulait, sans jamais avoir à demander deux fois. C'est ce niveau d'attention qu'on est venus chercher.",
    author: "Élodie R.",
    context: "Chambre Safran — octobre",
  },
];

export const NAV_LINKS = [
  { href: "#le-riad", label: "Le riad" },
  { href: "#chambres", label: "Chambres" },
  { href: "#experiences", label: "Expériences" },
  { href: "#galerie", label: "Galerie" },
  { href: "#lieu", label: "Le lieu" },
];

/** Formatage des prix fictifs : « 1 550 MAD ». */
export function formatMad(value: number): string {
  return `${value.toLocaleString("fr-FR").replace(/ | /g, " ")} MAD`;
}
