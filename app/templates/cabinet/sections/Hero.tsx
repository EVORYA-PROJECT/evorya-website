"use client";

import { motion } from "motion/react";
import { C, EASE } from "../theme";
import { MaskText, Reveal, RuleDraw, Shell, useDisplay } from "../primitives";
import { HeroPlate } from "../panels";
import { FACTS, FIRM } from "../data";

/**
 * Hero : composition en deux blocs sur grand écran (parole à gauche, aplat
 * graphique à droite), empilée en dessous. Le bandeau de repères sert de
 * socle et remplace les vitrines de logos habituelles.
 */
export default function Hero() {
  const display = useDisplay();

  return (
    <section id="top" className="relative" style={{ backgroundColor: C.paper }}>
      <Shell className="pt-12 pb-0 sm:pt-16 lg:pt-24">
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-12 lg:gap-12">
          {/* Colonne discours */}
          <div className="lg:col-span-7 lg:pr-6">
            <RuleDraw color={C.ruleStrong} />
            <Reveal className="mt-5 sm:mt-6">
              <p
                className="text-[11px] uppercase tracking-[0.28em] sm:text-xs"
                style={{ color: C.slate }}
              >
                {FIRM.eyebrow}
                <span aria-hidden="true" className="mx-3" style={{ color: C.ruleStrong }}>
                  /
                </span>
                <span style={{ color: C.brass }}>Depuis {FIRM.since}</span>
              </p>
            </Reveal>

            <h1
              className={`${display} mt-6 text-[2rem] font-medium leading-[1.06] tracking-[-0.015em] sm:mt-8 sm:text-[3rem] lg:text-[3.6rem] xl:text-[4.1rem]`}
              style={{ color: C.ink }}
            >
              <MaskText delay={0.05}>Instruire les décisions</MaskText>
              <MaskText delay={0.13}>qui engagent durablement</MaskText>
              <MaskText delay={0.21}>l&rsquo;entreprise.</MaskText>
            </h1>

            <Reveal delay={0.18} className="mt-6 sm:mt-8">
              <p
                className="max-w-[52ch] text-[15px] leading-[1.75] sm:text-base"
                style={{ color: C.slate }}
              >
                {FIRM.intro}
              </p>
            </Reveal>

            <Reveal delay={0.24} className="mt-8 sm:mt-10">
              <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:gap-4">
                <a
                  href="#contact"
                  className="flex h-12 w-full items-center justify-center px-8 text-[11px] uppercase tracking-[0.22em] transition-opacity hover:opacity-90 sm:w-auto sm:text-xs"
                  style={{ backgroundColor: C.ink, color: C.paper }}
                >
                  Prendre rendez-vous
                </a>
                <a
                  href="#expertise"
                  className="group flex h-12 w-full items-center justify-center gap-3 border px-6 text-[11px] uppercase tracking-[0.22em] transition-colors sm:w-auto sm:text-xs"
                  style={{ borderColor: C.ruleStrong, color: C.ink }}
                >
                  Domaines d&rsquo;intervention
                  <span
                    aria-hidden="true"
                    className="transition-transform duration-300 group-hover:translate-x-1"
                  >
                    →
                  </span>
                </a>
              </div>
            </Reveal>
          </div>

          {/* Colonne graphique */}
          <motion.div
            className="lg:col-span-5"
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: EASE, delay: 0.1 }}
          >
            <HeroPlate />
          </motion.div>
        </div>

        {/* Bandeau de repères */}
        <div className="mt-12 sm:mt-16 lg:mt-20">
          <RuleDraw color={C.ruleStrong} />
          <dl className="grid grid-cols-2 md:grid-cols-4">
            {FACTS.map((fact, i) => (
              <Reveal
                key={fact.label}
                delay={0.05 * i}
                className={[
                  "border-b py-5 pr-4 sm:py-7",
                  // Filet séparateur : 2 colonnes en dessous de md, 4 au-delà.
                  i % 2 === 1 ? "border-l pl-5 sm:pl-8" : "",
                  i > 0 ? "md:border-l md:pl-6 lg:pl-8" : "",
                ]
                  .filter(Boolean)
                  .join(" ")}
                style={{ borderColor: C.rule }}
              >
                <dt
                  className="text-[10px] uppercase tracking-[0.24em] sm:text-[11px]"
                  style={{ color: C.slate }}
                >
                  {fact.label}
                </dt>
                <dd
                  className={`${display} mt-2 text-2xl font-medium tracking-[-0.01em] sm:text-3xl`}
                  style={{ color: C.ink }}
                >
                  {fact.value}
                </dd>
              </Reveal>
            ))}
          </dl>
        </div>
      </Shell>
    </section>
  );
}
