"use client";

import SectionEditorShell from "@/components/admin/cms/SectionEditorShell";
import { useSectionEditor } from "@/components/admin/cms/useSectionEditor";
import { fieldInputClass, fieldLabelClass } from "@/components/admin/cms/shared";
import type { ProcessContent, ProcessStepContent } from "@/lib/cms/types";

export default function ProcessEditor({
  initial,
  initialUpdatedAt,
}: {
  initial: ProcessContent;
  initialUpdatedAt: string | null;
}) {
  const editor = useSectionEditor("process", initial, initialUpdatedAt);

  function updateStep(i: number, patch: Partial<ProcessStepContent>) {
    editor.replace({
      ...editor.value,
      steps: editor.value.steps.map((s, idx) => (idx === i ? { ...s, ...patch } : s)),
    });
  }

  return (
    <SectionEditorShell
      title="Processus"
      description="Les 4 étapes affichées dans la section Processus — la structure à 4 étapes reste fixe."
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

      <div className="grid gap-6 sm:grid-cols-2">
        {editor.value.steps.map((step, i) => (
          <div key={step.index} className="flex flex-col gap-4 border border-line p-5">
            <span className="font-display text-xs uppercase tracking-[0.25em] text-mist-dim">
              Étape {step.index}
            </span>
            <label className={fieldLabelClass}>
              Titre
              <input
                value={step.title}
                onChange={(e) => updateStep(i, { title: e.target.value })}
                className={fieldInputClass}
              />
            </label>
            <label className={fieldLabelClass}>
              Description
              <textarea
                rows={3}
                value={step.description}
                onChange={(e) => updateStep(i, { description: e.target.value })}
                className={`${fieldInputClass} resize-none`}
              />
            </label>
          </div>
        ))}
      </div>
    </SectionEditorShell>
  );
}
