"use client";

import MobileDisclosure from "@/components/ui/MobileDisclosure";

import { AnimatePresence, motion } from "motion/react";
import { DETAIL_INTERIOR_PHOTO, DETAIL_STAIR_PHOTO, PROPERTIES, type Property } from "../data";
import { PropertyMedia, PropertyPhoto } from "../visuals";
import { CountUp, EASE, Reveal, SectionNumber, Tag, focusRing, useDisplay } from "../ui";

/**
 * `mode="popLayout"` sort l'ancien panneau du flux : le nouveau prend sa place
 * immédiatement, sans temps mort blanc ni effondrement de la hauteur.
 * Sortie courte, entrée un peu plus longue — la bascule reste nette.
 */
const PANEL = {
  initial: { opacity: 0, y: 12 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.34, ease: EASE } },
  exit: { opacity: 0, transition: { duration: 0.16, ease: EASE } },
} as const;

/** Largeur réelle de la grande visite : ~740px dans la grille 1400px. */
const MAIN_SIZES = "(min-width: 1024px) 740px, (min-width: 640px) 92vw, 92vw";
/** Vignettes plan / coupe / photo : 3 de front à partir de sm, 2 avant. */
const FIGURE_SIZES = "(min-width: 1024px) 240px, (min-width: 640px) 30vw, 46vw";

function MainFacts({ property }: { property: Property }) {
  const display = useDisplay();
  const facts: { label: string; value: number | string; suffix?: string }[] = [
    { label: "Surface", value: property.surface, suffix: " m²" },
    { label: "Pièces", value: property.rooms },
    property.bedrooms > 0
      ? { label: "Chambres", value: property.bedrooms }
      : { label: "Bureaux", value: "Libre" },
    { label: "Salles d'eau", value: property.bathrooms },
  ];
  return (
    <dl className="mt-8 grid grid-cols-2 gap-px border border-[#DCD7CD] bg-[#DCD7CD] sm:grid-cols-4">
      {facts.map((fact, i) => (
        <motion.div
          key={fact.label}
          data-reveal
          className="bg-white px-4 py-4"
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.06 * i, ease: EASE }}
        >
          <dt className="text-[0.75rem] tracking-[0.14em] uppercase text-[#55606C]">
            {fact.label}
          </dt>
          <dd className={`${display} mt-1.5 text-xl font-semibold text-[#14181D] tabular-nums`}>
            {typeof fact.value === "number" ? (
              <CountUp value={fact.value} suffix={fact.suffix} duration={0.55} />
            ) : (
              fact.value
            )}
          </dd>
        </motion.div>
      ))}
    </dl>
  );
}

/**
 * Colonne visuelle : une grande vue (photo d'ambiance si le bien en a une,
 * dessin de façade sinon) puis les pièces graphiques — plan, coupe, et la
 * photo d'appoint quand elle existe. C'est là que le langage hybride se lit :
 * DESSIN + PHOTO + DONNÉE.
 */
