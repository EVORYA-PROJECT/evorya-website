import "server-only";
import { Resend } from "resend";

let cachedClient: Resend | null = null;

function getResendClient(): Resend | null {
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) return null;

  if (!cachedClient) {
    cachedClient = new Resend(apiKey);
  }
  return cachedClient;
}

export function isEmailConfigured() {
  return Boolean(process.env.RESEND_API_KEY);
}

export function getEmailFrom() {
  return process.env.EMAIL_FROM?.trim() || "Evorya Project <onboarding@resend.dev>";
}

type SendEmailInput = {
  to: string;
  subject: string;
  html: string;
  text: string;
  replyTo?: string;
};

/**
 * Envoie un email via Resend. Ne lance jamais d'exception : retourne simplement
 * `false` en cas d'échec ou d'absence de configuration, pour ne jamais bloquer
 * l'enregistrement de la demande en base (priorité #1).
 */
export async function sendEmail({ to, subject, html, text, replyTo }: SendEmailInput) {
  const client = getResendClient();
  if (!client) {
    console.warn("[email] RESEND_API_KEY manquant — envoi ignoré.");
    return false;
  }

  try {
    const { error } = await client.emails.send({
      from: getEmailFrom(),
      to,
      subject,
      html,
      text,
      replyTo,
    });

    if (error) {
      console.error("[email] Échec de l'envoi Resend :", error);
      return false;
    }

    return true;
  } catch (err) {
    console.error("[email] Erreur inattendue lors de l'envoi :", err);
    return false;
  }
}
