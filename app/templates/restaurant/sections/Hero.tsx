"use client";

import { useRef } from "react";
import { motion, useMotionValue, useReducedMotion, useSpring, useTransform } from "motion/react";
import { BRAND } from "../data";
import { PHOTOS } from "../photos";
import Photo, { useDesktop } from "../Photo";
import { ActionLink, Wordmark } from "../Brand";

/**
 * Ouverture cinématique.
 *
 * Desktop : le titre occupe toute la largeur et le panneau photo vient se
 * poser PAR-DESSUS sa fin de ligne — les mots passent derrière l'image, ce
 * qui donne la profondeur qu'une simple colonne texte / colonne image n'a
 * jamais. Le panneau réagit au curseur, de quelques pixels seulement.
 *
 * Mobile : composition entièrement différente (pas un desktop rétréci) —
 * mot-symbole géant, titre empilé, photo pleine largeur, puis les deux CTA
 * en pleine largeur à portée de pouce.
 *
 * L'entrée est faite en CSS (classes `krush-anim`, voir page.tsx) et non avec
 * Motion : l'état final est l'état par défaut, le hero est donc lisible dès la
 * première peinture, avant toute hydratation. Seule la réaction au curseur —
 * une amélioration, jamais une condition de lisibilité — passe par Motion.
 */
