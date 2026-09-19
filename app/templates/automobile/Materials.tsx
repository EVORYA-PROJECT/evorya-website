"use client";

import { MATERIALS, PHOTOS } from "./data";
import {
  MeasureRail,
  Reveal,
  SectionIndex,
  TechLabel,
  TechPhoto,
  Wipe,
  useDisplayFont,
} from "./Primitives";

/**
 * Bande « Matière & outillage » : trois photographies réelles montées en
 * mosaïque diagonale. Le grand panneau déborde volontairement la colonne de
 * texte à partir de `lg` — c'est la respiration de la page, pas un remplissage.
 */
export default function Materials() {
  const display = useDisplayFont();
  const [lead, ...rest] = MATERIALS;

  return (
    <section
      id="matiere"
      aria-labelledby="matiere-titre"
      className="relative scroll-mt-32 overflow-hidden border-b border-[var(--vx-line)] bg-[var(--vx-void)] py-16 sm:py-20 lg:py-28"
    >
      <div
        aria-hidden="true"
        className="vx-diag pointer-events-none absolute inset-y-0 left-0 w-1/3 opacity-50"
      />

      <div className="relative mx-auto max-w-[1400px] px-5 sm:px-7 lg:px-10">
        <div className="lg:flex lg:items-end lg:justify-between lg:gap-16">
          <div className="lg:max-w-xl">
            <Reveal x={-14} y={0}>
              <SectionIndex value="02" label="Matière & outillage" />
            </Reveal>
            <Reveal delay={0.06}>
              <h2
                id="matiere-titre"
                className={`${display} mt-6 text-[clamp(2rem,6vw,3.4rem)] font-bold uppercase leading-[0.95] text-[var(--vx-white)]`}
              >
                Ce qui passe entre
                <span className="text-[var(--vx-red-hi)]"> nos mains</span>
              </h2>
            </Reveal>
          </div>
          <Reveal delay={0.1} className="mt-5 lg:mt-0 lg:max-w-sm">
            <p className="text-base leading-relaxed text-[var(--vx-chrome)]">
              Un atelier se juge à son outillage et à l&rsquo;état des pièces qui en
              ressortent. Voici la matière réelle d&rsquo;une journée : clés au couple,
              organes déposés, gomme contrôlée.
            </p>
          </Reveal>
        </div>

        <MeasureRail className="mt-8 sm:mt-10" />
      </div>

      {/* Panneau principal quasi plein écran : il sort de la grille de texte
          à partir de lg pour casser la lecture en colonnes. */}
      <div className="relative mt-8 sm:mt-10 lg:mt-14">
        <div className="mx-auto max-w-[1600px] pl-5 pr-0 sm:pl-7 lg:pl-10">
          <div className="lg:grid lg:grid-cols-12 lg:items-center lg:gap-10">
            <Wipe from="left" className="lg:col-span-8">
              <TechPhoto
                photo={PHOTOS[lead.photo]}
                grid
                corner
                parallax={34}
                label={lead.tag}
                position="50% 46%"
                sizes="(max-width: 1024px) 96vw, 62vw"
                className="vx-plate aspect-[16/11] w-full sm:aspect-[16/9] lg:aspect-[16/10] lg:min-h-[28rem]"
              />
            </Wipe>

            <Reveal
              delay={0.12}
              x={0}
              y={22}
              className="mt-6 pr-5 sm:pr-7 lg:col-span-4 lg:mt-0 lg:pr-10"
            >
              <div className="border-l-2 border-[var(--vx-red)] pl-5">
                <TechLabel>{lead.tag}</TechLabel>
                <h3
                  className={`${display} mt-3 text-[clamp(1.4rem,3.4vw,2.1rem)] font-semibold uppercase leading-[1.05] tracking-[0.03em] text-[var(--vx-white)]`}
                >
                  {lead.title}
                </h3>
                <p className="mt-4 text-sm leading-relaxed text-[var(--vx-chrome)] sm:text-base">
                  {lead.body}
                </p>
                <dl className="mt-6 grid grid-cols-2 gap-x-6 gap-y-4 border-t border-[var(--vx-line)] pt-5">
                  <div>
                    <dt className="vx-mono text-xs uppercase tracking-[0.14em] text-[var(--vx-mute)]">
                      Serrage
                    </dt>
                    <dd className="mt-1 text-sm font-medium text-[var(--vx-white)]">
                      Au couple constructeur
                    </dd>
                  </div>
                  <div>
                    <dt className="vx-mono text-xs uppercase tracking-[0.14em] text-[var(--vx-mute)]">
                      Contrôle
                    </dt>
                    <dd className="mt-1 text-sm font-medium text-[var(--vx-white)]">
                      Clé étalonnée / an
                    </dd>
                  </div>
                </dl>
              </div>
            </Reveal>
          </div>
        </div>
      </div>

      {/* Deux détails décalés : la diagonale se poursuit vers le bas. */}
      <div className="relative mx-auto mt-6 max-w-[1400px] px-5 sm:mt-8 sm:px-7 lg:px-10">
        <div className="grid gap-5 sm:grid-cols-2 sm:gap-6 lg:gap-8">
          {rest.map((item, i) => (
            <Wipe
              key={item.tag}
              from={i === 0 ? "left" : "right"}
              delay={0.08 * i}
              className={i === 1 ? "sm:mt-12 lg:mt-20" : undefined}
            >
              <figure className="vx-plate group relative border border-[var(--vx-line)] bg-[var(--vx-carbon)]">
                <TechPhoto
                  photo={PHOTOS[item.photo]}
                  corner
                  parallax={i === 0 ? 22 : 28}
                  label={item.tag}
                  position={i === 0 ? "50% 50%" : "50% 40%"}
                  sizes="(max-width: 640px) 92vw, (max-width: 1024px) 46vw, 42vw"
                  className="aspect-[4/3] w-full sm:aspect-[5/4] lg:aspect-[16/11]"
                />
                <figcaption className="p-5 lg:p-6">
                  <h3
                    className={`${display} text-lg font-semibold uppercase leading-tight tracking-[0.03em] text-[var(--vx-white)] sm:text-xl`}
                  >
                    {item.title}
                  </h3>
                  <p className="mt-2.5 text-sm leading-relaxed text-[var(--vx-mute)]">
                    {item.body}
                  </p>
                </figcaption>
              </figure>
            </Wipe>
          ))}
        </div>
      </div>
    </section>
  );
}
