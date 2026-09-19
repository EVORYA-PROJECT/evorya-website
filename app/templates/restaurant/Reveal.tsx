"use client";

import { motion, useInView, type Variants } from "motion/react";
import { useRef, useSyncExternalStore, type ReactNode } from "react";
import { useScrollDirection } from "../useScrollDirection";

const reducedMotionQuery = "(prefers-reduced-motion: reduce)";
function subscribeReducedMotion(onChange: () => void) {
  const query = window.matchMedia(reducedMotionQuery);
  query.addEventListener("change", onChange);
  return () => query.removeEventListener("change", onChange);
}
function readReducedMotion() {
  return window.matchMedia(reducedMotionQuery).matches;
}
function serverReducedMotion() {
  return false;
}
// Ces primitives changent leur structure DOM en mode réduit : le premier
// rendu client doit donc conserver celle du serveur avant de lire la préférence.
export function useReducedMotion() {
  return useSyncExternalStore(subscribeReducedMotion, readReducedMotion, serverReducedMotion);
}

/**
 * Grammaire d'apparition de la démo KRUSH.
 *
 * Cinq primitives, pas une de plus : une montée de texte, un rideau
 * (clip-path), une balayette latérale pour les photos, des lignes masquées
 * pour les très grands titres, et un conteneur en cascade. L'objectif est
 * d'avoir un vocabulaire — pas quinze variantes de fondu.
 *
 * ⚠️ Piège structurel, valable pour Unveil, Swipe et LinesUp :
 * un élément dont le PROPRE clip-path (ou translate hors overflow) le rend
 * invisible a un rectangle d'intersection nul. Un IntersectionObserver posé
 * dessus ne le voit donc JAMAIS entrer dans le cadre et l'élément reste
 * masqué pour toujours. `whileInView` est donc TOUJOURS porté par une
 * enveloppe non rognée, et les variantes descendent vers l'enfant animé.
 *
 * `data-reveal` sur l'élément animé active le filet de sécurité mobile de
 * globals.css (opacity/transform/clip-path forcés à leur état final ≤768px) :
 * si l'observer ne se déclenche jamais, le contenu reste lisible.
 *
 * Lecture en va-et-vient : toutes les primitives utilisent `once: false`.
 * L'apparition se REJOUE donc à chaque passage — en descendant comme en
 * remontant, indéfiniment. Aucune mémoire d'état (« déjà animé ») n'est
 * conservée : l'IntersectionObserver bascule les variantes et le sens du
 * scroll choisit leur état de sortie. Sous 768px le filet de sécurité ci-dessus
 * fige le contenu à son état final : le va-et-vient ne concerne donc que le
 * desktop et la tablette.
 */

export const EASE = [0.22, 0.61, 0.36, 1] as const;
export const EASE_OUT = [0.16, 1, 0.3, 1] as const;

/* ------------------------------------------------------------------ */

const riseVariants: Variants = {
  hiddenDown: { opacity: 0, y: 22 },
  hiddenUp: { opacity: 0, y: -22 },
  shown: { opacity: 1, y: 0 },
};

/** Montée douce + fondu. Le cheval de trait, pour le texte courant. */
export function Reveal({
  children,
  delay = 0,
  className,
  as = "div",
  amount = 0.2,
}: {
  children: ReactNode;
  delay?: number;
  className?: string;
  as?: "div" | "li" | "span" | "p";
  amount?: number;
}) {
  const ref = useRef(null);
  const Cmp = motion[as];
  const direction = useScrollDirection();
  const reduced = useReducedMotion();
  const inView = useInView(ref, { amount, margin: "0px 0px -8% 0px" });

  if (reduced) return <Cmp className={className}>{children}</Cmp>;

  return (
    <Cmp
      data-reveal
      ref={ref}
      className={className}
      variants={riseVariants}
      initial={direction === "down" ? "hiddenDown" : "hiddenUp"}
      animate={inView ? "shown" : direction === "down" ? "hiddenDown" : "hiddenUp"}
      transition={{ duration: 0.6, delay, ease: EASE }}
    >
      {children}
    </Cmp>
  );
}

/* ------------------------------------------------------------------ */

const unveilVariants: Variants = {
  hiddenDown: { clipPath: "inset(100% 0% 0% 0%)", scale: 1.06 },
  hiddenUp: { clipPath: "inset(0% 0% 100% 0%)", scale: 1.06 },
  shown: { clipPath: "inset(0% 0% 0% 0%)", scale: 1 },
};

