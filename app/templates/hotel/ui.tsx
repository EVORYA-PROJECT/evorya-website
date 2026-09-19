"use client";

import Image from "next/image";
import { motion, useInView, useReducedMotion } from "motion/react";
import { useRef, type ReactNode } from "react";
import type { PhotoAsset } from "./data";
import { directionalOffset, useScrollDirection } from "../useScrollDirection";

/**
 * Petites primitives partagées par les sections du riad.
 *
 * Le rythme d'animation est volontairement lent (0.9 à 1.3 s, easing très
 * amorti) : la marque se joue sur le calme, pas sur la réactivité. Le
 * `data-reveal` reprend le filet de sécurité global (app/globals.css) qui
 * force l'affichage sur mobile si l'animation ne se déclenche pas.
 */

const EASE = [0.22, 0.61, 0.36, 1] as const;

export function Reveal({
  children,
  delay = 0,
  y = 26,
  className,
  amount = 0.25,
}: {
  children: ReactNode;
  delay?: number;
  y?: number;
  className?: string;
  amount?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const direction = useScrollDirection();
  const inView = useInView(ref, { amount });
  const hidden = { opacity: 0, y: directionalOffset(direction, y) };

  if (reduce) return <div className={className}>{children}</div>;

  return (
    <motion.div
      data-reveal
      ref={ref}
      className={className}
      initial={hidden}
      animate={inView ? { opacity: 1, y: 0 } : hidden}
      transition={{ duration: 1.15, delay, ease: EASE }}
    >
      {children}
    </motion.div>
  );
}

/**
 * Ouverture par volet : l'image se découvre du bas vers le haut au lieu de
 * simplement apparaître. Plus lent qu'un fondu (1,3 s) — c'est le geste le
 * plus « hôtelier » de la page, réservé aux grandes images.
 */
export function ClipReveal({
  children,
  delay = 0,
  className,
  amount = 0.2,
}: {
  children: ReactNode;
  delay?: number;
  className?: string;
  amount?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const direction = useScrollDirection();
  const inView = useInView(ref, { amount });
  const hidden = {
    clipPath: direction === "down" ? "inset(14% 0% 0% 0%)" : "inset(0% 0% 14% 0%)",
    opacity: 0,
  };

  if (reduce) return <div className={className}>{children}</div>;

  return (
    <motion.div
      data-reveal
      ref={ref}
      className={className}
      initial={hidden}
      animate={inView ? { clipPath: "inset(0% 0% 0% 0%)", opacity: 1 } : hidden}
      transition={{ duration: 1.3, delay, ease: EASE }}
    >
      {children}
    </motion.div>
  );
}

/**
 * Photographie d'ambiance.
 *
 * Toujours en `fill` dans un conteneur qui porte la hauteur : c'est la
 * composition (bandeau, arche, case de mosaïque) qui décide du cadrage, pas le
 * ratio natif du fichier. Le léger zoom au survol (1.03 max, 900 ms) n'existe
 * que sur les pointeurs fins — sur mobile il ne se déclenche jamais et
 * n'occupe aucun temps de calcul.
 */
export function Photo({
  photo,
  sizes,
  className = "",
  focus,
  priority = false,
  zoom = true,
  rounded = "",
}: {
  photo: PhotoAsset;
  /** Obligatoire : évite à Next de servir une image pleine largeur partout. */
  sizes: string;
  className?: string;
  /** object-position, pour recadrer une même photo selon la case. */
  focus?: string;
  priority?: boolean;
  zoom?: boolean;
  rounded?: string;
}) {
  return (
    <div className={`group/photo relative overflow-hidden ${rounded} ${className}`}>
      <Image
        src={photo.src}
        alt={photo.alt}
        fill
        sizes={sizes}
        priority={priority}
        loading={priority ? undefined : "lazy"}
        placeholder="blur"
        blurDataURL={photo.blur}
        className={`object-cover ${
          zoom
            ? "transition-transform duration-[900ms] ease-out motion-reduce:transition-none [@media(hover:hover)]:group-hover/photo:scale-[1.03]"
            : ""
        }`}
        style={focus ? { objectPosition: focus } : undefined}
      />
    </div>
  );
}

/** Surtitre discret : petites capitales espacées, filet court à gauche. */
export function Eyebrow({
  children,
  tone = "dark",
  className = "",
}: {
  children: ReactNode;
  /** `dark` = posé sur un fond sombre, `light` = posé sur la chaux. */
  tone?: "dark" | "light";
  className?: string;
}) {
  const color = tone === "dark" ? "#d8c9a3" : "#8a5c26";
  return (
    <p
      className={`flex items-center gap-3 text-[0.75rem] font-medium uppercase tracking-[0.28em] ${className}`}
      style={{ color }}
    >
      <span
        aria-hidden="true"
        className="inline-block h-px w-8"
        style={{ backgroundColor: color, opacity: 0.55 }}
      />
      {children}
    </p>
  );
}
