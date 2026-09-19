"use client";

import { motion } from "motion/react";
import { CarBlueprint } from "./Art";
import { GARAGE, PHOTOS } from "./data";
import { PhoneGlyph } from "./Nav";
import { Reveal, TechLabel, TechPhoto, Wipe, useDisplayFont } from "./Primitives";

const SPECS: readonly [string, string][] = [
  ["04", "ponts élévateurs"],
  ["3D", "banc de géométrie"],
  ["OBD", "diagnostic multimarque"],
  ["30′", "devis chiffré"],
];

const LINE = { duration: 0.55, ease: [0.16, 1, 0.3, 1] as const };

export default function Hero() {
  const display = useDisplayFont();

  return (
    <section
      id="top"
      className="bg-noise relative overflow-hidden border-b border-[var(--vx-line)] pt-14 pb-0 sm:pt-20 lg:pt-24"
    >
      {/* Calques décoratifs : planche blueprint + faisceau diagonal rouge. */}
      <div aria-hidden="true" className="vx-blueprint pointer-events-none absolute inset-0 opacity-70" />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-[22%] -top-[35%] h-[160%] w-[70%] rotate-[18deg] bg-gradient-to-b from-[var(--vx-red-deep)]/45 via-[var(--vx-red-deep)]/10 to-transparent"
      />
      <div
        aria-hidden="true"
        className="vx-diag-red pointer-events-none absolute -left-24 top-[38%] h-24 w-[52%] -rotate-[8deg] opacity-30 sm:opacity-40"
      />

      <div className="relative mx-auto max-w-[1400px] px-5 sm:px-7 lg:px-10">
        <div className="lg:grid lg:grid-cols-12 lg:items-center lg:gap-10">
          <div className="lg:col-span-6 xl:col-span-6">
            <Reveal x={-18} y={0}>
              <div className="flex flex-wrap items-center gap-x-4 gap-y-2">
                <TechLabel>Casablanca</TechLabel>
                <span aria-hidden="true" className="h-px w-8 bg-[var(--vx-red)]" />
                <span className="vx-mono text-xs tracking-[0.2em] text-[var(--vx-mute)]">
                  {GARAGE.coordinates}
                </span>
              </div>
            </Reveal>

            <h1 className={`${display} mt-6 uppercase leading-[0.85] sm:mt-8`}>
              <motion.span
                initial={{ opacity: 0, y: 14 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ ...LINE, delay: 0.05 }}
                className="block text-[clamp(1.3rem,5vw,2.2rem)] font-semibold tracking-[0.42em] text-[var(--vx-mute)]"
              >
                Garage
              </motion.span>
              <motion.span
                initial={{ opacity: 0, x: -26 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ ...LINE, delay: 0.12, duration: 0.65 }}
                className="vx-outline block text-[clamp(3.6rem,15vw,9.5rem)] font-bold tracking-[0.02em]"
              >
                Vortex
              </motion.span>
              <motion.span
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ ...LINE, delay: 0.22 }}
                className="mt-3 block text-[clamp(1.5rem,4.4vw,2.6rem)] font-semibold leading-[1.02] tracking-[0.01em] text-[var(--vx-white)] sm:mt-5"
              >
                Mécanique de précision,
                <span className="text-[var(--vx-red-hi)]"> mesurée et documentée.</span>
              </motion.span>
            </h1>

            <Reveal delay={0.3} y={14}>
              <p className="mt-6 max-w-xl text-base leading-relaxed text-[var(--vx-chrome)] sm:text-lg">
                {GARAGE.positioning}
              </p>
            </Reveal>

            <Reveal delay={0.36} y={14}>
              <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center">
                <a
                  href="#rdv"
                  className={`${display} vx-plate-sm flex min-h-13 items-center justify-center bg-[var(--vx-red)] px-7 py-4 text-base font-bold uppercase tracking-[0.18em] text-white transition-colors hover:bg-[var(--vx-red-hi)] sm:min-h-0`}
                >
                  Prendre rendez-vous
                </a>
                <div className="grid grid-cols-2 gap-3 sm:flex sm:gap-3">
                  <a
                    href={GARAGE.phoneHref}
                    className="vx-plate-sm flex min-h-13 items-center justify-center gap-2 border border-[var(--vx-line)] px-4 py-4 text-sm uppercase tracking-[0.14em] text-[var(--vx-white)] transition-colors hover:border-[var(--vx-red)] sm:min-h-0 sm:px-6"
                  >
                    <PhoneGlyph className="h-4 w-4 text-[var(--vx-red-hi)]" />
                    Appeler
                  </a>
                  <a
                    href={GARAGE.whatsappHref}
                    className="vx-plate-sm flex min-h-13 items-center justify-center gap-2 border border-[var(--vx-line)] px-4 py-4 text-sm uppercase tracking-[0.14em] text-[var(--vx-white)] transition-colors hover:border-[var(--vx-red)] sm:min-h-0 sm:px-6"
                  >
                    WhatsApp
                  </a>
                </div>
              </div>
              <p className="vx-mono mt-3 text-xs tracking-[0.12em] text-[var(--vx-mute)]">
                Lun — Ven 08:00 / 19:00 · Sam 08:00 / 14:00
              </p>
            </Reveal>
          </div>

          {/* Poste d'atelier réel, surmonté du profil coté tracé au scroll :
              la photographie et la planche technique partagent le même cadre. */}
          <div className="relative mt-12 lg:col-span-6 lg:mt-0">
            <Wipe from="left" delay={0.18}>
              <TechPhoto
                photo={PHOTOS.pont}
                priority
                grid
                corner
                label="POSTE 02 — TRAIN ARRIÈRE"
                position="52% 38%"
                sizes="(max-width: 640px) 92vw, (max-width: 1024px) 94vw, 46vw"
                className="vx-plate aspect-[4/5] w-full sm:aspect-[16/11] lg:aspect-[4/5]"
              />
            </Wipe>

            <div aria-hidden="true" className="pointer-events-none absolute inset-x-0 bottom-0 z-20">
              <div className="absolute inset-x-0 bottom-0 h-[150%] bg-gradient-to-t from-[var(--vx-void)] via-[var(--vx-void)]/88 to-transparent" />
              <CarBlueprint className="relative block h-auto w-full" />
            </div>

            <Reveal delay={0.5} y={10}>
              <p className="vx-mono mt-4 flex flex-wrap items-center gap-x-3 gap-y-1 text-xs tracking-[0.16em] text-[var(--vx-mute)]">
                <span className="text-[var(--vx-red-hi)]">/ 01</span>
                Relevé au vérin de boîte — tolérance de serrage contrôlée au couple
              </p>
            </Reveal>
          </div>
        </div>

        {/* Bandeau d'équipement : lecture rapide des moyens techniques. */}
        <Reveal delay={0.1} y={16}>
          <div className="mt-12 border-t border-[var(--vx-line)] sm:mt-16">
            <ul className="grid grid-cols-2 lg:grid-cols-4">
              {SPECS.map(([value, label]) => (
                <li
                  key={label}
                  className="flex items-baseline gap-3 border-b border-[var(--vx-line)] py-5 odd:pr-5 even:border-l even:border-[var(--vx-line)] even:pl-5 lg:border-b-0 lg:border-l lg:px-6 lg:odd:pr-6 lg:even:pl-6 lg:first:border-l-0 lg:first:pl-0"
                >
                  <span
                    className={`${display} text-2xl font-bold tracking-[0.05em] text-[var(--vx-red-hi)] sm:text-3xl`}
                  >
                    {value}
                  </span>
                  <span className="text-sm leading-tight text-[var(--vx-mute)]">{label}</span>
                </li>
              ))}
            </ul>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
