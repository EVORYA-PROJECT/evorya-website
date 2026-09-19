import { MotionConfig } from "motion/react";
import MobileExperience from "@/components/ui/MobileExperience";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import CursorGlow from "@/components/ui/CursorGlow";
import MobileCTA from "@/components/ui/MobileCTA";
import PublicContentSync from "@/components/PublicContentSync";
import Hero from "@/components/sections/Hero";
import About from "@/components/sections/About";
import Services from "@/components/sections/Services";
import WhyEvorya from "@/components/sections/WhyEvorya";
import Offers from "@/components/sections/Offers";
import Templates from "@/components/sections/Templates";
import Transparency from "@/components/sections/Transparency";
import EvoryaFirstTen from "@/components/sections/EvoryaFirstTen";
import Process from "@/components/sections/Process";
import Portfolio from "@/components/sections/Portfolio";
import Faq from "@/components/sections/Faq";
import ProjectScanner from "@/components/sections/ProjectScanner";
import Contact from "@/components/sections/Contact";
import { SHOW_PORTFOLIO } from "@/lib/config";
import { getOffers, getPublishedProjects, getSiteContentMap } from "@/lib/cms/queries";

// Contenu géré depuis /admin (voir lib/cms) : revalidation périodique de
// secours, en plus de la revalidation immédiate déclenchée par chaque
// enregistrement admin (revalidatePath("/") dans lib/cms/actions.ts).
export const revalidate = 300;

export default async function Home() {
  const [{ content }, offers, projects] = await Promise.all([
    getSiteContentMap(),
    getOffers(),
    SHOW_PORTFOLIO ? getPublishedProjects() : Promise.resolve([]),
  ]);

  return (
    <MotionConfig reducedMotion="user">
      <PublicContentSync />
      <CursorGlow />
      <Navbar />
      <main data-mobile-page="evorya">
        <MobileExperience />
        <Hero content={content.hero} />
        <About content={content.studio} />
        <Services content={content.services} />
        <WhyEvorya content={content.why} />
        <Offers offers={offers} />
        <Templates />
        <Transparency content={content.transparency} />
        <EvoryaFirstTen content={content.first10} />
        <Process content={content.process} />
        {SHOW_PORTFOLIO && (
          <Portfolio projects={projects} first10Total={content.first10.total} />
        )}
        <Faq content={content.faq} />
        <ProjectScanner content={content.scanner} />
        <Contact content={content.contact} />
      </main>
      <Footer content={content.footer} />
      <MobileCTA />
    </MotionConfig>
  );
}
