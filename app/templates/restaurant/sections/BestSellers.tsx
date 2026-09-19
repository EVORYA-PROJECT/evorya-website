"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { BEST_SELLERS } from "../data";
import { PHOTOS } from "../photos";
import Photo from "../Photo";
import { SectionLabel } from "../Brand";
import { LinesUp, Reveal, Stagger, StaggerItem, EASE_OUT } from "../Reveal";

const BADGE_STYLE: Record<string, string> = {
  signature: "bg-[#FF3B1F] text-[#0B0B0C]",
  épicé: "bg-[#F4EFE6] text-[#0B0B0C]",
  nouveau: "border border-[#F4EFE6]/40 text-[#F4EFE6]",
};

/**
 * Best-sellers.
 *
 * Desktop : une liste de quatre lignes pilote un grand panneau photo. Le
 * produit actif prend toute la place, les autres restent parfaitement
 * lisibles — nom, composition et prix ne sont JAMAIS cachés derrière un
 * survol, seule la photo change. Les quatre vignettes sous le panneau font
 * office de navigation numérotée et gardent les quatre produits à l'écran.
 *
 * Mobile : carrousel à défilement tactile avec accroche (scroll-snap natif).
 * Pas de survol à simuler, pas de flèches minuscules : on pousse du pouce.
 */
