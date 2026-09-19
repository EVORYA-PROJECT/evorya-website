"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { MENU } from "../data";
import { PHOTOS } from "../photos";
import Photo from "../Photo";
import { SectionLabel } from "../Brand";
import { LinesUp, Reveal, EASE, EASE_OUT } from "../Reveal";

const TAG_STYLE: Record<string, string> = {
  signature: "bg-[#FF3B1F] text-[#0B0B0C]",
  épicé: "bg-[#F4EFE6] text-[#0B0B0C]",
  nouveau: "border border-[#F4EFE6]/40 text-[#F4EFE6]",
};

/**
 * Carte interactive.
 *
 * Le changement de catégorie est intégralement côté client — aucun
 * rechargement, aucun flash blanc. Deux précautions pour que la transition
 * reste propre :
 *
 *  • la photo change dans un cadre en `position:absolute` à ratio fixe :
 *    la mise en page ne bouge donc pas pendant le fondu ;
 *  • la liste a une hauteur minimale sur grand écran, sinon le passage d'une
 *    catégorie de 5 lignes à une de 4 ferait sauter la page sous le curseur.
 *
 * Les onglets desktop portent leur propre vignette : les six univers de la
 * carte sont visibles en même temps, et la vignette active est soulignée par
 * un filet partagé (`layoutId`) qui glisse d'un onglet à l'autre.
 */
