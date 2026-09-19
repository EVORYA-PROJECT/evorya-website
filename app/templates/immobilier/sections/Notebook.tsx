"use client";

import { useEffect, useRef, useState } from "react";
import MobileDisclosure from "@/components/ui/MobileDisclosure";
import { AnimatePresence, motion, useInView } from "motion/react";
import { NOTEBOOK_ARCH_PHOTO, NOTEBOOK_PHOTO, NOTEBOOK_STEPS, PROPERTIES } from "../data";
import { ParallaxPhoto, PropertyPhoto, PropertyVisual } from "../visuals";
import {
  CountUp,
  DrawnPaths,
  EASE,
  Reveal,
  RuleDraw,
  SectionNumber,
  useDisplay,
} from "../ui";

/** Photo d'appoint du riad : basse définition (390 × 306), donc petit format. */
const PATIO_PHOTO = PROPERTIES.find((p) => p.id === "riad-nassim")?.photoAccent;
/** Terrasse : la même photographie que le bien mis en avant, recadrée en hauteur. */
const TERRACE_PHOTO = PROPERTIES.find((p) => p.id === "villa-ombriere")?.photo;

const RELEVES = [
  { label: "Orientation", value: "Relevée à la boussole" },
  { label: "Lumière", value: "Deux passages, matin et soir" },
  { label: "Support", value: "Plan coté + photographies" },
];

const PANEL = {
  initial: { opacity: 0 },
  animate: { opacity: 1, transition: { duration: 0.4, ease: EASE } },
  exit: { opacity: 0, transition: { duration: 0.2, ease: EASE } },
} as const;

/**
 * Une étape du carnet. `onActive` se déclenche quand le bloc traverse la
 * bande centrale du viewport (marge négative haut/bas) — c'est le mécanisme
 * qui pilote la photo collante, sans écouteur de scroll manuel.
 */
function StepRow({
  step,
  isActive,
  onActive,
}: {
  step: (typeof NOTEBOOK_STEPS)[number];
  isActive: boolean;
  onActive: () => void;
}) {
  const display = useDisplay();
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { margin: "-42% 0px -42% 0px" });

  useEffect(() => {
    if (inView) onActive();
  }, [inView, onActive]);

  return (
    <div
      ref={ref}
      className={`border-t border-[#DCD7CD] py-10 transition-opacity duration-300 first:border-t-0 lg:flex lg:min-h-[52vh] lg:items-center lg:border-t-0 lg:py-0 ${
        isActive ? "opacity-100" : "lg:opacity-45"
      }`}
    >
      <div>
        <span className="text-[0.75rem] font-medium tracking-[0.2em] text-[#8A6A3B] tabular-nums">
          Étape {step.index}
        </span>
        <h3 className={`${display} mt-3 text-2xl font-semibold text-[#14181D] sm:text-[1.7rem]`}>
          {step.title}
        </h3>
        <MobileDisclosure label="Lire cette étape">
        <p className="mt-3 max-w-md text-[0.98rem] leading-relaxed text-[#3A444F]">{step.note}</p>
        <p className="mt-4 flex items-baseline gap-2 border-t border-[#DCD7CD] pt-3 text-[0.82rem] text-[#55606C]">
          <span aria-hidden="true" className="h-px w-4 bg-[#8A6A3B]" />
          {step.measure}
        </p>
        {/* La photo, visible ici uniquement sur mobile : pas de collant, pas
            de dépendance au scroll pour lire l'étape sur petit écran. */}
        <div className="mt-6 lg:hidden">
          <PropertyPhoto
            photo={step.photo}
            reveal
            sizes="92vw"
            className="h-[220px] sm:h-[280px]"
          />
        </div>
        </MobileDisclosure>
      </div>
    </div>
  );
}

/**
 * « Carnet de visite » — la respiration photographique de la page.
 *
 * Trois registres se répondent volontairement :
 *   PHOTOGRAPHIE (ce qui a été vu) · DESSIN (ce qui a été relevé) ·
 *   DONNÉE (ce qui a été mesuré).
 *
 * La section se referme sur une narration en cinq étapes : à gauche le texte
 * défile normalement, à droite une même colonne reste collante et change de
 * photographie — repérage piloté par `useInView` (bande centrale), jamais
 * par un écouteur de scroll global. Sur mobile, aucune colonne collante :
 * chaque étape porte sa propre photo, en flux normal.
 */
