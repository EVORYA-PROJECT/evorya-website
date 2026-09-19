"use client";

import MobileDisclosure from "@/components/ui/MobileDisclosure";

import { C } from "../theme";
import { MaskText, Reveal, RuleDraw, SectionMark, Shell, useDisplay } from "../primitives";
import { EXPERTISE } from "../data";

/**
 * Domaines d'intervention. Grille stricte : une colonne en mobile, deux en
 * tablette, quatre en grand écran, séparées par de simples filets — pas de
 * cartes arrondies, pas d'ombres. La numérotation laiton tient lieu d'accent.
 */
export default function Expertise() {
  const display = useDisplay();

  return (
    <section
      id="expertise"
      className="scroll-mt-24 border-t"
      style={{ backgroundColor: C.paperPure, borderColor: C.rule }}
    >
      <Shell className="py-16 sm:py-20 lg:py-28">
        <Reveal>
          <SectionMark index="02" label="Domaines d’intervention" />
        </Reveal>

        <div className="mt-8 grid grid-cols-1 gap-6 lg:mt-12 lg:grid-cols-12 lg:gap-12">
          <h2
            className={`${display} text-[1.7rem] font-medium leading-[1.16] tracking-[-0.012em] sm:text-[2.2rem] lg:col-span-6 lg:text-[2.6rem]`}
            style={{ color: C.ink }}
          >
            <MaskText>Quatre domaines,</MaskText>
            <MaskText delay={0.08}>une seule exigence.</MaskText>
          </h2>
          <Reveal delay={0.12} className="lg:col-span-5 lg:col-start-8 lg:pt-2">
            <p
              className="max-w-[48ch] text-[15px] leading-[1.8] sm:text-base"
              style={{ color: C.slate }}
            >
              Le cabinet n&rsquo;intervient que sur les sujets qu&rsquo;il maîtrise de bout
              en bout. Chaque domaine est porté par un associé, avec le même niveau
              d&rsquo;instruction écrite avant toute recommandation.
            </p>
          </Reveal>
        </div>

        <div className="mt-12 sm:mt-16">
          <RuleDraw color={C.ruleStrong} />
          <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4">
            {EXPERTISE.map((area, i) => (
              <li
                key={area.index}
                className={[
                  "group border-b pb-8 pr-6 pt-6 transition-colors sm:pt-7",
                  i % 2 === 1 ? "md:border-l md:pl-6 lg:pl-7" : "",
                  i > 0 ? "lg:border-l lg:pl-7" : "",
                ]
                  .filter(Boolean)
                  .join(" ")}
                style={{ borderColor: C.rule }}
              >
                <Reveal delay={0.06 * i}>
                  <div className="flex items-baseline gap-3">
                    <span
                      className="text-[11px] tracking-[0.22em] transition-colors duration-300"
                      style={{ color: C.brass }}
                    >
                      {area.index}
                    </span>
                    <span
                      aria-hidden="true"
                      className="h-px flex-1 origin-left scale-x-0 transition-transform duration-500 ease-out group-hover:scale-x-100"
                      style={{ backgroundColor: C.brass }}
                    />
                  </div>

                  <h3
                    className={`${display} mt-4 text-[1.15rem] font-medium leading-[1.25] tracking-[-0.005em] sm:text-[1.3rem]`}
                    style={{ color: C.ink }}
                  >
                    {area.title}
                  </h3>

                  <p
                    className="mt-3 max-w-[40ch] text-[14px] leading-[1.7] sm:text-[15px]"
                    style={{ color: C.slate }}
                  >
                    {area.summary}
                  </p>

                  <MobileDisclosure label="Voir les interventions">
                  <ul className="mt-5 space-y-0">
                    {area.items.map((item) => (
                      <li
                        key={item}
                        className="border-t py-2.5 text-[13px] leading-snug"
                        style={{ borderColor: C.rule, color: C.ink }}
                      >
                        {item}
                      </li>
                    ))}
                  </ul>
                  </MobileDisclosure>
                </Reveal>
              </li>
            ))}
          </ul>
        </div>
      </Shell>
    </section>
  );
}
