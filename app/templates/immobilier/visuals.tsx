"use client";

import Image from "next/image";
import { useRef, type CSSProperties, type ReactNode } from "react";
import {
  motion,
  useInView,
  useReducedMotion,
  useScroll,
  useTransform,
} from "motion/react";
import type { Photo, Tone, VisualVariant } from "./data";
import { EASE, useIsDesktop } from "./ui";
import { useScrollDirection } from "../useScrollDirection";

/**
 * Langage visuel hybride d'Atrium : DESSIN + PHOTO + DONNÉE TECHNIQUE.
 *
 * - Les blocs dessinés (SVG au trait) portent la lecture architecturale :
 *   façade, coupe, plan de niveau. Ils sont décoratifs (aria-hidden) et ne
 *   prétendent jamais être une photographie du bien.
 * - Les photographies (libres de droits, hébergées localement) apportent la
 *   matière et la lumière. Elles sont toujours légendées « ambiance » : ce
 *   sont des images d'illustration, pas des clichés des biens fictifs.
 */

type ToneSpec = { bg: string; line: string };

const TONES: Record<Tone, ToneSpec> = {
  sky: { bg: "linear-gradient(162deg,#DFE9F0 0%,#F5F2ED 52%,#E7DED1 100%)", line: "#2B3A4A" },
  stone: { bg: "linear-gradient(162deg,#F3F0EA 0%,#E3E6E7 58%,#C9D4DC 100%)", line: "#33414E" },
  clay: { bg: "linear-gradient(162deg,#F4E9DC 0%,#EADFD1 48%,#D6C0A8 100%)", line: "#5A4433" },
  slate: { bg: "linear-gradient(162deg,#CBD8E1 0%,#A9BAC8 55%,#7C8E9F 100%)", line: "#1B242E" },
};

function range(count: number, start: number, step: number): number[] {
  return Array.from({ length: count }, (_, i) => start + i * step);
}

/* ------------------------------------------------------------------ */
/* Villa : deux volumes horizontaux décalés, débord de dalle, bassin    */
/* ------------------------------------------------------------------ */
function Facade(): ReactNode {
  return (
    <g fill="none" stroke="currentColor" strokeLinecap="square">
      <circle cx="322" cy="66" r="27" opacity="0.16" strokeWidth="1" />
      <circle cx="322" cy="66" r="44" opacity="0.08" strokeWidth="1" />
      <path d="M0 236 H400" opacity="0.22" strokeWidth="1" />

      {/* volume bas */}
      <path d="M52 236 V150 H348 V236" opacity="0.5" strokeWidth="1.3" />
      <path d="M34 150 H366" opacity="0.8" strokeWidth="2.6" />
      {range(11, 70, 26).map((x) => (
        <path key={`m${x}`} d={`M${x} 156 V232`} opacity="0.3" strokeWidth="1" />
      ))}
      <path d="M52 196 H348" opacity="0.2" strokeWidth="1" />

      {/* volume haut décalé */}
      <path d="M134 150 V84 H330 V150" opacity="0.45" strokeWidth="1.2" />
      <path d="M118 84 H346" opacity="0.8" strokeWidth="2.6" />
      {range(4, 152, 46).map((x) => (
        <rect key={`w${x}`} x={x} y={100} width={30} height={36} opacity="0.26" strokeWidth="1" />
      ))}

      {/* bassin + terrasse */}
      <path d="M22 256 H240 V288 H22 Z" opacity="0.26" strokeWidth="1" />
      <path d="M38 268 H152 M38 276 H198 M38 284 H126" opacity="0.18" strokeWidth="1" />

      {/* arbre */}
      <path d="M372 236 V190 M358 208 L372 192 L386 208 M362 224 L372 212 L382 224" opacity="0.28" strokeWidth="1" />
    </g>
  );
}

