import RevealOnScroll from "@/components/ui/RevealOnScroll";
import MobileRail from "@/components/ui/MobileRail";
import SectionLabel from "@/components/ui/SectionLabel";
import MagneticButton from "@/components/ui/MagneticButton";
import TemplateCard from "@/components/templates/TemplateCard";
import { TEMPLATES } from "@/lib/templates/registry";

export default function Templates() {
  return (
    <section
      id="templates"
      className="relative border-t border-line bg-ink px-6 py-28 sm:px-8 lg:px-12 lg:py-40"
    >
      <div className="mx-auto max-w-[1440px]">
        <RevealOnScroll>
          <SectionLabel index="05" label="Templates" />
        </RevealOnScroll>

        <div className="mt-8 flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <RevealOnScroll delay={0.05}>
            <h2 className="max-w-xl text-3xl font-medium tracking-tight text-paper sm:text-4xl lg:text-5xl">
              Six secteurs, six directions différentes.
            </h2>
          </RevealOnScroll>
          <RevealOnScroll delay={0.1}>
            <p className="max-w-sm text-sm text-mist sm:text-base">
              Chaque démo est un faux site client complet, avec sa propre identité —
              pas un même thème décliné en six couleurs.
            </p>
          </RevealOnScroll>
        </div>

        <MobileRail label="Les six directions Evorya" className="mt-12 grid gap-6 sm:grid-cols-2 lg:mt-16 lg:grid-cols-3 lg:gap-8">
          {TEMPLATES.map((template, i) => (
            <RevealOnScroll key={template.slug} delay={0.05 * i}>
              <TemplateCard template={template} />
            </RevealOnScroll>
          ))}
        </MobileRail>

        <RevealOnScroll delay={0.1}>
          <div className="mt-12 flex justify-center lg:mt-16">
            <MagneticButton
              as="a"
              href="/templates"
              className="inline-flex h-14 items-center justify-center border border-line-strong px-10 font-display text-xs uppercase tracking-[0.25em] text-paper transition-colors hover:border-paper"
            >
              Voir tous les templates
            </MagneticButton>
          </div>
        </RevealOnScroll>
      </div>
    </section>
  );
}
