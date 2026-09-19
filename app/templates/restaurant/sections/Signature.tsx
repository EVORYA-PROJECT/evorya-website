"use client";

import { useRef, useState } from "react";
import {
  motion,
  useMotionValueEvent,
  useScroll,
  useTransform,
} from "motion/react";
import { SIGNATURE_LABELS, type SignatureLabel } from "../data";
import { PHOTOS } from "../photos";
import Photo from "../Photo";
import { SectionLabel } from "../Brand";
import { LinesUp, Reveal, Stagger, StaggerItem, useReducedMotion } from "../Reveal";

/**
 * Le produit signature, raconté au scroll.
 *
 * Desktop : une section haute (320 vh) dont l'intérieur est `sticky`. La
 * progression du scroll pilote l'échelle et le cadrage de la photo, la
 * sortie du titre, puis l'apparition des quatre étiquettes d'ingrédients.
 *
 * Les mouvements CONTINUS (échelle de la photo, du titre, du mot de fond)
 * passent par des MotionValue dérivées de `useScroll` : aucun rendu React
 * n'est déclenché au fil du scroll.
 *
 * L'apparition des étiquettes, elle, est DISCRÈTE : un seul
 * `useMotionValueEvent` convertit la progression en un numéro d'étape et ne
 * pose un state que lorsque ce numéro change — cinq fois sur toute la
 * section. Une opacité interpolée en continu s'est révélée peu fiable ici
 * (valeurs qui n'atteignaient jamais 1, étiquettes restées fantômes) ; un
 * booléen par étiquette, joué par l'animation normale de Motion, est à la
 * fois plus sûr, plus lisible et moins coûteux.
 *
 * Mobile : le même contenu en lecture verticale classique (photo + liste),
 * sans `sticky` ni section de 280 vh, qui donnent une navigation pénible au
 * doigt et allongent la page pour rien.
 */

/**
 * Une étiquette et son filet.
 *
 * Ancrage — c'est TOUT le sujet de ce composant : `label.top` / `label.left`
 * désignent la pointe du filet, donc l'ingrédient lui-même.
 *
 *  • `side: "right"` — ordre normal [filet][texte] : la pointe est le bord
 *    GAUCHE de l'élément, on le positionne donc avec `left`.
 *  • `side: "left"` — `flex-row-reverse`, ordre visuel [texte][filet] : la
 *    pointe est le bord DROIT de l'élément, on le positionne donc avec
 *    `right`. Les positionner tous les deux avec `left` (l'ancien code)
 *    décalait les étiquettes de gauche de toute la largeur de leur boîte de
 *    texte — d'où « Sauce Krush » qui pointait le pain et « 2 × 80 g » qui
 *    ratait les steaks.
 *  • `translate: 0 -50%` — le filet est centré verticalement dans la boîte
 *    (`items-center`) : sans ce recentrage, `top` désignait le haut de la
 *    boîte et la pointe tombait une demi-hauteur plus bas que l'ingrédient.
 *    Propriété CSS `translate`, distincte de `transform` : elle se compose
 *    avec le `x` animé par Motion au lieu de l'écraser.
 */
function Label({
  label,
  shown,
  d,
}: {
  label: SignatureLabel;
  shown: boolean;
  d: string;
}) {
  const anchor =
    label.side === "left"
      ? { right: `${100 - label.left}%` }
      : { left: `${label.left}%` };

  return (
    <motion.div
      initial={false}
      animate={{
        opacity: shown ? 1 : 0,
        x: shown ? 0 : label.side === "left" ? -26 : 26,
      }}
      transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
      style={{ top: `${label.top}%`, ...anchor, translate: "0 -50%" }}
      className={`absolute z-20 flex items-center gap-3 ${
        label.side === "left" ? "flex-row-reverse" : ""
      }`}
    >
      <motion.span
        aria-hidden="true"
        initial={false}
        animate={{ scaleX: shown ? 1 : 0 }}
        transition={{ duration: 0.5, delay: shown ? 0.1 : 0, ease: [0.16, 1, 0.3, 1] }}
        className={`h-px w-16 bg-[#FF3B1F] ${
          label.side === "left" ? "origin-right" : "origin-left"
        }`}
      />
      <span
        className={`block whitespace-nowrap bg-[#0B0B0C]/92 px-3 py-2 shadow-[0_8px_24px_-10px_rgba(0,0,0,0.9)] backdrop-blur-sm ${
          label.side === "left" ? "border-r-2 border-[#FF3B1F] text-right" : "border-l-2 border-[#FF3B1F]"
        }`}
      >
        <span className={`${d} block text-[19px] uppercase leading-none text-[#F4EFE6]`}>
          {label.title}
        </span>
        <span className="mt-1 block text-[11px] uppercase tracking-[0.14em] text-[#FF3B1F]">
          {label.note}
        </span>
      </span>
    </motion.div>
  );
}

