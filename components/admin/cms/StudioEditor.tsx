"use client";

import SectionEditorShell from "@/components/admin/cms/SectionEditorShell";
import { useSectionEditor } from "@/components/admin/cms/useSectionEditor";
import { fieldInputClass, fieldLabelClass } from "@/components/admin/cms/shared";
import type { StudioContent } from "@/lib/cms/types";

export default function StudioEditor({
  initial,
  initialUpdatedAt,
}: {
  initial: StudioContent;
  initialUpdatedAt: string | null;
}) {
  const editor = useSectionEditor("studio", initial, initialUpdatedAt);

  return (
    <SectionEditorShell
      title="Studio"
      description="Le texte de présentation d'Evorya (section 01)."
      dirty={editor.dirty}
      saveState={editor.saveState}
      errorMessage={editor.errorMessage}
      onSave={editor.save}
    >
      <label className={fieldLabelClass}>
        Phrase d&rsquo;introduction
        <textarea
          rows={2}
          value={editor.value.lead}
          onChange={(e) => editor.update({ lead: e.target.value })}
          className={`${fieldInputClass} resize-none`}
        />
      </label>

      <label className={fieldLabelClass}>
        Texte complémentaire
        <textarea
          rows={3}
          value={editor.value.body}
          onChange={(e) => editor.update({ body: e.target.value })}
          className={`${fieldInputClass} resize-none`}
        />
      </label>

      <label className={fieldLabelClass}>
        Mention encadrée
        <input
          value={editor.value.tag}
          onChange={(e) => editor.update({ tag: e.target.value })}
          className={fieldInputClass}
        />
      </label>
    </SectionEditorShell>
  );
}
