import { cookies } from "next/headers";
import { createServerClient } from "@supabase/ssr";
import type { Database } from "@/types/database";
import { createResilientFetch } from "@/lib/supabase/resilient-fetch";

/**
 * Client Supabase serveur (Server Components, Route Handlers, Server Actions).
 * Utilise la clé publique (anon) + la session cookie de l'utilisateur connecté.
 * Les permissions réelles sont appliquées par les policies RLS de Supabase.
 */
export async function createSupabaseServerClient() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const anonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  if (!url || !anonKey) {
    throw new Error(
      "Supabase n'est pas configuré : NEXT_PUBLIC_SUPABASE_URL et NEXT_PUBLIC_SUPABASE_ANON_KEY sont requis.",
    );
  }

  const cookieStore = await cookies();

  return createServerClient<Database>(url, anonKey, {
    cookies: {
      getAll() {
        return cookieStore.getAll();
      },
      setAll(cookiesToSet) {
        try {
          cookiesToSet.forEach(({ name, value, options }) => {
            cookieStore.set(name, value, options);
          });
        } catch {
          // Appelé depuis un Server Component sans possibilité d'écrire des
          // cookies : sans conséquence tant que le middleware rafraîchit la session.
        }
      },
    },
    global: { fetch: createResilientFetch() },
  });
}
