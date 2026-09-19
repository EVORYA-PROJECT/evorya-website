"use client";

import Image from "next/image";
import { useRef, useSyncExternalStore, type ReactNode } from "react";
import { motion, useReducedMotion, useScroll, useTransform } from "motion/react";
import type { PhotoAsset } from "./photos";

/**
 * Cadre photographique KRUSH.
 *
 * Quatre choses qu'un simple <img> ne fait pas et qui comptent ici :
 *
 * 1. un fond noir sous la photo, pour que le chargement ne troue jamais la
 *    page (la démo est intégralement sur fond près-noir) ;
 * 2. un étalonnage rouge très léger en soft-light : vingt photos venant de
 *    vingt tournages différents finissent par appartenir à la même campagne ;
 * 3. un voile dégradé optionnel — seule façon d'écrire du texte crème par
 *    dessus sans jouer avec le contraste ;
 * 4. une parallaxe *courte* (quelques pourcents), uniquement ≥1024px et
 *    uniquement si l'utilisateur n'a pas demandé moins d'animation :
 *    `useTransform` alimente un style, ce que `MotionConfig reducedMotion`
 *    ne neutralise pas tout seul, d'où le `useReducedMotion()` explicite.
 */

const SCRIMS = {
  bottom:
    "linear-gradient(to top, rgba(8,8,9,0.90) 0%, rgba(8,8,9,0.38) 40%, rgba(8,8,9,0) 72%)",
  top: "linear-gradient(to bottom, rgba(8,8,9,0.82) 0%, rgba(8,8,9,0.22) 45%, rgba(8,8,9,0) 78%)",
  frame:
    "linear-gradient(to bottom, rgba(8,8,9,0.55) 0%, rgba(8,8,9,0.05) 32%, rgba(8,8,9,0.30) 62%, rgba(8,8,9,0.90) 100%)",
  soft: "linear-gradient(to bottom, rgba(8,8,9,0) 42%, rgba(8,8,9,0.34) 100%)",
  side: "linear-gradient(to right, rgba(8,8,9,0.86) 0%, rgba(8,8,9,0.25) 46%, rgba(8,8,9,0) 82%)",
} as const;

export type Scrim = keyof typeof SCRIMS;

/**
 * Vrai à partir de 1024 px. Faux au premier rendu : rien ne s'active côté
 * serveur, donc aucune divergence d'hydratation.
 *
 * Un SEUL `matchMedia` pour toute la page, partagé via `useSyncExternalStore` :
 * la page instancie une cinquantaine de cadres photo, et autant d'écouteurs
 * media-query dupliqués n'apporteraient rien qu'un coût.
 */
let desktopMq: MediaQueryList | null = null;
const desktopListeners = new Set<() => void>();

function subscribeDesktop(listener: () => void) {
  if (!desktopMq) {
    desktopMq = window.matchMedia("(min-width: 1024px)");
    desktopMq.addEventListener("change", () => desktopListeners.forEach((l) => l()));
  }
  desktopListeners.add(listener);
  return () => {
    desktopListeners.delete(listener);
  };
}

export function useDesktop() {
  return useSyncExternalStore(
    subscribeDesktop,
    () => desktopMq?.matches ?? window.matchMedia("(min-width: 1024px)").matches,
    () => false,
  );
}

/**
 * Couche de parallaxe, montée UNIQUEMENT quand elle sert réellement.
 *
 * `useScroll` installe de la mesure et un abonnement au scroll par instance.
 * La page compte une cinquantaine de cadres photo mais une dizaine seulement
 * ont de la parallaxe : laisser le hook dans `Photo` faisait travailler les
 * quarante autres pour rien (scroll saccadé et captures d'écran qui
 * expiraient, mesuré). Les hooks ne pouvant pas être conditionnels, on isole
 * la mécanique dans un composant qu'on ne rend pas dans le cas général.
 */
function ParallaxLayer({
  containerRef,
  amount,
  children,
}: {
  containerRef: React.RefObject<HTMLDivElement | null>;
  amount: number;
  children: ReactNode;
}) {
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], [`-${amount}%`, `${amount}%`]);

  return (
    <motion.div className="absolute inset-0" style={{ y, scale: 1 + amount / 35 }}>
      {children}
    </motion.div>
  );
}

export default function Photo({
  asset,
  sizes,
  className = "",
  priority = false,
  objectPosition,
  scrim,
  grade = 0.1,
  parallax = 0,
  zoomOnHover = false,
  grain = true,
  children,
}: {
  asset: PhotoAsset;
  /** Largeur réellement occupée par la photo, par palier. Jamais 100vw par défaut. */
  sizes: string;
  className?: string;
  priority?: boolean;
  objectPosition?: string;
  scrim?: Scrim;
  /** Intensité du voile rouge d'étalonnage. 0 pour laisser la photo brute. */
  grade?: number;
  /** Amplitude de la parallaxe en % de la hauteur (0 = aucune). 3 à 6 suffisent. */
  parallax?: number;
  zoomOnHover?: boolean;
  grain?: boolean;
  children?: ReactNode;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const desktop = useDesktop();
  const reduce = useReducedMotion();
  const moving = parallax > 0 && desktop && !reduce;

  const image = (
    <Image
      src={asset.src}
      alt={asset.alt}
      fill
      sizes={sizes}
      priority={priority}
      placeholder="blur"
      blurDataURL={asset.blur}
      className={`object-cover ${
        zoomOnHover
          ? "transition-transform duration-[900ms] ease-out group-hover:scale-[1.035]"
          : ""
      }`}
      style={objectPosition ? { objectPosition } : undefined}
    />
  );

  return (
    <div ref={ref} className={`relative overflow-hidden bg-[#141416] ${className}`}>
      {moving ? (
        <ParallaxLayer containerRef={ref} amount={parallax}>
          {image}
        </ParallaxLayer>
      ) : (
        <div className="absolute inset-0">{image}</div>
      )}

      {/* Étalonnage : les vingt photos rejoignent la même campagne. */}
      {grade > 0 && (
        <span
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 mix-blend-soft-light"
          style={{ backgroundColor: `rgba(255,59,31,${grade})` }}
        />
      )}
      {scrim && (
        <span
          aria-hidden="true"
          className="pointer-events-none absolute inset-0"
          style={{ background: SCRIMS[scrim] }}
        />
      )}
      {grain && (
        <span aria-hidden="true" className="bg-noise pointer-events-none absolute inset-0" />
      )}

      {children}
    </div>
  );
}