function VisualColumn({ property }: { property: Property }) {
  const figures = [
    {
      key: "interior",
      node: <PropertyPhoto photo={DETAIL_INTERIOR_PHOTO} sizes={FIGURE_SIZES} className="h-28 sm:h-36" marks={false} imageClassName="object-[50%_58%]" />,
      caption: DETAIL_INTERIOR_PHOTO.caption,
    },
    {
      key: "stair",
      node: <PropertyPhoto photo={DETAIL_STAIR_PHOTO} sizes={FIGURE_SIZES} className="h-28 sm:h-36" marks={false} />,
      caption: DETAIL_STAIR_PHOTO.caption,
    },
  ];

  if (property.photoAccent) {
    figures.push({
      key: "photo",
      node: (
        <PropertyPhoto
          photo={property.photoAccent}
          sizes={FIGURE_SIZES}
          className="h-28 sm:h-36"
          marks={false}
        />
      ),
      caption: property.photoAccent.caption,
    });
  }

  return (
    <>
      <figure>
        <PropertyMedia
          photo={property.photo}
          variant={property.visual}
          tone={property.tone}
          sizes={MAIN_SIZES}
          className="h-[280px] sm:h-[400px] lg:h-[540px]"
        />
        <figcaption className="mt-3 flex flex-wrap items-baseline justify-between gap-2 border-b border-[#DCD7CD] pb-3 text-[0.75rem] tracking-[0.12em] uppercase text-[#55606C]">
          <span>{property.photo ? property.photo.caption : "Façade — élévation"}</span>
          <span className="text-[#8A6A3B] tabular-nums">{property.reference}</span>
        </figcaption>
      </figure>

      {/* Sur téléphone on garde deux vignettes par ligne : à trois de front,
          les légendes deviennent illisibles sous 430px. */}
      <div
        className={`mt-4 grid grid-cols-2 gap-4 ${figures.length === 3 ? "sm:grid-cols-3" : ""}`}
      >
        {figures.map((figure) => (
          <figure key={figure.key}>
            {figure.node}
            <figcaption className="mt-2 text-[0.75rem] leading-snug tracking-[0.12em] uppercase text-[#55606C]">
              {figure.caption}
            </figcaption>
          </figure>
        ))}
      </div>

      <p className="mt-4 text-[0.78rem] leading-relaxed text-[#55606C]">
        Photographies d&rsquo;illustration — crédits en pied de page.
      </p>
    </>
  );
}

