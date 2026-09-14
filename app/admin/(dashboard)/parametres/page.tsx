import ParametresPanel from "@/components/admin/ParametresPanel";
import { createSupabaseServerClient } from "@/lib/supabase/server";

export default async function AdminParametresPage() {
  const supabase = await createSupabaseServerClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  return (
    <div>
      <h1 className="text-2xl font-medium text-paper sm:text-3xl">Paramètres</h1>
      <p className="mt-2 text-sm text-mist">Gérez votre accès à l&rsquo;espace propriétaire.</p>

      <div className="mt-10 max-w-xl">
        <ParametresPanel email={user?.email ?? "—"} />
      </div>
    </div>
  );
}
