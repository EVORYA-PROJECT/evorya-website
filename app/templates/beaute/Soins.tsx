"use client";

import { useRef, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import type { Variants } from "motion/react";
import { CATEGORIES } from "./data";

const EASE = [0.22, 0.61, 0.36, 1] as const;

/**
 * Transition d'onglet volontairement lente (0,8 s) et en cascade : la carte se
 * repose plutôt qu'elle ne bascule. MotionConfig (BeauteDemo) neutralise le
 * tout si l'utilisateur a demandé moins de mouvement.
 */
const PANNEAU: Variants = {
  hidden: { opacity: 0, y: 12 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, ease: EASE, staggerChildren: 0.06, delayChildren: 0.14 },
  },
  exit: { opacity: 0, y: -6, transition: { duration: 0.45, ease: EASE } },
};

const LIGNE: Variants = {
  hidden: { opacity: 0, y: 10 },
  show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: EASE } },
};

/**
 * La carte des soins. Quatre familles, présentées en onglets réellement
 * accessibles (rôles ARIA + navigation aux flèches, tabindex roving).
 *
 * Mobile : les quatre onglets tiennent en deux lignes de deux — aucun
 * défilement horizontal, aucune famille cachée hors écran — et chaque soin
 * devient une fiche empilée où le prix reste sur la même ligne que le nom.
 * Desktop : onglets alignés et lignes tabulaires calmes.
 */
export default function Soins({ displayClass }: { displayClass: string }) {
  const [active, setActive] = useState(0);
  const tabRefs = useRef<Array<HTMLButtonElement | null>>([]);

  const categorie = CATEGORIES[active];

  function focusTab(index: number) {
    const next = (index + CATEGORIES.length) % CATEGORIES.length;
    setActive(next);
    tabRefs.current[next]?.focus();
  }

  function handleKeyDown(event: React.KeyboardEvent<HTMLButtonElement>, index: number) {
    if (event.key === "ArrowRight" || event.key === "ArrowDown") {
      event.preventDefault();
      focusTab(index + 1);
    } else if (event.key === "ArrowLeft" || event.key === "ArrowUp") {
      event.preventDefault();
      focusTab(index - 1);
    } else if (event.key === "Home") {
      event.preventDefault();
      focusTab(0);
    } else if (event.key === "End") {
      event.preventDefault();
      focusTab(CATEGORIES.length - 1);
    }
  }

  return (
    <div className="mt-10 md:mt-14">
      <div
        role="tablist"
        aria-label="Familles de soins"
        className="grid grid-cols-2 border-l border-t border-[#806D5E]/30 sm:grid-cols-4"
      >
        {CATEGORIES.map((cat, index) => {
          const selected = index === active;
          return (
            <button
              key={cat.id}
              ref={(node) => {
                tabRefs.current[index] = node;
              }}
              type="button"
              role="tab"
              id={`onglet-${cat.id}`}
              aria-selected={selected}
              aria-controls={`panneau-${cat.id}`}
              tabIndex={selected ? 0 : -1}
              onClick={() => setActive(index)}
              onKeyDown={(event) => handleKeyDown(event, index)}
              className={`relative flex h-14 items-center justify-center border-b border-r border-[#806D5E]/30 px-4 text-[0.76rem] tracking-[0.18em] uppercase transition-colors ${
                selected
                  ? "bg-[#2A211D] text-[#F7F3EE]"
                  : "text-[#66564C] hover:bg-[#D9C8B6]/45 hover:text-[#2A211D]"
              }`}
            >
              {cat.label}
              {selected ? (
                <motion.span
                  layoutId="soline-onglet-actif"
                  aria-hidden="true"
                  className="absolute bottom-0 left-0 h-0.5 w-full bg-[#C9A98B]"
                  transition={{ duration: 0.75, ease: [0.22, 0.61, 0.36, 1] }}
                />
              ) : null}
            </button>
          );
        })}
      </div>

      <AnimatePresence mode="wait" initial={false}>
        <motion.div
          key={categorie.id}
          id={`panneau-${categorie.id}`}
          role="tabpanel"
          aria-labelledby={`onglet-${categorie.id}`}
          tabIndex={0}
          variants={PANNEAU}
          initial="hidden"
          animate="show"
          exit="exit"
          className="pt-8 md:pt-12"
        >
          <div className="grid gap-x-12 gap-y-8 lg:grid-cols-[minmax(0,22rem)_minmax(0,1fr)]">
            <div>
              <h3
                className={`${displayClass} text-2xl tracking-[0.1em] text-[#2E2622] sm:text-3xl`}
              >
                {categorie.titre}
              </h3>
              <p className="mt-4 max-w-md text-[0.95rem] leading-[1.9] text-[#6A5C52]">
                {categorie.intro}
              </p>
            </div>

            <ul className="border-t border-[#A98873]/25 lg:border-t-0">
              {categorie.soins.map((soin) => (
                <motion.li
                  key={soin.nom}
                  variants={LIGNE}
                  className="border-b border-[#A98873]/25 py-6 md:py-7"
                >
                  <div className="flex flex-wrap items-baseline justify-between gap-x-6 gap-y-1">
                    <h4
                      className={`${displayClass} text-xl tracking-[0.08em] text-[#2E2622] sm:text-2xl`}
                    >
                      {soin.nom}
                    </h4>
                    <p className="text-[0.95rem] font-medium text-[#2E2622] tabular-nums">
                      {soin.prix}
                    </p>
                  </div>
                  <p className="mt-1.5 text-[0.78rem] tracking-[0.18em] text-[#5A6754] uppercase">
                    {soin.duree}
                  </p>
                  <p className="mt-3 max-w-2xl text-[0.95rem] leading-[1.85] text-[#6A5C52]">
                    {soin.description}
                  </p>
                </motion.li>
              ))}
            </ul>
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
