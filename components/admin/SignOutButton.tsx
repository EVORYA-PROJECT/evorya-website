"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { signOutAdmin } from "@/app/admin/actions";

/**
 * Client Component plutôt qu'un <form action={signOutAdmin}> direct : la
 * navigation vers /admin/login est déclenchée ici, côté client, après le
 * retour (toujours réussi) de la Server Action — jamais via un redirect()
 * lancé depuis l'action elle-même (voir le commentaire sur signOutAdmin
 * dans app/admin/actions.ts pour la raison exacte).
 */
export default function SignOutButton() {
  const router = useRouter();
  const [pending, startTransition] = useTransition();
  const [error, setError] = useState(false);

  function handleClick() {
    setError(false);
    startTransition(async () => {
      try {
        const result = await signOutAdmin();
        if (!result.ok) throw new Error("signOut failed");
        router.replace("/admin/login");
        router.refresh();
      } catch {
        setError(true);
      }
    });
  }

  return (
    <div className="flex items-center gap-3">
      {error && (
        <span className="text-xs text-danger">Déconnexion impossible. Réessayez.</span>
      )}
      <button
        type="button"
        onClick={handleClick}
        disabled={pending}
        className="font-display text-xs uppercase tracking-[0.25em] text-mist transition-colors hover:text-paper disabled:cursor-not-allowed disabled:opacity-50"
      >
        {pending ? "Déconnexion…" : "Déconnexion"}
      </button>
    </div>
  );
}
