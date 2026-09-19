"use client";

import { useState } from "react";
import RevealOnScroll from "@/components/ui/RevealOnScroll";
import SectionLabel from "@/components/ui/SectionLabel";
import MagneticButton from "@/components/ui/MagneticButton";
import CustomSelect from "@/components/ui/CustomSelect";
import type { OfferRow } from "@/lib/cms/types";
import { useVisitorPreferences } from "@/components/providers/VisitorPreferencesProvider";
import {
  CURRENCIES,
  CURRENCY_LABELS,
  formatCurrency,
  parseMadAmount,
  type CurrencyCode,
} from "@/lib/international";

const CURRENCY_OPTIONS = CURRENCIES.map((code) => ({
  value: code,
  label: `${code} — ${CURRENCY_LABELS[code]}`,
}));

function OfferCard({ offer }: { offer: OfferRow }) {
  const displayedPrice = offer.price.replace(/^\s*à\s+partir\s+de\s+/i, "");
  const { currency, currencyRate, ratesStatus } = useVisitorPreferences();
  const sourceAmount = parseMadAmount(offer.price);
  const converted = currency !== "MAD" && currencyRate && sourceAmount
    ? formatCurrency(sourceAmount * currencyRate, currency)
    : null;
  return (
    <article
      className={`flex h-full flex-col border px-7 py-9 sm:px-9 sm:py-10 ${
        offer.featured
          ? "border-paper bg-paper/[0.04] lg:-translate-y-4 lg:shadow-[0_0_60px_-15px_rgba(242,242,242,0.25)]"
          : "border-line"
      }`}
    >
      {offer.featured && (
        <span className="mb-6 inline-flex w-fit items-center border border-paper px-3 py-1 font-display text-[10px] uppercase tracking-[0.3em] text-paper">
          Recommandée
        </span>
      )}

      <h3 className="font-display text-lg uppercase tracking-[0.15em] text-paper">
        {offer.name}
      </h3>

      <div className="mt-5 flex flex-col items-start gap-1">
        <span className="text-xs text-mist">À partir de</span>
        <span className="text-3xl font-medium text-paper sm:text-4xl">{converted ?? displayedPrice}</span>
      </div>
      {converted && (
        <span className="mt-2 text-[11px] leading-relaxed text-mist-dim">
          Conversion indicative · Référence {displayedPrice}
        </span>
      )}
      {currency !== "MAD" && !converted && ratesStatus === "unavailable" && (
        <span className="mt-2 text-[11px] leading-relaxed text-mist-dim">
          Conversion indisponible · Prix affiché en MAD
        </span>
      )}
      {offer.price_note && (
        <span className="mt-1 font-display text-[10px] uppercase tracking-[0.25em] text-mist-dim">
          {offer.price_note}
        </span>
      )}

      <p className="mt-6 text-sm text-mist sm:text-base">{offer.tagline}</p>

      <ul className="mt-8 flex-1 space-y-3">
        {offer.features.map((feature) => (
          <li key={feature} className="flex items-start gap-3 text-sm text-paper-dim/90">
            <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-mist" />
            {feature}
          </li>
        ))}
      </ul>

      <MagneticButton
        as="a"
        href="#contact"
        className={`mt-10 inline-flex h-14 w-full items-center justify-center px-6 font-display text-xs uppercase tracking-[0.25em] transition-colors ${
          offer.featured ? "bg-paper text-ink" : "border border-line-strong text-paper hover:border-paper"
        }`}
      >
        {offer.cta}
      </MagneticButton>
    </article>
  );
}

export default function Offers({ offers }: { offers: OfferRow[] }) {
  const defaultIndex = Math.max(0, offers.findIndex((o) => o.featured));
  const [activeIndex, setActiveIndex] = useState(defaultIndex);

  const active = offers[activeIndex] ?? offers[0];
  const { currency, setCurrency, ratesStatus } = useVisitorPreferences();

  return (
    <section
      id="offres"
      className="relative border-t border-line bg-ink px-6 py-28 sm:px-8 lg:px-12 lg:py-40"
    >
      <div className="mx-auto max-w-[1440px]">
        <RevealOnScroll>
          <SectionLabel index="04" label="Offres" />
        </RevealOnScroll>

        <RevealOnScroll delay={0.05}>
          <h2 className="mt-8 max-w-2xl text-3xl font-medium tracking-tight text-paper sm:text-4xl lg:text-5xl">
            Trois façons de démarrer
          </h2>
        </RevealOnScroll>

        <RevealOnScroll delay={0.07}>
          <div className="mt-7 flex flex-wrap items-center gap-x-3 gap-y-2 text-xs text-mist sm:justify-end">
            <span>Devise d’affichage</span>
            <div className="w-full max-w-64 sm:w-64">
              <CustomSelect
                value={currency}
                onChange={(value) => setCurrency(value as CurrencyCode)}
                options={CURRENCY_OPTIONS}
                placeholder="Choisir une devise"
                ariaLabel="Devise d’affichage"
                className="min-h-11 text-sm"
              />
            </div>
            {currency !== "MAD" && ratesStatus === "loading" && (
              <span aria-live="polite" className="text-mist-dim">Conversion en cours…</span>
            )}
          </div>
        </RevealOnScroll>

        {/* Mobile/tablette (< lg) : un sélecteur compact au lieu de trois
            cartes empilées — le prix reste toujours immédiatement visible. */}
        <div className="mt-12 lg:hidden">
          <RevealOnScroll delay={0.08}>
            <div
              role="group"
              aria-label="Choisir une offre"
              className="relative z-10 grid grid-cols-3 border border-line-strong"
            >
              {offers.map((offer, i) => (
                <button
                  key={offer.id}
                  type="button"
                  aria-pressed={activeIndex === i}
                  onClick={() => setActiveIndex(i)}
                  className={`flex h-14 items-center justify-center px-2 text-center font-display text-[11px] uppercase tracking-[0.15em] transition-colors ${
                    activeIndex === i ? "bg-paper text-ink" : "text-paper-dim"
                  } ${i > 0 ? "border-l border-line-strong" : ""}`}
                >
                  {offer.name}
                </button>
              ))}
            </div>
          </RevealOnScroll>

          {active && (
            <RevealOnScroll key={active.id} delay={0.02} className="mt-6">
              <OfferCard offer={active} />
            </RevealOnScroll>
          )}
        </div>

        {/* Desktop (>= lg) : composition grille existante, inchangée. */}
        <div className="mt-16 hidden gap-6 lg:mt-20 lg:grid lg:grid-cols-3 lg:items-stretch lg:gap-8">
          {offers.map((offer, i) => (
            <RevealOnScroll key={offer.id} delay={i * 0.08} className="h-full">
              <OfferCard offer={offer} />
            </RevealOnScroll>
          ))}
        </div>
      </div>
    </section>
  );
}
