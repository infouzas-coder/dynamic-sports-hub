import { createFileRoute, Link } from "@tanstack/react-router";
import { SiteFooter, SiteHeader } from "@/components/site-chrome";
import { Reveal } from "@/components/Reveal";
import { CATEGORIES } from "@/lib/site-data";

export const Route = createFileRoute("/catalogues")({
  head: () => ({
    meta: [
      { title: "Product Catalogues — Uzas Sports Manufacturer PDFs" },
      {
        name: "description",
        content:
          "Download all six Uzas Sports catalogues: apparel, paintball, martial arts, gloves, custom patches and sublimation clothing — full product ranges in PDF.",
      },
      { property: "og:title", content: "Uzas Sports Catalogues" },
      {
        property: "og:description",
        content: "All six product-line catalogues in one place, free to download as PDF.",
      },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "/catalogues" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "canonical", href: "/catalogues" }],
  }),
  component: CataloguesPage,
});

function CataloguesPage() {
  return (
    <div className="min-h-screen bg-background font-body">
      <SiteHeader />

      <section className="border-b border-bone/10 py-20">
        <div className="mx-auto max-w-7xl px-6">
          <Reveal>
            <p className="mb-5 font-mono text-[11px] uppercase tracking-[0.3em] text-crimson">
              Catalogue library
            </p>
            <h1 className="font-display text-[clamp(2.75rem,8vw,6rem)] leading-[0.85] tracking-tight text-bone">
              EVERY LINE,
              <br />
              <span className="text-crimson">EVERY PAGE</span>
            </h1>
            <p className="mt-6 max-w-[54ch] text-pretty text-base text-smoke md:text-lg">
              Six catalogues covering the full Uzas Sports range. Download,
              share with your team, and send us the item codes you want quoted.
            </p>
          </Reveal>
        </div>
      </section>

      <section className="bg-coal py-16">
        <div className="mx-auto max-w-7xl px-6">
          <div className="grid grid-cols-1 gap-px bg-bone/10 sm:grid-cols-2 lg:grid-cols-3">
            {CATEGORIES.map((c, i) => (
              <Reveal key={c.slug} delay={i * 80}>
                <div className="flex h-full flex-col bg-coal">
                  <img
                    src={c.image}
                    alt={`${c.name} catalogue cover`}
                    loading="lazy"
                    width={1600}
                    height={1000}
                    className="aspect-[16/10] w-full object-cover"
                  />
                  <div className="flex flex-1 flex-col p-6">
                    <h2 className="font-display text-2xl tracking-tight text-bone">
                      {c.name.toUpperCase()}
                    </h2>
                    <p className="mt-1 font-mono text-[10px] uppercase tracking-[0.2em] text-crimson">
                      {c.tagline}
                    </p>
                    <p className="mt-3 flex-1 text-sm text-smoke">{c.intro}</p>
                    <div className="mt-5 flex flex-wrap gap-3">
                      <a
                        href={c.pdf}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="bg-crimson px-5 py-2.5 font-mono text-[11px] uppercase tracking-[0.2em] text-primary-foreground transition-colors hover:bg-bone"
                      >
                        View PDF ↗
                      </a>
                      <Link
                        to={c.slug}
                        className="border border-bone/25 px-5 py-2.5 font-mono text-[11px] uppercase tracking-[0.2em] text-bone transition-colors hover:border-crimson hover:text-crimson"
                      >
                        Line page
                      </Link>
                    </div>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="border-t border-bone/10 py-20 text-center">
        <div className="mx-auto max-w-3xl px-6">
          <Reveal>
            <h2 className="font-display text-4xl leading-[0.9] tracking-tight text-bone md:text-6xl">
              FOUND WHAT YOU NEED?
            </h2>
            <div className="mt-8 flex flex-wrap justify-center gap-4">
              <Link
                to="/wholesale"
                className="bg-crimson px-8 py-4 text-sm font-semibold uppercase tracking-wider text-primary-foreground transition-colors hover:bg-bone"
              >
                Wholesale inquiry
              </Link>
              <Link
                to="/contact"
                className="border border-bone/30 px-8 py-4 text-sm font-semibold uppercase tracking-wider text-bone transition-colors hover:border-bone"
              >
                General contact
              </Link>
            </div>
          </Reveal>
        </div>
      </section>

      <SiteFooter />
    </div>
  );
}
