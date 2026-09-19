"use client";

import { motion } from "motion/react";
import type { JobArt } from "./data";
import { usePlay } from "./useVortexMotion";

/*
 * Aucune photographie n'est disponible pour cette démo : tous les visuels
 * ci-dessous sont des tracés techniques (SVG) dessinés à la main, dans
 * l'esprit d'une planche d'atelier cotée. Ils sont décoratifs et portent
 * tous aria-hidden au point d'insertion.
 */

const DRAW = { duration: 1.1, ease: [0.16, 1, 0.3, 1] as const };

/**
 * Les coordonnées calculées (cos/sin) doivent être arrondies : React
 * sérialise un flottant long différemment côté serveur et côté client, ce
 * qui déclenche un avertissement d'hydratation sur les attributs SVG.
 */
const r2 = (n: number) => Math.round(n * 100) / 100;

type DrawProps = {
  d: string;
  play: boolean;
  delay?: number;
  stroke?: string;
  width?: number;
  dash?: string;
};

function Draw({ d, play, delay = 0, stroke = "currentColor", width = 1.5, dash }: DrawProps) {
  return (
    <motion.path
      d={d}
      fill="none"
      stroke={stroke}
      strokeWidth={width}
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeDasharray={dash}
      initial={{ pathLength: 0, opacity: 0 }}
      animate={play ? { pathLength: 1, opacity: 1 } : { pathLength: 0, opacity: 0 }}
      transition={{ ...DRAW, delay }}
    />
  );
}

function Pop({
  children,
  play,
  delay = 0,
}: {
  children: React.ReactNode;
  play: boolean;
  delay?: number;
}) {
  return (
    <motion.g
      initial={{ opacity: 0 }}
      animate={play ? { opacity: 1 } : { opacity: 0 }}
      transition={{ duration: 0.4, delay }}
    >
      {children}
    </motion.g>
  );
}

/* ------------------------------------------------------------------ */
/* Marque : chevron usiné + double V inversé, lu comme un flux d'air.  */
/* ------------------------------------------------------------------ */

export function VortexMark({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 34 34" className={className} aria-hidden="true" focusable="false">
      <path d="M2 2 L32 2 L32 8 L8 8 L8 32 L2 32 Z" fill="var(--vx-red)" />
      <path
        d="M13 11 L21.5 26 L30 11"
        fill="none"
        stroke="var(--vx-white)"
        strokeWidth="2.6"
        strokeLinejoin="round"
      />
      <path d="M20 11 L21.5 13.6 L23 11 Z" fill="var(--vx-red)" />
    </svg>
  );
}

/* ------------------------------------------------------------------ */
/* Héros : profil de véhicule coté, façon planche technique.           */
/* ------------------------------------------------------------------ */

const BODY =
  "M66 212 L64 178 C64 168 70 163 86 161 L196 150 L252 108 C258 102 268 99 278 99 L402 99 C414 99 424 103 431 111 L478 152 L578 164 C590 166 594 171 594 181 L594 212";

