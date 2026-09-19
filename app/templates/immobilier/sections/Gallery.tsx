"use client";

import {
  GALLERY_ARCHES_PHOTO,
  GALLERY_BEDROOM_PHOTO,
  GALLERY_RESIDENCE_PHOTO,
  GALLERY_LOFT_PHOTO,
  GALLERY_POOL_PHOTO,
  GALLERY_STONE_PHOTO,
} from "../data";
import { CinematicPhoto, PropertyPhoto } from "../visuals";
import { Reveal, useDisplay } from "../ui";

/** Vignette avec repère brass (R.xx) et légende — vocabulaire Atrium, ton clair. */
function Frame({
  photo,
  sizes,
  className,
  reference,
  delay = 0,
  y = 26,
}: {
  photo: { src: string; alt: string; caption: string };
  sizes: string;
  className: string;
  reference: string;
  delay?: number;
  y?: number;
}) {
  return (
    <Reveal delay={delay} y={y}>
      <figure>
        <PropertyPhoto photo={photo} sizes={sizes} reveal marks={false} className={className} />
        <figcaption className="mt-3 flex items-baseline justify-between gap-3 border-t border-white/15 pt-3 text-[0.72rem] tracking-[0.12em] uppercase text-[#8FA5B6]">
          <span>{photo.caption}</span>
          <span aria-hidden="true" className="text-[#C9A76A] tabular-nums">
            {reference}
          </span>
        </figcaption>
      </figure>
    </Reveal>
  );
}

/**
 * « Galerie architecturale » — respiration sombre de la page. Seule section
 * au fond bleu-gris profond : elle casse volontairement le rythme clair du
 * reste du site pour donner aux photographies une vraie salle d'exposition.
 * Composition éditoriale à tailles variées, close par une image qui
 * s'agrandit à l'approche (`CinematicPhoto`) — le seul moment de ce type.
 */
export default function Gallery() {
  const display = useDisplay();

  return (
    <section
      id="galerie"
      className="scroll-mt-28 border-b border-white/10 bg-[#1E2833] lg:scroll-mt-32"
    >
      <div className="mx-auto max-w-[1400px] px-5 pt-16 pb-16 sm:px-8 lg:px-10 lg:pt-24 lg:pb-24">
        <div className="lg:flex lg:items-end lg:justify-between lg:gap-12">
          <div>
            <Reveal>
              <div className="flex items-baseline gap-3">
                <span className="text-[0.75rem] font-medium tracking-[0.2em] text-[#C9A76A] tabular-nums">
                  04
                </span>
                <span
                  aria-hidden="true"
                  className="h-px w-8 origin-left bg-white/25"
                />
                <span className="text-[0.75rem] font-medium tracking-[0.28em] uppercase text-[#8FA5B6]">
                  Galerie architecturale
                </span>
              </div>
            </Reveal>
            <Reveal delay={0.05}>
              <h2
                className={`${display} mt-8 max-w-2xl text-[2rem] leading-[1.08] font-semibold tracking-[-0.02em] text-white sm:text-[2.6rem] lg:text-[3rem]`}
              >
                Ce que l&rsquo;architecture donne à voir.
              </h2>
            </Reveal>
          </div>
          <Reveal delay={0.1}>
            <p className="mt-5 max-w-sm text-[1rem] leading-relaxed text-[#A9BCCB] lg:mt-0 lg:pb-2">
              Matière, lumière, arcades : un aperçu de ce que l&rsquo;agence documente à
              chaque visite, au-delà des biens publiés.
            </p>
          </Reveal>
        </div>

        <div className="mobile-gallery-pair mt-12 grid gap-5 lg:mt-16 lg:grid-cols-12 lg:gap-6">
          <div className="lg:col-span-8">
            <Frame
              photo={GALLERY_RESIDENCE_PHOTO}
              sizes="(min-width: 1024px) 900px, 92vw"
              className="h-[300px] sm:h-[380px] lg:h-[520px]"
              reference="G.01"
            />
          </div>
          <div className="lg:col-span-4">
            <Frame
              photo={GALLERY_ARCHES_PHOTO}
              sizes="(min-width: 1024px) 380px, 92vw"
              className="h-[300px] sm:h-[380px] lg:h-[520px]"
              reference="G.02"
              delay={0.08}
            />
          </div>
        </div>

        <div className="mobile-gallery-trio mt-5 grid gap-5 sm:grid-cols-2 lg:mt-6 lg:grid-cols-12 lg:gap-6">
          <div className="lg:col-span-3">
            <Frame
              photo={GALLERY_STONE_PHOTO}
              sizes="(min-width: 1024px) 300px, 46vw"
              className="h-[220px] lg:h-[280px]"
              reference="G.03"
            />
          </div>
          <div className="sm:col-span-2 lg:col-span-5">
            <Frame
              photo={GALLERY_BEDROOM_PHOTO}
              sizes="(min-width: 1024px) 460px, 92vw"
              className="h-[220px] lg:h-[280px]"
              reference="G.04"
              delay={0.06}
            />
          </div>
          <div className="lg:col-span-4">
            <Frame
              photo={GALLERY_LOFT_PHOTO}
              sizes="(min-width: 1024px) 380px, 46vw"
              className="h-[220px] lg:h-[280px]"
              reference="G.05"
              delay={0.12}
            />
          </div>
        </div>

        {/* Moment cinématique : la seule image de la démo qui s'agrandit
            réellement à l'approche, plutôt que de simplement apparaître. */}
        <div className="relative mt-10 lg:mt-14">
          <Reveal y={30}>
            <CinematicPhoto
              photo={GALLERY_POOL_PHOTO}
              sizes="(min-width: 1440px) 1320px, 92vw"
              className="h-[320px] sm:h-[440px] lg:h-[600px]"
            >
              <span className="pointer-events-none absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-[#0E141B]/70 to-transparent" />
              <span className="pointer-events-none absolute bottom-6 left-6 sm:bottom-8 sm:left-8">
                <span className="block text-[0.72rem] font-medium tracking-[0.24em] uppercase text-white/70">
                  {GALLERY_POOL_PHOTO.caption}
                </span>
                <span
                  className={`${display} mt-2 block max-w-md text-[1.35rem] leading-snug font-semibold text-white sm:text-[1.7rem]`}
                >
                  Un extérieur se juge aussi à son eau, à son ombre, à son silence.
                </span>
              </span>
              <span
                aria-hidden="true"
                className="pointer-events-none absolute right-6 bottom-6 text-[0.75rem] font-medium tracking-[0.2em] text-[#C9A76A] tabular-nums sm:right-8 sm:bottom-8"
              >
                G.06
              </span>
            </CinematicPhoto>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
