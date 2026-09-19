"use client";

import Image from "next/image";
import { useRef } from "react";
import { motion, useScroll, useTransform } from "motion/react";
import type { CSSProperties } from "react";
import type { PhotoAsset } from "./data";

/**
 * Deux langages visuels cohabitent volontairement sur cette démo.
 *
 * 1. `Photo` — les photographies réelles (Wikimedia Commons, hébergées
 *    localement), avec parallaxe optionnelle et un voile chaud très léger qui
 *    les raccorde à la palette argile/sable/sauge de la page.
 * 2. `SoftPanel` — des panneaux entièrement construits en CSS/SVG : un fond
 *    minéral, deux ou trois masses floues, un motif linéaire discret et un
 *    grain. Ils servent de contrepoint abstrait dans la mosaïque et pour les
 *    portraits de l'équipe, où aucune photographie réelle ne serait honnête.
 *
 * Les panneaux abstraits sont purement décoratifs : ils portent aria-hidden.
 */

/**
 * `Photo` et `SoftPanel` ont besoin d'être un bloc conteneur pour leurs enfants
 * absolus. Ils posent donc `relative` — sauf si l'appelant fournit lui-même une
 * position, car deux utilitaires Tailwind de position ont la même spécificité :
 * c'est l'ordre dans la feuille de style qui tranche, pas l'ordre des classes,
 * et `relative` l'emporterait silencieusement sur un `absolute` passé en props.
 */
const POSITIONNE = /(?:^|\s)(?:absolute|fixed|sticky)(?:\s|$)/;

function position(className: string) {
  return POSITIONNE.test(className) ? "" : "relative";
}

/* ------------------------------------------------------------------ Photo */

export type PhotoProps = {
  asset: PhotoAsset;
  /** Classes du CADRE : ratio, arrondis, position. Le cadre découpe l'image. */
  className?: string;
  sizes: string;
  /** Seule la photo d'ouverture doit être prioritaire. */
  priority?: boolean;
  /** Charge sans attente les photos d'une composition qui doit rester complète lors d'un scroll rapide. */
  eager?: boolean;
  /**
   * Amplitude de parallaxe, en % de la hauteur du cadre (0 = désactivée).
   * `useTransform` n'est pas couvert par MotionConfig : on neutralise donc
   * explicitement le mouvement quand l'utilisateur réduit les animations.
   */
  parallax?: number;
  /** Cadrage : utile quand le sujet n'est pas au centre du fichier source. */
  objectPosition?: string;
  /** Voile chaud posé sur la photo, pour l'accorder au fond de la page. */
  veil?: boolean;
  /**
   * Filtre CSS optionnel. Utilisé avec parcimonie, uniquement pour désaturer
   * une source trop colorée et la ramener dans la palette minérale de la démo.
   */
  filter?: string;
};

export function Photo({
  asset,
  className = "",
  sizes,
  priority = false,
  eager = false,
  parallax = 0,
  objectPosition = "center",
  veil = true,
  filter,
}: PhotoProps) {
  const frame = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: frame,
    offset: ["start end", "end start"],
  });
  const shift = useTransform(
    scrollYProgress,
    [0, 1],
    [`-${parallax}%`, `${parallax}%`],
  );
  const moving = parallax > 0;

  return (
    <div
      ref={frame}
      className={`soline-grain ${position(className)} isolate overflow-hidden bg-[#E7DDD1] ${className}`}
    >
      <motion.div
        className="soline-parallax absolute left-0 w-full"
        style={
          moving
            ? { top: `-${parallax * 1.6}%`, height: `${100 + parallax * 3.2}%`, y: shift }
            : { top: 0, height: "100%" }
        }
      >
        <Image
          src={asset.src}
          alt={asset.alt}
          fill
          sizes={sizes}
          preload={priority || eager}
          loading={priority || eager ? undefined : "lazy"}
          fetchPriority={eager ? "high" : undefined}
          unoptimized={eager}
          placeholder="blur"
          blurDataURL={asset.blur}
          className="object-cover"
          style={{ objectPosition, filter }}
        />
      </motion.div>

      {veil ? (
        <span
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 block"
          style={{
            background:
              "linear-gradient(190deg, rgba(247,243,238,0.16), rgba(169,136,115,0.10) 55%, rgba(46,38,34,0.14))",
          }}
        />
      ) : null}
    </div>
  );
}

/* ---------------------------------------------------------- Panneaux CSS */

export type PanelTone = "aube" | "argile" | "sauge" | "pierre" | "vapeur";
export type PanelMotif = "arcs" | "ondes" | "grain" | "none";

type ToneRecipe = {
  base: string;
  /** Masses floues : [couleur, taille %, left %, top %, opacité] */
  blobs: Array<[string, number, number, number, number]>;
  motifColor: string;
};

const TONES: Record<PanelTone, ToneRecipe> = {
  aube: {
    base: "#F0E5D9",
    blobs: [
      ["#FDF7F0", 95, 8, -22, 0.95],
      ["#D9BDA4", 80, 62, 58, 0.85],
      ["#B9A98F", 55, 12, 74, 0.4],
    ],
    motifColor: "rgba(46,38,34,0.10)",
  },
  argile: {
    base: "#E2CDB9",
    blobs: [
      ["#F6EADD", 85, -10, -14, 0.9],
      ["#C09B7D", 90, 54, 46, 0.9],
      ["#8C6A55", 45, 78, 84, 0.35],
    ],
    motifColor: "rgba(46,38,34,0.12)",
  },
  sauge: {
    base: "#E3E4DA",
    blobs: [
      ["#F7F4ED", 90, 58, -18, 0.9],
      ["#B4BEA6", 85, -8, 52, 0.85],
      ["#8C9A82", 42, 68, 76, 0.4],
    ],
    motifColor: "rgba(38,44,36,0.12)",
  },
  pierre: {
    base: "#DCD3C9",
    blobs: [
      ["#F3ECE3", 88, 50, -20, 0.9],
      ["#B9AA9A", 82, -12, 46, 0.8],
      ["#8E8175", 40, 72, 80, 0.35],
    ],
    motifColor: "rgba(46,38,34,0.12)",
  },
  vapeur: {
    base: "#F5F0E9",
    blobs: [
      ["#FFFFFF", 92, 20, -28, 0.95],
      ["#E5D4C3", 78, 66, 54, 0.8],
      ["#CBBBA8", 46, 6, 78, 0.45],
    ],
    motifColor: "rgba(46,38,34,0.08)",
  },
};