export function CarBlueprint({ className }: { className?: string }) {
  const [ref, play] = usePlay<SVGSVGElement>(0.2);

  return (
    <svg
      ref={ref}
      viewBox="0 0 680 300"
      className={className}
      aria-hidden="true"
      focusable="false"
      role="presentation"
    >
      {/* Sol */}
      <Draw d="M18 252 L662 252" play={play} stroke="var(--vx-line)" width={1} />

      {/* Carrosserie */}
      <Draw d={BODY} play={play} stroke="var(--vx-white)" width={2} delay={0.05} />

      {/* Passages de roue */}
      <Draw
        d="M136 212 A46 46 0 0 1 228 212"
        play={play}
        stroke="var(--vx-white)"
        width={2}
        delay={0.35}
      />
      <Draw
        d="M438 212 A46 46 0 0 1 530 212"
        play={play}
        stroke="var(--vx-white)"
        width={2}
        delay={0.4}
      />

      {/* Vitrage, pied milieu, ligne de caisse */}
      <Draw
        d="M262 146 L292 113 L388 113 L414 146 Z"
        play={play}
        stroke="var(--vx-chrome)"
        width={1.2}
        delay={0.45}
      />
      <Draw d="M338 113 L338 146" play={play} stroke="var(--vx-chrome)" width={1.2} delay={0.55} />
      <Draw d="M228 198 L438 198" play={play} stroke="var(--vx-chrome)" width={1.2} delay={0.5} />
      <Draw d="M308 148 L308 196" play={play} stroke="var(--vx-line)" width={1.2} delay={0.6} />
      <Draw d="M404 148 L404 196" play={play} stroke="var(--vx-line)" width={1.2} delay={0.65} />
      <Draw d="M322 170 L346 170" play={play} stroke="var(--vx-chrome)" width={2} delay={0.7} />
      <Draw d="M418 170 L442 170" play={play} stroke="var(--vx-chrome)" width={2} delay={0.72} />

      {/* Optique avant, en rouge signal */}
      <Draw
        d="M66 174 L98 170 L98 183 L68 185 Z"
        play={play}
        stroke="var(--vx-red)"
        width={2}
        delay={0.75}
      />

      {/* Roues */}
      {[182, 484].map((cx, i) => (
        <motion.g
          key={cx}
          initial={{ opacity: 0, rotate: -35 }}
          animate={play ? { opacity: 1, rotate: 0 } : undefined}
          transition={{ duration: 0.9, delay: 0.5 + i * 0.08, ease: [0.16, 1, 0.3, 1] }}
          style={{ originX: `${cx}px`, originY: "212px" }}
        >
          <circle
            cx={cx}
            cy={212}
            r={40}
            fill="none"
            stroke="var(--vx-white)"
            strokeWidth={2}
          />
          <circle
            cx={cx}
            cy={212}
            r={19}
            fill="none"
            stroke="var(--vx-red)"
            strokeWidth={2}
          />
          <circle cx={cx} cy={212} r={4} fill="var(--vx-red)" />
          {[0, 72, 144, 216, 288].map((a) => (
            <line
              key={a}
              x1={cx}
              y1={212}
              x2={r2(cx + 19 * Math.cos((a * Math.PI) / 180))}
              y2={r2(212 + 19 * Math.sin((a * Math.PI) / 180))}
              stroke="var(--vx-line)"
              strokeWidth={1.5}
            />
          ))}
        </motion.g>
      ))}

      {/* Cotes */}
      <Pop play={play} delay={1.1}>
        <path
          d="M66 272 L594 272 M66 264 L66 280 M594 264 L594 280"
          fill="none"
          stroke="var(--vx-mute)"
          strokeWidth={1}
        />
        <rect x="286" y="262" width="92" height="20" fill="var(--vx-void)" />
        <text
          x="332"
          y="276"
          textAnchor="middle"
          fill="var(--vx-mute)"
          fontSize="13"
          letterSpacing="1.5"
          fontFamily="ui-monospace, monospace"
        >
          4 685 mm
        </text>

        <path
          d="M640 99 L640 252 M632 99 L648 99 M632 252 L648 252"
          fill="none"
          stroke="var(--vx-mute)"
          strokeWidth={1}
        />
        <rect x="628" y="150" width="24" height="52" fill="var(--vx-void)" />
        <text
          x="644"
          y="180"
          textAnchor="middle"
          fill="var(--vx-mute)"
          fontSize="13"
          letterSpacing="1.5"
          fontFamily="ui-monospace, monospace"
          transform="rotate(-90 644 176)"
        >
          1 430 mm
        </text>

        <text
          x="18"
          y="34"
          fill="var(--vx-red-hi)"
          fontSize="12"
          letterSpacing="3"
          fontFamily="ui-monospace, monospace"
        >
          PL. 06 — PROFIL / RELEVÉ ATELIER
        </text>
      </Pop>
    </svg>
  );
}

/* ------------------------------------------------------------------ */
/* Jauge semi-circulaire (bloc expertise).                             */
/* ------------------------------------------------------------------ */

