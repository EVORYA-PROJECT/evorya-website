import RevealOnScroll from "@/components/ui/RevealOnScroll";
import SectionLabel from "@/components/ui/SectionLabel";
import type { WhyContent } from "@/lib/cms/types";

export default function WhyEvorya({ content }: { content: WhyContent }) {
  return (
    <section
      id="pourquoi-evorya"
      className="relative border-t border-line bg-ink px-6 py-24 sm:px-8 lg:px-12 lg:py-36"
    >
      <div className="mx-auto max-w-[1440px]">
        <RevealOnScroll>
          <SectionLabel index="03" label="Pourquoi Evorya" />
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

        <div className="mt-14 border-t border-line lg:mt-16">
          {content.points.map((point, i) => (
            <RevealOnScroll key={point.index} delay={(i % 3) * 0.05}>
              <div className="group grid grid-cols-1 gap-3 border-b border-line py-6 transition-colors sm:py-7 lg:grid-cols-12 lg:items-baseline lg:gap-8 lg:py-8">
                <div className="flex items-baseline gap-4 lg:col-span-5">
                  <span className="font-display text-2xl text-mist-dim transition-colors duration-500 group-hover:text-paper lg:text-3xl">
                    {point.index}
                  </span>
                  <h3 className="text-lg font-medium text-paper sm:text-xl">{point.title}</h3>
                </div>
                <p className="text-sm leading-relaxed text-mist sm:text-base lg:col-span-7">
                  {point.description}
                </p>
              </div>
            </RevealOnScroll>
          ))}
        </div>
      </div>
    </section>
  );
}