export default function MenuBoard({ d }: { d: string }) {
  const [activeId, setActiveId] = useState(MENU[0].id);
  const active = MENU.find((c) => c.id === activeId) ?? MENU[0];

  return (
    <section id="menu" className="relative px-5 py-20 sm:px-8 lg:px-12 lg:py-32">
      <div className="mx-auto max-w-[1600px]">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <Reveal>
              <SectionLabel index="03">La carte</SectionLabel>
            </Reveal>
            <h2
              className={`${d} mt-5 text-[16vw] uppercase leading-[0.85] tracking-[-0.02em] text-[#F4EFE6] sm:text-[12vw] lg:text-[8vw]`}
            >
              <LinesUp lines={["Le menu"]} />
            </h2>
          </div>
          <Reveal delay={0.1} className="max-w-[40ch] lg:pb-4">
            <p className="text-[15px] leading-[1.75] text-[#F4EFE6]/60">
              Prix en dirhams, taxes comprises. Carte fictive, présentée pour la démonstration —
              aucune commande n&rsquo;est possible depuis cette page.
            </p>
          </Reveal>
        </div>

        {/* ---------------- Onglets desktop : vignette + libellé ---------------- */}
        <div className="mt-12 hidden grid-cols-6 gap-4 lg:grid">
          {MENU.map((cat) => {
            const on = cat.id === activeId;
            return (
              <button
                key={cat.id}
                type="button"
                aria-pressed={on}
                onClick={() => setActiveId(cat.id)}
                className="group relative block text-left"
              >
                <span
                  className={`relative block aspect-[3/2] w-full overflow-hidden transition-opacity duration-300 ${
                    on ? "opacity-100" : "opacity-40 group-hover:opacity-75"
                  }`}
                >
                  <Photo
                    asset={PHOTOS[cat.photo]}
                    sizes="16vw"
                    grade={0.08}
                    grain={false}
                    zoomOnHover
                    className="h-full w-full"
                  />
                </span>
                <span
                  className={`${d} mt-2 block text-[19px] uppercase leading-none transition-colors duration-300 ${
                    on ? "text-[#F4EFE6]" : "text-[#F4EFE6]/45 group-hover:text-[#F4EFE6]/75"
                  }`}
                >
                  {cat.label}
                </span>
                {on && (
                  <motion.span
                    aria-hidden="true"
                    layoutId="krush-menu-underline"
                    transition={{ duration: 0.4, ease: EASE_OUT }}
                    className="mt-2 block h-[3px] w-full bg-[#FF3B1F]"
                  />
                )}
                {!on && <span aria-hidden="true" className="mt-2 block h-[3px] w-full" />}
              </button>
            );
          })}
        </div>

        {/* ---------------- Onglets mobile : pastilles défilantes ---------------- */}
        <div className="-mx-5 mt-8 flex snap-x gap-2 overflow-x-auto px-5 pb-2 [-ms-overflow-style:none] [scrollbar-width:none] sm:-mx-8 sm:px-8 lg:hidden">
          {MENU.map((cat) => {
            const on = cat.id === activeId;
            return (
              <button
                key={cat.id}
                type="button"
                aria-pressed={on}
                onClick={() => setActiveId(cat.id)}
                className={`min-h-[46px] shrink-0 snap-start px-4 text-[12px] font-bold uppercase tracking-[0.14em] transition-colors duration-300 ${
                  on
                    ? "bg-[#FF3B1F] text-[#0B0B0C]"
                    : "border border-[#F4EFE6]/25 text-[#F4EFE6]/65"
                }`}
              >
                {cat.label}
              </button>
            );
          })}
        </div>

        {/* ---------------- Contenu de la catégorie ---------------- */}
        <div className="mt-8 grid grid-cols-12 gap-8 lg:mt-12 lg:gap-12">
          <div className="col-span-12 lg:col-span-5">
            <div className="relative aspect-[4/3] w-full overflow-hidden bg-[#141416] lg:aspect-[4/5]">
              <AnimatePresence initial={false}>
                <motion.div
                  key={active.id}
                  className="absolute inset-0"
                  initial={{ opacity: 0, scale: 1.05 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.55, ease: EASE }}
                >
                  <Photo
                    asset={PHOTOS[active.photo]}
                    sizes="(min-width:1024px) 40vw, 100vw"
                    grade={0.1}
                    scrim="bottom"
                    className="h-full w-full"
                  />
                </motion.div>
              </AnimatePresence>
              <div className="pointer-events-none absolute inset-x-0 bottom-0 z-10 p-6">
                <p
                  className={`${d} text-[34px] uppercase leading-none text-[#F4EFE6] lg:text-[44px]`}
                >
                  {active.label}
                </p>
                <p className="mt-2 text-[13px] text-[#F4EFE6]/70">{active.note}</p>
              </div>
            </div>
          </div>

          <div className="col-span-12 lg:col-span-7">
            {/*
              Volontairement SANS AnimatePresence.

              Un `AnimatePresence mode="wait"` était posé ici : la nouvelle
              catégorie n'était montée qu'une fois l'animation de sortie de la
              précédente terminée. C'est un verrou — et si un second clic
              interrompait la première sortie, le signal de fin ne revenait
              jamais : la liste restait bloquée sur l'ancienne catégorie alors
              que le reste de la section (photo, titre, note) avait déjà changé.
              Reproduit : trois clics rapides d'onglet en onglet laissaient la
              carte « Burgers » affichée sous l'intitulé « Shakes ».

              La `key` sur le <ul> suffit : React remonte la liste, et chaque
              ligne rejoue sa propre entrée en cascade. Aucun état intermédiaire
              à attendre, donc rien qui puisse rester coincé, quel que soit le
              rythme des clics.
            */}
            <ul key={active.id} className="border-t border-[#F4EFE6]/12 lg:min-h-[470px]">
              {active.items.map((item, i) => (
                <motion.li
                  key={item.name}
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{
                    duration: 0.4,
                    delay: 0.05 + i * 0.05,
                    ease: EASE,
                  }}
                  className="group flex items-baseline justify-between gap-6 border-b border-[#F4EFE6]/12 py-5"
                >
                  <span className="block">
                    <span className="flex flex-wrap items-center gap-3">
                      <span
                        className={`${d} text-[24px] uppercase leading-none tracking-[-0.005em] text-[#F4EFE6] lg:text-[28px]`}
                      >
                        {item.name}
                      </span>
                      {item.tag && (
                        <span
                          className={`px-2 py-[3px] text-[9px] font-bold uppercase tracking-[0.16em] ${TAG_STYLE[item.tag]}`}
                        >
                          {item.tag}
                        </span>
                      )}
                    </span>
                    <span className="mt-1.5 block max-w-[52ch] text-[14px] leading-[1.6] text-[#F4EFE6]/55">
                      {item.detail}
                    </span>
                  </span>
                  <span className="flex shrink-0 items-baseline gap-1 text-[#F4EFE6]">
                    <span className="text-[18px] font-semibold tabular-nums lg:text-[20px]">
                      {item.price}
                    </span>
                    <span className="text-[11px] uppercase tracking-[0.12em] text-[#F4EFE6]/45">
                      MAD
                    </span>
                  </span>
                </motion.li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