/** Rideau vertical : le panneau se découvre du bas vers le haut. */
export function Unveil({
  children,
  delay = 0,
  className,
}: {
  children: ReactNode;
  delay?: number;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const direction = useScrollDirection();
  const reduced = useReducedMotion();
  const inView = useInView(ref, { amount: 0.15, margin: "0px 0px -6% 0px" });
  const state = inView ? "shown" : direction === "down" ? "hiddenDown" : "hiddenUp";

  if (reduced) return <div className={className}>{children}</div>;

  return (
    <motion.div
      ref={ref}
      className={className}
      initial={direction === "down" ? "hiddenDown" : "hiddenUp"}
      animate={state}
    >
      <motion.div
        data-reveal
        className="h-full w-full"
        variants={unveilVariants}
        transition={{ duration: 0.95, delay, ease: EASE_OUT }}
      >
        {children}
      </motion.div>
    </motion.div>
  );
}

/* ------------------------------------------------------------------ */

/** Balayette latérale : la photo se découvre d'un côté vers l'autre. */
export function Swipe({
  children,
  delay = 0,
  className,
  from = "left",
}: {
  children: ReactNode;
  delay?: number;
  className?: string;
  from?: "left" | "right";
}) {
  const ref = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();
  const inView = useInView(ref, { amount: 0.15, margin: "0px 0px -6% 0px" });
  const hiddenInset =
    from === "left" ? "inset(0% 100% 0% 0%)" : "inset(0% 0% 0% 100%)";

  if (reduced) return <div className={className}>{children}</div>;

  return (
    <motion.div
      ref={ref}
      className={className}
      initial="hidden"
      animate={inView ? "shown" : "hidden"}
    >
      <motion.div
        data-reveal
        className="h-full w-full"
        variants={{
          hidden: { clipPath: hiddenInset },
          shown: { clipPath: "inset(0% 0% 0% 0%)" },
        }}
        transition={{ duration: 0.9, delay, ease: EASE_OUT }}
      >
        {children}
      </motion.div>
    </motion.div>
  );
}

/* ------------------------------------------------------------------ */

const lineVariants: Variants = {
  /* 130 % et non 118 % : le masque est volontairement plus haut que la ligne
     (voir ci-dessous), il faut donc pousser le texte un peu plus bas pour
     qu'il en sorte complètement avant de remonter. */
  hiddenDown: { y: "130%" },
  hiddenUp: { y: "-130%" },
  shown: { y: "0%" },
};

/**
 * Très grand titre : chaque ligne monte derrière un masque. Les lignes sont
 * passées explicitement (pas de découpe automatique) pour garder un texte
 * accessible et des retours maîtrisés.
 */
export function LinesUp({
  lines,
  className,
  lineClassName,
  delay = 0,
  stagger = 0.08,
}: {
  lines: ReactNode[];
  className?: string;
  lineClassName?: string;
  delay?: number;
  stagger?: number;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const direction = useScrollDirection();
  const reduced = useReducedMotion();
  const inView = useInView(ref, { amount: 0.12, margin: "0px 0px -4% 0px" });

  if (reduced) {
    return (
      <span className={`block ${className ?? ""}`}>
        {lines.map((line, i) => (
          <span key={i} className={`block ${lineClassName ?? ""}`}>{line}</span>
        ))}
      </span>
    );
  }

  return (
    <motion.span
      ref={ref}
      className={`block ${className ?? ""}`}
      initial={direction === "down" ? "hiddenDown" : "hiddenUp"}
      animate={inView ? "shown" : direction === "down" ? "hiddenDown" : "hiddenUp"}
      /* Seuil volontairement bas : ces titres font parfois 400 px de haut, et
         un `amount` élevé les laissait masqués trop longtemps sur un scroll
         rapide (observé : un titre encore invisible alors qu'il occupait déjà
         le tiers de l'écran). */
    >
      {lines.map((line, i) => (
        /*
         * `py-[0.14em] -my-[0.14em]` : le masque `overflow-hidden` est agrandi
         * de 0,14 em en haut ET en bas, puis la marge négative annule cet
         * agrandissement dans la mise en page.
         *
         * Sans le haut, les accents des capitales (É de SMASHÉ, Û de BRÛLANT)
         * étaient tranchés net ; sans le bas, c'était la cédille du Ç de
         * « ÇA TOMBE BIEN » qui disparaissait. Un simple padding aurait
         * desserré l'interligne de tous les titres — or leur empilement
         * serré fait partie de la direction artistique.
         */
        <span key={i} className="-my-[0.14em] block overflow-hidden py-[0.14em]">
          <motion.span
            data-reveal
            className={`block ${lineClassName ?? ""}`}
            variants={lineVariants}
            transition={{ duration: 0.8, delay: delay + i * stagger, ease: EASE_OUT }}
          >
            {line}
          </motion.span>
        </span>
      ))}
    </motion.span>
  );
}

/* ------------------------------------------------------------------ */

/** Conteneur en cascade : les enfants <StaggerItem> s'enchaînent. */
export function Stagger({
  children,
  className,
  delay = 0,
  step = 0.08,
  as = "div",
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
  step?: number;
  as?: "div" | "ul" | "ol";
}) {
  const ref = useRef(null);
  const Cmp = motion[as];
  const direction = useScrollDirection();
  const reduced = useReducedMotion();
  const inView = useInView(ref, { amount: 0.15, margin: "0px 0px -6% 0px" });

  if (reduced) return <Cmp className={className}>{children}</Cmp>;

  return (
    <Cmp
      ref={ref}
      className={className}
      initial={direction === "down" ? "hiddenDown" : "hiddenUp"}
      animate={inView ? "shown" : direction === "down" ? "hiddenDown" : "hiddenUp"}
      variants={{
        hiddenDown: {},
        hiddenUp: {},
        shown: { transition: { staggerChildren: step, delayChildren: delay } },
      }}
    >
      {children}
    </Cmp>
  );
}

export function StaggerItem({
  children,
  className,
  as = "div",
}: {
  children: ReactNode;
  className?: string;
  as?: "div" | "li";
}) {
  const Cmp = motion[as];
  const reduced = useReducedMotion();

  if (reduced) return <Cmp className={className}>{children}</Cmp>;

  return (
    <Cmp
      data-reveal
      className={className}
      variants={{
        hiddenDown: {
          opacity: 0,
          y: 26,
        },
        hiddenUp: { opacity: 0, y: -26 },
        shown: { opacity: 1, y: 0, transition: { duration: 0.6, ease: EASE } },
      }}
    >
      {children}
    </Cmp>
  );
}
