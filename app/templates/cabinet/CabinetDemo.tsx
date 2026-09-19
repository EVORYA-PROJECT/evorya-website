"use client";

import Link from "next/link";
import MobileExperience from "@/components/ui/MobileExperience";
import { MotionConfig } from "motion/react";
import { useTemplateSelection } from "@/lib/templates/selection-context";
import { DemoProvider } from "./primitives";
import { C } from "./theme";
import SiteHeader from "./sections/SiteHeader";
import Hero from "./sections/Hero";
import About from "./sections/About";
import Expertise from "./sections/Expertise";
import Interlude from "./sections/Interlude";
import Method from "./sections/Method";
import Missions from "./sections/Missions";
import Team from "./sections/Team";
import Faq from "./sections/Faq";
import Contact from "./sections/Contact";
import SiteFooter from "./sections/SiteFooter";

/**
 * Racine cliente de la démonstration « Cabinet Verdon & Associés ».
 *
 * page.tsx reste un Server Component (metadata, next/font) et transmet ici la
 * classe de la police display ainsi que la hauteur du bandeau Evorya, que les
 * sections lisent via le contexte de démo.
 */
export default function CabinetDemo({
  displayClass,
  barOffset,
}: {
  displayClass: string;
  barOffset: string;
}) {
  const { select } = useTemplateSelection();
  return (
    <MotionConfig reducedMotion="user">
      <DemoProvider value={{ displayClass, barOffset }}>
        <SiteHeader />
        <main data-mobile-page="cabinet">
          <MobileExperience />
          <Hero />
          <About />
          <Expertise />
          <Interlude />
          <Method />
          <Missions />
          <Team />
          <Faq />
          <Contact />
        </main>
        <SiteFooter />

        {/* Bandeau Evorya de bas de page : couche agence assumée, hors charte
            du faux cabinet, en écho au DemoBar fixé en haut de l'écran. */}
        <aside
          className="border-t border-white/10 bg-black px-5 py-5 sm:px-8 lg:px-12"
          aria-label="À propos de cette démonstration"
        >
          <div className="mx-auto flex max-w-[1320px] flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <p className="text-[12px] leading-relaxed text-white/60">
              Démonstration sectorielle réalisée par Evorya — cabinet, marque et
              missions entièrement fictifs.
            </p>
            <Link
              href="/#contact"
              onClick={() => select("cabinet")}
              className="inline-flex h-11 shrink-0 items-center justify-center border border-white/40 px-5 text-[10px] uppercase tracking-[0.2em] text-white transition-colors hover:bg-white hover:text-black"
              style={{ letterSpacing: "0.2em" }}
            >
              Cette direction m&rsquo;intéresse
            </Link>
          </div>
        </aside>

        {/*
          Surcharges locales : le site Evorya est en thème sombre (globals.css
          impose une sélection claire et un focus blanc). Sur cette page claire,
          ces deux réglages seraient illisibles.
        */}
        <style>{`
          .cabinet-scope :focus-visible {
            outline: 2px solid ${C.ink};
            outline-offset: 3px;
          }
          .cabinet-scope ::selection {
            background: ${C.ink};
            color: ${C.paper};
          }
          .cabinet-scope #methode :focus-visible,
          .cabinet-scope footer :focus-visible {
            outline-color: ${C.paper};
          }
        `}</style>
      </DemoProvider>
    </MotionConfig>
  );
}
