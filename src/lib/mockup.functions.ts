import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";

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
    const key = process.env["LOVABLE_API_KEY"];
    if (!key) throw new Error("Missing LOVABLE_API_KEY");

    const prompt =
      `You are a professional apparel mockup renderer for a sublimation manufacturer. ` +
      `The FIRST image is the customer's artwork. The SECOND image is a blank ${data.product}. ` +
      `Apply the customer's artwork as a realistic full sublimation print onto the blank ${data.product}: ` +
      `edge-to-edge coverage, colors faithfully reproduced, print following the garment's fabric folds, ` +
      `wrinkles, seams and lighting. Keep the same garment shape, dark studio background and photographic ` +
      `quality of the blank product image. Do not add text that is not in the artwork.` +
      (data.notes ? ` Customer notes: ${data.notes}.` : "") +
      ` Return only the finished mockup image.`;

    const res = await fetch(
      "https://ai.gateway.lovable.dev/v1/chat/completions",
      {
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
      },
    );

    if (!res.ok) {
      const body = await res.text();
      throw new Error(
        `Mockup generation failed (${res.status}): ${body.slice(0, 300)}`,
      );
    }

    const json = await res.json();
    const image = json.choices?.[0]?.message?.images?.[0]?.image_url?.url;
    if (!image) throw new Error("The AI did not return an image. Try again.");
    return { image };
  });
