"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion } from "motion/react";
import { NAV_LINKS } from "@/lib/config";
import MagneticButton from "@/components/ui/MagneticButton";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    function handleScroll() {
      setScrolled(window.scrollY > 24);
    }
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    document.documentElement.style.overflow = open ? "hidden" : "";
    return () => {
      document.documentElement.style.overflow = "";
    };
  }, [open]);

  function handleNavigate() {
    setOpen(false);
  }

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-colors duration-500 ${
        scrolled
          ? "border-b border-line bg-ink/80 backdrop-blur-md"
          : "border-b border-transparent bg-transparent"
      }`}
    >
      <div className="mx-auto flex h-[72px] max-w-[1440px] items-center justify-between px-6 sm:px-8 lg:h-20 lg:px-12">
        <a
          href="#accueil"
          className="relative flex items-center gap-3 py-1"
          aria-label="Evorya Project — retour à l'accueil"
        >
          {/*
            Le fichier source contient une large marge transparente au-dessus
            et en dessous du symbole (~20% de chaque côté). On recadre donc le
            rendu sur le contenu réel via object-cover plutôt que d'agrandir
            la navbar : le fichier logo lui-même reste intact et inchangé.
          */}
          <span className="relative block aspect-[1781/479] h-9 sm:h-10 lg:h-14">
            <Image
              src="/evorya-logo.png"
              alt="Evorya Project"
              fill
              sizes="240px"
              loading="eager"
              className="object-cover"
            />
          </span>
        </a>

        <nav className="hidden items-center gap-10 lg:flex" aria-label="Navigation principale">
          {NAV_LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="group relative font-display text-xs uppercase tracking-[0.25em] text-paper-dim/80 transition-colors hover:text-paper"
            >
              {link.label}
              <span className="absolute -bottom-2 left-0 h-px w-0 bg-paper transition-all duration-300 group-hover:w-full" />
            </a>
          ))}
        </nav>

        <div className="hidden lg:block">
          <MagneticButton
            as="a"
            href="#contact"
            className="inline-flex items-center border border-line-strong px-6 py-3 font-display text-xs uppercase tracking-[0.25em] text-paper transition-colors hover:border-paper"
          >
            Démarrer un projet
          </MagneticButton>
        </div>

        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          className="relative z-10 flex h-11 w-11 flex-col items-center justify-center gap-[6px] lg:hidden"
          aria-expanded={open}
          aria-label={open ? "Fermer le menu" : "Ouvrir le menu"}
        >
          <span
            className={`h-px w-6 bg-paper transition-transform duration-300 ${
              open ? "translate-y-[3.5px] rotate-45" : ""
            }`}
          />
          <span
            className={`h-px w-6 bg-paper transition-transform duration-300 ${
              open ? "-translate-y-[3.5px] -rotate-45" : ""
            }`}
          />
        </button>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 top-[72px] z-40 flex flex-col bg-ink lg:hidden"
          >
            <nav
              className="flex flex-1 flex-col justify-center gap-2 px-8"
              aria-label="Navigation mobile"
            >
              {NAV_LINKS.map((link, i) => (
                <motion.a
                  key={link.href}
                  href={link.href}
                  onClick={handleNavigate}
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.06 * i, duration: 0.4 }}
                  className="border-b border-line py-5 font-display text-3xl uppercase tracking-wide text-paper active:opacity-60"
                >
                  {link.label}
                </motion.a>
              ))}
            </nav>
            <div className="px-8 pb-10">
              <a
                href="#contact"
                onClick={handleNavigate}
                className="flex h-14 w-full items-center justify-center bg-paper font-display text-xs uppercase tracking-[0.25em] text-ink"
              >
                Démarrer un projet
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
