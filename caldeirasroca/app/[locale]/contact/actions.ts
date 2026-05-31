"use server";

import type { Locale } from "@/lib/i18n";

export type ContactSubject =
  | "repair"
  | "maintenance"
  | "installation"
  | "quote"
  | "other";

const SUBJECTS: ReadonlyArray<ContactSubject> = [
  "repair",
  "maintenance",
  "installation",
  "quote",
  "other",
];

export type ContactResult =
  | { ok: true }
  | { ok: false; error: "validation" | "config" | "delivery" };

const LIMITS = {
  name: 200,
  email: 200,
  phone: 50,
  message: 5000,
} as const;

function escapeHtml(input: string): string {
  return input
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

function isValidEmail(value: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}

export async function submitContact(
  formData: FormData,
  locale: Locale,
): Promise<ContactResult> {
  const name = String(formData.get("name") ?? "").trim().slice(0, LIMITS.name);
  const email = String(formData.get("email") ?? "").trim().slice(0, LIMITS.email);
  const phone = String(formData.get("phone") ?? "").trim().slice(0, LIMITS.phone);
  const messageRaw = String(formData.get("message") ?? "").trim();
  const message = messageRaw.slice(0, LIMITS.message);
  const subjectRaw = String(formData.get("subject") ?? "");
  const subject: ContactSubject = (SUBJECTS as ReadonlyArray<string>).includes(
    subjectRaw,
  )
    ? (subjectRaw as ContactSubject)
    : "other";
  const consent = formData.get("consent") === "on";

  if (
    !name ||
    !isValidEmail(email) ||
    message.length < 10 ||
    !consent
  ) {
    return { ok: false, error: "validation" };
  }

  const token = process.env.TELEGRAM_BOT_TOKEN;
  const chatId = process.env.TELEGRAM_CHAT_ID;
  if (!token || !chatId) {
    console.error(
      "[contact] missing TELEGRAM_BOT_TOKEN or TELEGRAM_CHAT_ID — message not delivered",
    );
    return { ok: false, error: "config" };
  }

  const safe = {
    name: escapeHtml(name),
    email: escapeHtml(email),
    phone: phone ? escapeHtml(phone) : "—",
    subject: escapeHtml(subject),
    message: escapeHtml(message),
    locale,
  };

  const html =
    `<b>🔧 Novo pedido — Caldeiras Roca · Viana</b>\n\n` +
    `<b>Nome:</b> ${safe.name}\n` +
    `<b>Email:</b> ${safe.email}\n` +
    `<b>Telefone:</b> ${safe.phone}\n` +
    `<b>Assunto:</b> ${safe.subject}\n` +
    `<b>Idioma:</b> ${safe.locale}\n\n` +
    `<b>Descrição:</b>\n${safe.message}`;

  try {
    const res = await fetch(
      `https://api.telegram.org/bot${token}/sendMessage`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          chat_id: chatId,
          text: html,
          parse_mode: "HTML",
          disable_web_page_preview: true,
        }),
      },
    );
    if (!res.ok) {
      const body = await res.text();
      console.error("[contact] telegram delivery failed", res.status, body);
      return { ok: false, error: "delivery" };
    }
    return { ok: true };
  } catch (err) {
    console.error("[contact] telegram delivery threw", err);
    return { ok: false, error: "delivery" };
  }
}
