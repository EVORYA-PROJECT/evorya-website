"use client";

import SectionEditorShell from "@/components/admin/cms/SectionEditorShell";
import { useSectionEditor } from "@/components/admin/cms/useSectionEditor";
import { fieldInputClass, fieldLabelClass } from "@/components/admin/cms/shared";
import type { WhyContent, WhyPointContent } from "@/lib/cms/types";

function reindex(points: WhyPointContent[]): WhyPointContent[] {
  return points.map((point, i) => ({ ...point, index: String(i + 1).padStart(2, "0") }));
}

export default function WhyEditor({
  initial,
  initialUpdatedAt,
}: {
  initial: WhyContent;
  initialUpdatedAt: string | null;
}) {
  const editor = useSectionEditor("why", initial, initialUpdatedAt);
  const points = editor.value.points;

  function updatePoint(i: number, patch: Partial<WhyPointContent>) {
    editor.replace({ ...editor.value, points: points.map((p, idx) => (idx === i ? { ...p, ...patch } : p)) });
  }

  function moveItem(i: number, dir: -1 | 1) {
    const j = i + dir;
    if (j < 0 || j >= points.length) return;
    const next = [...points];
    [next[i], next[j]] = [next[j], next[i]];
    editor.replace({ ...editor.value, points: reindex(next) });
  }

  function removeItem(i: number) {
    editor.replace({ ...editor.value, points: reindex(points.filter((_, idx) => idx !== i)) });
  }

  function addItem() {
    editor.replace({
      ...editor.value,
      points: reindex([...points, { index: "", title: "Nouveau point", description: "" }]),
    });
  }

  return (
    <SectionEditorShell
      title="Pourquoi Evorya"
      description="La section de transition commerciale entre les services et les offres."
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
        {points.map((point, i) => (
          <div key={i} className="flex flex-col gap-4 p-5 sm:p-6">
            <div className="flex items-center justify-between">
              <span className="font-display text-xs uppercase tracking-[0.25em] text-mist-dim">
                Point {point.index}
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
                  disabled={i === points.length - 1}
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
              Titre
              <input
                value={point.title}
                onChange={(e) => updatePoint(i, { title: e.target.value })}
                className={fieldInputClass}
              />
            </label>
            <label className={fieldLabelClass}>
              Description
              <textarea
                rows={2}
                value={point.description}
                onChange={(e) => updatePoint(i, { description: e.target.value })}
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
        + Ajouter un point
      </button>
    </SectionEditorShell>
  );
}
