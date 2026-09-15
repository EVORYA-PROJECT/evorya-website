"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { PRIMARY_CTA_LABEL } from "@/lib/config";

/**
 * CTA persistant mobile : discret, jamais au-dessus du Hero (le CTA
 * principal y est déjà visible), jamais au-dessus de Contact (le
 * formulaire ne doit jamais être masqué). N'apparaît qu'entre les deux.
 * Respecte prefers-reduced-motion via MotionConfig (voir app/page.tsx) et
 * safe-area-inset-bottom pour les iPhone à encoche/barre d'accueil.
 */
export default function MobileCTA() {
  const [pastHero, setPastHero] = useState(false);
  const [inContact, setInContact] = useState(false);

  useEffect(() => {
    const hero = document.getElementById("accueil");
    const contact = document.getElementById("contact");
    if (!hero || !contact) return;

    const heroObserver = new IntersectionObserver(
      ([entry]) => setPastHero(!entry.isIntersecting),
      { rootMargin: "0px 0px -85% 0px" },
    );
    const contactObserver = new IntersectionObserver(([entry]) => setInContact(entry.isIntersecting), {
      rootMargin: "0px",
      threshold: 0.05,
    });

    heroObserver.observe(hero);
    contactObserver.observe(contact);
    return () => {
      heroObserver.disconnect();
      contactObserver.disconnect();
    };
  }, []);

  const visible = pastHero && !inContact;

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ y: 96, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 96, opacity: 0 }}
          transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
          className="pointer-events-none fixed inset-x-0 bottom-0 z-30 px-4 pb-[max(1rem,env(safe-area-inset-bottom))] lg:hidden"
        >
          {/*
            Le conteneur fixe capte les taps sur toute sa largeur même sans
            fond visible (une <div> occupe sa boîte pour les événements
            pointeur). Sans pointer-events-none ici, la marge autour du
            bouton — voire tout contenu qui défile sous cette bande basse,
            par ex. l'accordéon "Voir les conditions du programme" plus haut
            dans la page — intercepterait le tap à la place de l'élément
            réellement visible sous le doigt. Seul le bouton lui-même doit
            rester cliquable.
          */}
          <a
            href="#contact"
            className="pointer-events-auto flex h-[3.25rem] items-center justify-center gap-2 border border-line-strong bg-ink/95 px-6 font-display text-xs uppercase tracking-[0.2em] text-paper shadow-[0_12px_32px_-8px_rgba(0,0,0,0.6)] backdrop-blur-md active:opacity-70"
          >
            {PRIMARY_CTA_LABEL}
          </a>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
