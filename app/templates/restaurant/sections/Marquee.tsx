"use client";

import { MARQUEE_WORDS } from "../data";

/**
 * Bande défilante. Deux rails superposés qui partent en sens inverse : le
 * premier en aplat rouge, le second en lettres évidées sur le noir — ça
 * suffit à donner du mouvement sans qu'aucun mot ne devienne illisible.
 *
 * C'est une animation CSS pure (`.krush-track`, définie dans page.tsx) :
 * un défilement permanent n'a aucune raison de faire travailler React, et
 * `prefers-reduced-motion` le fige proprement à sa position initiale.
 *
 * Le contenu est dupliqué à l'identique (translate -50 %) : c'est ce qui
 * rend la boucle invisible. La copie est `aria-hidden` pour qu'un lecteur
 * d'écran n'entende pas la liste deux fois.
 */
function Rail({
  words,
  d,
  duration,
  reverse = false,
  tone,
}: {
  words: readonly string[];
  d: string;
  duration: string;
  reverse?: boolean;
  tone: "solid" | "outline";
}) {
  const item = (word: string, key: string) => (
    <span key={key} className="flex shrink-0 items-center">
      <span
        /* pt-[0.16em] : le rail est en `overflow-hidden` et la hauteur de ligne
           est nulle — sans cette marge, l'accent du É de SMASHÉ est tranché. */
        className={`${d} px-4 pt-[0.16em] text-[9vw] uppercase leading-none tracking-[-0.01em] sm:px-6 sm:text-[7vw] lg:px-8 lg:text-[5.4vw] ${
          tone === "outline" ? "krush-outline" : ""
        }`}
      >
        {word}
      </span>
      <span
        aria-hidden="true"
        className={`h-[0.5vw] w-[0.5vw] min-h-[5px] min-w-[5px] shrink-0 ${
          tone === "solid" ? "bg-[#0B0B0C]" : "bg-[#FF3B1F]"
        }`}
      />
    </span>
  );

  return (
    <div
      className={`krush-track ${reverse ? "krush-track-rev" : ""}`}
      style={{ ["--krush-dur" as string]: duration }}
    >
      <span className="flex shrink-0 items-center">
        {words.map((w) => item(w, `a-${w}`))}
      </span>
      <span aria-hidden="true" className="flex shrink-0 items-center">
        {words.map((w) => item(w, `b-${w}`))}
      </span>
    </div>
  );
}

export default function Marquee({ d }: { d: string }) {
  return (
    <section aria-label="Signes de la maison" className="relative overflow-hidden">
      <div className="overflow-hidden bg-[#FF3B1F] py-2 text-[#0B0B0C] sm:py-3">
        <Rail words={MARQUEE_WORDS} d={d} duration="34s" tone="solid" />
      </div>
      <div className="overflow-hidden border-y border-[#F4EFE6]/10 bg-[#0B0B0C] py-2 sm:py-3">
        <Rail words={MARQUEE_WORDS} d={d} duration="46s" tone="outline" reverse />
      </div>
    </section>
  );
}
