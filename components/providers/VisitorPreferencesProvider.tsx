"use client";

import { createContext, useCallback, useContext, useEffect, useMemo, useRef, useState } from "react";
import { DEFAULT_COUNTRY_CODE } from "@/lib/data/countries";
import {
  currencyForCountry,
  isSupportedCurrency,
  normalizeCountryCode,
  type CurrencyCode,
} from "@/lib/international";

const CURRENCY_KEY = "evorya.currency";
const PHONE_COUNTRY_KEY = "evorya.phone-country";

type RatesStatus = "idle" | "loading" | "ready" | "unavailable";

type VisitorPreferencesValue = {
  detectedCountryCode: string | null;
  countrySource: string;
  currency: CurrencyCode;
  setCurrency: (currency: CurrencyCode) => void;
  currencyRate: number | null;
  ratesStatus: RatesStatus;
  phoneCountryCode: string;
  setPhoneCountryCode: (countryCode: string) => void;
};

const VisitorPreferencesContext = createContext<VisitorPreferencesValue | null>(null);

export function VisitorPreferencesProvider({ children }: { children: React.ReactNode }) {
  const [detectedCountryCode, setDetectedCountryCode] = useState<string | null>(null);
  const [countrySource, setCountrySource] = useState("default");
  const [currency, setCurrencyState] = useState<CurrencyCode>("MAD");
  const [phoneCountryCode, setPhoneCountryState] = useState(DEFAULT_COUNTRY_CODE);
  const [currencyRate, setCurrencyRate] = useState<number | null>(1);
  const [ratesStatus, setRatesStatus] = useState<RatesStatus>("idle");
  const [loadedCurrency, setLoadedCurrency] = useState<CurrencyCode | null>("MAD");
  const manualCurrencyRef = useRef(false);
  const manualPhoneCountryRef = useRef(false);

  useEffect(() => {
    const controller = new AbortController();
    let active = true;

    async function hydratePreferences() {
      // Keep the server/client first render identical, then hydrate persisted
      // choices before applying the asynchronous infrastructure detection.
      await Promise.resolve();
      if (!active) return;
      const storedCurrency = localStorage.getItem(CURRENCY_KEY);
      const storedPhoneCountry = normalizeCountryCode(localStorage.getItem(PHONE_COUNTRY_KEY));
      const manualCurrency = isSupportedCurrency(storedCurrency) ? storedCurrency : null;

      if (manualCurrency) {
        manualCurrencyRef.current = true;
        setCurrencyState(manualCurrency);
      }
      if (storedPhoneCountry) {
        manualPhoneCountryRef.current = true;
        setPhoneCountryState(storedPhoneCountry);
      }

      try {
        const response = await fetch("/api/visitor-context", { cache: "no-store", signal: controller.signal });
        if (!response.ok) return;
        const context = await response.json() as { countryCode?: unknown; currency?: unknown; source?: unknown };
        const countryCode = normalizeCountryCode(context.countryCode);
        if (!active || !countryCode) return;
        setDetectedCountryCode(countryCode);
        setCountrySource(typeof context.source === "string" ? context.source : "default");
        if (!manualCurrencyRef.current) setCurrencyState(currencyForCountry(countryCode));
        if (!manualPhoneCountryRef.current) setPhoneCountryState(countryCode);
      } catch {
        // Default MAD / Morocco remains a truthful, stable fallback.
      }
    }

    void hydratePreferences();
    return () => {
      active = false;
      controller.abort();
    };
  }, []);

  useEffect(() => {
    if (currency === "MAD") {
      return;
    }

    const controller = new AbortController();
    fetch("/api/exchange-rates", { signal: controller.signal })
      .then((response) => response.ok ? response.json() : Promise.reject())
      .then((payload: { available?: boolean; rates?: Partial<Record<CurrencyCode, number>> }) => {
        const rate = payload.available ? payload.rates?.[currency] : undefined;
        if (typeof rate !== "number" || !Number.isFinite(rate) || rate <= 0) throw new Error();
        setCurrencyRate(rate);
        setRatesStatus("ready");
        setLoadedCurrency(currency);
      })
      .catch((error: unknown) => {
        if (error instanceof DOMException && error.name === "AbortError") return;
        setCurrencyRate(null);
        setRatesStatus("unavailable");
        setLoadedCurrency(currency);
      });

    return () => controller.abort();
  }, [currency]);

  const setCurrency = useCallback((nextCurrency: CurrencyCode) => {
    manualCurrencyRef.current = true;
    setCurrencyState(nextCurrency);
    localStorage.setItem(CURRENCY_KEY, nextCurrency);
  }, []);

  const setPhoneCountryCode = useCallback((nextCode: string) => {
    const normalized = normalizeCountryCode(nextCode);
    if (!normalized) return;
    manualPhoneCountryRef.current = true;
    setPhoneCountryState(normalized);
    localStorage.setItem(PHONE_COUNTRY_KEY, normalized);
  }, []);

  const value = useMemo<VisitorPreferencesValue>(() => ({
    detectedCountryCode,
    countrySource,
    currency,
    setCurrency,
    currencyRate: currency === "MAD" ? 1 : loadedCurrency === currency ? currencyRate : null,
    ratesStatus: currency === "MAD" ? "ready" : loadedCurrency === currency ? ratesStatus : "loading",
    phoneCountryCode,
    setPhoneCountryCode,
  }), [countrySource, currency, currencyRate, detectedCountryCode, loadedCurrency, phoneCountryCode, ratesStatus, setCurrency, setPhoneCountryCode]);

  return <VisitorPreferencesContext.Provider value={value}>{children}</VisitorPreferencesContext.Provider>;
}

export function useVisitorPreferences() {
  const value = useContext(VisitorPreferencesContext);
  if (!value) throw new Error("useVisitorPreferences must be used inside VisitorPreferencesProvider");
  return value;
}
