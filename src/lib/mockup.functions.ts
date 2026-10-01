import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";

function parseDataUrl(dataUrl: string): { mimeType: string; data: string } {
  const match = /^data:([^;]+);base64,(.+)$/s.exec(dataUrl);
  const mimeType = match?.[1];
  const base64 = match?.[2];
  if (!mimeType || !base64) throw new Error("Invalid image data URL");
  return { mimeType, data: base64 };
}

export const generateMockup = createServerFn({ method: "POST" })
  .validator((input: unknown) =>
    z
      .object({
        product: z.string(),
        designDataUrl: z.string(),
        baseDataUrl: z.string(),
        notes: z.string().optional(),
      })
      .parse(input),
  )
  .handler(async ({ data }) => {
    const prompt =
      `You are a professional apparel mockup renderer for a sublimation manufacturer. ` +
      `The FIRST image is the customer's artwork. The SECOND image is a blank ${data.product}. ` +
      `Apply the customer's artwork as a realistic full sublimation print onto the blank ${data.product}: ` +
      `edge-to-edge coverage, colors faithfully reproduced, print following the garment's fabric folds, ` +
      `wrinkles, seams and lighting. Keep the same garment shape, dark studio background and photographic ` +
      `quality of the blank product image. Do not add text that is not in the artwork.` +
      (data.notes ? ` Customer notes: ${data.notes}.` : "") +
      ` Return only the finished mockup image.`;

    const design = parseDataUrl(data.designDataUrl);
    const base = parseDataUrl(data.baseDataUrl);

    const geminiKey = process.env["GEMINI_API_KEY"];
    // No Gemini key: the studio falls back to an instant in-browser preview of the artwork.
    if (!geminiKey) throw new Error("NO_GEMINI_KEY");

    const res = await fetch(
      "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash-image:generateContent",
      {
        method: "POST",
        headers: { "x-goog-api-key": geminiKey, "Content-Type": "application/json" },
        body: JSON.stringify({
          contents: [
            {
              role: "user",
              parts: [
                { text: prompt },
                { inline_data: { mime_type: design.mimeType, data: design.data } },
                { inline_data: { mime_type: base.mimeType, data: base.data } },
              ],
            },
          ],
          generationConfig: { responseModalities: ["IMAGE"] },
        }),
      },
    );

    if (!res.ok) {
      const body = await res.text();
      if (res.status === 429) {
        throw new Error(
          "Your Google AI key has hit its usage limit. Enable billing on the key in Google AI Studio or try again later.",
        );
      }
      throw new Error(`Mockup generation failed (${res.status}): ${body.slice(0, 300)}`);
    }

    const json = (await res.json()) as {
      candidates?: Array<{
        content?: {
          parts?: Array<{
            inlineData?: { mimeType?: string; mime_type?: string; data?: string };
            inline_data?: { mimeType?: string; mime_type?: string; data?: string };
          }>;
        };
      }>;
    };
    const parts = json.candidates?.[0]?.content?.parts ?? [];
    const imagePart = parts.find((p) => p.inlineData ?? p.inline_data);
    const inline = imagePart?.inlineData ?? imagePart?.inline_data;
    if (!inline?.data) throw new Error("The AI did not return an image. Try again.");
    const mimeType = inline.mimeType ?? inline.mime_type ?? "image/png";
    return { image: `data:${mimeType};base64,${inline.data}` };
  });

// ---- NVIDIA design concepts (structured, filter-safe input) ----
// NVIDIA's hosted FLUX.1-dev only takes text, and runs a strict content filter. Customers pick from
// fixed options and the prompt is assembled here, so it uses neutral wording that passes the filter.
export const CONCEPT_COLOURS = [
  "White",
  "Black",
  "Navy",
  "Royal blue",
  "Sky blue",
  "Red",
  "Maroon",
  "Orange",
  "Gold",
  "Yellow",
  "Green",
  "Purple",
  "Pink",
  "Grey",
  "Silver",
] as const;
export const CONCEPT_PATTERNS = [
  "Solid with contrast side panels",
  "Diagonal stripes",
  "Horizontal hoops",
  "Pinstripes",
  "Chevron",
  "Geometric shapes",
  "Camouflage",
  "Gradient fade",
  "Halftone dots",
  "Brush strokes",
  "Lightning streaks",
  "Marble texture",
  "Hexagon grid",
  "Wave lines",
] as const;
export const CONCEPT_STYLES = ["Modern", "Classic", "Retro", "Bold", "Minimal", "Premium"] as const;
export const CONCEPT_GARMENTS = {
  jersey: "short-sleeve sports team jersey",
  rashguard: "long-sleeve athletic compression top",
  shorts: "pair of athletic training shorts",
} as const;

