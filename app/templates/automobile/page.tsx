import type { Metadata } from "next";
import { Rajdhani, Barlow } from "next/font/google";
import DemoBar, { DEMO_BAR_HEIGHT } from "@/components/templates/DemoBar";
import AutomobileDemo from "./AutomobileDemo";
import "./vortex.css";

/**
 * Démo sectorielle 06 — Automobile / Garage (« Garage Vortex »).
 * Marque, tarifs et coordonnées entièrement fictifs : la page reste
 * accessible publiquement mais hors index des moteurs de recherche.
 */
export const metadata: Metadata = {
  title: { absolute: "Garage Vortex — Démo Evorya" },
  description: "Démonstration Evorya : direction automobile / garage.",
  robots: { index: false, follow: true },
};

const display = Rajdhani({ subsets: ["latin"], weight: ["600", "700"] });
const body = Barlow({ subsets: ["latin"], weight: ["400", "500"] });

export default function AutomobileTemplatePage() {
  return (
    <>
      <style>{`html { scroll-behavior: auto; }
      @media (prefers-reduced-motion: reduce) {
        .vx [data-reveal] { opacity: 1 !important; transform: none !important; clip-path: none !important; }
      }`}</style>
      <DemoBar slug="automobile" />
      <div className={`vx ${body.className}`} style={{ paddingTop: DEMO_BAR_HEIGHT }}>
        <AutomobileDemo displayClassName={display.className} />
      </div>
    </>
  );
}
