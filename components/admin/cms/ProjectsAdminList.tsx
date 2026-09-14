"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Modal from "@/components/ui/Modal";
import ProjectFormModal, { type ProjectFormValues } from "@/components/admin/cms/ProjectFormModal";
import { createProject, deleteProject, reorderProjects, updateProject } from "@/lib/cms/actions";
import { getProjectImagePublicUrl } from "@/lib/cms/storage";
import { createSupabaseBrowserClient } from "@/lib/supabase/client";
import type { ProjectRow } from "@/lib/cms/types";

export default function ProjectsAdminList({ initial }: { initial: ProjectRow[] }) {
  const router = useRouter();
  const [projects, setProjects] = useState<ProjectRow[]>(initial);
  const [formOpen, setFormOpen] = useState(false);
  const [editing, setEditing] = useState<ProjectRow | null>(null);
  const [deleteTarget, setDeleteTarget] = useState<ProjectRow | null>(null);
  const [deleting, setDeleting] = useState(false);
  const [deleteError, setDeleteError] = useState<string | null>(null);
  const [staleNotice, setStaleNotice] = useState(false);

  // Autre appareil/onglet a modifié les réalisations : ne jamais écraser
  // silencieusement, on se contente de proposer de recharger.
  useEffect(() => {
    const supabase = createSupabaseBrowserClient();
    const channel = supabase
      .channel("admin-projects")
      .on("postgres_changes", { event: "*", schema: "public", table: "projects" }, () => {
        setStaleNotice(true);
      })
      .subscribe();
    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  function openCreate() {
    setEditing(null);
    setFormOpen(true);
  }

  function openEdit(project: ProjectRow) {
    setEditing(project);
    setFormOpen(true);
  }

  async function handleFormSubmit(values: ProjectFormValues): Promise<{ ok: boolean; error?: string }> {
    if (editing) {
      const result = await updateProject(editing.id, values, editing.updated_at);
      if (!result.ok) return { ok: false, error: result.error };
      setProjects((prev) =>
        prev.map((p) =>
          p.id === editing.id ? { ...p, ...values, updated_at: result.updatedAt ?? p.updated_at } : p,
        ),
      );
      setFormOpen(false);
      return { ok: true };
    }

    const result = await createProject({ ...values, sort_order: projects.length });
    if (!result.ok) return { ok: false, error: result.error };

    const nowIso = new Date().toISOString();
    setProjects((prev) => [
      ...prev,
      {
        ...values,
        id: result.id ?? crypto.randomUUID(),
        sort_order: prev.length,
        created_at: nowIso,
        updated_at: nowIso,
      },
    ]);
    setFormOpen(false);
    return { ok: true };
  }

  async function handleConfirmDelete() {
    if (!deleteTarget) return;
    setDeleting(true);
    setDeleteError(null);
    const result = await deleteProject(deleteTarget.id);
    if (!result.ok) {
      setDeleteError(result.error);
      setDeleting(false);
      return;
    }
    setProjects((prev) => prev.filter((p) => p.id !== deleteTarget.id));
    setDeleting(false);
    setDeleteTarget(null);
  }

  async function togglePublished(project: ProjectRow) {
    const result = await updateProject(project.id, { published: !project.published }, project.updated_at);
    if (result.ok) {
      setProjects((prev) =>
        prev.map((p) =>
          p.id === project.id
            ? { ...p, published: !p.published, updated_at: result.updatedAt ?? p.updated_at }
            : p,
        ),
      );
    }
  }

  async function move(index: number, dir: -1 | 1) {
    const j = index + dir;
    if (j < 0 || j >= projects.length) return;
    const next = [...projects];
    [next[index], next[j]] = [next[j], next[index]];
    setProjects(next);
    await reorderProjects(next.map((p) => p.id));
  }

  return (
    <div>
      {staleNotice && (
        <div className="mb-6 flex flex-wrap items-center justify-between gap-3 border border-line-strong bg-paper/[0.04] px-5 py-4">
          <p className="text-sm text-paper-dim">
            Les réalisations ont été modifiées ailleurs.
          </p>
          <button
            type="button"
            onClick={() => {
              setStaleNotice(false);
              router.refresh();
            }}
            className="font-display text-xs uppercase tracking-[0.2em] text-paper underline decoration-line-strong underline-offset-4 hover:decoration-paper"
          >
            Recharger
          </button>
        </div>
      )}

      <button
        type="button"
        onClick={openCreate}
        className="inline-flex h-12 items-center justify-center bg-paper px-6 font-display text-xs uppercase tracking-[0.2em] text-ink"
      >
        + Ajouter une réalisation
      </button>

      {projects.length === 0 ? (
        <div className="mt-8 border border-line py-24 text-center">
          <p className="font-display text-sm uppercase tracking-[0.2em] text-mist-dim">
            Aucune réalisation pour le moment
          </p>
        </div>
      ) : (
        <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {projects.map((project, i) => {
            const imageUrl = getProjectImagePublicUrl(project.image_path);
            return (
              <div key={project.id} className="flex flex-col gap-4 border border-line p-5">
                {imageUrl && (
                  <div className="relative h-32 w-full overflow-hidden border border-line">
                    <Image src={imageUrl} alt="" fill unoptimized className="object-cover" />
                  </div>
                )}

                <div className="flex items-start justify-between gap-3">
                  <div>
                    <p className="text-base font-medium text-paper">{project.name}</p>
                    {project.company && <p className="mt-0.5 text-sm text-mist">{project.company}</p>}
                  </div>
                  <div className="flex flex-col items-end gap-1">
                    <span
                      className={`font-display text-[10px] uppercase tracking-[0.2em] ${
                        project.published ? "text-paper" : "text-mist-dim"
                      }`}
                    >
                      {project.published ? "Publié" : "Brouillon"}
                    </span>
                    {project.founding_project && (
                      <span className="font-display text-[10px] uppercase tracking-[0.2em] text-mist-dim">
                        First 10
                      </span>
                    )}
                  </div>
                </div>

                <div className="mt-auto flex flex-wrap items-center gap-x-4 gap-y-2 border-t border-line pt-4">
                  <button
                    type="button"
                    onClick={() => openEdit(project)}
                    className="font-display text-[11px] uppercase tracking-[0.2em] text-paper transition-colors hover:text-mist"
                  >
                    Modifier
                  </button>
                  <button
                    type="button"
                    onClick={() => togglePublished(project)}
                    className="font-display text-[11px] uppercase tracking-[0.2em] text-mist transition-colors hover:text-paper"
                  >
                    {project.published ? "Dépublier" : "Publier"}
                  </button>
                  <button
                    type="button"
                    onClick={() => move(i, -1)}
                    disabled={i === 0}
                    className="text-xs text-mist-dim transition-colors hover:text-paper disabled:opacity-30"
                    aria-label="Monter"
                  >
                    ↑
                  </button>
                  <button
                    type="button"
                    onClick={() => move(i, 1)}
                    disabled={i === projects.length - 1}
                    className="text-xs text-mist-dim transition-colors hover:text-paper disabled:opacity-30"
                    aria-label="Descendre"
                  >
                    ↓
                  </button>
                  <button
                    type="button"
                    onClick={() => setDeleteTarget(project)}
                    className="ml-auto font-display text-[11px] uppercase tracking-[0.2em] text-mist transition-colors hover:text-danger"
                  >
                    Supprimer
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}

      <ProjectFormModal
        key={editing?.id ?? "create"}
        open={formOpen}
        project={editing}
        onClose={() => setFormOpen(false)}
        onSubmit={handleFormSubmit}
      />

      <Modal
        open={!!deleteTarget}
        onClose={deleting ? () => {} : () => setDeleteTarget(null)}
        title="Supprimer la réalisation"
        closeOnOverlayClick={!deleting}
      >
        <p className="text-sm leading-relaxed text-mist">
          Vous êtes sur le point de supprimer définitivement{" "}
          <span className="text-paper-dim">{deleteTarget?.name}</span>.
        </p>
        <p className="mt-3 text-sm font-medium leading-relaxed text-paper-dim">
          Cette action est irréversible.
        </p>
        {deleteError && <p className="mt-4 text-sm text-danger">{deleteError}</p>}
        <div className="mt-8 flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">
          <button
            type="button"
            onClick={() => setDeleteTarget(null)}
            disabled={deleting}
            className="inline-flex h-12 items-center justify-center border border-line-strong px-6 font-display text-xs uppercase tracking-[0.2em] text-paper-dim transition-colors hover:border-paper hover:text-paper disabled:cursor-not-allowed disabled:opacity-50"
          >
            Annuler
          </button>
          <button
            type="button"
            onClick={handleConfirmDelete}
            disabled={deleting}
            className="inline-flex h-12 items-center justify-center border border-danger px-6 font-display text-xs uppercase tracking-[0.2em] text-danger transition-colors hover:bg-danger hover:text-ink disabled:cursor-not-allowed disabled:opacity-50"
          >
            {deleting ? "Suppression…" : "Supprimer définitivement"}
          </button>
        </div>
      </Modal>
    </div>
  );
}
