"use client";

import Link from "next/link";
import { useTemplateSelection } from "@/lib/templates/selection-context";
import { Reveal, SectionNumber, focusRing, focusRingLight, useDisplay } from "../ui";

const STEPS = [
  {
    index: "01",
    title: "Vous nous dites ce que vous cherchez",
    body: "Surface utile, quartier, budget, échéance. Trois minutes suffisent pour cadrer la recherche.",
  },
  {
    index: "02",
    title: "Nous préparons une sélection",
    body: "Biens publiés et biens confidentiels, avec plan, exposition et points de vigilance pour chacun.",
  },
  {
    index: "03",
    title: "Nous organisons les visites",
    body: "Regroupées sur une demi-journée quand c'est possible, à l'heure où le bien se montre le mieux.",
  },
];

const COORDS = [
  { label: "Téléphone", value: "05 22 00 00 00" },
  { label: "Email", value: "contact@atrium-immobilier.example" },
  { label: "Agence", value: "Casablanca — Anfa" },
  { label: "Horaires", value: "Lundi au samedi, 9h — 19h" },
];

export default function Contact() {
  const { select } = useTemplateSelection();
  const display = useDisplay();

  return (
    <section
      id="contact"
      className="scroll-mt-28 border-b border-[#DCD7CD] bg-[#F4F1EC] lg:scroll-mt-32"
    >
      <div className="mx-auto max-w-[1400px] px-5 pt-16 pb-16 sm:px-8 lg:px-10 lg:pt-24 lg:pb-24">
        <div className="lg:grid lg:grid-cols-12 lg:gap-14">
          <div className="lg:col-span-6">
            <Reveal>
              <SectionNumber value="07" label="Prendre rendez-vous" />
            </Reveal>
            <Reveal delay={0.05}>
              <h2
                className={`${display} mt-8 max-w-xl text-[2rem] leading-[1.08] font-semibold tracking-[-0.02em] text-[#14181D] sm:text-[2.6rem] lg:text-[3rem]`}
              >
                Organisons la visite.
              </h2>
            </Reveal>
            <Reveal delay={0.1}>
              <p className="mt-6 max-w-lg text-[1.0625rem] leading-[1.75] text-[#3A444F]">
                Un bien vous intéresse, ou vous souhaitez faire estimer le vôtre :
                l&rsquo;agence vous rappelle sous 48 heures ouvrées, avec un premier avis
                déjà préparé.
              </p>
            </Reveal>

            <ol className="mt-10 border-t border-[#DCD7CD]">
              {STEPS.map((step, i) => (
                <Reveal as="li" key={step.index} delay={0.05 * i}>
                  <div className="border-b border-[#DCD7CD] py-6 sm:flex sm:gap-8">
                    <span className="block text-[0.75rem] font-medium tracking-[0.2em] text-[#8A6A3B] tabular-nums sm:pt-1">
                      {step.index}
                    </span>
                    <div className="mt-3 sm:mt-0">
                      <h3 className={`${display} text-lg font-semibold text-[#14181D]`}>
                        {step.title}
                      </h3>
                      <p className="mt-2 max-w-md text-[0.95rem] leading-relaxed text-[#3A444F]">
                        {step.body}
                      </p>
                    </div>
                  </div>
                </Reveal>
              ))}
            </ol>
          </div>

          <div className="mt-12 lg:col-span-6 lg:mt-0">
            <Reveal delay={0.08}>
              <div className="bg-[#2B3A4A] p-7 text-white sm:p-9 lg:p-10">
                <h3 className={`${display} text-2xl font-semibold sm:text-[1.7rem]`}>
                  Contacter l&rsquo;agence
                </h3>
                <p className="mt-3 max-w-sm text-[0.98rem] leading-relaxed text-[#C9D6DF]">
                  Par téléphone aux heures d&rsquo;ouverture, ou par email à toute heure —
                  précisez la référence du bien si vous en avez une.
                </p>

                <dl className="mt-8 border-t border-white/15">
                  {COORDS.map((coord) => (
                    <div
                      key={coord.label}
                      className="flex flex-col gap-1 border-b border-white/15 py-4 sm:flex-row sm:items-baseline sm:justify-between sm:gap-6"
                    >
                      <dt className="text-[0.75rem] font-medium tracking-[0.18em] uppercase text-[#A9BCCB]">
                        {coord.label}
                      </dt>
                      <dd className="text-[1rem] font-medium break-words text-white">
                        {coord.value}
                      </dd>
                    </div>
                  ))}
                </dl>

                <p className="mt-6 text-[0.8rem] leading-relaxed text-[#A9BCCB]">
                  Atrium Immobilier est une marque fictive créée pour cette démonstration :
                  ces coordonnées ne correspondent à aucune agence réelle et ne sont donc pas
                  cliquables.
                </p>

                <Link
                  href="/#contact"
                  onClick={() => select("immobilier")}
                  className={`mt-8 inline-flex h-[52px] w-full items-center justify-center rounded-full bg-white px-6 text-base font-medium text-[#14181D] transition-colors hover:bg-[#C9D6DF] ${focusRingLight}`}
                >
                  Parler de ce projet à Evorya
                </Link>
              </div>
            </Reveal>
          </div>
        </div>

        <Reveal delay={0.05}>
          <div className="mt-14 border-t border-[#DCD7CD] pt-8 sm:flex sm:items-baseline sm:justify-between sm:gap-8">
            <p className="max-w-2xl text-[1.0625rem] leading-relaxed text-[#3A444F]">
              Cette approche vous parle pour votre activité ?{" "}
              <span className="text-[#14181D]">Evorya peut la construire pour vous.</span>
            </p>
            <Link
              href="/#contact"
              onClick={() => select("immobilier")}
              className={`mt-5 inline-flex h-12 shrink-0 items-center rounded-full border border-[#2B3A4A] px-6 text-[0.95rem] font-medium text-[#14181D] transition-colors hover:bg-[#2B3A4A] hover:text-white sm:mt-0 ${focusRing}`}
            >
              Démarrer un projet
            </Link>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
