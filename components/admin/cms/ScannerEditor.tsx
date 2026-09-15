"use client";

import SectionEditorShell from "@/components/admin/cms/SectionEditorShell";
import { useSectionEditor } from "@/components/admin/cms/useSectionEditor";
import { fieldInputClass, fieldLabelClass } from "@/components/admin/cms/shared";
import type { ScannerContent, ScanStepContent } from "@/lib/cms/types";

export default function ScannerEditor({
  initial,
  initialUpdatedAt,
}: {
  initial: ScannerContent;
  initialUpdatedAt: string | null;
}) {
  const editor = useSectionEditor("scanner", initial, initialUpdatedAt);
  const steps = editor.value.steps;

  function updateStep(i: number, patch: Partial<ScanStepContent>) {
    editor.replace({ ...editor.value, steps: steps.map((s, idx) => (idx === i ? { ...s, ...patch } : s)) });
  }

  return (
    <SectionEditorShell
      title="Project Scanner"
      description="La mise en scène de la méthode Evorya, juste avant Contact — la structure à 5 étapes reste fixe."
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
        {steps.map((step, i) => (
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
              Micro-description
              <textarea
                rows={2}
                value={step.description}
                onChange={(e) => updateStep(i, { description: e.target.value })}
                className={`${fieldInputClass} resize-none`}
              />
            </label>
          </div>
        ))}
      </div>

      <label className={fieldLabelClass}>
        Titre final
        <input
          value={editor.value.finalHeading}
          onChange={(e) => editor.update({ finalHeading: e.target.value })}
          className={fieldInputClass}
        />
      </label>
      <label className={fieldLabelClass}>
        Phrase de conclusion
        <textarea
          rows={2}
          value={editor.value.finalTagline}
          onChange={(e) => editor.update({ finalTagline: e.target.value })}
          className={`${fieldInputClass} resize-none`}
        />
      </label>
      <label className={fieldLabelClass}>
        Libellé du CTA
        <input
          value={editor.value.ctaLabel}
          onChange={(e) => editor.update({ ctaLabel: e.target.value })}
          className={fieldInputClass}
        />
      </label>
      <label className={fieldLabelClass}>
        Titre de transition vers le Project Matcher
        <input
          value={editor.value.matcherHeading}
          onChange={(e) => editor.update({ matcherHeading: e.target.value })}
          className={fieldInputClass}
        />
      </label>
      <label className={fieldLabelClass}>
        Libellé du CTA du Project Matcher
        <input
          value={editor.value.matcherCta}
          onChange={(e) => editor.update({ matcherCta: e.target.value })}
          className={fieldInputClass}
        />
      </label>
    </SectionEditorShell>
  );
}
