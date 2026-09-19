"use client";

import { WALL } from "../data";
import { PHOTOS } from "../photos";
import Photo from "../Photo";
import { SectionLabel } from "../Brand";
import { LinesUp, Reveal, Stagger, StaggerItem } from "../Reveal";

/**
 * Mur photo.
 *
 * Mosaïque volontairement irrégulière : les cases ne partagent ni la même
 * largeur ni le même rapport, ce qui évite la « planche-contact » où toutes
 * les images se valent. Chaque case a sa propre amplitude de parallaxe
 * (3 à 6 %) — c'est le décalage entre elles qui donne la profondeur, pas
 * l'amplitude elle-même.
 *
 * La parallaxe est gérée dans `Photo` : desktop uniquement, coupée sous
 * `prefers-reduced-motion`. Le zoom au survol est plafonné à 1,035 : au-delà
 * on voit la photo « respirer », ce qui fait bon marché.
 */
export default function FoodWall({ d }: { d: string }) {
  return (
    <section className="relative px-5 py-20 sm:px-8 lg:px-12 lg:py-32">
      <div className="mx-auto max-w-[1600px]">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <Reveal>
              <SectionLabel index="07">Le mur</SectionLabel>
            </Reveal>
            <h2
              className={`${d} mt-5 text-[14vw] uppercase leading-[0.85] tracking-[-0.02em] text-[#F4EFE6] sm:text-[11vw] lg:text-[7.5vw]`}
            >
              <LinesUp lines={["Tout ce", <span key="q" className="text-[#FF3B1F]">qui passe</span>]} />
            </h2>
          </div>
          <Reveal delay={0.1} className="max-w-[34ch] lg:pb-4">
            <p className="text-[15px] leading-[1.75] text-[#F4EFE6]/60">
              Burgers, frites, poulet, glaces. Sept images, une seule lumière.
            </p>
          </Reveal>
        </div>

        <Stagger className="mobile-rail mobile-food-wall mt-12 grid grid-cols-2 gap-3 md:grid-cols-6 md:gap-4" step={0.06}>
          {WALL.map((tile) => (
            <StaggerItem key={tile.photo} className={`group relative ${tile.className}`}>
              <div className="relative w-full overflow-hidden" style={{ aspectRatio: tile.ratio }}>
                <Photo
                  asset={PHOTOS[tile.photo]}
                  sizes="(min-width:768px) 40vw, 50vw"
                  grade={0.1}
                  parallax={tile.parallax}
                  zoomOnHover
                  objectPosition={tile.objectPosition}
                  className="h-full w-full"
                />
                <span
                  aria-hidden="true"
                  className="pointer-events-none absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-[#08080A]/85 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100"
                />
                <span
                  aria-hidden="true"
                  className="pointer-events-none absolute bottom-3 left-3 translate-y-2 text-[11px] font-semibold uppercase tracking-[0.18em] text-[#F4EFE6] opacity-0 transition-all duration-500 group-hover:translate-y-0 group-hover:opacity-100"
                >
                  {tile.caption}
                </span>
              </div>
            </StaggerItem>
          ))}
        </Stagger>
        <p className="mobile-rail-hint" aria-hidden="true">Faire défiler <span>← &nbsp; →</span></p>
      </div>
    </section>
  );
}