export default function Notebook() {
  const display = useDisplay();
  const [activeStep, setActiveStep] = useState(0);
  const current = NOTEBOOK_STEPS[activeStep];

  return (
    <section
      id="carnet"
      className="scroll-mt-28 border-b border-[#DCD7CD] bg-[#FBFAF8] lg:scroll-mt-32"
    >
      <div className="mx-auto max-w-[1400px] px-5 pt-16 pb-16 sm:px-8 lg:px-10 lg:pt-24 lg:pb-24">
        <div className="lg:flex lg:items-end lg:justify-between lg:gap-12">
          <div>
            <Reveal>
              <SectionNumber value="03" label="Carnet de visite" />
            </Reveal>
            <Reveal delay={0.05}>
              <h2
                className={`${display} mt-8 max-w-2xl text-[2rem] leading-[1.08] font-semibold tracking-[-0.02em] text-[#14181D] sm:text-[2.6rem] lg:text-[3rem]`}
              >
                Ce que l&rsquo;agence rapporte d&rsquo;une visite.
              </h2>
            </Reveal>
          </div>
          <Reveal delay={0.1}>
            <p className="mt-5 max-w-sm text-[1rem] leading-relaxed text-[#3A444F] lg:mt-0 lg:pb-2">
              Des photographies, un plan coté, deux ou trois mesures qui changent
              tout. Le carnet reste le même depuis la première visite de
              l&rsquo;agence.
            </p>
          </Reveal>
        </div>

        {/* Grande image : le seul moment quasi pleine largeur de la page. */}
        <div className="relative mt-12 lg:mt-16">
          <Reveal y={28}>
            <ParallaxPhoto
              photo={NOTEBOOK_PHOTO}
              sizes="(min-width: 1440px) 1320px, 92vw"
              range={9}
              imageClassName="saturate-[0.5] contrast-[1.05]"
              className="h-[300px] sm:h-[440px] lg:h-[620px]"
            >
              <span className="pointer-events-none absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-[#14181D]/55 to-transparent" />
              <span className="pointer-events-none absolute bottom-6 left-6 max-w-sm sm:bottom-8 sm:left-8">
                <span className="block text-[0.72rem] font-medium tracking-[0.24em] uppercase text-white/75">
                  Relevé sur site
                </span>
                <span
                  className={`${display} mt-2 block text-[1.35rem] leading-snug font-semibold text-white sm:text-[1.7rem]`}
                >
                  Une circulation se juge à sa lumière rasante.
                </span>
              </span>
            </ParallaxPhoto>
          </Reveal>

          {/* Fiche de relevé : mord sur l'angle de l'image en desktop, se pose
              dessous en mobile. Même chevauchement que dans le Hero. */}
          <Reveal delay={0.12} y={16}>
            <div className="relative z-10 border border-[#DCD7CD] bg-white p-6 sm:p-7 lg:absolute lg:right-0 lg:bottom-0 lg:w-[22rem] lg:translate-x-6 lg:translate-y-10 lg:shadow-[0_28px_70px_-46px_rgba(20,24,29,0.65)]">
              <p className="text-[0.72rem] font-medium tracking-[0.24em] uppercase text-[#55606C]">
                Méthode de relevé
              </p>
              <RuleDraw className="mt-4 w-full" />
              <dl className="mt-4 space-y-3">
                {RELEVES.map((line) => (
                  <div
                    key={line.label}
                    className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-0.5"
                  >
                    <dt className="text-[0.85rem] text-[#55606C]">{line.label}</dt>
                    <dd className="text-[0.9rem] font-medium text-[#14181D]">{line.value}</dd>
                  </div>
                ))}
              </dl>
              <p className="mt-5 border-t border-[#DCD7CD] pt-4 text-[0.78rem] leading-relaxed text-[#55606C]">
                Photographies d&rsquo;illustration : elles disent la matière et la
                lumière, jamais un bien en particulier.
              </p>
            </div>
          </Reveal>
        </div>

        {/* Diptyque de matière : photo haute + dessin décalé, avant la
            narration en cinq étapes. Deux hauteurs différentes, jamais un
            alignement parfait. */}
        <MobileDisclosure label="Voir les relevés photographiques">
        <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:mt-24 lg:grid-cols-12 lg:gap-6">
          {TERRACE_PHOTO && (
            <Reveal className="sm:col-span-2 lg:col-span-5" y={24}>
              <figure>
                <PropertyPhoto
                  photo={TERRACE_PHOTO}
                  reveal
                  sizes="(min-width: 1024px) 550px, (min-width: 640px) 92vw, 92vw"
                  className="h-[260px] sm:h-[320px] lg:h-[400px]"
                />
                <figcaption className="mt-3 flex items-baseline justify-between gap-3 border-t border-[#DCD7CD] pt-3 text-[0.72rem] tracking-[0.12em] uppercase text-[#55606C]">
                  <span>Ambiance — terrasse et espace extérieur</span>
                  <span aria-hidden="true" className="text-[#8A6A3B] tabular-nums">
                    R.02
                  </span>
                </figcaption>
              </figure>
            </Reveal>
          )}

          <Reveal className="lg:col-span-3 lg:pt-12" delay={0.06} y={24}>
            <figure>
              <PropertyPhoto
                photo={NOTEBOOK_ARCH_PHOTO}
                sizes="(min-width: 1024px) 330px, (min-width: 640px) 46vw, 92vw"
                reveal
                marks={false}
                className="h-[220px] sm:h-[250px] lg:h-[300px]"
                imageClassName="object-[50%_72%]"
              />
              <figcaption className="mt-3 flex items-baseline justify-between gap-3 border-t border-[#DCD7CD] pt-3 text-[0.72rem] tracking-[0.12em] uppercase text-[#55606C]">
                <span>{NOTEBOOK_ARCH_PHOTO.caption}</span>
                <span aria-hidden="true" className="text-[#8A6A3B] tabular-nums">
                  R.03
                </span>
              </figcaption>
            </figure>
          </Reveal>

          <div className="lg:col-span-4">
            {PATIO_PHOTO && (
              <Reveal delay={0.12} y={24}>
                <figure>
                  <PropertyPhoto
                    photo={PATIO_PHOTO}
                    reveal
                    marks={false}
                    sizes="(min-width: 1024px) 430px, (min-width: 640px) 46vw, 92vw"
                    className="h-[180px] sm:h-[200px] lg:h-[190px]"
                  />
                  <figcaption className="mt-3 flex items-baseline justify-between gap-3 border-t border-[#DCD7CD] pt-3 text-[0.72rem] tracking-[0.12em] uppercase text-[#55606C]">
                    <span>Ambiance — patio</span>
                    <span aria-hidden="true" className="text-[#8A6A3B] tabular-nums">
                      R.04
                    </span>
                  </figcaption>
                </figure>
              </Reveal>
            )}

            <Reveal delay={0.18} y={20}>
              <dl className="mt-6 grid grid-cols-3 gap-px border border-[#DCD7CD] bg-[#DCD7CD]">
                {[
                  { value: 6, suffix: "", label: "photos par visite" },
                  { value: 2, suffix: "", label: "passages, matin et soir" },
                  { value: 1, suffix: "", label: "plan coté remis" },
                ].map((stat) => (
                  <div key={stat.label} className="bg-[#FBFAF8] px-3 py-4">
                    <dt className="sr-only">{stat.label}</dt>
                    <dd>
                      <span
                        className={`${display} block text-[1.6rem] leading-none font-semibold text-[#14181D] tabular-nums`}
                      >
                        <CountUp value={stat.value} suffix={stat.suffix} duration={0.55} />
                      </span>
                      <span className="mt-2 block text-[0.72rem] leading-snug text-[#55606C]">
                        {stat.label}
                      </span>
                    </dd>
                  </div>
                ))}
              </dl>
            </Reveal>
          </div>
        </div>

        </MobileDisclosure>

        {/* Narration en cinq étapes : texte en flux, photo collante à droite
            en desktop (repérage par `useInView`, jamais par écouteur de
            scroll manuel). */}
        <div className="mt-16 border-t border-[#DCD7CD] pt-12 lg:mt-24 lg:grid lg:grid-cols-12 lg:gap-12 lg:pt-16">
          <Reveal className="lg:col-span-12">
            <p className="text-[0.75rem] font-medium tracking-[0.28em] uppercase text-[#55606C]">
              Le déroulé d&rsquo;une visite, en cinq temps
            </p>
          </Reveal>

          <div className="lg:col-span-5">
            {NOTEBOOK_STEPS.map((step, i) => (
              <StepRow
                key={step.index}
                step={step}
                isActive={activeStep === i}
                onActive={() => setActiveStep(i)}
              />
            ))}
          </div>

          <div className="mt-10 hidden lg:col-span-7 lg:mt-0 lg:block">
            <div className="lg:sticky lg:top-[8.5rem]">
              <AnimatePresence mode="wait">
                <motion.figure key={current.index} {...PANEL} className="relative">
                  <PropertyPhoto
                    photo={current.photo}
                    sizes="(min-width: 1024px) 620px, 92vw"
                    className="h-[540px]"
                    marks={false}
                  />
                  <span className="pointer-events-none absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-[#14181D]/50 to-transparent" />
                  <figcaption className="pointer-events-none absolute bottom-6 left-6 right-6 flex items-end justify-between gap-4">
                    <span className="max-w-xs text-[0.78rem] leading-snug text-white/85">
                      {current.title}
                    </span>
                    <span className="shrink-0 text-[0.75rem] font-medium tracking-[0.18em] text-[#E4C892] tabular-nums">
                      {current.index}/05
                    </span>
                  </figcaption>
                  {activeStep === 3 && (
                    <span className="absolute top-4 right-4 h-20 w-24 overflow-hidden rounded-sm shadow-[0_10px_30px_-10px_rgba(0,0,0,0.5)]">
                      <PropertyVisual variant="plan" tone="stone" className="h-full w-full" />
                    </span>
                  )}
                </motion.figure>
              </AnimatePresence>
            </div>
          </div>
        </div>

        {/* Cotation : le trait se dessine, comme au crayon sur le carnet. */}
        <div className="mt-10 lg:mt-14">
          <DrawnPaths
            viewBox="0 0 1200 20"
            className="h-5 w-full"
            strokeWidth={1}
            paths={["M0 10 H1200", "M0 3 V17", "M600 5 V15", "M1200 3 V17"]}
            duration={0.75}
            stagger={0.07}
          />
          <Reveal delay={0.1}>
            <p className="mt-4 max-w-2xl text-[0.85rem] leading-relaxed text-[#55606C]">
              Le carnet reste consultable à l&rsquo;agence : photographies,
              relevés et notes de visite sont conservés pour chaque bien suivi.
            </p>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
