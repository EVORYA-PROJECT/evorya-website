"use client";

import { PHOTOS } from "../photos";
import Photo from "../Photo";
import { SectionLabel } from "../Brand";
import { LinesUp, Reveal, Swipe, Unveil } from "../Reveal";

/**
 * Le moment « loaded ».
 *
 * Troisième traitement visuel d'affilée, volontairement différent des deux
 * précédents : écran scindé, la photo de gauche reste COLLÉE pendant que la
 * colonne de droite défile. On retrouve le noir, mais la lecture n'a plus
 * rien à voir avec la galerie ni avec la section crème.
 *
 * Le `sticky` est réservé au desktop : sur mobile il enfermerait la moitié
 * de l'écran dans une image fixe pendant tout le scroll.
 */
export default function LoadedFries({ d }: { d: string }) {
  return (
    <section
      aria-labelledby="krush-loaded-title"
      className="relative border-y border-[#F4EFE6]/10"
    >
      {/* ---------------- Desktop : écran scindé ---------------- */}
      <div className="hidden lg:grid lg:grid-cols-2">
        <div className="relative">
          <div className="sticky top-0 h-[100dvh]">
            <Photo
              asset={PHOTOS.loadedBoites}
              sizes="50vw"
              grade={0.14}
              parallax={0}
              className="h-full w-full"
              objectPosition="center 48%"
            />
            <span
              aria-hidden="true"
              className={`${d} krush-vert absolute left-6 top-1/2 -translate-y-1/2 text-[13px] uppercase tracking-[0.5em] text-[#F4EFE6]/70`}
            >
              Loaded · Cheddar · Bacon
            </span>
          </div>
        </div>

        <div className="px-12 py-28 xl:px-20">
          <Reveal>
            <SectionLabel index="05">Frites chargées</SectionLabel>
          </Reveal>
          <h2
            id="krush-loaded-title"
            className={`${d} mt-6 text-[9vw] uppercase leading-[0.84] tracking-[-0.02em] text-[#F4EFE6] xl:text-[7.5vw]`}
          >
            <LinesUp lines={["Loaded", <span key="f" className="text-[#FF3B1F]">Frites</span>]} />
          </h2>
          <Reveal delay={0.1}>
            <p className="mt-8 max-w-[44ch] text-[17px] leading-[1.75] text-[#F4EFE6]/70">
              Frites coupées fines, double cuisson, noyées sous le cheddar fondu et le
              bacon grillé, puis un trait de sauce Krush. Ça se mange à la fourchette, et
              ça ne se partage pas vraiment.
            </p>
          </Reveal>

          <dl className="mt-12 grid grid-cols-2 gap-x-8 gap-y-8 border-t border-[#F4EFE6]/12 pt-10">
            {[
              ["Frites maison", "25 MAD"],
              ["Loaded Frites", "45 MAD"],
              ["Frites sauce Krush", "32 MAD"],
              ["Onion Rings", "35 MAD"],
            ].map(([k, v], i) => (
              <Reveal key={k} delay={0.05 * i} className="block">
                <dt className={`${d} text-[26px] uppercase leading-none text-[#F4EFE6]`}>{k}</dt>
                <dd className="mt-1.5 text-[15px] font-semibold tabular-nums text-[#FF3B1F]">
                  {v}
                </dd>
              </Reveal>
            ))}
          </dl>

          <Swipe className="mt-14" delay={0.05}>
            <Photo
              asset={PHOTOS.fritesBol}
              sizes="46vw"
              grade={0.12}
              className="aspect-[16/10] w-full"
              objectPosition="35% center"
            />
          </Swipe>

          <div className="mt-14 grid grid-cols-5 items-center gap-8">
            <Unveil className="col-span-2">
              <Photo
                asset={PHOTOS.shake}
                sizes="20vw"
                grade={0.12}
                className="aspect-[4/5] w-full"
                objectPosition="62% center"
              />
            </Unveil>
            <Reveal delay={0.08} className="col-span-3">
              <p className={`${d} text-[34px] uppercase leading-[0.92] text-[#F4EFE6]`}>
                Et le shake <span className="text-[#FF3B1F]">qui va avec</span>
              </p>
              <p className="mt-4 text-[15px] leading-[1.7] text-[#F4EFE6]/60">
                Mixé au moment, assez épais pour tenir la paille. Vanille, chocolat,
                fraise ou cookies. Carte entièrement sans alcool.
              </p>
            </Reveal>
          </div>
        </div>
      </div>

      {/* ---------------- Mobile / tablette ---------------- */}
      <div className="lg:hidden">
        <Unveil>
          <Photo
            asset={PHOTOS.loadedBoites}
            sizes="100vw"
            grade={0.14}
            scrim="bottom"
            className="aspect-[4/3] w-full"
            objectPosition="center 48%"
          />
        </Unveil>

        <div className="px-5 py-14 sm:px-8">
          <Reveal>
            <SectionLabel index="05">Frites chargées</SectionLabel>
          </Reveal>
          <h2
            className={`${d} mt-5 text-[15vw] uppercase leading-[0.85] tracking-[-0.02em] text-[#F4EFE6] sm:text-[12vw]`}
          >
            <LinesUp lines={["Loaded", <span key="f" className="text-[#FF3B1F]">Frites</span>]} />
          </h2>
          <Reveal delay={0.08}>
            <p className="mt-5 text-[15px] leading-[1.75] text-[#F4EFE6]/70">
              Frites coupées fines, double cuisson, noyées sous le cheddar fondu et le
              bacon grillé, puis un trait de sauce Krush.
            </p>
          </Reveal>

          <div className="mt-8 grid grid-cols-2 gap-3">
            <Swipe>
              <Photo
                asset={PHOTOS.fritesBol}
                sizes="48vw"
                grade={0.12}
                className="aspect-[3/4] w-full"
                objectPosition="35% center"
              />
            </Swipe>
            <Swipe from="right" delay={0.08}>
              <Photo
                asset={PHOTOS.shake}
                sizes="48vw"
                grade={0.12}
                className="aspect-[3/4] w-full"
                objectPosition="62% center"
              />
            </Swipe>
          </div>

          <dl className="mt-8 border-t border-[#F4EFE6]/12">
            {[
              ["Frites maison", "25 MAD"],
              ["Loaded Frites", "45 MAD"],
              ["Frites sauce Krush", "32 MAD"],
              ["Onion Rings", "35 MAD"],
            ].map(([k, v]) => (
              <div
                key={k}
                className="flex items-baseline justify-between gap-4 border-b border-[#F4EFE6]/12 py-4"
              >
                <dt className={`${d} text-[21px] uppercase leading-none text-[#F4EFE6]`}>{k}</dt>
                <dd className="text-[14px] font-semibold tabular-nums text-[#FF3B1F]">{v}</dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </section>
  );
}
