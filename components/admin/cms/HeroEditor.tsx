"use client";

import SectionEditorShell from "@/components/admin/cms/SectionEditorShell";
import { useSectionEditor } from "@/components/admin/cms/useSectionEditor";
import { fieldInputClass, fieldLabelClass } from "@/components/admin/cms/shared";
import type { HeroContent } from "@/lib/cms/types";

export default function HeroEditor({
  initial,
  initialUpdatedAt,
}: {
  initial: HeroContent;
  initialUpdatedAt: string | null;
}) {
  const editor = useSectionEditor("hero", initial, initialUpdatedAt);

  return (
    <SectionEditorShell
      title="Hero"
      description="Le premier écran du site public."
      dirty={editor.dirty}
      saveState={editor.saveState}
      errorMessage={editor.errorMessage}
      onSave={editor.save}
    >
      <label className={fieldLabelClass}>
        Titre principal
        <textarea
          rows={2}
          value={editor.value.title}
          onChange={(e) => editor.update({ title: e.target.value })}
          className={`${fieldInputClass} resize-none`}
        />
      </label>

      <label className={fieldLabelClass}>
        Sous-titre
        <textarea
          rows={3}
          value={editor.value.subtitle}
          onChange={(e) => editor.update({ subtitle: e.target.value })}
          className={`${fieldInputClass} resize-none`}
        />
      </label>

      <div className="grid gap-6 sm:grid-cols-2">
        <label className={fieldLabelClass}>
          Bouton principal
          <input
            value={editor.value.ctaPrimary}
            onChange={(e) => editor.update({ ctaPrimary: e.target.value })}
            className={fieldInputClass}
          />
        </label>
        <label className={fieldLabelClass}>
          Bouton secondaire
          <input
            value={editor.value.ctaSecondary}
            onChange={(e) => editor.update({ ctaSecondary: e.target.value })}
            className={fieldInputClass}
          />
        </label>
      </div>
    </SectionEditorShell>
  );
}
