import type { PortfolioEntry, ProjectRow } from "@/lib/cms/types";

// Construit la grille affichée dans la section Portfolio à partir des
// réalisations publiées en base (voir lib/cms/queries.ts::getPublishedProjects) :
// - les `total` premières positions montrent un projet "Evorya First 10"
//   (foundingProject: true) s'il existe, sinon un emplacement "à venir" ;
// - les projets suivants (founding_project: false) s'ajoutent ensuite, dans
//   l'ordre de tri défini en admin.
export function buildPortfolioEntries(projects: ProjectRow[], total: number): PortfolioEntry[] {
  const foundingProjects = projects.filter((p) => p.founding_project);
  const laterProjects = projects.filter((p) => !p.founding_project);

  const foundingEntries: PortfolioEntry[] = Array.from({ length: total }, (_, i) => {
    const position = i + 1;
    const index = String(position).padStart(2, "0");
    const project = foundingProjects[i];

    return project
      ? ({ kind: "project", index, project } as const)
      : ({ kind: "placeholder", index } as const);
  });

  const laterEntries: PortfolioEntry[] = laterProjects.map((project, i) => ({
    kind: "project",
    index: String(total + i + 1).padStart(2, "0"),
    project,
  }));

  return [...foundingEntries, ...laterEntries];
}
