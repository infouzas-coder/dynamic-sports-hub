import { createFileRoute, Link } from "@tanstack/react-router";
import { SiteFooter, SiteHeader } from "@/components/site-chrome";
import { Reveal } from "@/components/Reveal";
import { POSTS, readingMinutes } from "@/lib/blog-posts";
import { absUrl, ORG } from "@/lib/seo";

const TITLE = "Blog | Team Kit, Sublimation & Custom Sportswear Guides | Uzas Sports";
const DESC =
  "Practical guides on sublimated team kits, custom jerseys, martial arts uniforms, patches and paintball gear from the Uzas Sports factory team.";

export const Route = createFileRoute("/blog/")({
  head: () => ({
    meta: [
      { title: TITLE },
      { name: "description", content: DESC },
      { property: "og:title", content: "Uzas Sports Blog" },
      { property: "og:description", content: DESC },
      { property: "og:type", content: "website" },
      { property: "og:url", content: absUrl("/blog") },
    ],
    links: [{ rel: "canonical", href: absUrl("/blog") }],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Blog",
          name: "Uzas Sports Blog",
          url: absUrl("/blog"),
          publisher: ORG,
          blogPost: POSTS.map((p) => ({
            "@type": "BlogPosting",
            headline: p.title,
            url: absUrl(`/blog/${p.slug}`),
            datePublished: p.date,
          })),
        }),
      },
    ],
  }),
  component: BlogIndex,
});

export const fmtDate = (iso: string) =>
  new Date(`${iso}T00:00:00Z`).toLocaleDateString("en-AU", {
    day: "numeric",
    month: "long",
    year: "numeric",
    timeZone: "UTC",
  });

function BlogIndex() {
  const posts = [...POSTS].sort((a, b) => b.date.localeCompare(a.date));
  return (
    <div className="min-h-screen bg-background font-body">
      <SiteHeader />
      <section className="border-b border-bone/10 py-20">
        <div className="mx-auto max-w-7xl px-6">
          <Reveal>
            <p className="mb-5 font-mono text-[11px] uppercase tracking-[0.3em] text-crimson">
              From the factory floor
            </p>
            <h1 className="font-display text-[clamp(2.75rem,8vw,6rem)] leading-[0.85] tracking-tight text-bone">
              THE UZAS BLOG
            </h1>
            <p className="mt-6 max-w-[56ch] text-pretty text-base text-smoke md:text-lg">
              Straight answers on team kits, sublimation, uniforms and custom gear, written by
              the people who make them.
            </p>
          </Reveal>
        </div>
      </section>

      <section className="bg-coal py-16">
        <div className="mx-auto grid max-w-7xl gap-px bg-bone/10 px-0 sm:grid-cols-2 lg:grid-cols-3">
          {posts.map((p, i) => (
            <Reveal key={p.slug} delay={(i % 3) * 70}>
              <Link
                to="/blog/$slug"
                params={{ slug: p.slug }}
                className="group flex h-full flex-col bg-coal transition-colors hover:bg-ash"
              >
                <div className="aspect-[16/10] overflow-hidden">
                  <img
                    src={p.image}
                    alt={p.imageAlt}
                    loading="lazy"
                    className="h-full w-full object-cover opacity-80 transition duration-500 group-hover:scale-105 group-hover:opacity-100"
                  />
                </div>
                <div className="flex flex-1 flex-col p-7">
                  <p className="font-mono text-[11px] uppercase tracking-[0.22em] text-crimson">
                    {p.category} · {readingMinutes(p)} min read
                  </p>
                  <h2 className="mt-3 font-display text-2xl leading-tight tracking-tight text-bone">
                    {p.title}
                  </h2>
                  <p className="mt-3 flex-1 text-sm text-smoke">{p.excerpt}</p>
                  <p className="mt-5 font-mono text-[11px] uppercase tracking-[0.2em] text-bone/70 group-hover:text-gold">
                    Read article →
                  </p>
                </div>
              </Link>
            </Reveal>
          ))}
        </div>
      </section>
      <SiteFooter />
    </div>
  );
}
