import type { Metadata } from "next";
import { MotionConfig } from "motion/react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import CursorGlow from "@/components/ui/CursorGlow";
import PublicContentSync from "@/components/PublicContentSync";
import RevealOnScroll from "@/components/ui/RevealOnScroll";
import SectionLabel from "@/components/ui/SectionLabel";
import { SITE } from "@/lib/config";
import { TERMS_DISCLAIMER, TERMS_INTRO, TERMS_SECTIONS, TERMS_UPDATED_AT } from "@/lib/data/terms";
import { getSiteContentMap } from "@/lib/cms/queries";

export const metadata: Metadata = {
  title: "Conditions du projet",
  description: TERMS_INTRO,
};

export default async function ConditionsPage() {
  const { content } = await getSiteContentMap();

  return (
    <MotionConfig reducedMotion="user">
      <PublicContentSync />
      <CursorGlow />
      <Navbar />
      <main>
        <section className="bg-noise relative overflow-hidden border-b border-line bg-ink px-6 pt-32 pb-20 sm:px-8 lg:px-12 lg:pt-40 lg:pb-28">
          <div
            aria-hidden="true"
            className="bg-grid pointer-events-none absolute inset-0 opacity-30"
          />
          <div className="relative mx-auto max-w-[1440px]">
            <div className="flex items-center justify-between font-display text-[10px] uppercase tracking-[0.3em] text-mist">
              <span>EVORYA® — DIGITAL EXPERIENCE STUDIO</span>
              <span className="hidden sm:inline">EST. {TERMS_UPDATED_AT}</span>
            </div>

            <RevealOnScroll delay={0.05}>
              <SectionLabel index="—" label="Conditions" />
            </RevealOnScroll>

            <RevealOnScroll delay={0.1}>
              <h1 className="mt-8 max-w-3xl text-[2.6rem] font-medium leading-[1.05] tracking-tight text-paper sm:text-6xl lg:text-7xl">
                Conditions du projet.
              </h1>
            </RevealOnScroll>

            <RevealOnScroll delay={0.15}>
              <p className="mt-8 max-w-xl text-base leading-relaxed text-mist sm:text-lg">
                {TERMS_INTRO}
              </p>
            </RevealOnScroll>
          </div>
        </section>

        <section className="relative bg-ink px-6 py-20 sm:px-8 lg:px-12 lg:py-28">
          <div className="mx-auto max-w-[1440px]">
            <div className="flex flex-col divide-y divide-line border-y border-line">
              {TERMS_SECTIONS.map((section, i) => (
                <RevealOnScroll key={section.index} delay={Math.min(0.3, i * 0.04)}>
                  <div className="grid grid-cols-1 gap-4 py-10 sm:py-12 lg:grid-cols-12 lg:gap-8">
                    <div className="lg:col-span-4">
                      <span className="font-display text-4xl text-mist-dim sm:text-5xl">
                        {section.index}
                      </span>
                      <h2 className="mt-4 font-display text-lg uppercase tracking-[0.1em] text-paper sm:text-xl">
                        {section.title}
                      </h2>
                    </div>
                    <div className="flex flex-col gap-3 lg:col-span-8">
                      {section.body.map((paragraph, j) => (
                        <p
                          key={j}
                          className="max-w-2xl text-base leading-relaxed text-mist"
                        >
                          {paragraph}
                        </p>
                      ))}
                    </div>
                  </div>
                </RevealOnScroll>
              ))}
            </div>

            <RevealOnScroll delay={0.1}>
              <p className="mx-auto mt-12 max-w-2xl text-center text-xs leading-relaxed text-mist-dim">
                {TERMS_DISCLAIMER}
              </p>
            </RevealOnScroll>

            <RevealOnScroll delay={0.15}>
              <div className="mx-auto mt-16 flex max-w-2xl flex-col items-center gap-4 border border-line p-8 text-center sm:p-10">
                <span className="font-display text-xs uppercase tracking-[0.3em] text-mist-dim">
                  Une question ?
                </span>
                <p className="text-base text-paper-dim">
                  Écrivez-nous directement, nous répondons rapidement.
                </p>
                <a
                  href={`mailto:${SITE.email}`}
                  className="font-display text-lg uppercase tracking-[0.1em] text-paper underline decoration-line-strong decoration-1 underline-offset-4 transition-colors hover:decoration-paper"
                >
                  {SITE.email}
                </a>
              </div>
            </RevealOnScroll>
          </div>
        </section>
      </main>
      <Footer content={content.footer} />
    </MotionConfig>
  );
}
