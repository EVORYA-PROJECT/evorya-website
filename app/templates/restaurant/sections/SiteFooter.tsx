"use client";

import Link from "next/link";
import { BRAND, MENU, NAV_LINKS, PHOTO_CREDIT, SPOTS } from "../data";
import { Wordmark } from "../Brand";
import { Reveal } from "../Reveal";
import { useTemplateSelection } from "@/lib/templates/selection-context";

/**
 * Pied de page.
 *
 * Trois obligations tenues ici :
 *  1. rappeler que l'enseigne est fictive, sans ambiguïté ;
 *  2. afficher l'attribution photographique (licences CC BY / CC BY-SA), qui
 *     doit rester visible sur la page où les images sont utilisées ;
 *  3. rebrancher le visiteur sur Evorya — le lien pré-sélectionne cette
 *     direction dans le formulaire de contact, exactement comme le bouton
 *     « Cette direction m'intéresse » du bandeau de démo.
 */
export default function SiteFooter({ d }: { d: string }) {
  const { select } = useTemplateSelection();

  return (
    <footer className="relative border-t border-[#F4EFE6]/12 bg-[#08080A]">
      <div className="mx-auto max-w-[1600px] px-5 pb-10 pt-14 sm:px-8 lg:px-12 lg:pt-20">
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-12 lg:gap-10">
          <div className="lg:col-span-5">
            <Wordmark d={d} className="text-[42px] text-[#F4EFE6] lg:text-[56px]" />
            <p className="mt-5 max-w-[34ch] text-[15px] leading-[1.7] text-[#F4EFE6]/55">
              {BRAND.kicker}. {BRAND.slogan}
            </p>
            <p className="mt-6 flex flex-wrap items-center gap-x-4 gap-y-1 text-[14px] text-[#F4EFE6]/80">
              <span>{BRAND.instagram}</span>
              <span aria-hidden="true" className="text-[#FF3B1F]">
                ·
              </span>
              <span>{BRAND.tiktok}</span>
            </p>
            <p className="mt-1 text-[12px] uppercase tracking-[0.14em] text-[#F4EFE6]/35">
              Comptes fictifs — démonstration
            </p>
          </div>

          <nav aria-label="Pied de page — sections" className="lg:col-span-3">
            <h2 className="text-[11px] font-bold uppercase tracking-[0.24em] text-[#FF3B1F]">
              La page
            </h2>
            <ul className="mt-4 space-y-2 text-[15px]">
              {NAV_LINKS.map((l) => (
                <li key={l.href}>
                  <a
                    href={l.href}
                    className="inline-flex min-h-[38px] items-center text-[#F4EFE6]/70 transition-colors hover:text-[#F4EFE6]"
                  >
                    {l.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <div className="lg:col-span-2">
            <h2 className="text-[11px] font-bold uppercase tracking-[0.24em] text-[#FF3B1F]">
              La carte
            </h2>
            <ul className="mt-4 space-y-2 text-[15px] text-[#F4EFE6]/70">
              {MENU.map((c) => (
                <li key={c.id}>{c.label}</li>
              ))}
            </ul>
          </div>

          <div className="lg:col-span-2">
            <h2 className="text-[11px] font-bold uppercase tracking-[0.24em] text-[#FF3B1F]">
              Les spots
            </h2>
            <ul className="mt-4 space-y-2 text-[15px] text-[#F4EFE6]/70">
              {SPOTS.map((s) => (
                <li key={s.id}>
                  <span className="block">{s.area}</span>
                  <span className="block text-[12px] text-[#F4EFE6]/40">{s.city}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <Reveal className="mt-12 flex flex-col gap-4 border-t border-[#F4EFE6]/12 pt-7 text-[13px] text-[#F4EFE6]/50 sm:flex-row sm:items-center sm:justify-between lg:mt-16">
          <p>
            © {new Date().getFullYear()} {BRAND.name} — {BRAND.fictionNote}
          </p>
          <p>
            Ce style vous inspire&nbsp;?{" "}
            <Link
              href="/#contact"
              onClick={() => select("restaurant")}
              className="text-[#F4EFE6] underline decoration-[#FF3B1F]/60 underline-offset-4 transition-colors hover:decoration-[#FF3B1F]"
            >
              Evorya peut créer ça pour votre activité
            </Link>
            .
          </p>
        </Reveal>

        {/* Mention obligatoire : une partie des photographies est sous licence
            CC BY / CC BY-SA, l'attribution doit rester visible sur la page. */}
        <p className="mt-6 max-w-[90ch] text-[12px] leading-[1.6] text-[#F4EFE6]/30">
          {PHOTO_CREDIT}
        </p>
      </div>
    </footer>
  );
}
