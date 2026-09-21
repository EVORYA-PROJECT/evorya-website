"use client";

import { useEffect, useInsertionEffect, useRef } from "react";
import Link from "next/link";
import { useTemplateSelection } from "@/lib/templates/selection-context";
import type { TemplateSlug } from "@/lib/templates/types";

/**
 * Bandeau Evorya superposé à chaque démo sectorielle. Volontairement neutre
 * (jamais la palette du faux site) pour qu'il se lise sans ambiguïté comme
 * une couche Evorya au-dessus d'un site client, pas comme un élément du
 * faux site lui-même. Hauteur fixe de contenu (44px) + l'encoche éventuelle.
 *
 * DEMO_BAR_HEIGHT est une valeur CSS à réutiliser telle quelle en
 * `style={{ paddingTop: DEMO_BAR_HEIGHT }}` sur le tout premier bloc de
 * chaque template (jamais via une classe Tailwind arbitraire construite
 * dynamiquement : le scan statique de Tailwind ne la détecterait pas).
 */
export const DEMO_BAR_HEIGHT = "calc(2.75rem + env(safe-area-inset-top))";

export default function DemoBar({ slug }: { slug: TemplateSlug }) {
  const { selected, toggle } = useTemplateSelection();
  const isSelected = selected === slug;
  const previousScrollBehavior = useRef<string | null>(null);

  useInsertionEffect(() => {
    const html = document.documentElement;
    previousScrollBehavior.current = html.style.scrollBehavior;
    html.style.scrollBehavior = "auto";
    html.getClientRects();
    window.scrollTo({ top: 0, left: 0, behavior: "instant" });

    return () => {
      if (previousScrollBehavior.current === null) return;
      html.style.scrollBehavior = previousScrollBehavior.current;
      previousScrollBehavior.current = null;
    };
  }, []);

  useEffect(() => {
    if (previousScrollBehavior.current === null) return;
    document.documentElement.style.scrollBehavior = previousScrollBehavior.current;
    previousScrollBehavior.current = null;
  }, []);

  return (
    <div
      className="mobile-demo-bar fixed inset-x-0 top-0 z-[999] flex items-center justify-between gap-3 bg-black/90 px-3 text-white backdrop-blur-sm sm:px-4"
      style={{ height: DEMO_BAR_HEIGHT, paddingTop: "env(safe-area-inset-top)" }}
    >
      <span className="shrink-0 font-display text-[10px] uppercase tracking-[0.2em] text-white/70">
        <span className="sm:hidden">Démo</span>
        <span className="hidden sm:inline">
          Evorya <span className="text-white">— Démo</span>
        </span>
      </span>

      <div className="flex min-w-0 items-center gap-2 sm:gap-4">
        {isSelected && (
          <Link
            href="/#contact"
            className="inline-flex min-h-9 items-center font-display text-[10px] uppercase tracking-[0.12em] text-white/70 underline decoration-white/30 underline-offset-4 transition-colors hover:text-white hover:decoration-white/70 sm:tracking-[0.2em]"
          >
            <span className="sm:hidden">Formulaire →</span>
            <span className="hidden sm:inline">Voir dans le formulaire →</span>
          </Link>
        )}
        <Link
          href="/templates"
          aria-label="Retour aux templates"
          className="shrink-0 font-display text-[10px] uppercase tracking-[0.2em] text-white/70 underline decoration-white/30 underline-offset-4 transition-colors hover:text-white hover:decoration-white/70"
        >
          <span aria-hidden="true">←</span> <span className="hidden sm:inline">Templates</span>
        </Link>

        {isSelected ? (
          <button
            type="button"
            aria-pressed="true"
            onClick={() => toggle(slug)}
            className="flex shrink-0 items-center gap-1.5 whitespace-nowrap border border-white bg-white px-2.5 font-display text-[10px] uppercase tracking-[0.15em] text-black transition-colors hover:bg-white/85 sm:px-3 sm:py-1.5 sm:tracking-[0.2em]"
            style={{ paddingTop: "0.375rem", paddingBottom: "0.375rem" }}
          >
            <span aria-hidden="true">✓</span>
            <span className="sm:hidden">Sélectionnée</span>
            <span className="hidden sm:inline">Direction sélectionnée</span>
          </button>
        ) : (
          <button
            type="button"
            aria-pressed="false"
            onClick={() => toggle(slug)}
            className="whitespace-nowrap border border-white/40 px-2.5 py-1.5 font-display text-[10px] uppercase tracking-[0.15em] text-white transition-colors hover:border-white hover:bg-white hover:text-black sm:px-3 sm:tracking-[0.2em]"
          >
            <span className="sm:hidden">Ça m&rsquo;intéresse</span>
            <span className="hidden sm:inline">Cette direction m&rsquo;intéresse</span>
          </button>
        )}
      </div>
    </div>
  );
}
