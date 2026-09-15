"use client";

import { useEffect, useRef } from "react";
import { createPortal } from "react-dom";
import { AnimatePresence, motion } from "motion/react";
import { NAV_LINKS, PRIMARY_CTA_LABEL } from "@/lib/config";

type MobileMenuProps = {
  open: boolean;
  onClose: () => void;
  triggerRef: React.RefObject<HTMLButtonElement | null>;
};

/**
 * Menu mobile plein écran : identité Evorya (index numérotés, révélation
 * typographique, lignes) plutôt qu'un menu générique. Gère lui-même le
 * focus (piège au Tab, restitution au déclencheur à la fermeture), Escape
 * et le verrouillage du scroll de fond.
 *
 * Rendu via un portal dans document.body : imbriqué dans le <header>, ce
 * composant partageait le contexte d'empilement du bandeau (dont le fond
 * devient translucide + flouté une fois la page scrollée), ce qui rendait
 * son opacité dépendante du header au lieu d'être garantie par lui-même.
 * Le portal découple entièrement le panneau du reste de l'arbre — plus
 * fiable qu'un simple ajustement de z-index.
 */
export default function MobileMenu({ open, onClose, triggerRef }: MobileMenuProps) {
  const navRef = useRef<HTMLDivElement | null>(null);
  // Position mémorisée une seule fois, à l'ouverture — jamais recalculée
  // pendant que le menu est ouvert (contrairement à window.scrollY, qui
  // peut valoir 0 une fois le body en position: fixed).
  const scrollPositionRef = useRef(0);
  // Distingue une fermeture simple (X / Escape), qui doit rendre
  // exactement la position précédente, d'un clic volontaire sur un lien
  // du menu, qui doit au contraire laisser la navigation vers la section
  // ciblée se produire sans être annulée par la restauration du scroll.
  const navigatingRef = useRef(false);

  // Verrouillage du scroll iOS-safe : figer le <body> en position: fixed
  // (plutôt que overflow: hidden sur <html>, non fiable sur Safari iOS où
  // le body derrière peut continuer à défiler en rubber-band) et restaurer
  // exactement la position de scroll à la fermeture, sans saut visuel.
  useEffect(() => {
    if (!open) return;

    scrollPositionRef.current = window.scrollY;

    const { body, documentElement } = document;
    const previousBodyStyle = {
      position: body.style.position,
      top: body.style.top,
      left: body.style.left,
      right: body.style.right,
      width: body.style.width,
    };

    body.style.position = "fixed";
    body.style.top = `-${scrollPositionRef.current}px`;
    body.style.left = "0";
    body.style.right = "0";
    body.style.width = "100%";

    return () => {
      body.style.position = previousBodyStyle.position;
      body.style.top = previousBodyStyle.top;
      body.style.left = previousBodyStyle.left;
      body.style.right = previousBodyStyle.right;
      body.style.width = previousBodyStyle.width;

      if (!navigatingRef.current) {
        // Le site définit `scroll-behavior: smooth` globalement (voir
        // globals.css) : sans ce neutralisateur temporaire, ce scrollTo
        // technique serait animé au lieu d'être instantané.
        const previousScrollBehavior = documentElement.style.scrollBehavior;
        documentElement.style.scrollBehavior = "auto";
        window.scrollTo(0, scrollPositionRef.current);
        documentElement.style.scrollBehavior = previousScrollBehavior;
      }
      navigatingRef.current = false;
    };
  }, [open]);

  useEffect(() => {
    if (!open) return;

    function handleKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape") {
        e.preventDefault();
        onClose();
        return;
      }
      if (e.key === "Tab" && navRef.current) {
        const focusable = navRef.current.querySelectorAll<HTMLElement>(
          'a[href], button:not([disabled])',
        );
        if (focusable.length === 0) return;
        const first = focusable[0];
        const last = focusable[focusable.length - 1];
        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault();
          last.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
    }

    const t = window.setTimeout(() => {
      navRef.current?.querySelector<HTMLElement>("a")?.focus();
    }, 10);

    const trigger = triggerRef.current;
    document.addEventListener("keydown", handleKeyDown);
    return () => {
      window.clearTimeout(t);
      document.removeEventListener("keydown", handleKeyDown);
      // preventScroll : le bouton déclencheur vit dans le header fixed,
      // déjà visible en permanence. Sans cette option, Safari iOS peut
      // recalculer sa mise en page juste après le retrait du
      // position: fixed du body et faire défiler la page vers le haut
      // pour "amener le bouton dans la vue" — c'était la cause du retour
      // en haut de page à la fermeture.
      trigger?.focus({ preventScroll: true });
    };
  }, [open, onClose, triggerRef]);

  function handleLinkClick() {
    navigatingRef.current = true;
    onClose();
  }

  if (typeof document === "undefined") return null;

  return createPortal(
    <AnimatePresence>
      {open && (
        <motion.div
          ref={navRef}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="fixed inset-0 z-40 flex h-dvh flex-col bg-ink lg:hidden"
        >
          <nav
            className="flex flex-1 flex-col justify-center gap-1 px-6 pt-[72px] sm:px-8"
            aria-label="Navigation mobile"
          >
            {NAV_LINKS.map((link, i) => (
              <motion.a
                key={link.href}
                href={link.href}
                onClick={handleLinkClick}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.05 * i, duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                className="group flex items-center gap-4 border-b border-line py-4 active:opacity-60"
              >
                <span className="font-display text-xs tracking-[0.2em] text-mist-dim transition-colors group-hover:text-paper">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <span className="font-display text-2xl uppercase tracking-wide text-paper sm:text-3xl">
                  {link.label}
                </span>
              </motion.a>
            ))}
          </nav>
          <div className="px-6 pb-[max(2.5rem,env(safe-area-inset-bottom))] sm:px-8">
            <a
              href="#contact"
              onClick={handleLinkClick}
              className="flex h-14 w-full items-center justify-center bg-paper font-display text-xs uppercase tracking-[0.25em] text-ink"
            >
              {PRIMARY_CTA_LABEL}
            </a>
          </div>
        </motion.div>
      )}
    </AnimatePresence>,
    document.body,
  );
}
