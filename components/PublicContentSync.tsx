"use client";

import { useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import { createSupabaseBrowserClient } from "@/lib/supabase/client";

const WATCHED_TABLES = ["site_content", "offers", "projects"] as const;

/**
 * Le contenu public (textes, offres, réalisations) est modifiable depuis
 * /admin/contenu. Ce composant écoute les changements Supabase Realtime sur
 * les tables correspondantes et rafraîchit silencieusement la page pour tout
 * visiteur déjà présent — sur n'importe quel appareil, sans rechargement
 * manuel. router.refresh() ré-exécute uniquement les Server Components
 * (donc les requêtes lib/cms/queries.ts) : le défilement et l'état client
 * (formulaire de contact en cours, animations...) sont conservés.
 *
 * N'est volontairement PAS utilisé dans /admin : les éditeurs y gèrent déjà
 * leurs propres conflits d'édition concurrente (voir useSectionEditor /
 * ProjectsAdminList) et ne doivent jamais être rafraîchis silencieusement.
 */
export default function PublicContentSync() {
  const router = useRouter();
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const anonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
    if (!url || !anonKey) return;

    let supabase;
    try {
      supabase = createSupabaseBrowserClient();
    } catch {
      return;
    }

    function scheduleRefresh() {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
      timeoutRef.current = setTimeout(() => router.refresh(), 400);
    }

    let channel = supabase.channel("public-site-content");
    for (const table of WATCHED_TABLES) {
      channel = channel.on(
        "postgres_changes",
        { event: "*", schema: "public", table },
        scheduleRefresh,
      );
    }
    channel.subscribe();

    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
      supabase.removeChannel(channel);
    };
  }, [router]);

  return null;
}
