import { SITE } from "@/lib/config";
import type { ContactFormValues } from "@/lib/validation/contact";

function escapeHtml(value: string) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

const FIELD_LABELS: Record<string, string> = {
  name: "Nom",
  company: "Entreprise",
  email: "Email",
  phone: "Téléphone",
  offer: "Offre",
  budget: "Budget",
  websiteType: "Type de site",
};

export function buildNotificationEmail(values: ContactFormValues) {
  const rows: [string, string][] = [
    [FIELD_LABELS.name, values.name],
    [FIELD_LABELS.company, values.company || "—"],
    [FIELD_LABELS.email, values.email],
    [FIELD_LABELS.phone, values.phone || "—"],
    [FIELD_LABELS.offer, values.offer || "—"],
    [FIELD_LABELS.budget, values.budget || "—"],
    [FIELD_LABELS.websiteType, values.websiteType || "—"],
  ];

  const textLines = [
    "Nouvelle demande Evorya",
    "",
    ...rows.map(([label, value]) => `${label} : ${value}`),
    "",
    "Message :",
    values.message,
  ];

  const htmlRows = rows
    .map(
      ([label, value]) => `
        <tr>
          <td style="padding:6px 12px 6px 0;color:#8a8d93;font-size:13px;white-space:nowrap;">${escapeHtml(label)}</td>
          <td style="padding:6px 0;color:#050505;font-size:14px;">${escapeHtml(value)}</td>
        </tr>`,
    )
    .join("");

  const html = `
    <div style="background:#f2f2f2;padding:32px;font-family:Arial,Helvetica,sans-serif;">
      <div style="max-width:560px;margin:0 auto;background:#ffffff;border:1px solid #e2e2e2;padding:32px;">
        <p style="font-size:11px;letter-spacing:0.2em;text-transform:uppercase;color:#8a8d93;margin:0 0 16px;">
          Evorya Project
        </p>
        <h1 style="font-size:20px;margin:0 0 24px;color:#050505;">Nouvelle demande Evorya</h1>
        <table style="width:100%;border-collapse:collapse;margin-bottom:24px;">${htmlRows}</table>
        <p style="font-size:13px;color:#8a8d93;margin:0 0 4px;">Message</p>
        <p style="font-size:14px;color:#050505;white-space:pre-wrap;margin:0;">${escapeHtml(values.message)}</p>
        <p style="margin-top:32px;font-size:13px;">
          <a href="mailto:${encodeURIComponent(values.email)}" style="color:#050505;">Répondre directement à ${escapeHtml(values.email)}</a>
        </p>
      </div>
    </div>
  `;

  return {
    subject: `Nouvelle demande Evorya — ${values.name}`,
    html,
    text: textLines.join("\n"),
  };
}

export function buildConfirmationEmail(values: ContactFormValues) {
  const firstName = values.name.trim().split(/\s+/)[0] || values.name;

  const text = [
    `Bonjour ${firstName},`,
    "",
    "Votre demande a bien été reçue par Evorya Project.",
    "",
    "Nous reviendrons vers vous prochainement afin d'échanger sur votre projet.",
    "",
    "Evorya Project",
  ].join("\n");

  const html = `
    <div style="background:#f2f2f2;padding:32px;font-family:Arial,Helvetica,sans-serif;">
      <div style="max-width:560px;margin:0 auto;background:#050505;color:#f2f2f2;padding:32px;">
        <p style="font-size:11px;letter-spacing:0.2em;text-transform:uppercase;color:#8a8d93;margin:0 0 24px;">
          Evorya Project
        </p>
        <p style="font-size:16px;margin:0 0 16px;">Bonjour ${escapeHtml(firstName)},</p>
        <p style="font-size:15px;line-height:1.6;margin:0 0 16px;">
          Votre demande a bien été reçue par Evorya Project.
        </p>
        <p style="font-size:15px;line-height:1.6;margin:0 0 32px;">
          Nous reviendrons vers vous prochainement afin d&rsquo;échanger sur votre projet.
        </p>
        <p style="font-size:13px;color:#8a8d93;margin:0;">Evorya Project — ${SITE.location}</p>
      </div>
    </div>
  `;

  return {
    subject: "Votre demande a bien été reçue — Evorya Project",
    html,
    text,
  };
}
