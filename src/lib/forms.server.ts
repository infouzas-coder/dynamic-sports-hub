// Server-only helpers for website form submissions:
//   1. verify the Google reCAPTCHA token
//   2. email a notification through Gmail SMTP
// Never import this file from route/component code — load it inside server handlers with
// `await import("@/lib/forms.server")` so secrets and nodemailer stay out of the browser bundle.
//
// Environment variables (set in Vercel → Project → Settings → Environment Variables):
//   RECAPTCHA_SECRET_KEY  – reCAPTCHA v3 "secret key"
//   RECAPTCHA_MIN_SCORE   – optional, 0.0–1.0 threshold (default 0.5); lower it if real people get blocked
//   GMAIL_USER            – Gmail address that sends the notifications
//   GMAIL_APP_PASSWORD    – 16-character Google "App password" for GMAIL_USER (not the normal password)
//   FORM_NOTIFY_TO        – optional, comma-separated recipients (defaults to GMAIL_USER)

import nodemailer, { type Transporter } from "nodemailer";

const GENERIC_BLOCK =
  "Our spam filter flagged this submission. Please try again, or email us directly at info@uzassports.com.";

/**
 * Verify a reCAPTCHA v3 token. v3 gives each request a score from 0.0 (bot) to 1.0 (human);
 * anything below RECAPTCHA_MIN_SCORE (default 0.5) is rejected, as is a token issued for a
 * different form (action mismatch). Returns the score so it can be shown in the notification.
 */
export async function verifyRecaptcha(token: string | undefined, expectedAction: string): Promise<number | null> {
  const secret = process.env["RECAPTCHA_SECRET_KEY"];
  if (!secret) {
    // Captcha not configured yet — let the submission through but make it visible in logs.
    console.warn("[forms] RECAPTCHA_SECRET_KEY not set; captcha check skipped");
    return null;
  }
  if (!token) throw new Error(GENERIC_BLOCK);

  const res = await fetch("https://www.google.com/recaptcha/api/siteverify", {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: new URLSearchParams({ secret, response: token }),
  });
  const json = (await res.json()) as {
    success?: boolean;
    score?: number;
    action?: string;
    hostname?: string;
    "error-codes"?: string[];
  };
  const minScore = Number(process.env["RECAPTCHA_MIN_SCORE"] ?? "0.5");
  const score = typeof json.score === "number" ? json.score : 0;

  if (!json.success || json.action !== expectedAction || score < minScore) {
    console.warn("[forms] captcha rejected", {
      action: json.action,
      expectedAction,
      score,
      hostname: json.hostname,
      errors: json["error-codes"],
    });
    throw new Error(GENERIC_BLOCK);
  }
  return score;
}

export type NotifyAttachment = { filename: string; dataUrl: string };

export type Notification = {
  subject: string;
  heading: string;
  replyTo: string;
  rows: Array<[label: string, value: string | number | null | undefined]>;
  attachments?: NotifyAttachment[];
};

const esc = (s: string) =>
  s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");

export function renderHtml(n: Notification, submittedAt: string) {
  const rows = n.rows
    .filter(([, v]) => v !== null && v !== undefined && String(v).trim() !== "")
    .map(
      ([k, v]) => `
        <tr>
          <td style="padding:10px 14px;border-bottom:1px solid #eee;color:#6b665d;font:600 12px Arial,sans-serif;text-transform:uppercase;letter-spacing:.06em;white-space:nowrap;vertical-align:top">${esc(k)}</td>
          <td style="padding:10px 14px;border-bottom:1px solid #eee;color:#1c1b19;font:14px/1.5 Arial,sans-serif;white-space:pre-wrap">${esc(String(v))}</td>
        </tr>`,
    )
    .join("");
  return `<!doctype html><html><body style="margin:0;background:#f4f4f4;padding:24px">
  <table role="presentation" width="100%" style="max-width:640px;margin:0 auto;background:#fff;border-collapse:collapse">
    <tr><td style="background:#0a0a0a;padding:18px 22px;border-bottom:3px solid #e3bf29">
      <div style="color:#e3bf29;font:700 12px Arial,sans-serif;letter-spacing:.2em">UZAS SPORTS · WEBSITE</div>
      <div style="color:#fdfdfd;font:700 22px Arial,sans-serif;margin-top:6px">${esc(n.heading)}</div>
    </td></tr>
    <tr><td style="padding:8px 8px 0"><table role="presentation" width="100%" style="border-collapse:collapse">${rows}</table></td></tr>
    <tr><td style="padding:18px 22px;color:#6b665d;font:12px Arial,sans-serif">
      Submitted ${esc(submittedAt)} (Melbourne time). Hit <b>Reply</b> to answer ${esc(n.replyTo)} directly.
    </td></tr>
  </table></body></html>`;
}

function renderText(n: Notification, submittedAt: string) {
  return [
    n.heading,
    "",
    ...n.rows
      .filter(([, v]) => v !== null && v !== undefined && String(v).trim() !== "")
      .map(([k, v]) => `${k}: ${v}`),
    "",
    `Submitted ${submittedAt} (Melbourne time). Reply to this email to answer ${n.replyTo}.`,
  ].join("\n");
}

let transport: Transporter | undefined;

export async function sendNotification(n: Notification) {
  const user = process.env["GMAIL_USER"];
  const pass = process.env["GMAIL_APP_PASSWORD"]?.replace(/\s+/g, "");
  if (!user || !pass) {
    console.warn("[forms] GMAIL_USER / GMAIL_APP_PASSWORD not set; notification email skipped");
    return;
  }
  transport ??= nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true,
    auth: { user, pass },
  });

  const submittedAt = new Date().toLocaleString("en-AU", {
    timeZone: "Australia/Melbourne",
    dateStyle: "medium",
    timeStyle: "short",
  });

  await transport.sendMail({
    from: { name: "UZAS Sports Website", address: user },
    to: process.env["FORM_NOTIFY_TO"] || user,
    replyTo: n.replyTo,
    subject: n.subject,
    text: renderText(n, submittedAt),
    html: renderHtml(n, submittedAt),
    attachments: (n.attachments ?? []).map((a) => ({ filename: a.filename, path: a.dataUrl })),
  });
}

/** Run the email send without failing the submission if Gmail is down — the entry is already saved. */
export async function notifySafely(n: Notification) {
  try {
    await sendNotification(n);
  } catch (err) {
    console.error("[forms] notification email failed", err);
  }
}
