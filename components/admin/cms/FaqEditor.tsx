"use client";

import SectionEditorShell from "@/components/admin/cms/SectionEditorShell";
import { useSectionEditor } from "@/components/admin/cms/useSectionEditor";
import { fieldInputClass, fieldLabelClass } from "@/components/admin/cms/shared";
import type { FaqContent, FaqItemContent } from "@/lib/cms/types";

export default function FaqEditor({
  initial,
  initialUpdatedAt,
}: {
  initial: FaqContent;
  initialUpdatedAt: string | null;
}) {
  const editor = useSectionEditor("faq", initial, initialUpdatedAt);
  const items = editor.value.items;

  function updateItem(i: number, patch: Partial<FaqItemContent>) {
    editor.replace({ ...editor.value, items: items.map((item, idx) => (idx === i ? { ...item, ...patch } : item)) });
  }

  function moveItem(i: number, dir: -1 | 1) {
    const j = i + dir;
    if (j < 0 || j >= items.length) return;
    const next = [...items];
    [next[i], next[j]] = [next[j], next[i]];
    editor.replace({ ...editor.value, items: next });
  }

  function removeItem(i: number) {
    editor.replace({ ...editor.value, items: items.filter((_, idx) => idx !== i) });
  }

  function addItem() {
    editor.replace({
      ...editor.value,
      items: [...items, { question: "Nouvelle question", answer: "" }],
    });
  }

  return (
    <SectionEditorShell
      title="FAQ"
      description="Les questions/réponses affichées en accordéon avant Contact."
      dirty={editor.dirty}
      saveState={editor.saveState}
      errorMessage={editor.errorMessage}
      onSave={editor.save}
    >
      <label className={fieldLabelClass}>
        Titre de section
        <input
          value={editor.value.heading}
          onChange={(e) => editor.update({ heading: e.target.value })}
          className={fieldInputClass}
        />
      </label>
      <label className={fieldLabelClass}>
        Sous-titre
        <textarea
          rows={2}
          value={editor.value.subheading}
          onChange={(e) => editor.update({ subheading: e.target.value })}
          className={`${fieldInputClass} resize-none`}
        />
      </label>

      <div className="flex flex-col divide-y divide-line border border-line">
        {items.map((item, i) => (
          <div key={i} className="flex flex-col gap-4 p-5 sm:p-6">
            <div className="flex items-center justify-between">
              <span className="font-display text-xs uppercase tracking-[0.25em] text-mist-dim">
                Question {String(i + 1).padStart(2, "0")}
              </span>
              <div className="flex items-center gap-4">
                <button
                  type="button"
                  onClick={() => moveItem(i, -1)}
                  disabled={i === 0}
                  className="text-xs text-mist-dim transition-colors hover:text-paper disabled:opacity-30"
                  aria-label="Monter"
                >
                  ↑
                </button>
                <button
                  type="button"
                  onClick={() => moveItem(i, 1)}
                  disabled={i === items.length - 1}
                  className="text-xs text-mist-dim transition-colors hover:text-paper disabled:opacity-30"
                  aria-label="Descendre"
                >
                  ↓
                </button>
                <button
                  type="button"
                  onClick={() => removeItem(i)}
                  className="text-xs text-mist-dim transition-colors hover:text-danger"
                >
                  Supprimer
                </button>
              </div>
            </div>
            <label className={fieldLabelClass}>
              Question
              <input
                value={item.question}
                onChange={(e) => updateItem(i, { question: e.target.value })}
                className={fieldInputClass}
              />
            </label>
            <label className={fieldLabelClass}>
              Réponse
              <textarea
                rows={3}
                value={item.answer}
                onChange={(e) => updateItem(i, { answer: e.target.value })}
                className={`${fieldInputClass} resize-none`}
              />
            </label>
          </div>
        ))}
      </div>

      <button
        type="button"
        onClick={addItem}
        className="inline-flex w-fit items-center border border-line-strong px-5 py-3 font-display text-xs uppercase tracking-[0.2em] text-paper transition-colors hover:border-paper"
      >
        + Ajouter une question
      </button>
    </SectionEditorShell>
  );
}
