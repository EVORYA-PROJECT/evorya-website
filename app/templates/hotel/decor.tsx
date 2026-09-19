"use client";

import type { CSSProperties, ReactNode } from "react";

/**
 * Riad Zellige — couche décorative.
 *
 * Aucune photographie n'existe pour cette démo : chaque « moment
 * photographique » est reconstruit en CSS/SVG (lumière de patio, bassin,
 * arcades, terrasse au crépuscule, vapeur du hammam...). Les dégradés sont
 * posés en style inline plutôt qu'en classes arbitraires Tailwind pour rester
 * lisibles et éviter tout échappement hasardeux.
 *
 * Tous ces blocs sont purement décoratifs : ils sont montés avec
 * aria-hidden="true" et ne portent jamais d'information.
 */

/* ------------------------------------------------------------------ */
/* Palette                                                             */
/* ------------------------------------------------------------------ */

export const RZ = {
  /** Vert le plus profond — fonds immersifs, nuit de la médina. */
  nuit: "#0c1f1c",
  /** Vert de cour, un cran plus ouvert. */
  cour: "#12312c",
  /** Vert zellige, teinte signature. */
  zellige: "#1f3d3a",
  /** Vert éclairé, réservé aux filets et reflets. */
  feuille: "#2f5d52",
  /** Chaux / plâtre : fond des sections claires. */
  chaux: "#f4ece0",
  /** Sable clair. */
  sableClair: "#e7dcc8",
  /** Sable — texte principal sur fonds sombres. */
  sable: "#d8c9a3",
  /** Ocre, accent chaud. */
  ocre: "#b07d3a",
  /** Ocre profond : lisible en petit corps sur fond clair. */
  ocreProfond: "#8a5c26",
  /** Terre cuite : boutons principaux. */
  terre: "#a8522f",
  /** Encre verte : texte principal sur fonds clairs. */
  encre: "#22302c",
  /** Gris-vert : texte secondaire sur fonds clairs. */
  brume: "#5c6b63",
  /** Vert pâle : texte secondaire sur fonds sombres. */
  brumeClaire: "#a9bbb1",
} as const;

/* ------------------------------------------------------------------ */
/* Motifs SVG (data-URI, sans identifiants globaux)                    */
/* ------------------------------------------------------------------ */

/** Étoile à huit branches (deux carrés croisés) — lattis géométrique abstrait. */
export const zellige = (hex: string, stroke = 0.9) =>
  `url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='88' height='88'><g fill='none' stroke='%23${hex}' stroke-width='${stroke}'><rect x='18' y='18' width='52' height='52'/><rect x='18' y='18' width='52' height='52' transform='rotate(45 44 44)'/><circle cx='44' cy='44' r='5.5'/><path d='M0 0L18 18M88 0L70 18M0 88L18 70M88 88L70 70'/></g></svg>")`;

/** Losanges emboîtés — évoque un sol carrelé vu en perspective douce. */
export const losanges = (hex: string) =>
  `url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='64' height='64'><g fill='none' stroke='%23${hex}' stroke-width='0.8'><path d='M32 2L62 32L32 62L2 32Z'/><path d='M32 18L46 32L32 46L18 32Z'/></g></svg>")`;

/** Ondulation continue — surface d'un bassin. */
export const ondes = (hex: string) =>
  `url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='120' height='22'><path fill='none' stroke='%23${hex}' stroke-width='1' d='M0 11q15 -7 30 0t30 0 30 0 30 0'/></svg>")`;

/** Arcs concentriques — repère abstrait pour le bloc « lieu ». */
export const arcs = (hex: string) =>
  `url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='180' height='180'><g fill='none' stroke='%23${hex}' stroke-width='0.7'><circle cx='90' cy='90' r='26'/><circle cx='90' cy='90' r='52'/><circle cx='90' cy='90' r='78'/><path d='M90 0V180M0 90H180'/></g></svg>")`;

/* ------------------------------------------------------------------ */
/* Panneaux                                                            */
/* ------------------------------------------------------------------ */

export type PanelVariant =
  | "cour"
  | "bassin"
  | "arcade"
  | "terrasse"
  | "hammam"
  | "chambre"
  | "toit"
  | "lanternes";

const layer = (style: CSSProperties, className = "absolute inset-0") => ({
  className,
  style,
});

