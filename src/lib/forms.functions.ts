// Server functions behind the website's three forms. Each one: checks reCAPTCHA, saves the
// entry to Supabase with the server-side key, then emails a notification via Gmail SMTP.
import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";

const text = (max: number) => z.string().trim().max(max);
const optional = (max: number) =>
  z
    .string()
    .trim()
    .max(max)
    .optional()
    .transform((v) => (v ? v : null));

// Keep attached images under Vercel's ~4.5 MB request limit (base64 inflates size by ~33%).
const MAX_ATTACHMENT_CHARS = 1_900_000;
const imageDataUrl = z
  .string()
  .regex(/^data:image\/(png|jpe?g|webp|gif);base64,/)
  .optional()
  .transform((v) => (v && v.length <= MAX_ATTACHMENT_CHARS ? v : undefined));

const captcha = { captchaToken: z.string().max(4000).optional() };

// reCAPTCHA v3 score shown in the email: 1.0 = very likely human, 0.0 = very likely bot.
const fmtScore = (score: number | null) =>
  score === null
    ? null
    : `${score.toFixed(1)} / 1.0 (${score >= 0.7 ? "likely human" : "borderline"})`;

async function loadServer() {
  const [{ supabaseAdmin }, forms] = await Promise.all([
    import("@/integrations/supabase/client.server"),
    import("@/lib/forms.server"),
  ]);
  return { supabaseAdmin, ...forms };
}

export const submitContact = createServerFn({ method: "POST" })
  .validator((input: unknown) =>
    z
      .object({
        name: text(120).min(1),
        email: z.string().trim().email().max(200),
        phone: optional(40),
        subject: optional(200),
        message: text(5000).min(1),
        ...captcha,
      })
      .parse(input),
  )
  .handler(async ({ data }) => {
    const { supabaseAdmin, verifyRecaptcha, notifySafely } = await loadServer();
    const score = await verifyRecaptcha(data.captchaToken, "contact");

    const { error } = await supabaseAdmin.from("contact_messages").insert({
      name: data.name,
      email: data.email,
      phone: data.phone,
      subject: data.subject,
      message: data.message,
    });
    if (error) console.error("[forms] database insert failed", error);
    if (error)
      throw new Error("We couldn't save your message. Please try again or email us directly.");

    await notifySafely({
      subject: `New contact message: ${data.name}${data.subject ? `: ${data.subject}` : ""}`,
      heading: "New contact message",
      replyTo: data.email,
      rows: [
        ["Name", data.name],
        ["Email", data.email],
        ["Phone", data.phone],
        ["Subject", data.subject],
        ["Message", data.message],
        ["Spam score", fmtScore(score)],
      ],
    });
    return { ok: true };
  });

export const submitWholesale = createServerFn({ method: "POST" })
  .validator((input: unknown) =>
    z
      .object({
        business_name: text(200).min(1),
        contact_name: text(120).min(1),
        email: z.string().trim().email().max(200),
        phone: optional(40),
        product_interest: text(120).min(1),
        estimated_quantity: optional(80),
        message: optional(5000),
        ...captcha,
      })
      .parse(input),
  )
  .handler(async ({ data }) => {
    const { supabaseAdmin, verifyRecaptcha, notifySafely } = await loadServer();
    const score = await verifyRecaptcha(data.captchaToken, "wholesale");

    const { error } = await supabaseAdmin.from("wholesale_inquiries").insert({
      business_name: data.business_name,
      contact_name: data.contact_name,
      email: data.email,
      phone: data.phone,
      product_interest: data.product_interest,
      estimated_quantity: data.estimated_quantity,
      message: data.message,
    });
    if (error) console.error("[forms] database insert failed", error);
    if (error)
      throw new Error("We couldn't save your inquiry. Please try again or email us directly.");

    await notifySafely({
      subject: `New wholesale inquiry: ${data.business_name} (${data.product_interest})`,
      heading: "New wholesale inquiry",
      replyTo: data.email,
      rows: [
        ["Business", data.business_name],
        ["Contact", data.contact_name],
        ["Email", data.email],
        ["Phone", data.phone],
        ["Product line", data.product_interest],
        ["Est. quantity", data.estimated_quantity],
        ["Message", data.message],
        ["Spam score", fmtScore(score)],
      ],
    });
    return { ok: true };
  });

export const submitQuote = createServerFn({ method: "POST" })
  .validator((input: unknown) =>
    z
      .object({
        name: text(120).min(1),
        email: z.string().trim().email().max(200),
        phone: optional(40),
        product: text(60).min(1),
        productLabel: optional(120),
        quantity: z.number().int().positive().max(1_000_000).nullable().optional(),
        notes: optional(5000),
        designNotes: optional(1000),
        mockupDataUrl: imageDataUrl,
        designDataUrl: imageDataUrl,
        ...captcha,
      })
      .parse(input),
  )
  .handler(async ({ data }) => {
    const { supabaseAdmin, verifyRecaptcha, notifySafely } = await loadServer();
    const score = await verifyRecaptcha(data.captchaToken, "quote");

    const mockupSummary = data.mockupDataUrl
      ? `AI mockup generated for ${data.product}${data.designNotes ? `, notes: "${data.designNotes}"` : ""}`
      : null;

    const { error } = await supabaseAdmin.from("quote_requests").insert({
      name: data.name,
      email: data.email,
      phone: data.phone,
      product: data.product,
      quantity: data.quantity ?? null,
      notes: data.notes,
      mockup_summary: mockupSummary,
    });
    if (error) console.error("[forms] database insert failed", error);
    if (error)
      throw new Error(
        "We couldn't save your quote request. Please try again or email us directly.",
      );

    // Attach the AI mockup and the customer's own artwork when they fit in one request.
    const attachments = [];
    if (data.mockupDataUrl)
      attachments.push({
        filename: `uzas-design-${data.product.replace(/\s+/g, "-")}.${data.mockupDataUrl.startsWith("data:image/png") ? "png" : "jpg"}`,
        dataUrl: data.mockupDataUrl,
      });
    if (
      data.designDataUrl &&
      (data.mockupDataUrl?.length ?? 0) + data.designDataUrl.length <= 3_000_000
    ) {
      const ext =
        /^data:image\/(\w+)/.exec(data.designDataUrl)?.[1]?.replace("jpeg", "jpg") ?? "png";
      attachments.push({ filename: `customer-artwork.${ext}`, dataUrl: data.designDataUrl });
    }

    await notifySafely({
      subject: `New quote request: ${data.name} · ${data.productLabel ?? data.product}${data.quantity ? ` × ${data.quantity}` : ""}`,
      heading: "New quote request (AI Studio)",
      replyTo: data.email,
      rows: [
        ["Name", data.name],
        ["Email", data.email],
        ["Phone", data.phone],
        ["Product", data.productLabel ?? data.product],
        ["Quantity", data.quantity ?? null],
        ["Notes", data.notes],
        ["Design notes", data.designNotes],
        ["AI mockup", data.mockupDataUrl ? "Attached" : "Not generated"],
        [
          "Customer artwork",
          attachments.some((a) => a.filename.startsWith("customer-")) ? "Attached" : null,
        ],
        ["Spam score", fmtScore(score)],
      ],
      attachments,
    });
    return { ok: true };
  });
