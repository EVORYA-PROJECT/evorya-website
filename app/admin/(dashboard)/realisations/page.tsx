import ProjectsAdminList from "@/components/admin/cms/ProjectsAdminList";
import { getAllProjectsAdmin } from "@/lib/cms/queries";
import type { ProjectRow } from "@/lib/cms/types";

export default async function AdminRealisationsPage() {
  let projects: ProjectRow[] = [];
  let error: string | null = null;

  try {
    projects = await getAllProjectsAdmin();
  } catch (err) {
    error = err instanceof Error ? err.message : "Erreur inconnue";
  }

  return (
    <div>
      <h1 className="text-2xl font-medium text-paper sm:text-3xl">Réalisations</h1>
      <p className="mt-2 text-sm text-mist">
        Les réalisations publiées apparaissent automatiquement dans la section
        Portfolio du site public.
      </p>

      <div className="mt-10">
        {error ? (
          <div className="border border-line-strong p-8">
            <p className="font-display text-sm uppercase tracking-[0.2em] text-danger">
              Données indisponibles
            </p>
            <p className="mt-3 max-w-xl text-sm leading-relaxed text-mist">
              Les réalisations n&rsquo;ont pas pu être chargées ({error}). Vérifiez
              que la table <code className="text-paper-dim">projects</code> a bien
              été créée à l&rsquo;aide du script SQL fourni.
            </p>
          </div>
        ) : (
          <ProjectsAdminList initial={projects} />
        )}
      </div>
    </div>
  );
}
