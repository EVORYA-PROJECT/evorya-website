"use client";

import { PHOTOS } from "../photos";
import Photo from "../Photo";
import { SectionLabel } from "../Brand";
import { LinesUp, Reveal, Swipe, Unveil } from "../Reveal";

/**
 * Le moment « crispy ».
 *
 * Rupture visuelle assumée : c'est la seule section sur fond crème, texte
 * noir. Après cinq écrans en près-noir, l'inversion fait respirer la page et
 * signale qu'on change d'univers produit — le poulet, plus clair, plus doré,
 * y gagne aussi en contraste.
 *
 * Composition de magazine : le mot CRISPY occupe toute la largeur et les
 * photographies viennent chevaucher son bas. Le débord est volontaire, mais
 * il ne mange jamais plus que la moitié basse des lettres : le mot reste
 * parfaitement lisible.
 */
export default function Crispy({ d }: { d: string }) {
  return (
    <section
      id="crispy"
      className="relative overflow-hidden bg-[#F4EFE6] px-5 py-20 text-[#0B0B0C] sm:px-8 lg:px-12 lg:py-28"
    >
      <div className="mx-auto max-w-[1600px]">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
          <Reveal>
            <SectionLabel index="04" tone="dark">
              Poulet pané minute
            </SectionLabel>
          </Reveal>
          <Reveal delay={0.08} className="max-w-[42ch]">
            <p className="text-[15px] leading-[1.75] text-[#0B0B0C]/65">
              Filet entier, panure épaisse, friture à la commande. Il sort doré, il part
              tout de suite : c&rsquo;est toute la recette.
            </p>
          </Reveal>
        </div>

        <div className="relative mt-8 lg:mt-10">
          <h2
            className={`${d} relative z-0 text-[27vw] uppercase leading-[0.78] tracking-[-0.03em] text-[#0B0B0C] lg:text-[20vw]`}
          >
            <LinesUp lines={["Crispy"]} />
          </h2>

          {/* ---------------- Desktop ---------------- */}
          <div className="relative z-10 -mt-[6vw] hidden grid-cols-12 items-start gap-6 lg:grid">
            <Unveil className="col-span-4 col-start-1">
              <Photo
                asset={PHOTOS.chickenSlaw}
                sizes="32vw"
                grade={0.08}
                className="aspect-[3/4] w-full"
              />
            </Unveil>

            <div className="col-span-4 pt-[9vw]">
              <Reveal delay={0.1}>
                <p className={`${d} text-[42px] uppercase leading-[0.9] text-[#0B0B0C]`}>
                  Croustillant
                  <br />
                  <span className="text-[#E8391A]">tant qu&rsquo;il est chaud</span>
                </p>
                <p className="mt-5 max-w-[38ch] text-[15px] leading-[1.75] text-[#0B0B0C]/70">
                  Le filet est pané au moment, plongé, égoutté, salé à chaud puis monté
                  dans un pain toasté. Entre la friteuse et le comptoir, il ne se passe
                  rien d&rsquo;autre.
                </p>
                <ul className="mt-6 flex flex-wrap gap-2">
                  {["Crispy Big", "Hot Chicken", "Tenders × 6", "Chicken Wrap"].map((x) => (
                    <li
                      key={x}
                      className="border border-[#0B0B0C]/20 px-3 py-1.5 text-[11px] font-semibold uppercase tracking-[0.14em] text-[#0B0B0C]/70"
                    >
                      {x}
                    </li>
                  ))}
                </ul>
              </Reveal>
            </div>

            <Swipe from="right" className="col-span-4 pt-[3vw]" delay={0.12}>
              <Photo
                asset={PHOTOS.chickenFriture}
                sizes="32vw"
                grade={0.08}
                className="aspect-[4/5] w-full"
                objectPosition="58% center"
              />
            </Swipe>

            <Swipe className="col-span-7 col-start-3 mt-8" delay={0.05}>
              <Photo
                asset={PHOTOS.tenders}
                sizes="56vw"
                grade={0.08}
                className="aspect-[16/9] w-full"
                objectPosition="center 62%"
              />
            </Swipe>

            <Unveil className="col-span-3 mt-8" delay={0.1}>
              <Photo
                asset={PHOTOS.chickenCheddar}
                sizes="24vw"
                grade={0.08}
                className="aspect-[3/4] w-full"
              />
            </Unveil>
          </div>

          {/* ---------------- Mobile / tablette ---------------- */}
          <div className="relative z-10 -mt-[7vw] lg:hidden">
            <Unveil>
              <Photo
                asset={PHOTOS.chickenSlaw}
                sizes="100vw"
                grade={0.08}
                className="aspect-[3/4] w-full"
              />
            </Unveil>

            <Reveal delay={0.08} className="mt-7">
              <p className={`${d} text-[30px] uppercase leading-[0.92] text-[#0B0B0C]`}>
                Croustillant <span className="text-[#E8391A]">tant qu&rsquo;il est chaud</span>
              </p>
              <p className="mt-4 text-[15px] leading-[1.75] text-[#0B0B0C]/70">
                Le filet est pané au moment, plongé, égoutté, salé à chaud puis monté dans
                un pain toasté. Entre la friteuse et le comptoir, il ne se passe rien
                d&rsquo;autre.
              </p>
            </Reveal>

            <div className="mt-6 grid grid-cols-2 gap-3">
              <Swipe>
                <Photo
                  asset={PHOTOS.chickenFriture}
                  sizes="48vw"
                  grade={0.08}
                  className="aspect-[3/4] w-full"
                  objectPosition="58% center"
                />
              </Swipe>
              <Swipe from="right" delay={0.08}>
                <Photo
                  asset={PHOTOS.chickenCheddar}
                  sizes="48vw"
                  grade={0.08}
                  className="aspect-[3/4] w-full"
                />
              </Swipe>
            </div>

            <Swipe className="mt-3" delay={0.05}>
              <Photo
                asset={PHOTOS.tenders}
                sizes="100vw"
                grade={0.08}
                className="aspect-[16/10] w-full"
                objectPosition="center 62%"
              />
            </Swipe>

            <ul className="mt-6 flex flex-wrap gap-2">
              {["Crispy Big", "Hot Chicken", "Tenders × 6", "Chicken Wrap"].map((x) => (
                <li
                  key={x}
                  className="border border-[#0B0B0C]/20 px-3 py-1.5 text-[11px] font-semibold uppercase tracking-[0.14em] text-[#0B0B0C]/70"
                >
                  {x}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