/* ------------------------------------------------------------------ */
/* Immeuble : balcons filants, profondeur par décalage                  */
/* ------------------------------------------------------------------ */
function Tower(): ReactNode {
  return (
    <g fill="none" stroke="currentColor" strokeLinecap="square">
      <path d="M0 272 H400" opacity="0.22" strokeWidth="1" />
      <path d="M112 272 V34 H292 V272" opacity="0.5" strokeWidth="1.4" />
      <path d="M96 34 H308" opacity="0.8" strokeWidth="2.4" />
      <path d="M200 34 V16 M186 16 H214" opacity="0.3" strokeWidth="1" />

      {range(10, 56, 22).map((y) => (
        <g key={`f${y}`} opacity="0.32">
          <path d={`M112 ${y} H292`} strokeWidth="1" />
          <path d={`M292 ${y} H318 M318 ${y} V${y + 12} M292 ${y + 12} H318`} strokeWidth="1" />
        </g>
      ))}
      {range(5, 138, 32).map((x) => (
        <path key={`v${x}`} d={`M${x} 40 V272`} opacity="0.18" strokeWidth="1" />
      ))}

      {/* bloc bas à droite */}
      <path d="M318 272 V166 H378 V272" opacity="0.32" strokeWidth="1.1" />
      {range(5, 184, 22).map((y) => (
        <path key={`r${y}`} d={`M318 ${y} H378`} opacity="0.18" strokeWidth="1" />
      ))}

      {/* bloc bas à gauche */}
      <path d="M24 272 V104 H112" opacity="0.28" strokeWidth="1.1" />
      {range(7, 124, 24).map((y) => (
        <path key={`l${y}`} d={`M24 ${y} H112`} opacity="0.14" strokeWidth="1" />
      ))}
    </g>
  );
}

/* ------------------------------------------------------------------ */
/* Riad : patio à quatre arcades, bassin, trame de zellige              */
/* ------------------------------------------------------------------ */
function Riad(): ReactNode {
  const arches = [46, 128, 210, 292];
  return (
    <g fill="none" stroke="currentColor" strokeLinecap="square">
      <path d="M22 148 H378 M22 158 H378" opacity="0.45" strokeWidth="1.4" />
      <path d="M14 138 H386" opacity="0.7" strokeWidth="2.4" />

      {/* étage haut : fenêtres étroites */}
      {range(7, 46, 44).map((x) => (
        <rect key={`u${x}`} x={x} y={72} width={22} height={48} opacity="0.26" strokeWidth="1" />
      ))}
      <path d="M22 60 H378" opacity="0.35" strokeWidth="1" />

      {/* arcades */}
      {arches.map((x) => (
        <g key={`a${x}`} opacity="0.55">
          <path
            d={`M${x} 252 V196 A31 34 0 0 1 ${x + 62} 196 V252`}
            strokeWidth="1.4"
          />
          <path d={`M${x} 214 H${x + 62}`} strokeWidth="0.8" opacity="0.5" />
        </g>
      ))}
      <path d="M22 252 H378" opacity="0.5" strokeWidth="1.6" />

      {/* trame zellige */}
      {range(10, 40, 36).flatMap((x) =>
        range(2, 166, 14).map((y) => (
          <path
            key={`z${x}-${y}`}
            d={`M${x} ${y - 5} L${x + 5} ${y} L${x} ${y + 5} L${x - 5} ${y} Z`}
            opacity="0.2"
            strokeWidth="0.8"
          />
        )),
      )}

      {/* patio + bassin */}
      <path d="M58 268 H342 M40 288 H360" opacity="0.2" strokeWidth="1" />
      <path d="M170 264 L200 252 L230 264 L200 276 Z" opacity="0.4" strokeWidth="1.2" />
      <path d="M182 264 L200 257 L218 264 L200 271 Z" opacity="0.25" strokeWidth="0.8" />
    </g>
  );
}

/* ------------------------------------------------------------------ */
/* Bureaux : mur-rideau continu, reflets diagonaux                      */
/* ------------------------------------------------------------------ */
function Office(): ReactNode {
  return (
    <g stroke="currentColor" strokeLinecap="square">
      <g fill="none">
        <path d="M0 280 H400" opacity="0.22" strokeWidth="1" />
        <path d="M96 280 V22 H312 V280" opacity="0.5" strokeWidth="1.4" />
      </g>
      <polygon points="96,150 312,44 312,92 96,198" fill="currentColor" opacity="0.07" stroke="none" />
      <polygon points="96,244 312,138 312,160 96,266" fill="currentColor" opacity="0.05" stroke="none" />
      <g fill="none" opacity="0.26">
        {range(12, 114, 18).map((x) => (
          <path key={`cv${x}`} d={`M${x} 28 V276`} strokeWidth="0.9" />
        ))}
        {range(10, 48, 26).map((y) => (
          <path key={`ch${y}`} d={`M96 ${y} H312`} strokeWidth="0.9" />
        ))}
      </g>
      <g fill="none">
        <path d="M312 280 V186 H384 V280" opacity="0.3" strokeWidth="1.1" />
        {range(4, 204, 24).map((y) => (
          <path key={`o${y}`} d={`M312 ${y} H384`} opacity="0.16" strokeWidth="1" />
        ))}
        <path d="M16 280 V232 H96" opacity="0.24" strokeWidth="1.1" />
        <path d="M96 22 H312" opacity="0.8" strokeWidth="2.4" />
      </g>
    </g>
  );
}

