"use client";

import SectionEditorShell from "@/components/admin/cms/SectionEditorShell";
import { useSectionEditor } from "@/components/admin/cms/useSectionEditor";
import { fieldInputClass, fieldLabelClass } from "@/components/admin/cms/shared";
import type { ContactContent } from "@/lib/cms/types";

export default function ContactEditor({
  initial,
  initialUpdatedAt,
}: {
  initial: ContactContent;
  initialUpdatedAt: string | null;
}) {
  const editor = useSectionEditor("contact", initial, initialUpdatedAt);

  return (
    <SectionEditorShell
      title="Contact"
      description="Les textes d'introduction du formulaire de contact."
      dirty={editor.dirty}
      saveState={editor.saveState}
      errorMessage={editor.errorMessage}
      onSave={editor.save}
    >
      <label className={fieldLabelClass}>
        Titre
        <textarea
          rows={2}
          value={editor.value.heading}
          onChange={(e) => editor.update({ heading: e.target.value })}
          className={`${fieldInputClass} resize-none`}
        />
      </label>
      <label className={fieldLabelClass}>
        Sous-titre
        <textarea
          rows={3}
          value={editor.value.subheading}
          onChange={(e) => editor.update({ subheading: e.target.value })}
          className={`${fieldInputClass} resize-none`}
        />
      </label>
      <label className={fieldLabelClass}>
        Texte au-dessus de l&rsquo;email
        <input
          value={editor.value.directLine}
          onChange={(e) => editor.update({ directLine: e.target.value })}
          className={fieldInputClass}
        />
      </label>
      <label className={fieldLabelClass}>
        Email public affiché
        <input
          type="email"
          value={editor.value.email}
          onChange={(e) => editor.update({ email: e.target.value })}
          className={fieldInputClass}
        />
      </label>
    </SectionEditorShell>
  );
}
