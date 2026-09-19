"use client";

import MobileExperience from "@/components/ui/MobileExperience";
import MobileRail from "@/components/ui/MobileRail";
import MobileDisclosure from "@/components/ui/MobileDisclosure";

import { useLayoutEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { useTemplateSelection } from "@/lib/templates/selection-context";
import {
  MotionConfig,
  motion,
  useInView,
  useReducedMotion,
  useScroll,
  useTransform,
} from "motion/react";
import { DEMO_BAR_HEIGHT } from "@/components/templates/DemoBar";
import Rooms from "./Rooms";
import Reservation from "./Reservation";
import {
  EXPERIENCES,
  GALLERY,
  NAV_LINKS,
  PHOTOS,
  PHOTO_CREDIT,
  TESTIMONIALS,
} from "./data";
import { RZ, zellige } from "./decor";
import { ClipReveal, Eyebrow, Photo, Reveal } from "./ui";
import { directionalOffset, useScrollDirection } from "../useScrollDirection";

/**
 * Riad Zellige — démonstration sectorielle « Hôtel / Riad ».
 *
 * Direction : immersion sensorielle, plein écran, calme assumé. Volontairement
 * à l'opposé du langage graphique d'Evorya (pas de grille cyber, pas de filets
 * blancs, pas de display en capitales partout) : ce que le prospect doit voir
 * ici, c'est une marque hôtelière autonome — vert profond, chaux, ocre et terre
 * cuite, sérif Cormorant pour les titres, rythme lent.
 *
 * Composition hybride assumée : de vraies photographies d'ambiance (voir
 * `PHOTOS` dans data.ts) portent la crédibilité d'une maison d'hôtes, et les
 * panneaux CSS/SVG de decor.tsx tiennent les respirations abstraites. On ne
 * remplace pas les uns par les autres — on les alterne.
 */

const EASE = [0.22, 0.61, 0.36, 1] as const;

function Hero({ display }: { display: string }) {
  const ref = useRef<HTMLElement | null>(null);
  const reduce = useReducedMotion();
  const direction = useScrollDirection();
  const inView = useInView(ref, { amount: 0.15 });
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });
  const bgY = useTransform(scrollYProgress, [0, 1], ["0%", reduce ? "0%" : "14%"]);
  const bgScale = useTransform(scrollYProgress, [0, 1], [1, reduce ? 1 : 1.08]);

  return (
    <section
      ref={ref}
      aria-labelledby="riad-titre"
      className="relative flex h-[86svh] min-h-[34rem] flex-col justify-end overflow-hidden lg:h-[90svh] lg:min-h-[44rem]"
      style={{ backgroundColor: RZ.nuit }}
    >
      {/*
        La photographie porte le hero ; la couche graphique d'origine (faisceau
        de lumière, arche en contre-jour, lattis) reste posée dessus en très
        faible opacité. On garde ainsi la direction artistique du riad tout en
        donnant la crédibilité d'une vraie maison.
      */}
      <motion.div className="absolute inset-0" style={{ y: bgY, scale: bgScale }}>
        <div
          aria-hidden="true"
          className="absolute inset-0"
          style={{
            backgroundImage: `linear-gradient(168deg, #081a18 0%, ${RZ.cour} 40%, ${RZ.zellige} 72%, #2a4a3f 100%)`,
          }}
        />
        <Image
          src={PHOTOS.courNuit.src}
          alt={PHOTOS.courNuit.alt}
          fill
          priority
          sizes="100vw"
          placeholder="blur"
          blurDataURL={PHOTOS.courNuit.blur}
          className="object-cover"
          style={{ objectPosition: "50% 55%" }}
        />
        <div
          aria-hidden="true"
          className="absolute inset-0"
          style={{
            backgroundImage: zellige("d8c9a3"),
            backgroundSize: "88px 88px",
            opacity: 0.07,
          }}
        />
        {/* Faisceau de lumière traversant la cour */}
        <div
          aria-hidden="true"
          className="absolute -top-1/4 right-[-6%] h-[150%] w-[58%] rotate-[14deg] blur-3xl sm:w-[46%]"
          style={{
            backgroundImage:
              "linear-gradient(to bottom, rgba(244,236,224,0.18), rgba(216,201,163,0.05) 58%, rgba(216,201,163,0) 80%)",
          }}
        />
        {/* Arche en contre-jour */}
        <div
          aria-hidden="true"
          className="absolute inset-x-[6%] bottom-0 top-[34%] rounded-t-[999px] sm:inset-x-[18%] lg:inset-x-[28%]"
          style={{
            backgroundImage:
              "linear-gradient(to top, rgba(6,18,17,0.72), rgba(6,18,17,0.24) 60%, rgba(6,18,17,0))",
          }}
        />
        <div
          aria-hidden="true"
          className="absolute inset-0"
          style={{
            backgroundImage:
              "linear-gradient(to top, rgba(6,18,17,0.94) 0%, rgba(6,18,17,0.62) 34%, rgba(6,18,17,0.24) 66%, rgba(6,18,17,0.35) 100%)",
          }}
        />
      </motion.div>

      <div className="relative z-10 px-5 pb-12 sm:px-8 sm:pb-16 lg:px-12 lg:pb-20">
        <div className="mx-auto max-w-[1400px]">
          <motion.p
            className="text-[0.75rem] uppercase tracking-[0.3em]"
            style={{ color: RZ.sable }}
            initial={reduce ? false : { opacity: 0, y: directionalOffset(direction, 14) }}
            animate={reduce || inView ? { opacity: 1, y: 0 } : { opacity: 0, y: directionalOffset(direction, 14) }}
            transition={{ duration: 1.1, delay: 0.15, ease: EASE }}
          >
            Médina de Marrakech
          </motion.p>

          <motion.h1
            id="riad-titre"
            className={`${display} mt-5 text-[3.25rem] leading-[0.95] sm:text-[5rem] lg:text-[7.5rem] xl:text-[8.5rem]`}
            style={{ color: RZ.chaux }}
            initial={reduce ? false : { opacity: 0, y: directionalOffset(direction, 26) }}
            animate={reduce || inView ? { opacity: 1, y: 0 } : { opacity: 0, y: directionalOffset(direction, 26) }}
            transition={{ duration: 1.4, delay: 0.25, ease: EASE }}
          >
            Riad Zellige
          </motion.h1>

          <motion.div
            className="mt-7 flex flex-col gap-8 lg:mt-10 lg:flex-row lg:items-end lg:justify-between lg:gap-16"
            initial={reduce ? false : { opacity: 0, y: directionalOffset(direction, 20) }}
            animate={reduce || inView ? { opacity: 1, y: 0 } : { opacity: 0, y: directionalOffset(direction, 20) }}
            transition={{ duration: 1.2, delay: 0.5, ease: EASE }}
          >
            <p
              className="max-w-md text-[1.05rem] leading-relaxed sm:text-[1.15rem] lg:max-w-lg"
              style={{ color: "rgba(244,236,224,0.88)" }}
            >
              Une maison ancienne, quatre chambres seulement, et l&rsquo;eau du bassin
              pour seul fond sonore.
            </p>

            <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
              <a
                href="#reservation"
                className="inline-flex min-h-[52px] items-center justify-center px-8 text-[0.85rem] uppercase tracking-[0.2em] transition-[opacity,transform] duration-200 ease-out hover:opacity-90 active:scale-[0.98] motion-reduce:transition-none"
                style={{ backgroundColor: RZ.terre, color: "#fdf8f1" }}
              >
                Réserver un séjour
              </a>
              <a
                href="#chambres"
                className="inline-flex min-h-[52px] items-center justify-center border px-8 text-[0.85rem] uppercase tracking-[0.2em] transition-[background-color,transform] duration-200 ease-out hover:bg-[rgba(244,236,224,0.1)] active:scale-[0.98] motion-reduce:transition-none"
                style={{ borderColor: "rgba(244,236,224,0.45)", color: RZ.chaux }}
              >
                Voir les chambres
              </a>
            </div>
          </motion.div>

          <motion.p
            className="mt-8 text-[0.85rem]"
            style={{ color: "rgba(216,201,163,0.8)" }}
            initial={reduce ? false : { opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: false, amount: 0.15 }}
            transition={{ duration: 1.2, delay: 0.8 }}
          >
            4 chambres · Hammam · Table du soir · À partir de 1 200 MAD la nuit
          </motion.p>
        </div>
      </div>
    </section>
  );
}

