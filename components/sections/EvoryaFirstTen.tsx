"use client";

import { useEffect, useRef, useState } from "react";
import { animate, useInView } from "motion/react";
import RevealOnScroll from "@/components/ui/RevealOnScroll";
import SectionLabel from "@/components/ui/SectionLabel";
import type { First10Content } from "@/lib/cms/types";

export default function EvoryaFirstTen({ content }: { content: First10Content }) {
  const counterRef = useRef<HTMLSpanElement | null>(null);
  const inView = useInView(counterRef, { once: true, margin: "-20% 0px" });
  const [count, setCount] = useState(0);
  const target = content.current;

  useEffect(() => {
    if (!inView) return;
    const controls = animate(0, target, {
      duration: 1.1,
      ease: [0.16, 1, 0.3, 1],
      onUpdate: (value) => setCount(Math.round(value)),
    });
    return () => controls.stop();
  }, [inView, target]);

  const positions = Array.from({ length: content.total }, (_, i) => i + 1);
  const isClosed = content.status === "closed";

  return (
    <section
      id="evorya-first-10"
      className="relative overflow-hidden border-t border-line bg-ink px-6 py-28 sm:px-8 lg:px-12 lg:py-40"
    >
      <div
        aria-hidden="true"
        className="bg-grid pointer-events-none absolute inset-0 opacity-40"
      />

      <div className="relative mx-auto max-w-[1440px]">
        <RevealOnScroll>
          <SectionLabel index="05" label="Evorya First 10" />
        </RevealOnScroll>

        <div className="mt-10 grid gap-12 lg:grid-cols-12 lg:gap-8">
          <div className="lg:col-span-6">
            <RevealOnScroll delay={0.05}>
              <div className="flex flex-wrap items-center gap-4">
                <h2 className="font-display text-3xl uppercase tracking-tight text-paper sm:text-4xl lg:text-5xl">
                  {content.title}
                </h2>
                <span
                  className={`inline-flex items-center border px-3 py-1 font-display text-[10px] uppercase tracking-[0.3em] ${
                    isClosed
                      ? "border-line-strong text-mist-dim"
                      : "border-paper text-paper"
                  }`}
                >
                  {isClosed ? "Programme complet" : "Programme ouvert"}
                </span>
              </div>
            </RevealOnScroll>

            <RevealOnScroll delay={0.1}>
              <p className="mt-6 max-w-md text-base text-mist sm:text-lg">{content.text1}</p>
              <p className="mt-4 max-w-md text-base text-mist sm:text-lg">{content.text2}</p>
            </RevealOnScroll>

            <RevealOnScroll delay={0.15}>
              <div className="mt-8 border-t border-line pt-6">
                <p className="max-w-md text-sm leading-relaxed text-mist-dim">
                  {content.feesNote1}
                </p>
                <p className="mt-3 max-w-md text-sm leading-relaxed text-mist-dim">
                  {content.feesNote2}
                </p>
              </div>
            </RevealOnScroll>
          </div>

          <RevealOnScroll delay={0.15} className="flex flex-col justify-center lg:col-span-6">
            <div className="flex items-end gap-4 font-display text-paper">
              <span ref={counterRef} className="text-7xl leading-none sm:text-8xl lg:text-9xl">
                {count}
              </span>
              <span className="pb-2 text-2xl text-mist-dim sm:text-3xl">
                / {content.total}
              </span>
            </div>

            <div className="mt-10 grid grid-cols-5 gap-2 sm:grid-cols-10">
              {positions.map((position) => {
                const filled = position <= content.current;
                return (
                  <div
                    key={position}
                    className={`flex aspect-square items-center justify-center border font-display text-[10px] transition-colors duration-500 ${
                      filled
                        ? "border-paper bg-paper text-ink"
                        : "border-line-strong text-mist-dim"
                    }`}
                  >
                    {String(position).padStart(2, "0")}
                  </div>
                );
              })}
            </div>
          </RevealOnScroll>
        </div>
      </div>
    </section>
  );
}
