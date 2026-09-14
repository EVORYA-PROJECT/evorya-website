"use client";

import { useState } from "react";
import Image from "next/image";
import Modal from "@/components/ui/Modal";
import { fieldInputClass, fieldLabelClass } from "@/components/admin/cms/shared";
import { createSupabaseBrowserClient } from "@/lib/supabase/client";
import { getProjectImagePublicUrl } from "@/lib/cms/storage";
import type { ProjectRow } from "@/lib/cms/types";

export type ProjectFormValues = {
  name: string;
  company: string | null;
  sector: string | null;
  description: string | null;
  link: string | null;
  project_date: string | null;
  founding_project: boolean;
  published: boolean;
  image_path: string | null;
};

function toFormValues(project: ProjectRow | null): ProjectFormValues {
  if (!project) {
    return {
      name: "",
      company: "",
      sector: "",
      description: "",
      link: "",
      project_date: "",
      founding_project: false,
      published: false,
      image_path: null,
    };
  }
  return {
    name: project.name,
    company: project.company ?? "",
    sector: project.sector ?? "",
    description: project.description ?? "",
    link: project.link ?? "",
    project_date: project.project_date ?? "",
    founding_project: project.founding_project,
    published: project.published,
    image_path: project.image_path,
  };
}

export default function ProjectFormModal({
  open,
  project,
  onClose,
  onSubmit,
}: {
  open: boolean;
  project: ProjectRow | null;
  onClose: () => void;
  onSubmit: (values: ProjectFormValues) => Promise<{ ok: boolean; error?: string }>;
}) {
  const [values, setValues] = useState<ProjectFormValues>(() => toFormValues(project));
  const [uploading, setUploading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleImageChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploading(true);
    setError(null);
    try {
      const supabase = createSupabaseBrowserClient();
      const safeName = file.name.replace(/[^a-zA-Z0-9.\-_]/g, "_");
      const path = `${crypto.randomUUID()}-${safeName}`;
      const { error: uploadError } = await supabase.storage
        .from("project-images")
        .upload(path, file, { upsert: false, cacheControl: "3600" });

      if (uploadError) {
        setError(
          "Échec de l'upload de l'image. Vérifiez que le bucket \"project-images\" a bien été créé dans Supabase Storage.",
        );
        return;
      }
      setValues((prev) => ({ ...prev, image_path: path }));
    } catch {
      setError("Échec de l'upload de l'image.");
    } finally {
      setUploading(false);
    }
  }

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!values.name.trim()) {
      setError("Le nom du projet est requis.");
      return;
    }
    setSaving(true);
    setError(null);
    const result = await onSubmit(values);
    setSaving(false);
    if (!result.ok) {
      setError(result.error ?? "Une erreur est survenue.");
    }
  }

  const previewUrl = getProjectImagePublicUrl(values.image_path);

  return (
    <Modal
      open={open}
      onClose={onClose}
      title={project ? "Modifier la réalisation" : "Ajouter une réalisation"}
    >
      <form onSubmit={handleSubmit} className="flex flex-col gap-6">
        <label className={fieldLabelClass}>
          Nom du projet
          <input
            required
            value={values.name}
            onChange={(e) => setValues((v) => ({ ...v, name: e.target.value }))}
            className={fieldInputClass}
          />
        </label>

        <div className="grid gap-6 sm:grid-cols-2">
          <label className={fieldLabelClass}>
            Client / Entreprise
            <input
              value={values.company ?? ""}
              onChange={(e) => setValues((v) => ({ ...v, company: e.target.value }))}
              className={fieldInputClass}
            />
          </label>
          <label className={fieldLabelClass}>
            Secteur / Catégorie
            <input
              value={values.sector ?? ""}
              onChange={(e) => setValues((v) => ({ ...v, sector: e.target.value }))}
              className={fieldInputClass}
            />
          </label>
        </div>

        <label className={fieldLabelClass}>
          Description
          <textarea
            rows={3}
            value={values.description ?? ""}
            onChange={(e) => setValues((v) => ({ ...v, description: e.target.value }))}
            className={`${fieldInputClass} resize-none`}
          />
        </label>

        <div className="grid gap-6 sm:grid-cols-2">
          <label className={fieldLabelClass}>
            URL du site
            <input
              type="url"
              value={values.link ?? ""}
              onChange={(e) => setValues((v) => ({ ...v, link: e.target.value }))}
              placeholder="https://…"
              className={fieldInputClass}
            />
          </label>
          <label className={fieldLabelClass}>
            Année / date
            <input
              value={values.project_date ?? ""}
              onChange={(e) => setValues((v) => ({ ...v, project_date: e.target.value }))}
              placeholder="2026"
              className={fieldInputClass}
            />
          </label>
        </div>

        <div>
          <span className="font-display text-xs uppercase tracking-[0.2em] text-mist-dim">
            Visuel
          </span>
          {previewUrl && (
            <div className="relative mt-3 h-32 w-full max-w-xs overflow-hidden border border-line">
              <Image src={previewUrl} alt="" fill unoptimized className="object-cover" />
            </div>
          )}
          <input
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            disabled={uploading}
            className="mt-3 block text-sm text-mist file:mr-4 file:border file:border-line-strong file:bg-transparent file:px-4 file:py-2 file:font-display file:text-xs file:uppercase file:tracking-[0.2em] file:text-paper"
          />
          {uploading && <p className="mt-2 text-xs text-mist-dim">Envoi de l&rsquo;image…</p>}
        </div>

        <div className="flex flex-wrap gap-6">
          <label className="flex items-center gap-2 text-sm text-mist">
            <input
              type="checkbox"
              checked={values.founding_project}
              onChange={(e) => setValues((v) => ({ ...v, founding_project: e.target.checked }))}
              className="h-4 w-4 border border-line-strong bg-transparent accent-paper"
            />
            Fait partie d&rsquo;Evorya First 10
          </label>
          <label className="flex items-center gap-2 text-sm text-mist">
            <input
              type="checkbox"
              checked={values.published}
              onChange={(e) => setValues((v) => ({ ...v, published: e.target.checked }))}
              className="h-4 w-4 border border-line-strong bg-transparent accent-paper"
            />
            Publié sur le site
          </label>
        </div>

        {error && <p className="text-sm text-danger">{error}</p>}

        <div className="mt-2 flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">
          <button
            type="button"
            onClick={onClose}
            disabled={saving}
            className="inline-flex h-12 items-center justify-center border border-line-strong px-6 font-display text-xs uppercase tracking-[0.2em] text-paper-dim transition-colors hover:border-paper hover:text-paper disabled:cursor-not-allowed disabled:opacity-50"
          >
            Annuler
          </button>
          <button
            type="submit"
            disabled={saving || uploading}
            className="inline-flex h-12 items-center justify-center bg-paper px-6 font-display text-xs uppercase tracking-[0.2em] text-ink transition-opacity disabled:cursor-not-allowed disabled:opacity-50"
          >
            {saving ? "Enregistrement…" : "Enregistrer"}
          </button>
        </div>
      </form>
    </Modal>
  );
}
