"use client";

import Link from "next/link";
import TemplatePreview from "@/components/templates/TemplatePreview";
import { useTemplateSelection } from "@/lib/templates/selection-context";
import type { TemplateEntry } from "@/lib/templates/types";

/**
 * Carte compacte — utilisée sur la homepage (aperçu des 6 secteurs) et
 * potentiellement ailleurs. La version éditoriale plus riche de /templates
 * vit dans TemplateIndexRow, pas ici.
 *
 * Toute la carte est cliquable via un unique <Link> "étiré" (absolute
 * inset-0, pattern "stretched link") plutôt que plusieurs liens partiels
 * couvrant seulement le texte/l'image : les anciens interstices (padding,
 * espace entre l'image et le texte) étaient des zones mortes qui rendaient
 * le clic gauche peu fiable. Le bouton "Sélectionner" reste un <button>
 * frère (jamais imbriqué dans le <a>, HTML invalide), simplement remonté
 * au-dessus via z-index — aucun stopPropagation nécessaire puisqu'il ne se
 * trouve pas à l'intérieur du lien.
 */
export default function TemplateCard({ template }: { template: TemplateEntry }) {
  const { selected, toggle } = useTemplateSelection();
  const isSelected = selected === template.slug;

  return (
    <div
      className={`group relative flex cursor-pointer flex-col border transition-colors ${
        isSelected ? "border-paper" : "border-line hover:border-line-strong"
      }`}
    >
      <Link
        href={`/templates/${template.slug}`}
        className="absolute inset-0 z-0"
        aria-label={`Voir la démo — ${template.brandName}`}
      />

      <TemplatePreview
        template={template}
        className="pointer-events-none aspect-[4/3] w-full"
      />
      <div className="pointer-events-none flex flex-1 flex-col gap-2 p-5">
        <div className="flex items-start justify-between gap-3">
          <span className="font-display text-[10px] uppercase tracking-[0.25em] text-mist-dim">
            {template.index} — {template.sectorLabel}
          </span>
          <button
            type="button"
            aria-pressed={isSelected}
            onClick={() => toggle(template.slug)}
            className={`pointer-events-auto relative z-10 shrink-0 border px-2.5 py-1 font-display text-[9px] uppercase tracking-[0.15em] transition-colors ${
              isSelected
                ? "border-paper bg-paper text-ink"
                : "border-line-strong text-mist-dim hover:border-paper hover:text-paper"
            }`}
          >
            {isSelected ? "✓ Sélectionnée" : "Sélectionner"}
          </button>
        </div>
        <h3 className="font-display text-lg uppercase tracking-[0.05em] text-paper">
          {template.brandName}
        </h3>
        <p className="text-sm leading-relaxed text-mist">{template.direction}</p>
        <span className="mt-2 inline-flex items-center gap-2 font-display text-[11px] uppercase tracking-[0.2em] text-paper-dim transition-colors group-hover:text-paper">
          Voir la démo
          <span aria-hidden="true" className="transition-transform group-hover:translate-x-1">
            →
          </span>
        </span>
      </div>
    </div>
  );
}
