"use client";

import { useRef, useState, type ReactNode } from "react";
import { motion, useReducedMotion } from "motion/react";
import { useDesktop } from "./Photo";

/**
 * Briques d'identité partagées par toutes les sections : le mot-symbole
 * typographique (aucun logo raster — la marque EST la typo), le libellé de
 * section, et les deux boutons de la maison.
 */

/* ------------------------------------------------------------------ */

/**
 * Mot-symbole KRUSH. Construit en HTML/CSS pour rester net à toutes les
 * échelles : lettres en Anton très resserrées + un carré rouge en signature,
 * le seul élément qui bouge au survol.
 */
export function Wordmark({
  d,
  className = "",
  blockClassName = "",
  accent = true,
}: {
  d: string;
  className?: string;
  blockClassName?: string;
  accent?: boolean;
}) {
  return (
    <span className={`${d} inline-flex items-center leading-none ${className}`}>
      <span className="tracking-[-0.02em]">KRUSH</span>
      {accent && (
        <span
          aria-hidden="true"
          className={`ml-[0.18em] inline-block bg-[#FF3B1F] transition-transform duration-300 ease-out group-hover:scale-y-[1.35] ${blockClassName || "h-[0.22em] w-[0.22em]"}`}
        />
      )}
    </span>
  );
}

/* ------------------------------------------------------------------ */

/** Petit libellé technique : numéro + intitulé, filet accentué. */
export function SectionLabel({
  index,
  children,
  tone = "light",
  className = "",
}: {
  index: string;
  children: ReactNode;
  tone?: "light" | "dark";
  className?: string;
}) {
  const color = tone === "light" ? "text-[#F4EFE6]/55" : "text-[#0B0B0C]/55";

  return (
    <p
      className={`flex items-center gap-3 text-[11px] font-semibold uppercase tracking-[0.28em] ${color} ${className}`}
    >
      <span className="text-[#FF3B1F]">{index}</span>
      <span aria-hidden="true" className="h-px w-8 bg-current opacity-40" />
      {children}
    </p>
  );
}

/* ------------------------------------------------------------------ */

/**
 * Bouton d'action. Deux détails qui font la différence sur desktop :
 * un très léger effet magnétique (le bouton suit le curseur de 4 px max,
 * jamais plus — au-delà on perd la cible), et un voile qui balaie le fond.
 * Les deux sont désactivés sous `prefers-reduced-motion` et sur mobile,
 * où seul le retour tactile (`active:scale`) compte.
 */
export function ActionLink({
  href,
  children,
  variant = "solid",
  className = "",
  onClick,
}: {
  href: string;
  children: ReactNode;
  variant?: "solid" | "ghost" | "light";
  className?: string;
  onClick?: () => void;
}) {
  const ref = useRef<HTMLAnchorElement>(null);
  const desktop = useDesktop();
  const reduce = useReducedMotion();
  const [offset, setOffset] = useState({ x: 0, y: 0 });
  const magnetic = desktop && !reduce;

  const styles =
    variant === "solid"
      ? "bg-[#FF3B1F] text-[#0B0B0C] hover:bg-[#FF5A3F]"
      : variant === "light"
        ? "bg-[#F4EFE6] text-[#0B0B0C] hover:bg-white"
        : "border border-[#F4EFE6]/30 text-[#F4EFE6] hover:border-[#FF3B1F] hover:text-[#FF3B1F]";

  return (
    <motion.a
      ref={ref}
      href={href}
      onClick={onClick}
      onMouseMove={(e) => {
        if (!magnetic || !ref.current) return;
        const r = ref.current.getBoundingClientRect();
        setOffset({
          x: ((e.clientX - (r.left + r.width / 2)) / r.width) * 8,
          y: ((e.clientY - (r.top + r.height / 2)) / r.height) * 6,
        });
      }}
      onMouseLeave={() => setOffset({ x: 0, y: 0 })}
      animate={magnetic ? { x: offset.x, y: offset.y } : { x: 0, y: 0 }}
      transition={{ type: "spring", stiffness: 260, damping: 22, mass: 0.4 }}
      className={`inline-flex min-h-[52px] items-center justify-center gap-2 px-6 text-[13px] font-bold uppercase tracking-[0.16em] transition-colors duration-300 active:scale-[0.97] sm:px-8 sm:text-[14px] ${styles} ${className}`}
    >
      {children}
    </motion.a>
  );
}
