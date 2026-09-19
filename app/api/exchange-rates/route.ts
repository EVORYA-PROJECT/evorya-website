import { CURRENCIES, type CurrencyCode } from "@/lib/international";

type FrankfurterRate = {
  date: string;
  base: string;
  quote: string;
  rate: number;
};

const QUOTES = CURRENCIES.filter((currency) => currency !== "MAD").join(",");

export async function GET() {
  try {
    const response = await fetch(
      `https://api.frankfurter.dev/v2/rates?base=MAD&quotes=${QUOTES}`,
      { next: { revalidate: 21_600 } },
    );
    if (!response.ok) throw new Error(`Exchange rate upstream returned ${response.status}`);

    const payload = (await response.json()) as FrankfurterRate[];
    const rates: Partial<Record<CurrencyCode, number>> = { MAD: 1 };
    let date = "";
    for (const item of payload) {
      if (CURRENCIES.includes(item.quote as CurrencyCode) && Number.isFinite(item.rate) && item.rate > 0) {
        rates[item.quote as CurrencyCode] = item.rate;
        if (item.date > date) date = item.date;
      }
    }

    return Response.json(
      { base: "MAD", rates, date, available: true },
      { headers: { "Cache-Control": "public, s-maxage=21600, stale-while-revalidate=86400" } },
    );
  } catch {
    return Response.json(
      { base: "MAD", rates: { MAD: 1 }, date: null, available: false },
      { headers: { "Cache-Control": "public, s-maxage=300" } },
    );
  }
}
