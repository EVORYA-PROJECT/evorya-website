import { normalizeCountryCode, currencyForCountry } from "@/lib/international";
import { DEFAULT_COUNTRY_CODE } from "@/lib/data/countries";

type CountrySource = "vercel" | "cloudflare" | "netlify" | "default";

export function GET(request: Request) {
  const candidates: Array<[string | null, CountrySource]> = [
    [request.headers.get("x-vercel-ip-country"), "vercel"],
    [request.headers.get("cf-ipcountry"), "cloudflare"],
    [request.headers.get("x-nf-country-code"), "netlify"],
  ];

  let countryCode = DEFAULT_COUNTRY_CODE;
  let source: CountrySource = "default";
  for (const [candidate, candidateSource] of candidates) {
    const normalized = normalizeCountryCode(candidate);
    if (normalized) {
      countryCode = normalized;
      source = candidateSource;
      break;
    }
  }

  return Response.json(
    { countryCode, currency: currencyForCountry(countryCode), source },
    { headers: { "Cache-Control": "private, no-store, max-age=0" } },
  );
}
