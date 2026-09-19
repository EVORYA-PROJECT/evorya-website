"use client";

import { useCallback, useState } from "react";
import MobileExperience from "@/components/ui/MobileExperience";
import { MotionConfig } from "motion/react";
import { FEATURED_ID, PROPERTIES } from "./data";
import { DisplayFontProvider } from "./ui";
import SiteHeader from "./sections/SiteHeader";
import Hero from "./sections/Hero";
import Listings from "./sections/Listings";
import PropertyDetail from "./sections/PropertyDetail";
import Notebook from "./sections/Notebook";
import Gallery from "./sections/Gallery";
import Agency from "./sections/Agency";
import Services from "./sections/Services";
import Contact from "./sections/Contact";
import SiteFooter from "./sections/SiteFooter";

const featured = PROPERTIES.find((p) => p.id === FEATURED_ID) ?? PROPERTIES[0];

/**
 * Atrium Immobilier — faux site client complet (démonstration Evorya).
 * Toute l'interactivité vit ici pour que page.tsx reste un Server Component
 * et puisse exporter `metadata`.
 */
export default function ImmobilierDemo({ displayClassName }: { displayClassName: string }) {
  const [selectedId, setSelectedId] = useState(featured.id);
  const selected = PROPERTIES.find((p) => p.id === selectedId) ?? featured;

  const openProperty = useCallback((id: string) => {
    setSelectedId(id);
    if (typeof window === "undefined") return;
    const target = document.getElementById("bien");
    if (!target) return;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    target.scrollIntoView({ behavior: reduced ? "auto" : "smooth", block: "start" });
  }, []);

  return (
    <DisplayFontProvider className={displayClassName}>
      <MotionConfig reducedMotion="user">
        <SiteHeader />
        <main data-mobile-page="immobilier">
          <MobileExperience />
          {/* Le <h1> unique de la page vit dans le Hero. */}
          <Hero featured={featured} onOpen={openProperty} />
          <Listings selectedId={selectedId} onOpen={openProperty} />
          <PropertyDetail property={selected} onSelect={setSelectedId} />
          <Notebook />
          <Gallery />
          <Agency />
          <Services />
          <Contact />
        </main>
        <SiteFooter />
      </MotionConfig>
    </DisplayFontProvider>
  );
}
