"use client";

import { useLayoutEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import RevealOnScroll from "@/components/ui/RevealOnScroll";
import SectionLabel from "@/components/ui/SectionLabel";
import MagneticButton from "@/components/ui/MagneticButton";
import CustomSelect from "@/components/ui/CustomSelect";
import CountrySelect from "@/components/ui/CountrySelect";
import TermsModal from "@/components/ui/TermsModal";
import type { ContactContent, OfferRow } from "@/lib/cms/types";
import { DEFAULT_COUNTRY_CODE, getCountryByCode } from "@/lib/data/countries";
import {
  displayValueFromFull,
  formatPhoneField,
  reformatForNewDial,
  validatePhone,
} from "@/lib/phone";
import {
  contactFormSchema,
  flattenContactFormErrors,
  type ContactFormFieldErrors,
  type ContactFormValues,
} from "@/lib/validation/contact";

const BUDGET_OPTIONS = [
  { value: "< 2000 MAD", label: "Moins de 2 000 MAD" },
  { value: "2000-3500 MAD", label: "2 000 – 3 500 MAD" },
  { value: "3500-5000 MAD", label: "3 500 – 5 000 MAD" },
  { value: "> 5000 MAD", label: "Plus de 5 000 MAD" },
];

const WEBSITE_TYPE_OPTIONS = [
  { value: "Vitrine", label: "Site vitrine" },
  { value: "E-commerce", label: "Site e-commerce" },
  { value: "Portfolio", label: "Portfolio" },
  { value: "Autre", label: "Autre" },
];

type Status = "idle" | "sending" | "sent" | "error";

const inputClass =
  "w-full border-0 border-b border-line bg-transparent py-3 text-base text-paper outline-none transition-colors placeholder:text-mist-dim focus:border-paper";
const errorInputClass = "border-danger focus:border-danger";

const initialValues: ContactFormValues = {
  name: "",
  company: "",
  email: "",
  phone: "",
  offer: "",
  budget: "",
  websiteType: "",
  message: "",
  acceptedTerms: false,
  website: "",
  startedAt: 0,
};

function FieldError({ message }: { message?: string }) {
  if (!message) return null;
  return <span className="mt-1 text-xs text-danger">{message}</span>;
}

export default function Contact({
  content,
  offers,
}: {
  content: ContactContent;
  offers: OfferRow[];
}) {
  const offerOptions = [
    ...offers.map((offer) => ({ value: offer.name, label: offer.name })),
    { value: "A definir", label: "À définir ensemble" },
  ];
  const [values, setValues] = useState<ContactFormValues>(() => ({
    ...initialValues,
    startedAt: Date.now(),
  }));
  const [status, setStatus] = useState<Status>("idle");
  const [fieldErrors, setFieldErrors] = useState<ContactFormFieldErrors>({});
  const [serverError, setServerError] = useState<string | null>(null);
  const [countryCode, setCountryCode] = useState(DEFAULT_COUNTRY_CODE);
  const [termsOpen, setTermsOpen] = useState(false);
  const phoneInputRef = useRef<HTMLInputElement | null>(null);
  const pendingCaretRef = useRef<number | null>(null);
  const countryDial = getCountryByCode(countryCode)?.dial ?? "212";

  // Restaure la position du curseur après reformatage du téléphone : React
  // réapplique la valeur formatée après le rendu, donc le curseur doit être
  // repositionné juste après, une fois le DOM à jour.
  useLayoutEffect(() => {
    if (pendingCaretRef.current !== null && phoneInputRef.current) {
      phoneInputRef.current.setSelectionRange(pendingCaretRef.current, pendingCaretRef.current);
      pendingCaretRef.current = null;
    }
  }, [values.phone]);

  function updateField<K extends keyof ContactFormValues>(key: K, value: ContactFormValues[K]) {
    setValues((prev) => ({ ...prev, [key]: value }));
    setFieldErrors((prev) => ({ ...prev, [key]: undefined }));
  }

  function handlePhoneChange(e: React.ChangeEvent<HTMLInputElement>) {
    const caret = e.target.selectionStart ?? e.target.value.length;
    const { full, caret: nextCaret } = formatPhoneField(e.target.value, caret, countryDial);
    pendingCaretRef.current = nextCaret;
    updateField("phone", full);
  }

  function handleCountryChange(nextCode: string) {
    const previousDial = countryDial;
    const nextDial = getCountryByCode(nextCode)?.dial ?? previousDial;
    setCountryCode(nextCode);
    updateField("phone", reformatForNewDial(values.phone ?? "", previousDial, nextDial));
  }

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (status === "sending") return;

    const parsed = contactFormSchema.safeParse(values);
    if (!parsed.success) {
      setFieldErrors(flattenContactFormErrors(parsed.error));
      return;
    }

    if (validatePhone(values.phone ?? "", countryDial) === "incomplete") {
      setFieldErrors((prev) => ({
        ...prev,
        phone:
          countryDial === "212"
            ? "Numéro incomplet (9 chiffres attendus après +212)."
            : "Numéro incomplet.",
      }));
      return;
    }

    setStatus("sending");
    setServerError(null);

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(parsed.data),
      });

      const data = (await res.json().catch(() => null)) as
        | { ok: true }
        | { ok: false; error?: string; fieldErrors?: ContactFormFieldErrors }
        | null;

      if (data && data.ok) {
        setStatus("sent");
        return;
      }

      if (data && !data.ok && data.fieldErrors) {
        setFieldErrors(data.fieldErrors);
      }
      setServerError(
        (data && !data.ok && data.error) || "Une erreur est survenue. Merci de réessayer.",
      );
      setStatus("error");
    } catch {
      setServerError(
        `Impossible d'envoyer votre demande. Merci d'écrire directement à ${content.email}.`,
      );
      setStatus("error");
    }
  }

  return (
    <section
      id="contact"
      className="relative border-t border-line bg-ink px-6 py-28 sm:px-8 lg:px-12 lg:py-40"
    >
      <div className="mx-auto max-w-[1440px]">
        <RevealOnScroll>
          <SectionLabel index="08" label="Contact" />
        </RevealOnScroll>

        <div className="mt-10 grid gap-16 lg:mt-16 lg:grid-cols-12 lg:gap-8">
          <div className="lg:col-span-5">
            <RevealOnScroll delay={0.05}>
              <h2 className="max-w-md text-3xl font-medium tracking-tight text-paper sm:text-4xl lg:text-[2.75rem]">
                {content.heading}
              </h2>
            </RevealOnScroll>
            <RevealOnScroll delay={0.1}>
              <p className="mt-6 max-w-sm text-base text-mist sm:text-lg">
                {content.subheading}
              </p>
            </RevealOnScroll>

            <RevealOnScroll delay={0.15}>
              <div className="mt-12 border-t border-line pt-8">
                <p className="text-sm text-mist">{content.directLine}</p>
                <a
                  href={`mailto:${content.email}`}
                  className="mt-3 inline-block font-display text-lg uppercase tracking-[0.1em] text-paper underline decoration-line-strong decoration-1 underline-offset-4 transition-colors hover:decoration-paper sm:text-xl"
                >
                  {content.email}
                </a>
              </div>
            </RevealOnScroll>
          </div>

          <div className="lg:col-span-7">
            <RevealOnScroll delay={0.1}>
              <div className="relative min-h-[520px] border border-line p-7 sm:p-10">
                <AnimatePresence mode="wait">
                  {status === "sent" ? (
                    <motion.div
                      key="sent"
                      initial={{ opacity: 0, y: 12 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5 }}
                      className="flex h-full min-h-[460px] flex-col items-start justify-center"
                    >
                      <span className="font-display text-xs uppercase tracking-[0.3em] text-mist-dim">
                        Demande envoyée
                      </span>
                      <p className="mt-6 max-w-sm text-2xl font-medium text-paper sm:text-3xl">
                        Merci. Votre demande a bien été reçue.
                      </p>
                      <p className="mt-4 max-w-sm text-base text-mist">
                        Evorya reviendra vers vous prochainement.
                      </p>
                    </motion.div>
                  ) : (
                    <motion.form
                      key="form"
                      onSubmit={handleSubmit}
                      noValidate
                      initial={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.3 }}
                      className="grid grid-cols-1 gap-x-8 gap-y-6 sm:grid-cols-2"
                    >
                      {/* Honeypot anti-spam : invisible et ignoré par les vrais visiteurs */}
                      <div
                        aria-hidden="true"
                        className="pointer-events-none absolute h-0 w-0 overflow-hidden opacity-0"
                      >
                        <label>
                          Site web
                          <input
                            type="text"
                            name="website"
                            tabIndex={-1}
                            autoComplete="off"
                            value={values.website}
                            onChange={(e) => updateField("website", e.target.value)}
                          />
                        </label>
                      </div>

                      <label className="flex flex-col gap-1 text-sm text-mist">
                        Nom
                        <input
                          name="name"
                          type="text"
                          autoComplete="name"
                          placeholder="Votre nom"
                          value={values.name}
                          onChange={(e) => updateField("name", e.target.value)}
                          className={`${inputClass} ${fieldErrors.name ? errorInputClass : ""}`}
                        />
                        <FieldError message={fieldErrors.name} />
                      </label>

                      <label className="flex flex-col gap-1 text-sm text-mist">
                        Entreprise
                        <input
                          name="company"
                          type="text"
                          autoComplete="organization"
                          placeholder="Nom de votre entreprise"
                          value={values.company}
                          onChange={(e) => updateField("company", e.target.value)}
                          className={inputClass}
                        />
                      </label>

                      <label className="flex flex-col gap-1 text-sm text-mist">
                        Email
                        <input
                          name="email"
                          type="email"
                          autoComplete="email"
                          placeholder="vous@entreprise.com"
                          value={values.email}
                          onChange={(e) => updateField("email", e.target.value)}
                          className={`${inputClass} ${fieldErrors.email ? errorInputClass : ""}`}
                        />
                        <FieldError message={fieldErrors.email} />
                      </label>

                      <label className="flex flex-col gap-1 text-sm text-mist">
                        Téléphone
                        <div className="flex items-start gap-3">
                          <CountrySelect value={countryCode} onChange={handleCountryChange} />
                          <input
                            ref={phoneInputRef}
                            name="phone"
                            type="tel"
                            inputMode="tel"
                            autoComplete="tel"
                            placeholder="X XX XX XX XX"
                            value={displayValueFromFull(values.phone ?? "", countryDial)}
                            onChange={handlePhoneChange}
                            className={`${inputClass} flex-1 ${fieldErrors.phone ? errorInputClass : ""}`}
                          />
                        </div>
                        <FieldError message={fieldErrors.phone} />
                      </label>

                      <label className="flex flex-col gap-1 text-sm text-mist">
                        Offre souhaitée
                        <CustomSelect
                          value={values.offer ?? ""}
                          onChange={(v) => updateField("offer", v)}
                          placeholder="Sélectionner une offre"
                          options={offerOptions}
                        />
                      </label>

                      <label className="flex flex-col gap-1 text-sm text-mist">
                        Budget indicatif
                        <CustomSelect
                          value={values.budget ?? ""}
                          onChange={(v) => updateField("budget", v)}
                          placeholder="Sélectionner une fourchette"
                          options={BUDGET_OPTIONS}
                        />
                      </label>

                      <label className="flex flex-col gap-1 text-sm text-mist sm:col-span-2">
                        Type de site
                        <CustomSelect
                          value={values.websiteType ?? ""}
                          onChange={(v) => updateField("websiteType", v)}
                          placeholder="Sélectionner un type"
                          options={WEBSITE_TYPE_OPTIONS}
                        />
                      </label>

                      <label className="flex flex-col gap-1 text-sm text-mist sm:col-span-2">
                        Message
                        <textarea
                          name="message"
                          rows={4}
                          placeholder="Parlez-nous de votre projet..."
                          value={values.message}
                          onChange={(e) => updateField("message", e.target.value)}
                          className={`${inputClass} resize-none ${fieldErrors.message ? errorInputClass : ""}`}
                        />
                        <FieldError message={fieldErrors.message} />
                      </label>

                      <div className="sm:col-span-2">
                        <label className="flex cursor-pointer items-start gap-3 text-sm text-mist">
                          <input
                            type="checkbox"
                            checked={values.acceptedTerms}
                            onChange={(e) => updateField("acceptedTerms", e.target.checked)}
                            className="mt-1 h-4 w-4 shrink-0 cursor-pointer border border-line-strong bg-transparent accent-paper"
                          />
                          <span>
                            J&rsquo;ai lu et j&rsquo;accepte les{" "}
                            <button
                              type="button"
                              onClick={() => setTermsOpen(true)}
                              className="underline decoration-line-strong underline-offset-4 transition-colors hover:text-paper hover:decoration-paper"
                            >
                              Conditions du projet
                            </button>
                            .
                          </span>
                        </label>
                        <FieldError message={fieldErrors.acceptedTerms} />
                      </div>

                      {serverError && (
                        <p className="text-sm text-danger sm:col-span-2">{serverError}</p>
                      )}

                      <div className="sm:col-span-2">
                        <MagneticButton
                          type="submit"
                          disabled={status === "sending" || !values.acceptedTerms}
                          className="mt-2 inline-flex h-14 w-full items-center justify-center bg-paper px-8 font-display text-xs uppercase tracking-[0.25em] text-ink disabled:cursor-not-allowed disabled:opacity-60 sm:w-auto sm:px-10"
                        >
                          {status === "sending" ? "Envoi en cours…" : "Envoyer ma demande"}
                        </MagneticButton>
                      </div>
                    </motion.form>
                  )}
                </AnimatePresence>
              </div>
            </RevealOnScroll>
          </div>
        </div>
      </div>

      <TermsModal open={termsOpen} onClose={() => setTermsOpen(false)} />
    </section>
  );
}
