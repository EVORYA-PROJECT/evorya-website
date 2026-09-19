"use client";

import { useState } from "react";
import MobileExperience from "@/components/ui/MobileExperience";
import { AnimatePresence, MotionConfig, motion, useMotionValueEvent, useScroll } from "motion/react";
import SiteHeader from "./sections/SiteHeader";
import Hero from "./sections/Hero";
import Marquee from "./sections/Marquee";
import BestSellers from "./sections/BestSellers";
import Signature from "./sections/Signature";
import MenuBoard from "./sections/MenuBoard";
import Crispy from "./sections/Crispy";
import LoadedFries from "./sections/LoadedFries";
import Fresh from "./sections/Fresh";
import FoodWall from "./sections/FoodWall";
import Spots from "./sections/Spots";
import FinalCta from "./sections/FinalCta";
import SiteFooter from "./sections/SiteFooter";

/**
 * Hauteur réelle de la barre d'action mobile : padding-haut (0.75rem) +
 * bouton (52px) + padding-bas (0.75rem + encoche). Doit rester en phase avec
 * les classes du composant ci-dessous — un spacer figé recouvrirait la
 * dernière ligne du pied de page sur les téléphones à encoche.
 */
const MOBILE_BAR_HEIGHT = "calc(0.75rem + 52px + 0.75rem + env(safe-area-inset-bottom))";

/**
 * Barre d'action mobile : une fois le hero dépassé, les deux gestes utiles
 * restent à portée de pouce. Jamais affichée sur desktop, où l'en-tête
 * collant suffit. Aucun geste transactionnel : on envoie vers la carte et
 * vers les adresses, jamais vers un faux panier.
 */
function MobileActionBar() {
  const [visible, setVisible] = useState(false);
  const { scrollY } = useScroll();

  useMotionValueEvent(scrollY, "change", (v) => setVisible(v > 560));

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ y: "120%" }}
          animate={{ y: "0%" }}
          exit={{ y: "120%" }}
          transition={{ duration: 0.35, ease: [0.22, 0.61, 0.36, 1] }}
          className="fixed inset-x-0 bottom-0 z-40 flex items-center gap-2 border-t border-[#F4EFE6]/12 bg-[#0B0B0C]/95 px-4 py-3 backdrop-blur-md lg:hidden"
          style={{ paddingBottom: "calc(0.75rem + env(safe-area-inset-bottom))" }}
        >
          <a
            href="#menu"
            className="flex min-h-[52px] flex-1 items-center justify-center bg-[#FF3B1F] px-5 text-[12px] font-bold uppercase tracking-[0.16em] text-[#0B0B0C] transition-transform duration-200 active:scale-[0.97]"
          >
            Voir le menu
          </a>
          <a
            href="#spots"
            className="flex min-h-[52px] flex-1 items-center justify-center border border-[#F4EFE6]/30 px-5 text-[12px] font-bold uppercase tracking-[0.16em] text-[#F4EFE6] transition-transform duration-200 active:scale-[0.97]"
          >
            Nous trouver
          </a>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export default function KrushDemo({
  displayClass,
  topOffset,
}: {
  displayClass: string;
  topOffset: string;
}) {
  return (
    <MotionConfig reducedMotion="user">
      <SiteHeader d={displayClass} topOffset={topOffset} />
      <main data-mobile-page="restaurant">
        <MobileExperience />
        <Hero d={displayClass} />
        <Marquee d={displayClass} />
        <BestSellers d={displayClass} />
        <Signature d={displayClass} />
        <MenuBoard d={displayClass} />
        <Crispy d={displayClass} />
        <LoadedFries d={displayClass} />
        <Fresh d={displayClass} />
        <FoodWall d={displayClass} />
        <Spots d={displayClass} />
        <FinalCta d={displayClass} />
      </main>
      <SiteFooter d={displayClass} />
      <div aria-hidden="true" className="lg:hidden" style={{ height: MOBILE_BAR_HEIGHT }} />
      <MobileActionBar />
      {/* TEMP DEBUG — expose window.__krushDebug(), à retirer après diagnostic */}
    </MotionConfig>
  );
}
