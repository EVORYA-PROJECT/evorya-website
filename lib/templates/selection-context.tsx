"use client";

import { createContext, useCallback, useContext, useMemo, useSyncExternalStore } from "react";
import type { ReactNode } from "react";
import { isTemplateSlug } from "@/lib/templates/registry";
import type { TemplateSlug } from "@/lib/templates/types";

const STORAGE_KEY = "evorya:template-selection";

/**
 * Petit store externe (pas du state React) : useSyncExternalStore lit ce
 * module directement, ce qui évite à la fois un rendu supplémentaire après
 * hydratation (setState dans un effet, détecté par le linter) et tout risque
 * de désynchronisation server/client — getServerSnapshot renvoie toujours
 * `null`, exactement ce que le HTML serveur a rendu.
 */
let currentSlug: TemplateSlug | null = null;
let hydrated = false;
const listeners = new Set<() => void>();

function hydrateFromStorage() {
  if (hydrated || typeof window === "undefined") return;
  hydrated = true;
  try {
    const stored = window.localStorage.getItem(STORAGE_KEY);
    if (stored && isTemplateSlug(stored)) currentSlug = stored;
    else if (stored) window.localStorage.removeItem(STORAGE_KEY);
  } catch {
    // Stockage indisponible (navigation privée, quota) : reste en mémoire
    // pour la session en cours, simplement non persisté entre visites.
  }
}

function setSlug(next: TemplateSlug | null) {
  currentSlug = next;
  try {
    if (next) window.localStorage.setItem(STORAGE_KEY, next);
    else window.localStorage.removeItem(STORAGE_KEY);
  } catch {
    // idem : pas bloquant, juste pas persisté.
  }
  listeners.forEach((listener) => listener());
}

function subscribe(listener: () => void) {
  listeners.add(listener);
  return () => listeners.delete(listener);
}

function getSnapshot() {
  hydrateFromStorage();
  return currentSlug;
}

function getServerSnapshot() {
  return null;
}

type TemplateSelectionState = {
  /** null = aucune direction sélectionnée (état par défaut, toujours valide). */
  selected: TemplateSlug | null;
  /** Sélectionne (remplace toute sélection précédente). */
  select: (slug: TemplateSlug) => void;
  /** Bascule : sélectionne si différent, désélectionne si déjà sélectionné. */
  toggle: (slug: TemplateSlug) => void;
  clear: () => void;
};

const TemplateSelectionContext = createContext<TemplateSelectionState | null>(null);

/**
 * État de sélection d'une direction Templates, partagé entre la galerie
 * (/templates et la section homepage), chaque démo (DemoBar) et le
 * formulaire Contact. Monté une seule fois dans app/layout.tsx : comme les
 * navigations entre ces routes restent côté client (next/link), ce contexte
 * ne se démonte jamais entre elles — une sélection faite dans une démo est
 * donc immédiatement visible partout ailleurs, sans passer par l'URL.
 *
 * Persisté en localStorage uniquement pour survivre à un rechargement complet
 * (ouverture directe d'une démo, navigation externe) — jamais la source de
 * vérité pendant la session, qui reste le store ci-dessus.
 */
export function TemplateSelectionProvider({ children }: { children: ReactNode }) {
  const selected = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);

  const select = useCallback((slug: TemplateSlug) => setSlug(slug), []);
  const toggle = useCallback(
    (slug: TemplateSlug) => setSlug(currentSlug === slug ? null : slug),
    [],
  );
  const clear = useCallback(() => setSlug(null), []);

  const value = useMemo(() => ({ selected, select, toggle, clear }), [selected, select, toggle, clear]);

  return (
    <TemplateSelectionContext.Provider value={value}>{children}</TemplateSelectionContext.Provider>
  );
}

export function useTemplateSelection(): TemplateSelectionState {
  const ctx = useContext(TemplateSelectionContext);
  if (!ctx) {
    throw new Error(
      "useTemplateSelection doit être utilisé sous TemplateSelectionProvider (voir app/layout.tsx).",
    );
  }
  return ctx;
}
