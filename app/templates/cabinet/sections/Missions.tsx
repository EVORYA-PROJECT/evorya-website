"use client";

import MobileDisclosure from "@/components/ui/MobileDisclosure";

import { C } from "../theme";
import { MaskText, Reveal, RuleDraw, SectionMark, Shell, useDisplay } from "../primitives";
import Photo from "../Photo";
import { CASE_STUDIES, PHOTOS } from "../data";

/**
 * Exemples de missions. Traités comme des pièces de dossier : intitulé,
 * caractéristiques en marge, puis contexte / intervention / issue en liste de
 * définitions. Le caractère illustratif et fictif est signalé deux fois —
 * en tête de section et sur chaque exemple.
 */
export default function Missions() {
  const display = useDisplay();

  return (
    <section
      id="missions"
      className="scroll-mt-24 border-t"
      style={{ backgroundColor: C.paper, borderColor: C.rule }}
    >
      <Shell className="py-16 sm:py-20 lg:py-28">
        <Reveal>
          <SectionMark index="04" label="Exemples de missions" />
        </Reveal>

        <div className="mt-8 grid grid-cols-1 gap-6 lg:mt-12 lg:grid-cols-12 lg:gap-12">
          <h2
            className={`${display} text-[1.7rem] font-medium leading-[1.16] tracking-[-0.012em] sm:text-[2.2rem] lg:col-span-6 lg:text-[2.6rem]`}
            style={{ color: C.ink }}
          >
            <MaskText>Deux situations,</MaskText>
            <MaskText delay={0.08}>traitées de bout en bout.</MaskText>
          </h2>

          <Reveal delay={0.12} className="lg:col-span-5 lg:col-start-8">
            <div
              className="border-l py-1 pl-5"
              style={{ borderColor: C.brass }}
            >
              <p
                className="max-w-[46ch] text-[14px] leading-[1.75] sm:text-[15px]"
                style={{ color: C.slate }}
              >
                Les deux exemples ci-dessous sont des cas <strong style={{ color: C.ink }}>fictifs</strong>,
                construits à titre d&rsquo;illustration pour décrire la manière dont le
                cabinet travaille. Ils ne correspondent à aucun client réel.
              </p>
            </div>
          </Reveal>
        </div>

        <div className="mt-12 sm:mt-16">
          {CASE_STUDIES.map((study, index) => (
            <article key={study.index} className={index > 0 ? "mt-14 sm:mt-20" : ""}>
              <RuleDraw color={C.ruleStrong} />

              <div className="grid grid-cols-1 gap-8 pt-6 sm:pt-8 lg:grid-cols-12 lg:gap-12">
                {/* Marge : caractéristiques */}
                <div className="lg:col-span-4">
                  <Reveal>
                    <p
                      className="text-[10px] uppercase tracking-[0.24em] sm:text-[11px]"
                      style={{ color: C.brass }}
                    >
                      {study.index} — Exemple à titre d&rsquo;illustration
                    </p>

                    <dl className="mt-6 grid grid-cols-2 gap-x-6 lg:grid-cols-1 lg:gap-x-0">
                      {[
                        { term: "Secteur", detail: study.sector },
                        { term: "Durée", detail: study.duration },
                        { term: "Domaine", detail: study.area },
                      ].map((meta) => (
                        <div
                          key={meta.term}
                          className="border-t py-3"
                          style={{ borderColor: C.rule }}
                        >
                          <dt
                            className="text-[10px] uppercase tracking-[0.22em]"
                            style={{ color: C.slate }}
                          >
                            {meta.term}
                          </dt>
                          <dd className="mt-1 text-[14px] leading-snug" style={{ color: C.ink }}>
                            {meta.detail}
                          </dd>
                        </div>
                      ))}
                    </dl>
                  </Reveal>

                  {/* Marge illustrée : une architecture, jamais un lieu ou une
                      personne qui pourrait passer pour le client décrit. */}
                  <figure className="mt-8">
                    <Photo
                      asset={PHOTOS[study.photo]}
                      sizes="(min-width: 1024px) 30vw, (min-width: 640px) 60vw, 92vw"
                      className={`w-full ${
                        index === 0 ? "aspect-[4/5]" : "aspect-[4/3]"
                      }`}
                      tone={0.18}
                      parallax={index === 0 ? 3 : 0}
                      delay={0.06}
                    />
                    <figcaption
                      className="mt-3 text-[11px] leading-relaxed"
                      style={{ color: C.slate }}
                    >
                      Illustration — architecture sans lien avec le cas décrit.
                    </figcaption>
                  </figure>
                </div>

                {/* Corps du cas */}
                <div className="lg:col-span-8">
                  <Reveal delay={0.06}>
                    <h3
                      className={`${display} max-w-[22ch] text-[1.35rem] font-medium leading-[1.22] tracking-[-0.008em] sm:text-[1.75rem] lg:text-[2rem]`}
                      style={{ color: C.ink }}
                    >
                      {study.title}
                    </h3>
                  </Reveal>

                  <MobileDisclosure label="Ouvrir le dossier">
                  <dl className="mt-7 sm:mt-9">
                    {study.entries.map((entry, i) => (
                      <Reveal
                        key={entry.term}
                        delay={0.06 + 0.05 * i}
                        className="grid grid-cols-1 gap-2 border-t py-5 md:grid-cols-12 md:gap-6"
                        style={{ borderColor: C.rule }}
                      >
                        <dt
                          className="text-[10px] uppercase tracking-[0.24em] md:col-span-3"
                          style={{ color: C.slate }}
                        >
                          {entry.term}
                        </dt>
                        <dd
                          className="max-w-[60ch] text-[14px] leading-[1.75] sm:text-[15px] md:col-span-9"
                          style={{ color: C.ink }}
                        >
                          {entry.detail}
                        </dd>
                      </Reveal>
                    ))}
                  </dl>
                  </MobileDisclosure>
                </div>
              </div>
            </article>
          ))}
        </div>
      </Shell>
    </section>
  );
}
