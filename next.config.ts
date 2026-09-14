import type { NextConfig } from "next";

// Permet d'accéder au serveur `next dev` (y compris /admin) depuis un
// téléphone ou une tablette sur le même réseau Wi-Fi, en plus de localhost.
// Next.js bloque par défaut les requêtes dev cross-origin qui n'utilisent pas
// l'hôte de démarrage. Renseignez DEV_LAN_ORIGINS dans .env.local (ex:
// "192.168.1.23") si votre adresse réseau locale change. Sans effet sur
// `next build` / production : ce mécanisme n'existe qu'en développement.
const devLanOrigins = process.env.DEV_LAN_ORIGINS?.split(",")
  .map((origin) => origin.trim())
  .filter(Boolean);

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
