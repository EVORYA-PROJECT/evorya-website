"use client";

import { MotionConfig } from "motion/react";
import MobileExperience from "@/components/ui/MobileExperience";
import Access from "./Access";
import { Appointment, SiteFooter } from "./Closing";
import Expertise from "./Expertise";
import Hero from "./Hero";
import Materials from "./Materials";
import Nav from "./Nav";
import { DisplayFontProvider } from "./Primitives";
import Services from "./Services";
import Workshop from "./Workshop";

/**
 * Corps interactif de la démo « Garage Vortex ».
 * `displayClassName` est la classe générée par next/font (Rajdhani) côté
 * serveur : elle est transmise ici puis appliquée individuellement à chaque
 * titre via useDisplayFont().
 */
export default function AutomobileDemo({ displayClassName }: { displayClassName: string }) {
  return (
    <MotionConfig reducedMotion="user">
      <DisplayFontProvider value={displayClassName}>
        <Nav />
        <main data-mobile-page="automobile">
          <MobileExperience />
          <Hero />
          <Services />
          <Materials />
          <Workshop />
          <Expertise />
          <Access />
          <Appointment />
        </main>
        <SiteFooter />
      </DisplayFontProvider>
    </MotionConfig>
  );
}
