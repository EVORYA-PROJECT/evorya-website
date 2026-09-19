"use client";

import { motion } from "motion/react";
import { C, EASE } from "./theme";
import { useDisplay } from "./primitives";
import Photo from "./Photo";
import { PHOTOS } from "./data";

/**
 * Panneaux graphiques du cabinet : structure d'abord — trames de filets
 * tracés, aplat bleu nuit, monogramme surdimensionné traité comme un signe.
 * Le hero superpose désormais cette grille d'architecte à une photographie
 * de façade : le geste dessiné devient un relevé posé sur le bâtiment.
 * Tous ces blocs sont décoratifs et masqués aux technologies d'assistance —
 * sauf la photographie du hero, qui porte un vrai texte alternatif.
 */

const V_LINES = [12, 28, 44, 60, 76, 92];
const H_LINES = [18, 38, 58, 78];

/** Grand panneau du hero : photographie de façade + relevé tracé + monogramme. */
export function HeroPlate() {
  const display = useDisplay();

  return (
    <div className="relative w-full overflow-hidden" style={{ backgroundColor: C.navy }}>
      {/* Proportion : paysage compact sur mobile, portrait à partir de lg. */}
      <div className="aspect-[16/11] w-full sm:aspect-[16/9] lg:aspect-[4/5]" />

      {/* Seule image chargée en priorité de la page : elle est au-dessus de
          la ligne de flottaison sur grand écran. */}
      <div className="absolute inset-0">
        <Photo
          asset={PHOTOS.facade}
          priority
          sizes="(min-width: 1024px) 40vw, 100vw"
          scrim="plate"
          tone={0.3}
          className="h-full w-full"
          objectPosition="50% 42%"
        />
      </div>

      {/* Trame verticale — tracée du haut vers le bas. */}
      {V_LINES.map((left, i) => (
        <motion.span
          key={`v-${left}`}
          aria-hidden="true"
          className="absolute top-0 h-full w-px origin-top"
          style={{ left: `${left}%`, backgroundColor: "rgba(244,243,239,0.16)" }}
          initial={{ scaleY: 0 }}
          whileInView={{ scaleY: 1 }}
          viewport={{ once: false }}
          transition={{ duration: 0.8, delay: 0.1 + i * 0.06, ease: EASE }}
        />
      ))}

      {/* Trame horizontale — tracée de la gauche vers la droite. */}
      {H_LINES.map((top, i) => (
        <motion.span
          key={`h-${top}`}
          aria-hidden="true"
          className="absolute left-0 h-px w-full origin-left"
          style={{ top: `${top}%`, backgroundColor: "rgba(244,243,239,0.16)" }}
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: false }}
          transition={{ duration: 1, delay: 0.25 + i * 0.08, ease: EASE }}
        />
      ))}

      {/* Filet d'accent laiton : un seul, très court, comme un repère. */}
      <motion.span
        aria-hidden="true"
        className="absolute left-[12%] top-[18%] w-px origin-top"
        style={{ height: "20%", backgroundColor: C.brass }}
        initial={{ scaleY: 0 }}
        whileInView={{ scaleY: 1 }}
        viewport={{ once: false }}
        transition={{ duration: 0.7, delay: 0.9, ease: EASE }}
      />

      {/* Cadre intérieur — géométrie d'architecte. */}
      <span
        aria-hidden="true"
        className="absolute inset-4 border sm:inset-6"
        style={{ borderColor: "rgba(244,243,239,0.18)" }}
      />

      {/* Monogramme surdimensionné, volontairement rogné par le cadre. */}
      <motion.span
        aria-hidden="true"
        className={`${display} absolute -bottom-[0.14em] left-[4%] select-none text-[clamp(4.5rem,14vw,11rem)] font-medium leading-[0.78] tracking-[-0.02em] text-transparent [-webkit-text-stroke:1px_rgba(244,243,239,0.52)]`}
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: false }}
        transition={{ duration: 0.9, delay: 0.45, ease: EASE }}
      >
        V&amp;A
      </motion.span>

      {/* Mentions d'angle, en capitales fines. Regroupées en haut : le bas du
          panneau appartient au monogramme, qu'aucun texte ne doit croiser. */}
      <p
        className="absolute inset-x-6 top-6 flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1 text-[10px] uppercase tracking-[0.28em] sm:inset-x-9 sm:top-9 sm:text-[11px]"
        style={{ color: C.paper }}
      >
        <span>Conseil aux entreprises</span>
        <span className="whitespace-nowrap">Est. 2009 · Paris · Lyon</span>
      </p>
    </div>
  );
}

/**
 * Plaque monogramme d'un membre de l'équipe : pas de faux portrait, un
 * traitement typographique gravé sur papier, avec une hachure très fine.
 */
export function MonogramPlate({ initials }: { initials: string }) {
  const display = useDisplay();

  return (
    <div
      aria-hidden="true"
      className="relative w-full overflow-hidden border"
      style={{ backgroundColor: C.paperPure, borderColor: C.rule }}
    >
      <div className="aspect-[4/5] w-full" />

      {/* Hachure diagonale, presque imperceptible. */}
      <span
        className="absolute inset-0"
        style={{
          backgroundImage: `repeating-linear-gradient(45deg, ${C.rule} 0 1px, transparent 1px 9px)`,
          opacity: 0.55,
        }}
      />
      {/* Réserve claire centrale, pour détacher les initiales. */}
      <span
        className="absolute inset-x-[12%] inset-y-[22%]"
        style={{ backgroundColor: C.paperPure }}
      />

      <span
        className={`${display} absolute inset-0 flex items-center justify-center text-[clamp(2.25rem,9vw,3.25rem)] font-medium tracking-[0.02em]`}
        style={{ color: C.ink }}
      >
        {initials}
      </span>

      {/* Filet de pied : le segment laiton s'étend au survol de la carte. */}
      <span className="absolute inset-x-0 bottom-0 h-px" style={{ backgroundColor: C.rule }} />
      <span
        className="absolute bottom-0 left-0 h-px w-8 transition-[width] duration-500 ease-out group-hover:w-full"
        style={{ backgroundColor: C.brass }}
      />
    </div>
  );
}

/**
 * Bloc bleu nuit compact utilisé comme respiration graphique dans la section
 * « Le cabinet » : quelques filets, un chiffre traité en signe.
 */
export function RulePlate({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div
      className={`bg-noise relative overflow-hidden px-6 py-8 sm:px-8 sm:py-10 ${className}`}
      style={{ backgroundColor: C.navy }}
    >
      <span
        aria-hidden="true"
        className="absolute inset-0"
        style={{
          backgroundImage: `repeating-linear-gradient(to right, ${C.ruleDark} 0 1px, transparent 1px 48px)`,
          opacity: 0.6,
        }}
      />
      <span
        aria-hidden="true"
        className="absolute inset-y-0 left-0 w-px"
        style={{ backgroundColor: C.brass }}
      />
      <div className="relative h-full">{children}</div>
    </div>
  );
}
