"use client";

import { useState } from "react";
import RevealOnScroll from "@/components/ui/RevealOnScroll";
import SectionLabel from "@/components/ui/SectionLabel";
import MagneticButton from "@/components/ui/MagneticButton";
import { useProjectMatch } from "@/lib/project-match/context";
import type { OfferRow } from "@/lib/cms/types";

function OfferCard({ offer }: { offer: OfferRow }) {
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

      <div className="mt-5 flex items-baseline gap-2">
        <span className="text-3xl font-medium text-paper sm:text-4xl">{offer.price}</span>
      </div>
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
  const { selection } = useProjectMatch();

  // Le Project Matcher peut recommander une offre et vouloir l'afficher ici
  // (lien "Voir l'offre en détail") : une seule source de vérité pour
  // l'onglet actif, jamais un second état dupliqué côté Matcher. Ajusté
  // pendant le rendu (pas un effet) — voir "Adjusting state when a prop
  // changes" dans la doc React — pour éviter un rendu supplémentaire.
  const [lastSelectionToken, setLastSelectionToken] = useState(selection?.token ?? 0);
  if (selection && selection.token !== lastSelectionToken) {
    setLastSelectionToken(selection.token);
    const matchIndex = offers.findIndex((o) => o.id === selection.offerId);
    if (matchIndex >= 0) setActiveIndex(matchIndex);
  }

  const active = offers[activeIndex] ?? offers[0];

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
