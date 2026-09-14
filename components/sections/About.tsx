import RevealOnScroll from "@/components/ui/RevealOnScroll";
import SectionLabel from "@/components/ui/SectionLabel";
import CornerFrame from "@/components/ui/CornerFrame";
import type { StudioContent } from "@/lib/cms/types";

export default function About({ content }: { content: StudioContent }) {
  return (
    <section id="apropos" className="relative border-t border-line bg-ink px-6 py-28 sm:px-8 lg:px-12 lg:py-40">
      <div className="mx-auto max-w-[1440px]">
        <RevealOnScroll>
          <SectionLabel index="01" label="Studio" />
        </RevealOnScroll>

        <div className="mt-10 grid gap-12 lg:mt-16 lg:grid-cols-12 lg:gap-8">
          <RevealOnScroll className="lg:col-span-7">
            <p className="text-2xl leading-tight text-paper sm:text-3xl lg:text-[2.6rem] lg:leading-[1.15]">
              {content.lead}
            </p>
          </RevealOnScroll>

          <RevealOnScroll delay={0.1} className="flex flex-col justify-between gap-10 lg:col-span-5">
            <p className="text-base text-mist sm:text-lg">{content.body}</p>

            <CornerFrame className="w-fit px-5 py-4">
              <span className="font-display text-xs uppercase tracking-[0.3em] text-mist">
                {content.tag}
              </span>
            </CornerFrame>
          </RevealOnScroll>
        </div>
      </div>
    </section>
  );
}