/** Rayons irréguliers : évite la tache parfaitement circulaire. */
const BLOB_RADII = [
  "62% 38% 54% 46% / 48% 56% 44% 52%",
  "44% 56% 38% 62% / 58% 42% 58% 42%",
  "55% 45% 62% 38% / 42% 58% 42% 58%",
];

function Motif({ motif, color }: { motif: PanelMotif; color: string }) {
  if (motif === "arcs") {
    return (
      <svg
        className="absolute inset-0 h-full w-full"
        viewBox="0 0 400 400"
        preserveAspectRatio="xMidYMid slice"
        fill="none"
      >
        <g stroke={color} strokeWidth="0.75">
          <circle cx="320" cy="330" r="96" />
          <circle cx="320" cy="330" r="150" />
          <circle cx="320" cy="330" r="212" />
          <circle cx="320" cy="330" r="286" />
        </g>
      </svg>
    );
  }

  if (motif === "ondes") {
    return (
      <svg
        className="absolute inset-0 h-full w-full"
        viewBox="0 0 400 400"
        preserveAspectRatio="none"
        fill="none"
      >
        <g stroke={color} strokeWidth="0.75">
          <path d="M-20 150 C 80 104, 180 196, 300 140 S 420 96, 460 128" />
          <path d="M-20 196 C 80 150, 180 242, 300 186 S 420 142, 460 174" />
          <path d="M-20 242 C 80 196, 180 288, 300 232 S 420 188, 460 220" />
        </g>
      </svg>
    );
  }

  return null;
}

export type SoftPanelProps = {
  tone?: PanelTone;
  motif?: PanelMotif;
  className?: string;
  style?: CSSProperties;
  /** Ligne d'horizon fine, comme une jointure de matériau. */
  horizon?: boolean;
};

/**
 * Panneau décoratif réutilisable. Toujours rendu en aria-hidden : il ne porte
 * aucune information, les légendes éventuelles vivent dans le texte à côté.
 */
export function SoftPanel({
  tone = "aube",
  motif = "none",
  className = "",
  style,
  horizon = false,
}: SoftPanelProps) {
  const recipe = TONES[tone];

  return (
    <div
      aria-hidden="true"
      className={`soline-grain ${position(className)} isolate overflow-hidden ${className}`}
      style={{ backgroundColor: recipe.base, ...style }}
    >
      {recipe.blobs.map(([color, size, left, top, opacity], i) => (
        <span
          key={color + String(i)}
          className="pointer-events-none absolute block"
          style={{
            width: `${size}%`,
            aspectRatio: "1 / 1",
            left: `${left}%`,
            top: `${top}%`,
            background: `radial-gradient(circle at 34% 30%, ${color} 0%, ${color} 42%, transparent 72%)`,
            borderRadius: BLOB_RADII[i % BLOB_RADII.length],
            opacity,
            filter: "blur(18px)",
          }}
        />
      ))}

      <Motif motif={motif} color={recipe.motifColor} />

      {horizon ? (
        <span
          className="pointer-events-none absolute inset-x-[8%] top-[58%] block h-px"
          style={{
            background:
              "linear-gradient(90deg, transparent, rgba(46,38,34,0.22) 22%, rgba(46,38,34,0.22) 78%, transparent)",
          }}
        />
      ) : null}

      {/* Vignetage très léger : donne un peu de matière aux bords. */}
      <span
        className="pointer-events-none absolute inset-0 block"
        style={{
          background:
            "radial-gradient(120% 90% at 50% 40%, transparent 52%, rgba(62,50,42,0.16) 100%)",
        }}
      />
    </div>
  );
}

/**
 * Portrait décoratif utilisé pour l'équipe : même matière que les panneaux,
 * avec les initiales gravées en creux. Les vrais noms sont dans le texte.
 */
export function PortraitPanel({
  initiales,
  tone = "pierre",
  displayClass,
  className = "",
}: {
  initiales: string;
  tone?: PanelTone;
  displayClass: string;
  className?: string;
}) {
  return (
    <div aria-hidden="true" className={`relative ${className}`}>
      {/* `h-full` plutôt que `absolute inset-0` : SoftPanel impose déjà
          `relative`, une classe de position passée ici serait sans effet. */}
      <SoftPanel tone={tone} motif="arcs" className="h-full w-full rounded-[2rem]" />
      <div className="absolute inset-0 flex items-end justify-start p-5 sm:p-6">
        <span
          className={`${displayClass} text-4xl tracking-[0.18em] text-[#2E2622]/45 sm:text-5xl`}
        >
          {initiales}
        </span>
      </div>
    </div>
  );
}

/**
 * Trait vertical fin terminé par un point : séparateur récurrent de la page,
 * préféré à une bordure pleine largeur qui durcirait la mise en page.
 */
export function SoftRule({ className = "" }: { className?: string }) {
  return (
    <span
      aria-hidden="true"
      className={`block h-14 w-px bg-gradient-to-b from-transparent via-[#A98873] to-transparent ${className}`}
    />
  );
}
