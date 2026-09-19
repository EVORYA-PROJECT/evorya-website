"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { TEXTURE_PHOTO, type Photo } from "../data";
import { ParallaxPhoto, PropertyPhoto } from "../visuals";
import { EASE, Reveal, SectionNumber, focusRing, useDisplay } from "../ui";

const SERVICES: {
  index: string;
  title: string;
  body: string;
  points: string[];
  terms: { label: string; value: string }[];
  photo: Photo;
}[] = [
  {
    index: "01",
    title: "Achat",
    body: "Recherche ciblée, visites organisées, vérification du dossier technique et accompagnement jusqu'à la signature.",
    points: ["Recherche sur critères précis", "Analyse du plan et de l'exposition", "Négociation et suivi notarial"],
    terms: [
      { label: "Honoraires", value: "2,5 % du prix de vente" },
      { label: "Engagement", value: "Sans exclusivité" },
    ],
    photo: {
      src: "/templates/immobilier/architecture-terrasse.jpg",
      alt: "Table basse en zellige sur une terrasse dallée, face à la mer en fin de journée.",
      caption: "Ambiance — villa et terrasse",
    },
  },
  {
    index: "02",
    title: "Location",
    body: "Sélection de locataires, rédaction du bail et état des lieux détaillé, photo et plan à l'appui.",
    points: ["Estimation du loyer de marché", "Dossiers locataires vérifiés", "État des lieux documenté"],
    terms: [
      { label: "Honoraires", value: "1 mois de loyer" },
      { label: "Engagement", value: "Mandat de 6 mois" },
    ],
    photo: {
      src: "/templates/immobilier/salon-lumiere.jpg",
      alt: "Salon lumineux au parquet clair, grande baie et mobilier sobre.",
      caption: "Ambiance — séjour",
    },
  },
  {
    index: "03",
    title: "Gestion",
    body: "Gestion courante du bien : loyers, entretien, relation avec le syndic et reporting régulier au propriétaire.",
    points: ["Encaissement et relances", "Coordination des interventions", "Rapport trimestriel au propriétaire"],
    terms: [
      { label: "Honoraires", value: "6 % des loyers encaissés" },
      { label: "Engagement", value: "Résiliable à 3 mois" },
    ],
    photo: {
      src: "/templates/immobilier/detail-pierre.jpg",
      alt: "Détail d'un mur de pierre appareillée, joints fins et lumière rasante.",
      caption: "Matière — pierre appareillée",
    },
  },
];

/**
 * Panneau de service. `active` pilote son expansion — même mécanisme sur
 * mobile (empilé) et desktop (rangée horizontale) : un simple `onClick`,
 * jamais un `hover`, pour que l'interaction reste identique au clavier, à la
 * souris et au doigt. `layout` sur le conteneur laisse Motion animer le
 * changement de largeur/hauteur sans jamais bloquer un clic suivant : chaque
 * nouvelle sélection interrompt proprement l'animation en cours.
 */
