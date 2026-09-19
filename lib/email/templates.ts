import { SITE } from "@/lib/config";
import type { ContactFormValues } from "@/lib/validation/contact";

function escapeHtml(value: string) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

type Row = [string, string];

function renderTextSection(title: string, rows: Row[]): string[] {
  return [title, ...rows.map(([label, value]) => `${label} : ${value}`), ""];
}

function renderHtmlSection(title: string, rows: Row[]): string {
  const rowsHtml = rows
    .map(
      ([label, value]) => `
        <tr>
          <td style="padding:6px 12px 6px 0;color:#8a8d93;font-size:13px;white-space:nowrap;">${escapeHtml(label)}</td>
          <td style="padding:6px 0;color:#050505;font-size:14px;">${escapeHtml(value)}</td>
        </tr>`,
    )
    .join("");

  return `
    <p style="font-size:11px;letter-spacing:0.15em;text-transform:uppercase;color:#8a8d93;margin:24px 0 8px;">${escapeHtml(title)}</p>
    <table style="width:100%;border-collapse:collapse;">${rowsHtml}</table>
  `;
}

/**
 * Mini-brief client : ce que le prospect a répondu dans le formulaire
 * Contact, regroupé pour qu'Evorya puisse qualifier la demande et
 * recommander l'offre adaptée en un coup d'œil. Aucune "Offre" ici — le
 * prospect ne choisit plus son offre lui-même (voir lib/data/contact-options.ts).
 */
export function buildNotificationEmail(values: ContactFormValues) {
  const contactRows: Row[] = [
    ["Nom", values.name],
    ["Entreprise", values.company || "—"],
    ["Email", values.email],
    ["Téléphone", values.phone || "—"],
  ];
  const projectRows: Row[] = [
    ["Type", values.websiteType || "—"],
    ["Objectif", values.objective || "—"],
  ];
  const prepRows: Row[] = [
    ["Identité", values.identityStatus || "—"],
    ["Contenus", values.contentStatus || "—"],
  ];
  const frameRows: Row[] = [["Délai", values.timeline || "—"]];
  const features = values.features ?? [];
  // Facultatif : n'apparaît que si le prospect a sélectionné une démo
  // depuis /templates avant d'envoyer sa demande — voir DemoBar.tsx.
  const inspirationRows: Row[] = values.templateInterest
    ? [["Inspiration", values.templateInterest]]
    : [];

  const textLines = [
    "NOUVELLE DEMANDE EVORYA",
    "",
    ...renderTextSection("CONTACT", contactRows),
    ...(inspirationRows.length > 0 ? renderTextSection("INSPIRATION", inspirationRows) : []),
    ...renderTextSection("PROJET", projectRows),
    "FONCTIONNALITÉS",
    ...(features.length > 0 ? features.map((f) => `- ${f}`) : ["—"]),
    "",
    ...renderTextSection("PRÉPARATION", prepRows),
    ...renderTextSection("CADRE", frameRows),
    "MESSAGE",
    values.message,
  ];

  const featuresHtml =
    features.length > 0
      ? `<ul style="margin:4px 0 0;padding-left:18px;color:#050505;font-size:14px;">${features
          .map((f) => `<li style="margin-bottom:4px;">${escapeHtml(f)}</li>`)
          .join("")}</ul>`
      : `<p style="margin:4px 0 0;color:#050505;font-size:14px;">—</p>`;

  const html = `
    <div style="background:#f2f2f2;padding:32px;font-family:Arial,Helvetica,sans-serif;">
      <div style="max-width:560px;margin:0 auto;background:#ffffff;border:1px solid #e2e2e2;padding:32px;">
        <p style="font-size:11px;letter-spacing:0.2em;text-transform:uppercase;color:#8a8d93;margin:0 0 16px;">
          Evorya Project
        </p>
        <h1 style="font-size:20px;margin:0 0 8px;color:#050505;">Nouvelle demande Evorya</h1>
        ${renderHtmlSection("Contact", contactRows)}
        ${inspirationRows.length > 0 ? renderHtmlSection("Inspiration", inspirationRows) : ""}
        ${renderHtmlSection("Projet", projectRows)}
        <p style="font-size:11px;letter-spacing:0.15em;text-transform:uppercase;color:#8a8d93;margin:24px 0 8px;">Fonctionnalités</p>
        ${featuresHtml}
        ${renderHtmlSection("Préparation", prepRows)}
        ${renderHtmlSection("Cadre", frameRows)}
        <p style="font-size:11px;letter-spacing:0.15em;text-transform:uppercase;color:#8a8d93;margin:24px 0 4px;">Message</p>
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
