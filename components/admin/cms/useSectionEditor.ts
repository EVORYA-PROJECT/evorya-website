"use client";

import { useState } from "react";
import { updateSiteContentSection } from "@/lib/cms/actions";
import type { SiteContentMap, SiteContentSection } from "@/lib/cms/types";

export type SaveState = "idle" | "saving" | "saved" | "error";

/**
 * État + logique communs à tous les éditeurs de section (Hero, Studio,
 * Services, Transparence, Processus, Contact, Footer, First10) : les
 * éditeurs renvoient toujours l'objet complet de la section, jamais un patch
 * partiel — plus simple et sans ambiguïté côté serveur (voir
 * lib/cms/actions.ts::updateSiteContentSection).
 */
export function useSectionEditor<K extends SiteContentSection>(
  section: K,
  initial: SiteContentMap[K],
  initialUpdatedAt: string | null,
) {
  const [value, setValue] = useState<SiteContentMap[K]>(initial);
  const [updatedAt, setUpdatedAt] = useState<string | null>(initialUpdatedAt);
  const [dirty, setDirty] = useState(false);
  const [saveState, setSaveState] = useState<SaveState>("idle");
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  function replace(next: SiteContentMap[K]) {
    setValue(next);
    setDirty(true);
    setSaveState("idle");
  }

  function update(patch: Partial<SiteContentMap[K]>) {
    replace({ ...value, ...patch });
  }

  async function save() {
    setSaveState("saving");
    setErrorMessage(null);
    const result = await updateSiteContentSection(section, value, updatedAt);
    if (result.ok) {
      setSaveState("saved");
      setDirty(false);
      if (result.updatedAt) setUpdatedAt(result.updatedAt);
    } else {
      setSaveState("error");
      setErrorMessage(result.error);
    }
  }

  return { value, update, replace, dirty, saveState, errorMessage, save };
}
