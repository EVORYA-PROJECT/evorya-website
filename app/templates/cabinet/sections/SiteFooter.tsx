"use client";

import { C } from "../theme";
import { Shell, useDisplay } from "../primitives";
import { CONTACT, FIRM, FOOTER_COLUMNS, FOOTER_LEGAL, PHOTO_CREDIT } from "../data";

/**
 * Pied de page institutionnel : bloc-marque, colonnes de navigation, mentions.
 * Structure proche d'un ours de document juridique — filets, capitales fines,
 * aucune fioriture.
 */
export default function SiteFooter() {
  const display = useDisplay();

  return (
    <footer className="bg-noise" style={{ backgroundColor: C.ink }}>
      <Shell className="pt-14 pb-8 sm:pt-16 lg:pt-20">
        <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-12 lg:gap-12">
          {/* Bloc-marque */}
          <div className="sm:col-span-2 lg:col-span-4">
            <div className="flex items-center gap-3">
              <span
                aria-hidden="true"
                className="h-2.5 w-2.5 shrink-0"
                style={{ backgroundColor: C.brass }}
              />
              <span
                className={`${display} text-[13px] font-medium uppercase leading-none tracking-[0.2em]`}
                style={{ color: C.paper }}
              >
                Verdon <span className="font-normal">&amp; Associés</span>
              </span>
            </div>
            <p
              className="mt-5 max-w-[34ch] text-[14px] leading-[1.75]"
              style={{ color: C.fog }}
            >
              {FIRM.positioning}
            </p>
            <p className="mt-6 text-[11px] uppercase tracking-[0.24em]" style={{ color: C.fog }}>
              {FIRM.cities}
            </p>
          </div>

          {/* Colonnes de navigation */}
          {FOOTER_COLUMNS.map((column) => (
            <nav
              key={column.title}
              aria-label={column.title}
              className="lg:col-span-3 lg:pl-8"
            >
              <h3
                className="text-[10px] uppercase tracking-[0.24em]"
                style={{ color: C.fog }}
              >
                {column.title}
              </h3>
              <ul className="mt-4">
                {column.links.map((link) => (
                  <li key={link.label}>
                    <a
                      href={link.href}
                      className="block py-2 text-[14px] transition-colors hover:text-[#FFFFFF]"
                      style={{ color: C.paper }}
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </nav>
          ))}

          {/* Contact */}
          <div className="lg:col-span-2">
            <h3 className="text-[10px] uppercase tracking-[0.24em]" style={{ color: C.fog }}>
              Contact
            </h3>
            <ul className="mt-4">
              <li>
                <a
                  href={`tel:${CONTACT.phone.replace(/\s/g, "")}`}
                  className="block py-2 text-[14px]"
                  style={{ color: C.paper }}
                >
                  {CONTACT.phone}
                </a>
              </li>
              <li>
                <a
                  href={`mailto:${CONTACT.email}`}
                  className="block break-words py-2 text-[14px]"
                  style={{ color: C.paper }}
                >
                  {CONTACT.email}
                </a>
              </li>
              <li>
                <a
                  href="#contact"
                  className="mt-3 inline-flex h-11 items-center border px-4 text-[10px] uppercase tracking-[0.2em] transition-colors hover:bg-[#F4F3EF] hover:text-[#141B26]"
                  style={{ borderColor: C.ruleDark, color: C.paper }}
                >
                  Rendez-vous
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Ours */}
        <div
          className="mt-12 flex flex-col gap-4 border-t pt-6 sm:mt-14 md:flex-row md:items-center md:justify-between"
          style={{ borderColor: C.ruleDark }}
        >
          <p className="text-[11px] leading-relaxed" style={{ color: C.fog }}>
            © {new Date().getFullYear()} {FIRM.name} — marque fictive créée pour une
            démonstration.
          </p>
          <ul className="flex flex-wrap gap-x-6 gap-y-2">
            {FOOTER_LEGAL.map((item) => (
              <li key={item} className="text-[11px]" style={{ color: C.fog }}>
                {item}
              </li>
            ))}
          </ul>
        </div>

        {/* Crédit photographique : les images sont en CC0, l'attribution
            n'est pas exigée mais reste affichée — et précise surtout que les
            bâtiments montrés n'ont aucun lien avec ce cabinet fictif. */}
        <p
          className="mt-5 max-w-[86ch] text-[11px] leading-[1.6]"
          style={{ color: "rgba(170, 180, 194, 0.62)" }}
        >
          {PHOTO_CREDIT}
        </p>
      </Shell>
    </footer>
  );
}
