"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { createSupabaseBrowserClient } from "@/lib/supabase/client";

type Stage = "checking" | "invalid" | "ready" | "success";

/**
 * Cette page ne doit JAMAIS permettre de changer un mot de passe sans un
 * véritable lien de récupération Supabase valide — on ne se contente donc
 * jamais de "une session existe" (un propriétaire déjà connecté sur cet
 * appareil ne doit pas pouvoir l'ouvrir directement pour changer son mot de
 * passe sans passer par l'email). On exige un signal explicite de recovery :
 * l'événement PASSWORD_RECOVERY émis après l'échange PKCE automatique du SDK.
 */
export default function ResetPasswordPage() {
  const router = useRouter();
  const [stage, setStage] = useState<Stage>("checking");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    let cancelled = false;
    let recoveryDetected = false;
    let unsubscribe: (() => void) | undefined;

    async function verify() {
      try {
        // Le client @supabase/ssr utilise PKCE. Sans code dans l'URL, cette
        // visite ne provient pas d'un lien de récupération actuel valide.
        if (!new URL(window.location.href).searchParams.has("code")) {
          if (!cancelled) setStage("invalid");
          return;
        }

        const supabase = createSupabaseBrowserClient();
        const { data: authListener } = supabase.auth.onAuthStateChange((event) => {
          if (event !== "PASSWORD_RECOVERY") return;
          recoveryDetected = true;
          if (!cancelled) setStage("ready");
        });
        unsubscribe = () => authListener.subscription.unsubscribe();

        // createBrowserClient démarre automatiquement detectSessionInUrl.
        // initialize() rejoint cette initialisation existante sans rééchanger
        // le code. Le tick suivant laisse PASSWORD_RECOVERY être distribué.
        const { error: initializationError } = await supabase.auth.initialize();
        await new Promise((resolve) => setTimeout(resolve, 0));

        if (initializationError) {
          console.error(
            "[admin/reset-password] Échec de l'initialisation PKCE :",
            initializationError,
          );
        }

        if (!cancelled && !recoveryDetected) setStage("invalid");
      } catch (initializationException) {
        console.error(
          "[admin/reset-password] Impossible d'initialiser la récupération :",
          initializationException,
        );
        if (!cancelled) setStage("invalid");
      }
    }

    verify();

    return () => {
      cancelled = true;
      unsubscribe?.();
    };
  }, []);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError(null);

    if (password.length < 8) {
      setError("Le mot de passe doit contenir au moins 8 caractères.");
      return;
    }
    if (password !== confirmPassword) {
      setError("Les deux mots de passe ne correspondent pas.");
      return;
    }

    setSaving(true);
    try {
      const supabase = createSupabaseBrowserClient();
      const { error: updateError } = await supabase.auth.updateUser({ password });
      if (updateError) {
        console.error("[admin/reset-password] Échec de la mise à jour du mot de passe :", updateError);
        setError("Impossible de modifier le mot de passe. Réessayez.");
        setSaving(false);
        return;
      }
      setStage("success");
      setTimeout(() => {
        router.replace("/admin/login");
      }, 2500);
    } catch (updateException) {
      console.error(
        "[admin/reset-password] Impossible de mettre à jour le mot de passe :",
        updateException,
      );
      setError("Impossible de modifier le mot de passe. Réessayez.");
      setSaving(false);
    }
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

          {stage === "checking" && (
            <p className="mt-6 text-sm text-mist">Vérification du lien de récupération…</p>
          )}

          {stage === "invalid" && (
            <div className="mt-6 flex flex-col gap-6">
              <h1 className="text-xl font-medium text-paper">Lien invalide</h1>
              <p className="text-sm leading-relaxed text-mist">
                Ce lien de récupération est invalide ou a expiré.
              </p>
              <a
                href="/admin/login"
                className="inline-flex h-14 w-full items-center justify-center border border-line-strong font-display text-xs uppercase tracking-[0.25em] text-paper transition-colors hover:border-paper"
              >
                Demander un nouveau lien
              </a>
            </div>
          )}

          {stage === "success" && (
            <div className="mt-6 flex flex-col gap-4">
              <h1 className="text-xl font-medium text-paper">C&rsquo;est fait</h1>
              <p className="text-sm leading-relaxed text-mist">
                Votre mot de passe a été modifié avec succès. Redirection vers la
                connexion…
              </p>
            </div>
          )}

          {stage === "ready" && (
            <>
              <h1 className="mt-3 text-xl font-medium text-paper">Nouveau mot de passe</h1>
              <form onSubmit={handleSubmit} className="mt-8 flex flex-col gap-6">
                <label className="flex flex-col gap-1 text-sm text-mist">
                  Nouveau mot de passe
                  <div className="relative">
                    <input
                      required
                      type={showPassword ? "text" : "password"}
                      autoComplete="new-password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="w-full border-0 border-b border-line bg-transparent py-3 pr-20 text-base text-paper outline-none transition-colors focus:border-paper"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword((v) => !v)}
                      className="absolute right-0 top-1/2 -translate-y-1/2 text-xs uppercase tracking-[0.15em] text-mist-dim transition-colors hover:text-paper"
                    >
                      {showPassword ? "Masquer" : "Afficher"}
                    </button>
                  </div>
                </label>

                <label className="flex flex-col gap-1 text-sm text-mist">
                  Confirmer le mot de passe
                  <input
                    required
                    type={showPassword ? "text" : "password"}
                    autoComplete="new-password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    className="w-full border-0 border-b border-line bg-transparent py-3 text-base text-paper outline-none transition-colors focus:border-paper"
                  />
                </label>

                {error && <p className="text-sm text-danger">{error}</p>}

                <button
                  type="submit"
                  disabled={saving}
                  className="mt-2 inline-flex h-14 w-full items-center justify-center bg-paper font-display text-xs uppercase tracking-[0.25em] text-ink transition-opacity disabled:cursor-not-allowed disabled:opacity-60"
                >
                  {saving ? "Modification…" : "Modifier le mot de passe"}
                </button>
              </form>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
