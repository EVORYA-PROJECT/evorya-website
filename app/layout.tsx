import type { Metadata, Viewport } from "next";
import { Space_Grotesk, Oxanium } from "next/font/google";
import { SITE } from "@/lib/config";
import "./globals.css";

const spaceGrotesk = Space_Grotesk({
  variable: "--font-sans",
  subsets: ["latin"],
  display: "swap",
});

const oxanium = Oxanium({
  variable: "--font-display",
  subsets: ["latin"],
  weight: ["500", "600", "700", "800"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE.url),
  title: {
    default: `${SITE.name} — Expériences digitales premium`,
    template: `%s — ${SITE.name}`,
  },
  description: SITE.description,
  keywords: [
    "création de site web",
    "agence web premium",
    "site vitrine Maroc",
    "Evorya",
    "design web Casablanca",
  ],
  authors: [{ name: SITE.name }],
  openGraph: {
    type: "website",
    locale: "fr_FR",
    url: SITE.url,
    siteName: SITE.name,
    title: `${SITE.name} — Expériences digitales premium`,
    description: SITE.description,
    images: [
      {
        url: "/evorya-logo.png",
        width: 1983,
        height: 793,
        alt: "Evorya Project",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: `${SITE.name} — Expériences digitales premium`,
    description: SITE.description,
    images: ["/evorya-logo.png"],
  },
  icons: {
    icon: "/favicon.ico",
  },
};

export const viewport: Viewport = {
  themeColor: "#050505",
  colorScheme: "dark",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="fr"
      className={`${spaceGrotesk.variable} ${oxanium.variable}`}
    >
      <body className="bg-[#050505] text-[#f2f2f2] antialiased">
        {children}
      </body>
    </html>
  );
}
