import type { Metadata } from "next";
import MobileExperience from "@/components/ui/MobileExperience";
import { MotionConfig } from "motion/react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import CursorGlow from "@/components/ui/CursorGlow";
import PublicContentSync from "@/components/PublicContentSync";
import RevealOnScroll from "@/components/ui/RevealOnScroll";
import SectionLabel from "@/components/ui/SectionLabel";
import TemplateIndexRow from "@/components/templates/TemplateIndexRow";
import { TEMPLATES } from "@/lib/templates/registry";
import { getSiteContentMap } from "@/lib/cms/queries";

export const metadata: Metadata = {
  title: "Templates",
  description:
    "Six démonstrations sectorielles pensées comme de vrais sites clients, chacune avec sa propre direction artistique.",
};

export const revalidate = 300;

export default async function TemplatesPage() {
  const { content } = await getSiteContentMap();

  return (
    <MotionConfig reducedMotion="user">
      <PublicContentSync />
      <CursorGlow />
      <Navbar />
      <main data-mobile-page="templates">
        <MobileExperience />
        <section className="bg-noise relative overflow-hidden border-b border-line bg-ink px-6 pt-32 pb-20 sm:px-8 lg:px-12 lg:pt-40 lg:pb-28">
          <div
            aria-hidden="true"
            className="bg-grid pointer-events-none absolute inset-0 opacity-30"
          />
          <div className="relative mx-auto max-w-[1440px]">
            <RevealOnScroll>
              <SectionLabel index="—" label="Templates" />
            </RevealOnScroll>
            <RevealOnScroll delay={0.05}>
              <h1 className="mt-8 max-w-2xl text-4xl font-medium tracking-tight text-paper sm:text-5xl lg:text-6xl">
                Des directions pensées secteur par secteur.
              </h1>
            </RevealOnScroll>
            <RevealOnScroll delay={0.1}>
              <p className="mt-6 max-w-xl text-base text-mist sm:text-lg">
                Chaque démo ci-dessous est un vrai faux site client, pas une palette de
                couleurs appliquée à une même structure. Ouvrez celle qui correspond à
                votre activité pour voir concrètement le niveau de conception qu&rsquo;Evorya
                peut apporter au vôtre.
              </p>
            </RevealOnScroll>
          </div>
        </section>

        <section className="border-b border-line bg-ink px-6 py-4 sm:px-8 lg:px-12">
          <div className="mx-auto max-w-[1440px]">
            {TEMPLATES.map((template, i) => (
              <RevealOnScroll key={template.slug} delay={0.05 * i}>
                <TemplateIndexRow template={template} />
              </RevealOnScroll>
            ))}
          </div>
        </section>
      </main>
      <Footer content={content.footer} />
    </MotionConfig>
  );
}
