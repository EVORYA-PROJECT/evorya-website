"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { DEMO_BAR_HEIGHT } from "@/components/templates/DemoBar";
import { VortexMark } from "./Art";
import { GARAGE, NAV_LINKS } from "./data";
import { useDisplayFont } from "./Primitives";

export default function Nav() {
  const display = useDisplayFont();
  const [open, setOpen] = useState(false);

  return (
    <nav
      aria-label="Navigation principale Garage Vortex"
      className="sticky z-50"
      style={{ top: DEMO_BAR_HEIGHT }}
    >
      <div className="border-b border-[var(--vx-line)] bg-[var(--vx-void)]/95 backdrop-blur-md">
        <div className="mx-auto flex h-16 max-w-[1400px] items-center justify-between gap-3 px-5 sm:px-7 lg:h-20 lg:px-10">
          <a
            href="#top"
            className="flex shrink-0 items-center gap-2.5 sm:gap-3"
            onClick={() => setOpen(false)}
          >
            <VortexMark className="h-7 w-7 lg:h-9 lg:w-9" />
            <span className="leading-none">
              <span className="vx-mono block text-xs tracking-[0.34em] text-[var(--vx-mute)]">
                GARAGE
              </span>
              <span
                className={`${display} mt-1 block text-lg font-bold uppercase leading-none tracking-[0.2em] text-[var(--vx-white)] lg:text-2xl`}
              >
                Vortex
              </span>
            </span>
          </a>

          <ul className="hidden items-center gap-8 lg:flex xl:gap-10">
            {NAV_LINKS.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  className="vx-underline relative text-sm uppercase tracking-[0.16em] text-[var(--vx-chrome)] transition-colors hover:text-[var(--vx-white)]"
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>

          <div className="flex items-center gap-2 sm:gap-3">
            <a
              href={GARAGE.phoneHref}
              className="vx-mono hidden items-center gap-2 text-sm tracking-[0.12em] text-[var(--vx-white)] transition-colors hover:text-[var(--vx-red-hi)] md:inline-flex"
            >
              <PhoneGlyph className="h-4 w-4" />
              {GARAGE.phoneDisplay}
            </a>

            {/* Mobile : appel direct, toujours à portée de pouce. */}
            <a
              href={GARAGE.phoneHref}
              aria-label={`Appeler le garage au ${GARAGE.phoneDisplay} (numéro fictif)`}
              className="vx-plate-sm inline-flex h-11 w-11 items-center justify-center bg-[var(--vx-red)] text-white transition-colors hover:bg-[var(--vx-red-hi)] md:hidden"
            >
              <PhoneGlyph className="h-5 w-5" />
            </a>

            <a
              href="#rdv"
              className={`${display} vx-plate-sm hidden items-center bg-[var(--vx-red)] px-5 py-3 text-sm font-bold uppercase tracking-[0.18em] text-white transition-colors hover:bg-[var(--vx-red-hi)] lg:inline-flex`}
            >
              Prendre rendez-vous
            </a>

            <button
              type="button"
              aria-expanded={open}
              aria-controls="vx-menu"
              onClick={() => setOpen((v) => !v)}
              className="vx-plate-sm inline-flex h-11 w-11 items-center justify-center border border-[var(--vx-line)] text-[var(--vx-white)] transition-colors hover:border-[var(--vx-red)] lg:hidden"
            >
              <span className="sr-only">{open ? "Fermer le menu" : "Ouvrir le menu"}</span>
              <span aria-hidden="true" className="relative block h-3.5 w-5">
                <motion.span
                  className="absolute left-0 block h-0.5 w-full bg-current"
                  animate={open ? { top: 6, rotate: 45 } : { top: 0, rotate: 0 }}
                  transition={{ duration: 0.25 }}
                />
                <motion.span
                  className="absolute left-0 top-1.5 block h-0.5 w-full bg-current"
                  animate={open ? { opacity: 0, x: 10 } : { opacity: 1, x: 0 }}
                  transition={{ duration: 0.2 }}
                />
                <motion.span
                  className="absolute left-0 block h-0.5 w-full bg-current"
                  animate={open ? { top: 6, rotate: -45 } : { top: 12, rotate: 0 }}
                  transition={{ duration: 0.25 }}
                />
              </span>
            </button>
          </div>
        </div>
      </div>

      <div aria-hidden="true" className="vx-hatch h-[3px] w-full opacity-70" />

      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            id="vx-menu"
            key="menu"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
            className="overflow-hidden border-b border-[var(--vx-line)] bg-[var(--vx-carbon)] lg:hidden"
          >
            <ul className="px-5 py-2 sm:px-7">
              {NAV_LINKS.map((link, i) => (
                <li key={link.href} className="border-b border-[var(--vx-line)] last:border-0">
                  <a
                    href={link.href}
                    onClick={() => setOpen(false)}
                    className="flex items-center justify-between py-4 text-base uppercase tracking-[0.14em] text-[var(--vx-white)]"
                  >
                    {link.label}
                    <span className="vx-mono text-xs text-[var(--vx-red-hi)]">
                      {`0${i + 1}`}
                    </span>
                  </a>
                </li>
              ))}
            </ul>
            <div className="grid grid-cols-2 gap-3 px-5 pb-5 sm:px-7">
              <a
                href={GARAGE.whatsappHref}
                onClick={() => setOpen(false)}
                className="vx-plate-sm flex min-h-12 items-center justify-center border border-[var(--vx-line)] px-3 text-sm uppercase tracking-[0.14em] text-[var(--vx-white)]"
              >
                WhatsApp
              </a>
              <a
                href="#rdv"
                onClick={() => setOpen(false)}
                className={`${display} vx-plate-sm flex min-h-12 items-center justify-center bg-[var(--vx-red)] px-3 text-sm font-bold uppercase tracking-[0.14em] text-white`}
              >
                Rendez-vous
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}

export function PhoneGlyph({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      className={className}
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      focusable="false"
    >
      <path d="M5 3h4l2 5-2.5 1.5a12 12 0 0 0 6 6L16 13l5 2v4a2 2 0 0 1-2 2A16 16 0 0 1 3 5a2 2 0 0 1 2-2Z" />
    </svg>
  );
}
