"use client";

import SectionEditorShell from "@/components/admin/cms/SectionEditorShell";
import { useSectionEditor } from "@/components/admin/cms/useSectionEditor";
import { fieldInputClass, fieldLabelClass } from "@/components/admin/cms/shared";
import type { TransparencyContent, TransparencyPointContent } from "@/lib/cms/types";

export default function TransparencyEditor({
  initial,
  initialUpdatedAt,
}: {
  initial: TransparencyContent;
  initialUpdatedAt: string | null;
}) {
  const editor = useSectionEditor("transparency", initial, initialUpdatedAt);

  function updatePoint(i: number, patch: Partial<TransparencyPointContent>) {
    editor.replace({
      ...editor.value,
      points: editor.value.points.map((p, idx) => (idx === i ? { ...p, ...patch } : p)),
    });
  }

  return (
    <SectionEditorShell
      title="Transparence"
      description="Les 4 points affichés dans la section Transparence — la structure à 4 blocs reste fixe."
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

      <div className="grid gap-6 sm:grid-cols-2">
        {editor.value.points.map((point, i) => (
          <div key={point.index} className="flex flex-col gap-4 border border-line p-5">
            <span className="font-display text-xs uppercase tracking-[0.25em] text-mist-dim">
              Point {point.index}
            </span>
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
                rows={3}
                value={point.description}
                onChange={(e) => updatePoint(i, { description: e.target.value })}
                className={`${fieldInputClass} resize-none`}
              />
            </label>
          </div>
        ))}
      </div>

      <label className={fieldLabelClass}>
        Phrase de conclusion
        <textarea
          rows={2}
          value={editor.value.footnote}
          onChange={(e) => editor.update({ footnote: e.target.value })}
          className={`${fieldInputClass} resize-none`}
        />
      </label>
    </SectionEditorShell>
  );
}
