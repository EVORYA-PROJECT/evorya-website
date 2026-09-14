"use client";

import SectionEditorShell from "@/components/admin/cms/SectionEditorShell";
import { useSectionEditor } from "@/components/admin/cms/useSectionEditor";
import { fieldInputClass, fieldLabelClass } from "@/components/admin/cms/shared";
import type { First10Content } from "@/lib/cms/types";

export default function First10Editor({
  initial,
  initialUpdatedAt,
}: {
  initial: First10Content;
  initialUpdatedAt: string | null;
}) {
  const editor = useSectionEditor("first10", initial, initialUpdatedAt);
  const isClosed = editor.value.status === "closed";

  function clampCurrent(value: number) {
    return Math.max(0, Math.min(editor.value.total, value));
  }

  return (
    <SectionEditorShell
      title="Evorya First 10"
      description="Compteur, statut et textes du programme de lancement."
      dirty={editor.dirty}
      saveState={editor.saveState}
      errorMessage={editor.errorMessage}
      onSave={editor.save}
      backHref={null}
    >
      <div>
        <span className="font-display text-xs uppercase tracking-[0.25em] text-mist-dim">
          Statut du programme
        </span>
        <div className="mt-3 flex gap-3">
          <button
            type="button"
            onClick={() => editor.update({ status: "open" })}
            className={`inline-flex h-11 items-center border px-5 font-display text-xs uppercase tracking-[0.2em] transition-colors ${
              !isClosed ? "border-paper bg-paper text-ink" : "border-line-strong text-paper-dim"
            }`}
          >
            Programme ouvert
          </button>
          <button
            type="button"
            onClick={() => editor.update({ status: "closed" })}
            className={`inline-flex h-11 items-center border px-5 font-display text-xs uppercase tracking-[0.2em] transition-colors ${
              isClosed ? "border-paper bg-paper text-ink" : "border-line-strong text-paper-dim"
            }`}
          >
            Programme complet
          </button>
        </div>
      </div>

      <div className="grid gap-6 sm:grid-cols-2">
        <label className={fieldLabelClass}>
          Projets attribués (compteur affiché)
          <input
            type="number"
            min={0}
            max={editor.value.total}
            value={editor.value.current}
            onChange={(e) => editor.update({ current: clampCurrent(Number(e.target.value) || 0) })}
            className={fieldInputClass}
          />
        </label>
        <label className={fieldLabelClass}>
          Nombre total de places
          <input
            type="number"
            min={1}
            value={editor.value.total}
            onChange={(e) => {
              const total = Math.max(1, Number(e.target.value) || 1);
              editor.replace({
                ...editor.value,
                total,
                current: Math.min(editor.value.current, total),
              });
            }}
            className={fieldInputClass}
          />
        </label>
      </div>

      <label className={fieldLabelClass}>
        Titre de section
        <input
          value={editor.value.title}
          onChange={(e) => editor.update({ title: e.target.value })}
          className={fieldInputClass}
        />
      </label>
      <label className={fieldLabelClass}>
        Texte 1
        <textarea
          rows={2}
          value={editor.value.text1}
          onChange={(e) => editor.update({ text1: e.target.value })}
          className={`${fieldInputClass} resize-none`}
        />
      </label>
      <label className={fieldLabelClass}>
        Texte 2
        <textarea
          rows={2}
          value={editor.value.text2}
          onChange={(e) => editor.update({ text2: e.target.value })}
          className={`${fieldInputClass} resize-none`}
        />
      </label>
      <label className={fieldLabelClass}>
        Note sur les frais externes (1)
        <textarea
          rows={2}
          value={editor.value.feesNote1}
          onChange={(e) => editor.update({ feesNote1: e.target.value })}
          className={`${fieldInputClass} resize-none`}
        />
      </label>
      <label className={fieldLabelClass}>
        Note sur les frais externes (2)
        <textarea
          rows={2}
          value={editor.value.feesNote2}
          onChange={(e) => editor.update({ feesNote2: e.target.value })}
          className={`${fieldInputClass} resize-none`}
        />
      </label>
    </SectionEditorShell>
  );
}
