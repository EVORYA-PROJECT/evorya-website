import Image from "next/image";
import RevealOnScroll from "@/components/ui/RevealOnScroll";
import SectionLabel from "@/components/ui/SectionLabel";
import { buildPortfolioEntries } from "@/lib/data/projects";
import { getProjectImagePublicUrl } from "@/lib/cms/storage";
import type { ProjectRow } from "@/lib/cms/types";

function ProjectMeta({ project }: { project: ProjectRow }) {
  const meta = [project.sector, project.project_date].filter(Boolean);
  if (meta.length === 0) return null;
  return (
    <span className="relative font-display text-[11px] uppercase tracking-[0.2em] text-mist-dim">
      {meta.join(" — ")}
    </span>
  );
}

/**
 * Carte compacte utilisée sur mobile : uniquement les réalisations réelles,
 * jamais de placeholder "à venir" ici (voir le compteur compact plus bas).
 * Desktop conserve son propre rendu (grille avec emplacements vides), voir
 * plus bas dans ce fichier.
 */
function MobileProjectCard({ project, index }: { project: ProjectRow; index: string }) {
  const imageUrl = getProjectImagePublicUrl(project.image_path);
  return (
    <a
      href={project.link || undefined}
      target={project.link ? "_blank" : undefined}
      rel={project.link ? "noopener noreferrer" : undefined}
      className="group relative flex overflow-hidden border border-line bg-ink active:bg-paper/[0.04]"
    >
      <span className="relative block aspect-square w-28 shrink-0 overflow-hidden border-r border-line bg-ink-soft">
        {imageUrl && (
          <Image
            src={imageUrl}
            alt=""
            fill
            sizes="112px"
            className="object-cover opacity-80"
          />
        )}
      </span>
      <span className="flex flex-1 flex-col justify-center gap-1.5 px-5 py-4">
        <span className="font-display text-[11px] uppercase tracking-[0.25em] text-mist-dim">
          Projet {index}
        </span>
        <span className="font-display text-sm uppercase tracking-[0.15em] text-paper">
          {project.name}
        </span>
        <ProjectMeta project={project} />
        {project.link && (
          <span className="mt-1 inline-flex items-center gap-1.5 text-xs text-mist transition-colors group-hover:text-paper">
            Voir le projet
            <span aria-hidden="true">→</span>
          </span>
        )}
      </span>
    </a>
  );
}

export default function Portfolio({
  projects,
  first10Total,
}: {
  projects: ProjectRow[];
  first10Total: number;
}) {
  const entries = buildPortfolioEntries(projects, first10Total);
  const foundingCount = projects.filter((p) => p.founding_project).length;
  const remainingSlots = Math.max(0, first10Total - foundingCount);

  return (
    <section
      id="realisations"
      className="relative border-t border-line bg-ink px-6 py-28 sm:px-8 lg:px-12 lg:py-40"
    >
      <div className="mx-auto max-w-[1440px]">
        <RevealOnScroll>
          <SectionLabel index="08" label="Portfolio" />
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

        {/* Mobile/tablette (< lg) : uniquement les vraies réalisations, jamais
            une succession de gros emplacements vides. */}
        <div className="mt-12 flex flex-col gap-3 lg:hidden">
          {projects.length === 0 ? (
            <RevealOnScroll>
              <div className="flex flex-col gap-2 border border-line px-6 py-10 text-center">
                <span className="font-display text-xs uppercase tracking-[0.25em] text-mist-dim">
                  Portfolio en construction
                </span>
                <p className="mx-auto max-w-xs text-sm text-mist">
                  Les premières réalisations Evorya First 10 seront présentées ici dès leur mise en ligne.
                </p>
              </div>
            </RevealOnScroll>
          ) : (
            projects.map((project, i) => (
              <RevealOnScroll key={project.id} delay={Math.min(i, 4) * 0.05}>
                <MobileProjectCard project={project} index={String(i + 1).padStart(2, "0")} />
              </RevealOnScroll>
            ))
          )}

          {remainingSlots > 0 && (
            <RevealOnScroll delay={0.1}>
              <div className="mt-1 flex items-center justify-between border border-dashed border-line-strong px-6 py-5">
                <span className="font-display text-2xl text-paper">
                  {String(foundingCount).padStart(2, "0")}
                  <span className="text-mist-dim"> / {String(first10Total).padStart(2, "0")}</span>
                </span>
                <span className="max-w-[9rem] text-right font-display text-[11px] uppercase leading-relaxed tracking-[0.2em] text-mist-dim">
                  Projets à venir
                </span>
              </div>
            </RevealOnScroll>
          )}
        </div>

        {/* Desktop/tablette large (>= lg) : composition grille existante,
            emplacements "à venir" inclus. */}
        <div className="mt-16 hidden grid-cols-1 gap-px border border-line bg-line sm:grid-cols-2 lg:mt-20 lg:grid lg:grid-cols-5">
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
                  <span className="relative flex flex-col gap-1">
                    <span className="font-display text-sm uppercase tracking-[0.25em] text-paper">
                      {entry.project.name}
                    </span>
                    <ProjectMeta project={entry.project} />
                    {entry.project.link && (
                      <span className="mt-1 inline-flex items-center gap-1.5 font-display text-[10px] uppercase tracking-[0.2em] text-mist-dim opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                        Voir le projet →
                      </span>
                    )}
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
