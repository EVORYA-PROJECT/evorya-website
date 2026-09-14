"use client";

import { useRef } from "react";
import { motion, useMotionValue, useSpring } from "motion/react";
import type { ReactNode } from "react";

type MagneticButtonProps = {
  children: ReactNode;
  className?: string;
  as?: "a" | "button";
  href?: string;
  onClick?: () => void;
  type?: "button" | "submit";
  disabled?: boolean;
};

// Déplacement maximum strict, dans chaque axe, quel que soit l'endroit où
// le curseur se trouve au-dessus du bouton (y compris au bord).
const MAX_OFFSET = 5;

// Ease-out : la sensibilité est maximale près du centre et diminue à
// l'approche du bord, pour éviter un effet de "mur" brutal à la limite.
function easeOutQuad(t: number) {
  return 1 - (1 - t) * (1 - t);
}

function clamp(value: number, min: number, max: number) {
  return Math.max(min, Math.min(max, value));
}

const MotionAnchor = motion.create("a");
const MotionButton = motion.create("button");

export default function MagneticButton({
  children,
  className,
  as,
  href,
  onClick,
  type,
  disabled,
}: MagneticButtonProps) {
  const ref = useRef<HTMLElement | null>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springX = useSpring(x, { stiffness: 260, damping: 20, mass: 0.4 });
  const springY = useSpring(y, { stiffness: 260, damping: 20, mass: 0.4 });

  function handleMouseMove(e: React.MouseEvent) {
    if (
      !ref.current ||
      !window.matchMedia("(pointer: fine)").matches ||
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
    ) {
      return;
    }

    const rect = ref.current.getBoundingClientRect();
    const halfWidth = rect.width / 2;
    const halfHeight = rect.height / 2;
    if (halfWidth === 0 || halfHeight === 0) return;

    // Position du curseur normalisée entre -1 et 1 par rapport au centre du
    // bouton, puis strictement bornée : un mouvement de souris rapide qui
    // "saute" au-delà du bord ne doit jamais produire un déplacement plus
    // grand que MAX_OFFSET.
    const normX = clamp((e.clientX - (rect.left + halfWidth)) / halfWidth, -1, 1);
    const normY = clamp((e.clientY - (rect.top + halfHeight)) / halfHeight, -1, 1);

    x.set(Math.sign(normX) * easeOutQuad(Math.abs(normX)) * MAX_OFFSET);
    y.set(Math.sign(normY) * easeOutQuad(Math.abs(normY)) * MAX_OFFSET);
  }

  function handleMouseLeave() {
    x.set(0);
    y.set(0);
  }

  if (as === "a") {
    return (
      <MotionAnchor
        ref={ref as React.Ref<HTMLAnchorElement>}
        href={href}
        onClick={onClick}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        style={{ x: springX, y: springY }}
        className={className}
      >
        {children}
      </MotionAnchor>
    );
  }

  return (
    <MotionButton
      ref={ref as React.Ref<HTMLButtonElement>}
      type={type ?? "button"}
      disabled={disabled}
      onClick={onClick}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ x: springX, y: springY }}
      className={className}
    >
      {children}
    </MotionButton>
  );
}