function Nav({ display }: { display: string }) {
  return (
    <nav
      aria-label="Navigation Riad Zellige"
      className="sticky z-50 border-b backdrop-blur-md"
      style={{
        top: DEMO_BAR_HEIGHT,
        backgroundColor: "rgba(9,25,23,0.82)",
        borderColor: "rgba(216,201,163,0.18)",
      }}
    >
      <div className="mx-auto flex max-w-[1400px] items-center justify-between gap-4 px-5 py-3 sm:px-8 lg:px-12">
        <a
          href="#riad-titre"
          className={`${display} shrink-0 text-[1.15rem] tracking-[0.18em] sm:text-[1.3rem]`}
          style={{ color: RZ.chaux }}
        >
          Riad Zellige
        </a>

        <ul className="hidden items-center gap-8 lg:flex">
          {NAV_LINKS.map((link) => (
            <li key={link.href}>
              <a
                href={link.href}
                className="rz-link text-[0.85rem]"
                style={{ color: RZ.brumeClaire }}
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>

        <a
          href="#reservation"
          className="inline-flex min-h-[44px] shrink-0 items-center border px-4 text-[0.75rem] uppercase tracking-[0.18em] transition-colors sm:px-6"
          style={{ borderColor: RZ.sable, color: RZ.sable }}
        >
          Réserver
        </a>
      </div>
    </nav>
  );
}

function Intro({ display }: { display: string }) {
  return (
    <section
      id="le-riad"
      aria-labelledby="le-riad-titre"
      className="scroll-mt-28 overflow-hidden px-5 py-20 sm:px-8 sm:py-24 lg:px-12 lg:py-32"
      style={{ backgroundColor: RZ.chaux }}
    >
      <div className="mx-auto grid max-w-[1400px] gap-12 lg:grid-cols-12 lg:gap-16">
        {/*
          La photo est taillée en arche et déborde légèrement la gouttière de
          gauche sur grand écran : la composition n'est pas une grille sage, la
          maison « sort » du cadre. Le cartouche, lui, chevauche le bord bas de
          l'image — il est posé HORS du ClipReveal, dont le `clip-path` final
          rognerait tout ce qui dépasse du cadre.
        */}
        <div className="relative lg:col-span-5 lg:-ml-12 lg:w-[calc(100%+3rem)]">
          <ClipReveal>
            <Photo
              photo={PHOTOS.courLumiere}
              className="h-[22rem] w-full rounded-t-[14rem] sm:h-[30rem] lg:h-[40rem]"
              sizes="(min-width: 1024px) 44vw, 92vw"
              focus="50% 58%"
            />
          </ClipReveal>
          <Reveal
            delay={0.5}
            y={18}
            amount={0.1}
            className="pointer-events-none absolute -bottom-9 right-6 hidden max-w-[15rem] lg:block xl:-right-8"
          >
            <div
              className="px-6 py-5"
              style={{
                backgroundColor: "#fbf6ed",
                boxShadow: "0 18px 44px rgba(34,48,44,0.18)",
              }}
            >
              <p
                className="text-[0.7rem] uppercase tracking-[0.24em]"
                style={{ color: RZ.ocreProfond }}
              >
                La cour
              </p>
              <p
                className="mt-2 text-[0.92rem] leading-relaxed"
                style={{ color: RZ.brume }}
              >
                Six degrés de moins qu&rsquo;en ruelle, du lever du jour au
                coucher du soleil.
              </p>
            </div>
          </Reveal>
        </div>

        <Reveal className="lg:col-span-6 lg:col-start-7 lg:pt-24" delay={0.12}>
          <Eyebrow tone="light">Le riad</Eyebrow>
          <h2
            id="le-riad-titre"
            className={`${display} mt-6 text-[2.25rem] leading-[1.08] sm:text-[3rem] lg:text-[3.75rem]`}
            style={{ color: RZ.encre }}
          >
            On y entre par une porte basse, et la ville s&rsquo;arrête.
          </h2>
          <div
            className="mt-7 space-y-5 text-[1rem] leading-relaxed sm:text-[1.08rem]"
            style={{ color: RZ.brume }}
          >
            <p>
              Le Riad Zellige est une maison de famille restaurée pièce par pièce :
              murs de tadelakt passés à la main, sols en carreaux posés à
              l&rsquo;ancienne, boiseries de cèdre récupérées puis retaillées.
              Rien n&rsquo;a été agrandi, rien n&rsquo;a été ajouté.
            </p>
            <p>
              Quatre chambres, une cour, une terrasse. Nous n&rsquo;accueillons jamais
              plus d&rsquo;une dizaine de personnes à la fois — c&rsquo;est ce qui
              rend le calme possible, et le service réellement attentif.
            </p>
          </div>

          <dl className="mt-10 grid grid-cols-2 gap-x-6 gap-y-8 sm:grid-cols-3">
            {[
              { k: "Chambres", v: "4" },
              { k: "Cour intérieure", v: "1" },
              { k: "Terrasse", v: "120 m²" },
            ].map((item) => (
              <div key={item.k}>
                <dt
                  className="text-[0.75rem] uppercase tracking-[0.22em]"
                  style={{ color: RZ.ocreProfond }}
                >
                  {item.k}
                </dt>
                <dd
                  className={`${display} mt-2 text-[2rem] leading-none`}
                  style={{ color: RZ.encre }}
                >
                  {item.v}
                </dd>
              </div>
            ))}
          </dl>
        </Reveal>
      </div>
    </section>
  );
}

/**
 * Respiration plein cadre entre les chambres et les expériences.
 *
 * C'est le seul moment de la page où l'image occupe presque tout l'écran : le
 * texte se réduit à deux lignes, et l'image se déplace très lentement au scroll
 * (parallaxe scroll-linked, désactivée explicitement sous
 * `prefers-reduced-motion` — `useTransform` n'est pas couvert par MotionConfig).
 */
function Immersion({ display }: { display: string }) {
  const ref = useRef<HTMLElement | null>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const y = useTransform(
    scrollYProgress,
    [0, 1],
    reduce ? ["0%", "0%"] : ["-7%", "7%"]
  );

  return (
    <section
      ref={ref}
      aria-labelledby="heure-bleue-titre"
      className="relative flex h-[78svh] min-h-[26rem] items-end overflow-hidden lg:h-[92svh] lg:min-h-[40rem]"
      style={{ backgroundColor: RZ.nuit }}
    >
      <motion.div className="absolute inset-x-0 -inset-y-[9%]" style={{ y }}>
        <Image
          src={PHOTOS.terrasseCrepuscule.src}
          alt={PHOTOS.terrasseCrepuscule.alt}
          fill
          sizes="100vw"
          placeholder="blur"
          blurDataURL={PHOTOS.terrasseCrepuscule.blur}
          className="object-cover"
          style={{ objectPosition: "50% 50%" }}
        />
      </motion.div>

      <div
        aria-hidden="true"
        className="absolute inset-0"
        style={{
          backgroundImage:
            "linear-gradient(to top, rgba(6,18,17,0.92) 0%, rgba(6,18,17,0.5) 32%, rgba(6,18,17,0.06) 62%)",
        }}
      />

      <div className="relative z-10 w-full px-5 pb-12 sm:px-8 sm:pb-16 lg:px-12 lg:pb-20">
        <div className="mx-auto max-w-[1400px]">
          <Reveal amount={0.15}>
            <Eyebrow>L&rsquo;heure bleue</Eyebrow>
            <h2
              id="heure-bleue-titre"
              className={`${display} mt-6 max-w-3xl text-[2.25rem] leading-[1.05] sm:text-[3.25rem] lg:text-[4.5rem]`}
              style={{ color: RZ.chaux }}
            >
              Vers 19h, la terrasse devient la plus belle pièce de la maison.
            </h2>
            <p
              className="mt-6 max-w-md text-[1rem] leading-relaxed"
              style={{ color: "rgba(244,236,224,0.82)" }}
            >
              On y monte pour le thé, on y reste pour le coucher du soleil sur les
              toits, et l&rsquo;appel du muezzin remplace toute musique.
            </p>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

function Experiences({ display }: { display: string }) {
  return (
    <section
      id="experiences"
      aria-labelledby="experiences-titre"
      className="relative scroll-mt-28 overflow-hidden px-5 py-20 sm:px-8 sm:py-24 lg:px-12 lg:py-32"
      style={{ backgroundColor: RZ.cour }}
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0"
        style={{
          backgroundImage:
            "radial-gradient(80% 60% at 85% 10%, rgba(176,125,58,0.22), transparent 62%)",
        }}
      />

      <div className="relative mx-auto grid max-w-[1400px] gap-12 lg:grid-cols-12 lg:gap-16">
        <div className="lg:col-span-4">
          <div className="lg:sticky lg:top-40">
            <Reveal>
              <Eyebrow>Sur place</Eyebrow>
              <h2
                id="experiences-titre"
                className={`${display} mt-6 text-[2.25rem] leading-[1.08] sm:text-[3rem]`}
                style={{ color: RZ.chaux }}
              >
                Tout se passe à l&rsquo;intérieur des murs.
              </h2>
              <p
                className="mt-6 max-w-sm text-[1rem] leading-relaxed"
                style={{ color: RZ.brumeClaire }}
              >
                Rien d&rsquo;obligatoire, rien de programmé. Vous choisissez vos
                horaires, nous nous adaptons.
              </p>
            </Reveal>
            {/*
              Ce visuel existait uniquement sur grand écran : la colonne de
              gauche était deux paragraphes posés dans le vide sur mobile. Il
              devient une vraie photographie de matière (eau, zellige, ombre de
              palmier) affichée à tous les paliers.
            */}
            <ClipReveal delay={0.12} className="mt-10" amount={0.15}>
              <Photo
                photo={PHOTOS.bassinZellige}
                className="h-56 w-full sm:h-72 lg:h-80"
                sizes="(min-width: 1024px) 32vw, 92vw"
                focus="50% 45%"
              />
              <p
                className="mt-3 text-[0.8rem] uppercase tracking-[0.2em]"
                style={{ color: RZ.sable }}
              >
                Le bassin, accès libre de 7h à 23h
              </p>
            </ClipReveal>
          </div>
        </div>

        <div className="lg:col-span-8">
          <ul className="border-t" style={{ borderColor: "rgba(216,201,163,0.2)" }}>
            {EXPERIENCES.map((exp, i) => (
              <li key={exp.index}>
                <Reveal delay={i * 0.05} amount={0.3}>
                  <div
                    className="group grid gap-3 border-b py-8 sm:grid-cols-[3.5rem_1fr] sm:gap-6 lg:py-10"
                    style={{ borderColor: "rgba(216,201,163,0.2)" }}
                  >
                    <span
                      aria-hidden="true"
                      className="text-[0.8rem] tracking-[0.2em]"
                      style={{ color: RZ.ocre }}
                    >
                      {exp.index}
                    </span>
                    <div className="transition-transform duration-700 ease-out lg:group-hover:translate-x-2">
                      <h3
                        className={`${display} text-[1.7rem] leading-tight sm:text-[2.1rem]`}
                        style={{ color: RZ.chaux }}
                      >
                        {exp.title}
                      </h3>
                      <MobileDisclosure label="Découvrir cette expérience">
                      <p
                        className="mt-3 max-w-xl text-[1rem] leading-relaxed"
                        style={{ color: RZ.brumeClaire }}
                      >
                        {exp.description}
                      </p>
                      <p
                        className="mt-4 text-[0.82rem] uppercase tracking-[0.18em]"
                        style={{ color: RZ.sable }}
                      >
                        {exp.detail}
                      </p>
                      </MobileDisclosure>
                    </div>
                  </div>
                </Reveal>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}

function Gallery({ display }: { display: string }) {
  const reduce = useReducedMotion();

  return (
    <section
      id="galerie"
      aria-labelledby="galerie-titre"
      className="scroll-mt-28 overflow-hidden px-5 py-20 sm:px-8 sm:py-24 lg:px-12 lg:py-32"
      style={{ backgroundColor: RZ.nuit }}
    >
      <div className="mx-auto max-w-[1400px]">
        <Reveal>
          <Eyebrow>En images</Eyebrow>
          <h2
            id="galerie-titre"
            className={`${display} mt-6 max-w-2xl text-[2.25rem] leading-[1.08] sm:text-[3rem] lg:text-[3.5rem]`}
            style={{ color: RZ.chaux }}
          >
            La maison, heure par heure.
          </h2>
        </Reveal>

        {/*
          Mosaïque volontairement inégale : cinq photographies réelles, des
          portées de colonnes et des hauteurs qui ne se
          répètent jamais. La première case déborde sur deux colonnes dès la
          tablette pour casser l'effet planche-contact.
        */}
        <MobileRail label="La maison en images" className="mt-12 grid gap-4 sm:grid-cols-2 sm:gap-5 lg:mt-16 lg:grid-cols-12 lg:gap-6">
          {GALLERY.map((item, i) => (
            <figure
              key={item.caption}
              className={`${item.span} ${i === 0 ? "sm:col-span-2" : ""}`}
            >
              <motion.div
                className={`${item.height} w-full overflow-hidden`}
                initial={reduce ? false : { opacity: 0, scale: 1.06 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: false, amount: 0.2 }}
                transition={{ duration: reduce ? 0 : 1.4, delay: reduce ? 0 : (i % 3) * 0.08, ease: EASE }}
              >
                <Photo
                  photo={item.photo!}
                  className="h-full w-full"
                  sizes={
                    i === 0
                      ? "(min-width: 1024px) 58vw, (min-width: 640px) 92vw, 92vw"
                      : "(min-width: 1024px) 40vw, 45vw"
                  }
                  focus={item.focus}
                />
              </motion.div>
              <figcaption
                className="mt-3 flex flex-wrap items-baseline gap-x-3 gap-y-1 text-[0.85rem]"
                style={{ color: RZ.brumeClaire }}
              >
                <span
                  className="text-[0.72rem] uppercase tracking-[0.24em] tabular-nums"
                  style={{ color: RZ.ocre }}
                >
                  {item.hour}
                </span>
                {item.caption}
              </figcaption>
            </figure>
          ))}
        </MobileRail>
      </div>
    </section>
  );
}

function Location({ display }: { display: string }) {
  return (
    <section
      id="lieu"
      aria-labelledby="lieu-titre"
      className="scroll-mt-28 px-5 py-20 sm:px-8 sm:py-24 lg:px-12 lg:py-32"
      style={{ backgroundColor: RZ.sableClair }}
    >
      <div className="mx-auto grid max-w-[1400px] items-center gap-12 lg:grid-cols-12 lg:gap-16">
        <Reveal className="lg:col-span-6">
          <Eyebrow tone="light">Le lieu</Eyebrow>
          <h2
            id="lieu-titre"
            className={`${display} mt-6 text-[2.25rem] leading-[1.08] sm:text-[3rem] lg:text-[3.5rem]`}
            style={{ color: RZ.encre }}
          >
            Au cœur de la médina, à l&rsquo;écart du bruit.
          </h2>
          <p
            className="mt-6 max-w-lg text-[1rem] leading-relaxed sm:text-[1.08rem]"
            style={{ color: RZ.brume }}
          >
            Le riad se trouve dans une ruelle calme de la médina de Marrakech, à
            quelques minutes à pied des souks et des places animées. L&rsquo;adresse
            exacte et les instructions d&rsquo;accès vous sont transmises à la
            confirmation du séjour.
          </p>

          <dl className="mt-10 grid gap-x-8 gap-y-6 sm:grid-cols-2">
            {[
              { k: "Depuis l'aéroport", v: "≈ 25 min en voiture" },
              { k: "Souks", v: "8 min à pied" },
              { k: "Arrivée", v: "À partir de 14h" },
              { k: "Départ", v: "Jusqu'à 12h" },
            ].map((item) => (
              <div
                key={item.k}
                className="border-t pt-4"
                style={{ borderColor: "rgba(34,48,44,0.18)" }}
              >
                <dt
                  className="text-[0.75rem] uppercase tracking-[0.22em]"
                  style={{ color: RZ.ocreProfond }}
                >
                  {item.k}
                </dt>
                <dd className="mt-2 text-[1.05rem]" style={{ color: RZ.encre }}>
                  {item.v}
                </dd>
              </div>
            ))}
          </dl>
        </Reveal>

        <Reveal className="lg:col-span-5 lg:col-start-8" delay={0.1}>
          <Photo
            photo={PHOTOS.ruelleMedina}
            className="h-64 w-full sm:h-80 lg:h-[26rem]"
            sizes="(min-width: 1024px) 460px, 92vw"
            focus="50% 54%"
          />
          <p className="mt-3 text-[0.85rem]" style={{ color: RZ.brume }}>
            Une ruelle calme de la médina de Marrakech.
          </p>
        </Reveal>
      </div>
    </section>
  );
}

function Testimonials({ display }: { display: string }) {
  return (
    <section
      aria-labelledby="temoignages-titre"
      className="px-5 py-20 sm:px-8 sm:py-24 lg:px-12 lg:py-28"
      style={{ backgroundColor: RZ.chaux }}
    >
      <div className="mx-auto max-w-[1400px]">
        <Reveal>
          <h2
            id="temoignages-titre"
            className={`${display} max-w-xl text-[2rem] leading-[1.1] sm:text-[2.6rem]`}
            style={{ color: RZ.encre }}
          >
            Ce que les voyageurs en diraient.
          </h2>
          <p
            className="mt-4 text-[0.85rem] uppercase tracking-[0.18em]"
            style={{ color: RZ.ocreProfond }}
          >
            Témoignages illustratifs — contenu fictif de démonstration
          </p>
        </Reveal>

        <div className="mt-12 grid gap-6 md:grid-cols-2 lg:gap-10">
          {TESTIMONIALS.map((t, i) => (
            <Reveal key={t.author} delay={i * 0.1} className="h-full">
              <blockquote
                className="h-full border-l pl-6 sm:pl-8"
                style={{ borderColor: "rgba(168,82,47,0.5)" }}
              >
                <p
                  className={`${display} text-[1.5rem] leading-snug sm:text-[1.9rem]`}
                  style={{ color: RZ.encre }}
                >
                  « {t.quote} »
                </p>
                <footer className="mt-6 text-[0.9rem]" style={{ color: RZ.brume }}>
                  <span style={{ color: RZ.encre }}>{t.author}</span> — {t.context}
                </footer>
              </blockquote>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

function SiteFooter({ display }: { display: string }) {
  const { select } = useTemplateSelection();
  return (
    <footer
      className="relative overflow-hidden px-5 pb-10 pt-16 sm:px-8 lg:px-12 lg:pb-12 lg:pt-24"
      style={{ backgroundColor: "#081917", color: RZ.brumeClaire }}
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-0 h-px"
        style={{
          backgroundImage:
            "linear-gradient(to right, transparent, rgba(176,125,58,0.7), transparent)",
        }}
      />

      <div className="mx-auto max-w-[1400px]">
        <div className="grid gap-10 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-5">
            <p
              className={`${display} text-[2.5rem] leading-none sm:text-[3.2rem]`}
              style={{ color: RZ.chaux }}
            >
              Riad Zellige
            </p>
            <p className="mt-5 max-w-sm text-[0.95rem] leading-relaxed">
              Quatre chambres dans la médina de Marrakech. Petit-déjeuner servi à
              votre heure, hammam chauffé deux fois par jour.
            </p>
          </div>

          <nav
            aria-label="Pied de page"
            className="grid gap-8 sm:grid-cols-3 lg:col-span-7"
          >
            <div>
              <h2
                className="text-[0.75rem] uppercase tracking-[0.24em]"
                style={{ color: RZ.sable }}
              >
                La maison
              </h2>
              <ul className="mt-4 space-y-2.5 text-[0.95rem]">
                {NAV_LINKS.map((link) => (
                  <li key={link.href}>
                    <a href={link.href} className="rz-link">
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h2
                className="text-[0.75rem] uppercase tracking-[0.24em]"
                style={{ color: RZ.sable }}
              >
                Séjour
              </h2>
              <ul className="mt-4 space-y-2.5 text-[0.95rem]">
                <li>Arrivée à partir de 14h</li>
                <li>Départ jusqu&rsquo;à 12h</li>
                <li>Deux nuits minimum en saison</li>
                <li>Transfert aéroport sur demande</li>
              </ul>
            </div>
            <div>
              <h2
                className="text-[0.75rem] uppercase tracking-[0.24em]"
                style={{ color: RZ.sable }}
              >
                Contact
              </h2>
              <ul className="mt-4 space-y-2.5 text-[0.95rem]">
                <li>bonjour@riadzellige.demo</li>
                <li>+212 5 24 00 00 00</li>
                <li>Réception 7h — 23h</li>
              </ul>
              <a
                href="#reservation"
                className="mt-5 inline-flex min-h-[44px] items-center border px-5 text-[0.75rem] uppercase tracking-[0.18em] transition-colors"
                style={{ borderColor: RZ.sable, color: RZ.sable }}
              >
                Réserver
              </a>
            </div>
          </nav>
        </div>

        <div
          className="mt-14 flex flex-col gap-4 border-t pt-6 text-[0.8rem] sm:flex-row sm:items-center sm:justify-between"
          style={{ borderColor: "rgba(216,201,163,0.18)" }}
        >
          <p>
            Établissement fictif — démonstration réalisée par Evorya. Aucune
            réservation réelle, aucun paiement.
          </p>
          <Link
            href="/#contact"
            onClick={() => select("hotel")}
            className="rz-link underline underline-offset-4"
            style={{ color: RZ.sable }}
          >
            Cette direction m&rsquo;intéresse pour mon établissement
          </Link>
        </div>

        {/* Mention obligatoire : les photographies sont sous licence CC BY-SA,
            l'attribution doit rester visible sur la page. */}
        <p
          className="mt-5 max-w-[80ch] text-[0.75rem] leading-relaxed"
          style={{ color: "rgba(216,201,163,0.45)" }}
        >
          {PHOTO_CREDIT}
        </p>
      </div>
    </footer>
  );
}

export default function HotelDemo({ display }: { display: string }) {
  useLayoutEffect(() => {
    if (window.location.hash) return;

    const previous = window.history.scrollRestoration;
    window.history.scrollRestoration = "manual";
    window.scrollTo({ top: 0, left: 0, behavior: "instant" });
    const frame = window.requestAnimationFrame(() => window.scrollTo(0, 0));

    return () => {
      window.cancelAnimationFrame(frame);
      window.history.scrollRestoration = previous;
    };
  }, []);

  return (
    <MotionConfig reducedMotion="user">
      <Nav display={display} />
      <main data-mobile-page="hotel">
        <MobileExperience />
        <Hero display={display} />
        <Intro display={display} />
        <Rooms display={display} />
        <Immersion display={display} />
        <Experiences display={display} />
        <Gallery display={display} />
        <Location display={display} />
        <Testimonials display={display} />
        <Reservation display={display} />
      </main>
      <SiteFooter display={display} />
    </MotionConfig>
  );
}