export function Gauge({ value, className }: { value: number; className?: string }) {
  const [ref, play] = usePlay<SVGSVGElement>(0.4);
  const angle = -90 + value * 180;

  return (
    <svg
      ref={ref}
      viewBox="0 0 260 168"
      className={className}
      aria-hidden="true"
      focusable="false"
      role="presentation"
    >
      <path
        d="M30 138 A100 100 0 0 1 230 138"
        fill="none"
        stroke="var(--vx-line)"
        strokeWidth={10}
        strokeLinecap="butt"
      />
      <motion.path
        d="M30 138 A100 100 0 0 1 230 138"
        fill="none"
        stroke="var(--vx-red)"
        strokeWidth={10}
        strokeLinecap="butt"
        initial={{ pathLength: 0 }}
        animate={{ pathLength: play ? value : 0 }}
        transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
      />
      {Array.from({ length: 11 }).map((_, i) => {
        const a = (Math.PI * i) / 10;
        const x1 = r2(130 - 84 * Math.cos(a));
        const y1 = r2(138 - 84 * Math.sin(a));
        const x2 = r2(130 - (i % 5 === 0 ? 70 : 76) * Math.cos(a));
        const y2 = r2(138 - (i % 5 === 0 ? 70 : 76) * Math.sin(a));
        return (
          <line
            key={i}
            x1={x1}
            y1={y1}
            x2={x2}
            y2={y2}
            stroke="var(--vx-mute)"
            strokeWidth={i % 5 === 0 ? 2 : 1}
          />
        );
      })}
      <motion.g
        initial={{ transform: "rotate(-90deg)" }}
        animate={{ transform: `rotate(${play ? angle : -90}deg)` }}
        transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
        style={{ transformBox: "view-box", originX: 130 / 260, originY: 138 / 168 }}
      >
        <line x1={130} y1={138} x2={130} y2={62} stroke="var(--vx-white)" strokeWidth={3} />
      </motion.g>
      <circle cx={130} cy={138} r={9} fill="var(--vx-steel-hi)" stroke="var(--vx-white)" strokeWidth={2} />
    </svg>
  );
}

/* ------------------------------------------------------------------ */
/* Plan d'atelier en vue de dessus (bloc accès).                       */
/* ------------------------------------------------------------------ */

export function WorkshopPlan({ className }: { className?: string }) {
  const [ref, play] = usePlay<SVGSVGElement>(0.2);

  return (
    <svg
      ref={ref}
      viewBox="0 0 440 280"
      className={className}
      aria-hidden="true"
      focusable="false"
      role="presentation"
    >
      <Draw d="M20 30 L420 30 L420 250 L20 250 Z" play={play} stroke="var(--vx-line)" width={1.5} />
      {[0, 1, 2, 3].map((i) => (
        <g key={i}>
          <Draw
            d={`M${44 + i * 94} 58 L${118 + i * 94} 58 L${118 + i * 94} 196 L${44 + i * 94} 196 Z`}
            play={play}
            stroke="var(--vx-line)"
            width={1.2}
            delay={0.1 + i * 0.08}
            dash="6 6"
          />
          <Pop play={play} delay={0.5 + i * 0.08}>
            <rect
              x={56 + i * 94}
              y={92}
              width={50}
              height={7}
              fill={i === 1 ? "var(--vx-red)" : "var(--vx-line)"}
            />
            <rect
              x={56 + i * 94}
              y={152}
              width={50}
              height={7}
              fill={i === 1 ? "var(--vx-red)" : "var(--vx-line)"}
            />
            <text
              x={81 + i * 94}
              y={220}
              textAnchor="middle"
              fill="var(--vx-mute)"
              fontSize="11"
              letterSpacing="2"
              fontFamily="ui-monospace, monospace"
            >
              {`P0${i + 1}`}
            </text>
          </Pop>
        </g>
      ))}
      <Draw
        d="M20 250 L110 250"
        play={play}
        stroke="var(--vx-red)"
        width={4}
        delay={0.7}
      />
      <Pop play={play} delay={0.9}>
        <path d="M50 268 L80 268 M72 262 L80 268 L72 274" stroke="var(--vx-red)" strokeWidth={1.5} fill="none" />
        <text
          x="90"
          y="272"
          fill="var(--vx-mute)"
          fontSize="11"
          letterSpacing="2"
          fontFamily="ui-monospace, monospace"
        >
          ENTRÉE VÉHICULES
        </text>
        <text
          x="20"
          y="20"
          fill="var(--vx-red-hi)"
          fontSize="11"
          letterSpacing="3"
          fontFamily="ui-monospace, monospace"
        >
          PLAN ATELIER — 4 PONTS / 1 BANC 3D
        </text>
      </Pop>
    </svg>
  );
}

/* ------------------------------------------------------------------ */
/* Planches d'intervention (section atelier).                          */
/* ------------------------------------------------------------------ */

