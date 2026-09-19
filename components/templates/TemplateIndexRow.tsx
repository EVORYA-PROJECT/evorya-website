"use client";

import Link from "next/link";
import TemplatePreview from "@/components/templates/TemplatePreview";
import { useTemplateSelection } from "@/lib/templates/selection-context";
import type { TemplateEntry } from "@/lib/templates/types";

/**
 * Ligne éditoriale utilisée par la galerie /templates — pensée comme un
 * index architectural (grand numéro, texte, aperçu), pas comme une grille
 * de cartes SaaS. Le survol desktop fait juste évoluer une ligne et l'aperçu
 * (group-hover, déjà le vocabulaire d'interaction du reste du site) plutôt
 * qu'un système de curseur contextuel dédié, qui n'existe pas encore ici.
 *
 * Toute la ligne est cliquable via un unique <Link> "étiré" (absolute
 * inset-0) plutôt que trois liens partiels (numéro / texte / aperçu) qui
 * laissaient des zones mortes entre les colonnes — c'était la cause du clic
 * gauche peu fiable. Le bouton "Sélectionner" reste un <button> frère,
 * jamais imbriqué dans le <a>, simplement remonté au-dessus via z-index.
 */
export default function TemplateIndexRow({ template }: { template: TemplateEntry }) {
  const { selected, toggle } = useTemplateSelection();
  const isSelected = selected === template.slug;

  return (
    <div className="mobile-template-index group relative grid cursor-pointer grid-cols-1 gap-6 border-b border-line py-8 sm:grid-cols-[auto_1fr] sm:items-center sm:gap-10 lg:grid-cols-[auto_1fr_auto] lg:py-10">
      <Link
        href={`/templates/${template.slug}`}
        className="absolute inset-0 z-0"
        aria-label={`Voir la démo — ${template.brandName}`}
      />

      <span
        aria-hidden="true"
        className="pointer-events-none font-display text-4xl leading-none text-mist-dim transition-colors duration-500 group-hover:text-paper sm:text-5xl lg:text-6xl"
      >
        {template.index}
      </span>

      <div className="pointer-events-none">
        <div className="flex flex-wrap items-center gap-3">
          <span className="font-display text-[11px] uppercase tracking-[0.25em] text-mist-dim">
            {template.sectorLabel}
          </span>
          <button
            type="button"
            aria-pressed={isSelected}
            onClick={() => toggle(template.slug)}
            className={`pointer-events-auto relative z-10 border px-2.5 py-1 font-display text-[9px] uppercase tracking-[0.15em] transition-colors ${
              isSelected
                ? "border-paper bg-paper text-ink"
                : "border-line-strong text-mist-dim hover:border-paper hover:text-paper"
            }`}
          >
            {isSelected ? "✓ Sélectionnée" : "Sélectionner cette direction"}
          </button>
        </div>
        <h3 className="mt-2 font-display text-2xl uppercase tracking-[0.03em] text-paper sm:text-3xl lg:text-4xl">
          {template.brandName}
        </h3>
        <p className="mt-3 max-w-lg text-sm leading-relaxed text-mist sm:text-base">
          {template.direction}
        </p>
        <span className="mt-4 inline-flex items-center gap-2 font-display text-[11px] uppercase tracking-[0.2em] text-paper-dim transition-colors group-hover:text-paper">
          Voir la démo
          <span aria-hidden="true" className="transition-transform group-hover:translate-x-1">
            →
          </span>
        </span>
        <span className="mt-3 block h-px w-0 bg-paper transition-all duration-500 group-hover:w-24" />
      </div>

      <TemplatePreview
        template={template}
        sizes="(max-width: 1023px) 100vw, 224px"
        className="pointer-events-none aspect-[4/3] w-full transition-transform duration-500 group-hover:scale-[1.03] lg:h-40 lg:w-56"
      />
    </div>
  );
}
