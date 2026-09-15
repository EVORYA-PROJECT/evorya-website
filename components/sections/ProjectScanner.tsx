"use client";

import { useEffect, useRef, useState } from "react";
import { useInView } from "motion/react";
import RevealOnScroll from "@/components/ui/RevealOnScroll";
import SectionLabel from "@/components/ui/SectionLabel";
import MagneticButton from "@/components/ui/MagneticButton";
import ProjectMatcher from "@/components/sections/ProjectMatcher";
import type { OfferRow, ScannerContent } from "@/lib/cms/types";

// Mise en scène de la méthode Evorya — pas une analyse réelle du navigateur
// ou du projet du visiteur (voir CLAUDE.md / consignes de contenu : aucune
// fausse promesse "temps réel", "IA" ou "sécurité").
const STEP_INTERVAL_MS = 380;

export default function ProjectScanner({
  content,
  offers,
}: {
  content: ScannerContent;
  offers: OfferRow[];
}) {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const inView = useInView(containerRef, { once: true, margin: "-15% 0px" });
  const [activeCount, setActiveCount] = useState(0);
  const steps = content.steps;
  const total = steps.length;

  useEffect(() => {
    if (!inView) return;
    const timers = steps.map((_, i) =>
      window.setTimeout(() => setActiveCount((c) => Math.max(c, i + 1)), 300 + i * STEP_INTERVAL_MS),
    );
    return () => timers.forEach((t) => window.clearTimeout(t));
  }, [inView, steps]);

  const scanPercent = Math.round((activeCount / total) * 100);

  return (
    <section
      id="project-scanner"
      className="relative border-t border-line bg-ink px-6 py-24 sm:px-8 lg:px-12 lg:py-32"
    >
      <div className="mx-auto max-w-[1440px]">
        <RevealOnScroll>
          <SectionLabel index="10" label="Project Scanner" />
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

        <div ref={containerRef} className="mt-12 grid gap-10 lg:mt-16 lg:grid-cols-12 lg:gap-8">
          {/* Séquence des 5 dimensions — le texte reste toujours lisible ;
              seule l'intensité/la ligne de progression dépend du JS. */}
          <RevealOnScroll delay={0.1} className="lg:col-span-7">
            <div className="border-t border-line">
              {steps.map((step, i) => {
                const isActive = i < activeCount;
                return (
                  <div key={step.index} className="border-b border-line py-5 sm:py-6">
                    <div className="flex items-baseline gap-4">
                      <span
                        className={`font-display text-sm tracking-[0.2em] transition-colors duration-500 ${
                          isActive ? "text-paper" : "text-mist-dim"
                        }`}
                      >
                        {step.index}
                      </span>
                      <h3
                        className={`font-display text-base uppercase tracking-[0.1em] transition-colors duration-500 sm:text-lg ${
                          isActive ? "text-paper" : "text-mist"
                        }`}
                      >
                        {step.title}
                      </h3>
                    </div>
                    <p className="mt-2 max-w-md text-sm leading-relaxed text-mist">
                      {step.description}
                    </p>
                    <div className="mt-3 h-px w-full bg-line">
                      <div
                        className={`h-full bg-paper transition-all duration-700 ease-out ${
                          isActive ? "w-full" : "w-0"
                        }`}
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          </RevealOnScroll>

          {/* État du scan + conclusion — toujours visible dans le DOM, jamais
              masqué derrière une animation qui pourrait ne pas se déclencher. */}
          <RevealOnScroll delay={0.15} className="lg:col-span-5">
            <div className="border border-line-strong p-7 sm:p-8 lg:sticky lg:top-28">
              <span className="font-display text-xs uppercase tracking-[0.3em] text-mist-dim">
                Scan
              </span>
              <div className="mt-4 flex items-end gap-3 font-display text-paper">
                <span className="text-4xl leading-none">{String(activeCount).padStart(2, "0")}</span>
                <span className="pb-1 text-lg text-mist-dim">/ {String(total).padStart(2, "0")}</span>
              </div>
              <div className="mt-4 h-1.5 w-full overflow-hidden border border-line-strong">
                <div
                  className="h-full bg-paper transition-[width] duration-500 ease-out"
                  style={{ width: `${scanPercent}%` }}
                />
              </div>
              <p className="mt-3 font-display text-[11px] uppercase tracking-[0.2em] text-mist-dim">
                {activeCount >= total ? "Scan complete" : `Scan ${scanPercent}%`}
              </p>

              <div className="mt-8 border-t border-line pt-8">
                <h3 className="font-display text-2xl uppercase tracking-[0.05em] text-paper">
                  {content.finalHeading}
                </h3>
                <p className="mt-3 text-sm text-mist">{content.finalTagline}</p>
                <MagneticButton
                  as="a"
                  href="#contact"
                  className="mt-6 inline-flex h-14 w-full items-center justify-center bg-paper px-8 font-display text-xs uppercase tracking-[0.25em] text-ink sm:w-auto"
                >
                  {content.ctaLabel}
                </MagneticButton>
              </div>
            </div>
          </RevealOnScroll>
        </div>

        {/* Transition vers le Project Matcher : volontairement séparée et
            déclenchée par l'utilisateur, jamais affichée d'office. */}
        <RevealOnScroll delay={0.1} className="mt-10 lg:mt-12">
          <ProjectMatcher offers={offers} heading={content.matcherHeading} ctaLabel={content.matcherCta} />
        </RevealOnScroll>
      </div>
    </section>
  );
}
