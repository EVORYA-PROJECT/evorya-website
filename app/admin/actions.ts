"use server";

import { revalidatePath } from "next/cache";
import { createSupabaseServerClient } from "@/lib/supabase/server";
import type { RequestStatus } from "@/types/database";

export async function updateRequestStatus(id: string, status: RequestStatus) {
  const supabase = await createSupabaseServerClient();

  const { error } = await supabase
    .from("contact_requests")
    .update({ status })
    .eq("id", id);

  if (error) {
    throw new Error(error.message);
  }

  revalidatePath("/admin");
}

/**
 * Supprime définitivement une demande. Server Action : s'exécute uniquement
 * côté serveur, avec le client Supabase lié à la session de l'utilisateur
 * connecté (jamais la clé service role). La policy RLS "delete" sur
 * `contact_requests` garantit qu'un visiteur non authentifié ne peut jamais
 * supprimer de ligne, même en contournant l'interface.
 */
export async function deleteRequest(id: string) {
  const supabase = await createSupabaseServerClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    throw new Error("Authentification requise.");
  }

  const { error } = await supabase.from("contact_requests").delete().eq("id", id);

  if (error) {
    throw new Error(error.message);
  }

  revalidatePath("/admin");
}

/**
 * Ne redirige jamais elle-même (pas de redirect() ici) : un redirect() lancé
 * depuis une Server Action invoquée via <form action={...}> retraverse
 * proxy.ts avant d'atteindre le client, et toute réponse qui ne provient
 * pas exactement du format attendu par ce mécanisme casse le formulaire
 * ("An unexpected response was received from the server"). La navigation
 * vers /admin/login est donc laissée au client (voir SignOutButton), qui
 * appelle explicitement router.replace + router.refresh après ce retour.
 *
 * scope: "local" : n'invalide que la session de cet appareil/onglet (ce
 * qu'un bouton "Déconnexion" doit faire), sans appel réseau vers Supabase
 * pour révoquer les autres sessions — supprime aussi toute dépendance à ce
 * réseau, source possible d'échec.
 */
export async function signOutAdmin(): Promise<{ ok: boolean }> {
  const supabase = await createSupabaseServerClient();
  try {
    await supabase.auth.signOut({ scope: "local" });
  } catch (err) {
    console.error("[admin] Échec de signOut Supabase :", err);
  }
  revalidatePath("/admin");
  return { ok: true };
}