/* ------------------------------------------------------------------ */
/* Duplex : coupe, escalier central, double hauteur                     */
/* ------------------------------------------------------------------ */
function Section(): ReactNode {
  const steps = range(6, 0, 1).map((i) => {
    const x = 196 + i * 11;
    const y = 250 - i * 15;
    return `M${x} ${y} H${x + 11} V${y - 15}`;
  });
  return (
    <g fill="none" stroke="currentColor" strokeLinecap="square">
      <path d="M56 58 H352" opacity="0.8" strokeWidth="2.6" />
      <path d="M62 66 H346" opacity="0.3" strokeWidth="1" />
      <path d="M56 58 V262 M352 58 V262" opacity="0.5" strokeWidth="1.3" />
      <path d="M56 262 H392" opacity="0.6" strokeWidth="1.8" />

      {/* dalle intermédiaire partielle : double hauteur à gauche */}
      <path d="M196 160 H352" opacity="0.55" strokeWidth="2" />
      <path d="M196 166 H352" opacity="0.2" strokeWidth="1" />

      {/* escalier */}
      <g opacity="0.45" strokeWidth="1.2">
        {steps.map((d, i) => (
          <path key={`s${i}`} d={d} />
        ))}
      </g>

      {/* garde-corps mezzanine */}
      <path d="M196 160 V132 M352 132 H196" opacity="0.28" strokeWidth="1" />
      {range(8, 206, 18).map((x) => (
        <path key={`g${x}`} d={`M${x} 160 V134`} opacity="0.16" strokeWidth="0.8" />
      ))}

      {/* baie séjour double hauteur */}
      <rect x="72" y="92" width="104" height="160" opacity="0.26" strokeWidth="1" />
      <path d="M124 92 V252 M72 172 H176" opacity="0.16" strokeWidth="1" />

      {/* terrasse */}
      <path d="M352 160 H392 M352 192 H392" opacity="0.3" strokeWidth="1" />
      {range(4, 358, 10).map((x) => (
        <path key={`t${x}`} d={`M${x} 160 V192`} opacity="0.14" strokeWidth="0.8" />
      ))}

      {/* niveau de sol */}
      <path d="M40 276 H400" opacity="0.18" strokeWidth="1" />
    </g>
  );
}

/* ------------------------------------------------------------------ */
/* Loft : plan au trait, cloisons, arc de porte, cotation               */
/* ------------------------------------------------------------------ */
function Plan(): ReactNode {
  return (
    <g fill="none" stroke="currentColor" strokeLinecap="square">
      {/* murs porteurs en double trait */}
      <rect x="40" y="46" width="320" height="196" opacity="0.6" strokeWidth="1.6" />
      <rect x="47" y="53" width="306" height="182" opacity="0.35" strokeWidth="1" />

      {/* verrière nord */}
      <path d="M40 46 H360" opacity="0.85" strokeWidth="3" />
      {range(11, 58, 28).map((x) => (
        <path key={`vr${x}`} d={`M${x} 46 V53`} opacity="0.4" strokeWidth="1.4" />
      ))}

      {/* bloc technique */}
      <rect x="236" y="53" width="117" height="86" opacity="0.4" strokeWidth="1.2" />
      <path d="M236 106 H353" opacity="0.28" strokeWidth="1" />
      <circle cx="268" cy="78" r="9" opacity="0.25" strokeWidth="1" />
      <rect x="300" y="68" width="38" height="22" opacity="0.22" strokeWidth="1" />

      {/* arc de porte */}
      <path d="M236 139 V172 M236 172 A33 33 0 0 0 269 139" opacity="0.3" strokeWidth="1" />

      {/* trame de sol */}
      {range(6, 70, 26).map((y) => (
        <path key={`fl${y}`} d={`M53 ${y + 60} H230`} opacity="0.1" strokeWidth="1" />
      ))}

      {/* mobilier au trait */}
      <rect x="72" y="150" width="96" height="52" opacity="0.22" strokeWidth="1" />
      <rect x="86" y="80" width="62" height="40" opacity="0.18" strokeWidth="1" />

      {/* cotation */}
      <g opacity="0.35" strokeWidth="1">
        <path d="M40 266 H360" />
        <path d="M40 260 V272 M360 260 V272 M200 262 V270" />
      </g>
      <text
        x="200"
        y="284"
        textAnchor="middle"
        fill="currentColor"
        opacity="0.45"
        fontSize="11"
        letterSpacing="2"
        stroke="none"
      >
        118 m²
      </text>
    </g>
  );
}

