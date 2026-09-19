import type { Metadata, Viewport } from "next";
import { Space_Grotesk, Oxanium } from "next/font/google";
import { SITE } from "@/lib/config";
import { TemplateSelectionProvider } from "@/lib/templates/selection-context";
import { VisitorPreferencesProvider } from "@/components/providers/VisitorPreferencesProvider";
import HomeHashNavigationIntent from "@/components/ui/HomeHashNavigationIntent";
import HomeInitialScroll from "@/components/ui/HomeInitialScroll";
import "./globals.css";
import "./mobile.css";

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
    /*
     * `data-scroll-behavior="smooth"` : `globals.css` pose
     * `html { scroll-behavior: smooth }` pour les ancres internes. Sans cet
     * attribut, Next.js ne peut PAS neutraliser le défilement doux pendant une
     * navigation — sa remise à zéro du scroll devient alors une animation. On
     * arrivait donc sur une page (démos KRUSH, automobile…) affichée à
     * l'ancienne position de défilement, qui « remontait » ensuite toute seule,
     * en déclenchant au passage les animations au scroll. Avec l'attribut, Next
     * bascule temporairement en `scroll-behavior: auto` : la page s'ouvre
     * immédiatement en haut, et les ancres `#section` gardent leur douceur.
     */
    <html
      lang="fr"
      data-scroll-behavior="smooth"
      className={`${spaceGrotesk.variable} ${oxanium.variable}`}
    >
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `try{var t=location.pathname+location.search+location.hash,i=sessionStorage.getItem("evorya.page-hash-navigation"),n=performance.getEntriesByType("navigation")[0],b=n&&n.type==="back_forward"&&location.pathname==="/"&&location.hash==="#templates";if(!b&&i!==t){if(i)sessionStorage.removeItem("evorya.page-hash-navigation");sessionStorage.setItem("evorya.initial-scroll-restoration",history.scrollRestoration);sessionStorage.setItem("evorya.initial-page-hash",location.hash);history.scrollRestoration="manual";if(location.hash)history.replaceState(history.state,"",location.pathname+location.search);scrollTo(0,0)}}catch(e){}`,
          }}
        />
      </head>
      <body className="bg-[#050505] text-[#f2f2f2] antialiased">
        <VisitorPreferencesProvider>
          <HomeHashNavigationIntent />
          <HomeInitialScroll />
          <TemplateSelectionProvider>{children}</TemplateSelectionProvider>
        </VisitorPreferencesProvider>
      </body>
    </html>
  );
}
