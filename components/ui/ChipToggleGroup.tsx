"use client";

import type { ContactOption } from "@/lib/data/contact-options";

type ChipToggleGroupProps = {
  options: ContactOption[];
  selected: string[];
  onToggle: (value: string) => void;
  ariaLabel: string;
};

/**
 * Sélection multiple sous forme de puces sobres — alternative à un
 * <select multiple> natif (peu utilisable) et aux grosses cartes cochables
 * (trop lourdes visuellement pour une simple liste de fonctionnalités).
 * Boutons natifs : navigation clavier (Tab/Espace/Entrée) et lecteurs
 * d'écran (aria-pressed) fonctionnent sans logique supplémentaire.
 */
export default function ChipToggleGroup({
  options,
  selected,
  onToggle,
  ariaLabel,
}: ChipToggleGroupProps) {
  return (
    <div role="group" aria-label={ariaLabel} className="flex flex-wrap gap-2">
      {options.map((option) => {
        const isSelected = selected.includes(option.value);
        return (
          <button
            key={option.value}
            type="button"
            aria-pressed={isSelected}
            onClick={() => onToggle(option.value)}
            className={`min-h-[44px] border px-4 py-2 text-left text-sm transition-colors ${
              isSelected
                ? "border-paper bg-paper/[0.08] text-paper"
                : "border-line text-paper-dim hover:border-line-strong"
            }`}
          >
            {option.label}
          </button>
        );
      })}
    </div>
  );
}
