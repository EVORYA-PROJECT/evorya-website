"use client";

import { AGENCY_MAIN_PHOTO, AGENCY_PHOTO, GALLERY_ARCHES_PHOTO } from "../data";
import { ParallaxPhoto, PropertyPhoto } from "../visuals";
import { Reveal, RuleDraw, SectionNumber, useDisplay } from "../ui";

const PRINCIPLES = [
  {
    index: "01",
    title: "Visité avant d'être publié",
    body: "Aucun bien n'est mis en ligne sans qu'un membre de l'agence l'ait parcouru, à l'heure où la lumière compte vraiment.",
  },
  {
    index: "02",
    title: "Mesuré, relevé, documenté",
    body: "Surfaces vérifiées, plan redessiné, exposition notée. Ce que vous lisez sur la fiche est ce que vous verrez sur place.",
  },
  {
    index: "03",
    title: "Un seul interlocuteur",
    body: "De la première visite à la signature, le même conseiller suit le dossier et répond directement.",
  },
];

export default function Agency() {
  const display = useDisplay();

  return (
    <section
      id="agence"
      className="scroll-mt-28 border-b border-[#DCD7CD] bg-[#EDEAE4] lg:scroll-mt-32"
    >
      <div className="mx-auto max-w-[1400px] px-5 pt-16 pb-16 sm:px-8 lg:grid lg:grid-cols-12 lg:gap-14 lg:px-10 lg:pt-24 lg:pb-24">
        {/* Colonne gauche : le dessin porte la lecture, la photo apporte la
            matière. La photographie mord volontairement sur la coupe dessinée
            et déborde d'un demi-module vers la marge — les deux planches se
            superposent comme sur une table à dessin, elles ne s'alignent pas. */}
        <div className="lg:col-span-5">
          <div className="relative">
            <Reveal>
              <PropertyPhoto
                photo={AGENCY_MAIN_PHOTO}
                sizes="(min-width: 1024px) 560px, 92vw"
                reveal
                marks={false}
                className="h-[300px] rounded-t-[90px] sm:h-[400px] lg:h-[460px] lg:rounded-t-[150px]"
                imageClassName="object-[50%_56%]"
              />
            </Reveal>

            {/* Le débord vers la marge est volontaire mais borné : il reste
                24 px, soit moins que la gouttière de la page — aucun texte ne
                vient jamais coller au bord de l'écran. */}
            <div className="relative z-10 -mt-14 flex items-stretch gap-4 sm:-mt-20 sm:gap-5 lg:-mt-28 lg:-ml-6 lg:gap-6">
              <Reveal delay={0.08} className="w-[54%] shrink-0 sm:w-[46%] lg:w-[56%]">
                <figure>
                  <PropertyPhoto
                    photo={AGENCY_PHOTO}
                    reveal
                    sizes="(min-width: 1024px) 300px, 46vw"
                    className="aspect-[3/4] w-full ring-4 ring-[#EDEAE4] sm:ring-8"
                    /* Cadrage vers le bas pour garder le plâtre ciselé, et ciel
                       désaturé : le bleu brut sortait de la palette Atrium. */
                    imageClassName="object-[50%_70%] saturate-[0.3] contrast-[1.06]"
                  />
                  <figcaption className="mt-3 text-[0.72rem] leading-snug tracking-[0.12em] uppercase text-[#55606C]">
                    {AGENCY_PHOTO.caption}
                  </figcaption>
                </figure>
              </Reveal>

              {/* Colonne de données : volontairement courte, pour rester
                  lisible même dans une demi-colonne de téléphone. */}
              <Reveal delay={0.14} className="flex-1 self-end">
                <div className="border-t border-[#14181D]/12 pt-4">
                  <p className="text-[0.75rem] font-medium tracking-[0.2em] text-[#8A6A3B] tabular-nums">
                    R.05
                  </p>
                  <div className="mt-5">
                    <RuleDraw className="w-full bg-[#14181D]/15" delay={0.1} />
                    <dl className="mt-3 space-y-2 text-[0.8rem] text-[#55606C]">
                      <div className="flex flex-wrap justify-between gap-x-3">
                        <dt>Relevé</dt>
                        <dd className="text-[#14181D]">Sur site</dd>
                      </div>
                      <div className="flex flex-wrap justify-between gap-x-3">
                        <dt>Support</dt>
                        <dd className="text-[#14181D]">Plan + photo</dd>
                      </div>
                      <div className="flex flex-wrap justify-between gap-x-3">
                        <dt>Équipe</dt>
                        <dd className="text-[#14181D]">6 personnes</dd>
                      </div>
                    </dl>
                  </div>
                </div>
              </Reveal>
            </div>
          </div>

          <Reveal delay={0.2}>
            <p className="mt-6 max-w-md text-[0.95rem] leading-relaxed text-[#3A444F]">
              Sur place, on regarde d&rsquo;abord d&rsquo;où vient la lumière : une verrière
              de patio dit presque tout d&rsquo;une maison.
            </p>
          </Reveal>
        </div>

        <div className="mt-12 lg:col-span-7 lg:mt-0 lg:pt-4">
          <Reveal>
            <SectionNumber value="05" label="L'agence" />
          </Reveal>

          <Reveal delay={0.05}>
            <h2
              className={`${display} mt-8 max-w-xl text-[2rem] leading-[1.08] font-semibold tracking-[-0.02em] text-[#14181D] sm:text-[2.6rem] lg:text-[3rem]`}
            >
              Nous lisons un bien comme on lit un plan.
            </h2>
          </Reveal>

          <Reveal delay={0.1}>
            <div className="mt-7 max-w-xl space-y-5 text-[1.0625rem] leading-[1.75] text-[#3A444F]">
              <p>
                Atrium a été fondée autour d&rsquo;une conviction simple : un bien se juge à
                son plan, à son orientation et à son quartier, pas à une liste
                d&rsquo;adjectifs. Nous travaillons donc comme des architectes le feraient —
                en relevant, en mesurant, en comparant.
              </p>
              <p>
                Six personnes, trois villes, un portefeuille volontairement restreint.
                Nous préférons suivre peu de biens et les connaître parfaitement plutôt que
                d&rsquo;en publier cent que personne n&rsquo;a visités.
              </p>
            </div>
          </Reveal>

          {/* Bandeau photographique plein cadre : l'arcade, motif que l'on
              retrouve dessiné dans `AtriumVisual`, existe aussi en photo —
              le langage hybride se referme sur lui-même avant la liste. */}
          <Reveal delay={0.14} y={22}>
            <figure className="mt-10">
              <ParallaxPhoto
                photo={GALLERY_ARCHES_PHOTO}
                sizes="(min-width: 1024px) 760px, 92vw"
                range={6}
                imageClassName="saturate-[0.75]"
                className="h-[220px] sm:h-[260px]"
              />
              <figcaption className="mt-3 flex items-baseline justify-between gap-3 border-t border-[#14181D]/12 pt-3 text-[0.72rem] tracking-[0.12em] uppercase text-[#55606C]">
                <span>{GALLERY_ARCHES_PHOTO.caption}</span>
                <span aria-hidden="true" className="text-[#8A6A3B] tabular-nums">
                  R.06
                </span>
              </figcaption>
            </figure>
          </Reveal>

          <ul className="mt-12 border-t border-[#14181D]/12">
            {PRINCIPLES.map((principle, i) => (
              <Reveal as="li" key={principle.index} delay={0.05 * i}>
                <div className="border-b border-[#14181D]/12 py-6 sm:flex sm:gap-8 sm:py-7">
                  <span className="block text-[0.75rem] font-medium tracking-[0.2em] text-[#8A6A3B] tabular-nums sm:pt-1">
                    {principle.index}
                  </span>
                  <div className="mt-3 sm:mt-0">
                    <h3 className={`${display} text-lg font-semibold text-[#14181D]`}>
                      {principle.title}
                    </h3>
                    <p className="mt-2 max-w-lg text-[0.95rem] leading-relaxed text-[#3A444F]">
                      {principle.body}
                    </p>
                  </div>
                </div>
              </Reveal>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
