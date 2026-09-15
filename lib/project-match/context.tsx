"use client";

import { createContext, useCallback, useContext, useMemo, useState } from "react";
import type { ReactNode } from "react";
import type { MatcherOfferId } from "@/lib/project-match/data";

type Selection = {
  offerId: MatcherOfferId;
  /** Incrémenté à chaque sélection pour que Contact puisse détecter une
   * nouvelle demande même si la même offre est choisie deux fois de suite. */
  token: number;
  prefillMessage?: string;
};

type ProjectMatchState = {
  selection: Selection | null;
  /** Sélectionne une offre pour synchroniser Offers (onglet mobile) et Contact. */
  selectOffer: (offerId: MatcherOfferId, prefillMessage?: string) => void;
};

const ProjectMatchContext = createContext<ProjectMatchState | null>(null);

/**
 * État partagé minimal entre Project Matcher, Offers et Contact — évite
 * deux sources de vérité indépendantes pour "quelle offre est sélectionnée".
 * Reste entièrement côté client, non persisté, aucune donnée envoyée à
 * Supabase à ce stade (voir components/sections/ProjectMatcher.tsx).
 */
export function ProjectMatchProvider({ children }: { children: ReactNode }) {
  const [selection, setSelection] = useState<Selection | null>(null);

  const selectOffer = useCallback((offerId: MatcherOfferId, prefillMessage?: string) => {
    setSelection((prev) => ({ offerId, prefillMessage, token: (prev?.token ?? 0) + 1 }));
  }, []);

  const value = useMemo(() => ({ selection, selectOffer }), [selection, selectOffer]);

  return <ProjectMatchContext.Provider value={value}>{children}</ProjectMatchContext.Provider>;
}

export function useProjectMatch(): ProjectMatchState {
  const ctx = useContext(ProjectMatchContext);
  if (!ctx) {
    throw new Error("useProjectMatch doit être utilisé sous ProjectMatchProvider (voir app/page.tsx).");
  }
  return ctx;
}
