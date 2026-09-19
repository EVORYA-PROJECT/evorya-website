"use client";

import { C } from "../theme";
import { MaskText, RuleDraw, Reveal, Shell, useDisplay } from "../primitives";
import Photo from "../Photo";
import { INTERLUDE, PHOTOS } from "../data";

/**
 * Respiration pleine largeur entre les domaines et la méthode.
 *
 * Une seule image, presque plein écran sur desktop, une phrase, un filet.
 * C'est aussi la bascule chromatique de la page : on entre dans le bleu nuit
 * de la section « Méthode » par une photographie déjà sombre, plutôt que par
 * une rupture franche de fond.
 */
export default function Interlude() {
  const display = useDisplay();

  return (
    <section
      aria-labelledby="interlude-titre"
      className="relative"
      style={{ backgroundColor: C.navy }}
    >
      <Photo
        asset={PHOTOS.tour}
        sizes="100vw"
        scrim="plate"
        tone={0.26}
        parallax={5}
        objectPosition="50% 30%"
        className="h-[62vh] min-h-[380px] w-full sm:h-[70vh] lg:h-[84vh]"
      >
        <Shell className="absolute inset-x-0 bottom-0 pb-10 sm:pb-14 lg:pb-16">
          <RuleDraw color="rgba(244,243,239,0.32)" />
          <div className="mt-6 grid grid-cols-1 gap-5 lg:grid-cols-12 lg:items-end lg:gap-10">
            <p
              className="text-[10px] uppercase tracking-[0.28em] lg:col-span-3 sm:text-[11px]"
              style={{ color: C.paper }}
            >
              {INTERLUDE.eyebrow}
            </p>

            <h2
              id="interlude-titre"
              className={`${display} text-[1.5rem] font-medium leading-[1.16] tracking-[-0.012em] sm:text-[2rem] lg:col-span-6 lg:text-[2.4rem]`}
              style={{ color: C.paper }}
            >
              <MaskText>{INTERLUDE.line}</MaskText>
            </h2>

            <Reveal delay={0.1} className="lg:col-span-3">
              <p
                className="max-w-[40ch] border-l pl-4 text-[13px] leading-[1.7] sm:text-[14px]"
                style={{ borderColor: C.brass, color: C.paper }}
              >
                {INTERLUDE.detail}
              </p>
            </Reveal>
          </div>
        </Shell>
      </Photo>
    </section>
  );
}
