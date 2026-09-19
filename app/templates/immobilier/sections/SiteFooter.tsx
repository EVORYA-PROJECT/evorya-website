"use client";

import Link from "next/link";
import { useTemplateSelection } from "@/lib/templates/selection-context";
import { PHOTO_CREDITS } from "../data";
import { focusRingLight, useDisplay } from "../ui";

const COLUMNS = [
  {
    title: "Biens",
    links: [
      { label: "Toute la sélection", href: "#biens" },
      { label: "Le bien en détail", href: "#bien" },
      { label: "Villas & maisons", href: "#biens" },
      { label: "Bureaux", href: "#biens" },
    ],
  },
  {
    title: "Agence",
    links: [
      { label: "Carnet de visite", href: "#carnet" },
      { label: "Galerie architecturale", href: "#galerie" },
      { label: "Notre méthode", href: "#agence" },
      { label: "Achat", href: "#services" },
      { label: "Location", href: "#services" },
      { label: "Gestion", href: "#services" },
    ],
  },
  {
    title: "Villes suivies",
    links: [
      { label: "Casablanca — Anfa", href: "#biens" },
      { label: "Casablanca — Gauthier", href: "#biens" },
      { label: "Rabat — Hay Riad", href: "#biens" },
      { label: "Marrakech — Médina", href: "#biens" },
    ],
  },
];

export default function SiteFooter() {
  const { select } = useTemplateSelection();
  const display = useDisplay();

  return (
    <footer className="bg-[#1E2833] text-[#C9D6DF]">
      <div className="mx-auto max-w-[1400px] px-5 pt-16 pb-10 sm:px-8 lg:px-10 lg:pt-20">
        <div className="lg:flex lg:items-start lg:justify-between lg:gap-16">
          <div className="lg:max-w-sm">
            <p
              className={`${display} text-[2.6rem] leading-none font-bold tracking-[0.06em] text-white sm:text-[3.4rem] lg:text-[4rem]`}
            >
              ATRIUM
            </p>
            <p className="mt-3 text-[0.75rem] font-medium tracking-[0.34em] text-[#8FA5B6]">
              IMMOBILIER
            </p>
            <p className="mt-6 max-w-xs text-[0.95rem] leading-relaxed text-[#A9BCCB]">
              Agence immobilière — achat, location et gestion de biens
              d&rsquo;architecture à Casablanca, Rabat et Marrakech.
            </p>
          </div>

          <nav
            aria-label="Pied de page"
            className="mt-12 grid grid-cols-2 gap-x-6 gap-y-10 sm:grid-cols-3 lg:mt-0 lg:gap-x-14"
          >
            {COLUMNS.map((column) => (
              <div key={column.title}>
                <h2 className="text-[0.75rem] font-medium tracking-[0.2em] uppercase text-white">
                  {column.title}
                </h2>
                <ul className="mt-5 space-y-3">
                  {column.links.map((link) => (
                    <li key={link.label}>
                      <a
                        href={link.href}
                        className={`inline-block py-1 text-[0.92rem] text-[#A9BCCB] transition-colors hover:text-white ${focusRingLight}`}
                      >
                        {link.label}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </nav>
        </div>

        {/* Mention de crédit obligatoire : plusieurs photographies sont sous
            licence CC BY / CC BY-SA. La liste vient de `data.ts` — une seule
            source, jamais recopiée (détail : /public/templates/CREDITS.md). */}
        <div className="mt-14 max-w-3xl border-t border-white/12 pt-6">
          <h2 className="text-[0.72rem] font-medium tracking-[0.2em] uppercase text-white/80">
            Crédits photographiques
          </h2>
          <p className="mt-3 text-[0.78rem] leading-relaxed text-[#8FA5B6]">
            Photographies d&rsquo;ambiance — Wikimedia Commons :{" "}
            {PHOTO_CREDITS.map((credit, i) => (
              <span key={credit.subject}>
                {i > 0 && " · "}
                {credit.subject} ({credit.author}, {credit.license})
              </span>
            ))}
            . Images d&rsquo;illustration : elles disent la matière et la lumière,
            elles ne représentent aucun des biens présentés.
          </p>
        </div>

        <div className="mt-8 flex flex-col gap-4 border-t border-white/12 pt-7 text-[0.8rem] leading-relaxed text-[#8FA5B6] sm:flex-row sm:items-center sm:justify-between sm:gap-8">
          <p>
            Démonstration Evorya — marque, biens, références et prix entièrement fictifs.
          </p>
          <p>
            Direction artistique et développement{" "}
            <Link
              href="/#contact"
              onClick={() => select("immobilier")}
              className={`font-medium text-white underline decoration-white/30 underline-offset-4 transition-colors hover:decoration-white ${focusRingLight}`}
            >
              Evorya Project
            </Link>
          </p>
        </div>
      </div>
    </footer>
  );
}
