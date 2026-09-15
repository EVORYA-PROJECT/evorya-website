import RevealOnScroll from "@/components/ui/RevealOnScroll";
import SectionLabel from "@/components/ui/SectionLabel";
import type { ProcessContent } from "@/lib/cms/types";

export default function Process({ content }: { content: ProcessContent }) {
  return (
    <section
      id="processus"
      className="relative border-t border-line bg-ink px-6 py-28 sm:px-8 lg:px-12 lg:py-40"
    >
      <div className="mx-auto max-w-[1440px]">
        <RevealOnScroll>
          <SectionLabel index="07" label="Processus" />
        </RevealOnScroll>

        <RevealOnScroll delay={0.05}>
          <h2 className="mt-8 max-w-2xl text-3xl font-medium tracking-tight text-paper sm:text-4xl lg:text-5xl">
            {content.heading}
          </h2>
        </RevealOnScroll>

        {/* Mobile/tablette (< lg) : timeline verticale compacte. */}
        <div className="relative mt-14 flex flex-col lg:hidden">
          <div className="absolute bottom-2 left-[5px] top-2 w-px bg-line" aria-hidden="true" />
          {content.steps.map((step, i) => (
            <RevealOnScroll key={step.index} delay={i * 0.06}>
              <div className="relative flex gap-5 pb-9 pl-0 last:pb-0">
                <span className="relative z-10 mt-1.5 h-[11px] w-[11px] shrink-0 rounded-full border border-paper bg-ink" />
                <div className="-mt-1">
                  <span className="font-display text-xs tracking-[0.2em] text-mist-dim">
                    {step.index}
                  </span>
                  <h3 className="mt-2 text-lg font-medium text-paper">{step.title}</h3>
                  <p className="mt-2 max-w-sm text-sm leading-relaxed text-mist">
                    {step.description}
                  </p>
                </div>
              </div>
            </RevealOnScroll>
          ))}
        </div>

        {/* Desktop (>= lg) : composition existante, inchangée. */}
        <div className="relative mt-20 hidden lg:block">
          <div className="absolute left-0 right-0 top-6 h-px bg-line" aria-hidden="true" />
          <div className="grid grid-cols-4 gap-8">
            {content.steps.map((step, i) => (
              <RevealOnScroll key={step.index} delay={i * 0.08}>
                <div className="relative pt-16">
                  <span className="absolute left-0 top-6 block h-3 w-3 -translate-y-1/2 rounded-full border border-paper bg-ink" />
                  <span className="font-display text-sm tracking-[0.2em] text-mist-dim">
                    {step.index}
                  </span>
                  <h3 className="mt-4 text-2xl font-medium text-paper">{step.title}</h3>
                  <p className="mt-3 max-w-xs text-base leading-relaxed text-mist">
                    {step.description}
                  </p>
                </div>
              </RevealOnScroll>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
