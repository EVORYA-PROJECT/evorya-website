import Image from "next/image";
import { TEMPLATES } from "@/lib/templates/registry";
import type { TemplateSlug } from "@/lib/templates/types";

export const NO_TEMPLATE_PREFERENCE = "Autre / aucune préférence";

type TemplateInspirationSelectorProps = {
  selected: TemplateSlug | null;
  onSelect: (slug: TemplateSlug) => void;
  onClear: () => void;
};

export default function TemplateInspirationSelector({
  selected,
  onSelect,
  onClear,
}: TemplateInspirationSelectorProps) {
  return (
    <fieldset className="mobile-inspiration min-w-0 border-t border-line pt-6 sm:col-span-2">
      <legend className="font-display text-[11px] uppercase tracking-[0.25em] text-paper">
        Quelle direction vous inspire ?
      </legend>
      <p id="template-inspiration-help" className="mt-2 text-sm text-mist">
        Choisissez l&rsquo;univers qui se rapproche le plus de votre projet.
      </p>

      <div
        className="mt-5 grid grid-cols-1 gap-2 sm:grid-cols-2"
        aria-describedby="template-inspiration-help"
      >
        {TEMPLATES.map((template) => {
          const isSelected = selected === template.slug;

          return (
            <label
              key={template.slug}
              className={`group relative grid min-h-24 cursor-pointer grid-cols-[5.25rem_1fr] overflow-hidden border transition-[border-color,background-color,transform] duration-200 focus-within:z-10 hover:-translate-y-0.5 hover:border-line-strong motion-reduce:transform-none ${
                isSelected
                  ? "border-paper bg-paper/[0.06]"
                  : "border-line bg-ink-soft"
              }`}
            >
              <input
                type="radio"
                name="template-inspiration"
                value={template.slug}
                checked={isSelected}
                onChange={() => onSelect(template.slug)}
                className="peer sr-only"
              />

              <span className="relative min-h-24 overflow-hidden bg-white/[0.03]" aria-hidden="true">
                {template.coverImage && (
                  <Image
                    src={template.coverImage.src}
                    alt=""
                    fill
                    sizes="84px"
                    className={`object-cover grayscale transition-[filter,transform,opacity] duration-300 group-hover:scale-[1.03] group-hover:grayscale-0 ${
                      isSelected ? "opacity-90 grayscale-0" : "opacity-55"
                    }`}
                  />
                )}
                <span className="absolute inset-0 bg-gradient-to-r from-transparent to-ink/35" />
              </span>

              <span className="flex min-w-0 flex-col justify-center px-3 py-3 pr-9">
                <span className="font-display text-[10px] uppercase tracking-[0.16em] text-mist-dim">
                  {template.sectorLabel}
                </span>
                <span className="mt-1 text-sm font-medium leading-tight text-paper">
                  {template.brandName}
                </span>
              </span>

              <span
                aria-hidden="true"
                className={`absolute right-3 top-3 flex h-4 w-4 items-center justify-center border text-[9px] transition-colors ${
                  isSelected
                    ? "border-paper bg-paper text-ink"
                    : "border-line-strong text-transparent group-hover:border-mist"
                }`}
              >
                ✓
              </span>
            </label>
          );
        })}

        <label
          className={`group relative cursor-pointer border px-4 py-4 transition-[border-color,background-color,transform] duration-200 focus-within:z-10 hover:-translate-y-0.5 hover:border-line-strong motion-reduce:transform-none sm:col-span-2 ${
            selected === null ? "border-paper bg-paper/[0.06]" : "border-line bg-ink-soft"
          }`}
        >
          <input
            type="radio"
            name="template-inspiration"
            value="none"
            checked={selected === null}
            onChange={onClear}
            className="peer sr-only"
          />
          <span className="block pr-9 font-display text-[11px] uppercase tracking-[0.2em] text-paper">
            Autre / aucune préférence
          </span>
          <span className="mt-1 block pr-9 text-xs text-mist">
            Je préfère définir une direction différente avec Evorya.
          </span>
          <span
            aria-hidden="true"
            className={`absolute right-4 top-1/2 flex h-4 w-4 -translate-y-1/2 items-center justify-center border text-[9px] transition-colors ${
              selected === null
                ? "border-paper bg-paper text-ink"
                : "border-line-strong text-transparent group-hover:border-mist"
            }`}
          >
            ✓
          </span>
        </label>
      </div>
    </fieldset>
  );
}
