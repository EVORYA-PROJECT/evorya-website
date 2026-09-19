"use client";

import { useState } from "react";
import MobileRail from "@/components/ui/MobileRail";
import MobileDisclosure from "@/components/ui/MobileDisclosure";
import { AnimatePresence, motion } from "motion/react";
import { ROOMS, formatMad, type Room } from "./data";
import { RZ, VisualPanel } from "./decor";
import { Eyebrow, Photo, Reveal } from "./ui";

/**
 * Chambres & suites.
 *
 * Deux compositions réellement distinctes, pas une seule grille redimensionnée :
 *  - mobile / tablette : fiches empilées puis sur deux colonnes, visuel en
 *    premier et informations clés (prix, surface, capacité) immédiatement
 *    lisibles sans interaction — un voyageur qui scanne son téléphone doit
 *    tout voir d'un coup ;
 *  - desktop (lg+) : sélecteur éditorial, grand panneau immersif à gauche qui
 *    se fond d'une chambre à l'autre, liste tarifaire à droite.
 */

function Amenities({ items, tone }: { items: string[]; tone: "dark" | "light" }) {
  return (
    <ul className="mt-5 flex flex-wrap gap-x-2 gap-y-2">
      {items.map((a) => (
        <li
          key={a}
          className="rounded-full px-3 py-1.5 text-[0.8rem]"
          style={
            tone === "dark"
              ? { backgroundColor: "rgba(216,201,163,0.1)", color: RZ.sable }
              : { backgroundColor: "rgba(34,48,44,0.06)", color: RZ.encre }
          }
        >
          {a}
        </li>
      ))}
    </ul>
  );
}

function RoomCard({ room, display }: { room: Room; display: string }) {
  return (
    <article
      className="flex h-full flex-col overflow-hidden rounded-[2px]"
      style={{ backgroundColor: "#fbf6ed", boxShadow: "0 1px 0 rgba(34,48,44,0.08)" }}
    >
      {room.photo ? (
        <Photo
          photo={room.photo}
          className="h-56 w-full sm:h-64"
          sizes="(min-width: 640px) 45vw, 92vw"
        />
      ) : (
        <VisualPanel variant={room.panel} className="h-56 w-full sm:h-64" />
      )}
      <div className="flex flex-1 flex-col p-6 sm:p-7">
        <p
          className="text-[0.75rem] uppercase tracking-[0.24em]"
          style={{ color: RZ.ocreProfond }}
        >
          {room.kind}
        </p>
        <h3
          className={`${display} mt-2 text-[1.75rem] leading-tight`}
          style={{ color: RZ.encre }}
        >
          {room.name}
        </h3>

        <dl className="mt-4 flex flex-wrap items-baseline gap-x-5 gap-y-1 text-[0.9rem]">
          <div className="flex items-baseline gap-1.5">
            <dt className="sr-only">Tarif</dt>
            <dd style={{ color: RZ.terre }} className="font-medium">
              {formatMad(room.pricePerNight)}
            </dd>
            <span style={{ color: RZ.brume }} className="text-[0.8rem]">
              / nuit
            </span>
          </div>
          <div className="flex items-baseline gap-1.5" style={{ color: RZ.brume }}>
            <dt className="sr-only">Surface</dt>
            <dd>{room.surface}</dd>
            <span aria-hidden="true">·</span>
            <dt className="sr-only">Capacité</dt>
            <dd>{room.sleeps}</dd>
          </div>
        </dl>

        <p
          className="mt-4 text-[0.95rem] leading-relaxed"
          style={{ color: RZ.brume }}
        >
          {room.blurb}
        </p>

        <MobileDisclosure label="Équipements de la chambre">
          <Amenities items={room.amenities} tone="light" />
        </MobileDisclosure>

        <a
          href="#reservation"
          className="mt-6 inline-flex min-h-[44px] items-center justify-center rounded-[2px] px-5 text-[0.85rem] uppercase tracking-[0.16em] transition-transform duration-200 ease-out active:scale-[0.98] motion-reduce:transition-none"
          style={{ backgroundColor: RZ.terre, color: "#fdf8f1" }}
        >
          Vérifier les dates
        </a>
      </div>
    </article>
  );
}

