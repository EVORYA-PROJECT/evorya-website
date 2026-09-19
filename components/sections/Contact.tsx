"use client";

import MobileDisclosure from "@/components/ui/MobileDisclosure";

import { useLayoutEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import RevealOnScroll from "@/components/ui/RevealOnScroll";
import SectionLabel from "@/components/ui/SectionLabel";
import MagneticButton from "@/components/ui/MagneticButton";
import CustomSelect from "@/components/ui/CustomSelect";
import CountrySelect from "@/components/ui/CountrySelect";
import { useVisitorPreferences } from "@/components/providers/VisitorPreferencesProvider";
import ChipToggleGroup from "@/components/ui/ChipToggleGroup";
import TermsModal from "@/components/ui/TermsModal";
import TemplateInspirationSelector, {
  NO_TEMPLATE_PREFERENCE,
} from "@/components/templates/TemplateInspirationSelector";
import type { ContactContent } from "@/lib/cms/types";
import { getCountryByCode } from "@/lib/data/countries";
import { formatTemplateInterest } from "@/lib/templates/registry";
import { useTemplateSelection } from "@/lib/templates/selection-context";
import {
  CONTENT_OPTIONS,
  FEATURE_OPTIONS,
  IDENTITY_OPTIONS,
  OBJECTIVE_OPTIONS,
  PROJECT_TYPE_OPTIONS,
  TIMELINE_OPTIONS,
} from "@/lib/data/contact-options";
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

const OTHER_VALUE = "Autre";

type Status = "idle" | "sending" | "sent" | "error";

const inputClass =
  "w-full border-0 border-b border-line bg-transparent py-3 text-base text-paper outline-none transition-colors placeholder:text-mist-dim focus:border-paper";
const errorInputClass = "border-danger focus:border-danger";

const initialValues: ContactFormValues = {
  name: "",
  company: "",
  email: "",
  phone: "",
  websiteType: "",
  objective: "",
  features: [],
  identityStatus: "",
  contentStatus: "",
  timeline: "",
  templateInterest: "",
  message: "",
  acceptedTerms: false,
  website: "",
  startedAt: 0,
};

function FieldError({ message }: { message?: string }) {
  if (!message) return null;
  return <span className="mt-1 text-xs text-danger">{message}</span>;
}

function GroupHeading({ children }: { children: string }) {
  return (
    <div className="border-t border-line pt-6 font-display text-[11px] uppercase tracking-[0.25em] text-mist-dim sm:col-span-2">
      {children}
    </div>
  );
}

export default function Contact({ content }: { content: ContactContent }) {
  const [values, setValues] = useState<ContactFormValues>(() => ({
    ...initialValues,
    startedAt: Date.now(),
  }));
  const [status, setStatus] = useState<Status>("idle");
  const [fieldErrors, setFieldErrors] = useState<ContactFormFieldErrors>({});
  const [serverError, setServerError] = useState<string | null>(null);
  const { phoneCountryCode: countryCode, setPhoneCountryCode } = useVisitorPreferences();
  const [termsOpen, setTermsOpen] = useState(false);
  // Précisions libres affichées seulement quand "Autre" est choisi — fusionnées
  // dans la valeur envoyée au submit, jamais stockées comme champs séparés
  // (voir handleSubmit) : pas besoin d'alourdir le schéma ou la base pour ça.
  const [websiteTypeOther, setWebsiteTypeOther] = useState("");
  const [objectiveOther, setObjectiveOther] = useState("");
  // Inspiration sélectionnée depuis /templates (facultative) — source unique
  // partagée avec la galerie et chaque démo, voir lib/templates/selection-context.
  const {
    selected: selectedTemplate,
    select: selectTemplate,
    clear: clearTemplateSelection,
  } = useTemplateSelection();
  const templateInterest = selectedTemplate ? formatTemplateInterest(selectedTemplate) : null;
  const phoneInputRef = useRef<HTMLInputElement | null>(null);
  const pendingCaretRef = useRef<number | null>(null);
  const countryDial = getCountryByCode(countryCode)?.dial ?? "212";
  const previousDialRef = useRef(countryDial);

  // Detection and manual changes share the same path: preserve the national
  // digits, then store the final number under its new international prefix.
  useLayoutEffect(() => {
    const previousDial = previousDialRef.current;
    if (previousDial === countryDial) return;
    setValues((previous) => ({
      ...previous,
      phone: reformatForNewDial(previous.phone ?? "", previousDial, countryDial),
    }));
    setFieldErrors((previous) => ({ ...previous, phone: undefined }));
    previousDialRef.current = countryDial;
  }, [countryDial]);

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

  function toggleFeature(value: string) {
    setValues((prev) => ({
      ...prev,
      features: prev.features.includes(value)
        ? prev.features.filter((f) => f !== value)
        : [...prev.features, value],
    }));
  }

  function handleCountryChange(nextCode: string) {
    setPhoneCountryCode(nextCode);
  }

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (status === "sending") return;

    // "Autre" + précision libre ne sont jamais stockés comme deux champs
    // distincts : la précision est fusionnée dans la valeur envoyée, pour
    // que l'admin/l'email affichent directement une seule ligne lisible
    // ("Autre — Salon de coiffure") sans colonne supplémentaire.
    const payload = {
      ...values,
      websiteType:
        values.websiteType === OTHER_VALUE && websiteTypeOther.trim()
          ? `${OTHER_VALUE} — ${websiteTypeOther.trim()}`
          : values.websiteType,
      objective:
        values.objective === OTHER_VALUE && objectiveOther.trim()
          ? `${OTHER_VALUE} — ${objectiveOther.trim()}`
          : values.objective,
      templateInterest: templateInterest ?? NO_TEMPLATE_PREFERENCE,
    };

    const parsed = contactFormSchema.safeParse(payload);
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
          <SectionLabel index="11" label="Contact" />
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

                      <GroupHeading>Votre projet</GroupHeading>

                      <label className="flex flex-col gap-1 text-sm text-mist">
                        Type de projet
                        <CustomSelect
                          value={values.websiteType ?? ""}
                          onChange={(v) => updateField("websiteType", v)}
                          placeholder="Sélectionner un type"
                          options={PROJECT_TYPE_OPTIONS}
                        />
                        {values.websiteType === OTHER_VALUE && (
                          <input
                            type="text"
                            placeholder="Précisez votre activité"
                            value={websiteTypeOther}
                            onChange={(e) => setWebsiteTypeOther(e.target.value)}
                            className={`${inputClass} mt-2`}
                          />
                        )}
                      </label>

                      <label className="flex flex-col gap-1 text-sm text-mist">
                        Quel est votre objectif principal ?
                        <CustomSelect
                          value={values.objective ?? ""}
                          onChange={(v) => updateField("objective", v)}
                          placeholder="Sélectionner un objectif"
                          options={OBJECTIVE_OPTIONS}
                        />
                        {values.objective === OTHER_VALUE && (
                          <input
                            type="text"
                            placeholder="Précisez votre objectif"
                            value={objectiveOther}
                            onChange={(e) => setObjectiveOther(e.target.value)}
                            className={`${inputClass} mt-2`}
                          />
                        )}
                      </label>

                      <div className="flex flex-col gap-3 border-t border-line pt-6 sm:col-span-2">
                        <MobileDisclosure label="Choisir les fonctionnalités souhaitées">
                        <span className="text-sm text-mist">
                          Quelles fonctionnalités souhaitez-vous ?
                        </span>
                        <ChipToggleGroup
                          options={FEATURE_OPTIONS}
                          selected={values.features}
                          onToggle={toggleFeature}
                          ariaLabel="Quelles fonctionnalités souhaitez-vous ?"
                        />
                        </MobileDisclosure>
                      </div>

                      <GroupHeading>Préparation</GroupHeading>

                      <TemplateInspirationSelector
                        selected={selectedTemplate}
                        onSelect={selectTemplate}
                        onClear={clearTemplateSelection}
                      />

                      <label className="flex flex-col gap-1 text-sm text-mist">
                        Avez-vous déjà une identité visuelle ?
                        <CustomSelect
                          value={values.identityStatus ?? ""}
                          onChange={(v) => updateField("identityStatus", v)}
                          placeholder="Sélectionner une réponse"
                          options={IDENTITY_OPTIONS}
                        />
                      </label>

                      <label className="flex flex-col gap-1 text-sm text-mist">
                        Avez-vous déjà vos contenus ?
                        <CustomSelect
                          value={values.contentStatus ?? ""}
                          onChange={(v) => updateField("contentStatus", v)}
                          placeholder="Sélectionner une réponse"
                          options={CONTENT_OPTIONS}
                        />
                      </label>

                      <GroupHeading>Cadre du projet</GroupHeading>

                      <label className="flex flex-col gap-1 text-sm text-mist sm:col-span-2">
                        Quand souhaitez-vous lancer votre site ?
                        <CustomSelect
                          value={values.timeline ?? ""}
                          onChange={(v) => updateField("timeline", v)}
                          placeholder="Sélectionner un délai"
                          options={TIMELINE_OPTIONS}
                          className="sm:max-w-sm"
                        />
                      </label>

                      <label className="flex flex-col gap-1 border-t border-line pt-6 text-sm text-mist sm:col-span-2">
                        Message
                        <textarea
                          name="message"
                          rows={4}
                          placeholder="Parlez-nous de votre projet, de votre activité ou de toute demande particulière..."
                          value={values.message}
                          onChange={(e) => updateField("message", e.target.value)}
                          className={`${inputClass} resize-none ${fieldErrors.message ? errorInputClass : ""}`}
                        />
                        <FieldError message={fieldErrors.message} />
                      </label>

                      <div className="border-t border-line pt-6 sm:col-span-2">
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

            {/* Alternative secondaire : après le formulaire, jamais avant —
                l'action principale reste le formulaire, pas l'email direct. */}
            <RevealOnScroll delay={0.15}>
              <div className="mt-10 border-t border-line pt-8 sm:mt-12">
                <p className="text-sm text-mist">{content.directLine}</p>
                <a
                  href={`mailto:${content.email}`}
                  className="mt-3 inline-block max-w-full break-all py-3 font-display text-[clamp(0.95rem,4.2vw,1.125rem)] uppercase tracking-[0.08em] text-paper underline decoration-line-strong decoration-1 underline-offset-4 transition-colors hover:decoration-paper sm:text-xl sm:tracking-[0.1em]"
                >
                  {content.email}
                </a>
              </div>
            </RevealOnScroll>
          </div>
        </div>
      </div>

      <TermsModal open={termsOpen} onClose={() => setTermsOpen(false)} />
    </section>
  );
}