const PANELS: Record<PanelVariant, ReactNode> = {
  /* Lumière de patio tombant derrière une arche. */
  cour: (
    <>
      <div
        {...layer({
          backgroundImage: `linear-gradient(168deg, ${RZ.nuit} 0%, ${RZ.cour} 46%, ${RZ.zellige} 100%)`,
        })}
      />
      <div
        {...layer({
          backgroundImage: zellige("d8c9a3"),
          backgroundSize: "88px 88px",
          opacity: 0.17,
        })}
      />
      <div
        className="absolute -top-1/3 right-[-10%] h-[160%] w-[62%] rotate-12 blur-2xl"
        style={{
          backgroundImage:
            "linear-gradient(to bottom, rgba(232,220,190,0.42), rgba(216,201,163,0.08) 62%, rgba(216,201,163,0) 82%)",
        }}
      />
      <div
        className="absolute inset-x-[16%] bottom-0 top-[26%] rounded-t-[999px]"
        style={{
          backgroundImage:
            "linear-gradient(to top, rgba(8,22,20,0.94), rgba(8,22,20,0.55) 55%, rgba(8,22,20,0.18))",
        }}
      />
      <div
        className="absolute inset-x-0 bottom-0 h-[14%]"
        style={{ backgroundImage: "linear-gradient(to top, rgba(8,22,20,0.9), transparent)" }}
      />
    </>
  ),

  /* Bassin : eau sombre, reflet, ondes. */
  bassin: (
    <>
      <div
        {...layer({
          backgroundImage: `linear-gradient(200deg, ${RZ.cour} 0%, ${RZ.nuit} 52%, #17443d 100%)`,
        })}
      />
      <div
        className="absolute left-1/2 top-[14%] h-28 w-28 -translate-x-1/2 rounded-full blur-xl"
        style={{
          backgroundImage:
            "radial-gradient(circle, rgba(232,220,190,0.6), rgba(232,220,190,0) 68%)",
        }}
      />
      <div
        className="absolute inset-x-0 bottom-0 h-[58%]"
        style={{
          backgroundImage: ondes("8fc4b7"),
          backgroundSize: "120px 22px",
          opacity: 0.32,
        }}
      />
      <div
        className="absolute inset-x-[24%] bottom-[34%] h-px"
        style={{
          backgroundImage:
            "linear-gradient(to right, transparent, rgba(216,201,163,0.55), transparent)",
        }}
      />
      <div
        {...layer({
          backgroundImage:
            "radial-gradient(120% 80% at 50% 110%, rgba(8,22,20,0.75), transparent 70%)",
        })}
      />
    </>
  ),

  /* Enfilade d'arcades sur galerie ombrée. */
  arcade: (
    <>
      <div
        {...layer({
          backgroundImage: `linear-gradient(to bottom, ${RZ.zellige} 0%, ${RZ.nuit} 100%)`,
        })}
      />
      <div className="absolute inset-x-[5%] bottom-[9%] top-[16%] flex items-end gap-[3.5%]">
        {[0.82, 1, 0.9, 0.74].map((h, i) => (
          <div
            key={i}
            className="flex-1 rounded-t-[999px]"
            style={{
              height: `${h * 100}%`,
              backgroundImage:
                "linear-gradient(to top, rgba(216,201,163,0.08), rgba(232,220,190,0.36))",
            }}
          />
        ))}
      </div>
      <div
        className="absolute inset-x-0 bottom-0 h-[16%]"
        style={{
          backgroundImage: losanges("d8c9a3"),
          backgroundSize: "64px 64px",
          opacity: 0.22,
        }}
      />
      <div
        {...layer({
          backgroundImage:
            "radial-gradient(90% 70% at 50% 0%, rgba(232,220,190,0.22), transparent 62%)",
        })}
      />
    </>
  ),

  /* Terrasse au crépuscule : ciel dégradé, ligne de toits. */
  terrasse: (
    <>
      <div
        {...layer({
          backgroundImage:
            "linear-gradient(to bottom, #10302c 0%, #37493c 34%, #a8522f 70%, #d8c9a3 100%)",
        })}
      />
      <div
        className="absolute left-[18%] top-[16%] h-16 w-16 rounded-full blur-[6px]"
        style={{
          backgroundImage:
            "radial-gradient(circle, rgba(244,236,224,0.85), rgba(244,236,224,0) 70%)",
        }}
      />
      <div className="absolute inset-x-0 bottom-0 flex h-[30%] items-end">
        {[0.5, 0.78, 0.4, 0.92, 0.62, 0.34, 0.7].map((h, i) => (
          <div
            key={i}
            className="flex-1"
            style={{ height: `${h * 100}%`, backgroundColor: "rgba(10,26,24,0.93)" }}
          />
        ))}
      </div>
      <div
        className="absolute inset-x-0 bottom-0 h-[10%]"
        style={{ backgroundColor: RZ.nuit }}
      />
    </>
  ),

  /* Hammam : pierre chaude, vapeur, étoiles percées en voûte. */
  hammam: (
    <>
      <div
        {...layer({
          backgroundImage:
            "linear-gradient(152deg, #241a15 0%, #3c2a1d 58%, #1a2624 100%)",
        })}
      />
      <div
        {...layer({
          backgroundImage:
            "radial-gradient(circle, rgba(244,236,224,0.55) 1px, transparent 1.6px)",
          backgroundSize: "30px 30px",
          opacity: 0.3,
        })}
      />
      <div
        className="absolute left-[16%] top-[26%] h-32 w-32 rounded-full blur-2xl"
        style={{
          backgroundImage:
            "radial-gradient(circle, rgba(232,220,190,0.34), rgba(232,220,190,0) 70%)",
        }}
      />
      <div
        className="absolute bottom-[14%] right-[12%] h-40 w-40 rounded-full blur-2xl"
        style={{
          backgroundImage:
            "radial-gradient(circle, rgba(176,125,58,0.42), rgba(176,125,58,0) 72%)",
        }}
      />
      <div
        {...layer({
          backgroundImage:
            "linear-gradient(to top, rgba(18,26,24,0.8), transparent 55%)",
        })}
      />
    </>
  ),

  /* Chambre : plâtre chaud, lumière d'une fenêtre en arc. */
  chambre: (
    <>
      <div
        {...layer({
          backgroundImage:
            "linear-gradient(162deg, #eee2cc 0%, #cdb695 56%, #7d6045 100%)",
        })}
      />
      <div
        className="absolute left-[10%] top-[6%] h-[52%] w-[30%] -rotate-[7deg] rounded-t-[999px] blur-[3px]"
        style={{
          backgroundImage:
            "linear-gradient(to bottom, rgba(255,251,242,0.92), rgba(255,251,242,0.06))",
        }}
      />
      <div
        {...layer({
          backgroundImage: zellige("4a3a28", 0.7),
          backgroundSize: "88px 88px",
          opacity: 0.13,
        })}
      />
      <div
        className="absolute inset-x-0 bottom-0 h-[38%]"
        style={{
          backgroundImage: "linear-gradient(to top, rgba(34,48,44,0.55), transparent)",
        }}
      />
    </>
  ),

  /* Toits de la médina, fin de nuit. */
  toit: (
    <>
      <div
        {...layer({
          backgroundImage:
            "linear-gradient(to bottom, #0a1a1f 0%, #14322f 46%, #4d4030 86%, #8a5c26 100%)",
        })}
      />
      <div
        {...layer({
          backgroundImage:
            "radial-gradient(circle, rgba(244,236,224,0.7) 0.8px, transparent 1.2px)",
          backgroundSize: "46px 52px",
          opacity: 0.22,
        })}
      />
      <div className="absolute inset-x-0 bottom-0 flex h-[42%] items-end gap-[1px]">
        {[0.34, 0.6, 0.28, 0.48, 0.82, 0.4, 0.66, 0.3, 0.55].map((h, i) => (
          <div
            key={i}
            className="flex-1"
            style={{ height: `${h * 100}%`, backgroundColor: "rgba(9,22,22,0.9)" }}
          />
        ))}
      </div>
      <div
        className="absolute inset-x-[34%] bottom-[38%] h-[22%] rounded-t-[999px]"
        style={{ backgroundColor: "rgba(9,22,22,0.9)" }}
      />
    </>
  ),

  /* Lanternes percées : halos chauds dans l'ombre. */
  lanternes: (
    <>
      <div
        {...layer({
          backgroundImage: `linear-gradient(200deg, ${RZ.nuit} 0%, #1a1410 60%, ${RZ.cour} 100%)`,
        })}
      />
      <div
        {...layer({
          backgroundImage: losanges("b07d3a"),
          backgroundSize: "64px 64px",
          opacity: 0.2,
        })}
      />
      {[
        { left: "22%", top: "24%", size: 90 },
        { left: "58%", top: "48%", size: 130 },
        { left: "78%", top: "18%", size: 70 },
        { left: "38%", top: "70%", size: 100 },
      ].map((l, i) => (
        <div
          key={i}
          className="absolute rounded-full blur-xl"
          style={{
            left: l.left,
            top: l.top,
            height: l.size,
            width: l.size,
            backgroundImage:
              "radial-gradient(circle, rgba(232,183,92,0.62), rgba(232,183,92,0) 68%)",
          }}
        />
      ))}
      <div
        {...layer({
          backgroundImage:
            "radial-gradient(110% 90% at 50% 100%, rgba(8,20,18,0.7), transparent 66%)",
        })}
      />
    </>
  ),
};

/**
 * Panneau visuel décoratif. `className` porte la taille / le ratio / l'arrondi ;
 * le contenu est entièrement généré en CSS.
 */
export function VisualPanel({
  variant,
  className = "",
  children,
}: {
  variant: PanelVariant;
  className?: string;
  children?: ReactNode;
}) {
  return (
    <div className={`relative overflow-hidden ${className}`}>
      <div aria-hidden="true" className="absolute inset-0">
        {PANELS[variant]}
      </div>
      {children}
    </div>
  );
}
