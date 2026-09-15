import RevealOnScroll from "@/components/ui/RevealOnScroll";
import SectionLabel from "@/components/ui/SectionLabel";
import type { TransparencyContent } from "@/lib/cms/types";

export default function Transparency({ content }: { content: TransparencyContent }) {
  return (
    <section
      id="transparence"
      className="relative overflow-hidden border-t border-line bg-ink px-6 py-24 sm:px-8 lg:px-12 lg:py-32"
    >
      <div
        aria-hidden="true"
        className="bg-grid pointer-events-none absolute inset-0 opacity-30"
      />

      <div className="relative mx-auto max-w-[1440px]">
        <RevealOnScroll>
          <SectionLabel index="05" label="Transparence" />
        </RevealOnScroll>

        <div className="mt-8 flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <RevealOnScroll delay={0.05}>
            <h2 className="max-w-xl text-3xl font-medium tracking-tight text-paper sm:text-4xl lg:text-5xl">
              {content.heading}
            </h2>
          </RevealOnScroll>
          <RevealOnScroll delay={0.1}>
            <p className="max-w-sm text-sm text-mist sm:text-base">{content.subheading}</p>
          </RevealOnScroll>
        </div>

        {/* Ligne de statut / progression : 01 → 04 */}
        <RevealOnScroll delay={0.15} className="mt-16 hidden lg:block">
          <div className="relative h-px w-full bg-line">
            <div className="absolute inset-y-0 left-0 flex w-full justify-between">
              {content.points.map((point, i) => (
                <span
                  key={point.index}
                  style={{ transitionDelay: `${i * 120}ms` }}
                  className="relative -top-[3.5px] h-[7px] w-[7px] rounded-full border border-paper bg-ink"
                />
              ))}
            </div>
          </div>
        </RevealOnScroll>

        <div className="mt-10 grid grid-cols-1 gap-px overflow-hidden border border-line bg-line sm:grid-cols-2 lg:mt-6 lg:grid-cols-4">
          {content.points.map((point, i) => (
            <RevealOnScroll key={point.index} delay={0.05 * i} className="h-full">
              <div className="group relative flex h-full flex-col justify-between bg-ink p-7 transition-colors duration-500 hover:bg-paper/[0.03] sm:p-8">
                <div>
                  <span className="font-display text-2xl text-mist-dim transition-colors duration-500 group-hover:text-paper">
                    {point.index}
                  </span>
                  <h3 className="mt-4 font-display text-sm uppercase tracking-[0.15em] text-paper">
                    {point.title}
                  </h3>
                </div>
                <p className="mt-6 text-sm leading-relaxed text-mist sm:text-base">
                  {point.description}
                </p>
                <span className="pointer-events-none absolute bottom-0 left-0 h-px w-0 bg-paper transition-all duration-500 group-hover:w-full" />
              </div>
            </RevealOnScroll>
          ))}
        </div>

        <RevealOnScroll delay={0.3}>
          <p className="mt-10 max-w-2xl border-l border-line-strong pl-5 text-sm font-medium leading-relaxed text-paper-dim sm:text-base">
            {content.footnote}
          </p>
        </RevealOnScroll>
      </div>
    </section>
  );
}
