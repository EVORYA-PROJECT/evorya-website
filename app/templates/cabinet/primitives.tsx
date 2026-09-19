"use client";

import { createContext, useContext, useRef } from "react";
import type { CSSProperties, ReactNode } from "react";
import { motion, useInView, useReducedMotion } from "motion/react";
import { C, EASE } from "./theme";
import { directionalOffset, useScrollDirection } from "../useScrollDirection";

/* -------------------------------------------------------------------------
 * Contexte de démo
 *
 * page.tsx reste un Server Component (metadata + next/font). Il transmet la
 * classe de la police display (Frank Ruhl Libre) et la hauteur du bandeau
 * Evorya, que les sections clientes lisent ici plutôt que par prop drilling.
 * ---------------------------------------------------------------------- */

type DemoContextValue = {
  /** Classe next/font à poser sur chaque h1/h2/h3. */
  displayClass: string;
  /** Hauteur du DemoBar Evorya, pour les éléments sticky. */
  barOffset: string;
};

const DemoContext = createContext<DemoContextValue>({
  displayClass: "",
  barOffset: "0px",
});

export const DemoProvider = DemoContext.Provider;

export function useDemo() {
  return useContext(DemoContext);
}

/** Raccourci : la classe display seule, utilisée sur tous les titres. */
export function useDisplay() {
  return useContext(DemoContext).displayClass;
}

/* -------------------------------------------------------------------------
 * Primitives de mouvement
 *
 * Registre volontairement étroit : montée courte, tracé de filet, ouverture
 * de bloc typographique. Rien de permanent, rien d'organique.
 * ---------------------------------------------------------------------- */

type RevealProps = {
  children: ReactNode;
  className?: string;
  style?: CSSProperties;
  delay?: number;
  /** Amplitude de la montée, en pixels. */
  y?: number;
};

/**
 * Apparition sobre au scroll. `data-reveal` active le filet de sécurité CSS
 * du projet (globals.css) : sous 768px le contenu est visible immédiatement,
 * quoi qu'il arrive côté JS.
 */
export function Reveal({ children, className, style, delay = 0, y = 14 }: RevealProps) {
  const ref = useRef<HTMLDivElement>(null);
  const direction = useScrollDirection();
  const reduced = useReducedMotion();
  const inView = useInView(ref, { amount: 0.15, margin: "0px 0px -10% 0px" });
  const hidden = { opacity: 0, y: directionalOffset(direction, y) };

  if (reduced) return <div className={className} style={style}>{children}</div>;
  return (
    <motion.div
      data-reveal
      ref={ref}
      className={className}
      style={style}
      initial={hidden}
      animate={inView ? { opacity: 1, y: 0 } : hidden}
      transition={{ duration: 0.55, delay, ease: EASE }}
    >
      {children}
    </motion.div>
  );
}

/**
 * Filet horizontal qui se trace de gauche à droite. Décoratif : c'est le
 * geste graphique récurrent du cabinet (architecture, rigueur), et il reste
 * actif sur mobile puisqu'il ne porte pas `data-reveal`.
 */
export function RuleDraw({
  className = "",
  color = C.rule,
  delay = 0,
  duration = 0.9,
}: {
  className?: string;
  color?: string;
  delay?: number;
  duration?: number;
}) {
  return (
    <motion.div
      aria-hidden="true"
      className={`h-px w-full origin-left ${className}`}
      style={{ backgroundColor: color }}
      initial={{ scaleX: 0 }}
      whileInView={{ scaleX: 1 }}
      viewport={{ once: false, margin: "-5% 0px -5% 0px" }}
      transition={{ duration, delay, ease: EASE }}
    />
  );
}

/**
 * Ouverture typographique : le texte remonte depuis un masque. Réservé aux
 * titres de section pour garder au geste sa valeur.
 */
export function MaskText({
  children,
  className = "",
  delay = 0,
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const direction = useScrollDirection();
  const reduced = useReducedMotion();
  const inView = useInView(ref, { amount: 0.15, margin: "0px 0px -8% 0px" });
  const hidden = { y: direction === "down" ? "105%" : "-105%" };

  if (reduced) return <span className={`block ${className}`}>{children}</span>;
  return (
    <span ref={ref} className="block overflow-hidden pb-[0.14em]">
      <motion.span
        data-reveal
        className={`block ${className}`}
        initial={hidden}
        animate={inView ? { y: "0%" } : hidden}
        transition={{ duration: 0.7, delay, ease: EASE }}
      >
        {children}
      </motion.span>
    </span>
  );
}

/* -------------------------------------------------------------------------
 * Éléments de mise en page récurrents
 * ---------------------------------------------------------------------- */

/** Numéro de section + intitulé, en capitales fines. */
export function SectionMark({
  index,
  label,
  tone = "light",
}: {
  index: string;
  label: string;
  tone?: "light" | "dark";
}) {
  return (
    <p className="flex items-baseline gap-3 text-[11px] uppercase tracking-[0.28em] sm:text-xs">
      <span style={{ color: C.brass }}>{index}</span>
      <span
        aria-hidden="true"
        className="h-px w-8 self-center"
        style={{ backgroundColor: tone === "dark" ? C.ruleDark : C.ruleStrong }}
      />
      <span style={{ color: tone === "dark" ? C.fog : C.slate }}>{label}</span>
    </p>
  );
}

/** Conteneur de section : gouttières constantes, largeur maîtrisée. */
export function Shell({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <div className={`mx-auto w-full max-w-[1320px] px-5 sm:px-8 lg:px-12 ${className}`}>
      {children}
    </div>
  );
}
