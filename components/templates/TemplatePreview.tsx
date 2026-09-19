import Image from "next/image";
import type { TemplateEntry } from "@/lib/templates/types";

/**
 * Aperçu d'un template pour la galerie/homepage Evorya. Quand la démo a une
 * photo de couverture (lib/templates/registry.ts#coverImage — toujours une
 * photo déjà intégrée dans la démo elle-même, jamais une image dédiée), elle
 * s'affiche sous un dégradé propre au secteur, assez léger pour rester
 * lisible tout en gardant l'identité chromatique de chaque carte cohérente
 * dans la grille. Sans coverImage (secteur "à venir"), on retombe sur le
 * dégradé + grain (.bg-noise) seul.
 */
export default function TemplatePreview({
  template,
  className = "",
  sizes = "(max-width: 639px) 100vw, (max-width: 1023px) 50vw, 33vw",
  priority = false,
}: {
  template: TemplateEntry;
  className?: string;
  sizes?: string;
  priority?: boolean;
}) {
  return (
    <div className={`relative overflow-hidden ${className}`} aria-hidden="true">
      {template.coverImage ? (
        <>
          <Image
            src={template.coverImage.src}
            alt=""
            fill
            sizes={sizes}
            priority={priority}
            className="object-cover"
          />
          <div
            className="absolute inset-0 mix-blend-multiply"
            style={{
              background: `linear-gradient(160deg, ${template.accent}66 0%, transparent 55%, ${template.accent}4d 100%)`,
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-black/0 to-transparent" />
        </>
      ) : (
        <div
          className="bg-noise absolute inset-0"
          style={{
            background: `linear-gradient(135deg, ${template.accent} 0%, ${template.accentSoft} 100%)`,
          }}
        />
      )}
      <span
        className="absolute -bottom-6 -right-2 font-display text-[7rem] font-bold leading-none tracking-tighter text-white/15 sm:text-[9rem]"
        style={{ mixBlendMode: "overlay" }}
      >
        {template.index}
      </span>
    </div>
  );
}
