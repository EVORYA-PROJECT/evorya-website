"use client";

import {
  createContext,
  useContext,
  useEffect,
  useRef,
  useState,
  type ReactNode,
} from "react";
import {
  animate,
  motion,
  useInView,
  useMotionValue,
  useReducedMotion,
  useTransform,
} from "motion/react";
import { directionalOffset, useScrollDirection } from "../useScrollDirection";

/* ------------------------------------------------------------------ */
/* Palette Atrium Immobilier                                           */
/* ------------------------------------------------------------------ */
export const C = {
  paper: "#FBFAF8", // fond principal, blanc chaud
  surface: "#FFFFFF",
  limestone: "#EDEAE4", // bandes calcaires
  hairline: "#DCD7CD", // filets
  ink: "#14181D", // texte principal
  graphite: "#55606C", // texte secondaire
  slate: "#2B3A4A", // accent principal (registre)
  slateDeep: "#1E2833", // pied de page
  sky: "#C9D6DF", // accent clair (registre)
  brass: "#8A6A3B", // accent chaud, marqueurs
} as const;

/**
 * Le style global du site Evorya impose `:focus-visible { outline: 1px solid #f2f2f2 }`,
 * invisible sur un fond clair. Chaque élément interactif de cette démo
 * redéfinit donc explicitement son anneau de focus (spécificité supérieure).
 */
export const focusRing =
  "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#2B3A4A]";
export const focusRingLight =
  "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#C9D6DF]";

/* ------------------------------------------------------------------ */
/* Police display (Archivo) injectée depuis page.tsx (Server Component) */
/* ------------------------------------------------------------------ */
const DisplayFontContext = createContext<string>("");

export function DisplayFontProvider({
  className,
  children,
}: {
  className: string;
  children: ReactNode;
}) {
  return (
    <DisplayFontContext.Provider value={className}>{children}</DisplayFontContext.Provider>
  );
}

export function useDisplay(extra = ""): string {
  const base = useContext(DisplayFontContext);
  return extra ? `${base} ${extra}` : base;
}

/* ------------------------------------------------------------------ */
/* Révélation au scroll                                                 */
/* ------------------------------------------------------------------ */
/**
 * `data-reveal` active le filet de sécurité global (globals.css) : sur
 * mobile le contenu reste toujours visible même si l'observateur ne se
 * déclenche pas. Le mouvement est réservé au desktop, ce qui correspond à
 * l'intention : une composition qui se pose, pas qui s'agite.
 */
export function Reveal({
  children,
  delay = 0,
  y = 20,
  className = "",
  as = "div",
}: {
  children: ReactNode;
  delay?: number;
  y?: number;
  className?: string;
  as?: "div" | "li";
}) {
  const ref = useRef(null);
  const Comp = as === "li" ? motion.li : motion.div;
  const direction = useScrollDirection();
  const reduced = useReducedMotion();
  const inView = useInView(ref, { amount: 0.15, margin: "0px 0px -8% 0px" });
  const hidden = { opacity: 0, y: directionalOffset(direction, y) };

  if (reduced) return <Comp className={className}>{children}</Comp>;
  return (
    <Comp
      data-reveal
      ref={ref}
      className={className}
      initial={hidden}
      animate={inView ? { opacity: 1, y: 0 } : hidden}
      transition={{ duration: 0.6, delay, ease: EASE }}
    >
      {children}
    </Comp>
  );
}

/** Courbe unique de la démo : départ franc, arrivée posée. Rien de rebondissant. */
export const EASE = [0.22, 0.61, 0.36, 1] as const;

/* ------------------------------------------------------------------ */
/* Compteur numérique                                                   */
/* ------------------------------------------------------------------ */
/**
 * Compte de 0 jusqu'à `value` à la première entrée dans le champ de vision.
 * Le rendu serveur (et le premier rendu client) affiche directement la valeur
 * finale : sans JavaScript, ou en `prefers-reduced-motion`, le chiffre reste
 * juste. La remise à zéro se fait avant peinture, donc sans clignotement.
 */
export function CountUp({
  value,
  suffix = "",
  duration = 0.7,
  className = "",
}: {
  value: number;
  suffix?: string;
  duration?: number;
  className?: string;
}) {
  const reduced = useReducedMotion();
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: false, amount: 0.5 });
  const raw = useMotionValue(value);
  const shown = useTransform(raw, (current) => Math.round(current));

  useEffect(() => {
    if (reduced) {
      raw.set(value);
      return;
    }
    if (!inView) {
      raw.set(0);
      return;
    }
    const controls = animate(raw, value, {
      duration,
      ease: EASE,
    });
    return () => controls.stop();
  }, [inView, value, duration, reduced, raw]);

  return (
    <span ref={ref} className={className}>
      <motion.span>{shown}</motion.span>
      {suffix}
    </span>
  );
}

