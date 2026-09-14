import { NextResponse, type NextRequest } from "next/server";
import { SITE } from "@/lib/config";
import { buildConfirmationEmail, buildNotificationEmail } from "@/lib/email/templates";
import { isEmailConfigured, sendEmail } from "@/lib/email/resend";
import { createSupabaseServiceRoleClient } from "@/lib/supabase/service-role";
import {
  MIN_SUBMIT_DELAY_MS,
  contactFormSchema,
  flattenContactFormErrors,
} from "@/lib/validation/contact";

export const runtime = "nodejs";

// Anti-abus basique : limite le nombre de demandes par adresse IP.
// En mémoire, donc réinitialisé à chaque redéploiement / instance — suffisant
// pour un premier niveau de protection, pas un remplacement d'un WAF.
const RATE_LIMIT_WINDOW_MS = 10 * 60 * 1000;
const RATE_LIMIT_MAX_REQUESTS = 5;
const requestLog = new Map<string, number[]>();

function isRateLimited(ip: string) {
  const now = Date.now();
  const timestamps = (requestLog.get(ip) ?? []).filter(
    (t) => now - t < RATE_LIMIT_WINDOW_MS,
  );

  if (timestamps.length >= RATE_LIMIT_MAX_REQUESTS) {
    requestLog.set(ip, timestamps);
    return true;
  }

  timestamps.push(now);
  requestLog.set(ip, timestamps);
  return false;
}

function getClientIp(request: NextRequest) {
  const forwardedFor = request.headers.get("x-forwarded-for");
  if (forwardedFor) return forwardedFor.split(",")[0].trim();
  return request.headers.get("x-real-ip") ?? "unknown";
}

export async function POST(request: NextRequest) {
  const ip = getClientIp(request);

  if (isRateLimited(ip)) {
    return NextResponse.json(
      { ok: false, error: "Trop de demandes envoyées. Merci de réessayer plus tard." },
      { status: 429 },
    );
  }

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json(
      { ok: false, error: "Requête invalide." },
      { status: 400 },
    );
  }

  const parsed = contactFormSchema.safeParse(body);

  if (!parsed.success) {
    return NextResponse.json(
      {
        ok: false,
        error: "Certains champs sont invalides.",
        fieldErrors: flattenContactFormErrors(parsed.error),
      },
      { status: 400 },
    );
  }

  const values = parsed.data;

  // Anti-spam silencieux : honeypot rempli ou formulaire envoyé trop vite.
  // On répond comme si tout allait bien pour ne pas renseigner les robots.
  const submitDelay = Date.now() - values.startedAt;
  if (values.website || submitDelay < MIN_SUBMIT_DELAY_MS) {
    return NextResponse.json({ ok: true });
  }

  let supabase;
  try {
    supabase = createSupabaseServiceRoleClient();
  } catch (err) {
    console.error("[contact] Supabase non configuré :", err);
    return NextResponse.json(
      {
        ok: false,
        error:
          "La configuration du serveur est incomplète. Merci d'écrire directement à " +
          SITE.email,
      },
      { status: 503 },
    );
  }

  const baseRow = {
    name: values.name,
    company: values.company || null,
    email: values.email,
    phone: values.phone || null,
    offer: values.offer || null,
    budget: values.budget || null,
    website_type: values.websiteType || null,
    message: values.message,
  };

  // On tente d'enregistrer l'acceptation des conditions (colonne
  // `terms_accepted`). Si la migration SQL n'a pas encore été exécutée sur ce
  // projet Supabase, la colonne n'existe pas : on se rabat alors silencieusement
  // sur l'insertion sans ce champ plutôt que de casser le formulaire — voir
  // les instructions de configuration pour la migration à exécuter.
  let { error: insertError } = await supabase
    .from("contact_requests")
    .insert({ ...baseRow, terms_accepted: values.acceptedTerms });

  if (insertError && /column|schema cache/i.test(insertError.message)) {
    console.warn(
      "[contact] Colonne 'terms_accepted' absente — insertion sans ce champ. " +
        "Exécutez la migration SQL fournie pour l'activer.",
    );
    ({ error: insertError } = await supabase.from("contact_requests").insert(baseRow));
  }

  if (insertError) {
    console.error("[contact] Échec de l'enregistrement Supabase :", insertError);
    return NextResponse.json(
      {
        ok: false,
        error:
          "Votre demande n'a pas pu être enregistrée. Merci d'écrire directement à " +
          SITE.email,
      },
      { status: 500 },
    );
  }

  if (isEmailConfigured()) {
    const notification = buildNotificationEmail(values);
    await sendEmail({
      to: process.env.CONTACT_NOTIFICATION_EMAIL?.trim() || SITE.email,
      subject: notification.subject,
      html: notification.html,
      text: notification.text,
      replyTo: values.email,
    });

    const confirmation = buildConfirmationEmail(values);
    await sendEmail({
      to: values.email,
      subject: confirmation.subject,
      html: confirmation.html,
      text: confirmation.text,
    });
  }

  return NextResponse.json({ ok: true });
}
