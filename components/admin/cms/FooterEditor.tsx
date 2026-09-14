"use client";

import SectionEditorShell from "@/components/admin/cms/SectionEditorShell";
import { useSectionEditor } from "@/components/admin/cms/useSectionEditor";
import { fieldInputClass, fieldLabelClass } from "@/components/admin/cms/shared";
import type { FooterContent } from "@/lib/cms/types";

export default function FooterEditor({
  initial,
  initialUpdatedAt,
}: {
  initial: FooterContent;
  initialUpdatedAt: string | null;
}) {
  const editor = useSectionEditor("footer", initial, initialUpdatedAt);

  return (
    <SectionEditorShell
      title="Footer"
      description="Les textes affichés dans le pied de page."
      dirty={editor.dirty}
      saveState={editor.saveState}
      errorMessage={editor.errorMessage}
      onSave={editor.save}
    >
      <label className={fieldLabelClass}>
        Accroche
        <input
          value={editor.value.tagline}
          onChange={(e) => editor.update({ tagline: e.target.value })}
          className={fieldInputClass}
        />
      </label>
      <label className={fieldLabelClass}>
        Localisation
        <input
          value={editor.value.location}
          onChange={(e) => editor.update({ location: e.target.value })}
          className={fieldInputClass}
        />
      </label>
    </SectionEditorShell>
  );
}