/* ------------------------------------------------------------------ */
/* Largeur d'écran                                                      */
/* ------------------------------------------------------------------ */
/**
 * Vrai à partir de `query` (1024px par défaut). Sert à réserver au desktop
 * les effets liés au scroll : `useTransform` échappe à `MotionConfig`, donc
 * on le coupe explicitement, à la fois sur petit écran et en
 * `prefers-reduced-motion` (voir `ParallaxPhoto`).
 *
 * Le premier rendu renvoie `false` — pas de mouvement tant que le client
 * n'a pas mesuré : le rendu serveur et le rendu client restent identiques.
 */
export function useIsDesktop(query = "(min-width: 1024px)"): boolean {
  const [matches, setMatches] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia(query);
    const update = () => setMatches(mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, [query]);

  return matches;
}

/* ------------------------------------------------------------------ */
/* Tracé de trait animé                                                 */
/* ------------------------------------------------------------------ */
/**
 * Petit motif au trait qui se DESSINE (pathLength 0 → 1), comme une main
 * qui pose une cotation. C'est le geste le plus « technique » du vocabulaire
 * Atrium : il sert de raccord entre deux blocs, jamais de décor gratuit.
 */
export function DrawnPaths({
  viewBox,
  paths,
  className = "",
  stroke = "#8A6A3B",
  strokeWidth = 1,
  duration = 0.8,
  delay = 0,
  stagger = 0.09,
}: {
  viewBox: string;
  paths: string[];
  className?: string;
  stroke?: string;
  strokeWidth?: number;
  duration?: number;
  delay?: number;
  stagger?: number;
}) {
  const reduced = useReducedMotion();
  return (
    <svg
      aria-hidden="true"
      viewBox={viewBox}
      preserveAspectRatio="none"
      fill="none"
      className={className}
    >
      {paths.map((d, i) => (
        <motion.path
          key={d}
          data-reveal
          d={d}
          stroke={stroke}
          strokeWidth={strokeWidth}
          strokeLinecap="square"
          vectorEffect="non-scaling-stroke"
          initial={reduced ? undefined : { pathLength: 0, opacity: 0 }}
          whileInView={reduced ? undefined : { pathLength: 1, opacity: 1 }}
          viewport={{ once: false, amount: 0.4 }}
          transition={{ duration, delay: delay + i * stagger, ease: EASE }}
        />
      ))}
    </svg>
  );
}

/* ------------------------------------------------------------------ */
/* Petits composants d'identité                                         */
/* ------------------------------------------------------------------ */
export function Eyebrow({
  children,
  className = "",
  tone = "graphite",
}: {
  children: ReactNode;
  className?: string;
  tone?: "graphite" | "light";
}) {
  return (
    <p
      className={`text-[0.75rem] font-medium tracking-[0.28em] uppercase ${
        tone === "light" ? "text-[#A9BCCB]" : "text-[#55606C]"
      } ${className}`}
    >
      {children}
    </p>
  );
}

export function SectionNumber({ value, label }: { value: string; label: string }) {
  return (
    <div className="flex items-baseline gap-3">
      <span className="text-[0.75rem] font-medium tracking-[0.2em] text-[#8A6A3B] tabular-nums">
        {value}
      </span>
      {/* Le filet se trace : c'est le geste de base du vocabulaire Atrium. */}
      <motion.span
        aria-hidden="true"
        data-reveal
        className="h-px w-8 origin-left bg-[#DCD7CD]"
        initial={{ scaleX: 0 }}
        whileInView={{ scaleX: 1 }}
        viewport={{ once: false, amount: 0.9 }}
        transition={{ duration: 0.5, ease: EASE }}
      />
      <span className="text-[0.75rem] font-medium tracking-[0.28em] uppercase text-[#55606C]">
        {label}
      </span>
    </div>
  );
}

/**
 * Filet horizontal qui se trace au scroll — sert de raccord entre deux blocs
 * d'une même section (prolongement du calepinage, jamais une décoration).
 */
export function RuleDraw({ className = "", delay = 0 }: { className?: string; delay?: number }) {
  return (
    <motion.span
      aria-hidden="true"
      data-reveal
      className={`block h-px origin-left bg-[#DCD7CD] ${className}`}
      initial={{ scaleX: 0 }}
      whileInView={{ scaleX: 1 }}
      viewport={{ once: false, amount: 0.5 }}
      transition={{ duration: 0.7, delay, ease: EASE }}
    />
  );
}

/** Pastille de statut d'un bien (Exclusivité / Nouveau / Location). */
export function Tag({ children }: { children: ReactNode }) {
  return (
    <span className="inline-flex items-center rounded-full border border-[#2B3A4A]/25 bg-white/85 px-3 py-1 text-[0.75rem] font-medium tracking-[0.16em] uppercase text-[#2B3A4A] backdrop-blur-[2px]">
      {children}
    </span>
  );
}
