import { z } from "zod";

// Délai minimum (ms) entre l'affichage du formulaire et son envoi.
// Un envoi plus rapide est presque toujours un robot.
export const MIN_SUBMIT_DELAY_MS = 3000;

export const contactFormSchema = z.object({
  name: z
    .string()
    .trim()
    .min(2, "Indiquez votre nom (2 caractères minimum).")
    .max(120, "Ce champ est trop long."),
  company: z.string().trim().max(120, "Ce champ est trop long.").optional().or(z.literal("")),
  email: z
    .string()
    .trim()
    .min(1, "L'email est requis.")
    .email("Adresse email invalide."),
  phone: z.string().trim().max(30, "Ce champ est trop long.").optional().or(z.literal("")),
  websiteType: z.string().trim().max(160).optional().or(z.literal("")),
  objective: z.string().trim().max(160).optional().or(z.literal("")),
  features: z.array(z.string().trim().max(80)).max(20).optional().default([]),
  identityStatus: z.string().trim().max(120).optional().or(z.literal("")),
  contentStatus: z.string().trim().max(120).optional().or(z.literal("")),
  timeline: z.string().trim().max(120).optional().or(z.literal("")),
  // Direction choisie dans le formulaire ou présélectionnée depuis une démo.
  // C'est toujours une chaîne lisible ("Automobile / Garage — Garage Vortex"
  // ou "Autre / aucune préférence"), jamais un slug brut. Le champ reste
  // optionnel pour accepter les anciens clients et anciennes demandes.
  templateInterest: z.string().trim().max(160).optional().or(z.literal("")),
  message: z
    .string()
    .trim()
    .min(10, "Votre message est un peu court (10 caractères minimum).")
    .max(4000, "Votre message est trop long."),
  // Validée aussi côté serveur : impossible d'envoyer une demande sans accord,
  // même en contournant le JavaScript du formulaire.
  acceptedTerms: z
    .boolean()
    .refine((v) => v === true, "Vous devez accepter les Conditions du projet."),
  // Anti-spam : champ honeypot (doit rester vide) + horodatage d'affichage du formulaire.
  website: z.string().max(0).optional().or(z.literal("")),
  startedAt: z.number(),
});

export type ContactFormValues = z.infer<typeof contactFormSchema>;

export type ContactFormFieldErrors = Partial<
  Record<keyof Omit<ContactFormValues, "website" | "startedAt">, string>
>;

export function flattenContactFormErrors(
  error: z.ZodError<ContactFormValues>,
): ContactFormFieldErrors {
  const fieldErrors = error.flatten().fieldErrors;
  const result: ContactFormFieldErrors = {};

  (Object.keys(fieldErrors) as (keyof typeof fieldErrors)[]).forEach((key) => {
    const messages = fieldErrors[key];
    if (messages && messages.length > 0 && key !== "website" && key !== "startedAt") {
      result[key as keyof ContactFormFieldErrors] = messages[0];
    }
  });

  return result;
}
