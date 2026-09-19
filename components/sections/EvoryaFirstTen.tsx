"use client";

import { useEffect, useRef, useState } from "react";
import { animate, useInView } from "motion/react";
import RevealOnScroll from "@/components/ui/RevealOnScroll";
import SectionLabel from "@/components/ui/SectionLabel";
import AccordionItem from "@/components/ui/Accordion";
import MagneticButton from "@/components/ui/MagneticButton";
import type { First10Content } from "@/lib/cms/types";

function StatusBadge({ isClosed, className }: { isClosed: boolean; className?: string }) {
  return (
    <span
      className={`inline-flex items-center gap-1.5 border px-2.5 py-1 font-display text-[9px] uppercase tracking-[0.25em] ${
        isClosed ? "border-line-strong text-mist-dim" : "border-line-strong text-mist"
      } ${className ?? ""}`}
    >
      <span className={`h-1.5 w-1.5 rounded-full ${isClosed ? "bg-mist-dim" : "bg-paper"}`} />
      {isClosed ? "Programme complet" : "Programme ouvert"}
    </span>
  );
}

function ProgressBar({ current, total }: { current: number; total: number }) {
  return (
    <div
      role="progressbar"
      aria-valuemin={0}
      aria-valuemax={total}
      aria-valuenow={current}
      aria-label="Places attribuées sur Evorya First 10"
      className="h-1.5 w-full overflow-hidden border border-line-strong"
    >
      <div
        className="h-full bg-paper transition-[width] duration-700 ease-out"
        style={{ width: `${(current / total) * 100}%` }}
      />
    </div>
  );
}

export default function EvoryaFirstTen({ content }: { content: First10Content }) {
  const contentRef = useRef<HTMLDivElement | null>(null);
  const inView = useInView(contentRef, { once: true, margin: "-20% 0px" });
  const [count, setCount] = useState(0);
  const [feesOpen, setFeesOpen] = useState(false);
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
  const remaining = Math.max(0, content.total - content.current);
  const titleWords = content.title.split(" ");
  const titleFirstLine = titleWords[0] ?? content.title;
  const titleSecondLine = titleWords.slice(1).join(" ");

  return (
    <section
      id="evorya-first-10"
      className="relative overflow-hidden border-t border-line bg-ink px-6 py-20 sm:px-8 lg:px-12 lg:py-40"
    >
      <div
        aria-hidden="true"
        className="bg-grid pointer-events-none absolute inset-0 opacity-40"
      />

      <div ref={contentRef} className="relative mx-auto max-w-[1440px]">
        <RevealOnScroll>
          <SectionLabel index="07" label="Evorya First 10" />
        </RevealOnScroll>

        {/* Mobile/tablette (< lg) : hiérarchie compacte, information
            secondaire repliée, compteur réduit — voir le bloc desktop
            séparé plus bas pour la composition >= lg, inchangée. */}
        <div className="mt-8 lg:hidden">
          <RevealOnScroll delay={0.05}>
            <h2 className="flex flex-col font-display text-4xl uppercase leading-[1.05] tracking-tight text-paper">
              <span>{titleFirstLine}</span>
              {titleSecondLine && <span>{titleSecondLine}</span>}
            </h2>
            <StatusBadge isClosed={isClosed} className="mt-4" />
          </RevealOnScroll>

          <RevealOnScroll delay={0.1}>
            <p className="mt-6 text-sm leading-relaxed text-mist">{content.text1}</p>
            <p className="mt-3 text-base font-medium text-paper">{content.text2}</p>
          </RevealOnScroll>

          <RevealOnScroll delay={0.12} className="relative z-10 mt-6 border-t border-line">
            <AccordionItem
              title="Voir les conditions du programme"
              open={feesOpen}
              onToggle={() => setFeesOpen((v) => !v)}
            >
              <p>{content.feesNote1}</p>
              <p className="mt-3">{content.feesNote2}</p>
            </AccordionItem>
          </RevealOnScroll>

          <RevealOnScroll delay={0.15} className="mt-8 border-t border-line pt-8">
            <div className="flex items-end justify-between gap-4">
              <div className="flex items-baseline gap-2 font-display text-paper">
                <span className="text-4xl leading-none">{count}</span>
                <span className="text-lg text-mist-dim">/ {content.total}</span>
              </div>
              <span className="max-w-[8rem] text-right font-display text-[10px] uppercase leading-relaxed tracking-[0.2em] text-mist-dim">
                Projets sélectionnés
              </span>
            </div>

            <div className="mt-4">
              <ProgressBar current={content.current} total={content.total} />
              <p className="mt-3 font-display text-[11px] uppercase tracking-[0.2em] text-mist-dim">
                {remaining} place{remaining === 1 ? "" : "s"} restante{remaining === 1 ? "" : "s"}
              </p>
            </div>
          </RevealOnScroll>

          <RevealOnScroll delay={0.18} className="mt-8">
            <MagneticButton
              as="a"
              href="#contact"
              className="inline-flex h-14 w-full items-center justify-center bg-paper px-8 font-display text-xs uppercase tracking-[0.25em] text-ink"
            >
              Démarrer un projet
            </MagneticButton>
          </RevealOnScroll>
        </div>

        {/* Desktop/tablette large (>= lg) : composition existante, inchangée. */}
        <div className="mt-10 hidden lg:grid lg:grid-cols-12 lg:gap-8">
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
              <span className="text-9xl leading-none">{count}</span>
              <span className="pb-2 text-3xl text-mist-dim">/ {content.total}</span>
            </div>

            <div className="mt-10 grid grid-cols-10 gap-2">
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
