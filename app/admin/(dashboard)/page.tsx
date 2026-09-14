import AdminDashboard from "@/components/admin/AdminDashboard";
import { createSupabaseServerClient } from "@/lib/supabase/server";
import type { ContactRequest } from "@/types/database";

async function fetchRequests(): Promise<{
  data: ContactRequest[];
  error: { message: string } | null;
}> {
  const supabase = await createSupabaseServerClient();
  const { data, error } = await supabase
    .from("contact_requests")
    .select("*")
    .order("created_at", { ascending: false });

  return { data: data ?? [], error: error ? { message: error.message } : null };
}

export default async function AdminRequestsPage() {
  let data: ContactRequest[] = [];
  let error: { message: string } | null = null;

  try {
    ({ data, error } = await fetchRequests());
  } catch (err) {
    error = { message: err instanceof Error ? err.message : "Erreur inconnue" };
  }

  return (
    <div>
      <div>
        <h1 className="text-2xl font-medium text-paper sm:text-3xl">Demandes reçues</h1>
        <p className="mt-2 text-sm text-mist">
          Suivez, filtrez et répondez aux demandes envoyées depuis le site.
        </p>
      </div>

      <div className="mt-10">
        {error ? (
          <div className="border border-line-strong p-8">
            <p className="font-display text-sm uppercase tracking-[0.2em] text-danger">
              Données indisponibles
            </p>
            <p className="mt-3 max-w-xl text-sm leading-relaxed text-mist">
              Les demandes n&rsquo;ont pas pu être chargées ({error.message}).
              Vérifiez que Supabase est configuré et que la table{" "}
              <code className="text-paper-dim">contact_requests</code> a bien été créée
              à l&rsquo;aide du script SQL fourni dans les instructions de configuration.
            </p>
          </div>
        ) : (
          <AdminDashboard initialRequests={data} />
        )}
      </div>
    </div>
  );
}
