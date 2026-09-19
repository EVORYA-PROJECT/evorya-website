"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion, useMotionValueEvent, useScroll } from "motion/react";
import { BRAND, NAV_LINKS } from "../data";
import { Wordmark } from "../Brand";

/**
 * En-tête KRUSH. Transparent sur le hero, il se densifie dès 40 px de scroll
 * (fond quasi noir, filet rouge, mot-symbole réduit) : c'est le premier
 * changement d'état de la page, avant même le premier reveal.
 *
 * Sur mobile, le bouton « Menu » de la barre reste toujours visible : les
 * deux gestes utiles ne sont jamais enfermés derrière l'icône burger.
 */
export default function SiteHeader({ d, topOffset }: { d: string; topOffset: string }) {
  const [open, setOpen] = useState(false);
  const [dense, setDense] = useState(false);
  const { scrollY } = useScroll();

  useMotionValueEvent(scrollY, "change", (v) => setDense(v > 40));

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    document.addEventListener("keydown", onKey);
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = previous;
    };
  }, [open]);

  return (
    <header
      className="sticky z-50 w-full transition-colors duration-500"
      style={{
        top: topOffset,
        backgroundColor: dense ? "rgba(11,11,12,0.92)" : "rgba(11,11,12,0)",
        // Jamais de backdrop-filter quand l'overlay est ouvert : il créerait un
        // bloc conteneur et casserait le position:fixed du menu mobile.
        backdropFilter: dense && !open ? "blur(12px)" : "none",
        boxShadow: dense ? "0 1px 0 rgba(255,59,31,0.35)" : "none",
      }}
    >
      <div className="mx-auto flex max-w-[1600px] items-center justify-between gap-4 px-5 py-3 sm:px-8 lg:px-12 lg:py-4">
        <a href="#haut" className="group flex items-center gap-3 py-1 text-[#F4EFE6]">
          <Wordmark
            d={d}
            className={`transition-all duration-500 ${dense ? "text-[24px] lg:text-[28px]" : "text-[26px] lg:text-[34px]"}`}
          />
          <span className="sr-only">{BRAND.name} — accueil</span>
        </a>

        <nav aria-label="Navigation principale" className="hidden lg:block">
          <ul className="flex items-center gap-8">
            {NAV_LINKS.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  className="group relative block py-2 text-[12px] font-semibold uppercase tracking-[0.18em] text-[#F4EFE6]/70 transition-colors duration-300 hover:text-[#F4EFE6]"
                >
                  {link.label}
                  {/* Filet qui se trace de la gauche au survol et se retire par
                      la droite quand le curseur repart. */}
                  <span
                    aria-hidden="true"
                    className="absolute -bottom-0.5 left-0 h-[2px] w-full origin-right scale-x-0 bg-[#FF3B1F] transition-transform duration-[380ms] ease-out group-hover:origin-left group-hover:scale-x-100"
                  />
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <div className="flex items-center gap-2 sm:gap-3">
          <a
            href="#menu"
            className="flex h-11 items-center bg-[#FF3B1F] px-4 text-[11px] font-bold uppercase tracking-[0.16em] text-[#0B0B0C] transition-colors duration-200 hover:bg-[#FF5A3F] active:scale-[0.97] sm:px-6 sm:text-[12px]"
          >
            Voir le menu
          </a>
          <button
            type="button"
            onClick={() => setOpen(true)}
            aria-expanded={open}
            aria-controls="krush-menu-mobile"
            className="flex h-11 w-11 items-center justify-center border border-[#F4EFE6]/25 text-[#F4EFE6] transition-colors duration-200 hover:border-[#FF3B1F] hover:text-[#FF3B1F] active:scale-[0.94] lg:hidden"
          >
            <span className="sr-only">Ouvrir la navigation</span>
            <span aria-hidden="true" className="flex w-5 flex-col gap-[5px]">
              <span className="h-[2px] w-full bg-current" />
              <span className="h-[2px] w-full bg-current" />
              <span className="h-[2px] w-3/5 bg-current" />
            </span>
          </button>
        </div>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            id="krush-menu-mobile"
            className="fixed inset-0 z-[60] flex flex-col bg-[#0B0B0C] lg:hidden"
            initial={{ opacity: 0, y: -12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.3, ease: [0.22, 0.61, 0.36, 1] }}
          >
            <div
              className="flex items-center justify-between px-5 py-3"
              style={{ paddingTop: `calc(0.75rem + ${topOffset})` }}
            >
              <Wordmark d={d} className="text-[26px] text-[#F4EFE6]" />
              <button
                type="button"
                onClick={() => setOpen(false)}
                className="flex h-11 w-11 items-center justify-center border border-[#F4EFE6]/25 text-[24px] leading-none text-[#F4EFE6]"
              >
                <span className="sr-only">Fermer la navigation</span>
                <span aria-hidden="true">&times;</span>
              </button>
            </div>

            <nav aria-label="Navigation mobile" className="flex-1 overflow-y-auto px-5 pb-10">
              <ul className="mt-4 border-t border-[#F4EFE6]/12">
                {NAV_LINKS.map((link, i) => (
                  <motion.li
                    key={link.href}
                    initial={{ opacity: 0, y: 16 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.05 + i * 0.05, duration: 0.4 }}
                    className="border-b border-[#F4EFE6]/12"
                  >
                    <a
                      href={link.href}
                      onClick={() => setOpen(false)}
                      className={`${d} group flex items-baseline justify-between py-5 text-[34px] uppercase leading-none tracking-[-0.01em] text-[#F4EFE6] transition-colors duration-200 active:text-[#FF3B1F]`}
                    >
                      {link.label}
                      <span
                        aria-hidden="true"
                        className="text-[13px] tracking-normal text-[#FF3B1F]"
                      >
                        0{i + 1}
                      </span>
                    </a>
                  </motion.li>
                ))}
              </ul>

              <motion.div
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.32, duration: 0.4 }}
                className="mt-8 grid grid-cols-2 gap-3"
              >
                <a
                  href="#menu"
                  onClick={() => setOpen(false)}
                  className="flex min-h-[54px] items-center justify-center bg-[#FF3B1F] px-4 text-[12px] font-bold uppercase tracking-[0.16em] text-[#0B0B0C] active:scale-[0.97]"
                >
                  Voir le menu
                </a>
                <a
                  href="#spots"
                  onClick={() => setOpen(false)}
                  className="flex min-h-[54px] items-center justify-center border border-[#F4EFE6]/30 px-4 text-[12px] font-bold uppercase tracking-[0.16em] text-[#F4EFE6] active:scale-[0.97]"
                >
                  Nous trouver
                </a>
              </motion.div>

              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.4, duration: 0.4 }}
                className="mt-8 text-[13px] leading-[1.7] text-[#F4EFE6]/45"
              >
                {BRAND.kicker}. {BRAND.fictionNote}
              </motion.p>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
