/**
 * Photothèque de la démo KRUSH — fichier GÉNÉRÉ une fois puis figé.
 *
 * Vingt photographies libres (Wikimedia Commons, licences CC0 / CC BY / CC BY-SA),
 * téléchargées localement — jamais de hotlink. Voir public/templates/CREDITS.md
 * pour le détail auteur/licence, et PHOTO_CREDIT dans data.ts pour la mention
 * affichée dans le pied de page.
 *
 * Les `alt` décrivent la SCÈNE photographiée. KRUSH étant une enseigne fictive,
 * ils n'affirment jamais documenter cet établissement.
 *
 * `blur` : miniature 12px encodée en base64, pour éviter le trou noir avant
 * chargement (placeholder="blur" de next/image).
 */

export type PhotoAsset = {
  readonly src: string;
  readonly width: number;
  readonly height: number;
  readonly alt: string;
  readonly blur: string;
};

export const PHOTOS = {
  heroTrio: {
    src: "/templates/restaurant/hero-smash-trio.jpg",
    width: 1920,
    height: 1440,
    alt: "Trois burgers smashés alignés sur une planche en bois : steaks saisis aux bords caramélisés, cheddar fondu et bacon grillé, sous une lumière rasante d'atelier.",
    blur: "data:image/jpeg;base64,/9j/2wBDABQODxIPDRQSEBIXFRQYHjIhHhwcHj0sLiQySUBMS0dARkVQWnNiUFVtVkVGZIhlbXd7gYKBTmCNl4x9lnN+gXz/2wBDARUXFx4aHjshITt8U0ZTfHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHz/wAARCAAJAAwDASIAAhEBAxEB/8QAFgABAQEAAAAAAAAAAAAAAAAAAgMF/8QAIhAAAgEDAgcAAAAAAAAAAAAAAQIDAAQRBXEhIjEyM2Gx/8QAFQEBAQAAAAAAAAAAAAAAAAAAAwT/xAAYEQADAQEAAAAAAAAAAAAAAAAAAQISIf/aAAwDAQACEQMRAD8AMGlzSaeyTwELkupRwMHHT3Rjs7dl57aZGHDCsR9rT03xTbrVpO9t6n266PhSf//Z",
  },
  signatureDouble: {
    src: "/templates/restaurant/signature-double-cheddar.jpg",
    width: 1920,
    height: 1280,
    alt: "Gros plan d'un double cheeseburger : deux steaks épais nappés de cheddar fondu, salade craquante et tomate, entre deux pains briochés, sur une assiette noire mate.",
    blur: "data:image/jpeg;base64,/9j/2wBDABQODxIPDRQSEBIXFRQYHjIhHhwcHj0sLiQySUBMS0dARkVQWnNiUFVtVkVGZIhlbXd7gYKBTmCNl4x9lnN+gXz/2wBDARUXFx4aHjshITt8U0ZTfHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHz/wAARCAAIAAwDASIAAhEBAxEB/8QAFgABAQEAAAAAAAAAAAAAAAAAAAQF/8QAHhAAAgICAgMAAAAAAAAAAAAAAQIABAMRBSESMYH/xAAUAQEAAAAAAAAAAAAAAAAAAAAC/8QAFxEAAwEAAAAAAAAAAAAAAAAAAAEREv/aAAwDAQACEQMRAD8AyqVrywsWdEyM3SkjWvsms8g62HC6I37Q9REOVRVw/9k=",
  },
  burgerBokeh: {
    src: "/templates/restaurant/burger-bokeh-soir.jpg",
    width: 1920,
    height: 1442,
    alt: "Burger au pain brioché doré photographié de profil sur une assiette claire, devant un fond sombre piqué de lumières chaudes floues.",
    blur: "data:image/jpeg;base64,/9j/2wBDABQODxIPDRQSEBIXFRQYHjIhHhwcHj0sLiQySUBMS0dARkVQWnNiUFVtVkVGZIhlbXd7gYKBTmCNl4x9lnN+gXz/2wBDARUXFx4aHjshITt8U0ZTfHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHz/wAARCAAJAAwDASIAAhEBAxEB/8QAFwAAAwEAAAAAAAAAAAAAAAAAAgQFBv/EACEQAAICAQIHAAAAAAAAAAAAAAECAAMSBREEITEzQWHB/8QAFQEBAQAAAAAAAAAAAAAAAAAAAQL/xAAXEQADAQAAAAAAAAAAAAAAAAAAARIR/9oADAMBAAIRAxEAPwAF0UI1+FaIhxxL2Ll78yPbptotfepObEja5B9mq43tREdIQireH//Z",
  },
  burgerMacro: {
    src: "/templates/restaurant/burger-macro-fondu.jpg",
    width: 1920,
    height: 1280,
    alt: "Macro d'un burger au pain de sésame : fromage fondu qui coule sur la salade, cornet de frites flou en arrière-plan, reflets colorés.",
    blur: "data:image/jpeg;base64,/9j/2wBDABQODxIPDRQSEBIXFRQYHjIhHhwcHj0sLiQySUBMS0dARkVQWnNiUFVtVkVGZIhlbXd7gYKBTmCNl4x9lnN+gXz/2wBDARUXFx4aHjshITt8U0ZTfHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHz/wAARCAAIAAwDASIAAhEBAxEB/8QAFgABAQEAAAAAAAAAAAAAAAAAAAMF/8QAHRAAAgIBBQAAAAAAAAAAAAAAAQIAAxEEBRMhkf/EABQBAQAAAAAAAAAAAAAAAAAAAAP/xAAYEQADAQEAAAAAAAAAAAAAAAAAARECIf/aAAwDAQACEQMRAD8Ay01CUVcdZZWHZOAQT5KDcrQBhmiIWG7R2pw//9k=",
  },
  burgerArdoise: {
    src: "/templates/restaurant/burger-ardoise-noire.jpg",
    width: 1920,
    height: 1280,
    alt: "Vue de dessus d'un burger au pain de sésame posé sur une large ardoise noire, largement dégagée sur la droite.",
    blur: "data:image/jpeg;base64,/9j/2wBDABQODxIPDRQSEBIXFRQYHjIhHhwcHj0sLiQySUBMS0dARkVQWnNiUFVtVkVGZIhlbXd7gYKBTmCNl4x9lnN+gXz/2wBDARUXFx4aHjshITt8U0ZTfHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHz/wAARCAAIAAwDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAT/xAAdEAACAQQDAAAAAAAAAAAAAAAAAQIDBBEhFDFB/8QAFAEBAAAAAAAAAAAAAAAAAAAAA//EABkRAAIDAQAAAAAAAAAAAAAAAAACARESMf/aAAwDAQACEQMRAD8AkqysXYRVNS5Gs5XT92QAD5oBWlun/9k=",
  },
  burgerAssiette: {
    src: "/templates/restaurant/burger-frites-assiette.jpg",
    width: 1920,
    height: 1280,
    alt: "Cheeseburger au bacon et aux crudités servi avec une poignée de frites dorées sur une assiette blanche, fond sombre.",
    blur: "data:image/jpeg;base64,/9j/2wBDABQODxIPDRQSEBIXFRQYHjIhHhwcHj0sLiQySUBMS0dARkVQWnNiUFVtVkVGZIhlbXd7gYKBTmCNl4x9lnN+gXz/2wBDARUXFx4aHjshITt8U0ZTfHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHz/wAARCAAIAAwDASIAAhEBAxEB/8QAFgABAQEAAAAAAAAAAAAAAAAAAAME/8QAHhAAAgICAgMAAAAAAAAAAAAAAQMCEQAEBRIxQ3H/xAAVAQEBAAAAAAAAAAAAAAAAAAACA//EABkRAAIDAQAAAAAAAAAAAAAAAAARAQIhQf/aAAwDAQACEQMRAD8AkriikiaNaBoe09rvMu3xknN7OUFTrwuIr7jGTXWK04j/2Q==",
  },
  burgerPlanche: {
    src: "/templates/restaurant/burger-planche-sauces.jpg",
    width: 1920,
    height: 1280,
    alt: "Burger au pain de sésame brillant servi sur une planche en bois avec des frites et deux sauces en coupelle.",
    blur: "data:image/jpeg;base64,/9j/2wBDABQODxIPDRQSEBIXFRQYHjIhHhwcHj0sLiQySUBMS0dARkVQWnNiUFVtVkVGZIhlbXd7gYKBTmCNl4x9lnN+gXz/2wBDARUXFx4aHjshITt8U0ZTfHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHz/wAARCAAIAAwDASIAAhEBAxEB/8QAFgABAQEAAAAAAAAAAAAAAAAAAAMF/8QAHBAAAgICAwAAAAAAAAAAAAAAAQIAEQMTBBIh/8QAFAEBAAAAAAAAAAAAAAAAAAAAA//EABYRAQEBAAAAAAAAAAAAAAAAAAEAEf/aAAwDAQACEQMRAD8Ay+JlTQxKbGqutn2S5FLmbpk1qfQpY2IiAOTpt//Z",
  },
  planchaBacon: {
    src: "/templates/restaurant/plancha-bacon-spatule.jpg",
    width: 1920,
    height: 1280,
    alt: "Tranches de bacon grillé déposées à la spatule sur un steak nappé de fromage fondu, juste avant la pose du pain.",
    blur: "data:image/jpeg;base64,/9j/2wBDABQODxIPDRQSEBIXFRQYHjIhHhwcHj0sLiQySUBMS0dARkVQWnNiUFVtVkVGZIhlbXd7gYKBTmCNl4x9lnN+gXz/2wBDARUXFx4aHjshITt8U0ZTfHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHz/wAARCAAIAAwDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAP/xAAcEAEAAwACAwAAAAAAAAAAAAABAAIDBBETISL/xAAUAQEAAAAAAAAAAAAAAAAAAAAE/8QAFxEBAQEBAAAAAAAAAAAAAAAAAQACEf/aAAwDAQACEQMRAD8AlnwNcguPkLVPVQElr8DDZL6Ua3T66eoiFNPZKF//2Q==",
  },
  chickenCheddar: {
    src: "/templates/restaurant/chicken-burger-cheddar.jpg",
    width: 1920,
    height: 1280,
    alt: "Burger de poulet pané extra-croustillant nappé de fromage fondu et de bacon, salade et tomate, servi avec des frites.",
    blur: "data:image/jpeg;base64,/9j/2wBDABQODxIPDRQSEBIXFRQYHjIhHhwcHj0sLiQySUBMS0dARkVQWnNiUFVtVkVGZIhlbXd7gYKBTmCNl4x9lnN+gXz/2wBDARUXFx4aHjshITt8U0ZTfHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHz/wAARCAAIAAwDASIAAhEBAxEB/8QAFgABAQEAAAAAAAAAAAAAAAAAAAME/8QAHhAAAgICAgMAAAAAAAAAAAAAAgMBBAAREyIxkbH/xAAVAQEBAAAAAAAAAAAAAAAAAAABAv/EABcRAQEBAQAAAAAAAAAAAAAAAAIBABH/2gAMAwEAAhEDEQA/AMiqdigcSK+VZa3O/kZcKDrG2ISoAKfBdZ9YxkidWUrN/9k=",
  },
  chickenSlaw: {
    src: "/templates/restaurant/chicken-slaw-portrait.jpg",
    width: 1920,
    height: 2560,
    alt: "Sandwich de poulet croustillant débordant de chou rouge mariné, posé sur une plaque métallique, cadrage vertical serré.",
    blur: "data:image/jpeg;base64,/9j/2wBDABQODxIPDRQSEBIXFRQYHjIhHhwcHj0sLiQySUBMS0dARkVQWnNiUFVtVkVGZIhlbXd7gYKBTmCNl4x9lnN+gXz/2wBDARUXFx4aHjshITt8U0ZTfHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHz/wAARCAAQAAwDASIAAhEBAxEB/8QAFgABAQEAAAAAAAAAAAAAAAAABQQG/8QAIRAAAgICAQQDAAAAAAAAAAAAAgMBBAARBRIhIjFBQnH/xAAUAQEAAAAAAAAAAAAAAAAAAAAC/8QAFxEBAQEBAAAAAAAAAAAAAAAAAQARQf/aAAwDAQACEQMRAD8AVfeTUMAM9EzZb+IygDloQYeQz6mI95lLXKVLlmGvrNSXTAl0TBRr87Y7S5FNeuK0Kc8I+4h2w9khl//Z",
  },
  chickenFriture: {
    src: "/templates/restaurant/chicken-friture-paniers.jpg",
    width: 1920,
    height: 1280,
    alt: "Barquettes de poulet frit encore brûlant, panure épaisse et dorée, alignées derrière une pince de service.",
    blur: "data:image/jpeg;base64,/9j/2wBDABQODxIPDRQSEBIXFRQYHjIhHhwcHj0sLiQySUBMS0dARkVQWnNiUFVtVkVGZIhlbXd7gYKBTmCNl4x9lnN+gXz/2wBDARUXFx4aHjshITt8U0ZTfHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHz/wAARCAAIAAwDASIAAhEBAxEB/8QAFgABAQEAAAAAAAAAAAAAAAAAAAED/8QAHxABAQABAgcAAAAAAAAAAAAAAQIAAxEEBRITQVFh/8QAFQEBAQAAAAAAAAAAAAAAAAAAAwT/xAAXEQEBAQEAAAAAAAAAAAAAAAARAAIx/9oADAMBAAIRAxEAPwCMaHFl6dx3a6RmNtkX74zOeVTIE2SelFMYwMcanYl//9k=",
  },
  tenders: {
    src: "/templates/restaurant/tenders-frites-ketchup.jpg",
    width: 1920,
    height: 1440,
    alt: "Barquette de tenders de poulet croustillants posés sur un lit de frites ondulées, avec une coupelle de sauce tomate.",
    blur: "data:image/jpeg;base64,/9j/2wBDABQODxIPDRQSEBIXFRQYHjIhHhwcHj0sLiQySUBMS0dARkVQWnNiUFVtVkVGZIhlbXd7gYKBTmCNl4x9lnN+gXz/2wBDARUXFx4aHjshITt8U0ZTfHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHz/wAARCAAJAAwDASIAAhEBAxEB/8QAFwAAAwEAAAAAAAAAAAAAAAAAAQIEBf/EACQQAAIBAwALAAAAAAAAAAAAAAECAwAEEQUSIjEyNEFhcYKR/8QAFAEBAAAAAAAAAAAAAAAAAAAAAv/EABcRAQEBAQAAAAAAAAAAAAAAAAECABH/2gAMAwEAAhEDEQA/ABbwRxqHcxnBJ2huPn5WTpC0DXTNBI2qRkjGQD1A7Ul9zb+tWJwCgSlL3NoQOb//2Q==",
  },
  fritesBol: {
    src: "/templates/restaurant/frites-bol-persil.jpg",
    width: 1920,
    height: 1280,
    alt: "Bol blanc rempli de frites fines dorées, parsemées de persil haché et de sel.",
    blur: "data:image/jpeg;base64,/9j/2wBDABQODxIPDRQSEBIXFRQYHjIhHhwcHj0sLiQySUBMS0dARkVQWnNiUFVtVkVGZIhlbXd7gYKBTmCNl4x9lnN+gXz/2wBDARUXFx4aHjshITt8U0ZTfHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHz/wAARCAAIAAwDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAX/xAAhEAACAQMDBQAAAAAAAAAAAAABAgQAAxEFEiETIjJRcf/EABQBAQAAAAAAAAAAAAAAAAAAAAL/xAAYEQEAAwEAAAAAAAAAAAAAAAABAAIRIv/aAAwDAQACEQMRAD8Ap3utGYu9zufxwANo9fakatCkT5S3w9oZQDBfnilKBy6RIWMZ/9k=",
  },
  loadedBoites: {
    src: "/templates/restaurant/loaded-frites-boites.jpg",
    width: 1920,
    height: 1421,
    alt: "Deux boîtes à emporter ouvertes côte à côte : frites nappées de sauce et de fromage fondu d'un côté, burger smashé sur papier vichy de l'autre.",
    blur: "data:image/jpeg;base64,/9j/2wBDABQODxIPDRQSEBIXFRQYHjIhHhwcHj0sLiQySUBMS0dARkVQWnNiUFVtVkVGZIhlbXd7gYKBTmCNl4x9lnN+gXz/2wBDARUXFx4aHjshITt8U0ZTfHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHz/wAARCAAJAAwDASIAAhEBAxEB/8QAFwAAAwEAAAAAAAAAAAAAAAAAAgMEBf/EACMQAAEDAgUFAAAAAAAAAAAAAAECAwQAEQUSE2FyMzRBccH/xAAVAQEBAAAAAAAAAAAAAAAAAAAAAf/EABYRAQEBAAAAAAAAAAAAAAAAAAEAIf/aAAwDAQACEQMRAD8AGHiMpqAgtKb1FrsRlAvvtS5WKYqHiNSw8ZW0kW92q9PWk8D8rYi9mxwqBsXL/9k=",
  },
  shake: {
    src: "/templates/restaurant/shake-verse-glace.jpg",
    width: 1920,
    height: 1280,
    alt: "Milkshake au chocolat versé du bol du blender dans un gobelet rempli de glace, mousse épaisse en pleine coulée.",
    blur: "data:image/jpeg;base64,/9j/2wBDABQODxIPDRQSEBIXFRQYHjIhHhwcHj0sLiQySUBMS0dARkVQWnNiUFVtVkVGZIhlbXd7gYKBTmCNl4x9lnN+gXz/2wBDARUXFx4aHjshITt8U0ZTfHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHz/wAARCAAIAAwDASIAAhEBAxEB/8QAFgABAQEAAAAAAAAAAAAAAAAAAAME/8QAHxAAAgICAQUAAAAAAAAAAAAAAQIAAwQSERMhYXGB/8QAFQEBAQAAAAAAAAAAAAAAAAAAAgP/xAAYEQADAQEAAAAAAAAAAAAAAAAAAQIRIf/aAAwDAQACEQMRAD8AyXY9eDY2Nao3JGrK/Zl9fJI9RTwHIHi2IgrjKzOo/9k=",
  },
  sundae: {
    src: "/templates/restaurant/sundae-fraise.jpg",
    width: 1920,
    height: 1280,
    alt: "Coupe glacée à la fraise surmontée de chantilly et d'un filet de coulis, posée sur un plateau sombre.",
    blur: "data:image/jpeg;base64,/9j/2wBDABQODxIPDRQSEBIXFRQYHjIhHhwcHj0sLiQySUBMS0dARkVQWnNiUFVtVkVGZIhlbXd7gYKBTmCNl4x9lnN+gXz/2wBDARUXFx4aHjshITt8U0ZTfHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHz/wAARCAAIAAwDASIAAhEBAxEB/8QAFgABAQEAAAAAAAAAAAAAAAAAAAQF/8QAHRAAAgEFAQEAAAAAAAAAAAAAAQIRAAMEEiETof/EABUBAQEAAAAAAAAAAAAAAAAAAAID/8QAFxEBAAMAAAAAAAAAAAAAAAAAAAECUf/aAAwDAQACEQMRAD8AhxdGwb9hlx09GAZ2aIgc5WdlEWruvurwB1SY+UpQhW2P/9k=",
  },
  cornet: {
    src: "/templates/restaurant/cornet-glace-crepuscule.jpg",
    width: 1920,
    height: 1280,
    alt: "Cornet de glace tenu à bout de bras devant un horizon dégagé, dans la lumière de fin de journée.",
    blur: "data:image/jpeg;base64,/9j/2wBDABQODxIPDRQSEBIXFRQYHjIhHhwcHj0sLiQySUBMS0dARkVQWnNiUFVtVkVGZIhlbXd7gYKBTmCNl4x9lnN+gXz/2wBDARUXFx4aHjshITt8U0ZTfHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHz/wAARCAAIAAwDASIAAhEBAxEB/8QAFgABAQEAAAAAAAAAAAAAAAAAAAIE/8QAHhAAAgICAgMAAAAAAAAAAAAAAQIAEQMFEiEEUYH/xAAVAQEBAAAAAAAAAAAAAAAAAAABAv/EABYRAQEBAAAAAAAAAAAAAAAAAAABEf/aAAwDAQACEQMRAD8A2NvGYBkw4xxNlQb5D13Jbfpffj4/txEMVK//2Q==",
  },
  plateauRouge: {
    src: "/templates/restaurant/plateau-rouge-emporter.jpg",
    width: 1920,
    height: 1186,
    alt: "Plateau de service rouge : burger emballé dans son papier, frites ondulées débordant d'un sachet et gobelet glacé.",
    blur: "data:image/jpeg;base64,/9j/2wBDABQODxIPDRQSEBIXFRQYHjIhHhwcHj0sLiQySUBMS0dARkVQWnNiUFVtVkVGZIhlbXd7gYKBTmCNl4x9lnN+gXz/2wBDARUXFx4aHjshITt8U0ZTfHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHz/wAARCAAHAAwDASIAAhEBAxEB/8QAFgABAQEAAAAAAAAAAAAAAAAAAAMF/8QAHxAAAgICAQUAAAAAAAAAAAAAAQIAAwQRIQUUUZGx/8QAFAEBAAAAAAAAAAAAAAAAAAAAA//EABgRAQADAQAAAAAAAAAAAAAAAAEAAhET/9oADAMBAAIRAxEAPwCXTqsXtwiVhAOXd0V2869TPycfAe9zTXaq7PAYa+REIs6x+dVn/9k=",
  },
  boiteVoiture: {
    src: "/templates/restaurant/boite-emporter-cuir.jpg",
    width: 1920,
    height: 1281,
    alt: "Burger au pain de sésame dans sa boîte à emporter ouverte, posée sur une banquette en cuir rouge.",
    blur: "data:image/jpeg;base64,/9j/2wBDABQODxIPDRQSEBIXFRQYHjIhHhwcHj0sLiQySUBMS0dARkVQWnNiUFVtVkVGZIhlbXd7gYKBTmCNl4x9lnN+gXz/2wBDARUXFx4aHjshITt8U0ZTfHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHz/wAARCAAIAAwDASIAAhEBAxEB/8QAFgABAQEAAAAAAAAAAAAAAAAAAAME/8QAHxAAAgEEAgMAAAAAAAAAAAAAAQIDAAQRIQUxEhNR/8QAFQEBAQAAAAAAAAAAAAAAAAAAAgP/xAAYEQEBAQEBAAAAAAAAAAAAAAABAgADIf/aAAwDAQACEQMRAD8AyWE0QVDOG9qjbkEZUjrOR1U57vhDK2bSZWzvwYEE/RulKMPrrdpCR3//2Q==",
  },
  salleVitrine: {
    src: "/templates/restaurant/salle-vitrine-urbaine.jpg",
    width: 1920,
    height: 1272,
    alt: "Salle de restauration vue depuis la rue à travers une grande verrière : tables claires, chaises colorées et reflets de la ville.",
    blur: "data:image/jpeg;base64,/9j/2wBDABQODxIPDRQSEBIXFRQYHjIhHhwcHj0sLiQySUBMS0dARkVQWnNiUFVtVkVGZIhlbXd7gYKBTmCNl4x9lnN+gXz/2wBDARUXFx4aHjshITt8U0ZTfHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHz/wAARCAAIAAwDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAT/xAAeEAABBAEFAAAAAAAAAAAAAAABAAIDETETFCEyYf/EABUBAQEAAAAAAAAAAAAAAAAAAAAC/8QAFREBAQAAAAAAAAAAAAAAAAAAAAH/2gAMAwEAAhEDEQA/AJdabbVRdYvqoppZQ4BzzwMXjxERMf/Z",
  },
} as const satisfies Record<string, PhotoAsset>;

export type PhotoKey = keyof typeof PHOTOS;