function ServicePanel({
  service,
  active,
  onSelect,
}: {
  service: (typeof SERVICES)[number];
  active: boolean;
  onSelect: () => void;
}) {
  const display = useDisplay();

  return (
    <motion.div
      layout
      transition={{ layout: { duration: 0.45, ease: EASE } }}
      className={`group relative flex flex-col border border-[#DCD7CD] bg-white transition-colors duration-200 md:basis-0 ${
        active ? "md:grow-[2.4]" : "md:grow"
      }`}
    >
      <button
        type="button"
        aria-expanded={active}
        onClick={onSelect}
        className={`flex w-full items-center justify-between gap-4 px-6 py-6 text-left md:px-7 ${focusRing}`}
      >
        <span className="flex items-baseline gap-4">
          <span className="text-[0.75rem] font-medium tracking-[0.2em] text-[#8A6A3B] tabular-nums">
            {service.index}
          </span>
          <span className={`${display} text-[1.4rem] font-semibold tracking-[-0.01em] text-[#14181D] sm:text-[1.6rem]`}>
            {service.title}
          </span>
        </span>
        <span
          aria-hidden="true"
          className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-[#2B3A4A]/30 text-base transition-transform duration-300 ${
            active ? "rotate-45 bg-[#2B3A4A] text-white" : "text-[#2B3A4A]"
          }`}
        >
          +
        </span>
      </button>

      <AnimatePresence initial={false}>
        {active && (
          <motion.div
            key="content"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.4, ease: EASE }}
            className="overflow-hidden"
          >
            <div className="px-6 pb-8 md:px-7">
              <PropertyPhoto
                photo={service.photo}
                reveal
                marks={false}
                sizes="(min-width: 1024px) 480px, 92vw"
                className="h-[200px] sm:h-[240px]"
              />
              <p className="mt-5 text-[0.98rem] leading-relaxed text-[#3A444F]">{service.body}</p>
              <ul className="mt-6 space-y-2.5 border-t border-[#DCD7CD] pt-5">
                {service.points.map((point) => (
                  <li key={point} className="flex gap-3 text-[0.9rem] leading-relaxed text-[#55606C]">
                    <span aria-hidden="true" className="mt-2 h-px w-3 shrink-0 bg-[#8A6A3B]" />
                    {point}
                  </li>
                ))}
              </ul>
              <dl className="mt-6 border-t border-[#DCD7CD] pt-4">
                {service.terms.map((term) => (
                  <div
                    key={term.label}
                    className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-0.5 py-1.5"
                  >
                    <dt className="text-[0.8rem] tracking-[0.1em] uppercase text-[#55606C]">
                      {term.label}
                    </dt>
                    <dd className="text-[0.9rem] font-medium text-[#14181D] tabular-nums">
                      {term.value}
                    </dd>
                  </div>
                ))}
              </dl>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Filet laiton : plein quand le panneau est ouvert. */}
      <span
        aria-hidden="true"
        className={`absolute inset-x-0 top-0 h-px origin-left bg-[#8A6A3B] transition-[width] duration-300 ease-out ${
          active ? "w-full" : "w-0"
        }`}
      />
    </motion.div>
  );
}

export default function Services() {
  const display = useDisplay();
  const [active, setActive] = useState(0);

  return (
    <section
      id="services"
      className="scroll-mt-28 border-b border-[#DCD7CD] bg-white lg:scroll-mt-32"
    >
      {/* Bandeau de matière : l'ombre portée d'un arbre sur un mur clair sert
          de raccord entre « L'agence » et « Services ». Une image de texture,
          pas une illustration de service — elle ouvre la section, elle ne la
          décrit pas. */}
      <div className="mx-auto max-w-[1400px] px-5 pt-16 sm:px-8 lg:px-10 lg:pt-24">
        <Reveal y={22}>
          <figure>
            <ParallaxPhoto
              photo={TEXTURE_PHOTO}
              sizes="(min-width: 1440px) 1320px, 92vw"
              range={7}
              imageClassName="saturate-[0.3] brightness-[1.12] contrast-[1.05]"
              className="h-[150px] sm:h-[200px] lg:h-[260px]"
            >
              <span className="pointer-events-none absolute right-5 bottom-4 text-[0.68rem] font-medium tracking-[0.24em] uppercase text-white/70 sm:right-7 sm:bottom-5">
                Matière — lumière rasante
              </span>
            </ParallaxPhoto>
          </figure>
        </Reveal>
      </div>

      <div className="mx-auto max-w-[1400px] px-5 pt-12 pb-16 sm:px-8 lg:px-10 lg:pt-16 lg:pb-24">
        <div className="lg:flex lg:items-end lg:justify-between lg:gap-12">
          <div>
            <Reveal>
              <SectionNumber value="06" label="Services" />
            </Reveal>
            <Reveal delay={0.05}>
              <h2
                className={`${display} mt-8 max-w-xl text-[2rem] leading-[1.08] font-semibold tracking-[-0.02em] text-[#14181D] sm:text-[2.6rem] lg:text-[3rem]`}
              >
                Trois façons de travailler ensemble.
              </h2>
            </Reveal>
          </div>
          <Reveal delay={0.1}>
            <p className="mt-5 max-w-sm text-[1rem] leading-relaxed text-[#3A444F] lg:mt-0 lg:pb-2">
              Le même niveau d&rsquo;exigence, que vous achetiez un bien, que vous le
              louiez, ou que vous nous en confiiez la gestion. Touchez ou cliquez un
              intitulé pour en voir le détail.
            </p>
          </Reveal>
        </div>

        <Reveal delay={0.08}>
          <div className="mt-12 flex flex-col gap-4 md:flex-row md:items-start md:gap-5">
            {SERVICES.map((service, i) => (
              <ServicePanel
                key={service.index}
                service={service}
                active={active === i}
                onSelect={() => setActive(i)}
              />
            ))}
          </div>
        </Reveal>

        <Reveal delay={0.08}>
          <p className="mt-8 max-w-2xl text-[0.85rem] leading-relaxed text-[#55606C]">
            Honoraires indicatifs de démonstration, hors taxes. Ils sont confirmés
            par écrit avant tout mandat — aucun frais n&rsquo;apparaît en cours de
            route.
          </p>
        </Reveal>
      </div>
    </section>
  );
}
