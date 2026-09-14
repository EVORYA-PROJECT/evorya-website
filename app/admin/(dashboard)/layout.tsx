import type { Metadata } from "next";
import type { ReactNode } from "react";
import Image from "next/image";
import AdminNav from "@/components/admin/AdminNav";
import SignOutButton from "@/components/admin/SignOutButton";

export const metadata: Metadata = {
  title: "Admin",
  robots: { index: false, follow: false },
};

// Ces pages dépendent des cookies de session et doivent toujours être rendues
// à la demande — jamais générées statiquement au moment du build.
export const dynamic = "force-dynamic";

export default function AdminDashboardLayout({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-dvh bg-ink px-6 py-8 sm:px-8 lg:px-12 lg:py-10">
      <div className="mx-auto max-w-[1440px]">
        <header className="flex items-center justify-between border-b border-line pb-6">
          <div className="flex items-center gap-4">
            {/*
              Même logique de recadrage que la navbar publique : le fichier
              logo contient une large marge transparente verticale, on
              recadre donc son rendu (object-cover) au lieu d'agrandir le
              header — le fichier lui-même reste intact.
            */}
            <span className="relative block aspect-[1781/479] h-9 sm:h-11">
              <Image
                src="/evorya-logo.png"
                alt="Evorya Project"
                fill
                sizes="220px"
                className="object-cover"
              />
            </span>
            <span className="hidden font-display text-xs uppercase tracking-[0.3em] text-mist-dim sm:inline">
              Espace propriétaire
            </span>
          </div>

          <SignOutButton />
        </header>

        <AdminNav />

        <div className="mt-10">{children}</div>
      </div>
    </div>
  );
}
