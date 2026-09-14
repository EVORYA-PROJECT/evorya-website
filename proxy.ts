import { createServerClient } from "@supabase/ssr";
import { NextResponse, type NextRequest } from "next/server";

// Chemins /admin accessibles sans session existante. "/admin/reset-password"
// doit rester ici : un visiteur qui arrive depuis le lien de récupération
// Supabase n'a pas encore de session admin normale à ce stade — c'est la page
// elle-même qui vérifie qu'un véritable flux de recovery est en cours (voir
// app/admin/reset-password/page.tsx), jamais ce middleware.
const PUBLIC_ADMIN_PATHS = ["/admin/login", "/admin/reset-password"];

export async function proxy(request: NextRequest) {
  let response = NextResponse.next({ request });

  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const anonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  const { pathname } = request.nextUrl;
  const isPublicAdminPath = PUBLIC_ADMIN_PATHS.includes(pathname);

  // Supabase non configuré : personne ne peut être authentifié, donc on se
  // comporte exactement comme pour un visiteur non connecté (échec fermé,
  // jamais d'accès libre à /admin).
  if (!url || !anonKey) {
    if (isPublicAdminPath) return response;
    return NextResponse.redirect(new URL("/admin/login", request.url));
  }

  const supabase = createServerClient(url, anonKey, {
    cookies: {
      getAll() {
        return request.cookies.getAll();
      },
      setAll(cookiesToSet) {
        cookiesToSet.forEach(({ name, value }) => {
          request.cookies.set(name, value);
        });
        response = NextResponse.next({ request });
        cookiesToSet.forEach(({ name, value, options }) => {
          response.cookies.set(name, value, options);
        });
      },
    },
  });

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user && !isPublicAdminPath) {
    const loginUrl = new URL("/admin/login", request.url);
    return NextResponse.redirect(loginUrl);
  }

  if (user && pathname === "/admin/login") {
    const dashboardUrl = new URL("/admin", request.url);
    return NextResponse.redirect(dashboardUrl);
  }

  return response;
}

export const config = {
  matcher: ["/admin/:path*"],
};
