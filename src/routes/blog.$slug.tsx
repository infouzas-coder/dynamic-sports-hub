import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { SiteFooter, SiteHeader } from "@/components/site-chrome";
import { POSTS, postBySlug, readingMinutes, type Block } from "@/lib/blog-posts";
import { CATEGORIES } from "@/lib/site-data";
import { absUrl, ORG } from "@/lib/seo";
import { fmtDate } from "./blog.index";

export const Route = createFileRoute("/blog/$slug")({
  loader: ({ params }) => {
    const post = postBySlug(params.slug);
    if (!post) throw notFound();
    return { post };
  },
  head: ({ loaderData }) => {
    const post = loaderData?.post;
    if (!post) return {};
    const url = absUrl(`/blog/${post.slug}`);
    const scripts = [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "BlogPosting",
          headline: post.title,
          description: post.description,
          image: absUrl(post.image),
          datePublished: post.date,
          dateModified: post.date,
          mainEntityOfPage: url,
          author: { "@type": "Organization", name: "Uzas Sports", url: absUrl("/") },
          publisher: ORG,
        }),
      },
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "BreadcrumbList",
          itemListElement: [
            { "@type": "ListItem", position: 1, name: "Home", item: absUrl("/") },
            { "@type": "ListItem", position: 2, name: "Blog", item: absUrl("/blog") },
            { "@type": "ListItem", position: 3, name: post.title, item: url },
          ],
        }),
      },
    ];
    if (post.faq?.length) {
      scripts.push({
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "FAQPage",
          mainEntity: post.faq.map((f) => ({
            "@type": "Question",
            name: f.q,
            acceptedAnswer: { "@type": "Answer", text: f.a },
          })),
        }),
      });
    }
    return {
      meta: [
        { title: `${post.seoTitle} | Uzas Sports` },
        { name: "description", content: post.description },
        { property: "og:title", content: post.title },
        { property: "og:description", content: post.description },
        { property: "og:type", content: "article" },
        { property: "og:url", content: url },
        { property: "og:image", content: absUrl(post.image) },
        { name: "twitter:image", content: absUrl(post.image) },
        { property: "article:published_time", content: post.date },
      ],
      links: [{ rel: "canonical", href: url }],
      scripts,
    };
  },
  component: PostPage,
});

function BlockView({ b }: { b: Block }) {
  switch (b.type) {
    case "h2":
      return (
        <h2 className="mt-12 font-display text-3xl leading-tight tracking-tight text-bone">
          {b.text}
        </h2>
      );
    case "h3":
      return <h3 className="mt-8 text-lg font-semibold text-bone">{b.text}</h3>;
    case "p":
      return <p className="mt-5 leading-relaxed text-bone/80">{b.text}</p>;
    case "ul":
      return (
        <ul className="mt-5 space-y-2.5">
          {b.items.map((it) => (
            <li key={it} className="relative pl-6 leading-relaxed text-bone/80">
              <span className="absolute left-0 top-[0.7em] h-1.5 w-1.5 bg-gold" />
              {it}
            </li>
          ))}
        </ul>
      );
    case "ol":
      return (
        <ol className="mt-5 space-y-2.5">
          {b.items.map((it, i) => (
            <li key={it} className="flex gap-4 leading-relaxed text-bone/80">
              <span className="font-mono text-sm text-gold">{String(i + 1).padStart(2, "0")}</span>
              <span>{it}</span>
            </li>
          ))}
        </ol>
      );
    case "cta":
      return (
        <div className="mt-12 border border-gold/40 bg-coal p-7">
          <p className="text-bone">{b.text}</p>
          <Link to={b.to} className="btn btn-gold btn-sm mt-5">
            {b.label}
          </Link>
        </div>
      );
  }
}

function PostPage() {
  const { post } = Route.useLoaderData();
  const related = CATEGORIES.filter((c) => post.related.includes(c.slug));
  const more = POSTS.filter((p) => p.slug !== post.slug).slice(0, 3);

  return (
    <div className="min-h-screen bg-background font-body">
      <SiteHeader />
      <article>
        <header className="relative overflow-hidden border-b border-bone/10">
          <img
            src={post.image}
            alt={post.imageAlt}
            className="absolute inset-0 h-full w-full object-cover opacity-40"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-background via-background/80 to-background/40" />
          <div className="relative mx-auto max-w-3xl px-6 pb-14 pt-24">
            <nav
              aria-label="Breadcrumb"
              className="font-mono text-[11px] uppercase tracking-[0.2em] text-smoke"
            >
              <Link to="/" className="hover:text-bone">
                Home
              </Link>{" "}
              /{" "}
              <Link to="/blog" className="hover:text-bone">
                Blog
              </Link>
            </nav>
            <p className="mt-6 font-mono text-[11px] uppercase tracking-[0.25em] text-crimson">
              {post.category} · {readingMinutes(post)} min read · {fmtDate(post.date)}
            </p>
            <h1 className="mt-4 font-display text-[clamp(2.2rem,6vw,4.2rem)] leading-[0.95] tracking-tight text-bone">
              {post.title}
            </h1>
            <p className="mt-5 text-lg text-smoke">{post.excerpt}</p>
          </div>
        </header>

        <div className="mx-auto max-w-3xl px-6 py-14 text-[1.05rem]">
          {post.body.map((b, i) => (
            <BlockView key={i} b={b} />
          ))}

          {post.faq?.length ? (
            <section className="mt-14">
              <h2 className="font-display text-3xl tracking-tight text-bone">Common questions</h2>
              <div className="mt-6 divide-y divide-bone/10 border-y border-bone/10">
                {post.faq.map((f) => (
                  <details key={f.q} className="group py-5">
                    <summary className="cursor-pointer list-none font-semibold text-bone marker:hidden">
                      {f.q}
                      <span className="float-right text-gold transition-transform group-open:rotate-45">
                        +
                      </span>
                    </summary>
                    <p className="mt-3 leading-relaxed text-bone/80">{f.a}</p>
                  </details>
                ))}
              </div>
            </section>
          ) : null}

          {related.length ? (
            <section className="mt-14">
              <p className="font-mono text-[11px] uppercase tracking-[0.25em] text-crimson">
                Related products
              </p>
              <div className="mt-4 flex flex-wrap gap-3">
                {related.map((c) => (
                  <Link
                    key={c.slug}
                    to={c.slug}
                    className="border border-bone/25 px-5 py-3 font-mono text-[11px] uppercase tracking-[0.2em] text-bone transition-colors hover:border-gold hover:text-gold"
                  >
                    {c.name} →
                  </Link>
                ))}
              </div>
            </section>
          ) : null}
        </div>
      </article>

      <section className="border-t border-bone/10 bg-coal py-16">
        <div className="mx-auto max-w-7xl px-6">
          <h2 className="font-display text-3xl tracking-tight text-bone">MORE FROM THE BLOG</h2>
          <div className="mt-8 grid gap-px bg-bone/10 md:grid-cols-3">
            {more.map((p) => (
              <Link
                key={p.slug}
                to="/blog/$slug"
                params={{ slug: p.slug }}
                className="bg-coal p-7 transition-colors hover:bg-ash"
              >
                <p className="font-mono text-[11px] uppercase tracking-[0.22em] text-crimson">
                  {p.category}
                </p>
                <h3 className="mt-3 font-display text-xl leading-tight text-bone">{p.title}</h3>
              </Link>
            ))}
          </div>
        </div>
      </section>
      <SiteFooter />
    </div>
  );
}
