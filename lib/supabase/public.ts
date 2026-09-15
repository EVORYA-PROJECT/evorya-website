import "server-only";
import { createClient } from "@supabase/supabase-js";
import type { Database } from "@/types/database";
import { createResilientFetch } from "@/lib/supabase/resilient-fetch";

/**
 * Client Supabase pour les lectures publiques (site_content, offers,
 * projects publiés). Utilise uniquement la clé anon, sans cookies de
 * session : contrairement à `createSupabaseServerClient`, ce client
 * n'appelle jamais `next/headers.cookies()`, donc son utilisation ne force
 * pas Next.js à rendre la page en dynamique — l'accueil et /conditions
 * restent statiques/ISR (voir `revalidate` + `revalidatePath` dans
 * lib/cms/actions.ts). La sécurité réelle vient des policies RLS "select"
 * publiques de ces tables, pas de la présence d'une session.
 */
export function createSupabasePublicClient() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const anonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  if (!url || !anonKey) {
    throw new Error(
      "Supabase n'est pas configuré : NEXT_PUBLIC_SUPABASE_URL et NEXT_PUBLIC_SUPABASE_ANON_KEY sont requis.",
    );
  }

  return createClient<Database>(url, anonKey, {
    auth: { persistSession: false, autoRefreshToken: false },
    global: { fetch: createResilientFetch() },
  });
}
