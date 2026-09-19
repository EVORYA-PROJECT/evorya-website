"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "motion/react";
import { PHOTOS } from "../photos";
import Photo from "../Photo";
import { ActionLink, Wordmark } from "../Brand";
import { LinesUp, Reveal, useReducedMotion } from "../Reveal";

/**
 * Clôture.
 *
 * Une seule image, plein cadre, qui se dézoome très lentement au scroll
 * (1,12 → 1,00) pendant que le titre se lève ligne par ligne. C'est le
 * dernier mouvement de la page : il doit se terminer, pas boucler.
 *
 * Les deux boutons renvoient au menu et aux adresses. Aucun panier, aucun
 * paiement, aucune commande : l'enseigne est fictive et la page ne simule
 * jamais une transaction.
 */
export default function FinalCta({ d }: { d: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const scale = useTransform(scrollYProgress, [0, 1], [1.12, 1]);

  return (
    <section className="relative">
      <div ref={ref} className="relative overflow-hidden">
        <motion.div style={reduce ? undefined : { scale }}>
          <Photo
            asset={PHOTOS.burgerAssiette}
            sizes="100vw"
            grade={0.16}
            scrim="frame"
            className="h-[78vh] min-h-[520px] w-full lg:h-[86vh]"
            objectPosition="center 45%"
          />
        </motion.div>

        <div className="absolute inset-0 flex items-end">
          <div className="mx-auto w-full max-w-[1600px] px-5 pb-12 sm:px-8 lg:px-12 lg:pb-16">
            <h2
              className={`${d} text-[15vw] uppercase leading-[0.84] tracking-[-0.025em] text-[#F4EFE6] sm:text-[12vw] lg:text-[8.5vw]`}
            >
              <LinesUp
                lines={[
                  "Vous avez faim.",
                  <span key="b" className="text-[#FF3B1F]">Ça tombe bien.</span>,
                ]}
              />
            </h2>

            <Reveal delay={0.15} className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
              <ActionLink href="#menu" variant="solid" className="w-full sm:w-auto">
                Voir le menu
              </ActionLink>
              <ActionLink href="#spots" variant="light" className="w-full sm:w-auto">
                Nous trouver
              </ActionLink>
              <span className="mt-2 text-[12px] uppercase tracking-[0.18em] text-[#F4EFE6]/50 sm:ml-4 sm:mt-0">
                Ouvert jusqu&rsquo;à minuit
              </span>
            </Reveal>
          </div>
        </div>
      </div>

      {/* Signature typographique surdimensionnée, purement graphique. */}
      <div className="overflow-hidden border-t border-[#F4EFE6]/10 px-5 py-8 sm:px-8 lg:px-12">
        <Reveal>
          <p aria-hidden="true" className="flex items-baseline justify-between gap-4">
            <Wordmark
              d={d}
              className="text-[16vw] leading-[0.8] text-[#F4EFE6]/10"
              blockClassName="h-[0.18em] w-[0.18em] opacity-40"
            />
            <span className="shrink-0 text-[10px] font-semibold uppercase tracking-[0.24em] text-[#F4EFE6]/25">
              Smashé fort · Servi chaud
            </span>
          </p>
        </Reveal>
      </div>
    </section>
  );
}
