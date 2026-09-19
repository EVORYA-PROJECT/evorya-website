"use client";

import { createContext, useContext, useEffect, useRef, type ReactNode } from "react";
import Image from "next/image";
import {
  animate,
  motion,
  useInView,
  useMotionValue,
  useReducedMotion,
  useScroll,
  useTransform,
} from "motion/react";
import type { Photo } from "./data";
import { useCompact, usePlay } from "./useVortexMotion";
import { directionalOffset, useScrollDirection } from "../useScrollDirection";

/* ------------------------------------------------------------------ */
/* Police display (Rajdhani) transmise depuis le Server Component.     */
/* Les titres l'appliquent individuellement via useDisplayFont().      */
/* ------------------------------------------------------------------ */

const DisplayFontContext = createContext<string>("");

export function DisplayFontProvider({
  value,
  children,
}: {
  value: string;
  children: ReactNode;
}) {
  return <DisplayFontContext.Provider value={value}>{children}</DisplayFontContext.Provider>;
}

export function useDisplayFont(): string {
  return useContext(DisplayFontContext);
}

/* ------------------------------------------------------------------ */
/* Apparition directionnelle, rapide et sèche (rythme atelier).        */
/* ------------------------------------------------------------------ */

type RevealProps = {
  children: ReactNode;
  className?: string;
  delay?: number;
  x?: number;
  y?: number;
};

export function Reveal({ children, className, delay = 0, x = 0, y = 20 }: RevealProps) {
  const ref = useRef<HTMLDivElement>(null);
  const compact = useCompact();
  const reduced = useReducedMotion();
  const direction = useScrollDirection();
  const inView = useInView(ref, { amount: 0.15, margin: "0px 0px -8% 0px" });
  const transition = { duration: 0.5, delay, ease: [0.16, 1, 0.3, 1] as const };
  const initial = { opacity: 0, x, y: directionalOffset(direction, y) };
  const target = { opacity: 1, x: 0, y: 0 };

  if (reduced) return <div className={className}>{children}</div>;

  if (compact) {
    return (
      <motion.div data-mobile-reveal className={className} initial={initial} animate={target} transition={transition}>
        {children}
      </motion.div>
    );
  }

  return (
    <motion.div
      data-reveal
      ref={ref}
      className={className}
      initial={initial}
      animate={inView ? target : initial}
      transition={transition}
    >
      {children}
    </motion.div>
  );
}

/* ------------------------------------------------------------------ */
/* Balayage directionnel : la photo se découvre comme un trait d'outil. */
/* ------------------------------------------------------------------ */

type WipeProps = {
  children: ReactNode;
  className?: string;
  delay?: number;
  /** Sens du balayage — « left » suit les diagonales de la page. */
  from?: "left" | "right" | "bottom";
};

const CLIP_HIDDEN: Record<NonNullable<WipeProps["from"]>, string> = {
  left: "inset(0% 100% 0% 0%)",
  right: "inset(0% 0% 0% 100%)",
  bottom: "inset(100% 0% 0% 0%)",
};

