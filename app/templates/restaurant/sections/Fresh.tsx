"use client";

import { FRESH_STEPS } from "../data";
import { PHOTOS } from "../photos";
import Photo from "../Photo";
import { SectionLabel } from "../Brand";
import { LinesUp, Reveal, Swipe } from "../Reveal";

/**
 * Trois gestes, trois photos.
 *
 * On ne décrit QUE des gestes — écraser, paner, monter. Aucune allégation
 * nutritionnelle, aucune certification : l'enseigne est fictive, elle ne peut
 * rien promettre de vérifiable, et une démo n'a pas à inventer des labels.
 *
 * Le rythme alterne (photo à gauche / photo à droite) et la balayette de
 * révélation change de sens avec lui : le mouvement suit la lecture au lieu
 * de la contrarier.
 */
export default function Fresh({ d }: { d: string }) {
  return (
    <section className="relative px-5 py-20 sm:px-8 lg:px-12 lg:py-32">
      <div className="mx-auto max-w-[1600px]">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <Reveal>
              <SectionLabel index="06">Derrière le comptoir</SectionLabel>
            </Reveal>
            <h2
              className={`${d} mt-5 text-[14vw] uppercase leading-[0.85] tracking-[-0.02em] text-[#F4EFE6] sm:text-[11vw] lg:text-[7.5vw]`}
            >
              <LinesUp
                lines={["Monté", <span key="c" className="text-[#FF3B1F]">à la commande</span>]}
              />
            </h2>
          </div>
          <Reveal delay={0.1} className="max-w-[38ch] lg:pb-4">
            <p className="text-[15px] leading-[1.75] text-[#F4EFE6]/60">
              Rien n&rsquo;est assemblé à l&rsquo;avance. Trois gestes entre votre commande et
              le comptoir, dans cet ordre, à chaque fois.
            </p>
          </Reveal>
        </div>

        <ol className="mobile-fresh mt-14 space-y-16 lg:mt-20 lg:space-y-28">
          {FRESH_STEPS.map((s, i) => {
            const flip = i % 2 === 1;
            return (
              <li key={s.step} className="grid grid-cols-12 items-center gap-6 lg:gap-14">
                <Swipe
                  from={flip ? "right" : "left"}
                  className={`col-span-12 lg:col-span-7 ${flip ? "lg:order-2" : "lg:order-1"}`}
                >
                  <Photo
                    asset={PHOTOS[s.photo]}
                    sizes="(min-width:1024px) 56vw, 100vw"
                    grade={0.11}
                    parallax={4}
                    className="aspect-[16/10] w-full"
                  />
                </Swipe>

                <div
                  className={`col-span-12 lg:col-span-5 ${flip ? "lg:order-1" : "lg:order-2"}`}
                >
                  <Reveal delay={0.08}>
                    <p
                      className={`${d} text-[16vw] leading-[0.8] text-[#F4EFE6]/12 sm:text-[11vw] lg:text-[7vw]`}
                    >
                      {s.step}
                    </p>
                    <p
                      className={`${d} -mt-[2vw] text-[11vw] uppercase leading-[0.9] tracking-[-0.02em] text-[#FF3B1F] sm:text-[8vw] lg:-mt-[1.6vw] lg:text-[4.6vw]`}
                    >
                      {s.title}
                    </p>
                    <p className="mt-4 max-w-[42ch] text-[15px] leading-[1.75] text-[#F4EFE6]/65 lg:text-[16px]">
                      {s.text}
                    </p>
                  </Reveal>
                </div>
              </li>
            );
          })}
        </ol>
      </div>
    </section>
  );
}