// Words NVIDIA's filter blocks (violence, adult, drugs) and brands we can't print
const BLOCKED = [
  "blood",
  "gore",
  "kill",
  "dead",
  "death",
  "murder",
  "gun",
  "weapon",
  "knife",
  "bomb",
  "war",
  "nude",
  "naked",
  "sexy",
  "sex",
  "porn",
  "drug",
  "weed",
  "cocaine",
  "nazi",
  "hate",
  "nike",
  "adidas",
  "puma",
  "under armour",
  "reebok",
  "venum",
  "disney",
  "marvel",
];

export const generateConcept = createServerFn({ method: "POST" })
  .validator((input: unknown) =>
    z
      .object({
        garment: z.enum(["jersey", "rashguard", "shorts"]),
        primary: z.enum(CONCEPT_COLOURS),
        secondary: z.enum(CONCEPT_COLOURS),
        accent: z.enum(CONCEPT_COLOURS).optional(),
        pattern: z.enum(CONCEPT_PATTERNS),
        style: z.enum(CONCEPT_STYLES),
        teamName: z
          .string()
          .trim()
          .max(20)
          .regex(/^[A-Za-z0-9 &'.-]*$/, "Team name can only use letters, numbers and spaces.")
          .optional(),
        number: z
          .string()
          .trim()
          .regex(/^\d{0,2}$/, "Number must be 0 to 99.")
          .optional(),
        extra: z
          .string()
          .trim()
          .max(120)
          .regex(
            /^[A-Za-z0-9 ,.'&-]*$/,
            "Extra details can only use letters, numbers and basic punctuation.",
          )
          .optional(),
      })
      .parse(input),
  )
  .handler(async ({ data }) => {
    const key = process.env["NVIDIA_API_KEY"];
    if (!key) throw new Error("The AI design generator isn't set up yet. Please try again later.");

    const userText = `${data.teamName ?? ""} ${data.extra ?? ""}`.toLowerCase();
    const hit = BLOCKED.find((w) => new RegExp(`\\b${w}\\b`).test(userText));
    if (hit) throw new Error(`Please remove "${hit}". The AI can't create designs with that word.`);

    const colours = [data.primary, data.secondary, data.accent]
      .filter(Boolean)
      .map((c) => c!.toLowerCase());
    const prompt = [
      `Studio product photograph of a single ${CONCEPT_GARMENTS[data.garment]}, front view, laid neatly as if on an invisible mannequin.`,
      `${data.style} sublimated sportswear design: ${data.pattern.toLowerCase()} in ${colours.slice(0, -1).join(", ")} and ${colours.at(-1)}.`,
      data.teamName
        ? `The text "${data.teamName.toUpperCase()}" printed across the front in bold athletic lettering.`
        : "",
      data.number ? `Large number ${data.number} on the front.` : "",
      data.extra ? `${data.extra}.` : "",
      "Plain dark grey background, soft even lighting, crisp fabric detail, clean commercial apparel catalogue photo.",
    ]
      .filter(Boolean)
      .join(" ");

    const res = await fetch("https://ai.api.nvidia.com/v1/genai/black-forest-labs/flux.1-dev", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${key}`,
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        prompt,
        mode: "base",
        width: 832,
        height: 1024,
        cfg_scale: 5,
        steps: 30,
        samples: 1,
        seed: Math.floor(Math.random() * 1_000_000),
      }),
    });

    if (!res.ok) {
      const body = await res.text();
      console.error("[studio] NVIDIA request failed", res.status, body.slice(0, 500));
      if (res.status === 401 || res.status === 403) {
        throw new Error("The AI design generator key was rejected. Please contact us.");
      }
      if (res.status === 429) {
        throw new Error("The AI design generator is busy right now. Please try again in a minute.");
      }
      throw new Error("The AI couldn't create that design. Please try different options.");
    }

    const json = (await res.json()) as {
      artifacts?: Array<{ base64?: string; finishReason?: string }>;
      image?: string;
    };
    const art = json.artifacts?.[0];
    const reason = art?.finishReason ?? "";
    console.info("[studio] NVIDIA result", {
      finishReason: reason,
      hasImage: Boolean(art?.base64 ?? json.image),
      prompt,
    });
    const b64 = art?.base64 ?? json.image;
    if (/filter|content|block|nsfw|safety/i.test(reason)) {
      throw new Error(
        "The AI's safety filter blocked this design. Please try a different pattern or remove the extra details.",
      );
    }
    if (!b64) throw new Error("The AI didn't return an image. Please try again.");
    if (b64.startsWith("data:")) return { image: b64, prompt };
    const mime = b64.startsWith("iVBOR")
      ? "image/png"
      : b64.startsWith("UklGR")
        ? "image/webp"
        : "image/jpeg";
    return { image: `data:${mime};base64,${b64}`, prompt };
  });