export function Wipe({ children, className, delay = 0, from = "left" }: WipeProps) {
  const ref = useRef<HTMLDivElement>(null);
  const compact = useCompact();
  const reduced = useReducedMotion();
  const direction = useScrollDirection();
  const inView = useInView(ref, { amount: 0.15, margin: "0px 0px -6% 0px" });
  const hiddenClip =
    from === "bottom" && direction === "up" ? "inset(0% 0% 100% 0%)" : CLIP_HIDDEN[from];
  const initial = { clipPath: hiddenClip, opacity: 0.4 };
  const target = { clipPath: "inset(0% 0% 0% 0%)", opacity: 1 };
  const transition = { duration: 0.55, delay, ease: [0.16, 1, 0.3, 1] as const };

  if (reduced) return <div className={className}>{children}</div>;

  if (compact) {
    return (
      <motion.div data-mobile-reveal className={className} initial={initial} animate={target} transition={transition}>
        {children}
      </motion.div>
    );
  }

  return (
    <div ref={ref} className={className}>
      <motion.div
        data-reveal
        className="h-full w-full"
        initial={initial}
        animate={inView ? target : initial}
        transition={transition}
      >
        {children}
      </motion.div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Photographie montée en plaque technique.                             */
/* ------------------------------------------------------------------ */

type TechPhotoProps = {
  photo: Photo;
  /** Obligatoire : dimensionnement réel du rendu, pour next/image. */
  sizes: string;
  /** Classes du cadre (ratio, clip-path, bordure…). */
  className?: string;
  /** Vraie seulement pour l'image du héros. */
  priority?: boolean;
  /** Repère de cote affiché en haut à gauche. */
  label?: string;
  /** Équerre rouge d'angle, comme sur les fiches d'intervention. */
  corner?: boolean;
  /** Trame de relevé par-dessus la photo (grands panneaux). */
  grid?: boolean;
  /** Cadrage vertical, ex. « 50% 30% ». */
  position?: string;
  /** Amplitude du défilement parallaxe, en pixels (0 = figée). */
  parallax?: number;
};

export function TechPhoto({
  photo,
  sizes,
  className = "",
  priority = false,
  label,
  corner = false,
  grid = false,
  position = "center",
  parallax = 0,
}: TechPhotoProps) {
  const ref = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();
  // useTransform n'est pas couvert par MotionConfig : la garde est explicite.
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const travel = reduced ? 0 : parallax;
  const y = useTransform(scrollYProgress, [0, 1], [-travel, travel]);

  return (
    <div
      ref={ref}
      className={`vx-photo vx-photo-edge ${grid ? "vx-photo-grid" : ""} ${className}`}
    >
      <motion.div
        style={{ y }}
        className={parallax ? "absolute inset-x-0 -inset-y-[12%]" : "absolute inset-0"}
      >
        <Image
          src={photo.src}
          alt={photo.alt}
          fill
          sizes={sizes}
          priority={priority}
          loading={priority ? undefined : "lazy"}
          className="object-cover"
          style={{ objectPosition: position }}
        />
      </motion.div>

      {label ? (
        <span className="vx-mono absolute left-4 top-4 z-10 text-xs tracking-[0.2em] text-[var(--vx-white)]/75">
          {label}
        </span>
      ) : null}
      {corner ? (
        <span
          aria-hidden="true"
          className="absolute right-0 top-0 z-10 h-8 w-8 border-r-2 border-t-2 border-[var(--vx-red)]"
        />
      ) : null}
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Étiquettes et repères techniques.                                    */
/* ------------------------------------------------------------------ */

export function TechLabel({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <span
      className={`vx-mono text-xs uppercase tracking-[0.28em] text-[var(--vx-mute)] ${className}`}
    >
      {children}
    </span>
  );
}

export function SectionIndex({ value, label }: { value: string; label: string }) {
  return (
    <div className="flex items-center gap-4">
      <span className="vx-mono text-xs tracking-[0.2em] text-[var(--vx-red-hi)]">{value}</span>
      <span aria-hidden="true" className="h-px w-10 bg-[var(--vx-red)] sm:w-16" />
      <TechLabel>{label}</TechLabel>
    </div>
  );
}

/** Réglette graduée : rappel de mesure, utilisée entre les sections. */
export function MeasureRail({ className = "" }: { className?: string }) {
  return (
    <div
      aria-hidden="true"
      className={`vx-rule h-3 w-full opacity-70 ${className}`}
    />
  );
}

/* ------------------------------------------------------------------ */
/* Compteur chiffré (bloc expertise).                                   */
/* ------------------------------------------------------------------ */

const NUMBER_FORMAT = new Intl.NumberFormat("fr-FR");

export function Counter({ to, suffix = "" }: { to: number; suffix?: string }) {
  const [ref, play] = usePlay<HTMLSpanElement>(0.5);
  const reduced = useReducedMotion();
  const raw = useMotionValue(0);
  const text = useTransform(raw, (v) => NUMBER_FORMAT.format(Math.round(v)));

  useEffect(() => {
    if (reduced) {
      raw.set(to);
      return;
    }
    if (!play) {
      raw.set(0);
      return;
    }
    const controls = animate(raw, to, { duration: 1.3, ease: [0.16, 1, 0.3, 1] });
    return () => controls.stop();
  }, [play, reduced, raw, to]);

  return (
    <span ref={ref} className="tabular-nums">
      <motion.span>{text}</motion.span>
      {suffix}
    </span>
  );
}