export default function Hero({ d }: { d: string }) {
  const ref = useRef<HTMLElement>(null);
  const desktop = useDesktop();
  const reduce = useReducedMotion();

  const px = useMotionValue(0);
  const py = useMotionValue(0);
  const sx = useSpring(px, { stiffness: 120, damping: 20, mass: 0.6 });
  const sy = useSpring(py, { stiffness: 120, damping: 20, mass: 0.6 });
  const photoX = useTransform(sx, [-1, 1], [-14, 14]);
  const photoY = useTransform(sy, [-1, 1], [-10, 10]);
  const chipX = useTransform(sx, [-1, 1], [10, -10]);
  const chipY = useTransform(sy, [-1, 1], [7, -7]);

  const interactive = desktop && !reduce;

  return (
    <section
      id="haut"
      ref={ref}
      onMouseMove={(e) => {
        if (!interactive || !ref.current) return;
        const r = ref.current.getBoundingClientRect();
        px.set(((e.clientX - r.left) / r.width) * 2 - 1);
        py.set(((e.clientY - r.top) / r.height) * 2 - 1);
      }}
      onMouseLeave={() => {
        px.set(0);
        py.set(0);
      }}
      className="relative overflow-hidden px-5 pb-10 pt-8 sm:px-8 lg:min-h-[86vh] lg:px-12 lg:pb-16 lg:pt-6"
    >
      {/* Trame technique de fond, très discrète. */}
      <span
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-[0.55]"
        style={{
          backgroundImage:
            "linear-gradient(to right, rgba(244,239,230,0.045) 1px, transparent 1px)",
          backgroundSize: "clamp(60px, 8vw, 120px) 100%",
        }}
      />

      {/* ---------------- Mobile / tablette ---------------- */}
      <div className="relative lg:hidden">
        <p
          className="krush-anim krush-rise flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.24em] text-[#FF3B1F]"
          style={{ animationDelay: "0.05s" }}
        >
          <span aria-hidden="true" className="h-[6px] w-[6px] bg-[#FF3B1F]" />
          {BRAND.kicker}
        </p>

        <h1
          className={`${d} mt-4 text-[17vw] uppercase leading-[0.86] tracking-[-0.02em] text-[#F4EFE6]`}
        >
          {["Smashé fort.", "Servi chaud."].map((line, i) => (
            <span key={line} className="-my-[0.14em] block overflow-hidden py-[0.14em]">
              <span
                className={`krush-anim krush-line block ${i === 1 ? "text-[#FF3B1F]" : ""}`}
                style={{ animationDelay: `${0.12 + i * 0.09}s` }}
              >
                {line}
              </span>
            </span>
          ))}
        </h1>

        <div
          className="krush-anim krush-curtain relative -mx-5 mt-6 sm:-mx-8"
          style={{ animationDelay: "0.22s" }}
        >
          {/* Les deux compositions du hero (mobile et desktop) coexistent dans
              le DOM ; `sizes` doit donc décrire les DEUX cas, sinon next/image
              prévient qu'il a chargé une image trop large pour son cadre. */}
          <Photo
            asset={PHOTOS.heroTrio}
            priority
            sizes="(min-width:1024px) 40vw, 100vw"
            scrim="soft"
            grade={0.12}
            className="aspect-[4/5] w-full"
            objectPosition="52% 55%"
          />
          <span className="absolute bottom-4 left-5 flex items-center gap-2 bg-[#FF3B1F] px-3 py-1.5 text-[10px] font-bold uppercase tracking-[0.18em] text-[#0B0B0C]">
            Krush Double · 78 MAD
          </span>
        </div>

        <p
          className="krush-anim krush-rise mt-6 text-[15px] leading-[1.7] text-[#F4EFE6]/70"
          style={{ animationDelay: "0.34s" }}
        >
          {BRAND.claim}
        </p>

        <div
          className="krush-anim krush-rise mt-7 grid grid-cols-1 gap-3"
          style={{ animationDelay: "0.42s" }}
        >
          <ActionLink href="#menu" variant="solid" className="w-full">
            Voir le menu
          </ActionLink>
          <ActionLink href="#spots" variant="ghost" className="w-full">
            Nous trouver
          </ActionLink>
        </div>
      </div>

      {/* ---------------- Desktop ---------------- */}
      <div className="relative hidden lg:block">
        {/*
          `container-type: inline-size` : la typographie du hero est dimensionnée
          en `cqw`, pas en `vw`. Sans ça, au-delà de 1600 px de fenêtre le
          conteneur cesse de grandir alors que les `vw` continuent : le titre
          débordait de plus de 170 px et la photo mangeait deux mots entiers au
          lieu d'une simple fin de ligne.
        */}
        <div className="mx-auto max-w-[1600px]" style={{ containerType: "inline-size" }}>
          <p
            className="krush-anim krush-rise flex items-center gap-3 pt-6 text-[11px] font-semibold uppercase tracking-[0.3em] text-[#FF3B1F]"
            style={{ animationDelay: "0.1s" }}
          >
            <span aria-hidden="true" className="h-[7px] w-[7px] bg-[#FF3B1F]" />
            {BRAND.kicker}
            <span aria-hidden="true" className="h-px w-16 bg-[#FF3B1F]/40" />
            <span className="text-[#F4EFE6]/40">Casablanca · Rabat · Marrakech</span>
          </p>

          <div className="relative mt-8">
            {/* Titre pleine largeur : la fin de ligne passera sous la photo. */}
            <h1
              className={`${d} relative z-0 text-[12.8cqw] uppercase leading-[0.84] tracking-[-0.025em] text-[#F4EFE6]`}
            >
              {["Smashé fort.", "Servi chaud."].map((line, i) => (
                /* Masque agrandi de 0,14 em haut et bas, puis rattrapé par une
                   marge négative : l'accent du É et les descendantes ne sont
                   plus tranchés, sans desserrer l'interligne. */
                <span key={line} className="-my-[0.14em] block overflow-hidden py-[0.14em]">
                  <span
                    className={`krush-anim krush-line block ${i === 1 ? "text-[#FF3B1F]" : ""}`}
                    style={{ animationDelay: `${0.15 + i * 0.1}s` }}
                  >
                    {line}
                  </span>
                </span>
              ))}
            </h1>

            {/* Panneau photo : posé par-dessus la typographie. */}
            <motion.div
              className="absolute right-0 top-[-14%] z-10 w-[40%]"
              style={interactive ? { x: photoX, y: photoY } : undefined}
            >
              <div className="krush-anim krush-curtain" style={{ animationDelay: "0.25s" }}>
                <Photo
                  asset={PHOTOS.heroTrio}
                  priority
                  sizes="(min-width:1024px) 40vw, 100vw"
                  grade={0.12}
                  scrim="soft"
                  className="aspect-[4/5] w-full"
                  objectPosition="52% 52%"
                />
              </div>

              <motion.span
                style={interactive ? { x: chipX, y: chipY } : undefined}
                className="absolute -left-6 bottom-8 z-20 block bg-[#FF3B1F] px-5 py-3 text-[#0B0B0C]"
              >
                <span
                  className="krush-anim krush-rise block"
                  style={{ animationDelay: "0.9s" }}
                >
                  <span className="block text-[10px] font-bold uppercase tracking-[0.2em]">
                    Best-seller
                  </span>
                  <span className={`${d} mt-1 block text-[22px] uppercase leading-none`}>
                    Krush Double · 78 MAD
                  </span>
                </span>
              </motion.span>
            </motion.div>

            {/* Bloc bas : sa largeur est bornée à 56 % pour rester TOUJOURS à
                gauche du panneau photo (qui occupe les 40 % de droite). Sans
                cette borne, les deux boutons passaient sous l'image. */}
            <div className="relative z-20 mt-10 w-[56%]">
              <p
                className="krush-anim krush-rise max-w-[48ch] text-[16px] leading-[1.75] text-[#F4EFE6]/70 xl:text-[17px]"
                style={{ animationDelay: "0.55s" }}
              >
                {BRAND.claim}
              </p>

              <div
                className="krush-anim krush-rise mt-7 flex flex-wrap items-center gap-3"
                style={{ animationDelay: "0.65s" }}
              >
                <ActionLink href="#menu" variant="solid">
                  Voir le menu
                </ActionLink>
                <ActionLink href="#spots" variant="ghost">
                  Nous trouver
                </ActionLink>
              </div>

              <p
                className="krush-anim krush-rise mt-8 flex items-center gap-3 text-[10px] font-semibold uppercase tracking-[0.28em] text-[#F4EFE6]/35"
                style={{ animationDelay: "0.8s" }}
              >
                <span aria-hidden="true">↓</span> Défilez
                <span aria-hidden="true" className="h-px w-14 bg-[#F4EFE6]/20" />
                <Wordmark d={d} className="text-[20px] text-[#F4EFE6]/25" accent={false} />
                <span className="text-[#F4EFE6]/25">Est. démo · 2026</span>
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
