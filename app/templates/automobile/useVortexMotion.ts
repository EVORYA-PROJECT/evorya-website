"use client";

import { useRef, useSyncExternalStore, type RefObject } from "react";
import { useInView } from "motion/react";

const COMPACT_QUERY = "(max-width: 768px)";

function subscribeCompact(onChange: () => void) {
  const mql = window.matchMedia(COMPACT_QUERY);
  mql.addEventListener("change", onChange);
  return () => mql.removeEventListener("change", onChange);
}

function getCompactSnapshot() {
  return window.matchMedia(COMPACT_QUERY).matches;
}

function getCompactServerSnapshot() {
  return false;
}

/**
 * Vrai sur mobile/petite tablette. Le rendu serveur renvoie toujours `false`
 * puis le client se synchronise après hydratation : aucune désynchronisation.
 */
export function useCompact(): boolean {
  return useSyncExternalStore(subscribeCompact, getCompactSnapshot, getCompactServerSnapshot);
}

/**
 * Déclencheur d'animation : au scroll sur desktop, au montage sur mobile.
 * Sur mobile, certains navigateurs ne déclenchent jamais l'IntersectionObserver
 * et laisseraient les tracés SVG figés à pathLength 0 — d'où le raccourci.
 */
export function usePlay<T extends Element>(
  amount: number = 0.25,
): [RefObject<T | null>, boolean] {
  const ref = useRef<T | null>(null);
  const inView = useInView(ref, { once: false, amount });
  const compact = useCompact();
  return [ref, compact || inView];
}
