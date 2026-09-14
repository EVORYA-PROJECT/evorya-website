import Image from "next/image";
import RevealOnScroll from "@/components/ui/RevealOnScroll";
import SectionLabel from "@/components/ui/SectionLabel";
import { buildPortfolioEntries } from "@/lib/data/projects";
import { getProjectImagePublicUrl } from "@/lib/cms/storage";
import type { ProjectRow } from "@/lib/cms/types";

export default function Portfolio({
  projects,
  first10Total,
}: {
  projects: ProjectRow[];
  first10Total: number;
}) {
  const entries = buildPortfolioEntries(projects, first10Total);

  return (
    <section
      id="realisations"
      className="relative border-t border-line bg-ink px-6 py-28 sm:px-8 lg:px-12 lg:py-40"
    >
      <div className="mx-auto max-w-[1440px]">
        <RevealOnScroll>
          <SectionLabel index="07" label="Portfolio" />
        </RevealOnScroll>

        <div className="mt-8 flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <RevealOnScroll delay={0.05}>
            <h2 className="max-w-2xl text-3xl font-medium tracking-tight text-paper sm:text-4xl lg:text-5xl">
              Nos réalisations
            </h2>
          </RevealOnScroll>
          <RevealOnScroll delay={0.1}>
            <p className="max-w-sm text-sm text-mist sm:text-base">
              Evorya construit son portfolio à partir de ses projets de
              lancement, Evorya First 10.
            </p>
          </RevealOnScroll>
        </div>

        <div className="mt-16 grid grid-cols-1 gap-px border border-line bg-line sm:grid-cols-2 lg:mt-20 lg:grid-cols-5">
          {entries.map((entry, i) => (
            <RevealOnScroll key={entry.index} delay={(i % 5) * 0.05} className="h-full">
              {entry.kind === "project" ? (
                <a
                  href={entry.project.link || undefined}
                  target={entry.project.link ? "_blank" : undefined}
                  rel={entry.project.link ? "noopener noreferrer" : undefined}
                  className="group relative flex aspect-[4/5] flex-col justify-between overflow-hidden bg-ink p-6 transition-colors duration-500 hover:bg-paper/[0.03]"
                >
                  {entry.project.image_path && (
                    <Image
                      src={getProjectImagePublicUrl(entry.project.image_path) ?? ""}
                      alt={entry.project.name}
                      fill
                      sizes="(max-width: 640px) 50vw, 20vw"
                      className="absolute inset-0 object-cover opacity-70 transition-opacity duration-500 group-hover:opacity-90"
                    />
                  )}
                  <span className="relative font-display text-xs uppercase tracking-[0.25em] text-mist-dim">
                    Projet {entry.index}
                  </span>
                  <span className="relative font-display text-sm uppercase tracking-[0.25em] text-paper">
                    {entry.project.name}
                  </span>
                </a>
              ) : (
                <div className="group relative flex aspect-[4/5] flex-col justify-between overflow-hidden bg-ink p-6 transition-colors duration-500 hover:bg-paper/[0.03]">
                  <div
                    aria-hidden="true"
                    className="absolute inset-0 opacity-[0.35] transition-opacity duration-500 group-hover:opacity-60"
                    style={{
                      backgroundImage:
                        "repeating-linear-gradient(135deg, rgba(242,242,242,0.05) 0px, rgba(242,242,242,0.05) 1px, transparent 1px, transparent 14px)",
                    }}
                  />
                  <span className="relative font-display text-xs uppercase tracking-[0.25em] text-mist-dim">
                    Projet {entry.index}
                  </span>
                  <span className="relative font-display text-sm uppercase tracking-[0.25em] text-paper-dim/70">
                    À venir
                  </span>
                </div>
              )}
            </RevealOnScroll>
          ))}
        </div>
      </div>
    </section>
  );
}
