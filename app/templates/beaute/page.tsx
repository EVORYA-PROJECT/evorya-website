import type { Metadata } from "next";
import { Italiana, Nunito_Sans } from "next/font/google";
import DemoBar, { DEMO_BAR_HEIGHT } from "@/components/templates/DemoBar";
import BeauteDemo from "./BeauteDemo";

/**
 * Démo sectorielle 04 — Beauté / Spa (Institut Soline, marque fictive).
 *
 * Ce fichier reste un Server Component : il ne porte que les metadata, les
 * polices propres à cette démo et les styles scopés. Toute l'interactivité
 * (onglets de la carte, menu mobile, animations) vit dans BeauteDemo.
 */

const display = Italiana({ subsets: ["latin"], weight: ["400"] });
const body = Nunito_Sans({ subsets: ["latin"], weight: ["300", "400", "500"] });

export const metadata: Metadata = {
  title: { absolute: "Institut Soline — Démo Evorya" },
  description: "Démonstration Evorya : direction beauté / spa.",
  robots: { index: false, follow: true },
};

/**
 * Styles scopés à la démo. Trois besoins que Tailwind seul ne couvre pas ici :
 * — le focus global du site Evorya est un contour blanc, invisible sur ce fond
 *   clair : on le repasse en vert sauge ;
 * — un grain discret, en multiply, adapté aux fonds clairs (celui de
 *   globals.css est calibré pour le fond noir) ;
 * — la marge d'ancrage, qui doit tenir compte du bandeau Evorya ET de la barre
 *   collante de l'institut.
 */
const SCOPED_CSS = `
.soline { color-scheme: light; }
.soline :focus-visible {
  outline: 2px solid #5A6754;
  outline-offset: 3px;
  border-radius: 4px;
}
.soline ::selection { background: #DCC9B6; color: #2E2622; }
.soline [id] { scroll-margin-top: 7.5rem; }
.soline-underline {
  text-decoration: underline;
  text-decoration-color: rgba(169, 136, 115, 0.45);
  text-underline-offset: 6px;
  text-decoration-thickness: 1px;
  transition: text-decoration-color 0.4s ease;
}
.soline-underline:hover { text-decoration-color: currentColor; }
.soline-grain::after {
  content: "";
  position: absolute;
  inset: 0;
  pointer-events: none;
  opacity: 0.09;
  mix-blend-mode: multiply;
  background-image: url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='140' height='140'><filter id='g'><feTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='3' stitchTiles='stitch'/></filter><rect width='100%25' height='100%25' filter='url(%23g)'/></svg>");
}
@media (prefers-reduced-motion: reduce) {
  .soline [data-reveal] {
    opacity: 1 !important;
    transform: none !important;
    clip-path: none !important;
  }
  .soline .soline-parallax { transform: none !important; }
}
`;

export default function BeautePage() {
  return (
    <>
      <style>{SCOPED_CSS}</style>
      <DemoBar slug="beaute" />
      <div
        className={`soline ${body.className} min-h-dvh bg-[#F7F3EE] text-[#2E2622] antialiased`}
        style={{ paddingTop: DEMO_BAR_HEIGHT }}
      >
        <BeauteDemo displayClass={display.className} />
      </div>
    </>
  );
}
