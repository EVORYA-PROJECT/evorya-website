"use client";

import Link from "next/link";
import { useTemplateSelection } from "@/lib/templates/selection-context";
import { VortexMark } from "./Art";
import { GARAGE, NAV_LINKS, PHOTO_CREDIT, SERVICES } from "./data";
import { PhoneGlyph } from "./Nav";
import { MeasureRail, Reveal, TechLabel, useDisplayFont } from "./Primitives";

export function Appointment() {
  const display = useDisplayFont();

  return (
    <section
      id="rdv"
      className="bg-noise relative scroll-mt-32 overflow-hidden bg-[var(--vx-red)] py-16 text-white sm:py-20 lg:py-28"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-y-0 -right-[15%] w-[60%] -skew-x-12 bg-[var(--vx-void)]/35"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -bottom-6 left-0 w-full overflow-hidden text-center"
      >
        <span
          className={`${display} vx-outline-chrome block text-[22vw] font-bold uppercase leading-none tracking-[0.08em] opacity-40`}
        >
          Vortex
        </span>
      </div>

      <div className="relative mx-auto max-w-[1400px] px-5 sm:px-7 lg:px-10">
        <div className="lg:grid lg:grid-cols-12 lg:items-end lg:gap-12">
          <div className="lg:col-span-7">
            <Reveal x={-14} y={0}>
              <div className="flex items-center gap-4">
                <span className="vx-mono text-xs tracking-[0.2em] text-white">06</span>
                <span aria-hidden="true" className="h-px w-10 bg-white/70 sm:w-16" />
                <span className="vx-mono text-xs uppercase tracking-[0.28em] text-white">
                  Rendez-vous
                </span>
              </div>
            </Reveal>
            <Reveal delay={0.06}>
              <h2
                className={`${display} mt-6 text-[clamp(2.1rem,7vw,4rem)] font-bold uppercase leading-[0.92]`}
              >
                Un créneau,
                <br />
                un devis chiffré.
              </h2>
            </Reveal>
            <Reveal delay={0.1} y={14}>
              <p className="mt-5 max-w-xl text-base leading-relaxed text-white sm:text-lg">
                Décrivez le symptôme ou le type d&rsquo;entretien : nous confirmons le
                créneau, la durée d&rsquo;immobilisation et l&rsquo;ordre de grandeur du
                montant avant votre venue.
              </p>
            </Reveal>
          </div>

          <div className="mt-8 lg:col-span-5 lg:mt-0">
            <Reveal delay={0.12} y={18}>
              <div className="flex flex-col gap-3">
                <a
                  href={GARAGE.phoneHref}
                  className={`${display} vx-plate-sm flex min-h-14 items-center justify-center gap-3 bg-white px-6 text-lg font-bold uppercase tracking-[0.14em] text-[var(--vx-red)] transition-colors hover:bg-[var(--vx-void)] hover:text-white`}
                >
                  <PhoneGlyph className="h-5 w-5" />
                  {GARAGE.phoneDisplay}
                </a>
                <a
                  href={GARAGE.whatsappHref}
                  className="vx-plate-sm flex min-h-14 items-center justify-center gap-3 border-2 border-white/70 px-6 text-base uppercase tracking-[0.14em] text-white transition-colors hover:border-white hover:bg-white/10"
                >
                  Écrire sur WhatsApp
                </a>
                <p className="vx-mono text-xs leading-relaxed tracking-[0.1em] text-white">
                  Numéro de démonstration, non attribué — aucune ligne réelle n&rsquo;est
                  jointe depuis cette page.
                </p>
              </div>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}

export function SiteFooter() {
  const display = useDisplayFont();
  const families = SERVICES.slice(0, 5);
  const { select } = useTemplateSelection();

  return (
    <footer className="bg-[var(--vx-void)] pt-12 sm:pt-16">
      <div className="mx-auto max-w-[1400px] px-5 sm:px-7 lg:px-10">
        <MeasureRail />

        <div className="mt-10 grid gap-10 sm:grid-cols-2 lg:grid-cols-12 lg:gap-12">
          <div className="lg:col-span-4">
            <div className="flex items-center gap-3">
              <VortexMark className="h-8 w-8" />
              <span
                className={`${display} text-xl font-bold uppercase tracking-[0.22em] text-[var(--vx-white)]`}
              >
                Garage Vortex
              </span>
            </div>
            <p className="mt-4 max-w-sm text-sm leading-relaxed text-[var(--vx-mute)]">
              Entretien, diagnostic et réparation multimarque. Atelier indépendant,
              relevés chiffrés et restitution documentée.
            </p>
          </div>

          <div className="lg:col-span-3">
            <TechLabel>Atelier</TechLabel>
            <ul className="mt-4 space-y-2.5">
              {NAV_LINKS.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    className="inline-flex min-h-11 items-center text-sm text-[var(--vx-chrome)] transition-colors hover:text-[var(--vx-red-hi)]"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div className="lg:col-span-3">
            <TechLabel>Prestations</TechLabel>
            <ul className="mt-4 space-y-2.5">
              {families.map((service) => (
                <li key={service.ref} className="text-sm text-[var(--vx-chrome)]">
                  {service.title}
                </li>
              ))}
            </ul>
          </div>

          <div className="lg:col-span-2">
            <TechLabel>Contact</TechLabel>
            <ul className="mt-4 space-y-2.5">
              <li>
                <a
                  href={GARAGE.phoneHref}
                  className="vx-mono inline-flex min-h-11 items-center text-sm tracking-[0.1em] text-[var(--vx-white)] transition-colors hover:text-[var(--vx-red-hi)]"
                >
                  {GARAGE.phoneDisplay}
                </a>
              </li>
              <li className="text-sm leading-relaxed text-[var(--vx-mute)]">
                {GARAGE.addressLine1}
                <br />
                {GARAGE.addressLine2}
              </li>
            </ul>
          </div>
        </div>

        {/* Signature Evorya : rappel que la page est une démonstration. */}
        <div className="mt-12 border-t border-[var(--vx-line)] pt-6">
          <div className="flex flex-col gap-4 pb-6 sm:flex-row sm:items-center sm:justify-between">
            <p className="vx-mono text-xs leading-relaxed tracking-[0.12em] text-[var(--vx-mute)]">
              Garage Vortex est une marque fictive créée pour la démonstration Evorya —
              secteur automobile / garage.
            </p>
            <Link
              href="/#contact"
              onClick={() => select("automobile")}
              className={`${display} vx-plate-sm inline-flex min-h-11 items-center justify-center border border-[var(--vx-line)] px-5 text-sm font-semibold uppercase tracking-[0.16em] text-[var(--vx-white)] transition-colors hover:border-[var(--vx-red)] hover:text-[var(--vx-red-hi)]`}
            >
              Je veux ce niveau pour mon garage
            </Link>
          </div>

          {/* Mention obligatoire : les photographies sont sous licence CC BY /
              CC0, l'attribution doit rester visible sur la page. */}
          <p className="vx-mono max-w-[80ch] pb-8 text-[11px] leading-[1.7] tracking-[0.06em] text-[var(--vx-mute)]/70">
            {PHOTO_CREDIT}
          </p>
        </div>
      </div>

      <div aria-hidden="true" className="vx-hatch h-2 w-full opacity-60" />
    </footer>
  );
}