const ART: Record<VisualVariant, () => ReactNode> = {
  facade: Facade,
  tower: Tower,
  riad: Riad,
  office: Office,
  section: Section,
  plan: Plan,
};

/**
 * Planche dessinée. `reveal` fait descendre un volet (clip-path) du haut vers
 * le bas : le dessin « se trace » comme un tirage de plan qui sort de la
 * machine. Mouvement géométrique, jamais organique, coupé si le visiteur a
 * demandé moins d'animation.
 *
 * L'observateur est posé sur le CONTENEUR, pas sur le SVG : un élément déjà
 * masqué par son propre clip-path n'intersecte plus rien pour
 * IntersectionObserver, et ne se révélerait donc jamais.
 */
function ArtPlate({
  children,
  viewBox,
  reveal,
  className,
  style,
  delay = 0,
  duration = 0.8,
}: {
  children: ReactNode;
  viewBox: string;
  reveal: boolean;
  className: string;
  style: CSSProperties;
  delay?: number;
  duration?: number;
}) {
  const reduced = useReducedMotion();
  const direction = useScrollDirection();
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: false, amount: 0.2 });
  const animated = reveal && !reduced;

  const shared = {
    viewBox,
    preserveAspectRatio: "xMidYMid slice" as const,
    className: "absolute inset-0 h-full w-full",
  };

  return (
    <div
      ref={ref}
      aria-hidden="true"
      className={`bg-noise relative overflow-hidden ${className}`}
      style={style}
    >
      {animated ? (
        <motion.svg
          {...shared}
          data-reveal
          initial={{
            clipPath: direction === "down" ? "inset(0 0 100% 0)" : "inset(100% 0 0 0)",
          }}
          animate={{
            clipPath: inView
              ? "inset(0 0 0% 0)"
              : direction === "down"
                ? "inset(0 0 100% 0)"
                : "inset(100% 0 0 0)",
          }}
          transition={{ duration, delay, ease: EASE }}
        >
          {children}
        </motion.svg>
      ) : (
        <svg {...shared}>{children}</svg>
      )}
    </div>
  );
}

export function PropertyVisual({
  variant,
  tone,
  className = "",
  reveal = false,
  delay = 0,
}: {
  variant: VisualVariant;
  tone: Tone;
  className?: string;
  reveal?: boolean;
  delay?: number;
}) {
  const spec = TONES[tone];
  const Art = ART[variant];
  return (
    <ArtPlate
      viewBox="0 0 400 300"
      reveal={reveal}
      delay={delay}
      className={className}
      style={{ background: spec.bg, color: spec.line }}
    >
      <Art />
    </ArtPlate>
  );
}

/* ------------------------------------------------------------------ */
/* Photographies                                                       */
/* ------------------------------------------------------------------ */
/**
 * Photographie hébergée localement (`/public/templates/immobilier/`).
 * `marks` ajoute les repères d'angle du vocabulaire technique d'Atrium :
 * la photo est cadrée comme une planche, pas posée comme un fond de bannière.
 */
function Marks() {
  return (
    <span aria-hidden="true" className="pointer-events-none absolute inset-3">
      <span className="absolute top-0 left-0 h-4 w-px bg-white/70" />
      <span className="absolute top-0 left-0 h-px w-4 bg-white/70" />
      <span className="absolute right-0 bottom-0 h-4 w-px bg-white/70" />
      <span className="absolute right-0 bottom-0 h-px w-4 bg-white/70" />
    </span>
  );
}

