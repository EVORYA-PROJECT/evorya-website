"use client";

import { useMemo, useState } from "react";
import { motion } from "motion/react";
import {
  FAMILY_FILTERS,
  FEATURED_ID,
  TRANSACTION_FILTERS,
  filterProperties,
  type FamilyFilter,
  type Property,
  type TransactionFilter,
} from "../data";
import { MediaKind, PropertyMedia } from "../visuals";
import { EASE, Reveal, SectionNumber, Tag, focusRing, useDisplay } from "../ui";

/** Largeur réelle d'une vignette : 1 colonne, puis 2, puis 3 dans 1400px. */
const CARD_SIZES = "(min-width: 1024px) 420px, (min-width: 640px) 46vw, 92vw";

function keyFacts(p: Property) {
  return [
    { label: "Surface", value: `${p.surface} m²` },
    { label: "Pièces", value: String(p.rooms) },
    p.bedrooms > 0
      ? { label: "Chambres", value: String(p.bedrooms) }
      : { label: "Plateau", value: "Libre" },
  ];
}

function PropertyCard({
  property,
  onOpen,
  selected,
  wide = false,
}: {
  property: Property;
  onOpen: (id: string) => void;
  selected: boolean;
  /** Carte mise en avant : image plus grande, disposition légèrement
      horizontale en desktop — casse l'alignement parfait de la grille. */
  wide?: boolean;
}) {
  const display = useDisplay();
  return (
    <article
      className={`group relative flex h-full flex-col border bg-white transition-colors duration-200 ${
        selected ? "border-[#2B3A4A]" : "border-[#DCD7CD] hover:border-[#2B3A4A]"
      } ${wide ? "lg:flex-row" : ""}`}
    >
      {/* Filet laiton : plein quand le bien est ouvert, tracé au survol sinon.
          Pas d'ombre portée — la carte reste à plat, comme une planche. */}
      <span
        aria-hidden="true"
        className={`absolute inset-x-0 top-0 z-10 h-px origin-left bg-[#8A6A3B] transition-[width] duration-300 ease-out ${
          selected ? "w-full" : "w-0 group-hover:w-full"
        }`}
      />

      <div className={`relative overflow-hidden ${wide ? "lg:w-[54%] lg:shrink-0" : ""}`}>
        <PropertyMedia
          photo={property.photo}
          variant={property.visual}
          tone={property.tone}
          sizes={CARD_SIZES}
          reveal
          className={`h-52 transition-transform duration-500 ease-out group-hover:scale-[1.03] sm:h-48 ${
            wide ? "lg:h-full lg:min-h-[22rem]" : "lg:h-60"
          }`}
        />
        {property.tag && (
          <span className="absolute top-4 left-4">
            <Tag>{property.tag}</Tag>
          </span>
        )}
        <span className="absolute top-4 right-4 rounded-full bg-white/85 px-2.5 py-1 text-[0.75rem] font-medium tracking-[0.14em] text-[#2B3A4A] tabular-nums backdrop-blur-[2px]">
          {property.reference}
        </span>
        {/* Photo ou dessin : la carte le dit, pour que les deux langages
            restent lisibles côte à côte dans la grille. */}
        <MediaKind photo={property.photo} />
        {/* Flèche qui glisse au survol desktop : lisible même sans passer
            par le bouton, la carte entière annonce l'ouverture. */}
        <span
          aria-hidden="true"
          className="pointer-events-none absolute bottom-4 right-4 hidden h-9 w-9 items-center justify-center rounded-full bg-white/90 text-[#14181D] opacity-0 transition-all duration-300 group-hover:translate-x-0 group-hover:opacity-100 lg:flex lg:translate-x-2"
        >
          →
        </span>
      </div>

      <div className="flex flex-1 flex-col p-5 sm:p-6">
        <p className="text-[0.75rem] font-medium tracking-[0.16em] uppercase text-[#55606C]">
          {property.city} — {property.district}
        </p>
        <h3
          className={`${display} mt-2.5 font-semibold text-[#14181D] ${
            wide ? "text-[1.6rem] sm:text-[1.8rem]" : "text-xl sm:text-[1.35rem]"
          }`}
        >
          {property.name}
        </h3>

        <p className="mt-3 flex items-baseline gap-1.5">
          <span
            className={`${display} text-[1.7rem] leading-none font-bold tracking-[-0.02em] text-[#14181D] tabular-nums`}
          >
            {property.price}
          </span>
          <span className="text-[0.85rem] font-medium text-[#55606C]">{property.priceUnit}</span>
        </p>

        <p
          className={`mt-3 text-[0.9rem] leading-relaxed text-[#55606C] ${
            wide ? "line-clamp-3" : "line-clamp-2"
          }`}
        >
          {property.summary}
        </p>

        {/* Complément visible uniquement sur la carte mise en avant : un
            point remarquable, pour que sa largeur supplémentaire porte
            vraiment plus d'information, pas juste plus de vide. */}
        {wide && property.highlights[0] && (
          <p className="mt-3 hidden items-start gap-3 text-[0.85rem] leading-relaxed text-[#3A444F] sm:flex">
            <span aria-hidden="true" className="mt-2 h-px w-4 shrink-0 bg-[#8A6A3B]" />
            {property.highlights[0]}
          </p>
        )}

        <dl className="mt-5 grid grid-cols-3 border-t border-[#DCD7CD] pt-4">
          {keyFacts(property).map((fact, i) => (
            <div key={fact.label} className={i > 0 ? "border-l border-[#DCD7CD] pl-3" : ""}>
              <dt className="text-[0.75rem] tracking-[0.12em] uppercase text-[#55606C]">
                {fact.label}
              </dt>
              <dd className="mt-1 text-[0.95rem] font-medium text-[#14181D] tabular-nums">
                {fact.value}
              </dd>
            </div>
          ))}
        </dl>

        <button
          type="button"
          onClick={() => onOpen(property.id)}
          className={`mt-6 inline-flex h-12 w-full items-center justify-between rounded-full border border-[#2B3A4A]/35 pr-4 pl-6 text-[0.95rem] font-medium text-[#14181D] transition-[background-color,border-color,color,transform] duration-200 group-hover:border-[#2B3A4A] hover:bg-[#2B3A4A] hover:text-white active:scale-[0.985] active:bg-[#2B3A4A] active:text-white ${focusRing}`}
        >
          <span>
            Voir le bien<span className="sr-only"> : {property.name}</span>
          </span>
          <span
            aria-hidden="true"
            className="text-lg leading-none transition-transform duration-200 group-hover:translate-x-1"
          >
            →
          </span>
        </button>
      </div>
    </article>
  );
}

