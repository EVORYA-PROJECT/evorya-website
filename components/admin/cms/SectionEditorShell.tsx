"use client";

import { useEffect } from "react";
import Link from "next/link";
import type { ReactNode } from "react";
import type { SaveState } from "@/components/admin/cms/useSectionEditor";

type SectionEditorShellProps = {
  title: string;
  description?: string;
  dirty: boolean;
  saveState: SaveState;
  errorMessage?: string | null;
  onSave: () => void;
  children: ReactNode;
  backHref?: string | null;
  backLabel?: string;
};

const SAVE_LABELS: Record<SaveState, string> = {
  idle: "Enregistrer les modifications",
  saving: "Enregistrement…",
  saved: "Modifications enregistrées",
  error: "Une erreur est survenue",
};

export default function SectionEditorShell({
  title,
  description,
  dirty,
  saveState,
  errorMessage,
  onSave,
  children,
  backHref = "/admin/contenu",
  backLabel = "Contenu du site",
}: SectionEditorShellProps) {
  useEffect(() => {
    function handleBeforeUnload(e: BeforeUnloadEvent) {
      if (!dirty) return;
      e.preventDefault();
      e.returnValue = "";
    }
    window.addEventListener("beforeunload", handleBeforeUnload);
    return () => window.removeEventListener("beforeunload", handleBeforeUnload);
  }, [dirty]);

  return (
    <div>
      {backHref && (
        <Link
          href={backHref}
          className="font-display text-xs uppercase tracking-[0.25em] text-mist transition-colors hover:text-paper"
        >
          ← {backLabel}
        </Link>
      )}
      <h1 className={`${backHref ? "mt-3" : ""} text-2xl font-medium text-paper sm:text-3xl`}>{title}</h1>
      {description && <p className="mt-2 max-w-xl text-sm text-mist">{description}</p>}

      <div className="mt-10 flex flex-col gap-8">{children}</div>

      <div className="sticky bottom-0 mt-10 flex flex-col gap-3 border-t border-line bg-ink pb-2 pt-6 sm:flex-row sm:items-center sm:justify-between">
        <p className="min-h-[1em] text-xs text-mist" aria-live="polite">
          {dirty ? "Vous avez des modifications non enregistrées." : ""}
        </p>
        <div className="flex flex-col items-start gap-2 sm:items-end">
          {saveState === "error" && errorMessage && (
            <p className="max-w-sm text-xs text-danger">{errorMessage}</p>
          )}
          <button
            type="button"
            onClick={onSave}
            disabled={saveState === "saving" || !dirty}
            className={`inline-flex h-12 items-center justify-center px-8 font-display text-xs uppercase tracking-[0.2em] transition-colors disabled:cursor-not-allowed disabled:opacity-50 ${
              saveState === "error"
                ? "border border-danger text-danger"
                : "bg-paper text-ink"
            }`}
          >
            {SAVE_LABELS[saveState]}
          </button>
        </div>
      </div>
    </div>
  );
}