function EngineArt({ play }: { play: boolean }) {
  return (
    <g>
      <Draw d="M40 84 L280 84 L280 186 L40 186 Z" play={play} stroke="var(--vx-chrome)" width={1.8} />
      {[0, 1, 2, 3].map((i) => (
        <g key={i}>
          <Draw
            d={`M${58 + i * 56} 46 L${100 + i * 56} 46 L${100 + i * 56} 84 L${58 + i * 56} 84 Z`}
            play={play}
            stroke="var(--vx-white)"
            width={1.6}
            delay={0.12 + i * 0.07}
          />
          <Pop play={play} delay={0.5 + i * 0.07}>
            <circle cx={79 + i * 56} cy={30} r={7} fill="none" stroke="var(--vx-red)" strokeWidth={2} />
            <line x1={79 + i * 56} y1={37} x2={79 + i * 56} y2={46} stroke="var(--vx-red)" strokeWidth={2} />
          </Pop>
        </g>
      ))}
      <Draw d="M40 132 L280 132" play={play} stroke="var(--vx-line)" width={1.2} delay={0.4} dash="8 6" />
      <Pop play={play} delay={0.7}>
        {[0, 1, 2, 3, 4].map((i) => (
          <circle key={i} cx={58 + i * 51} cy={172} r={4} fill="var(--vx-line)" />
        ))}
      </Pop>
      <Draw d="M280 110 L300 110 L300 160 L280 160" play={play} stroke="var(--vx-red)" width={2} delay={0.6} />
    </g>
  );
}

function BrakeArt({ play }: { play: boolean }) {
  return (
    <g>
      <motion.g
        initial={{ opacity: 0, rotate: -28 }}
        animate={play ? { opacity: 1, rotate: 0 } : undefined}
        transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
        style={{ originX: "160px", originY: "115px" }}
      >
        <circle cx={160} cy={115} r={86} fill="none" stroke="var(--vx-white)" strokeWidth={2} />
        <circle cx={160} cy={115} r={74} fill="none" stroke="var(--vx-line)" strokeWidth={1.2} />
        <circle cx={160} cy={115} r={40} fill="none" stroke="var(--vx-chrome)" strokeWidth={1.6} />
        <circle cx={160} cy={115} r={14} fill="none" stroke="var(--vx-red)" strokeWidth={2} />
        {Array.from({ length: 16 }).map((_, i) => {
          const a = (i * Math.PI * 2) / 16;
          return (
            <line
              key={i}
              x1={r2(160 + 46 * Math.cos(a))}
              y1={r2(115 + 46 * Math.sin(a))}
              x2={r2(160 + 70 * Math.cos(a))}
              y2={r2(115 + 70 * Math.sin(a))}
              stroke="var(--vx-line)"
              strokeWidth={1.4}
            />
          );
        })}
        {Array.from({ length: 5 }).map((_, i) => {
          const a = (i * Math.PI * 2) / 5 - Math.PI / 2;
          return (
            <circle
              key={i}
              cx={r2(160 + 27 * Math.cos(a))}
              cy={r2(115 + 27 * Math.sin(a))}
              r={4.5}
              fill="none"
              stroke="var(--vx-chrome)"
              strokeWidth={1.5}
            />
          );
        })}
      </motion.g>
      <Draw
        d="M214 42 L268 42 L268 106 L214 106"
        play={play}
        stroke="var(--vx-red)"
        width={2.4}
        delay={0.55}
      />
      <Pop play={play} delay={0.9}>
        <rect x={218} y={54} width={44} height={10} fill="var(--vx-red)" opacity={0.55} />
      </Pop>
    </g>
  );
}

