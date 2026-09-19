"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { DEMO_BAR_HEIGHT } from "@/components/templates/DemoBar";
import { focusRing, useDisplay } from "../ui";

/**
 * `n` reprend le numéro de la section visée : le menu mobile et les repères
 * « 01 — Sélection » des sections affichent donc toujours le même registre.
 */
const LINKS = [
  { href: "#biens", label: "Nos biens", n: "01" },
  { href: "#bien", label: "Le bien en détail", n: "02" },
  { href: "#carnet", label: "Carnet", n: "03" },
  { href: "#galerie", label: "Galerie", n: "04" },
  { href: "#agence", label: "L'agence", n: "05" },
  { href: "#services", label: "Services", n: "06" },
  { href: "#contact", label: "Contact", n: "07" },
];

function Wordmark({ display }: { display: string }) {
  return (
    <span className="flex items-center gap-3">
      <svg
        viewBox="0 0 24 24"
        aria-hidden="true"
        className="h-6 w-6 shrink-0 text-[#2B3A4A] sm:h-7 sm:w-7"
        fill="none"
        stroke="currentColor"
      >
        <path d="M2 22V11a10 10 0 0 1 20 0v11" strokeWidth="1.6" />
        <path d="M7 22v-10a5 5 0 0 1 10 0v10" strokeWidth="1" opacity="0.55" />
        <path d="M0 22h24" strokeWidth="1.6" />
      </svg>
      <span className="flex flex-col leading-none">
        <span
          className={`${display} text-[1.05rem] font-bold tracking-[0.24em] text-[#14181D] sm:text-[1.15rem]`}
        >
          ATRIUM
        </span>
        <span className="mt-1.5 text-[0.75rem] font-medium tracking-[0.2em] text-[#55606C]">
          IMMOBILIER
        </span>
      </span>
    </span>
  );
}

export default function SiteHeader() {
  const display = useDisplay();
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (!open) return;
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = previous;
      window.removeEventListener("keydown", onKey);
    };
  }, [open]);

  return (
    <>
      <header
        className="sticky z-50 border-b border-[#DCD7CD] bg-[#FBFAF8]/92 backdrop-blur-md"
        style={{ top: DEMO_BAR_HEIGHT }}
      >
        <div className="mx-auto flex h-16 max-w-[1400px] items-center justify-between gap-6 px-5 sm:px-8 lg:h-20 lg:px-10">
          <a
            href="#haut"
            className={`-m-2 rounded-sm p-2 ${focusRing}`}
            aria-label="Atrium Immobilier — haut de page"
          >
            <Wordmark display={display} />
          </a>

          <nav aria-label="Navigation principale" className="hidden lg:block">
            <ul className="flex items-center gap-5 xl:gap-8">
              {LINKS.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    className={`group relative inline-block py-1 text-[0.95rem] font-medium text-[#3A444F] transition-colors hover:text-[#14181D] ${focusRing}`}
                  >
                    {link.label}
                    <span
                      aria-hidden="true"
                      className="absolute -bottom-0.5 left-0 h-px w-0 bg-[#2B3A4A] transition-[width] duration-300 ease-out group-hover:w-full"
                    />
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <div className="flex items-center gap-3">
            <span className="hidden text-[0.85rem] font-medium tracking-[0.06em] text-[#55606C] xl:inline">
              05 22 00 00 00
            </span>
            <a
              href="#contact"
              className={`hidden items-center rounded-full bg-[#2B3A4A] px-5 py-2.5 text-[0.85rem] font-medium text-white transition-colors hover:bg-[#14181D] sm:inline-flex ${focusRing}`}
            >
              Prendre rendez-vous
            </a>

            <button
              type="button"
              onClick={() => setOpen((v) => !v)}
              aria-expanded={open}
              aria-controls="atrium-menu"
              className={`flex h-11 min-w-[44px] items-center gap-2 rounded-full border border-[#2B3A4A]/30 px-4 text-[0.8rem] font-medium tracking-[0.08em] text-[#14181D] lg:hidden ${focusRing}`}
            >
              <span className="flex h-3 w-4 flex-col justify-between" aria-hidden="true">
                <span
                  className={`h-px w-full bg-[#14181D] transition-transform duration-300 ${
                    open ? "translate-y-[5.5px] rotate-45" : ""
                  }`}
                />
                <span
                  className={`h-px w-full bg-[#14181D] transition-opacity duration-200 ${
                    open ? "opacity-0" : ""
                  }`}
                />
                <span
                  className={`h-px w-full bg-[#14181D] transition-transform duration-300 ${
                    open ? "-translate-y-[5.5px] -rotate-45" : ""
                  }`}
                />
              </span>
              {open ? "Fermer" : "Menu"}
            </button>
          </div>
        </div>
      </header>

      <AnimatePresence>
        {open && (
          <motion.div
            id="atrium-menu"
            key="menu"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25, ease: "easeOut" }}
            className="fixed inset-x-0 bottom-0 z-40 overflow-y-auto bg-[#FBFAF8] lg:hidden"
            style={{ top: DEMO_BAR_HEIGHT }}
          >
            <nav
              aria-label="Navigation mobile"
              className="flex min-h-full flex-col px-5 pt-24 pb-10 sm:px-8"
            >
              <ul className="flex-1 border-t border-[#DCD7CD]">
                {LINKS.map((link, i) => (
                  <motion.li
                    key={link.href}
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.35, delay: 0.04 * i, ease: "easeOut" }}
                    className="border-b border-[#DCD7CD]"
                  >
                    <a
                      href={link.href}
                      onClick={() => setOpen(false)}
                      className={`flex items-baseline gap-4 py-5 ${focusRing}`}
                    >
                      <span className="text-[0.75rem] font-medium tabular-nums text-[#8A6A3B]">
                        {link.n}
                      </span>
                      <span className={`${display} text-2xl font-semibold text-[#14181D]`}>
                        {link.label}
                      </span>
                    </a>
                  </motion.li>
                ))}
              </ul>

              <div className="mt-10 space-y-4">
                <a
                  href="#contact"
                  onClick={() => setOpen(false)}
                  className={`flex h-14 w-full items-center justify-center rounded-full bg-[#2B3A4A] text-base font-medium text-white ${focusRing}`}
                >
                  Prendre rendez-vous
                </a>
                <p className="text-sm text-[#55606C]">
                  05 22 00 00 00 — du lundi au samedi, 9h à 19h.
                </p>
              </div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