export function PropertyPhoto({
  photo,
  sizes,
  className = "",
  imageClassName = "",
  priority = false,
  marks = true,
  reveal = false,
  delay = 0,
  children,
}: {
  photo: Photo;
  sizes: string;
  className?: string;
  /** Cadrage / traitement de l'image elle-même (object-position, saturation…). */
  imageClassName?: string;
  priority?: boolean;
  marks?: boolean;
  /** Volet qui s'ouvre de bas en haut, dans le même geste que les planches dessinées. */
  reveal?: boolean;
  delay?: number;
  /** Surimpression (légende, repère de référence) posée dans le cadre. */
  children?: ReactNode;
}) {
  const reduced = useReducedMotion();
  const direction = useScrollDirection();
  /**
   * Même précaution que pour les planches dessinées : l'observateur est posé
   * sur le CADRE, jamais sur le calque masqué — un élément réduit à zéro par
   * son propre clip-path n'intersecte plus rien, et ne se révélerait jamais.
   */
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: false, amount: 0.2 });
  const animated = reveal && !reduced;

  const image = (
    <Image
      src={photo.src}
      alt={photo.alt}
      fill
      sizes={sizes}
      priority={priority}
      loading={priority ? undefined : "lazy"}
      className={`object-cover ${imageClassName}`}
    />
  );

  return (
    <div
      ref={ref}
      className={`bg-noise relative overflow-hidden bg-[#E4E0D8] ${className}`}
    >
      {animated ? (
        <motion.div
          data-reveal
          className="absolute inset-0"
          initial={{
            clipPath: direction === "down" ? "inset(0 0 100% 0)" : "inset(100% 0 0 0)",
          }}
          animate={{
            clipPath: inView
              ? "inset(0 0 0% 0)"
              : direction === "down"
                ? "inset(0 0 100% 0)"
                : "inset(100% 0 0 0)",
          }}
          transition={{ duration: 0.7, delay, ease: EASE }}
        >
          {image}
        </motion.div>
      ) : (
        image
      )}
      {marks && <Marks />}
      {children}
    </div>
  );
}

/**
 * Grande photographie à parallaxe LENTE et courte : le cadre reste fixe,
 * l'image glisse de quelques pour cent. Réservé au desktop (le mouvement
 * lié au scroll n'a pas de sens sur un écran court) et coupé en
 * `prefers-reduced-motion` — `useTransform` n'est pas couvert par
 * `MotionConfig`, la garde est donc explicite.
 */
export function ParallaxPhoto({
  photo,
  sizes,
  className = "",
  imageClassName = "",
  priority = false,
  marks = true,
  range = 8,
  children,
}: {
  photo: Photo;
  sizes: string;
  className?: string;
  imageClassName?: string;
  priority?: boolean;
  marks?: boolean;
  /** Amplitude du glissement, en % de la hauteur du calque image. */
  range?: number;
  children?: ReactNode;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();
  const desktop = useIsDesktop();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], [`-${range}%`, `${range}%`]);
  const active = desktop && !reduced;

  return (
    <div
      ref={ref}
      className={`bg-noise relative overflow-hidden bg-[#E4E0D8] ${className}`}
    >
      {/* Le calque déborde de 18 % en haut et en bas : même au bout de la
          course, aucun bord ne se découvre. */}
      <motion.div
        className="absolute inset-x-0 -top-[18%] h-[136%]"
        style={active ? { y } : undefined}
      >
        <Image
          src={photo.src}
          alt={photo.alt}
          fill
          sizes={sizes}
          priority={priority}
          loading={priority ? undefined : "lazy"}
          className={`object-cover ${imageClassName}`}
        />
      </motion.div>
      {marks && <Marks />}
      {children}
    </div>
  );
}

/**
 * Photographie qui GRANDIT à l'approche : légèrement réduite et masquée aux
 * bords, elle se déploie jusqu'à son cadre plein à mesure qu'elle traverse le
 * centre du viewport. Réservé au desktop et coupé en `prefers-reduced-motion`
 * — sur mobile l'image reste simplement à sa taille finale, jamais rognée.
 * C'est le seul moment de la démo où une image « devient grande » au scroll.
 */
export function CinematicPhoto({
  photo,
  sizes,
  className = "",
  imageClassName = "",
  children,
}: {
  photo: Photo;
  sizes: string;
  className?: string;
  imageClassName?: string;
  children?: ReactNode;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();
  const desktop = useIsDesktop();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "center center"] });
  const scale = useTransform(scrollYProgress, [0, 1], [0.86, 1]);
  const clipPath = useTransform(scrollYProgress, [0, 1], ["inset(7%)", "inset(0%)"]);
  const active = desktop && !reduced;

  return (
    <motion.div
      ref={ref}
      className={`bg-noise relative overflow-hidden bg-[#0E141B] ${className}`}
      style={active ? { clipPath } : undefined}
    >
      <motion.div className="absolute inset-0" style={active ? { scale } : undefined}>
        <Image
          src={photo.src}
          alt={photo.alt}
          fill
          sizes={sizes}
          loading="lazy"
          className={`object-cover ${imageClassName}`}
        />
      </motion.div>
      {children}
    </motion.div>
  );
}