function GaugeArt({ play }: { play: boolean }) {
  return (
    <g>
      <Draw d="M22 40 L298 40 L298 196 L22 196 Z" play={play} stroke="var(--vx-line)" width={1.4} />
      <Draw
        d="M42 156 A66 66 0 0 1 174 156"
        play={play}
        stroke="var(--vx-chrome)"
        width={2}
        delay={0.15}
      />
      <motion.path
        d="M42 156 A66 66 0 0 1 174 156"
        fill="none"
        stroke="var(--vx-red)"
        strokeWidth={4}
        initial={{ pathLength: 0 }}
        animate={play ? { pathLength: 0.72 } : undefined}
        transition={{ duration: 1.1, delay: 0.35, ease: [0.16, 1, 0.3, 1] }}
      />
      <motion.g
        initial={{ rotate: -90 }}
        animate={play ? { rotate: 40 } : undefined}
        transition={{ duration: 1.1, delay: 0.35, ease: [0.16, 1, 0.3, 1] }}
        style={{ originX: "108px", originY: "156px" }}
      >
        <line x1={108} y1={156} x2={108} y2={104} stroke="var(--vx-white)" strokeWidth={2.5} />
      </motion.g>
      <circle cx={108} cy={156} r={6} fill="var(--vx-red)" />
      <Draw
        d="M206 96 A44 44 0 1 1 205.9 96"
        play={play}
        stroke="var(--vx-line)"
        width={1.6}
        delay={0.3}
      />
      <Pop play={play} delay={0.8}>
        <rect x={196} y={150} width={80} height={6} fill="var(--vx-line)" />
        <rect x={196} y={150} width={52} height={6} fill="var(--vx-red)" />
        <rect x={196} y={166} width={80} height={6} fill="var(--vx-line)" />
        <rect x={196} y={166} width={30} height={6} fill="var(--vx-chrome)" />
        <text
          x={42}
          y={186}
          fill="var(--vx-mute)"
          fontSize="11"
          letterSpacing="2"
          fontFamily="ui-monospace, monospace"
        >
          OBD / LIVE DATA
        </text>
      </Pop>
    </g>
  );
}

function SuspensionArt({ play }: { play: boolean }) {
  const spring = Array.from({ length: 9 })
    .map((_, i) => `L${i % 2 === 0 ? 132 : 188} ${70 + i * 14}`)
    .join(" ");

  return (
    <g>
      <Draw d="M108 34 L212 34" play={play} stroke="var(--vx-white)" width={2.4} />
      <Draw d="M160 34 L160 68" play={play} stroke="var(--vx-chrome)" width={2} delay={0.1} />
      <Draw d={`M160 68 ${spring}`} play={play} stroke="var(--vx-red)" width={2.4} delay={0.2} />
      <Draw d="M160 196 L160 216" play={play} stroke="var(--vx-chrome)" width={2} delay={0.5} />
      <Draw
        d="M142 196 L178 196 L178 216 L142 216 Z"
        play={play}
        stroke="var(--vx-white)"
        width={2}
        delay={0.55}
      />
      <Draw d="M150 100 L170 100 L170 190 L150 190 Z" play={play} stroke="var(--vx-chrome)" width={1.4} delay={0.35} />
      <Draw d="M40 216 L280 216" play={play} stroke="var(--vx-line)" width={1.2} delay={0.6} />
      <Draw d="M52 216 L92 60" play={play} stroke="var(--vx-line)" width={1.2} delay={0.7} dash="6 6" />
      <Draw d="M52 216 L52 60" play={play} stroke="var(--vx-line)" width={1.2} delay={0.75} dash="6 6" />
      <Pop play={play} delay={1}>
        <path d="M52 120 A96 96 0 0 1 68 108" fill="none" stroke="var(--vx-red)" strokeWidth={1.6} />
        <text
          x={62}
          y={96}
          fill="var(--vx-red-hi)"
          fontSize="12"
          letterSpacing="2"
          fontFamily="ui-monospace, monospace"
        >
          ±0,05°
        </text>
        <text
          x={214}
          y={212}
          fill="var(--vx-mute)"
          fontSize="11"
          letterSpacing="2"
          fontFamily="ui-monospace, monospace"
        >
          TRAIN AV.
        </text>
      </Pop>
    </g>
  );
}

export function JobPlate({ variant, className }: { variant: JobArt; className?: string }) {
  const [ref, play] = usePlay<SVGSVGElement>(0.25);

  return (
    <svg
      ref={ref}
      viewBox="0 0 320 240"
      className={className}
      aria-hidden="true"
      focusable="false"
      role="presentation"
    >
      {variant === "engine" && <EngineArt play={play} />}
      {variant === "brake" && <BrakeArt play={play} />}
      {variant === "gauge" && <GaugeArt play={play} />}
      {variant === "suspension" && <SuspensionArt play={play} />}
    </svg>
  );
}
