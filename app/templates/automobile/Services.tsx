"use client";

import { useMemo, useState } from "react";
import { motion } from "motion/react";
import { SERVICES, SERVICE_FAMILIES, type ServiceFamily } from "./data";
import { Reveal, SectionIndex, TechLabel, useDisplayFont } from "./Primitives";

type Filter = "Tout" | ServiceFamily;

const FILTERS: readonly Filter[] = ["Tout", ...SERVICE_FAMILIES];

export default function Services() {
  const display = useDisplayFont();
  const [filter, setFilter] = useState<Filter>("Tout");

  const visible = useMemo(
    () => (filter === "Tout" ? SERVICES : SERVICES.filter((s) => s.family === filter)),
    [filter],
  );

  return (
    <section
      id="prestations"
      className="relative scroll-mt-32 border-b border-[var(--vx-line)] bg-[var(--vx-carbon)] py-16 sm:py-20 lg:py-28"
    >
      <div
        aria-hidden="true"
        className="vx-diag pointer-events-none absolute inset-y-0 right-0 w-1/2 opacity-60"
      />

      <div className="relative mx-auto max-w-[1400px] px-5 sm:px-7 lg:px-10">
        <div className="lg:flex lg:items-end lg:justify-between lg:gap-12">
          <div className="lg:max-w-2xl">
            <Reveal x={-14} y={0}>
              <SectionIndex value="01" label="Prestations" />
            </Reveal>
            <Reveal delay={0.06}>
              <h2
                className={`${display} mt-6 text-[clamp(2rem,6vw,3.4rem)] font-bold uppercase leading-[0.95] tracking-[0.01em] text-[var(--vx-white)]`}
              >
                Ce que l&rsquo;atelier prend en charge
              </h2>
            </Reveal>
            <Reveal delay={0.1}>
              <p className="mt-5 max-w-xl text-base leading-relaxed text-[var(--vx-chrome)]">
                Chaque intervention part d&rsquo;un relevé, pas d&rsquo;une estimation. Les
                durées indiquées sont celles tenues en atelier, hors approvisionnement
                de pièces spécifiques.
              </p>
            </Reveal>
          </div>

          <Reveal delay={0.12} className="mt-8 lg:mt-0">
            <div
              role="group"
              aria-label="Filtrer les prestations par famille"
              className="flex flex-wrap gap-2"
            >
              {FILTERS.map((f) => {
                const active = f === filter;
                return (
                  <button
                    key={f}
                    type="button"
                    aria-pressed={active}
                    onClick={() => setFilter(f)}
                    className={`vx-plate-sm min-h-11 px-4 text-sm uppercase tracking-[0.14em] transition-colors sm:px-5 ${
                      active
                        ? "bg-[var(--vx-red)] text-white"
                        : "border border-[var(--vx-line)] text-[var(--vx-chrome)] hover:border-[var(--vx-red)] hover:text-[var(--vx-white)]"
                    }`}
                  >
                    {f}
                  </button>
                );
              })}
            </div>
          </Reveal>
        </div>

        <div className="mt-10 border-t border-[var(--vx-line)] sm:mt-14">
          <motion.ul key={filter}>
            {visible.map((service, i) => (
              <motion.li
                key={service.ref}
                initial={{ opacity: 0, x: -18 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.4, delay: i * 0.05, ease: [0.16, 1, 0.3, 1] }}
                className="vx-row relative border-b border-[var(--vx-line)]"
              >
                <div
                  aria-hidden="true"
                  className="vx-wipe pointer-events-none absolute inset-0 bg-gradient-to-r from-[var(--vx-red)]/14 via-[var(--vx-red)]/4 to-transparent"
                />
                <div className="relative grid gap-3 py-6 sm:py-7 lg:grid-cols-12 lg:items-baseline lg:gap-6">
                  <div className="flex items-center gap-4 lg:col-span-1">
                    <span className="vx-mono text-xs tracking-[0.2em] text-[var(--vx-red-hi)]">
                      /{service.ref}
                    </span>
                  </div>

                  <div className="lg:col-span-5">
                    <h3
                      className={`${display} text-xl font-semibold uppercase leading-tight tracking-[0.04em] text-[var(--vx-white)] sm:text-2xl`}
                    >
                      {service.title}
                    </h3>
                    <TechLabel className="mt-2 block">{service.family}</TechLabel>
                  </div>

                  <p className="text-sm leading-relaxed text-[var(--vx-mute)] lg:col-span-4 lg:text-[0.95rem]">
                    {service.description}
                  </p>

                  <div className="flex items-baseline justify-between gap-4 lg:col-span-2 lg:flex-col lg:items-end lg:gap-1">
                    <span
                      className={`${display} text-xl font-bold tracking-[0.04em] text-[var(--vx-white)] sm:text-2xl`}
                    >
                      {service.price}
                    </span>
                    <span className="vx-mono text-xs tracking-[0.16em] text-[var(--vx-mute)]">
                      {service.duration}
                    </span>
                  </div>
                </div>
              </motion.li>
            ))}
          </motion.ul>
        </div>

        <p className="vx-mono mt-6 text-xs leading-relaxed tracking-[0.1em] text-[var(--vx-mute)]">
          Tarifs indicatifs TTC, confirmés après relevé — contenu de démonstration.
        </p>
      </div>
    </section>
  );
}
