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
          <SectionLabel index="06" label="Processus" />
        </RevealOnScroll>

        <RevealOnScroll delay={0.05}>
          <h2 className="mt-8 max-w-2xl text-3xl font-medium tracking-tight text-paper sm:text-4xl lg:text-5xl">
            {content.heading}
          </h2>
        </RevealOnScroll>

        <div className="relative mt-16 lg:mt-20">
          <div
            className="absolute left-0 right-0 top-6 hidden h-px bg-line lg:block"
            aria-hidden="true"
          />
          <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-4 lg:gap-8">
            {content.steps.map((step, i) => (
              <RevealOnScroll key={step.index} delay={i * 0.08}>
                <div className="relative pl-0 lg:pt-16">
                  <span className="absolute left-0 top-0 hidden h-3 w-3 -translate-y-1/2 rounded-full border border-paper bg-ink lg:top-6 lg:block" />
                  <span className="font-display text-sm tracking-[0.2em] text-mist-dim">
                    {step.index}
                  </span>
                  <h3 className="mt-4 text-xl font-medium text-paper sm:text-2xl">
                    {step.title}
                  </h3>
                  <p className="mt-3 max-w-xs text-sm leading-relaxed text-mist sm:text-base">
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