/**
 * Visuel principal d'un bien : la photo quand le bien en possède une,
 * le dessin au trait sinon. C'est ce mélange qui donne son grain au catalogue.
 */
export function PropertyMedia({
  photo,
  variant,
  tone,
  sizes,
  className = "",
  priority = false,
  reveal = false,
}: {
  photo?: Photo;
  variant: VisualVariant;
  tone: Tone;
  sizes: string;
  className?: string;
  priority?: boolean;
  reveal?: boolean;
}) {
  if (photo) {
    return (
      <PropertyPhoto
        photo={photo}
        sizes={sizes}
        className={className}
        priority={priority}
        reveal={reveal}
      />
    );
  }
  return <PropertyVisual variant={variant} tone={tone} className={className} reveal={reveal} />;
}

/**
 * Étiquette de nature du visuel : « Photo » ou « Dessin ». C'est elle qui
 * garde les deux langages lisibles quand ils se côtoient dans une même
 * grille — le visiteur sait toujours ce qu'il regarde.
 */
export function MediaKind({ photo }: { photo?: Photo }) {
  return (
    <span className="pointer-events-none absolute bottom-3 left-3 inline-flex items-center gap-1.5 rounded-full bg-[#14181D]/55 px-2.5 py-1 text-[0.68rem] font-medium tracking-[0.16em] text-white/90 uppercase backdrop-blur-[2px]">
      <span
        aria-hidden="true"
        className={`h-1 w-1 rounded-full ${photo ? "bg-[#C9D6DF]" : "bg-[#C9A76A]"}`}
      />
      {photo ? "Photo" : "Dessin"}
    </span>
  );
}

/**
 * Coupe d'atrium : signature graphique de l'agence (bloc « L'agence »).
 */
export function AtriumVisual({
  className = "",
  reveal = false,
}: {
  className?: string;
  reveal?: boolean;
}) {
  return (
    <ArtPlate
      viewBox="0 0 400 520"
      reveal={reveal}
      duration={0.9}
      className={className}
      style={{
        background: "linear-gradient(168deg,#F6F3EE 0%,#E5E9EC 55%,#C6D2DB 100%)",
        color: "#2B3A4A",
      }}
    >
      <g fill="none" stroke="currentColor" strokeLinecap="square">
          {/* verrière zénithale + rais de lumière */}
          <path d="M96 52 H304" opacity="0.7" strokeWidth="2.4" />
          {range(9, 108, 24).map((x) => (
            <path key={`sk${x}`} d={`M${x} 52 V66`} opacity="0.3" strokeWidth="1" />
          ))}
          <polygon points="120,66 280,66 336,470 64,470" fill="currentColor" opacity="0.05" stroke="none" />

          {/* grande arcade centrale */}
          <path d="M132 470 V236 A68 74 0 0 1 268 236 V470" opacity="0.5" strokeWidth="1.6" />
          <path d="M148 470 V240 A52 58 0 0 1 252 240 V470" opacity="0.2" strokeWidth="1" />

          {/* coursives latérales */}
          {range(4, 150, 88).map((y) => (
            <g key={`c${y}`} opacity="0.3">
              <path d={`M24 ${y} H132`} strokeWidth="1.2" />
              <path d={`M268 ${y} H376`} strokeWidth="1.2" />
            </g>
          ))}
          {range(5, 48, 22).map((x) => (
            <path key={`pl${x}`} d={`M${x} 150 V470`} opacity="0.12" strokeWidth="1" />
          ))}
          {range(5, 290, 22).map((x) => (
            <path key={`pr${x}`} d={`M${x} 150 V470`} opacity="0.12" strokeWidth="1" />
          ))}

          {/* sol */}
          <path d="M0 470 H400" opacity="0.55" strokeWidth="2" />
          <path d="M0 492 H400" opacity="0.14" strokeWidth="1" />
          {range(9, 32, 46).map((x) => (
            <path key={`fg${x}`} d={`M${x} 470 V520`} opacity="0.1" strokeWidth="1" />
          ))}
      </g>
    </ArtPlate>
  );
}
