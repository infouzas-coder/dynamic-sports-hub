// Server-only helpers for website form submissions:
//   1. verify the Google reCAPTCHA token
//   2. email a notification through Gmail SMTP
// Never import this file from route/component code — load it inside server handlers with
// `await import("@/lib/forms.server")` so secrets and nodemailer stay out of the browser bundle.
//
// Environment variables (set in Vercel → Project → Settings → Environment Variables):
//   RECAPTCHA_SECRET_KEY  – reCAPTCHA v2 "secret key"
//   GMAIL_USER            – Gmail address that sends the notifications
//   GMAIL_APP_PASSWORD    – 16-character Google "App password" for GMAIL_USER (not the normal password)
//   FORM_NOTIFY_TO        – optional, comma-separated recipients (defaults to GMAIL_USER)

import nodemailer, { type Transporter } from "nodemailer";

export async function verifyRecaptcha(token: string | undefined, ip?: string | null) {
  const secret = process.env["RECAPTCHA_SECRET_KEY"];
  if (!secret) {
    // Captcha not configured yet — let the submission through but make it visible in logs.
    console.warn("[forms] RECAPTCHA_SECRET_KEY not set; captcha check skipped");
    return;
  }
  if (!token) throw new Error("Please tick the “I'm not a robot” box before sending.");

  const body = new URLSearchParams({ secret, response: token });
  if (ip) body.set("remoteip", ip);
  const res = await fetch("https://www.google.com/recaptcha/api/siteverify", {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body,
  });
  const json = (await res.json()) as { success?: boolean; "error-codes"?: string[] };
  if (!json.success) {
    console.warn("[forms] captcha rejected", json["error-codes"]);
    throw new Error("Captcha check failed — please tick the box again and resubmit.");
  }
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
