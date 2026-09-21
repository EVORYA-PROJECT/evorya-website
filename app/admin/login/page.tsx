"use client";

import { useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { createSupabaseBrowserClient } from "@/lib/supabase/client";

type View = "login" | "forgot";

export default function AdminLoginPage() {
  const router = useRouter();
  const [view, setView] = useState<View>("login");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const [resetEmail, setResetEmail] = useState("");
  const [resetStatus, setResetStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");
  const [resetError, setResetError] = useState<string | null>(null);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const supabase = createSupabaseBrowserClient();
      const { error: signInError } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (signInError) {
        setError("Email ou mot de passe incorrect.");
        setLoading(false);
        return;
      }

      router.replace("/admin");
      router.refresh();
    } catch {
      setError(
        "Connexion impossible. Vérifiez que Supabase est correctement configuré.",
      );
      setLoading(false);
    }
  }

  async function handleForgotSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (resetStatus === "sending") return;
    setResetStatus("sending");
    setResetError(null);

    try {
      const supabase = createSupabaseBrowserClient();
      const { error: resetErr } = await supabase.auth.resetPasswordForEmail(resetEmail, {
        redirectTo: `${window.location.origin}/admin/reset-password`,
      });

      if (resetErr) {
        console.error("[admin/login] Échec de la demande de récupération :", resetErr);
        setResetError("Impossible d'envoyer le lien pour le moment. Réessayez plus tard.");
        setResetStatus("error");
        return;
      }

      setResetStatus("sent");
    } catch (resetException) {
      console.error("[admin/login] Impossible d'initialiser la récupération :", resetException);
      setResetError("Impossible d'envoyer le lien pour le moment. Réessayez plus tard.");
      setResetStatus("error");
    }
  }

  function backToLogin() {
    setView("login");
    setResetStatus("idle");
    setResetError(null);
    setResetEmail("");
  }

  return (
    <div className="flex min-h-dvh items-center justify-center bg-ink px-6">
      <div className="w-full max-w-sm">
        <div className="flex justify-center">
          <Image
            src="/evorya-logo.png"
            alt="Evorya Project"
            width={200}
            height={80}
            className="h-12 w-auto"
            priority
          />
        </div>

        <div className="mt-10 border border-line p-8">
          <span className="font-display text-xs uppercase tracking-[0.3em] text-mist-dim">
            Espace propriétaire
          </span>

          {view === "login" ? (
            <>
              <h1 className="mt-3 text-xl font-medium text-paper">Connexion</h1>

              <form onSubmit={handleSubmit} className="mt-8 flex flex-col gap-6">
                <label className="flex flex-col gap-1 text-sm text-mist">
                  Email
                  <input
                    required
                    type="email"
                    autoComplete="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full border-0 border-b border-line bg-transparent py-3 text-base text-paper outline-none transition-colors focus:border-paper"
                  />
                </label>

                <label className="flex flex-col gap-1 text-sm text-mist">
                  Mot de passe
                  <input
                    required
                    type="password"
                    autoComplete="current-password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full border-0 border-b border-line bg-transparent py-3 text-base text-paper outline-none transition-colors focus:border-paper"
                  />
                </label>

                <button
                  type="button"
                  onClick={() => {
                    setResetEmail(email);
                    setView("forgot");
                  }}
                  className="-mt-3 self-start text-xs text-mist-dim underline decoration-line-strong underline-offset-4 transition-colors hover:text-paper hover:decoration-paper"
                >
                  Mot de passe oublié ?
                </button>

                {error && <p className="text-sm text-danger">{error}</p>}

                <button
                  type="submit"
                  disabled={loading}
                  className="mt-2 inline-flex h-14 w-full items-center justify-center bg-paper font-display text-xs uppercase tracking-[0.25em] text-ink transition-opacity disabled:cursor-not-allowed disabled:opacity-60"
                >
                  {loading ? "Connexion…" : "Se connecter"}
                </button>
              </form>
            </>
          ) : (
            <>
              <h1 className="mt-3 text-xl font-medium text-paper">Mot de passe oublié</h1>

              {resetStatus === "sent" ? (
                <div className="mt-8 flex flex-col gap-6">
                  <p className="text-sm leading-relaxed text-mist">
                    Un lien de récupération vous a été envoyé par email.
                  </p>
                  <button
                    type="button"
                    onClick={backToLogin}
                    className="inline-flex h-14 w-full items-center justify-center border border-line-strong font-display text-xs uppercase tracking-[0.25em] text-paper transition-colors hover:border-paper"
                  >
                    Retour à la connexion
                  </button>
                </div>
              ) : (
                <form onSubmit={handleForgotSubmit} className="mt-8 flex flex-col gap-6">
                  <p className="text-sm leading-relaxed text-mist">
                    Indiquez l&rsquo;adresse email associée à votre compte : nous vous
                    enverrons un lien pour définir un nouveau mot de passe.
                  </p>

                  <label className="flex flex-col gap-1 text-sm text-mist">
                    Email
                    <input
                      required
                      type="email"
                      autoComplete="email"
                      value={resetEmail}
                      onChange={(e) => setResetEmail(e.target.value)}
                      className="w-full border-0 border-b border-line bg-transparent py-3 text-base text-paper outline-none transition-colors focus:border-paper"
                    />
                  </label>

                  {resetError && <p className="text-sm text-danger">{resetError}</p>}

                  <button
                    type="submit"
                    disabled={resetStatus === "sending"}
                    className="mt-2 inline-flex h-14 w-full items-center justify-center bg-paper font-display text-xs uppercase tracking-[0.25em] text-ink transition-opacity disabled:cursor-not-allowed disabled:opacity-60"
                  >
                    {resetStatus === "sending"
                      ? "Envoi en cours…"
                      : "Envoyer le lien de récupération"}
                  </button>

                  <button
                    type="button"
                    onClick={backToLogin}
                    className="self-center text-xs text-mist-dim underline decoration-line-strong underline-offset-4 transition-colors hover:text-paper hover:decoration-paper"
                  >
                    Retour à la connexion
                  </button>
                </form>
              )}
            </>
          )}
        </div>

        <p className="mt-6 text-center text-xs text-mist-dim">
          Espace réservé au propriétaire d&rsquo;Evorya Project.
        </p>
      </div>
    </div>
  );
}
