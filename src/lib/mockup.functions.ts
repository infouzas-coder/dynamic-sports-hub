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
    const lovableKey = process.env["LOVABLE_API_KEY"];

    async function viaGemini(key: string) {
      const res = await fetch(
        "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash-image:generateContent",
        {
          method: "POST",
          headers: { "x-goog-api-key": key, "Content-Type": "application/json" },
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
        const err = new Error(
          `Mockup generation failed (${res.status}): ${body.slice(0, 300)}`,
        ) as Error & { status?: number };
        err.status = res.status;
        throw err;
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
    }

    async function viaLovable(key: string) {
      const res = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${key}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          model: "google/gemini-3.1-flash-image",
          messages: [
            {
              role: "user",
              content: [
                { type: "text", text: prompt },
                { type: "image_url", image_url: { url: data.designDataUrl } },
                { type: "image_url", image_url: { url: data.baseDataUrl } },
              ],
            },
          ],
          modalities: ["image", "text"],
        }),
      });
      if (!res.ok) {
        const body = await res.text();
        throw new Error(
          `Mockup generation failed (${res.status}): ${body.slice(0, 300)}`,
        );
      }
      const json = (await res.json()) as {
        choices?: Array<{
          message?: { images?: Array<{ image_url?: { url?: string } }> };
        }>;
      };
      const url = json.choices?.[0]?.message?.images?.[0]?.image_url?.url;
      if (!url) throw new Error("The AI did not return an image. Try again.");
      return { image: url };
    }

    if (geminiKey) {
      try {
        return await viaGemini(geminiKey);
      } catch (e) {
        const status = (e as { status?: number }).status;
        if (status === 429 && lovableKey) return await viaLovable(lovableKey);
        if (status === 429) {
          throw new Error(
            "Your Google AI key has hit its usage limit. Add billing to the Google key or try again later.",
          );
        }
        throw e;
      }
    }

    if (lovableKey) return await viaLovable(lovableKey);
    throw new Error("Missing GEMINI_API_KEY");
  });

