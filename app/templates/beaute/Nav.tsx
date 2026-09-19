"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { DEMO_BAR_HEIGHT } from "@/components/templates/DemoBar";
import { INSTITUT, NAV_LIENS } from "./data";

/**
 * Navigation de l'institut.
 *
 * Desktop/tablette : barre collante (sous le bandeau Evorya, d'où le top
 * inline) avec les sections et le bouton de réservation.
 *
 * Mobile : la barre du haut reste statique — elle ne vole pas de hauteur
 * pendant la lecture — et la réservation vit dans une barre basse fixe,
 * toujours atteignable au pouce. Les liens de section passent par un menu
 * dépliant, jamais indispensable pour réserver.
 */
export default function Nav({ displayClass }: { displayClass: string }) {
  const [open, setOpen] = useState(false);

  return (
    <>
      <header
        className="relative z-40 border-b border-[#A98873]/25 bg-[#F7F3EE]/85 backdrop-blur-md md:sticky"
        style={{ top: DEMO_BAR_HEIGHT }}
      >
        <div className="mx-auto flex max-w-[1320px] items-center justify-between gap-4 px-5 py-3.5 sm:px-8 md:py-5 lg:px-12">
          <a
            href="#top"
            className={`${displayClass} flex items-baseline gap-2 text-base tracking-[0.2em] text-[#2E2622] sm:text-lg md:text-xl`}
          >
            <span className="h-1.5 w-1.5 shrink-0 translate-y-[-0.2em] rounded-full bg-[#5A6754]" />
            {INSTITUT.nom}
          </a>

          <nav aria-label="Navigation principale" className="hidden md:block">
            <ul className="flex items-center gap-7 lg:gap-9">
              {NAV_LIENS.map((lien) => (
                <li key={lien.href}>
                  <a
                    href={lien.href}
                    className="soline-underline text-[0.8rem] tracking-[0.14em] text-[#6A5C52] uppercase transition-colors hover:text-[#2E2622]"
                  >
                    {lien.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <a
            href={`tel:${INSTITUT.telephoneLien}`}
            className="hidden bg-[#2A211D] px-6 py-3 text-[0.74rem] tracking-[0.2em] text-[#F7F3EE] uppercase transition-colors hover:bg-[#8A6C58] md:inline-block"
          >
            Réserver
          </a>

          <button
            type="button"
            onClick={() => setOpen((value) => !value)}
            aria-expanded={open}
            aria-controls="soline-menu-mobile"
            className="-mr-2 flex h-11 w-11 items-center justify-center rounded-full text-[#2E2622] transition-colors hover:bg-[#EDE3D8] md:hidden"
          >
            <span className="sr-only">{open ? "Fermer le menu" : "Ouvrir le menu"}</span>
            <span aria-hidden="true" className="flex h-4 w-5 flex-col justify-between">
              <motion.span
                className="block h-px w-full bg-current"
                animate={open ? { rotate: 45, y: 7.5 } : { rotate: 0, y: 0 }}
                transition={{ duration: 0.45, ease: [0.22, 0.61, 0.36, 1] }}
              />
              <motion.span
                className="block h-px w-full bg-current"
                animate={open ? { opacity: 0 } : { opacity: 1 }}
                transition={{ duration: 0.3 }}
              />
              <motion.span
                className="block h-px w-full bg-current"
                animate={open ? { rotate: -45, y: -7.5 } : { rotate: 0, y: 0 }}
                transition={{ duration: 0.45, ease: [0.22, 0.61, 0.36, 1] }}
              />
            </span>
          </button>
        </div>

        <AnimatePresence initial={false}>
          {open ? (
            <motion.div
              id="soline-menu-mobile"
              key="menu"
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.55, ease: [0.22, 0.61, 0.36, 1] }}
              className="overflow-hidden border-t border-[#A98873]/20 bg-[#F7F3EE] md:hidden"
            >
              <nav aria-label="Navigation mobile" className="px-5 pt-1 pb-4">
                <ul>
                  {NAV_LIENS.map((lien) => (
                    <li key={lien.href} className="border-b border-[#A98873]/15 last:border-b-0">
                      <a
                        href={lien.href}
                        onClick={() => setOpen(false)}
                        className="block py-3.5 text-[0.95rem] tracking-[0.06em] text-[#2E2622]"
                      >
                        {lien.label}
                      </a>
                    </li>
                  ))}
                </ul>
                <p className="mt-4 text-[0.8rem] leading-relaxed text-[#6A5C52]">
                  {INSTITUT.adresse}
                </p>
              </nav>
            </motion.div>
          ) : null}
        </AnimatePresence>
      </header>

      {/* Barre de réservation mobile : propre au tactile, absente en desktop. */}
      <div
        className="fixed inset-x-0 bottom-0 z-40 border-t border-[#A98873]/25 bg-[#F7F3EE]/95 backdrop-blur-md md:hidden"
        style={{ paddingBottom: "env(safe-area-inset-bottom)" }}
      >
        <div className="flex items-center gap-3 px-4 py-3">
          <a
            href="#soins"
            className="flex h-12 flex-1 items-center justify-center rounded-full border border-[#A98873]/45 text-[0.82rem] tracking-[0.12em] text-[#2E2622] uppercase"
          >
            Les soins
          </a>
          <a
            href={`tel:${INSTITUT.telephoneLien}`}
            className="flex h-12 flex-[1.3] items-center justify-center rounded-full bg-[#2E2622] text-[0.82rem] tracking-[0.12em] text-[#F7F3EE] uppercase"
          >
            Réserver
          </a>
        </div>
      </div>
    </>
  );
}
