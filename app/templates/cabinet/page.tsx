import type { Metadata } from "next";
import { Frank_Ruhl_Libre, IBM_Plex_Sans } from "next/font/google";
import DemoBar, { DEMO_BAR_HEIGHT } from "@/components/templates/DemoBar";
import CabinetDemo from "./CabinetDemo";
import { C } from "./theme";

/**
 * Démonstration sectorielle 05 — Cabinet / services professionnels.
 *
 * Faux site client complet (marque, équipe et missions fictives), publiquement
 * accessible depuis /templates mais volontairement exclu de l'indexation :
 * il ne doit jamais remonter dans les résultats de recherche à la place du
 * site Evorya, ni être pris pour le site d'un cabinet réel.
 */
export const metadata: Metadata = {
  title: { absolute: "Cabinet Verdon & Associés — Démo Evorya" },
  description: "Démonstration Evorya : direction cabinet / services professionnels.",
  robots: { index: false, follow: true },
};

/** Serif institutionnelle, réservée aux titres (h1/h2/h3) et au monogramme. */
const display = Frank_Ruhl_Libre({ subsets: ["latin"], weight: ["500", "700"] });

/** Grotesque contemporaine, très lisible, pour tout le texte courant. */
const body = IBM_Plex_Sans({ subsets: ["latin"], weight: ["400", "500"] });

export default function CabinetTemplatePage() {
  return (
    <>
      <style>{`@media (prefers-reduced-motion: reduce) {
        .cabinet-scope [data-reveal] { opacity: 1 !important; transform: none !important; clip-path: none !important; }
      }`}</style>
      <DemoBar slug="cabinet" />

      <div
        className={`cabinet-scope ${body.className} min-h-screen antialiased`}
        style={{
          paddingTop: DEMO_BAR_HEIGHT,
          backgroundColor: C.paper,
          color: C.ink,
          // Le site Evorya est en thème sombre (`color-scheme: dark` global) :
          // sans cette bascule, Chrome rendrait les cases à cocher, menus
          // déroulants et champs auto-remplis de cette page claire en sombre.
          colorScheme: "light",
        }}
      >
        <CabinetDemo displayClass={display.className} barOffset={DEMO_BAR_HEIGHT} />
      </div>
    </>
  );
}
