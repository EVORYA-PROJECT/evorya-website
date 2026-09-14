"use client";

import { useEffect, useState } from "react";
import { motion } from "motion/react";
import type { ReactNode } from "react";

type RevealOnScrollProps = {
  children: ReactNode;
  className?: string;
  delay?: number;
  y?: number;
  once?: boolean;
};

// En dessous de cette largeur, le reveal ne dépend plus d'un
// IntersectionObserver (whileInView) : sur certains navigateurs mobiles,
// celui-ci ne se déclenche jamais et laissait le contenu bloqué à
// opacity: 0. Le filet de sécurité CSS (.reveal en dessous de ce même
// breakpoint dans globals.css) garantit en plus la visibilité même en cas
// d'échec JS complet.
const COMPACT_QUERY = "(max-width: 768px)";

export default function RevealOnScroll({
  children,
  className,
  delay = 0,
  y = 28,
  once = true,
}: RevealOnScrollProps) {
  const [isCompact, setIsCompact] = useState(
    () => typeof window !== "undefined" && window.matchMedia(COMPACT_QUERY).matches,
  );

  useEffect(() => {
    const mql = window.matchMedia(COMPACT_QUERY);
    function handleChange(e: MediaQueryListEvent) {
      setIsCompact(e.matches);
    }
    mql.addEventListener("change", handleChange);
    return () => mql.removeEventListener("change", handleChange);
  }, []);

  const transition = { duration: 0.7, delay, ease: [0.16, 1, 0.3, 1] as const };

  if (isCompact) {
    // Mobile/tablette : apparition immédiate au montage, jamais liée au scroll.
    return (
      <motion.div
        data-reveal
        className={className}
        initial={{ opacity: 0, y }}
        animate={{ opacity: 1, y: 0 }}
        transition={transition}
      >
        {children}
      </motion.div>
    );
  }

  return (
    <motion.div
      data-reveal
      className={className}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once, margin: "-10% 0px -10% 0px" }}
      transition={transition}
    >
      {children}
    </motion.div>
  );
}