export default function Signature({ d }: { d: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end end"] });

  /*
   * Tout est piloté par des TRANSFORMS (scale, translate) et non par des
   * opacités superposées : un titre qui se fond par-dessus la photo pendant
   * que les étiquettes arrivent ne donne jamais qu'une bouillie illisible —
   * essayé, rejeté. Ici le titre monte et se resserre, la photo grandit sous
   * lui, puis les étiquettes se posent sur une image déjà stabilisée.
   */
  const photoScale = useTransform(scrollYProgress, [0, 0.28], [0.72, 1]);
  const titleY = useTransform(scrollYProgress, [0, 0.28], [70, 0]);
  const titleScale = useTransform(scrollYProgress, [0, 0.28], [1.22, 1]);
  const backdropScale = useTransform(scrollYProgress, [0, 1], [1.18, 1]);
  const backdropX = useTransform(scrollYProgress, [0, 1], ["4%", "-4%"]);

  /* Étape courante : -1 = rien, 0…3 = étiquettes révélées, 4 = le prix.
     Le state n'est écrit que quand le numéro change. */
  const [step, setStep] = useState(-1);
  useMotionValueEvent(scrollYProgress, "change", (v) => {
    const next =
      v < 0.34 ? -1 : v < 0.45 ? 0 : v < 0.56 ? 1 : v < 0.67 ? 2 : v < 0.78 ? 3 : 4;
    setStep((prev) => (prev === next ? prev : next));
  });

  return (
    <section id="signature" className="relative">
      {/* ---------------- Desktop : scroll piloté ---------------- */}
      <div ref={ref} className="relative hidden h-[280vh] lg:block">
        <div className="sticky top-0 flex h-[100dvh] flex-col items-center justify-center overflow-hidden px-12">
          {/* Mot de fond, très grand, qui glisse et se resserre lentement. */}
          <motion.span
            aria-hidden="true"
            style={{ scale: reduce ? 1 : backdropScale, x: reduce ? 0 : backdropX }}
            className={`${d} krush-outline pointer-events-none absolute inset-x-0 top-1/2 -translate-y-1/2 whitespace-nowrap text-center text-[19vw] uppercase leading-none`}
          >
            Krush Double
          </motion.span>

          <div className="relative mx-auto w-full max-w-[1500px]">
            <motion.div
              style={{ y: reduce ? 0 : titleY, scale: reduce ? 1 : titleScale }}
              className="pointer-events-none relative z-30 text-center"
            >
              <SectionLabel index="02" className="justify-center">
                Le produit signature
              </SectionLabel>
              <p
                className={`${d} mt-3 text-[5.4vw] uppercase leading-[0.86] tracking-[-0.02em] text-[#F4EFE6]`}
              >
                Deux steaks. <span className="text-[#FF3B1F]">Zéro patience.</span>
              </p>
            </motion.div>

            {/* Enveloppe non transformée : les étiquettes s'y ancrent, sinon
                elles seraient mises à l'échelle avec la photo. */}
            <div className="relative mx-auto mt-8 w-[64%]">
              <motion.div
                style={{ scale: reduce ? 1 : photoScale }}
                className="relative aspect-[16/9] w-full overflow-hidden"
              >
                <Photo
                  asset={PHOTOS.signatureDouble}
                  sizes="64vw"
                  grade={0.12}
                  scrim="soft"
                  className="h-full w-full"
                />
              </motion.div>

              <div className="pointer-events-none absolute inset-0">
                {SIGNATURE_LABELS.map((label, i) => (
                  <Label key={label.title} label={label} shown={reduce || step >= i} d={d} />
                ))}
              </div>
            </div>

            <motion.p
              initial={false}
              animate={{
                opacity: reduce || step >= 4 ? 1 : 0,
                y: reduce || step >= 4 ? 0 : 22,
              }}
              transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
              className="relative z-30 mt-8 text-center"
            >
              <span className={`${d} text-[26px] uppercase text-[#F4EFE6]`}>
                Krush Double
              </span>
              <span className="mx-3 text-[#FF3B1F]">—</span>
              <span className="text-[18px] font-semibold tabular-nums text-[#FF3B1F]">
                78 MAD
              </span>
            </motion.p>
          </div>
        </div>
      </div>

      {/* ---------------- Mobile / tablette ---------------- */}
      <div className="px-5 py-20 sm:px-8 lg:hidden">
        <Reveal>
          <SectionLabel index="02">Le produit signature</SectionLabel>
        </Reveal>
        <h2
          className={`${d} mt-5 text-[14vw] uppercase leading-[0.86] tracking-[-0.02em] text-[#F4EFE6] sm:text-[11vw]`}
        >
          <LinesUp
            lines={["Deux steaks.", <span key="z" className="text-[#FF3B1F]">Zéro patience.</span>]}
          />
        </h2>

        <Reveal delay={0.1} className="relative mt-7 -mx-5 sm:mx-0">
          <Photo
            asset={PHOTOS.signatureDouble}
            sizes="100vw"
            grade={0.12}
            scrim="soft"
            className="aspect-[4/3] w-full"
          />
        </Reveal>

        <Stagger as="ul" className="mt-7 border-t border-[#F4EFE6]/12">
          {SIGNATURE_LABELS.map((label) => (
            <StaggerItem
              as="li"
              key={label.title}
              className="flex items-baseline gap-4 border-b border-[#F4EFE6]/12 py-4"
            >
              <span aria-hidden="true" className="mt-2 h-[6px] w-[6px] shrink-0 bg-[#FF3B1F]" />
              <span className="block">
                <span className={`${d} block text-[21px] uppercase leading-none text-[#F4EFE6]`}>
                  {label.title}
                </span>
                <span className="mt-1 block text-[13px] text-[#F4EFE6]/55">{label.note}</span>
              </span>
            </StaggerItem>
          ))}
        </Stagger>

        <Reveal delay={0.1} className="mt-6 flex items-baseline justify-between">
          <span className={`${d} text-[24px] uppercase text-[#F4EFE6]`}>Krush Double</span>
          <span className="text-[17px] font-semibold tabular-nums text-[#FF3B1F]">78 MAD</span>
        </Reveal>
      </div>
    </section>
  );
}
