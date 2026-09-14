"use client";

import SectionEditorShell from "@/components/admin/cms/SectionEditorShell";
import { useSectionEditor } from "@/components/admin/cms/useSectionEditor";
import { fieldInputClass, fieldLabelClass } from "@/components/admin/cms/shared";
import type { ServiceItemContent, ServicesContent } from "@/lib/cms/types";

function reindex(items: ServiceItemContent[]): ServiceItemContent[] {
  return items.map((item, i) => ({ ...item, index: String(i + 1).padStart(2, "0") }));
}

export default function ServicesEditor({
  initial,
  initialUpdatedAt,
}: {
  initial: ServicesContent;
  initialUpdatedAt: string | null;
}) {
  const editor = useSectionEditor("services", initial, initialUpdatedAt);
  const items = editor.value.items;

  function updateItem(i: number, patch: Partial<ServiceItemContent>) {
    editor.replace({
      ...editor.value,
      items: items.map((item, idx) => (idx === i ? { ...item, ...patch } : item)),
    });
  }

  function moveItem(i: number, dir: -1 | 1) {
    const j = i + dir;
    if (j < 0 || j >= items.length) return;
    const next = [...items];
    [next[i], next[j]] = [next[j], next[i]];
    editor.replace({ ...editor.value, items: reindex(next) });
  }

  function removeItem(i: number) {
    editor.replace({ ...editor.value, items: reindex(items.filter((_, idx) => idx !== i)) });
  }

  function addItem() {
    editor.replace({
      ...editor.value,
      items: reindex([...items, { index: "", title: "Nouveau service", description: "" }]),
    });
  }

  return (
    <SectionEditorShell
      title="Services"
      description="Les blocs affichés dans la section Services."
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

      <div className="flex flex-col divide-y divide-line border border-line">
        {items.map((item, i) => (
          <div key={i} className="flex flex-col gap-4 p-5 sm:p-6">
            <div className="flex items-center justify-between">
              <span className="font-display text-xs uppercase tracking-[0.25em] text-mist-dim">
                Service {item.index}
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
              Titre
              <input
                value={item.title}
                onChange={(e) => updateItem(i, { title: e.target.value })}
                className={fieldInputClass}
              />
            </label>
            <label className={fieldLabelClass}>
              Description
              <textarea
                rows={2}
                value={item.description}
                onChange={(e) => updateItem(i, { description: e.target.value })}
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
        + Ajouter un service
      </button>
    </SectionEditorShell>
  );
}
