import type { Metadata } from "next";
import { Cormorant_Garamond, Jost } from "next/font/google";
import DemoBar, { DEMO_BAR_HEIGHT } from "@/components/templates/DemoBar";
import HotelDemo from "./HotelDemo";

/**
 * Démonstration sectorielle « Hôtel / Riad » — Riad Zellige.
 *
 * Page publiquement accessible (un prospect doit pouvoir l'ouvrir depuis
 * /templates) mais volontairement désindexée : l'établissement est fictif et
 * n'a rien à faire dans les résultats de recherche.
 *
 * Ce fichier reste un Server Component pour exporter `metadata` et charger les
 * polices ; toute l'interactivité vit dans HotelDemo (client).
 */

const display = Cormorant_Garamond({ subsets: ["latin"], weight: ["500", "600"] });
const body = Jost({ subsets: ["latin"], weight: ["300", "400", "500"] });

export const metadata: Metadata = {
  title: { absolute: "Riad Zellige — Démo Evorya" },
  description: "Démonstration Evorya : direction hôtellerie / riad.",
  robots: { index: false, follow: true },
};

export default function HotelTemplatePage() {
  return (
    <>
      <DemoBar slug="hotel" />
      {/*
        Le focus global du site Evorya est un filet blanc : invisible sur les
        sections de chaux du riad. On le remplace ici par l'ocre de la marque,
        lisible aussi bien sur le vert profond que sur le fond clair.
      */}
      <style>{`
        [data-riad] :focus-visible { outline: 2px solid #b07d3a; outline-offset: 3px; }
        [data-riad] ::selection { background-color: #d8c9a3; color: #0c1f1c; }
        [data-riad] .rz-link { transition: color 400ms ease; }
        [data-riad] .rz-link:hover { color: #f4ece0; }
        @media (prefers-reduced-motion: reduce) {
          [data-riad] [data-reveal] {
            opacity: 1 !important;
            transform: none !important;
            clip-path: none !important;
            transition: none !important;
          }
        }
      `}</style>
      <div
        data-riad
        className={`${body.className} bg-[#0c1f1c] antialiased`}
        style={{ paddingTop: DEMO_BAR_HEIGHT }}
      >
        <HotelDemo display={display.className} />
      </div>
    </>
  );
}
