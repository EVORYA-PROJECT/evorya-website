"use client";

import { useState, type FormEvent } from "react";
import { AnimatePresence, motion } from "motion/react";
import { PHOTOS, ROOMS } from "./data";
import { RZ, zellige } from "./decor";
import { Eyebrow, Photo, Reveal } from "./ui";

/**
 * Demande de disponibilité.
 *
 * Étape d'intérêt simulée uniquement : rien n'est envoyé, rien n'est stocké,
 * et il n'existe volontairement aucun tunnel de paiement. L'objectif est de
 * montrer au prospect à quoi ressemble une prise de contact hôtelière soignée,
 * pas de faire croire à une réservation réelle — la mention est explicite sous
 * le formulaire et dans l'écran de confirmation.
 */

const fieldClass =
  "mt-2 min-h-[48px] w-full rounded-[2px] border bg-transparent px-3 text-[1rem] outline-none transition-colors";

const fieldStyle = {
  borderColor: "rgba(34,48,44,0.22)",
  color: RZ.encre,
} as const;

const labelClass = "block text-[0.78rem] uppercase tracking-[0.2em]";

export default function Reservation({ display }: { display: string }) {
  const [sent, setSent] = useState(false);

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSent(true);
  }

  return (
    <section
      id="reservation"
      aria-labelledby="reservation-titre"
      className="relative scroll-mt-28 overflow-hidden px-5 py-20 sm:px-8 sm:py-24 lg:px-12 lg:py-32"
      style={{ backgroundColor: RZ.nuit }}
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0"
        style={{
          backgroundImage: zellige("d8c9a3", 0.7),
          backgroundSize: "88px 88px",
          opacity: 0.08,
        }}
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0"
        style={{
          backgroundImage:
            "radial-gradient(90% 70% at 15% 0%, rgba(176,125,58,0.22), transparent 62%)",
        }}
      />

      <div className="relative mx-auto grid max-w-[1400px] gap-12 lg:grid-cols-12 lg:gap-16">
        <div className="lg:col-span-5">
          <Reveal>
            <Eyebrow>Réserver</Eyebrow>
            <h2
              id="reservation-titre"
              className={`${display} mt-6 text-[2.25rem] leading-[1.08] sm:text-[3rem] lg:text-[3.5rem]`}
              style={{ color: RZ.chaux }}
            >
              Dites-nous quand vous arrivez.
            </h2>
            <p
              className="mt-6 max-w-md text-[1rem] leading-relaxed"
              style={{ color: RZ.brumeClaire }}
            >
              Nous répondons sous 24 heures avec les chambres réellement libres à
              vos dates, et nous organisons le transfert si vous le souhaitez.
            </p>

            <dl className="mt-10 space-y-5 text-[0.95rem]">
              <div>
                <dt
                  className="text-[0.75rem] uppercase tracking-[0.24em]"
                  style={{ color: RZ.sable }}
                >
                  Écrire
                </dt>
                <dd className="mt-1" style={{ color: RZ.chaux }}>
                  bonjour@riadzellige.demo
                </dd>
              </div>
              <div>
                <dt
                  className="text-[0.75rem] uppercase tracking-[0.24em]"
                  style={{ color: RZ.sable }}
                >
                  Appeler
                </dt>
                <dd className="mt-1" style={{ color: RZ.chaux }}>
                  +212 5 24 00 00 00
                </dd>
              </div>
              <div>
                <dt
                  className="text-[0.75rem] uppercase tracking-[0.24em]"
                  style={{ color: RZ.sable }}
                >
                  Réception
                </dt>
                <dd className="mt-1" style={{ color: RZ.chaux }}>
                  Tous les jours, 7h — 23h
                </dd>
              </div>
            </dl>
          </Reveal>

          <Reveal delay={0.1} className="mt-12 hidden lg:block">
            <Photo
              photo={PHOTOS.terrasseCrepuscule}
              className="h-56 w-full"
              sizes="(min-width: 1024px) 420px, 92vw"
              focus="50% 58%"
            />
          </Reveal>
        </div>

        <div className="lg:col-span-7">
          <Reveal delay={0.08} amount={0.1}>
            <div
              className="rounded-[2px] p-6 sm:p-9 lg:p-11"
              style={{ backgroundColor: "#fbf6ed" }}
            >
              <AnimatePresence mode="wait" initial={false}>
                {sent ? (
                  <motion.div
                    key="confirmation"
                    initial={{ opacity: 0, y: 16 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.8, ease: [0.22, 0.61, 0.36, 1] }}
                    className="py-6"
                  >
                    <p
                      className="text-[0.75rem] uppercase tracking-[0.24em]"
                      style={{ color: RZ.ocreProfond }}
                    >
                      Démonstration
                    </p>
                    <h3
                      className={`${display} mt-4 text-[1.9rem] leading-tight sm:text-[2.4rem]`}
                      style={{ color: RZ.encre }}
                    >
                      Votre demande serait partie.
                    </h3>
                    <p
                      className="mt-5 max-w-lg text-[1rem] leading-relaxed"
                      style={{ color: RZ.brume }}
                    >
                      Sur un vrai site, la réception recevrait immédiatement cette
                      demande et vous répondrait sous 24 heures. Ici,{" "}
                      <strong style={{ color: RZ.encre, fontWeight: 500 }}>
                        rien n&rsquo;a été envoyé ni enregistré
                      </strong>{" "}
                      : Riad Zellige est un établissement fictif créé pour cette
                      démonstration Evorya, et aucun paiement n&rsquo;est possible.
                    </p>
                    <button
                      type="button"
                      onClick={() => setSent(false)}
                      className="mt-8 inline-flex min-h-[48px] items-center border px-6 text-[0.85rem] uppercase tracking-[0.2em] transition-colors"
                      style={{ borderColor: "rgba(34,48,44,0.3)", color: RZ.encre }}
                    >
                      Revenir au formulaire
                    </button>
                  </motion.div>
                ) : (
                  <motion.form
                    key="formulaire"
                    onSubmit={handleSubmit}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.6 }}
                  >
                    <h3
                      className={`${display} text-[1.7rem] leading-tight sm:text-[2rem]`}
                      style={{ color: RZ.encre }}
                    >
                      Demande de disponibilité
                    </h3>

                    <div className="mt-8 grid gap-6 sm:grid-cols-2">
                      <div>
                        <label
                          htmlFor="rz-arrivee"
                          className={labelClass}
                          style={{ color: RZ.brume }}
                        >
                          Arrivée
                        </label>
                        <input
                          id="rz-arrivee"
                          name="arrivee"
                          type="date"
                          required
                          className={fieldClass}
                          style={fieldStyle}
                        />
                      </div>
                      <div>
                        <label
                          htmlFor="rz-depart"
                          className={labelClass}
                          style={{ color: RZ.brume }}
                        >
                          Départ
                        </label>
                        <input
                          id="rz-depart"
                          name="depart"
                          type="date"
                          required
                          className={fieldClass}
                          style={fieldStyle}
                        />
                      </div>
                      <div>
                        <label
                          htmlFor="rz-voyageurs"
                          className={labelClass}
                          style={{ color: RZ.brume }}
                        >
                          Voyageurs
                        </label>
                        <select
                          id="rz-voyageurs"
                          name="voyageurs"
                          defaultValue="2"
                          className={fieldClass}
                          style={fieldStyle}
                        >
                          <option value="1">1 voyageur</option>
                          <option value="2">2 voyageurs</option>
                          <option value="3">3 voyageurs</option>
                          <option value="4">4 voyageurs</option>
                          <option value="5">5 voyageurs ou plus</option>
                        </select>
                      </div>
                      <div>
                        <label
                          htmlFor="rz-chambre"
                          className={labelClass}
                          style={{ color: RZ.brume }}
                        >
                          Chambre souhaitée
                        </label>
                        <select
                          id="rz-chambre"
                          name="chambre"
                          defaultValue=""
                          className={fieldClass}
                          style={fieldStyle}
                        >
                          <option value="">Sans préférence</option>
                          {ROOMS.map((room) => (
                            <option key={room.id} value={room.id}>
                              {room.name}
                            </option>
                          ))}
                        </select>
                      </div>
                      <div className="sm:col-span-2">
                        <label
                          htmlFor="rz-email"
                          className={labelClass}
                          style={{ color: RZ.brume }}
                        >
                          Votre email
                        </label>
                        <input
                          id="rz-email"
                          name="email"
                          type="email"
                          required
                          placeholder="prenom@exemple.com"
                          className={fieldClass}
                          style={fieldStyle}
                        />
                      </div>
                      <div className="sm:col-span-2">
                        <label
                          htmlFor="rz-message"
                          className={labelClass}
                          style={{ color: RZ.brume }}
                        >
                          Un mot sur votre séjour
                          <span style={{ color: "rgba(92,107,99,0.7)" }}>
                            {" "}
                            (facultatif)
                          </span>
                        </label>
                        <textarea
                          id="rz-message"
                          name="message"
                          rows={4}
                          className={`${fieldClass} py-3 leading-relaxed`}
                          style={fieldStyle}
                          placeholder="Heure d'arrivée, transfert aéroport, occasion particulière…"
                        />
                      </div>
                    </div>

                    <button
                      type="submit"
                      className="mt-9 inline-flex min-h-[52px] w-full items-center justify-center px-8 text-[0.85rem] uppercase tracking-[0.2em] transition-[opacity,transform] duration-200 ease-out hover:opacity-90 active:scale-[0.98] motion-reduce:transition-none sm:w-auto"
                      style={{ backgroundColor: RZ.terre, color: "#fdf8f1" }}
                    >
                      Envoyer la demande
                    </button>

                    <p
                      className="mt-5 text-[0.82rem] leading-relaxed"
                      style={{ color: RZ.brume }}
                    >
                      Démonstration Evorya : aucune donnée n&rsquo;est envoyée, aucune
                      réservation n&rsquo;est enregistrée et aucun paiement
                      n&rsquo;est demandé.
                    </p>
                  </motion.form>
                )}
              </AnimatePresence>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
