"use client";

import { useState } from "react";
import type { FormEvent } from "react";
import { AnimatePresence, motion } from "motion/react";
import { C, EASE } from "../theme";
import { MaskText, Reveal, SectionMark, Shell, useDisplay } from "../primitives";
import Photo from "../Photo";
import { CONTACT, PHOTOS, SUBJECTS } from "../data";

const fieldClass =
  "h-12 w-full border px-3.5 text-[16px] outline-none transition-colors placeholder:text-[#8B93A0]";
const labelClass = "block text-[10px] uppercase tracking-[0.22em]";

/**
 * Demande de rendez-vous. Le formulaire est complet et accessible mais
 * n'émet aucune requête : cette page est une démonstration, ce qui est
 * indiqué au-dessus du champ d'envoi et rappelé à la confirmation.
 */
export default function Contact() {
  const display = useDisplay();
  const [sent, setSent] = useState(false);

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSent(true);
  }

  return (
    <section
      id="contact"
      className="scroll-mt-24 border-t"
      style={{ backgroundColor: C.paperPure, borderColor: C.rule }}
    >
      <Shell className="py-16 sm:py-20 lg:py-28">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-12 lg:gap-12">
          {/* Coordonnées */}
          <div className="lg:col-span-5">
            <Reveal>
              <SectionMark index="07" label="Prendre rendez-vous" />
            </Reveal>

            <h2
              className={`${display} mt-6 text-[1.7rem] font-medium leading-[1.16] tracking-[-0.012em] sm:text-[2.2rem] lg:text-[2.5rem]`}
              style={{ color: C.ink }}
            >
              <MaskText>Le premier échange</MaskText>
              <MaskText delay={0.08}>ne vous engage à rien.</MaskText>
            </h2>

            <Reveal delay={0.12}>
              <p
                className="mt-6 max-w-[46ch] text-[15px] leading-[1.8] sm:text-base"
                style={{ color: C.slate }}
              >
                Décrivez votre situation en quelques lignes. Un associé vous rappelle
                sous deux jours ouvrés pour convenir d&rsquo;un rendez-vous, dans nos
                bureaux ou en visioconférence.
              </p>
            </Reveal>

            <div className="mt-10 grid grid-cols-1 gap-x-10 sm:grid-cols-2 lg:grid-cols-1">
              <Reveal delay={0.05} className="border-t py-4" style={{ borderColor: C.rule }}>
                <p className={labelClass} style={{ color: C.slate }}>
                  Bureau de Paris
                </p>
                <address className="mt-2 text-[15px] not-italic leading-[1.6]" style={{ color: C.ink }}>
                  {CONTACT.addressLines.map((line) => (
                    <span key={line} className="block">
                      {line}
                    </span>
                  ))}
                </address>
              </Reveal>

              <Reveal delay={0.08} className="border-t py-4" style={{ borderColor: C.rule }}>
                <p className={labelClass} style={{ color: C.slate }}>
                  Bureau de Lyon
                </p>
                <address className="mt-2 text-[15px] not-italic leading-[1.6]" style={{ color: C.ink }}>
                  {CONTACT.secondaryAddressLines.map((line) => (
                    <span key={line} className="block">
                      {line}
                    </span>
                  ))}
                </address>
              </Reveal>

              <Reveal delay={0.11} className="border-t py-4" style={{ borderColor: C.rule }}>
                <p className={labelClass} style={{ color: C.slate }}>
                  Contact direct
                </p>
                <p className="mt-2 flex flex-col gap-1 text-[15px]">
                  <a
                    href={`tel:${CONTACT.phone.replace(/\s/g, "")}`}
                    className="inline-block py-1 underline decoration-[#B4BAC3] underline-offset-4 transition-colors hover:decoration-[#141B26]"
                    style={{ color: C.ink }}
                  >
                    {CONTACT.phone}
                  </a>
                  <a
                    href={`mailto:${CONTACT.email}`}
                    className="inline-block py-1 underline decoration-[#B4BAC3] underline-offset-4 transition-colors hover:decoration-[#141B26]"
                    style={{ color: C.ink }}
                  >
                    {CONTACT.email}
                  </a>
                </p>
              </Reveal>

              <Reveal delay={0.14} className="border-y py-4" style={{ borderColor: C.rule }}>
                <p className={labelClass} style={{ color: C.slate }}>
                  Horaires
                </p>
                <p className="mt-2 text-[15px]" style={{ color: C.ink }}>
                  {CONTACT.hours}
                </p>
              </Reveal>
            </div>

            {/* La colonne de gauche s'arrêtait bien avant le bas du formulaire
                sur grand écran : la salle où se tient le premier rendez-vous
                referme la composition. */}
            <figure className="mt-10 lg:mt-12">
              <Photo
                asset={PHOTOS.salle}
                sizes="(min-width: 1024px) 40vw, 92vw"
                className="aspect-[3/2] w-full lg:aspect-[4/3]"
                tone={0.14}
                delay={0.06}
              />
              <figcaption
                className="mt-3 flex items-baseline gap-3 text-[11px] leading-relaxed"
                style={{ color: C.slate }}
              >
                <span
                  aria-hidden="true"
                  className="h-px w-6 shrink-0 translate-y-[-3px]"
                  style={{ backgroundColor: C.brass }}
                />
                Le premier échange dure environ une heure, ici ou en visioconférence.
              </figcaption>
            </figure>
          </div>

          {/* Formulaire */}
          <div className="lg:col-span-6 lg:col-start-7">
            <Reveal delay={0.08}>
              <div className="border p-5 sm:p-8" style={{ borderColor: C.ruleStrong, backgroundColor: C.paper }}>
                <AnimatePresence mode="wait" initial={false}>
                  {sent ? (
                    <motion.div
                      key="confirmation"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.4, ease: EASE }}
                      className="py-10 text-center sm:py-16"
                      role="status"
                    >
                      <span
                        aria-hidden="true"
                        className="mx-auto block h-px w-12"
                        style={{ backgroundColor: C.brass }}
                      />
                      <h3
                        className={`${display} mt-6 text-[1.4rem] font-medium sm:text-[1.7rem]`}
                        style={{ color: C.ink }}
                      >
                        Demande enregistrée.
                      </h3>
                      <p
                        className="mx-auto mt-3 max-w-[38ch] text-[14px] leading-[1.7]"
                        style={{ color: C.slate }}
                      >
                        Sur un site en production, un associé vous rappellerait sous deux
                        jours ouvrés. Ici, rien n&rsquo;a été transmis : cette page est une
                        démonstration.
                      </p>
                      <button
                        type="button"
                        onClick={() => setSent(false)}
                        className="mt-8 h-11 px-6 text-[11px] uppercase tracking-[0.2em] underline decoration-[#B4BAC3] underline-offset-4 transition-colors hover:decoration-[#141B26]"
                        style={{ color: C.ink }}
                      >
                        Revenir au formulaire
                      </button>
                    </motion.div>
                  ) : (
                    <motion.form
                      key="formulaire"
                      onSubmit={handleSubmit}
                      noValidate={false}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.3, ease: EASE }}
                    >
                      <p
                        className="border-l pl-4 text-[12px] leading-relaxed"
                        style={{ borderColor: C.brass, color: C.slate }}
                      >
                        {CONTACT.formNotice}
                      </p>

                      <div className="mt-7 grid grid-cols-1 gap-5 sm:grid-cols-2">
                        <div>
                          <label htmlFor="v-nom" className={labelClass} style={{ color: C.slate }}>
                            Nom et prénom
                          </label>
                          <input
                            id="v-nom"
                            name="nom"
                            type="text"
                            required
                            autoComplete="name"
                            className={`${fieldClass} mt-2 focus:border-[#141B26]`}
                            style={{ borderColor: C.rule, backgroundColor: C.paperPure, color: C.ink }}
                          />
                        </div>
                        <div>
                          <label htmlFor="v-societe" className={labelClass} style={{ color: C.slate }}>
                            Société
                          </label>
                          <input
                            id="v-societe"
                            name="societe"
                            type="text"
                            autoComplete="organization"
                            className={`${fieldClass} mt-2 focus:border-[#141B26]`}
                            style={{ borderColor: C.rule, backgroundColor: C.paperPure, color: C.ink }}
                          />
                        </div>
                        <div>
                          <label htmlFor="v-email" className={labelClass} style={{ color: C.slate }}>
                            Adresse email
                          </label>
                          <input
                            id="v-email"
                            name="email"
                            type="email"
                            required
                            autoComplete="email"
                            className={`${fieldClass} mt-2 focus:border-[#141B26]`}
                            style={{ borderColor: C.rule, backgroundColor: C.paperPure, color: C.ink }}
                          />
                        </div>
                        <div>
                          <label htmlFor="v-tel" className={labelClass} style={{ color: C.slate }}>
                            Téléphone <span className="tracking-normal normal-case">(facultatif)</span>
                          </label>
                          <input
                            id="v-tel"
                            name="telephone"
                            type="tel"
                            autoComplete="tel"
                            className={`${fieldClass} mt-2 focus:border-[#141B26]`}
                            style={{ borderColor: C.rule, backgroundColor: C.paperPure, color: C.ink }}
                          />
                        </div>
                      </div>

                      <div className="mt-5">
                        <label htmlFor="v-sujet" className={labelClass} style={{ color: C.slate }}>
                          Sujet
                        </label>
                        <div className="relative mt-2">
                          <select
                            id="v-sujet"
                            name="sujet"
                            defaultValue={SUBJECTS[0]}
                            className={`${fieldClass} appearance-none pr-10 focus:border-[#141B26]`}
                            style={{ borderColor: C.rule, backgroundColor: C.paperPure, color: C.ink }}
                          >
                            {SUBJECTS.map((subject) => (
                              <option key={subject} value={subject}>
                                {subject}
                              </option>
                            ))}
                          </select>
                          {/* Chevron dessiné : le natif disparaît avec appearance-none. */}
                          <span
                            aria-hidden="true"
                            className="pointer-events-none absolute right-4 top-1/2 block h-2 w-2 -translate-y-2/3 rotate-45 border-b border-r"
                            style={{ borderColor: C.slate }}
                          />
                        </div>
                      </div>

                      <div className="mt-5">
                        <label htmlFor="v-message" className={labelClass} style={{ color: C.slate }}>
                          Votre situation
                        </label>
                        <textarea
                          id="v-message"
                          name="message"
                          required
                          rows={5}
                          className="mt-2 w-full border px-3.5 py-3 text-[16px] leading-[1.6] outline-none transition-colors focus:border-[#141B26]"
                          style={{ borderColor: C.rule, backgroundColor: C.paperPure, color: C.ink }}
                        />
                      </div>

                      <div className="mt-5 flex items-start gap-3 py-1">
                        <input
                          id="v-accord"
                          name="accord"
                          type="checkbox"
                          required
                          className="mt-0.5 h-5 w-5 shrink-0 border"
                          style={{ borderColor: C.ruleStrong, accentColor: C.ink }}
                        />
                        <label
                          htmlFor="v-accord"
                          className="text-[13px] leading-[1.6]"
                          style={{ color: C.slate }}
                        >
                          J&rsquo;accepte que ces informations soient utilisées pour être
                          recontacté au sujet de ma demande.
                        </label>
                      </div>

                      <button
                        type="submit"
                        className="mt-7 flex h-12 w-full items-center justify-center px-8 text-[11px] uppercase tracking-[0.22em] transition-opacity hover:opacity-90 sm:w-auto sm:text-xs"
                        style={{ backgroundColor: C.ink, color: C.paper }}
                      >
                        Demander un rendez-vous
                      </button>
                    </motion.form>
                  )}
                </AnimatePresence>
              </div>
            </Reveal>
          </div>
        </div>
      </Shell>
    </section>
  );
}
