"use client";

import { useState } from "react";
import RevealOnScroll from "@/components/ui/RevealOnScroll";
import SectionLabel from "@/components/ui/SectionLabel";
import AccordionItem from "@/components/ui/Accordion";
import type { FaqContent } from "@/lib/cms/types";

export default function Faq({ content }: { content: FaqContent }) {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section
      id="faq"
      className="relative border-t border-line bg-ink px-6 py-24 sm:px-8 lg:px-12 lg:py-32"
    >
      <div className="mx-auto max-w-[1440px]">
        <RevealOnScroll>
          <SectionLabel index="09" label="FAQ" />
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

        <RevealOnScroll delay={0.1} className="mt-12 lg:mt-16">
          <div className="relative z-10 mx-auto max-w-3xl border-t border-line">
            {content.items.map((item, i) => (
              <AccordionItem
                key={item.question}
                index={String(i + 1).padStart(2, "0")}
                title={item.question}
                open={openIndex === i}
                onToggle={() => setOpenIndex((prev) => (prev === i ? null : i))}
              >
                {item.answer}
              </AccordionItem>
            ))}
          </div>
        </RevealOnScroll>
      </div>
    </section>
  );
}
