import Image from "next/image";
import { NAV_LINKS, SITE } from "@/lib/config";
import type { FooterContent } from "@/lib/cms/types";

export default function Footer({ content }: { content: FooterContent }) {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-line bg-ink px-6 pb-10 pt-16 sm:px-8 lg:px-12">
      <div className="mx-auto max-w-[1440px]">
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-8">
          <div className="lg:col-span-5">
            <Image
              src="/evorya-logo.png"
              alt="Evorya Project"
              width={200}
              height={80}
              className="h-9 w-auto"
            />
            <p className="mt-6 max-w-xs text-sm text-mist">{content.tagline}</p>
            <p className="mt-2 text-sm text-mist-dim">{content.location}</p>
            <a
              href={`mailto:${SITE.email}`}
              className="mt-4 inline-block text-sm text-paper-dim underline decoration-line-strong underline-offset-4 transition-colors hover:decoration-paper"
            >
              {SITE.email}
            </a>
          </div>

          <nav
            className="flex flex-wrap gap-x-8 gap-y-4 lg:col-span-4 lg:col-start-7"
            aria-label="Navigation du pied de page"
          >
            {NAV_LINKS.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="font-display text-xs uppercase tracking-[0.25em] text-mist transition-colors hover:text-paper"
              >
                {link.label}
              </a>
            ))}
          </nav>

          <div className="flex flex-col justify-between gap-6 lg:col-span-3 lg:items-end">
            <span className="font-display text-xs uppercase tracking-[0.3em] text-mist-dim">
              EST. {SITE.founded}
            </span>
          </div>
        </div>

        <div className="mt-16 flex flex-col gap-4 border-t border-line pt-8 sm:flex-row sm:items-center sm:justify-between">
          <span className="font-display text-xs uppercase tracking-[0.25em] text-mist-dim">
            {SITE.name}
          </span>
          <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-xs text-mist-dim">
            <span>© {year} Evorya Project. Tous droits réservés.</span>
            <a
              href="/conditions"
              className="underline decoration-line-strong underline-offset-4 transition-colors hover:text-paper-dim hover:decoration-paper"
            >
              Conditions
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
