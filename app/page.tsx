import { MotionConfig } from "motion/react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import CursorGlow from "@/components/ui/CursorGlow";
import PublicContentSync from "@/components/PublicContentSync";
import Hero from "@/components/sections/Hero";
import About from "@/components/sections/About";
import Services from "@/components/sections/Services";
import Offers from "@/components/sections/Offers";
import Transparency from "@/components/sections/Transparency";
import EvoryaFirstTen from "@/components/sections/EvoryaFirstTen";
import Process from "@/components/sections/Process";
import Portfolio from "@/components/sections/Portfolio";
import Contact from "@/components/sections/Contact";
import { getOffers, getPublishedProjects, getSiteContentMap } from "@/lib/cms/queries";

// Contenu géré depuis /admin (voir lib/cms) : revalidation périodique de
// secours, en plus de la revalidation immédiate déclenchée par chaque
// enregistrement admin (revalidatePath("/") dans lib/cms/actions.ts).
export const revalidate = 300;

export default async function Home() {
  const [{ content }, offers, projects] = await Promise.all([
    getSiteContentMap(),
    getOffers(),
    getPublishedProjects(),
  ]);

  return (
    <MotionConfig reducedMotion="user">
      <PublicContentSync />
      <CursorGlow />
      <Navbar />
      <main>
        <Hero content={content.hero} />
        <About content={content.studio} />
        <Services content={content.services} />
        <Offers offers={offers} />
        <Transparency content={content.transparency} />
        <EvoryaFirstTen content={content.first10} />
        <Process content={content.process} />
        <Portfolio projects={projects} first10Total={content.first10.total} />
        <Contact content={content.contact} offers={offers} />
      </main>
      <Footer content={content.footer} />
    </MotionConfig>
  );
}
