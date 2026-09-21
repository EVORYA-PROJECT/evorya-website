"use client";

import { useState } from "react";
import { createSupabaseBrowserClient } from "@/lib/supabase/client";

export default function ParametresPanel({ email }: { email: string }) {
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");

  async function handleReset() {
    if (status === "sending") return;
    setStatus("sending");
    try {
      const supabase = createSupabaseBrowserClient();
      const { error } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: `${window.location.origin}/admin/reset-password`,
      });
      if (error) {
        console.error("[admin/parametres] Échec de la demande de récupération :", error);
      }
      setStatus(error ? "error" : "sent");
    } catch (resetException) {
      console.error(
        "[admin/parametres] Impossible d'initialiser la récupération :",
        resetException,
      );
      setStatus("error");
    }
  }

  return (
    <div className="border border-line p-6 sm:p-8">
      <span className="font-display text-xs uppercase tracking-[0.25em] text-mist-dim">
        Compte connecté
      </span>
      <p className="mt-2 text-base text-paper">{email}</p>

      <div className="mt-8 border-t border-line pt-6">
        <p className="text-sm text-mist">
          Envoyez-vous un lien pour définir un nouveau mot de passe.
        </p>
        <button
          type="button"
          onClick={handleReset}
          disabled={status === "sending"}
          className="mt-4 inline-flex h-12 items-center justify-center border border-line-strong px-6 font-display text-xs uppercase tracking-[0.2em] text-paper transition-colors hover:border-paper disabled:cursor-not-allowed disabled:opacity-50"
        >
          {status === "sending" ? "Envoi en cours…" : "Envoyer un lien de réinitialisation"}
        </button>
        {status === "sent" && (
          <p className="mt-3 text-sm text-mist">
            Un lien de récupération vous a été envoyé par email.
          </p>
        )}
        {status === "error" && (
          <p className="mt-3 text-sm text-danger">
            Impossible d&rsquo;envoyer le lien pour le moment. Réessayez plus tard.
          </p>
        )}
      </div>
    </div>
  );
}
