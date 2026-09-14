import RevealOnScroll from "@/components/ui/RevealOnScroll";
import SectionLabel from "@/components/ui/SectionLabel";
import type { ServicesContent } from "@/lib/cms/types";

export default function Services({ content }: { content: ServicesContent }) {
  return (
    <section
      id="services"
      className="relative border-t border-line bg-ink px-6 py-28 sm:px-8 lg:px-12 lg:py-40"
    >
      <div className="mx-auto max-w-[1440px]">
        <RevealOnScroll>
          <SectionLabel index="02" label="Services" />
        </RevealOnScroll>

        <RevealOnScroll delay={0.05}>
          <h2 className="mt-8 max-w-2xl text-3xl font-medium tracking-tight text-paper sm:text-4xl lg:text-5xl">
            {content.heading}
          </h2>
        </RevealOnScroll>

        <div className="mt-16 grid grid-cols-1 gap-px border-y border-line bg-line sm:grid-cols-2 lg:mt-20 lg:grid-cols-3">
          {content.items.map((service, i) => (
            <RevealOnScroll key={service.index} delay={(i % 3) * 0.06} className="h-full">
              <article className="group relative h-full bg-ink px-6 py-10 transition-colors duration-500 hover:bg-paper/[0.03] sm:px-8">
                <span className="font-display text-sm tracking-[0.2em] text-mist-dim transition-colors duration-500 group-hover:text-paper">
                  {service.index}
                </span>
                <h3 className="mt-6 text-xl font-medium text-paper sm:text-2xl">
                  {service.title}
                </h3>
                <p className="mt-4 max-w-xs text-sm leading-relaxed text-mist sm:text-base">
                  {service.description}
                </p>
                <span className="pointer-events-none absolute bottom-0 left-0 h-px w-0 bg-paper transition-all duration-500 group-hover:w-full" />
              </article>
            </RevealOnScroll>
          ))}
        </div>
      </div>
    </section>
  );
}
