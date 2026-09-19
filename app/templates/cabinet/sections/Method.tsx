"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { C, EASE } from "../theme";
import { MaskText, Reveal, SectionMark, Shell, useDisplay } from "../primitives";
import Photo from "../Photo";
import { METHOD, METHOD_PLATES, PHOTOS } from "../data";

/**
 * Méthode d'intervention, en aplat bleu nuit : c'est le bloc de couleur
 * structurant de la page. Les quatre temps sont présentés comme un dossier
 * qu'on ouvre — une seule étape dépliée à la fois, jamais deux.
 */
export default function Method() {
  const display = useDisplay();
  const [openIndex, setOpenIndex] = useState(0);

  return (
    <section
      id="methode"
      className="bg-noise scroll-mt-24"
      style={{ backgroundColor: C.navy }}
    >
      <Shell className="py-16 sm:py-20 lg:py-28">
        <Reveal>
          <SectionMark index="03" label="Méthode d’intervention" tone="dark" />
        </Reveal>

        <div className="mt-8 grid grid-cols-1 gap-6 lg:mt-12 lg:grid-cols-12 lg:gap-12">
          <h2
            className={`${display} text-[1.7rem] font-medium leading-[1.16] tracking-[-0.012em] sm:text-[2.2rem] lg:col-span-6 lg:text-[2.6rem]`}
            style={{ color: C.paper }}
          >
            <MaskText>Quatre temps,</MaskText>
            <MaskText delay={0.08}>écrits à l&rsquo;avance.</MaskText>
          </h2>
          <Reveal delay={0.12} className="lg:col-span-5 lg:col-start-8 lg:pt-2">
            <p
              className="max-w-[48ch] text-[15px] leading-[1.8] sm:text-base"
              style={{ color: C.fog }}
            >
              Chaque mission suit la même séquence, quel que soit le domaine. Vous
              savez, dès le premier rendez-vous, ce qui sera produit, quand, et par
              qui.
            </p>
          </Reveal>
        </div>

        <div className="mt-12 sm:mt-14 lg:mt-16">
          <div aria-hidden="true" className="h-px w-full" style={{ backgroundColor: C.ruleDark }} />

          {METHOD.map((step, i) => {
            const isOpen = i === openIndex;
            const panelId = `methode-panel-${step.index}`;
            const buttonId = `methode-bouton-${step.index}`;

            return (
              <div
                key={step.index}
                className="border-b"
                style={{ borderColor: C.ruleDark }}
              >
                <h3 className={display}>
                  <button
                    type="button"
                    id={buttonId}
                    aria-expanded={isOpen}
                    aria-controls={panelId}
                    onClick={() => setOpenIndex(isOpen ? -1 : i)}
                    className="group flex w-full items-center gap-4 py-5 text-left sm:gap-6 sm:py-7"
                  >
                    <span
                      className="w-8 shrink-0 text-[11px] font-normal tracking-[0.2em] sm:w-10 sm:text-xs"
                      style={{ color: isOpen ? C.brass : C.fog }}
                    >
                      {step.index}
                    </span>
                    <span
                      className="flex-1 text-[1.15rem] font-medium leading-[1.25] tracking-[-0.005em] transition-opacity sm:text-[1.5rem] lg:text-[1.75rem]"
                      style={{ color: C.paper, opacity: isOpen ? 1 : 0.78 }}
                    >
                      {step.title}
                    </span>
                    <span
                      aria-hidden="true"
                      className="relative ml-2 block h-11 w-11 shrink-0 border"
                      style={{ borderColor: C.ruleDark }}
                    >
                      <span
                        className="absolute left-1/2 top-1/2 block h-px w-3 -translate-x-1/2 -translate-y-1/2"
                        style={{ backgroundColor: C.paper }}
                      />
                      <motion.span
                        className="absolute left-1/2 top-1/2 block h-3 w-px -translate-x-1/2 -translate-y-1/2"
                        style={{ backgroundColor: C.paper }}
                        animate={{ scaleY: isOpen ? 0 : 1 }}
                        transition={{ duration: 0.3, ease: EASE }}
                      />
                    </span>
                  </button>
                </h3>

                <AnimatePresence initial={false}>
                  {isOpen ? (
                    <motion.div
                      key="panel"
                      id={panelId}
                      role="region"
                      aria-labelledby={buttonId}
                      className="overflow-hidden"
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.4, ease: EASE }}
                    >
                      <div className="grid grid-cols-1 gap-6 pb-8 sm:gap-8 lg:grid-cols-12 lg:gap-12 lg:pb-12 lg:pl-16">
                        <div className="lg:col-span-7">
                          <p
                            className="text-[15px] leading-[1.7] sm:text-[17px]"
                            style={{ color: C.paper }}
                          >
                            {step.lead}
                          </p>
                          <p
                            className="mt-4 max-w-[62ch] text-[14px] leading-[1.8] sm:text-[15px]"
                            style={{ color: C.fog }}
                          >
                            {step.body}
                          </p>
                        </div>
                        <div className="lg:col-span-4 lg:col-start-9">
                          <p
                            className="text-[10px] uppercase tracking-[0.24em]"
                            style={{ color: C.fog }}
                          >
                            Ce que vous recevez
                          </p>
                          <ul className="mt-3">
                            {step.outputs.map((output) => (
                              <li
                                key={output}
                                className="border-t py-2.5 text-[13px] leading-snug sm:text-[14px]"
                                style={{ borderColor: C.ruleDark, color: C.paper }}
                              >
                                {output}
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    </motion.div>
                  ) : null}
                </AnimatePresence>
              </div>
            );
          })}
        </div>

        {/* Deux plaques photographiques décalées : ce que la méthode produit
            (un dossier) et où elle se déroule (deux bureaux, un terrain). */}
        <ul className="mt-12 grid grid-cols-1 gap-8 sm:mt-16 sm:grid-cols-2 sm:gap-6 lg:gap-10">
          {METHOD_PLATES.map((plate, i) => (
            <li key={plate.photo} className={i === 1 ? "sm:mt-12 lg:mt-20" : ""}>
              <figure>
                <Photo
                  asset={PHOTOS[plate.photo]}
                  sizes="(min-width: 640px) 44vw, 92vw"
                  className={`w-full ${i === 0 ? "aspect-[4/3]" : "aspect-[3/2]"}`}
                  tone={0.24}
                  frame
                  delay={0.05 * i}
                />
                <figcaption
                  className="mt-3 flex items-baseline gap-3 text-[12px] leading-relaxed sm:text-[13px]"
                  style={{ color: C.fog }}
                >
                  <span
                    aria-hidden="true"
                    className="h-px w-6 shrink-0 translate-y-[-3px]"
                    style={{ backgroundColor: C.brass }}
                  />
                  {plate.caption}
                </figcaption>
              </figure>
            </li>
          ))}
        </ul>
      </Shell>
    </section>
  );
}
