import type { Metadata } from "next";
import { Archivo, Inter } from "next/font/google";
import DemoBar, { DEMO_BAR_HEIGHT } from "@/components/templates/DemoBar";
import ImmobilierDemo from "./ImmobilierDemo";

const display = Archivo({ subsets: ["latin"], weight: ["600", "700"] });
const body = Inter({ subsets: ["latin"], weight: ["400", "500"] });

export const metadata: Metadata = {
  title: { absolute: "Atrium Immobilier — Démo Evorya" },
  description: "Démonstration Evorya : direction immobilier.",
  robots: { index: false, follow: true },
};

/**
 * Démonstration sectorielle « Immobilier » — Atrium Immobilier.
 * Marque, biens, prix et coordonnées entièrement fictifs.
 *
 * Ce fichier reste un Server Component (il exporte `metadata`) : toute
 * l'interactivité est déportée dans ImmobilierDemo.
 */
export default function ImmobilierTemplatePage() {
  return (
    <>
      <DemoBar slug="immobilier" />
      {/*
        Filet de sécurité sans JavaScript : globals.css ne force l'affichage
        des blocs [data-reveal] qu'en dessous de 768px. Sans JS, rien ne doit
        rester invisible sur desktop non plus.
      */}
      <noscript>
        <style>{`[data-reveal]{opacity:1!important;transform:none!important;clip-path:none!important}`}</style>
      </noscript>
      <div
        className={`${body.className} min-h-dvh bg-[#FBFAF8] text-[#14181D] antialiased`}
        style={{ paddingTop: DEMO_BAR_HEIGHT }}
      >
        <ImmobilierDemo displayClassName={display.className} />
      </div>
    </>
  );
}
