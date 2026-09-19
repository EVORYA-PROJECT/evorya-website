"use client";

import MobileRail from "@/components/ui/MobileRail";

import { JobPlate } from "./Art";
import { JOBS, PHOTOS } from "./data";
import {
  MeasureRail,
  Reveal,
  SectionIndex,
  TechPhoto,
  Wipe,
  useDisplayFont,
} from "./Primitives";

export default function Workshop() {
  const display = useDisplayFont();

  return (
    <section
      id="atelier"
      className="bg-noise relative scroll-mt-32 border-b border-[var(--vx-line)] bg-[var(--vx-void)] py-16 sm:py-20 lg:py-28"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -left-[18%] top-0 h-full w-[45%] -skew-x-12 border-r border-[var(--vx-line)] bg-[var(--vx-carbon)]/70"
      />

      <div className="relative mx-auto max-w-[1400px] px-5 sm:px-7 lg:px-10">
        <div className="lg:flex lg:items-end lg:justify-between lg:gap-16">
          <div className="lg:max-w-xl">
            <Reveal x={-14} y={0}>
              <SectionIndex value="03" label="Passages récents" />
            </Reveal>
            <Reveal delay={0.06}>
              <h2
                className={`${display} mt-6 text-[clamp(2rem,6vw,3.4rem)] font-bold uppercase leading-[0.95] text-[var(--vx-white)]`}
              >
                Quatre fiches d&rsquo;intervention
              </h2>
            </Reveal>
          </div>
          <Reveal delay={0.1} className="mt-5 lg:mt-0 lg:max-w-sm">
            <p className="text-base leading-relaxed text-[var(--vx-chrome)]">
              Chaque véhicule ressort avec sa fiche : relevés avant/après, pièces
              montées et prochaine échéance d&rsquo;entretien. Exemples fictifs de
              démonstration.
            </p>
          </Reveal>
        </div>

        <MeasureRail className="mt-8 sm:mt-10" />

        <MobileRail label="Fiches d’intervention" className="mt-8 grid gap-6 sm:mt-10 sm:grid-cols-2 sm:gap-7 lg:grid-cols-4 lg:gap-6">
          {JOBS.map((job, i) => (
            <Reveal
              key={job.ref}
              delay={0.06 * i}
              y={26}
              className={i % 2 === 1 ? "lg:mt-16" : undefined}
            >
              <article className="vx-plate group h-full border border-[var(--vx-line)] bg-[var(--vx-steel)] transition-colors hover:border-[var(--vx-red)]/60">
                {job.photo ? (
                  // Fiches photographiées : la scène réelle remplace la planche,
                  // le vocabulaire de cotes reste identique (réf. + équerre).
                  <Wipe from="bottom" className="border-b border-[var(--vx-line)]">
                    <TechPhoto
                      photo={PHOTOS[job.photo]}
                      corner
                      parallax={18}
                      label={`RÉF. ${job.ref}`}
                      position="50% 45%"
                      sizes="(max-width: 640px) 92vw, (max-width: 1024px) 46vw, 23vw"
                      className="aspect-[4/3] w-full"
                    />
                  </Wipe>
                ) : (
                  <div
                    aria-hidden="true"
                    className="vx-blueprint relative border-b border-[var(--vx-line)] bg-[var(--vx-void)] text-[var(--vx-chrome)]"
                  >
                    <JobPlate variant={job.art} className="block h-auto w-full" />
                    <span className="vx-mono absolute left-4 top-4 text-xs tracking-[0.2em] text-[var(--vx-mute)]">
                      RÉF. {job.ref}
                    </span>
                    <span className="absolute right-0 top-0 h-8 w-8 border-r-2 border-t-2 border-[var(--vx-red)]" />
                  </div>
                )}

                <div className="p-5 lg:p-6">
                  <h3
                    className={`${display} text-lg font-semibold uppercase leading-tight tracking-[0.03em] text-[var(--vx-white)] sm:text-xl`}
                  >
                    {job.title}
                  </h3>
                  <p className="mt-3 text-sm leading-relaxed text-[var(--vx-mute)]">
                    {job.description}
                  </p>
                  <dl className="mt-5 grid grid-cols-3 gap-3 border-t border-[var(--vx-line)] pt-4">
                    {job.specs.map(([k, v]) => (
                      <div key={k}>
                        <dt className="vx-mono text-xs uppercase tracking-[0.14em] text-[var(--vx-mute)]">
                          {k}
                        </dt>
                        <dd className="mt-1 text-sm font-medium text-[var(--vx-white)]">{v}</dd>
                      </div>
                    ))}
                  </dl>
                </div>
              </article>
            </Reveal>
          ))}
        </MobileRail>
      </div>
    </section>
  );
}
