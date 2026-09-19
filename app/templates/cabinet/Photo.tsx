"use client";

import Image from "next/image";
import { useEffect, useRef, useState, type ReactNode } from "react";
import { motion, useReducedMotion, useScroll, useTransform } from "motion/react";
import type { PhotoAsset } from "./data";
import { C, EASE } from "./theme";

/**
 * Cadre photographique du cabinet.
 *
 * Les photographies arrivent de sources différentes : sans traitement, elles
 * casseraient l'unité papier/encre de la page. Trois réglages, tous discrets :
 *
 * 1. un étalonnage froid — voile bleu nuit en soft-light + légère
 *    désaturation — pour que chaque image rejoigne la palette du cabinet ;
 * 2. un voile dégradé optionnel, seule façon d'écrire en blanc cassé sur une
 *    photographie sans jouer avec le contraste ;
 * 3. une parallaxe très courte, réservée aux grandes images, uniquement sur
 *    grand écran et uniquement si l'utilisateur n'a pas demandé moins
 *    d'animation — `useTransform` alimente un style, ce que
 *    `MotionConfig reducedMotion` ne neutralise pas tout seul.
 *
 * L'apparition reste dans le registre de la page : une ouverture nette, sans
 * rebond, un peu plus rapide que les révélations de texte.
 */

/** Dégradés de lisibilité, en bleu nuit plutôt qu'en noir pur. */
const SCRIMS = {
  /** Texte en pied d'image. */
  bottom:
    "linear-gradient(to top, rgba(20,27,38,0.88) 0%, rgba(20,27,38,0.34) 44%, rgba(20,27,38,0) 74%)",
  /** Grand panneau habité de haut en bas (hero, bande pleine largeur). */
  plate:
    "linear-gradient(to bottom, rgba(20,27,38,0.62) 0%, rgba(20,27,38,0.20) 38%, rgba(20,27,38,0.72) 100%)",
  /** Assombrissement minimal, pour poser une image claire sur fond papier. */
  soft: "linear-gradient(to bottom, rgba(20,27,38,0) 46%, rgba(20,27,38,0.20) 100%)",
} as const;

export type Scrim = keyof typeof SCRIMS;

/** Vrai à partir de 1024px. Faux au premier rendu : rien ne bouge côté serveur. */
function useDesktop() {
  const [desktop, setDesktop] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(min-width: 1024px)");
    const sync = () => setDesktop(mq.matches);
    sync();
    mq.addEventListener("change", sync);
    return () => mq.removeEventListener("change", sync);
  }, []);

  return desktop;
}

export default function Photo({
  asset,
  sizes,
  className = "",
  priority = false,
  objectPosition,
  scrim,
  /** Intensité du voile bleu nuit. 0 laisse la photo telle quelle. */
  tone = 0.2,
  /** Amplitude de la parallaxe, en % de la hauteur. 3 à 5 suffisent. */
  parallax = 0,
  /** Filet clair posé sur l'image, comme un cadre d'architecte. */
  frame = false,
  /** Délai d'apparition, aligné sur les Reveal voisins. */
  delay = 0,
  children,
}: {
  asset: PhotoAsset;
  /** Largeur réellement occupée par l'image, par palier. Jamais 100vw par défaut. */
  sizes: string;
  className?: string;
  priority?: boolean;
  objectPosition?: string;
  scrim?: Scrim;
  tone?: number;
  parallax?: number;
  frame?: boolean;
  delay?: number;
  children?: ReactNode;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const desktop = useDesktop();
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], [`-${parallax}%`, `${parallax}%`]);
  const moving = parallax > 0 && desktop && !reduce;

  return (
    <div
      ref={ref}
      className={`relative overflow-hidden ${className}`}
      style={{ backgroundColor: C.navySoft }}
    >
      <motion.div
        data-reveal
        className="absolute inset-0"
        initial={{ opacity: 0, scale: 1.05 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: false, margin: "-8% 0px -8% 0px" }}
        transition={{ duration: 0.62, delay, ease: EASE }}
      >
        <motion.div
          className="absolute inset-0"
          style={moving ? { y, scale: 1 + parallax / 28 } : undefined}
        >
          <Image
            src={asset.src}
            alt={asset.alt}
            fill
            sizes={sizes}
            priority={priority}
            loading={priority ? undefined : "lazy"}
            placeholder="blur"
            blurDataURL={asset.blur}
            className="object-cover"
            style={{
              objectPosition,
              // Étalonnage : un cran de saturation en moins, un cran de
              // contraste en plus. La photo devient un document, pas une image
              // de banque d'images.
              filter: "saturate(0.72) contrast(1.04)",
            }}
          />
        </motion.div>
      </motion.div>

      {/* Voile bleu nuit : la photo rejoint l'encre du cabinet. */}
      {tone > 0 ? (
        <span
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 mix-blend-soft-light"
          style={{ backgroundColor: `rgba(28,36,48,${tone})` }}
        />
      ) : null}

      {scrim ? (
        <span
          aria-hidden="true"
          className="pointer-events-none absolute inset-0"
          style={{ background: SCRIMS[scrim] }}
        />
      ) : null}

      {/* Même grain que les aplats dessinés, pour l'unité de texture. */}
      <span aria-hidden="true" className="bg-noise pointer-events-none absolute inset-0" />

      {frame ? (
        <span
          aria-hidden="true"
          className="pointer-events-none absolute inset-3 border sm:inset-5"
          style={{ borderColor: "rgba(244,243,239,0.16)" }}
        />
      ) : null}

      {children}
    </div>
  );
}
