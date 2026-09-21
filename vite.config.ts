import { defineConfig, loadEnv } from "vite";
import vinext from "vinext";
import { cloudflare } from "@cloudflare/vite-plugin";
import { responseStoreAdapter } from "@vinext/cloudflare/cache/response-store-adapter";

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), "NEXT_PUBLIC_SUPABASE_");

  return {
    // Vinext doit figer ces deux valeurs publiques dans le bundle navigateur,
    // comme le fait Next.js pour les variables NEXT_PUBLIC_*. Aucun secret
    // serveur ne doit être ajouté à cet objet.
    define: {
      "process.env.NEXT_PUBLIC_SUPABASE_URL": JSON.stringify(
        env.NEXT_PUBLIC_SUPABASE_URL ?? "",
      ),
      "process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY": JSON.stringify(
        env.NEXT_PUBLIC_SUPABASE_ANON_KEY ?? "",
      ),
    },
    plugins: [
      vinext({
        cache: responseStoreAdapter({ mode: "self-contained" }),
      }),
      cloudflare({
        viteEnvironment: {
          name: "rsc",
          childEnvironments: ["ssr"],
        },
      }),
    ],
  };
});
