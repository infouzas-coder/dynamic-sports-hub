import { Link } from "@tanstack/react-router";
import { SiteFooter, SiteHeader } from "@/components/site-chrome";
import { Reveal } from "@/components/Reveal";
import { CATEGORIES, type Category } from "@/lib/site-data";

export function CategoryTemplate({ category }: { category: Category }) {
  const others = CATEGORIES.filter((c) => c.slug !== category.slug);

  return (
    <div className="min-h-screen bg-background font-body">
      <SiteHeader />

      {/* HERO */}
      <section className="relative overflow-hidden border-b border-bone/10">
        <img
          src={category.image}
          alt={`${category.name} manufactured by Uzas Sports`}
          width={1600}
          height={1000}
          className="absolute inset-0 h-full w-full object-cover opacity-60"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-background via-background/85 to-background/25" />
        <div className="relative mx-auto flex min-h-[60vh] max-w-7xl flex-col justify-center px-6 py-20">
          <Reveal>
            <p className="mb-5 font-mono text-[11px] uppercase tracking-[0.3em] text-crimson">
              {category.tagline}
            </p>
          </Reveal>
          <Reveal delay={80}>
            <h1 className="max-w-[16ch] font-display text-[clamp(2.75rem,8vw,7rem)] uppercase leading-[0.85] tracking-tight text-bone">
              {category.name}
            </h1>
          </Reveal>
          <Reveal delay={160}>
            <p className="mt-7 max-w-[54ch] text-pretty text-base text-bone/70 md:text-lg">
              {category.intro}
            </p>
          </Reveal>
        </div>
      </section>

      {/* PRODUCT BREAKDOWN — placeholder */}
      <section className="bg-coal py-20">
        <div className="mx-auto max-w-7xl px-6">
          <Reveal>
            <p className="mb-3 font-mono text-[11px] uppercase tracking-[0.3em] text-crimson">
              (a) — Product breakdown
            </p>
            <h2 className="max-w-[20ch] font-display text-4xl leading-[0.95] tracking-tight text-bone md:text-5xl">
              WHAT WE MAKE IN THIS LINE
            </h2>
            <p className="mt-4 max-w-[60ch] text-sm text-smoke">
              Placeholder section — replace the cards below with real product
              names, materials, weights and specs for {category.name.toLowerCase()}.
            </p>
          </Reveal>
          <div className="mt-10 grid grid-cols-1 gap-px bg-bone/10 md:grid-cols-3">
            {[1, 2, 3, 4, 5, 6].map((n, i) => (
              <Reveal key={n} delay={i * 70}>
                <div className="h-full bg-coal p-7">
                  <span className="font-mono text-[11px] uppercase tracking-[0.25em] text-crimson">
                    Product {String(n).padStart(2, "0")}
                  </span>
                  <h3 className="mt-3 font-display text-2xl tracking-tight text-bone">
                    [ PRODUCT NAME ]
                  </h3>
                  <p className="mt-2 text-sm text-smoke">
                    [ Add fabric / material, construction detail, weight, available
                    finishes and use case here. ]
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* CUSTOMIZATION */}
      <section className="border-t border-bone/10 bg-background py-20">
        <div className="mx-auto max-w-7xl px-6">
          <Reveal>
            <p className="mb-3 font-mono text-[11px] uppercase tracking-[0.3em] text-crimson">
              (b) — Customization
            </p>
            <h2 className="max-w-[18ch] font-display text-4xl leading-[0.95] tracking-tight text-bone md:text-5xl">
              MADE TO YOUR SPEC
            </h2>
          </Reveal>
          <div className="mt-10 grid grid-cols-1 gap-px bg-bone/10 md:grid-cols-4">
            {category.customization.map((c, i) => (
              <Reveal key={c.label} delay={i * 80}>
                <div className="h-full bg-background p-7 transition-colors hover:bg-coal">
                  <h3 className="font-mono text-[11px] uppercase tracking-[0.25em] text-crimson">
                    {c.label}
                  </h3>
                  <p className="mt-3 text-sm text-smoke">{c.value}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* CATALOGUE */}
      <section className="border-t border-bone/10 bg-coal py-20">
        <div className="mx-auto max-w-7xl px-6">
          <Reveal>
            <p className="mb-3 font-mono text-[11px] uppercase tracking-[0.3em] text-crimson">
              (c) — Catalogue
            </p>
            <h2 className="font-display text-4xl leading-[0.95] tracking-tight text-bone md:text-5xl">
              {category.name.toUpperCase()} CATALOGUE
            </h2>
          </Reveal>
          <Reveal delay={100}>
            <div className="mt-8 border border-bone/10 bg-background">
              <object
                data={category.pdf}
                type="application/pdf"
                className="h-[70vh] w-full"
                aria-label={`${category.name} catalogue PDF`}
              >
                <p className="p-8 text-sm text-smoke">
                  Your browser can't display the embedded catalogue.{" "}
                  <a href={category.pdf} className="text-crimson underline">
                    Open the PDF instead.
                  </a>
                </p>
              </object>
            </div>
            <div className="mt-5 flex flex-wrap gap-4">
              <a
                href={category.pdf}
                target="_blank"
                rel="noopener noreferrer"
                className="border border-bone/30 px-6 py-3 font-mono text-[11px] uppercase tracking-[0.2em] text-bone transition-colors hover:border-crimson hover:text-crimson"
              >
                Open catalogue PDF ↗
              </a>
              <Link
                to="/catalogues"
                className="border border-bone/15 px-6 py-3 font-mono text-[11px] uppercase tracking-[0.2em] text-smoke transition-colors hover:text-bone"
              >
                All six catalogues
              </Link>
            </div>
          </Reveal>
        </div>
      </section>

      {/* CTA */}
      <section className="border-t border-bone/10 bg-background py-24 text-center">
        <div className="mx-auto max-w-3xl px-6">
          <Reveal>
            <h2 className="text-balance font-display text-4xl leading-[0.9] tracking-tight text-bone md:text-6xl">
              {category.cta === "wholesale"
                ? "KITTING OUT A GYM OR TEAM?"
                : "TELL US WHAT YOU NEED BUILT"}
            </h2>
            <p className="mx-auto mt-6 max-w-[52ch] text-pretty text-base text-smoke">
              {category.cta === "wholesale"
                ? "Send your roster size, artwork and timeline — we'll come back with MOQs, pricing tiers and a sample plan."
                : "Share specs, quantities and reference images. We quote from the factory floor, not through a middleman."}
            </p>
            <div className="mt-9 flex flex-wrap justify-center gap-4">
              {category.cta === "wholesale" ? (
                <Link
                  to="/wholesale"
                  className="bg-crimson px-8 py-4 text-sm font-semibold uppercase tracking-wider text-primary-foreground transition-colors hover:bg-bone"
                >
                  Wholesale inquiry
                </Link>
              ) : (
                <Link
                  to="/contact"
                  className="bg-crimson px-8 py-4 text-sm font-semibold uppercase tracking-wider text-primary-foreground transition-colors hover:bg-bone"
                >
                  Contact us
                </Link>
              )}
              <Link
                to="/studio"
                className="border border-bone/30 px-8 py-4 text-sm font-semibold uppercase tracking-wider text-bone transition-colors hover:border-bone"
              >
                Try the AI mockup studio
              </Link>
            </div>
          </Reveal>
        </div>
      </section>

      {/* OTHER LINES */}
      <section className="border-t border-bone/10 bg-coal py-16">
        <div className="mx-auto max-w-7xl px-6">
          <p className="mb-6 font-mono text-[11px] uppercase tracking-[0.3em] text-crimson">
            Other product lines
          </p>
          <div className="grid grid-cols-1 gap-px bg-bone/10 sm:grid-cols-2 lg:grid-cols-5">
            {others.map((o) => (
              <Link
                key={o.slug}
                to={o.slug}
                className="group bg-coal p-6 transition-colors hover:bg-ash"
              >
                <h3 className="font-display text-xl tracking-tight text-bone group-hover:text-crimson">
                  {o.name}
                </h3>
                <p className="mt-1 font-mono text-[10px] uppercase tracking-[0.2em] text-smoke">
                  {o.tagline}
                </p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <SiteFooter />
    </div>
  );
}

export function categoryHead(category: Category) {
  return () => ({
    meta: [
      { title: category.title },
      { name: "description", content: category.description },
      { property: "og:title", content: category.ogTitle },
      { property: "og:description", content: category.description },
      { property: "og:type", content: "website" },
      { property: "og:url", content: category.slug },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "canonical", href: category.slug }],
  });
}
