"use client";

import { useRef, type PointerEvent } from "react";
import {
  motion,
  useMotionValue,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
} from "motion/react";
import { HERO_FEATURE_PHOTO, HERO_PHOTO, type Property } from "../data";
import { ParallaxPhoto, PropertyPhoto } from "../visuals";
import { CountUp, DrawnPaths, EASE, Eyebrow, Tag, focusRing, useDisplay, useIsDesktop } from "../ui";

const MARKERS = [
  { value: 28, suffix: "", label: "biens au portefeuille" },
  { value: 11, suffix: "", label: "quartiers suivis" },
  { value: 48, suffix: " h", label: "pour organiser une visite" },
];

export default function Hero({
  featured,
  onOpen,
}: {
  featured: Property;
  onOpen: (id: string) => void;
}) {
  const display = useDisplay();
  const ref = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();
  const desktop = useIsDesktop();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "12%"]);
  /* `useTransform` échappe à `MotionConfig` : la double garde est explicite. */
  const drift = desktop && !reduced ? { y } : undefined;

  /* Réaction au curseur, desktop uniquement : la photo s'incline de quelques
     degrés vers le pointeur — un mouvement d'architecte qui incline une
     planche pour mieux la regarder, jamais un tilt-3D spectaculaire. Valeurs
     ressorties (spring) pour rester fluides même si la souris saute. */
  const pointerX = useMotionValue(0);
  const pointerY = useMotionValue(0);
  const tiltX = useSpring(useTransform(pointerY, [-0.5, 0.5], [3, -3]), {
    stiffness: 120,
    damping: 20,
  });
  const tiltY = useSpring(useTransform(pointerX, [-0.5, 0.5], [-3, 3]), {
    stiffness: 120,
    damping: 20,
  });
  const tiltActive = desktop && !reduced;

  function handlePointerMove(e: PointerEvent<HTMLDivElement>) {
    if (!tiltActive) return;
    const rect = e.currentTarget.getBoundingClientRect();
    pointerX.set((e.clientX - rect.left) / rect.width - 0.5);
    pointerY.set((e.clientY - rect.top) / rect.height - 0.5);
  }

  function handlePointerLeave() {
    pointerX.set(0);
    pointerY.set(0);
  }

  return (
    <section
      id="haut"
      ref={ref}
      className="relative overflow-hidden border-b border-[#DCD7CD] bg-[#FBFAF8]"
    >
      {/* Trame verticale : rappel du calepinage de façade. Les montants
          descendent à l'ouverture, comme un tracé qu'on pose avant de bâtir. */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 hidden lg:block">
        <div className="mx-auto h-full max-w-[1400px] px-10">
          <div className="grid h-full grid-cols-6">
            {[0, 1, 2, 3, 4, 5].map((i) => (
              <motion.div
                key={i}
                className="origin-top border-l border-[#14181D]/[0.045] last:border-r"
                initial={{ scaleY: 0 }}
                animate={{ scaleY: 1 }}
                transition={{ duration: 0.7, delay: 0.05 * i, ease: EASE }}
              />
            ))}
          </div>
        </div>
      </div>

      <div className="relative mx-auto max-w-[1400px] px-5 pt-12 pb-16 sm:px-8 sm:pt-16 lg:grid lg:grid-cols-12 lg:items-start lg:gap-12 lg:px-10 lg:pt-24 lg:pb-28">
        <div className="lg:col-span-5 lg:pt-6">
          <motion.div
            data-reveal
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: [0.22, 0.61, 0.36, 1] }}
          >
            <Eyebrow>Agence immobilière — Casablanca · Rabat · Marrakech</Eyebrow>
          </motion.div>

          <h1
            className={`${display} mt-6 text-[2.5rem] leading-[1.03] font-semibold tracking-[-0.025em] text-[#14181D] sm:text-[3.4rem] lg:text-[4.1rem]`}
          >
            {["Des biens choisis pour leur lumière,", "leur plan, leur quartier."].map(
              (line, i) => (
                <span key={line} className="block overflow-hidden">
                  <motion.span
                    data-reveal
                    className="block"
                    initial={{ opacity: 0, y: "100%" }}
                    animate={{ opacity: 1, y: "0%" }}
                    transition={{
                      duration: 0.75,
                      delay: 0.1 + i * 0.1,
                      ease: [0.22, 0.61, 0.36, 1],
                    }}
                  >
                    {line}
                  </motion.span>
                </span>
              ),
            )}
          </h1>

          <motion.p
            data-reveal
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.16, ease: [0.22, 0.61, 0.36, 1] }}
            className="mt-7 max-w-xl text-[1.0625rem] leading-relaxed text-[#3A444F] sm:text-lg"
          >
            Atrium accompagne l&rsquo;achat, la location et la gestion de biens
            d&rsquo;architecture. Chaque bien publié ici a été visité, mesuré et documenté
            par l&rsquo;agence avant d&rsquo;être mis en ligne.
          </motion.p>

          <motion.div
            data-reveal
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.24, ease: [0.22, 0.61, 0.36, 1] }}
            className="mt-9 flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center"
          >
            <a
              href="#biens"
              className={`group inline-flex h-[52px] items-center justify-center gap-3 rounded-full whitespace-nowrap bg-[#2B3A4A] px-7 text-base font-medium text-white transition-[background-color,transform] duration-200 hover:bg-[#14181D] active:scale-[0.985] ${focusRing}`}
            >
              Voir les biens disponibles
              <span
                aria-hidden="true"
                className="text-lg leading-none transition-transform duration-200 group-hover:translate-y-0.5"
              >
                ↓
              </span>
            </a>
            <a
              href="#contact"
              className={`inline-flex h-[52px] items-center justify-center rounded-full whitespace-nowrap border border-[#2B3A4A]/35 px-7 text-base font-medium text-[#14181D] transition-[background-color,border-color,transform] duration-200 hover:border-[#2B3A4A] hover:bg-[#EDEAE4] active:scale-[0.985] ${focusRing}`}
            >
              Demander une estimation
            </a>
          </motion.div>

          {/* Repères chiffrés : décalés un à un, puis comptés à l'arrivée. */}
          <dl className="mt-12 grid grid-cols-3 border-t border-[#DCD7CD] pt-6 lg:mt-16">
            {MARKERS.map((m, i) => (
              <motion.div
                key={m.label}
                data-reveal
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.34 + i * 0.09, ease: EASE }}
                className={`pr-3 ${i > 0 ? "border-l border-[#DCD7CD] pl-4 sm:pl-6" : ""}`}
              >
                <dt className="sr-only">{m.label}</dt>
                <dd>
                  <span
                    className={`${display} block text-2xl font-semibold tabular-nums text-[#14181D] sm:text-3xl`}
                  >
                    <CountUp value={m.value} suffix={m.suffix} duration={0.75} />
                  </span>
                  <span className="mt-1.5 block text-[0.78rem] leading-snug text-[#55606C]">
                    {m.label}
                  </span>
                </dd>
              </motion.div>
            ))}
          </dl>
        </div>

        {/* Visuel principal : deux langages côte à côte — l'élévation dessinée
            porte la lecture, la photographie apporte la matière. En desktop la
            colonne photo démarre plus bas et descend plus bas que la planche :
            la composition reste asymétrique, jamais deux blocs alignés. */}
        <div className="mt-14 lg:col-span-7 lg:mt-0 lg:grid lg:grid-cols-12 lg:items-start lg:gap-5">
          <div className="lg:col-span-7">
            {/* Le volume se dévoile de haut en bas, puis le dessin s'y trace. */}
            <motion.div
              data-reveal
              style={drift}
              className="relative"
              initial={{ opacity: 0, clipPath: "inset(0 0 100% 0)" }}
              animate={{ opacity: 1, clipPath: "inset(0 0 0% 0)" }}
              transition={{ duration: 0.85, delay: 0.1, ease: EASE }}
            >
              <PropertyPhoto
                photo={HERO_FEATURE_PHOTO}
                sizes="(min-width: 1024px) 520px, 92vw"
                priority
                marks={false}
                className="h-[300px] rounded-t-[80px] sm:h-[420px] sm:rounded-t-[130px] lg:h-[460px] lg:rounded-t-[140px]"
                imageClassName="object-[58%_50%]"
              />
            </motion.div>

            <motion.article
              data-reveal
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.42, ease: EASE }}
              /* En desktop la fiche est bornée par sa colonne (8/12) : elle
                 chevauche l'élévation sans jamais mordre sur la photographie. */
              className="relative z-10 -mt-12 ml-0 max-w-[26rem] border border-[#DCD7CD] bg-white p-6 shadow-[0_24px_60px_-40px_rgba(20,24,29,0.5)] sm:-mt-16 sm:p-7 lg:-mt-24 lg:ml-6 lg:max-w-none"
            >
            <div className="flex items-center justify-between gap-3">
              {featured.tag ? <Tag>{featured.tag}</Tag> : <span />}
              <span className="text-[0.75rem] font-medium tracking-[0.18em] text-[#55606C] tabular-nums">
                {featured.reference}
              </span>
            </div>

            <h2 className={`${display} mt-5 text-2xl font-semibold text-[#14181D] sm:text-[1.7rem]`}>
              {featured.name}
            </h2>
            <p className="mt-1.5 text-[0.95rem] text-[#55606C]">
              {featured.city} — {featured.district} · {featured.type}
            </p>

            <p className="mt-5 flex items-baseline gap-2">
              <span
                className={`${display} text-[2.1rem] leading-none font-bold tracking-[-0.02em] text-[#14181D] tabular-nums sm:text-[2.4rem]`}
              >
                {featured.price}
              </span>
              <span className="text-sm font-medium text-[#55606C]">{featured.priceUnit}</span>
            </p>

            <dl className="mt-6 grid grid-cols-3 border-t border-[#DCD7CD] pt-4 text-sm">
              <div>
                <dt className="text-[0.75rem] tracking-[0.12em] uppercase text-[#55606C]">
                  Surface
                </dt>
                <dd className="mt-1 font-medium text-[#14181D] tabular-nums">
                  {featured.surface} m²
                </dd>
              </div>
              <div className="border-l border-[#DCD7CD] pl-4">
                <dt className="text-[0.75rem] tracking-[0.12em] uppercase text-[#55606C]">
                  Pièces
                </dt>
                <dd className="mt-1 font-medium text-[#14181D] tabular-nums">{featured.rooms}</dd>
              </div>
              <div className="border-l border-[#DCD7CD] pl-4">
                <dt className="text-[0.75rem] tracking-[0.12em] uppercase text-[#55606C]">
                  Chambres
                </dt>
                <dd className="mt-1 font-medium text-[#14181D] tabular-nums">
                  {featured.bedrooms}
                </dd>
              </div>
            </dl>

            <button
              type="button"
              onClick={() => onOpen(featured.id)}
              className={`group mt-6 inline-flex h-12 w-full items-center justify-center gap-3 rounded-full border border-[#2B3A4A] text-[0.95rem] font-medium text-[#14181D] transition-[background-color,color,transform] duration-200 hover:bg-[#2B3A4A] hover:text-white active:scale-[0.985] ${focusRing}`}
            >
              Voir le bien en détail
              <span
                aria-hidden="true"
                className="text-lg leading-none transition-transform duration-200 group-hover:translate-x-1"
              >
                →
              </span>
            </button>
            </motion.article>
          </div>

          {/* Photographie : bandeau large sous la fiche en mobile, colonne
              haute et décalée en desktop. Une seule image, un seul
              téléchargement — le cadre change, pas la source. */}
          <motion.figure
            data-reveal
            initial={{ opacity: 0, clipPath: "inset(0 0 100% 0)" }}
            animate={{ opacity: 1, clipPath: "inset(0 0 0% 0)" }}
            transition={{ duration: 0.8, delay: 0.3, ease: EASE }}
            className="mt-10 lg:col-span-5 lg:mt-0 lg:pt-12"
          >
            <motion.div
              onPointerMove={handlePointerMove}
              onPointerLeave={handlePointerLeave}
              style={
                tiltActive
                  ? { rotateX: tiltX, rotateY: tiltY, transformPerspective: 900 }
                  : undefined
              }
            >
              <ParallaxPhoto
                photo={HERO_PHOTO}
                priority
                range={6}
                sizes="(min-width: 1024px) 320px, 92vw"
                imageClassName="saturate-[0.55] contrast-[1.04]"
                className="h-[200px] sm:h-[260px] lg:h-[620px]"
              >
                {/* Relevé superposé à la photo : la ligne se trace après le
                    dévoilement de l'image — dessin ET photographie sur le
                    même plan, jamais l'un à la place de l'autre. */}
                <DrawnPaths
                  viewBox="0 0 400 600"
                  className="absolute inset-0 h-full w-full"
                  stroke="#FBFAF8"
                  strokeWidth={1.1}
                  duration={0.9}
                  delay={0.5}
                  stagger={0.12}
                  paths={["M34 40 H78 M34 40 V78", "M34 40 L214 268", "M202 256 L226 280"]}
                />
                <span className="pointer-events-none absolute top-11 left-[4.7rem] text-[0.65rem] font-medium tracking-[0.16em] text-white/80">
                  R+1 · 2,80 m
                </span>
              </ParallaxPhoto>
            </motion.div>
            <figcaption className="mt-3 flex items-baseline justify-between gap-3 border-t border-[#DCD7CD] pt-3 text-[0.72rem] tracking-[0.12em] uppercase text-[#55606C]">
              <span>{HERO_PHOTO.caption}</span>
              <span aria-hidden="true" className="text-[#8A6A3B] tabular-nums">
                R.01
              </span>
            </figcaption>
          </motion.figure>
        </div>
      </div>
    </section>
  );
}
