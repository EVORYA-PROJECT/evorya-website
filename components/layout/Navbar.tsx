"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { NAV_LINKS, PRIMARY_CTA_LABEL } from "@/lib/config";
import MagneticButton from "@/components/ui/MagneticButton";
import MobileMenu from "@/components/layout/MobileMenu";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const triggerRef = useRef<HTMLButtonElement | null>(null);

  useEffect(() => {
    function handleScroll() {
      setScrolled(window.scrollY > 24);
    }
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-colors duration-500 ${
        scrolled
          ? "border-b border-line bg-ink/80 backdrop-blur-md"
          : "border-b border-transparent bg-transparent"
      }`}
    >
      <div className="mx-auto flex h-[72px] max-w-[1440px] items-center justify-between px-6 sm:px-8 lg:h-20 lg:px-12">
        <Link
          href="/#accueil"
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
        </Link>

        <nav className="hidden items-center gap-10 lg:flex" aria-label="Navigation principale">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="group relative font-display text-xs uppercase tracking-[0.25em] text-paper-dim/80 transition-colors hover:text-paper"
            >
              {link.label}
              <span className="absolute -bottom-2 left-0 h-px w-0 bg-paper transition-all duration-300 group-hover:w-full" />
            </Link>
          ))}
        </nav>

        <div className="hidden lg:block">
          <MagneticButton
            as="a"
            href="/#contact"
            className="inline-flex items-center border border-line-strong px-6 py-3 font-display text-xs uppercase tracking-[0.25em] text-paper transition-colors hover:border-paper"
          >
            {PRIMARY_CTA_LABEL}
          </MagneticButton>
        </div>

        <button
          ref={triggerRef}
          type="button"
          onClick={() => setOpen((v) => !v)}
          className="relative z-10 flex h-11 w-11 flex-col items-center justify-center gap-[6px] lg:hidden"
          aria-expanded={open}
          aria-controls="mobile-nav"
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

      <div id="mobile-nav">
        <MobileMenu open={open} onClose={() => setOpen(false)} triggerRef={triggerRef} />
      </div>
    </header>
  );
}
