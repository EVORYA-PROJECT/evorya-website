"use client";

import { WorkshopPlan } from "./Art";
import { FACILITIES, GARAGE, HOURS, PHOTOS } from "./data";
import {
  Reveal,
  SectionIndex,
  TechLabel,
  TechPhoto,
  Wipe,
  useDisplayFont,
} from "./Primitives";

export default function Access() {
  const display = useDisplayFont();

  return (
    <section
      id="acces"
      className="relative scroll-mt-32 border-b border-[var(--vx-line)] bg-[var(--vx-void)] py-16 sm:py-20 lg:py-28"
    >
      <div className="mx-auto max-w-[1400px] px-5 sm:px-7 lg:px-10">
        <Reveal x={-14} y={0}>
          <SectionIndex value="05" label="Accès & horaires" />
        </Reveal>

        <div className="mt-8 lg:mt-12 lg:grid lg:grid-cols-12 lg:gap-12">
          <div className="lg:col-span-5">
            <Reveal delay={0.05}>
              <h2
                className={`${display} text-[clamp(2rem,6vw,3.4rem)] font-bold uppercase leading-[0.95] text-[var(--vx-white)]`}
              >
                Venir à l&rsquo;atelier
              </h2>
            </Reveal>

            <Reveal delay={0.09} y={16}>
              <address className="mt-6 not-italic">
                <span className="block text-lg text-[var(--vx-white)]">{GARAGE.addressLine1}</span>
                <span className="block text-lg text-[var(--vx-chrome)]">
                  {GARAGE.addressLine2}
                </span>
                <span className="vx-mono mt-3 block text-xs tracking-[0.18em] text-[var(--vx-mute)]">
                  {GARAGE.coordinates}
                </span>
                <a
                  href={GARAGE.phoneHref}
                  className={`${display} mt-5 inline-flex min-h-11 items-center text-2xl font-bold tracking-[0.06em] text-[var(--vx-red-hi)] transition-colors hover:text-[var(--vx-white)] sm:text-3xl`}
                >
                  {GARAGE.phoneDisplay}
                </a>
              </address>
            </Reveal>

            <Reveal delay={0.12} y={16}>
              <ul className="mt-8 grid gap-x-6 gap-y-3 sm:grid-cols-2">
                {FACILITIES.map((item) => (
                  <li key={item} className="flex items-start gap-3 text-sm text-[var(--vx-chrome)]">
                    <span
                      aria-hidden="true"
                      className="mt-2 block h-px w-4 shrink-0 bg-[var(--vx-red)]"
                    />
                    {item}
                  </li>
                ))}
              </ul>
            </Reveal>

            {/* Vue du poste de levage : ancre la localisation dans un lieu réel
                plutôt que dans un plan seul. */}
            <Wipe from="left" delay={0.16} className="mt-8 sm:mt-10">
              <figure>
                <TechPhoto
                  photo={PHOTOS.commande}
                  corner
                  parallax={30}
                  label="PONT 2 COLONNES — 3,2 T"
                  position="55% 45%"
                  sizes="(max-width: 640px) 92vw, (max-width: 1024px) 94vw, 38vw"
                  className="vx-plate aspect-[4/3] w-full sm:aspect-[16/9] lg:aspect-[5/4]"
                />
                <figcaption className="vx-mono mt-3 text-xs leading-relaxed tracking-[0.14em] text-[var(--vx-mute)]">
                  Commande hydraulique du poste 2 — course contrôlée avant chaque
                  montée.
                </figcaption>
              </figure>
            </Wipe>
          </div>

          <div className="mt-10 lg:col-span-7 lg:mt-0">
            <Reveal delay={0.08} y={22}>
              <div className="vx-plate border border-[var(--vx-line)] bg-[var(--vx-carbon)]">
                <div className="vx-blueprint border-b border-[var(--vx-line)] bg-[var(--vx-void)] p-4 text-[var(--vx-chrome)] sm:p-6">
                  <WorkshopPlan className="block h-auto w-full" />
                </div>

                <div className="p-5 sm:p-7">
                  <TechLabel>Horaires d&rsquo;ouverture</TechLabel>
                  <dl className="mt-4">
                    {HOURS.map((row) => (
                      <div
                        key={row.day}
                        className="flex items-baseline justify-between gap-4 border-b border-[var(--vx-line)] py-3.5 last:border-0"
                      >
                        <dt className="text-base text-[var(--vx-white)]">{row.day}</dt>
                        <dd
                          className={`vx-mono text-sm tracking-[0.14em] ${
                            row.closed ? "text-[var(--vx-red-hi)]" : "text-[var(--vx-chrome)]"
                          }`}
                        >
                          {row.hours}
                        </dd>
                      </div>
                    ))}
                  </dl>
                  <p className="mt-4 text-sm leading-relaxed text-[var(--vx-mute)]">
                    Dépose possible dès 07:30 sur demande, restitution jusqu&rsquo;à 19:30
                    du lundi au vendredi.
                  </p>
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
