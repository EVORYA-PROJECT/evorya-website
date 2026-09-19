import type { Metadata } from "next";
import { Anton, Sora } from "next/font/google";
import DemoBar, { DEMO_BAR_HEIGHT } from "@/components/templates/DemoBar";
import KrushDemo from "./KrushDemo";

/**
 * Démo sectorielle 01 — Fast-food / Restauration rapide (« KRUSH »).
 * Enseigne, carte, prix et adresses entièrement fictifs : la page reste
 * accessible publiquement mais hors index des moteurs de recherche.
 */

/** Display : condensée, très haute, faite pour les titres en pleine largeur. */
const display = Anton({ subsets: ["latin"], weight: ["400"], display: "swap" });
/** Courante : grotesque moderne, lisible en petit comme en gras. */
const body = Sora({ subsets: ["latin"], weight: ["400", "500", "600", "700"], display: "swap" });

export const metadata: Metadata = {
  title: { absolute: "KRUSH — Démo Evorya" },
  description: "Démonstration Evorya : direction fast-food / restauration rapide.",
  robots: { index: false, follow: true },
};

/**
 * CSS portée par la démo uniquement (préfixe `.krush`), pour ne jamais fuir
 * sur le site Evorya lui-même. Le marquee est une animation CSS pure : un
 * défilement continu ne doit rien coûter à React, et il se fige de lui-même
 * sous `prefers-reduced-motion`.
 */
const scopedCss = `
.krush { background-color:#0B0B0C; color:#F4EFE6; }
body:has(.krush) { background-color:#0B0B0C; }
.krush :focus-visible { outline:2px solid #FF3B1F; outline-offset:3px; border-radius:2px; }
.krush ::selection { background:#FF3B1F; color:#0B0B0C; }
.krush [id] { scroll-margin-top: calc(2.75rem + env(safe-area-inset-top) + 4.5rem); }
.krush-outline { color:transparent; -webkit-text-stroke:1px rgba(244,239,230,0.38); }
.krush-outline-accent { color:transparent; -webkit-text-stroke:1px rgba(255,59,31,0.75); }
.krush-vert { writing-mode:vertical-rl; text-orientation:mixed; }
.krush-track { display:flex; width:max-content; will-change:transform; animation:krush-slide var(--krush-dur,28s) linear infinite; }
.krush-track-rev { animation-direction:reverse; }
@keyframes krush-slide { from { transform:translate3d(0,0,0); } to { transform:translate3d(-50%,0,0); } }

/*
 * Entrée du hero, en CSS et non en JavaScript.
 *
 * Motion pose ses styles \`initial\` dans le HTML rendu côté serveur : un hero
 * animé au montage reste donc invisible (opacity:0, clip-path plein) tant que
 * l'hydratation n'a pas eu lieu. Sur une connexion lente, la première chose
 * que voit le visiteur est un écran noir — inacceptable pour la première
 * image de la page.
 *
 * Ici l'état FINAL est l'état par défaut de l'élément, et l'animation part
 * d'un état masqué grâce à \`animation-fill-mode: backwards\`. La page est donc
 * correcte dès la première peinture, sans JavaScript, et \`prefers-reduced-motion\`
 * se contente de couper l'animation.
 */
@keyframes krush-rise { from { opacity:0; transform:translate3d(0,18px,0); } }
@keyframes krush-line { from { transform:translate3d(0,130%,0); } }
@keyframes krush-curtain { from { clip-path:inset(0 0 100% 0); transform:scale(1.08); } }
@keyframes krush-curtain-up { from { clip-path:inset(100% 0 0 0); transform:scale(1.06); } }
.krush-anim { animation-duration:.7s; animation-timing-function:cubic-bezier(.16,1,.3,1); animation-fill-mode:backwards; }
.krush-rise { animation-name:krush-rise; }
.krush-line { animation-name:krush-line; animation-duration:.95s; }
.krush-curtain { animation-name:krush-curtain; animation-duration:1.1s; }
.krush-curtain-up { animation-name:krush-curtain-up; animation-duration:.9s; }

@media (prefers-reduced-motion: reduce) {
  .krush-track { animation:none; transform:none; }
  .krush-anim { animation:none !important; }
}
`;

export default function RestaurantTemplatePage() {
  return (
    <>
      <style>{scopedCss}</style>
      <DemoBar slug="restaurant" />
      <div
        className={`krush ${body.className} min-h-dvh overflow-x-clip antialiased`}
        style={{ paddingTop: DEMO_BAR_HEIGHT }}
      >
        <KrushDemo displayClass={display.className} topOffset={DEMO_BAR_HEIGHT} />
      </div>
    </>
  );
}