export default function PropertyDetail({
  property,
  onSelect,
}: {
  property: Property;
  onSelect: (id: string) => void;
}) {
  const display = useDisplay();

  return (
    <section
      id="bien"
      className="scroll-mt-28 border-b border-[#DCD7CD] bg-[#FBFAF8] lg:scroll-mt-32"
    >
      <div className="mx-auto max-w-[1400px] px-5 pt-16 pb-16 sm:px-8 lg:px-10 lg:pt-24 lg:pb-24">
        <Reveal>
          <SectionNumber value="02" label="Le bien en détail" />
        </Reveal>
        <Reveal delay={0.05}>
          <h2
            className={`${display} mt-8 max-w-2xl text-[2rem] leading-[1.08] font-semibold tracking-[-0.02em] text-[#14181D] sm:text-[2.6rem] lg:text-[3rem]`}
          >
            Tout ce qui se lit avant la visite.
          </h2>
        </Reveal>

        {/* Sélecteur de bien */}
        <div
          role="group"
          aria-label="Choisir le bien à afficher"
          className="mt-8 -mx-5 flex gap-3 overflow-x-auto px-5 pb-2 sm:-mx-8 sm:px-8 lg:mx-0 lg:flex-wrap lg:overflow-visible lg:px-0"
        >
          {PROPERTIES.map((p) => {
            const active = p.id === property.id;
            return (
              <button
                key={p.id}
                type="button"
                aria-pressed={active}
                onClick={() => onSelect(p.id)}
                className={`flex h-12 shrink-0 items-center gap-3 rounded-full border px-4 text-left transition-[background-color,border-color,color,transform] duration-200 active:scale-[0.97] ${
                  active
                    ? "border-[#2B3A4A] bg-[#2B3A4A] text-white"
                    : "border-[#DCD7CD] bg-white text-[#3A444F] hover:border-[#2B3A4A] hover:text-[#14181D]"
                } ${focusRing}`}
              >
                <span
                  className={`text-[0.75rem] font-medium tabular-nums ${
                    active ? "text-white/70" : "text-[#8A6A3B]"
                  }`}
                >
                  {p.reference}
                </span>
                <span className="text-[0.9rem] font-medium whitespace-nowrap">{p.name}</span>
              </button>
            );
          })}
        </div>

        <div
          aria-live="polite"
          className="mt-8 grid gap-8 lg:mt-12 lg:grid-cols-12 lg:items-start lg:gap-12"
        >
          {/* Colonne visuelle : vue principale + pièces graphiques */}
          <div className="lg:sticky lg:top-[8.5rem] lg:col-span-7">
            <AnimatePresence mode="popLayout" initial={false}>
              <motion.div key={property.id} data-reveal {...PANEL}>
                <VisualColumn property={property} />
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Colonne informations */}
          <div className="lg:col-span-5">
            <AnimatePresence mode="popLayout" initial={false}>
              <motion.div key={property.id} data-reveal {...PANEL}>
                <div className="flex flex-wrap items-center gap-3">
                  {property.tag && <Tag>{property.tag}</Tag>}
                  <span className="text-[0.75rem] font-medium tracking-[0.18em] text-[#55606C] tabular-nums">
                    Réf. {property.reference}
                  </span>
                </div>

                <h3
                  className={`${display} mt-5 text-[1.9rem] leading-[1.1] font-semibold tracking-[-0.02em] text-[#14181D] sm:text-[2.3rem]`}
                >
                  {property.name}
                </h3>
                <p className="mt-2 text-[1rem] text-[#3A444F]">
                  {property.type} · {property.city} — {property.district}
                </p>

                <p className="mt-6 flex flex-wrap items-baseline gap-2 border-t border-[#DCD7CD] pt-6">
                  <span
                    className={`${display} text-[2.6rem] leading-none font-bold tracking-[-0.03em] text-[#14181D] tabular-nums sm:text-[3.2rem]`}
                  >
                    {property.price}
                  </span>
                  <span className="text-base font-medium text-[#55606C]">
                    {property.priceUnit}
                  </span>
                </p>

                <MainFacts property={property} />

                <p className="mt-8 text-[1rem] leading-[1.75] text-[#3A444F]">
                  {property.description}
                </p>

                <MobileDisclosure label="Points remarquables et caractéristiques">
                <h4 className={`${display} mt-8 text-base font-semibold text-[#14181D]`}>
                  Points remarquables
                </h4>
                <ul className="mt-4 space-y-3">
                  {property.highlights.map((item) => (
                    <li key={item} className="flex gap-3 text-[0.95rem] leading-relaxed text-[#3A444F]">
                      <span
                        aria-hidden="true"
                        className="mt-2 h-px w-4 shrink-0 bg-[#8A6A3B]"
                      />
                      {item}
                    </li>
                  ))}
                </ul>

                <h4 className={`${display} mt-8 text-base font-semibold text-[#14181D]`}>
                  Caractéristiques
                </h4>
                <dl className="mt-4 grid grid-cols-1 border-t border-[#DCD7CD] sm:grid-cols-2 sm:gap-x-8">
                  {property.specs.map((spec) => (
                    <div
                      key={spec.label}
                      className="flex items-baseline justify-between gap-4 border-b border-[#DCD7CD] py-3"
                    >
                      <dt className="text-[0.9rem] text-[#55606C]">{spec.label}</dt>
                      <dd className="text-[0.95rem] font-medium text-[#14181D]">{spec.value}</dd>
                    </div>
                  ))}
                </dl>
                </MobileDisclosure>

                <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                  <a
                    href="#contact"
                    className={`group inline-flex h-[52px] flex-1 items-center justify-center gap-3 rounded-full bg-[#2B3A4A] px-6 text-base font-medium text-white transition-[background-color,transform] duration-200 hover:bg-[#14181D] active:scale-[0.985] ${focusRing}`}
                  >
                    Demander une visite
                    <span
                      aria-hidden="true"
                      className="text-lg leading-none transition-transform duration-200 group-hover:translate-x-1"
                    >
                      →
                    </span>
                  </a>
                  <a
                    href="#contact"
                    className={`inline-flex h-[52px] flex-1 items-center justify-center rounded-full border border-[#2B3A4A]/35 px-6 text-base font-medium text-[#14181D] transition-[background-color,border-color,transform] duration-200 hover:border-[#2B3A4A] hover:bg-[#EDEAE4] active:scale-[0.985] ${focusRing}`}
                  >
                    Poser une question
                  </a>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
}
