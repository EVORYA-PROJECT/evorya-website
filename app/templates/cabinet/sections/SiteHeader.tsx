"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { C, EASE } from "../theme";
import { useDemo } from "../primitives";
import { CONTACT, FIRM, NAV_LINKS } from "../data";

/**
 * En-tête institutionnel : un filet, un bloc-marque typographique, une
 * navigation sobre. Sur mobile la navigation bascule dans un panneau déroulant
 * à lignes larges (cibles tactiles confortables) plutôt qu'en menu réduit.
 */
export default function SiteHeader() {
  const { displayClass, barOffset } = useDemo();
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (!open) return;
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") setOpen(false);
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  return (
    <header
      className="sticky z-40 w-full border-b backdrop-blur-sm"
      style={{
        top: barOffset,
        borderColor: C.rule,
        backgroundColor: "rgba(244, 243, 239, 0.92)",
      }}
    >
      <div className="mx-auto flex h-16 w-full max-w-[1320px] items-center justify-between gap-4 px-5 sm:px-8 lg:h-20 lg:px-12">
        {/* Bloc-marque */}
        <a
          href="#top"
          className="group flex shrink-0 items-center gap-2.5 sm:gap-3"
          aria-label={`${FIRM.name} — retour en haut de page`}
        >
          <span
            aria-hidden="true"
            className="h-2.5 w-2.5 shrink-0"
            style={{ backgroundColor: C.brass }}
          />
          <span
            className={`${displayClass} text-[12px] font-medium uppercase leading-none tracking-[0.16em] sm:text-[13px] sm:tracking-[0.2em]`}
            style={{ color: C.ink }}
          >
            Verdon <span className="font-normal">&amp; Associés</span>
          </span>
        </a>

        {/* Navigation desktop */}
        <nav aria-label="Navigation principale" className="hidden lg:block">
          <ul className="flex items-center gap-8">
            {NAV_LINKS.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  className="group relative block py-2 text-[13px] tracking-[0.02em] transition-colors"
                  style={{ color: C.slate }}
                >
                  <span className="transition-colors group-hover:text-[#141B26]">
                    {link.label}
                  </span>
                  <span
                    aria-hidden="true"
                    className="absolute inset-x-0 bottom-0 h-px origin-left scale-x-0 transition-transform duration-300 ease-out group-hover:scale-x-100"
                    style={{ backgroundColor: C.brass }}
                  />
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <div className="flex items-center gap-2 sm:gap-3">
          <a
            href="#contact"
            className="flex h-11 items-center justify-center px-4 text-[11px] uppercase tracking-[0.18em] transition-colors sm:px-6 sm:text-xs sm:tracking-[0.22em]"
            style={{ backgroundColor: C.ink, color: C.paper }}
            onClick={() => setOpen(false)}
          >
            <span className="sm:hidden">Rendez-vous</span>
            <span className="hidden sm:inline">Prendre rendez-vous</span>
          </a>

          <button
            type="button"
            className="flex h-11 w-11 shrink-0 items-center justify-center border lg:hidden"
            style={{ borderColor: C.ruleStrong, color: C.ink }}
            aria-expanded={open}
            aria-controls="cabinet-menu"
            aria-label={open ? "Fermer le menu" : "Ouvrir le menu"}
            onClick={() => setOpen((v) => !v)}
          >
            <span aria-hidden="true" className="relative block h-3 w-4">
              <motion.span
                className="absolute left-0 top-0 block h-px w-full"
                style={{ backgroundColor: C.ink }}
                animate={open ? { rotate: 45, y: 6 } : { rotate: 0, y: 0 }}
                transition={{ duration: 0.3, ease: EASE }}
              />
              <motion.span
                className="absolute bottom-0 left-0 block h-px w-full"
                style={{ backgroundColor: C.ink }}
                animate={open ? { rotate: -45, y: -6 } : { rotate: 0, y: 0 }}
                transition={{ duration: 0.3, ease: EASE }}
              />
            </span>
          </button>
        </div>
      </div>

      {/* Panneau mobile */}
      <AnimatePresence initial={false}>
        {open ? (
          <motion.div
            id="cabinet-menu"
            key="menu"
            className="overflow-hidden border-t lg:hidden"
            style={{ borderColor: C.rule, backgroundColor: C.paper }}
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.35, ease: EASE }}
          >
            <nav aria-label="Navigation mobile" className="px-5 pb-6 pt-2 sm:px-8">
              <ul>
                {NAV_LINKS.map((link, i) => (
                  <li key={link.href} className="border-b" style={{ borderColor: C.rule }}>
                    <a
                      href={link.href}
                      onClick={() => setOpen(false)}
                      className="flex min-h-[56px] items-center gap-4 text-[15px]"
                      style={{ color: C.ink }}
                    >
                      <span
                        className="text-[11px] tracking-[0.2em]"
                        style={{ color: C.brass }}
                      >
                        {String(i + 1).padStart(2, "0")}
                      </span>
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
              <div className="mt-5 flex flex-col gap-1.5 text-[13px]" style={{ color: C.slate }}>
                <a href={`tel:${CONTACT.phone.replace(/\s/g, "")}`} className="py-1">
                  {CONTACT.phone}
                </a>
                <a href={`mailto:${CONTACT.email}`} className="py-1">
                  {CONTACT.email}
                </a>
              </div>
            </nav>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </header>
  );
}
