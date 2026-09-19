"use client";

import { Gauge } from "./Art";
import { COMMITMENTS, STATS } from "./data";
import { Counter, Reveal, SectionIndex, TechLabel, useDisplayFont } from "./Primitives";

export default function Expertise() {
  const display = useDisplayFont();

  return (
    <section
      id="expertise"
      className="relative scroll-mt-32 overflow-hidden border-b border-[var(--vx-line)] bg-[var(--vx-carbon)] py-16 sm:py-20 lg:py-28"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-[10%] -top-[30%] h-[80%] w-[55%] rotate-[24deg] bg-gradient-to-b from-[var(--vx-red-deep)]/35 to-transparent"
      />

      <div className="relative mx-auto max-w-[1400px] px-5 sm:px-7 lg:px-10">
        <div className="lg:grid lg:grid-cols-12 lg:gap-14">
          <div className="lg:col-span-5">
            <Reveal x={-14} y={0}>
              <SectionIndex value="04" label="Méthode" />
            </Reveal>
            <Reveal delay={0.06}>
              <h2
                className={`${display} mt-6 text-[clamp(2rem,6vw,3.4rem)] font-bold uppercase leading-[0.95] text-[var(--vx-white)]`}
              >
                Une exigence d&rsquo;atelier,
                <span className="text-[var(--vx-red-hi)]"> pas d&rsquo;improvisation</span>
              </h2>
            </Reveal>

            <ul className="mt-8 space-y-6 sm:mt-10">
              {COMMITMENTS.map((item, i) => (
                <Reveal key={item.title} delay={0.08 + i * 0.05} y={16}>
                  <li className="relative border-l-2 border-[var(--vx-red)] pl-5">
                    <h3
                      className={`${display} text-lg font-semibold uppercase tracking-[0.05em] text-[var(--vx-white)]`}
                    >
                      {item.title}
                    </h3>
                    <p className="mt-2 text-sm leading-relaxed text-[var(--vx-mute)] sm:text-base">
                      {item.body}
                    </p>
                  </li>
                </Reveal>
              ))}
            </ul>
          </div>

          <div className="mt-12 lg:col-span-7 lg:mt-0">
            <Reveal delay={0.05} y={22}>
              <div className="vx-plate vx-blueprint flex flex-col items-center border border-[var(--vx-line)] bg-[var(--vx-void)] px-5 py-8 sm:px-8 sm:py-10">
                <TechLabel>Indice de ponctualité — 12 derniers mois</TechLabel>
                <Gauge value={0.98} className="mt-6 block h-auto w-full max-w-sm" />
                <div className="mt-2 flex items-baseline gap-3">
                  <span
                    className={`${display} text-5xl font-bold tracking-tight text-[var(--vx-white)] sm:text-6xl`}
                  >
                    <Counter to={98} suffix=" %" />
                  </span>
                </div>
                <p className="mt-2 text-center text-sm text-[var(--vx-mute)]">
                  de véhicules restitués à l&rsquo;heure annoncée.
                </p>
              </div>
            </Reveal>

            <div className="mt-6 grid grid-cols-2 gap-px border border-[var(--vx-line)] bg-[var(--vx-line)]">
              {STATS.map((stat, i) => (
                <div key={stat.label} className="bg-[var(--vx-carbon)] p-5 sm:p-6">
                  <Reveal delay={0.05 * i} y={14}>
                    <span
                      className={`${display} block text-3xl font-bold leading-none tracking-tight text-[var(--vx-red-hi)] sm:text-4xl`}
                    >
                      <Counter to={stat.value} suffix={stat.suffix} />
                    </span>
                    <span className="mt-2 block text-sm font-medium uppercase tracking-[0.1em] text-[var(--vx-white)]">
                      {stat.label}
                    </span>
                    <span className="mt-2 block text-sm leading-relaxed text-[var(--vx-mute)]">
                      {stat.caption}
                    </span>
                  </Reveal>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
