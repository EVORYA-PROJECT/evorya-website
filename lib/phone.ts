// Formatage/normalisation d'un numéro de téléphone pendant la saisie, pour
// n'importe quel indicatif choisi via le sélecteur de pays. Le Maroc reste le
// cas le plus contraint (9 chiffres nationaux, validés strictement) ; pour les
// autres pays on applique le même style de regroupement visuel sans imposer
// une longueur exacte (chaque pays a ses propres règles de numérotation).
//
// L'indicatif est affiché séparément par le sélecteur de pays : le champ de
// saisie ne contient donc que la partie nationale ("display"), tandis que la
// valeur canonique envoyée au backend ("full") inclut toujours "+<indicatif>".

export const MOROCCO_DIAL = "212";
export const MOROCCO_NATIONAL_DIGITS_LENGTH = 9;
const MAX_NATIONAL_DIGITS = 12;

function onlyDigits(value: string): string {
  return value.replace(/\D/g, "");
}

// Combien de chiffres, en tête de la chaîne de chiffres bruts, correspondent
// à un indicatif reconnu (00<dial> / <dial> / 0 local) et doivent être ignorés.
function countPrefixDigits(digits: string, dial: string): number {
  if (digits.startsWith("00" + dial)) return 2 + dial.length;
  if (digits.startsWith(dial)) return dial.length;
  if (digits.startsWith("0")) return 1;
  return 0;
}

// Extrait les chiffres nationaux (sans indicatif), plafonnés, à partir de
// n'importe quelle saisie brute (frappe ou collage) et de l'indicatif choisi.
export function extractNationalDigits(rawValue: string, dial: string): string {
  const digits = onlyDigits(rawValue);
  const prefixLength = countPrefixDigits(digits, dial);
  return digits.slice(prefixLength, prefixLength + MAX_NATIONAL_DIGITS);
}

function buildGroups(national: string): string {
  if (national.length === 0) return "";
  const groups = [national[0]];
  for (let i = 1; i < national.length; i += 2) {
    groups.push(national.slice(i, i + 2));
  }
  return groups.join(" ");
}

export function formatNationalDigits(national: string, dial: string): string {
  const groups = buildGroups(national);
  return groups ? `+${dial} ${groups}` : "";
}

export type PhoneFieldFormatResult = {
  /** Uniquement la partie nationale groupée — à afficher dans le champ. */
  display: string;
  /** "+<indicatif> <partie nationale>" — valeur canonique à stocker/envoyer. */
  full: string;
  /** Position du curseur, relative à `display`. */
  caret: number;
};

/**
 * Reformate le contenu du champ téléphone (qui n'affiche que la partie
 * nationale, l'indicatif étant géré séparément par le sélecteur de pays)
 * après une frappe, un collage ou une suppression, et calcule la position de
 * curseur correspondante afin que l'édition reste fluide.
 */
export function formatPhoneField(rawValue: string, caret: number, dial: string): PhoneFieldFormatResult {
  const digits = onlyDigits(rawValue);
  const prefixLength = countPrefixDigits(digits, dial);
  const national = digits.slice(prefixLength, prefixLength + MAX_NATIONAL_DIGITS);
  const display = buildGroups(national);
  const full = formatNationalDigits(national, dial);

  if (national.length === 0) {
    return { display, full, caret: 0 };
  }

  const digitsBeforeCaretRaw = onlyDigits(rawValue.slice(0, caret)).length;
  const digitsBeforeCaretNational = Math.max(
    0,
    Math.min(national.length, digitsBeforeCaretRaw - prefixLength),
  );

  let caretPos = display.length;
  let count = 0;
  for (let i = 0; i < display.length; i++) {
    if (/\d/.test(display[i])) {
      count++;
      if (count === digitsBeforeCaretNational) {
        caretPos = i + 1;
        break;
      }
    }
  }
  if (digitsBeforeCaretNational === 0) caretPos = 0;

  return { display, full, caret: caretPos };
}

/**
 * Reformate un numéro déjà saisi lorsque l'utilisateur change de pays : on
 * conserve les chiffres nationaux déjà tapés et on applique le nouvel
 * indicatif, sans jamais dupliquer ou mélanger les préfixes.
 */
export function reformatForNewDial(currentValue: string, previousDial: string, newDial: string): string {
  const national = extractNationalDigits(currentValue, previousDial);
  return formatNationalDigits(national, newDial);
}

/** Valeur à afficher dans le champ (partie nationale) à partir de la valeur canonique stockée. */
export function displayValueFromFull(fullValue: string, dial: string): string {
  return buildGroups(extractNationalDigits(fullValue, dial));
}

export type PhoneValidation = "empty" | "valid" | "incomplete";

/**
 * Validation stricte uniquement pour le Maroc (9 chiffres nationaux, seule
 * longueur que nous connaissons avec certitude). Pour les autres pays, on se
 * contente de vérifier qu'au moins quelques chiffres ont été saisis : chaque
 * pays a ses propres règles de longueur, qu'on ne cherche pas à toutes
 * modéliser ici.
 */
export function validatePhone(formattedValue: string, dial: string): PhoneValidation {
  const national = extractNationalDigits(formattedValue, dial);
  if (national.length === 0) return "empty";
  if (dial === MOROCCO_DIAL) {
    return national.length < MOROCCO_NATIONAL_DIGITS_LENGTH ? "incomplete" : "valid";
  }
  return national.length < 4 ? "incomplete" : "valid";
}
