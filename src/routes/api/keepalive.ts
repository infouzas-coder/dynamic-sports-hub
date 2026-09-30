import { createFileRoute } from "@tanstack/react-router";

// Daily keep-alive for the free Supabase database.
// Supabase pauses free projects after ~7 days with no activity; Vercel Cron
// calls this once a day (see vercel.json) so the database stays awake.
export const Route = createFileRoute("/api/keepalive")({
  server: {
    handlers: {
      GET: async ({ request }) => {
        // Vercel Cron sends "Authorization: Bearer <CRON_SECRET>" when CRON_SECRET is set.
        const secret = process.env["CRON_SECRET"];
        if (secret && request.headers.get("authorization") !== `Bearer ${secret}`) {
          return new Response("Unauthorized", { status: 401 });
        }

        const url = process.env["SUPABASE_URL"];
        const key = process.env["SUPABASE_SERVICE_ROLE_KEY"] || process.env["SUPABASE_ANON_KEY"];
        if (!url || !key) {
          return Response.json({ ok: false, error: "Supabase env vars missing" }, { status: 500 });
        }

        // A lightweight request to the database's REST API counts as activity.
        try {
          const res = await fetch(`${url}/rest/v1/`, {
            headers: { apikey: key, Authorization: `Bearer ${key}` },
          });
          return Response.json(
            { ok: res.ok, status: res.status, at: new Date().toISOString() },
            { status: res.ok ? 200 : 502 },
          );
        } catch (err) {
          return Response.json(
            { ok: false, error: String(err), at: new Date().toISOString() },
            { status: 502 },
          );
        }
      },
    },
  },
});
