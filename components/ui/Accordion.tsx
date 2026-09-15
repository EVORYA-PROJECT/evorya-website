"use client";

import { useId } from "react";
import { motion } from "motion/react";
import type { ReactNode } from "react";

type AccordionItemProps = {
  title: ReactNode;
  children: ReactNode;
  open: boolean;
  onToggle: () => void;
  index?: string;
  className?: string;
};

/**
 * Item d'accordéon accessible et réutilisable (FAQ, Services mobile...).
 * Pattern WAI-ARIA "disclosure" : bouton avec aria-expanded/aria-controls,
 * panneau avec role="region" + aria-labelledby. L'ouverture/fermeture est
 * pilotée par le parent (voir components/sections/Faq.tsx) pour permettre
 * une seule réponse ouverte à la fois.
 */
export default function AccordionItem({
  title,
  children,
  open,
  onToggle,
  index,
  className,
}: AccordionItemProps) {
  const baseId = useId();
  const buttonId = `${baseId}-button`;
  const panelId = `${baseId}-panel`;

  return (
    <div className={`border-b border-line ${className ?? ""}`}>
      <h3 className="m-0">
        <button
          id={buttonId}
          type="button"
          aria-expanded={open}
          aria-controls={panelId}
          onClick={onToggle}
          className="group flex w-full items-center justify-between gap-4 py-6 text-left"
        >
          <span className="flex items-start gap-4">
            {index && (
              <span className="font-display text-xs tracking-[0.2em] text-mist-dim">{index}</span>
            )}
            <span className="text-base font-medium text-paper sm:text-lg">{title}</span>
          </span>
          <span
            aria-hidden="true"
            className="relative flex h-6 w-6 shrink-0 items-center justify-center"
          >
            <span className="absolute h-px w-3.5 bg-paper-dim transition-colors group-hover:bg-paper" />
            <motion.span
              animate={{ rotate: open ? 90 : 0, opacity: open ? 0 : 1 }}
              transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
              className="absolute h-3.5 w-px bg-paper-dim group-hover:bg-paper"
            />
          </span>
        </button>
      </h3>
      <motion.div
        id={panelId}
        role="region"
        aria-labelledby={buttonId}
        initial={false}
        animate={{ height: open ? "auto" : 0, opacity: open ? 1 : 0 }}
        transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
        className="overflow-hidden"
      >
        <div className="pb-6 pr-10 text-sm leading-relaxed text-mist sm:text-base">{children}</div>
      </motion.div>
    </div>
  );
}