export default function Listings({
  selectedId,
  onOpen,
}: {
  selectedId: string;
  onOpen: (id: string) => void;
}) {
  const display = useDisplay();
  const [transaction, setTransaction] = useState<TransactionFilter>("tout");
  const [family, setFamily] = useState<FamilyFilter>("toutes");

  const results = useMemo(() => filterProperties(transaction, family), [transaction, family]);

  return (
    <section
      id="biens"
      className="scroll-mt-28 border-b border-[#DCD7CD] bg-[#F4F1EC] lg:scroll-mt-32"
    >
      <div className="mx-auto max-w-[1400px] px-5 pt-16 pb-16 sm:px-8 lg:px-10 lg:pt-24 lg:pb-24">
        <Reveal>
          <SectionNumber value="01" label="Sélection" />
        </Reveal>

        <div className="mt-8 lg:flex lg:items-end lg:justify-between lg:gap-12">
          <Reveal>
            <h2
              className={`${display} max-w-2xl text-[2rem] leading-[1.08] font-semibold tracking-[-0.02em] text-[#14181D] sm:text-[2.6rem] lg:text-[3rem]`}
            >
              Les biens actuellement suivis par l&rsquo;agence.
            </h2>
          </Reveal>
          <Reveal delay={0.08}>
            <p className="mt-5 max-w-md text-[1rem] leading-relaxed text-[#3A444F] lg:mt-0 lg:pb-2">
              Surface mesurée, plan relevé, quartier documenté. Filtrez la sélection puis
              ouvrez un bien pour en voir le détail complet.
            </p>
          </Reveal>
        </div>

        {/* Barre de filtres — lecture immédiate, comme sur une plateforme */}
        <div className="mt-10 border-y border-[#DCD7CD] bg-white lg:mt-12">
          <div className="flex flex-col gap-4 p-4 sm:p-5 lg:flex-row lg:flex-wrap lg:items-center lg:justify-between lg:gap-8">
            <div
              role="group"
              aria-label="Type de transaction"
              className="inline-flex w-full rounded-full border border-[#DCD7CD] p-1 lg:w-auto"
            >
              {TRANSACTION_FILTERS.map((option) => {
                const active = transaction === option.id;
                return (
                  <button
                    key={option.id}
                    type="button"
                    aria-pressed={active}
                    onClick={() => setTransaction(option.id)}
                    className={`relative h-11 flex-1 rounded-full px-5 text-[0.9rem] font-medium transition-colors duration-200 lg:flex-none ${
                      active ? "text-white" : "text-[#3A444F] hover:bg-[#EDEAE4]"
                    } ${focusRing}`}
                  >
                    {active && (
                      <motion.span
                        aria-hidden="true"
                        layoutId="atrium-transaction-filter"
                        className="absolute inset-0 rounded-full bg-[#2B3A4A]"
                        transition={{ type: "spring", stiffness: 520, damping: 42, mass: 0.7 }}
                      />
                    )}
                    <span className="relative">{option.label}</span>
                  </button>
                );
              })}
            </div>

            <div
              role="group"
              aria-label="Type de bien"
              className="-mx-4 flex gap-2 overflow-x-auto px-4 pb-1 sm:-mx-5 sm:px-5 lg:mx-0 lg:overflow-visible lg:px-0 lg:pb-0"
            >
              {FAMILY_FILTERS.map((option) => {
                const active = family === option.id;
                return (
                  <button
                    key={option.id}
                    type="button"
                    aria-pressed={active}
                    onClick={() => setFamily(option.id)}
                    className={`flex h-11 shrink-0 items-center gap-2 rounded-full border px-4 text-[0.85rem] font-medium whitespace-nowrap transition-[background-color,border-color,color,transform] duration-200 active:scale-[0.97] ${
                      active
                        ? "border-[#2B3A4A] bg-[#EDEAE4] text-[#14181D] shadow-[inset_0_0_0_1px_#2B3A4A]"
                        : "border-[#DCD7CD] text-[#55606C] hover:border-[#2B3A4A]/45 hover:text-[#14181D]"
                    } ${focusRing}`}
                  >
                    {/* Marqueur laiton : l'état actif se lit sans compter sur la couleur du fond. */}
                    <span
                      aria-hidden="true"
                      className={`h-1.5 w-1.5 rounded-full transition-colors duration-200 ${
                        active ? "bg-[#8A6A3B]" : "bg-transparent"
                      }`}
                    />
                    {option.label}
                  </button>
                );
              })}
            </div>

            <p
              aria-live="polite"
              className="shrink-0 text-[0.85rem] font-medium text-[#55606C] tabular-nums"
            >
              {results.length} bien{results.length > 1 ? "s" : ""} affiché
              {results.length > 1 ? "s" : ""}
            </p>
          </div>
        </div>

        {results.length === 0 ? (
          <div className="mt-10 border border-dashed border-[#DCD7CD] bg-white px-6 py-14 text-center">
            <p className={`${display} text-xl font-semibold text-[#14181D]`}>
              Aucun bien ne correspond à cette combinaison.
            </p>
            <p className="mt-3 text-[0.95rem] text-[#55606C]">
              Élargissez la recherche, ou confiez-nous votre critère : nous suivons aussi des
              biens non publiés.
            </p>
            <button
              type="button"
              onClick={() => {
                setTransaction("tout");
                setFamily("toutes");
              }}
              className={`mt-6 inline-flex h-12 items-center rounded-full border border-[#2B3A4A] px-6 text-[0.95rem] font-medium text-[#14181D] transition-[background-color,color,transform] duration-200 hover:bg-[#2B3A4A] hover:text-white active:scale-[0.985] ${focusRing}`}
            >
              Réinitialiser les filtres
            </button>
          </div>
        ) : (
          /* Chaque carte est montée directement depuis `results` et porte sa
             propre entrée. Aucun état d'animation du parent ne peut donc la
             laisser bloquée dans une variante `hidden` après un filtrage. */
          <motion.ul
            key={`${transaction}-${family}`}
            aria-label="Biens correspondant aux filtres"
            tabIndex={0}
            className="mobile-rail mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:mt-12 lg:grid-cols-3 lg:gap-8"
          >
            {results.map((property, i) => {
              const wide = i === 0 && property.id === FEATURED_ID && results.length >= 3;
              return (
                <motion.li
                  key={property.id}
                  layout
                  data-reveal
                  initial={{ opacity: 0, y: 18 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{
                    opacity: { duration: 0.35, delay: i * 0.04, ease: EASE },
                    y: { duration: 0.4, delay: i * 0.04, ease: EASE },
                    layout: { duration: 0.35, ease: EASE },
                  }}
                  className={wide ? "sm:col-span-2 lg:col-span-2" : ""}
                >
                  <PropertyCard
                    property={property}
                    onOpen={onOpen}
                    selected={property.id === selectedId}
                    wide={wide}
                  />
                </motion.li>
              );
            })}
          </motion.ul>
        )}
        {results.length > 1 && <p className="mobile-rail-hint" aria-hidden="true">Faire défiler les biens <span>← &nbsp; →</span></p>}
      </div>
    </section>
  );
}
