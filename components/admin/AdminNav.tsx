"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const TABS = [
  { href: "/admin", label: "Demandes" },
  { href: "/admin/contenu", label: "Contenu du site" },
  { href: "/admin/realisations", label: "Réalisations" },
  { href: "/admin/first10", label: "Evorya First 10" },
  { href: "/admin/parametres", label: "Paramètres" },
];

const LAST_ITEM_ALONE = TABS.length % 2 === 1;

export default function AdminNav() {
  const pathname = usePathname();

  function isActive(href: string) {
    if (href === "/admin") return pathname === "/admin";
    return pathname?.startsWith(href) ?? false;
  }

  return (
    <nav aria-label="Navigation de l'espace propriétaire" className="mt-8">
      {/* Desktop / tablette : navigation horizontale inchangée. */}
      <div className="hidden overflow-x-auto sm:block">
        <div className="flex min-w-max gap-8 border-b border-line">
          {TABS.map((tab) => {
            const active = isActive(tab.href);
            return (
              <Link
                key={tab.href}
                href={tab.href}
                aria-current={active ? "page" : undefined}
                className={`relative shrink-0 whitespace-nowrap py-4 font-display text-xs uppercase tracking-[0.2em] transition-colors ${
                  active ? "text-paper" : "text-mist-dim hover:text-mist"
                }`}
              >
                {tab.label}
                <span
                  className={`absolute inset-x-0 -bottom-px h-px transition-colors ${
                    active ? "bg-paper" : "bg-transparent"
                  }`}
                />
              </Link>
            );
          })}
        </div>
      </div>

      {/* Mobile : grille de blocs indépendants — chaque rubrique a sa propre
          bordure complète et un vrai gap (pas un partage de bordure à 1px),
          pour qu'aucune lecture ne puisse jamais sembler concaténée à la
          suivante, quel que soit le rendu du navigateur. Jamais de scroll
          horizontal ici : tout tient dans la grille. */}
      <div className="grid grid-cols-2 gap-3 sm:hidden">
        {TABS.map((tab, i) => {
          const active = isActive(tab.href);
          const spanFull = LAST_ITEM_ALONE && i === TABS.length - 1;
          return (
            <Link
              key={tab.href}
              href={tab.href}
              aria-current={active ? "page" : undefined}
              className={`flex min-h-[52px] items-center justify-center border px-3 py-3 text-center font-display text-[11px] uppercase leading-snug tracking-[0.12em] transition-colors ${
                spanFull ? "col-span-2" : ""
              } ${
                active
                  ? "border-paper/50 bg-paper/[0.07] text-paper"
                  : "border-line text-mist-dim active:border-line-strong active:text-mist"
              }`}
            >
              {tab.label}
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
