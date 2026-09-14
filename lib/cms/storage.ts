export const PROJECT_IMAGES_BUCKET = "project-images";

/** Construit l'URL publique d'une image de réalisation à partir de son chemin dans le bucket. */
export function getProjectImagePublicUrl(path: string | null | undefined): string | null {
  if (!path) return null;
  const base = process.env.NEXT_PUBLIC_SUPABASE_URL;
  if (!base) return null;
  return `${base}/storage/v1/object/public/${PROJECT_IMAGES_BUCKET}/${path}`;
}
