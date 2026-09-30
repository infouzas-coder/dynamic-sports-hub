import { createFileRoute } from "@tanstack/react-router";
import { CATEGORIES } from "@/lib/site-data";
import { POSTS } from "@/lib/blog-posts";
import { absUrl } from "@/lib/seo";

// XML sitemap for search engines. New pages and blog posts are picked up automatically.
const STATIC_PAGES: Array<[path: string, priority: string]> = [
  ["/", "1.0"],
  ["/sublimation-clothing", "0.9"],
  ["/wholesale", "0.9"],
  ["/catalogues", "0.7"],
  ["/about", "0.6"],
  ["/contact", "0.6"],
  ["/studio", "0.7"],
  ["/blog", "0.7"],
];

export const Route = createFileRoute("/sitemap.xml")({
  server: {
    handlers: {
      GET: async () => {
        const urls = new Map<string, { priority: string; lastmod?: string }>();
        for (const [p, pr] of STATIC_PAGES) urls.set(p, { priority: pr });
        for (const c of CATEGORIES) if (!urls.has(c.slug)) urls.set(c.slug, { priority: "0.8" });
        for (const p of POSTS) urls.set(`/blog/${p.slug}`, { priority: "0.6", lastmod: p.date });

        const body =
          `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n` +
          [...urls]
            .map(
              ([path, { priority, lastmod }]) =>
                `  <url><loc>${absUrl(path)}</loc>${lastmod ? `<lastmod>${lastmod}</lastmod>` : ""}<priority>${priority}</priority></url>`,
            )
            .join("\n") +
          `\n</urlset>\n`;
        return new Response(body, {
          headers: { "Content-Type": "application/xml; charset=utf-8", "Cache-Control": "public, max-age=3600" },
        });
      },
    },
  },
});
