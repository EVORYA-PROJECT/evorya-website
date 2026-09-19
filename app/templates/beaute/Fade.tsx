"use client";

import { useRef, useSyncExternalStore } from "react";
import { motion, useInView } from "motion/react";
import type { ReactNode } from "react";
import { directionalOffset, useScrollDirection } from "../useScrollDirection";

/**
 * Apparition volontairement plus lente que sur le site Evorya : la direction
 * de cette démo repose sur un rythme calme, donc une durée longue, une courbe
 * très amortie et un déplacement court (rien ne doit « arriver » brusquement).
 *
 * Comme sur le reste du site, l'attribut data-reveal sert de filet de
 * sécurité : en dessous de 768px, globals.css force opacity/transform, donc le
 * contenu reste lisible même si l'IntersectionObserver ou l'hydratation
 * échoue. En dessous de ce même seuil on n'utilise pas whileInView.
 */
const COMPACT_QUERY = "(max-width: 768px)";

function subscribeCompact(onChange: () => void) {
  const query = window.matchMedia(COMPACT_QUERY);
  query.addEventListener("change", onChange);
  return () => query.removeEventListener("change", onChange);
}

function getCompactSnapshot() {
  return window.matchMedia(COMPACT_QUERY).matches;
}

function getCompactServerSnapshot() {
  return false;
}

const EASE = [0.22, 0.61, 0.36, 1] as const;

type FadeProps = {
  children: ReactNode;
  className?: string;
  delay?: number;
  /** Déplacement vertical initial, en px. */
  y?: number;
  /** Légère mise à l'échelle initiale, pour les panneaux visuels. */
  scale?: number;
  duration?: number;
};

export default function Fade({
  children,
  className,
  delay = 0,
  y = 18,
  scale,
  duration = 1.2,
}: FadeProps) {
  const ref = useRef<HTMLDivElement>(null);
  const isCompact = useSyncExternalStore(
    subscribeCompact,
    getCompactSnapshot,
    getCompactServerSnapshot,
  );
  const direction = useScrollDirection();
  const inView = useInView(ref, { amount: 0.15, margin: "0px 0px -12% 0px" });

  const from = {
    opacity: 0,
    y: directionalOffset(direction, y),
    ...(scale === undefined ? {} : { scale }),
  };
  const to = { opacity: 1, y: 0, ...(scale === undefined ? {} : { scale: 1 }) };
  const transition = { duration, delay, ease: EASE };

  if (isCompact) {
    return (
      <motion.div
        data-reveal
        className={className}
        initial={from}
        animate={to}
        transition={transition}
      >
        {children}
      </motion.div>
    );
  }

  return (
    <motion.div
      data-reveal
      ref={ref}
      className={className}
      initial={from}
      animate={inView ? to : from}
      transition={transition}
    >
      {children}
    </motion.div>
  );
}

export function PhotoReveal({
  children,
  className,
  delay = 0,
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const direction = useScrollDirection();
  const inView = useInView(ref, { amount: 0.18, margin: "0px 0px -8% 0px" });
  const hidden = {
    clipPath: direction === "down" ? "inset(9% 0% 0% 0%)" : "inset(0% 0% 9% 0%)",
    opacity: 0.35,
    scale: 1.025,
  };

  return (
    <div ref={ref} className={className}>
      <motion.div
        data-reveal
        className="h-full w-full"
        initial={hidden}
        animate={
          inView
            ? { clipPath: "inset(0% 0% 0% 0%)", opacity: 1, scale: 1 }
            : hidden
        }
        transition={{ duration: 1.1, delay, ease: EASE }}
      >
        {children}
      </motion.div>
    </div>
  );
}
