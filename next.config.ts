import type { NextConfig } from "next";
import { networkInterfaces } from "node:os";

// Permet d'accéder au serveur `next dev` (y compris /admin) depuis un
// téléphone ou une tablette sur le même réseau Wi-Fi, en plus de localhost.
// Next.js bloque par défaut les requêtes dev cross-origin qui n'utilisent pas
// l'hôte de démarrage. Les IPv4 locales sont détectées au démarrage ;
// DEV_LAN_ORIGINS permet d'ajouter d'autres hôtes explicites. Sans effet sur
// `next build` / production : ce mécanisme n'existe qu'en développement.
const configuredDevOrigins = process.env.DEV_LAN_ORIGINS?.split(",")
  .map((origin) => origin.trim())
  .filter(Boolean);
// Le DHCP peut changer l'adresse entre deux sessions. N'autoriser que les
// adresses des interfaces locales, jamais un wildcard pour tout le réseau.
const devLanOrigins = [...new Set([
  ...(configuredDevOrigins ?? []),
  ...(process.env.NODE_ENV === "development"
    ? Object.values(networkInterfaces()).flatMap((addresses) =>
        (addresses ?? [])
          .filter((address) => address.family === "IPv4" && !address.internal)
          .map((address) => address.address),
      )
    : []),
])];

// Autorise next/image à optimiser les images de réalisations hébergées dans
// Supabase Storage (bucket public "project-images"). Sans effet si Supabase
// n'est pas configuré.
let supabaseStorageHostname: string | undefined;
try {
  supabaseStorageHostname = process.env.NEXT_PUBLIC_SUPABASE_URL
    ? new URL(process.env.NEXT_PUBLIC_SUPABASE_URL).hostname
    : undefined;
} catch {
  supabaseStorageHostname = undefined;
}

const nextConfig: NextConfig = {
  allowedDevOrigins: devLanOrigins && devLanOrigins.length > 0 ? devLanOrigins : undefined,
  images: {
    remotePatterns: supabaseStorageHostname
      ? [
          {
            protocol: "https",
            hostname: supabaseStorageHostname,
            pathname: "/storage/v1/object/public/**",
          },
        ]
      : [],
  },
};

export default nextConfig;
