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

/**
 * Text-to-image design concepts via NVIDIA's hosted FLUX.1-dev model (build.nvidia.com).
 * NVIDIA's hosted models can't take the customer's own artwork as an input, so this creates a
 * garment design from a written description instead. Needs NVIDIA_API_KEY in the environment.
 */
export const generateConcept = createServerFn({ method: "POST" })
  .validator((input: unknown) =>
    z
      .object({
        product: z.string().trim().min(1).max(80),
        description: z.string().trim().min(3).max(800),
      })
      .parse(input),
  )
  .handler(async ({ data }) => {
    const key = process.env["NVIDIA_API_KEY"];
    if (!key) throw new Error("The AI design generator isn't set up yet. Please try again later.");

    const prompt =
      `Professional e-commerce product photo of a single ${data.product}, front view, ` +
      `with a custom full sublimation print design: ${data.description}. ` +
      `Garment only, no person, neatly shaped as if on an invisible mannequin, dark charcoal studio background, ` +
      `soft studio lighting, crisp fabric detail, photorealistic apparel mockup, high quality.`;

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
      console.error("[studio] NVIDIA generation failed", res.status, body.slice(0, 500));
      if (res.status === 401 || res.status === 403) {
        throw new Error("The AI design generator key was rejected. Please contact us.");
      }
      if (res.status === 429) {
        throw new Error("The AI design generator is busy right now. Please try again in a minute.");
      }
      throw new Error(
        "The AI couldn't create that design. Try describing it a little differently.",
      );
    }

    const json = (await res.json()) as {
      artifacts?: Array<{ base64?: string; finishReason?: string }>;
      image?: string;
    };
    const b64 = json.artifacts?.[0]?.base64 ?? json.image;
    if (!b64) throw new Error("The AI didn't return an image. Please try again.");
    if (json.artifacts?.[0]?.finishReason && json.artifacts[0].finishReason !== "SUCCESS") {
      throw new Error(
        "That description was blocked by the AI's content filter. Try wording it differently.",
      );
    }
    if (b64.startsWith("data:")) return { image: b64 };
    const mime = b64.startsWith("iVBOR")
      ? "image/png"
      : b64.startsWith("UklGR")
        ? "image/webp"
        : "image/jpeg";
    return { image: `data:${mime};base64,${b64}` };
  });
