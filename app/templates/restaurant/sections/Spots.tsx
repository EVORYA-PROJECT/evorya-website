"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { BRAND, SPOTS } from "../data";
import { PHOTOS } from "../photos";
import Photo from "../Photo";
import { SectionLabel } from "../Brand";
import { LinesUp, Reveal, EASE_OUT } from "../Reveal";

/**
 * Les adresses.
 *
 * Quatre implantations FICTIVES : la mention est écrite noir sur blanc sous
 * la liste, et aucune rue, aucun numéro, aucun téléphone n'est inventé — on
 * ne donne que la ville et le quartier, ce qui suffit à la démonstration sans
 * jamais pouvoir être pris pour une vraie enseigne.
 *
 * Pas de carte Google : une liste pilotant un grand panneau photo raconte
 * mieux la chaîne, et la vignette de chaque ligne garde les quatre lieux
 * visibles en même temps.
 */
export default function Spots({ d }: { d: string }) {
  const [active, setActive] = useState(0);
  const current = SPOTS[active];

  return (
    <section id="spots" className="relative px-5 py-20 sm:px-8 lg:px-12 lg:py-32">
      <div className="mx-auto max-w-[1600px]">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <Reveal>
              <SectionLabel index="08">Où nous trouver</SectionLabel>
            </Reveal>
            <h2
              className={`${d} mt-5 text-[14vw] uppercase leading-[0.85] tracking-[-0.02em] text-[#F4EFE6] sm:text-[11vw] lg:text-[7.5vw]`}
            >
              <LinesUp lines={["Les", <span key="s" className="text-[#FF3B1F]">spots</span>]} />
            </h2>
          </div>
          <Reveal delay={0.1} className="max-w-[36ch] lg:pb-4">
            <p className="text-[15px] leading-[1.75] text-[#F4EFE6]/60">
              Trois adresses ouvertes, une quatrième en préparation. Même carte, même
              plancha, même heure de fermeture tardive.
            </p>
          </Reveal>
        </div>

        <div className="mt-12 grid grid-cols-12 gap-8 lg:mt-16 lg:gap-12">
          {/* Panneau photo */}
          <div className="col-span-12 lg:col-span-6">
            <div className="relative aspect-[4/3] w-full overflow-hidden bg-[#141416] lg:aspect-[3/4]">
              <AnimatePresence initial={false}>
                <motion.div
                  key={current.id}
                  className="absolute inset-0"
                  initial={{ clipPath: "inset(100% 0% 0% 0%)" }}
                  animate={{ clipPath: "inset(0% 0% 0% 0%)" }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.7, ease: EASE_OUT }}
                >
                  <Photo
                    asset={PHOTOS[current.photo]}
                    sizes="(min-width:1024px) 46vw, 100vw"
                    grade={0.12}
                    scrim="frame"
                    className="h-full w-full"
                  />
                </motion.div>
              </AnimatePresence>

              <div className="pointer-events-none absolute inset-x-0 top-0 z-10 flex items-start justify-between p-6">
                <span className="text-[10px] font-bold uppercase tracking-[0.24em] text-[#FF3B1F]">
                  0{active + 1} / 0{SPOTS.length}
                </span>
                <span className="text-right text-[10px] uppercase tracking-[0.2em] text-[#F4EFE6]/60">
                  Lieu fictif
                </span>
              </div>

              <div className="pointer-events-none absolute inset-x-0 bottom-0 z-10 p-6">
                <p className={`${d} text-[10vw] uppercase leading-[0.86] text-[#F4EFE6] lg:text-[4.2vw]`}>
                  {current.area}
                </p>
                <p className="mt-2 text-[13px] uppercase tracking-[0.18em] text-[#F4EFE6]/70">
                  {current.city} · {current.hours}
                </p>
              </div>
            </div>
          </div>

          {/* Liste */}
          <div className="col-span-12 lg:col-span-6">
            <ul className="border-t border-[#F4EFE6]/12">
              {SPOTS.map((s, i) => {
                const on = i === active;
                return (
                  <li key={s.id} className="border-b border-[#F4EFE6]/12">
                    <button
                      type="button"
                      aria-pressed={on}
                      onClick={() => setActive(i)}
                      onMouseEnter={() => setActive(i)}
                      className="group flex w-full items-center gap-4 py-4 text-left sm:gap-5 sm:py-5"
                    >
                      <span
                        className={`relative block h-16 w-20 shrink-0 overflow-hidden transition-opacity duration-300 sm:h-20 sm:w-28 ${
                          on ? "opacity-100" : "opacity-45 group-hover:opacity-80"
                        }`}
                      >
                        <Photo
                          asset={PHOTOS[s.photo]}
                          sizes="112px"
                          grade={0.08}
                          grain={false}
                          className="h-full w-full"
                        />
                      </span>

                      <span className="min-w-0 flex-1">
                        <span className="flex items-baseline justify-between gap-4">
                          <span
                            className={`${d} truncate text-[26px] uppercase leading-none transition-colors duration-300 sm:text-[32px] ${
                              on ? "text-[#F4EFE6]" : "text-[#F4EFE6]/45"
                            }`}
                          >
                            {s.area}
                          </span>
                          <span
                            className={`shrink-0 text-[11px] font-semibold uppercase tracking-[0.14em] transition-colors duration-300 ${
                              on ? "text-[#FF3B1F]" : "text-[#F4EFE6]/40"
                            }`}
                          >
                            {s.hours}
                          </span>
                        </span>
                        <span className="mt-1.5 block text-[13px] leading-[1.6] text-[#F4EFE6]/55">
                          {s.city} — {s.note}
                        </span>
                        <span className="mt-2 flex flex-wrap gap-1.5">
                          {s.services.map((x) => (
                            <span
                              key={x}
                              className="border border-[#F4EFE6]/20 px-2 py-[3px] text-[10px] font-semibold uppercase tracking-[0.12em] text-[#F4EFE6]/55"
                            >
                              {x}
                            </span>
                          ))}
                        </span>
                      </span>
                    </button>
                  </li>
                );
              })}
            </ul>

            <Reveal delay={0.08}>
              <p className="mt-6 text-[13px] leading-[1.7] text-[#F4EFE6]/40">
                {BRAND.fictionNote} Les quartiers cités servent uniquement à illustrer un
                réseau de plusieurs points de vente : aucune adresse, aucun horaire et
                aucun numéro réel ne sont indiqués sur cette page.
              </p>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
