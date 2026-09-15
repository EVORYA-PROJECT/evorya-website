"use client";

import { useEffect, useRef } from "react";
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
 * focus (piège au Tab, restitution au déclencheur à la fermeture) et
 * Escape — le verrouillage du scroll de fond reste dans Navbar (concerne
 * aussi bien l'ouverture programmatique que le clic sur le bouton).
 */
export default function MobileMenu({ open, onClose, triggerRef }: MobileMenuProps) {
  const navRef = useRef<HTMLDivElement | null>(null);

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
      trigger?.focus();
    };
  }, [open, onClose, triggerRef]);

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          ref={navRef}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="fixed inset-0 top-[72px] z-40 flex flex-col bg-ink lg:hidden"
        >
          <nav
            className="flex flex-1 flex-col justify-center gap-1 px-6 sm:px-8"
            aria-label="Navigation mobile"
          >
            {NAV_LINKS.map((link, i) => (
              <motion.a
                key={link.href}
                href={link.href}
                onClick={onClose}
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
              onClick={onClose}
              className="flex h-14 w-full items-center justify-center bg-paper font-display text-xs uppercase tracking-[0.25em] text-ink"
            >
              {PRIMARY_CTA_LABEL}
            </a>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
