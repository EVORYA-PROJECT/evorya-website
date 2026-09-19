"use client";

import { C } from "../theme";
import { MaskText, Reveal, RuleDraw, SectionMark, Shell, useDisplay } from "../primitives";
import { CONTACT, FAQ, FAQ_ASIDE } from "../data";

/**
 * Questions fréquentes. Volontairement non repliable : un cabinet répond,
 * il ne fait pas chercher. Deux colonnes dès la tablette, lecture continue.
 */
export default function Faq() {
  const display = useDisplay();

  return (
    <section
      className="border-t"
      style={{ backgroundColor: C.paper, borderColor: C.rule }}
    >
      <Shell className="py-16 sm:py-20 lg:py-24">
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-12 lg:gap-12">
          <div className="lg:col-span-4">
            <Reveal>
              <SectionMark index="06" label="Questions fréquentes" />
            </Reveal>
            <h2
              className={`${display} mt-6 text-[1.5rem] font-medium leading-[1.18] tracking-[-0.01em] sm:text-[1.9rem] lg:text-[2.1rem]`}
              style={{ color: C.ink }}
            >
              <MaskText>Avant de nous écrire.</MaskText>
            </h2>

            {/* La colonne restait vide sous le titre sur grand écran : une
                sortie utile plutôt qu'un blanc involontaire. */}
            <Reveal delay={0.12} className="mt-8 max-w-[34ch] lg:mt-12">
              <RuleDraw color={C.brass} duration={0.7} />
              <h3
                className={`${display} mt-5 text-[1.05rem] font-medium leading-[1.3]`}
                style={{ color: C.ink }}
              >
                {FAQ_ASIDE.title}
              </h3>
              <p
                className="mt-2.5 text-[14px] leading-[1.7]"
                style={{ color: C.slate }}
              >
                {FAQ_ASIDE.text}
              </p>
              <a
                href={`mailto:${CONTACT.email}`}
                className="group mt-5 inline-flex h-11 items-center gap-3 border px-5 text-[11px] uppercase tracking-[0.2em] transition-colors hover:bg-[#141B26] hover:text-[#F4F3EF]"
                style={{ borderColor: C.ruleStrong, color: C.ink }}
              >
                {FAQ_ASIDE.linkLabel}
                <span
                  aria-hidden="true"
                  className="transition-transform duration-300 group-hover:translate-x-1"
                >
                  →
                </span>
              </a>
            </Reveal>
          </div>

          <dl className="grid grid-cols-1 gap-x-10 md:grid-cols-2 lg:col-span-8 lg:gap-x-12">
            {FAQ.map((item, i) => (
              <Reveal
                key={item.question}
                delay={0.05 * i}
                className="border-t py-6"
                style={{ borderColor: C.rule }}
              >
                <dt
                  className={`${display} text-[1.05rem] font-medium leading-[1.3] sm:text-[1.15rem]`}
                  style={{ color: C.ink }}
                >
                  {item.question}
                </dt>
                <dd
                  className="mt-3 max-w-[46ch] text-[14px] leading-[1.75] sm:text-[15px]"
                  style={{ color: C.slate }}
                >
                  {item.answer}
                </dd>
              </Reveal>
            ))}
          </dl>
        </div>
      </Shell>
    </section>
  );
}
