import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";

function parseDataUrl(dataUrl: string): { mimeType: string; data: string } {
  const match = /^data:([^;]+);base64,(.+)$/s.exec(dataUrl);
  if (!match) throw new Error("Invalid image data URL");
  return { mimeType: match[1], data: match[2] };
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
    const key = process.env["GEMINI_API_KEY"];
    if (!key) throw new Error("Missing GEMINI_API_KEY");

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

    const res = await fetch(
      "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash-image:generateContent",
      {
        method: "POST",
        headers: {
          "x-goog-api-key": key,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          contents: [
            {
              role: "user",
              parts: [
                { text: prompt },
                {
                  inline_data: {
                    mime_type: design.mimeType,
                    data: design.data,
                  },
                },
                {
                  inline_data: {
                    mime_type: base.mimeType,
                    data: base.data,
                  },
                },
              ],
            },
          ],
          generationConfig: {
            responseModalities: ["IMAGE"],
          },
        }),
      },
    );

    if (!res.ok) {
      const body = await res.text();
      throw new Error(
        `Mockup generation failed (${res.status}): ${body.slice(0, 300)}`,
      );
    }

    const json = await res.json();
    const parts = json.candidates?.[0]?.content?.parts ?? [];
    const imagePart = parts.find(
      (p: Record<string, unknown>) => p.inlineData ?? p.inline_data,
    );
    const inline = imagePart?.inlineData ?? imagePart?.inline_data;
    if (!inline?.data) {
      throw new Error("The AI did not return an image. Try again.");
    }
    const mimeType = inline.mimeType ?? inline.mime_type ?? "image/png";
    return { image: `data:${mimeType};base64,${inline.data}` };
  });
