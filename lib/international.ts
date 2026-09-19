import { DEFAULT_COUNTRY_CODE, getCountryByCode } from "@/lib/data/countries";

export const CURRENCIES = ["MAD", "EUR", "USD", "GBP", "CAD", "CHF", "AED", "AUD", "JPY"] as const;
export type CurrencyCode = (typeof CURRENCIES)[number];

export const CURRENCY_LABELS: Record<CurrencyCode, string> = {
  MAD: "Dirham marocain",
  EUR: "Euro",
  USD: "Dollar américain",
  GBP: "Livre sterling",
  CAD: "Dollar canadien",
  CHF: "Franc suisse",
  AED: "Dirham des Émirats",
  AUD: "Dollar australien",
  JPY: "Yen japonais",
};

const EURO_COUNTRIES = new Set([
  "AD", "AT", "BE", "CY", "DE", "EE", "ES", "FI", "FR", "GR", "HR", "IE",
  "IT", "LT", "LU", "LV", "MC", "ME", "MT", "NL", "PT", "SI", "SK", "SM", "VA",
]);

const COUNTRY_CURRENCIES: Record<string, CurrencyCode> = {
  MA: "MAD",
  US: "USD",
  EC: "USD",
  SV: "USD",
  PA: "USD",
  GB: "GBP",
  CA: "CAD",
  CH: "CHF",
  LI: "CHF",
  AE: "AED",
  AU: "AUD",
  JP: "JPY",
};

export function isSupportedCurrency(value: unknown): value is CurrencyCode {
  return typeof value === "string" && CURRENCIES.includes(value as CurrencyCode);
}

export function normalizeCountryCode(value: unknown): string | null {
  if (typeof value !== "string") return null;
  const code = value.trim().toUpperCase();
  return getCountryByCode(code) ? code : null;
}

export function currencyForCountry(countryCode: string): CurrencyCode {
  const code = normalizeCountryCode(countryCode) ?? DEFAULT_COUNTRY_CODE;
  if (EURO_COUNTRIES.has(code)) return "EUR";
  return COUNTRY_CURRENCIES[code] ?? "MAD";
}

export function parseMadAmount(price: string): number | null {
  const match = price.replace(/\u00a0/g, " ").match(/(\d[\d\s.,]*)\s*MAD\b/i);
  if (!match) return null;
  const amount = Number(match[1].replace(/[\s,.]/g, ""));
  return Number.isFinite(amount) && amount > 0 ? amount : null;
}

export function formatCurrency(amount: number, currency: CurrencyCode): string {
  return new Intl.NumberFormat("fr-FR", {
    style: "currency",
    currency,
    currencyDisplay: "code",
    maximumFractionDigits: currency === "JPY" ? 0 : 0,
  }).format(amount);
}
