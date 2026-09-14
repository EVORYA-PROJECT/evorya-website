import RevealOnScroll from "@/components/ui/RevealOnScroll";
import SectionLabel from "@/components/ui/SectionLabel";
import MagneticButton from "@/components/ui/MagneticButton";
import type { OfferRow } from "@/lib/cms/types";

export default function Offers({ offers }: { offers: OfferRow[] }) {
  return (
    <section
      id="offres"
      className="relative border-t border-line bg-ink px-6 py-28 sm:px-8 lg:px-12 lg:py-40"
    >
      <div className="mx-auto max-w-[1440px]">
        <RevealOnScroll>
          <SectionLabel index="03" label="Offres" />
        </RevealOnScroll>

        <RevealOnScroll delay={0.05}>
          <h2 className="mt-8 max-w-2xl text-3xl font-medium tracking-tight text-paper sm:text-4xl lg:text-5xl">
            Trois façons de démarrer
          </h2>
        </RevealOnScroll>

        <div className="mt-16 grid gap-6 lg:mt-20 lg:grid-cols-3 lg:items-stretch lg:gap-8">
          {offers.map((offer, i) => (
            <RevealOnScroll key={offer.id} delay={i * 0.08} className="h-full">
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
                  <span className="text-3xl font-medium text-paper sm:text-4xl">
                    {offer.price}
                  </span>
                </div>
                {offer.price_note && (
                  <span className="mt-1 font-display text-[10px] uppercase tracking-[0.25em] text-mist-dim">
                    {offer.price_note}
                  </span>
                )}

                <p className="mt-6 text-sm text-mist sm:text-base">
                  {offer.tagline}
                </p>

                <ul className="mt-8 flex-1 space-y-3">
                  {offer.features.map((feature) => (
                    <li
                      key={feature}
                      className="flex items-start gap-3 text-sm text-paper-dim/90"
                    >
                      <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-mist" />
                      {feature}
                    </li>
                  ))}
                </ul>

                <MagneticButton
                  as="a"
                  href="#contact"
                  className={`mt-10 inline-flex h-14 w-full items-center justify-center px-6 font-display text-xs uppercase tracking-[0.25em] transition-colors ${
                    offer.featured
                      ? "bg-paper text-ink"
                      : "border border-line-strong text-paper hover:border-paper"
                  }`}
                >
                  {offer.cta}
                </MagneticButton>
              </article>
            </RevealOnScroll>
          ))}
        </div>
      </div>
    </section>
  );
}
