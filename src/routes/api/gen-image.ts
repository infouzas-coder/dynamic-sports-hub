import { createFileRoute } from "@tanstack/react-router";

// TEMPORARY (image-gen branch only, never production): generates a site image with NVIDIA FLUX
// and stores it in a public Supabase bucket so it can be pulled into the repo.
export const Route = createFileRoute("/api/gen-image")({
  server: {
    handlers: {
      GET: async ({ request }) => {
        if (process.env["VERCEL_ENV"] === "production") return new Response("Not found", { status: 404 });
        const q = new URL(request.url).searchParams;
        const name = (q.get("name") ?? "").replace(/[^a-z0-9-]/g, "");
        const prompt = q.get("prompt") ?? "";
        const width = Number(q.get("w") ?? 1344);
        const height = Number(q.get("h") ?? 768);
        if (!name || !prompt) return Response.json({ error: "name and prompt required" }, { status: 400 });

        const key = process.env["NVIDIA_API_KEY"];
        const sUrl = process.env["SUPABASE_URL"];
        const sKey = process.env["SUPABASE_SERVICE_ROLE_KEY"];
        if (!key || !sUrl || !sKey) return Response.json({ error: "env missing" }, { status: 500 });

        let b64 = "";
        const log: string[] = [];
        for (let i = 0; i < 4 && !b64; i++) {
          const res = await fetch("https://ai.api.nvidia.com/v1/genai/black-forest-labs/flux.1-dev", {
            method: "POST",
            headers: { Authorization: `Bearer ${key}`, Accept: "application/json", "Content-Type": "application/json" },
            body: JSON.stringify({
              prompt,
              mode: "base",
              width,
              height,
              cfg_scale: 3.5,
              steps: 40,
              samples: 1,
              seed: Math.floor(Math.random() * 1_000_000),
            }),
          });
          if (!res.ok) {
            log.push(`${res.status} ${(await res.text()).slice(0, 300)}`);
            continue;
          }
          const j = (await res.json()) as { artifacts?: Array<{ base64?: string; finishReason?: string }> };
          const a = j.artifacts?.[0];
          log.push(a?.finishReason ?? "?");
          if (a?.base64 && !/filter|content|block|nsfw|safety/i.test(a.finishReason ?? "")) b64 = a.base64;
        }
        if (!b64) return Response.json({ error: "no image", log }, { status: 502 });

        const bytes = Buffer.from(b64, "base64");
        const mime = b64.startsWith("iVBOR") ? "image/png" : "image/jpeg";
        const ext = mime === "image/png" ? "png" : "jpg";
        const auth = { apikey: sKey, Authorization: `Bearer ${sKey}` };
        await fetch(`${sUrl}/storage/v1/bucket`, {
          method: "POST",
          headers: { ...auth, "Content-Type": "application/json" },
          body: JSON.stringify({ id: "site-images", name: "site-images", public: true }),
        });
        const up = await fetch(`${sUrl}/storage/v1/object/site-images/${name}.${ext}`, {
          method: "POST",
          headers: { ...auth, "Content-Type": mime, "x-upsert": "true" },
          body: bytes,
        });
        if (!up.ok) return Response.json({ error: "upload failed", detail: await up.text() }, { status: 502 });
        return Response.json({
          ok: true,
          log,
          url: `${sUrl}/storage/v1/object/public/site-images/${name}.${ext}`,
        });
      },
    },
  },
});
