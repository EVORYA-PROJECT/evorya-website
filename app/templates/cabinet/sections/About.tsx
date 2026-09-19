"use client";

import MobileDisclosure from "@/components/ui/MobileDisclosure";

import { C } from "../theme";
import { MaskText, Reveal, RuleDraw, SectionMark, Shell, useDisplay } from "../primitives";
import { RulePlate } from "../panels";
import Photo from "../Photo";
import { CABINET_PARAGRAPHS, CABINET_PRINCIPLES, PHOTOS } from "../data";

/**
 * « Le cabinet » : une prise de parole courte, posée sur une grille asymétrique
 * (énoncé à gauche, texte courant à droite), puis trois principes alignés sur
 * des filets. Aucune promesse chiffrée, aucun label : la crédibilité passe par
 * la structure et la précision du propos.
 *
 * La section se referme sur un diptyque : la citation fondatrice en aplat bleu
 * nuit, et une photographie d'architecture en portrait qui déborde la grille
 * vers le haut — la seule asymétrie franche de la page.
 */
export default function About() {
  const display = useDisplay();

  return (
    <section
      id="cabinet"
      className="scroll-mt-24 border-t"
      style={{ backgroundColor: C.paper, borderColor: C.rule }}
    >
      <Shell className="py-16 sm:py-20 lg:py-28">
        <Reveal>
          <SectionMark index="01" label="Le cabinet" />
        </Reveal>

        <div className="mt-8 grid grid-cols-1 gap-10 lg:mt-12 lg:grid-cols-12 lg:gap-12">
          {/* Énoncé */}
          <div className="lg:col-span-6">
            <h2
              className={`${display} text-[1.6rem] font-medium leading-[1.18] tracking-[-0.01em] sm:text-[2.1rem] lg:text-[2.6rem]`}
              style={{ color: C.ink }}
            >
              <MaskText>Nous intervenons</MaskText>
              <MaskText delay={0.08}>quand l&rsquo;intuition ne suffit plus.</MaskText>
            </h2>
            <div className="mt-8 max-w-[34ch]">
              <RuleDraw color={C.brass} duration={0.7} />
            </div>
          </div>

          {/* Texte courant */}
          <div className="lg:col-span-6 lg:pt-1.5">
            <div className="space-y-5 md:columns-2 md:gap-8 md:space-y-0 lg:columns-1 lg:gap-0 lg:space-y-5">
              {CABINET_PARAGRAPHS.map((paragraph, i) => (
                <Reveal key={paragraph.slice(0, 24)} delay={0.06 * i}>
                  <p
                    className="text-[15px] leading-[1.8] sm:text-base"
                    style={{ color: C.slate }}
                  >
                    {paragraph}
                  </p>
                </Reveal>
              ))}
            </div>
          </div>
        </div>

        {/* Principes */}
        <div className="mt-14 sm:mt-16 lg:mt-20">
          <RuleDraw color={C.ruleStrong} />
          <ul className="grid grid-cols-1 md:grid-cols-3">
            {CABINET_PRINCIPLES.map((principle, i) => (
              <li
                key={principle.title}
                className={[
                  "border-b py-7 pr-4 sm:py-9",
                  i > 0 ? "md:border-l md:pl-7 lg:pl-10" : "",
                ]
                  .filter(Boolean)
                  .join(" ")}
                style={{ borderColor: C.rule }}
              >
                <Reveal delay={0.06 * i}>
                  <h3
                    className={`${display} text-lg font-medium tracking-[-0.005em] sm:text-xl`}
                    style={{ color: C.ink }}
                  >
                    {principle.title}
                  </h3>
                  <MobileDisclosure label="Lire notre engagement">
                  <p
                    className="mt-3 max-w-[38ch] text-[14px] leading-[1.7] sm:text-[15px]"
                    style={{ color: C.slate }}
                  >
                    {principle.text}
                  </p>
                  </MobileDisclosure>
                </Reveal>
              </li>
            ))}
          </ul>
        </div>

        {/* Diptyque de clôture : citation en aplat bleu nuit + photographie
            d'architecture en portrait, remontée au-dessus de la ligne de
            grille sur grand écran. */}
        <div className="mt-12 grid grid-cols-1 gap-8 sm:mt-16 lg:grid-cols-12 lg:gap-10">
          <Reveal delay={0.05} className="lg:col-span-7">
            <RulePlate className="h-full">
              <blockquote className="flex h-full flex-col justify-between gap-8 sm:gap-10">
                <p
                  className={`${display} max-w-[22ch] text-[1.25rem] leading-[1.35] sm:text-[1.6rem] lg:text-[2.1rem]`}
                  style={{ color: C.paper }}
                >
                  « Une décision mal instruite coûte toujours plus cher que le temps
                  qu&rsquo;on aurait mis à l&rsquo;instruire. »
                </p>
                <footer
                  className="text-[11px] uppercase tracking-[0.24em]"
                  style={{ color: C.fog }}
                >
                  Hélène Verdon
                  <span aria-hidden="true" className="mx-2">
                    —
                  </span>
                  Associée fondatrice
                </footer>
              </blockquote>
            </RulePlate>
          </Reveal>

          <figure className="lg:col-span-5">
            <Photo
              asset={PHOTOS.architecture}
              sizes="(min-width: 1024px) 34vw, (min-width: 640px) 60vw, 92vw"
              className="aspect-[4/5] w-full"
              objectPosition="50% 62%"
              parallax={4}
              tone={0.16}
              delay={0.08}
            />
            <figcaption
              className="mt-3 flex items-baseline gap-3 text-[11px] leading-relaxed"
              style={{ color: C.slate }}
            >
              <span
                aria-hidden="true"
                className="h-px w-6 shrink-0 translate-y-[-3px]"
                style={{ backgroundColor: C.brass }}
              />
              Une structure se lit à ses lignes de force, pas à sa façade.
            </figcaption>
          </figure>
        </div>
      </Shell>
    </section>
  );
}
