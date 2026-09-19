"use client";

import { C } from "../theme";
import { MaskText, Reveal, RuleDraw, SectionMark, Shell, useDisplay } from "../primitives";
import { MonogramPlate } from "../panels";
import { TEAM } from "../data";

/**
 * Équipe. Aucun portrait photographique n'existant pour cette démonstration,
 * chaque personne est identifiée par une plaque monogramme gravée — ce qui
 * reste cohérent avec la sobriété d'un cabinet, et évite tout visuel générique.
 */
export default function Team() {
  const display = useDisplay();

  return (
    <section
      id="equipe"
      className="scroll-mt-24 border-t"
      style={{ backgroundColor: C.paperPure, borderColor: C.rule }}
    >
      <Shell className="py-16 sm:py-20 lg:py-28">
        <Reveal>
          <SectionMark index="05" label="Équipe" />
        </Reveal>

        <div className="mt-8 grid grid-cols-1 gap-6 lg:mt-12 lg:grid-cols-12 lg:gap-12">
          <h2
            className={`${display} text-[1.7rem] font-medium leading-[1.16] tracking-[-0.012em] sm:text-[2.2rem] lg:col-span-6 lg:text-[2.6rem]`}
            style={{ color: C.ink }}
          >
            <MaskText>Une équipe restreinte,</MaskText>
            <MaskText delay={0.08}>engagée sur la durée.</MaskText>
          </h2>
          <Reveal delay={0.12} className="lg:col-span-5 lg:col-start-8 lg:pt-2">
            <p
              className="max-w-[48ch] text-[15px] leading-[1.8] sm:text-base"
              style={{ color: C.slate }}
            >
              L&rsquo;associé qui vous reçoit est celui qui conduit la mission. Nous ne
              déléguons pas l&rsquo;instruction d&rsquo;un dossier à une équipe que vous
              n&rsquo;auriez jamais rencontrée.
            </p>
          </Reveal>
        </div>

        <div className="mt-12 sm:mt-16">
          <RuleDraw color={C.ruleStrong} />
          <ul className="grid grid-cols-2 gap-x-5 gap-y-10 pt-8 sm:gap-x-8 lg:grid-cols-4 lg:gap-x-10">
            {TEAM.map((member, i) => (
              <li key={member.initials} className="group">
                <Reveal delay={0.06 * i}>
                  <MonogramPlate initials={member.initials} />
                  <h3
                    className={`${display} mt-4 text-[1.05rem] font-medium leading-tight sm:text-[1.2rem]`}
                    style={{ color: C.ink }}
                  >
                    {member.name}
                  </h3>
                  <p
                    className="mt-1.5 text-[10px] uppercase tracking-[0.22em] sm:text-[11px]"
                    style={{ color: C.brass }}
                  >
                    {member.role}
                  </p>
                  <p
                    className="mt-3 text-[13px] leading-[1.65] sm:text-[14px]"
                    style={{ color: C.slate }}
                  >
                    {member.focus}
                  </p>
                </Reveal>
              </li>
            ))}
          </ul>
        </div>

        <Reveal delay={0.1}>
          <p
            className="mt-10 border-t pt-4 text-[12px] leading-relaxed sm:mt-12"
            style={{ borderColor: C.rule, color: C.slate }}
          >
            Démonstration : les personnes présentées sur cette page sont fictives.
          </p>
        </Reveal>
      </Shell>
    </section>
  );
}