export default function BestSellers({ d }: { d: string }) {
  const [active, setActive] = useState(0);
  const current = BEST_SELLERS[active];

  return (
    <section id="best" className="relative px-5 py-20 sm:px-8 lg:px-12 lg:py-32">
      <div className="mx-auto max-w-[1600px]">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <Reveal>
              <SectionLabel index="01">Ce qui part le plus vite</SectionLabel>
            </Reveal>
            <h2
              className={`${d} mt-5 text-[14vw] uppercase leading-[0.85] tracking-[-0.02em] text-[#F4EFE6] sm:text-[11vw] lg:text-[7.5vw]`}
            >
              <LinesUp lines={["Best", <span key="s" className="text-[#FF3B1F]">Sellers</span>]} />
            </h2>
          </div>
          <Reveal delay={0.1} className="max-w-[38ch] lg:pb-4">
            <p className="text-[15px] leading-[1.75] text-[#F4EFE6]/60">
              Quatre références qui font l&rsquo;essentiel du comptoir. Tout est monté à la
              commande, rien n&rsquo;attend sous une lampe.
            </p>
          </Reveal>
        </div>

        {/* ---------------- Desktop ---------------- */}
        <div className="mt-14 hidden grid-cols-12 gap-10 lg:grid xl:gap-14">
          <div className="col-span-5">
            <ul className="border-t border-[#F4EFE6]/12">
              {BEST_SELLERS.map((p, i) => {
                const on = i === active;
                return (
                  <li key={p.id} className="border-b border-[#F4EFE6]/12">
                    <button
                      type="button"
                      aria-pressed={on}
                      onClick={() => setActive(i)}
                      onMouseEnter={() => setActive(i)}
                      className="group relative block w-full py-6 text-left"
                    >
                      <span
                        aria-hidden="true"
                        className={`absolute left-0 top-0 h-full w-[3px] origin-top bg-[#FF3B1F] transition-transform duration-500 ease-out ${
                          on ? "scale-y-100" : "scale-y-0"
                        }`}
                      />
                      <motion.span
                        animate={{ x: on ? 20 : 0 }}
                        transition={{ duration: 0.45, ease: EASE_OUT }}
                        className="block"
                      >
                        <span className="flex items-baseline justify-between gap-6">
                          <span className="flex items-baseline gap-4">
                            <span
                              className={`text-[11px] font-bold tracking-[0.2em] transition-colors duration-300 ${
                                on ? "text-[#FF3B1F]" : "text-[#F4EFE6]/35"
                              }`}
                            >
                              {p.index}
                            </span>
                            <span
                              className={`${d} text-[34px] uppercase leading-none tracking-[-0.01em] transition-colors duration-300 xl:text-[42px] ${
                                on ? "text-[#F4EFE6]" : "text-[#F4EFE6]/45"
                              }`}
                            >
                              {p.name}
                            </span>
                          </span>
                          <span
                            className={`shrink-0 text-[15px] font-semibold tabular-nums transition-colors duration-300 ${
                              on ? "text-[#FF3B1F]" : "text-[#F4EFE6]/45"
                            }`}
                          >
                            {p.price} MAD
                          </span>
                        </span>
                        <span className="mt-2 flex items-center gap-3 pl-[2.1rem]">
                          <span className="text-[14px] leading-[1.6] text-[#F4EFE6]/55">
                            {p.detail}
                          </span>
                        </span>
                        {p.badge && (
                          <span
                            className={`mt-3 ml-[2.1rem] inline-block px-2.5 py-1 text-[10px] font-bold uppercase tracking-[0.18em] ${BADGE_STYLE[p.badge]}`}
                          >
                            {p.badge}
                          </span>
                        )}
                      </motion.span>
                    </button>
                  </li>
                );
              })}
            </ul>
          </div>

          <div className="col-span-7">
            <div className="relative aspect-[5/4] w-full overflow-hidden bg-[#141416]">
              <AnimatePresence initial={false}>
                <motion.div
                  key={current.id}
                  className="absolute inset-0"
                  initial={{ clipPath: "inset(0% 0% 0% 100%)", scale: 1.05 }}
                  animate={{ clipPath: "inset(0% 0% 0% 0%)", scale: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.7, ease: EASE_OUT }}
                >
                  <Photo
                    asset={PHOTOS[current.photo]}
                    sizes="(min-width:1024px) 55vw, 100vw"
                    grade={0.1}
                    scrim="bottom"
                    className="h-full w-full"
                  />
                </motion.div>
              </AnimatePresence>

              {/* Numéro géant, purement graphique. */}
              <span
                aria-hidden="true"
                className={`${d} pointer-events-none absolute -bottom-[3%] left-4 z-10 text-[22vw] leading-none text-[#F4EFE6]/10 xl:text-[15vw]`}
              >
                {current.index}
              </span>

              <div className="pointer-events-none absolute bottom-0 right-0 z-10 p-7 text-right">
                <p className={`${d} text-[40px] uppercase leading-none text-[#F4EFE6] xl:text-[52px]`}>
                  {current.name}
                </p>
                <p className="mt-2 text-[14px] text-[#F4EFE6]/70">{current.detail}</p>
              </div>
            </div>

            {/* Navigation en vignettes : les quatre produits restent à l'écran. */}
            <ul className="mt-4 grid grid-cols-4 gap-4">
              {BEST_SELLERS.map((p, i) => {
                const on = i === active;
                return (
                  <li key={p.id}>
                    <button
                      type="button"
                      aria-pressed={on}
                      aria-label={`Voir ${p.name}`}
                      onClick={() => setActive(i)}
                      className="group block w-full text-left"
                    >
                      <span
                        className={`relative block aspect-[4/3] w-full overflow-hidden transition-opacity duration-300 ${
                          on ? "opacity-100" : "opacity-45 group-hover:opacity-80"
                        }`}
                      >
                        <Photo
                          asset={PHOTOS[p.photo]}
                          sizes="14vw"
                          grade={0.08}
                          grain={false}
                          zoomOnHover
                          className="h-full w-full"
                        />
                        <span
                          aria-hidden="true"
                          className={`absolute inset-x-0 bottom-0 h-[3px] origin-left bg-[#FF3B1F] transition-transform duration-500 ${
                            on ? "scale-x-100" : "scale-x-0"
                          }`}
                        />
                      </span>
                      <span
                        className={`mt-2 block text-[11px] font-semibold uppercase tracking-[0.16em] transition-colors duration-300 ${
                          on ? "text-[#FF3B1F]" : "text-[#F4EFE6]/40"
                        }`}
                      >
                        {p.index} · {p.name}
                      </span>
                    </button>
                  </li>
                );
              })}
            </ul>
          </div>
        </div>

        {/* ---------------- Mobile / tablette ---------------- */}
        <Stagger
          className="mt-10 flex snap-x snap-mandatory gap-4 overflow-x-auto pb-4 [-ms-overflow-style:none] [scrollbar-width:none] lg:hidden"
          step={0.07}
        >
          {BEST_SELLERS.map((p) => (
            <StaggerItem
              key={p.id}
              className="w-[78vw] max-w-[340px] shrink-0 snap-start sm:w-[54vw]"
            >
              <div className="relative aspect-[4/5] w-full overflow-hidden">
                <Photo
                  asset={PHOTOS[p.photo]}
                  sizes="(min-width:640px) 54vw, 78vw"
                  grade={0.1}
                  scrim="bottom"
                  className="h-full w-full"
                />
                <span
                  aria-hidden="true"
                  className={`${d} absolute left-3 top-3 text-[13px] text-[#F4EFE6]/70`}
                >
                  {p.index}
                </span>
                {p.badge && (
                  <span
                    className={`absolute right-3 top-3 px-2.5 py-1 text-[10px] font-bold uppercase tracking-[0.16em] ${BADGE_STYLE[p.badge]}`}
                  >
                    {p.badge}
                  </span>
                )}
                <span className="absolute inset-x-0 bottom-0 p-4">
                  <span className={`${d} block text-[28px] uppercase leading-none text-[#F4EFE6]`}>
                    {p.name}
                  </span>
                </span>
              </div>
              <p className="mt-3 text-[14px] leading-[1.6] text-[#F4EFE6]/60">{p.detail}</p>
              <p className="mt-2 text-[15px] font-semibold tabular-nums text-[#FF3B1F]">
                {p.price} MAD
              </p>
            </StaggerItem>
          ))}
        </Stagger>
        <p className="mt-1 text-[11px] uppercase tracking-[0.22em] text-[#F4EFE6]/35 lg:hidden">
          Faites glisser →
        </p>
      </div>
    </section>
  );
}