export default function Rooms({ display }: { display: string }) {
  // Le sélecteur s'ouvre sur la première chambre photographiée : à l'ouverture
  // de la section, un visiteur desktop doit voir une vraie pièce, pas le
  // panneau dessiné qui sert de repli.
  const [activeId, setActiveId] = useState(
    (ROOMS.find((r) => r.photo) ?? ROOMS[0]).id
  );
  const active = ROOMS.find((r) => r.id === activeId) ?? ROOMS[0];

  return (
    <section
      id="chambres"
      aria-labelledby="chambres-titre"
      className="scroll-mt-28 px-5 py-20 sm:px-8 sm:py-24 lg:px-12 lg:py-32"
      style={{ backgroundColor: RZ.chaux }}
    >
      <div className="mx-auto max-w-[1400px]">
        <Reveal>
          <Eyebrow tone="light">Quatre chambres, pas une de plus</Eyebrow>
          <h2
            id="chambres-titre"
            className={`${display} mt-6 max-w-2xl text-[2.25rem] leading-[1.08] sm:text-[3rem] lg:text-[3.75rem]`}
            style={{ color: RZ.encre }}
          >
            Chaque chambre a sa lumière, son heure et son silence.
          </h2>
          <p
            className="mt-6 max-w-xl text-[1rem] leading-relaxed sm:text-[1.05rem]"
            style={{ color: RZ.brume }}
          >
            Les tarifs s&rsquo;entendent par nuit, petit-déjeuner et accès au hammam
            compris. Deux nuits minimum d&rsquo;octobre à avril.
          </p>
        </Reveal>

        {/* ---------- Mobile & tablette : fiches complètes ---------- */}
        <MobileRail label="Chambres et suites" className="mt-12 grid gap-6 sm:grid-cols-2 sm:gap-7 lg:hidden">
          {ROOMS.map((room, i) => (
            <Reveal key={room.id} delay={i * 0.06} amount={0.15} className="h-full">
              <RoomCard room={room} display={display} />
            </Reveal>
          ))}
        </MobileRail>

        {/* ---------- Desktop : sélecteur éditorial ---------- */}
        <div className="mt-16 hidden gap-12 lg:grid lg:grid-cols-12 xl:gap-16">
          <div className="lg:col-span-7">
            {/* Le fondu enchaîné est volontairement long (1,2 s) : on change de
                chambre comme on pousse une porte, pas comme on change d'onglet. */}
            <div className="relative h-[34rem] overflow-hidden xl:h-[38rem]">
              <AnimatePresence initial={false}>
                <motion.div
                  key={active.id}
                  className="absolute inset-0"
                  initial={{ opacity: 0, scale: 1.05 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 1.2, ease: [0.22, 0.61, 0.36, 1] }}
                >
                  {active.photo ? (
                    <Photo
                      photo={active.photo}
                      className="h-full w-full"
                      sizes="(min-width: 1280px) 780px, 58vw"
                      zoom={false}
                    />
                  ) : (
                    <VisualPanel variant={active.panel} className="h-full w-full" />
                  )}
                </motion.div>
              </AnimatePresence>
              <div
                aria-hidden="true"
                className="pointer-events-none absolute inset-x-0 bottom-0 h-1/3"
                style={{
                  backgroundImage:
                    "linear-gradient(to top, rgba(8,22,20,0.72), rgba(8,22,20,0))",
                }}
              />
              <p
                className="absolute bottom-6 left-6 z-10 text-[0.72rem] uppercase tracking-[0.28em]"
                style={{ color: "rgba(244,236,224,0.9)" }}
              >
                {active.kind}
              </p>
            </div>
          </div>

          <div className="lg:col-span-5">
            <div role="list" className="border-t" style={{ borderColor: "rgba(34,48,44,0.14)" }}>
              {ROOMS.map((room) => {
                const isActive = room.id === active.id;
                return (
                  <div role="listitem" key={room.id}>
                    <button
                      type="button"
                      onClick={() => setActiveId(room.id)}
                      aria-pressed={isActive}
                      aria-controls="chambre-detail"
                      className="group flex w-full items-baseline justify-between gap-6 border-b py-5 text-left transition-colors"
                      style={{
                        borderColor: "rgba(34,48,44,0.14)",
                        color: isActive ? RZ.encre : "rgba(34,48,44,0.58)",
                      }}
                    >
                      <span className="flex items-baseline gap-4">
                        <span
                          aria-hidden="true"
                          className="inline-block h-px transition-all duration-500"
                          style={{
                            width: isActive ? 28 : 12,
                            backgroundColor: isActive ? RZ.terre : "rgba(34,48,44,0.3)",
                          }}
                        />
                        <span className={`${display} text-[1.6rem] leading-none`}>
                          {room.name}
                        </span>
                      </span>
                      <span className="shrink-0 text-[0.9rem] tabular-nums">
                        {formatMad(room.pricePerNight)}
                      </span>
                    </button>
                  </div>
                );
              })}
            </div>

            <div id="chambre-detail" aria-live="polite" className="pt-8">
              <AnimatePresence initial={false}>
                <motion.div
                  key={active.id}
                  initial={{ opacity: 0, y: 14 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  transition={{ duration: 0.7, ease: [0.22, 0.61, 0.36, 1] }}
                >
                  <p
                    className="text-[0.85rem] tracking-wide"
                    style={{ color: RZ.ocreProfond }}
                  >
                    {active.surface} · {active.sleeps}
                  </p>
                  <p
                    className="mt-4 max-w-md text-[1.05rem] leading-relaxed"
                    style={{ color: RZ.brume }}
                  >
                    {active.blurb}
                  </p>
                  <Amenities items={active.amenities} tone="light" />
                </motion.div>
              </AnimatePresence>

              <a
                href="#reservation"
                className="mt-9 inline-flex min-h-[48px] items-center px-7 text-[0.85rem] uppercase tracking-[0.2em] transition-[opacity,transform] duration-200 ease-out hover:opacity-85 active:scale-[0.98] motion-reduce:transition-none"
                style={{ backgroundColor: RZ.terre, color: "#fdf8f1" }}
              >
                Vérifier les disponibilités
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
