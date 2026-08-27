import { createFileRoute, Link } from "@tanstack/react-router";
import { SiteFooter, SiteHeader } from "@/components/site-chrome";
import { Reveal } from "@/components/Reveal";
import heroArena from "@/assets/hero-arena.jpg";
import heroLoop from "@/assets/hero-loop.mp4.asset.json";
import { CATEGORIES } from "@/lib/site-data";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Uzas Sports — Sportswear & Combat Gear Manufacturer Since 2005" },
      {
        name: "description",
        content:
          "Uzas Sports is a Sialkot-based manufacturer established in 2005 — apparel, paintball, martial arts gear, gloves, custom patches and sublimation clothing, all made in-house.",
      },
      { property: "og:title", content: "Uzas Sports — Six Product Lines, One Factory" },
      {
        property: "og:description",
        content:
          "Manufacturer of performance apparel, paintball gear, martial arts uniforms, gloves, custom patches and sublimated teamwear. Sialkot, Pakistan since 2005.",
      },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "/" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "canonical", href: "/" }],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Organization",
          name: "Uzas Sports",
          url: "https://www.uzassports.com",
          foundingDate: "2005",
          address: {
            "@type": "PostalAddress",
            addressLocality: "Sialkot",
            addressCountry: "PK",
          },
          sameAs: [
            "https://www.instagram.com/uzas_sports/",
            "https://www.facebook.com/uzalabel",
            "https://pk.linkedin.com/in/uzas-sports",
          ],
        }),
      },
    ],
  }),
  component: HomePage,
});

const MARQUEE_ITEMS =
  "Apparel\u2003·\u2003Paintball\u2003·\u2003Martial arts\u2003·\u2003Gloves\u2003·\u2003Custom patches\u2003·\u2003Sublimation\u2003·\u2003";

const TRUST = [
  { value: "2005", label: "Established", desc: "Two decades manufacturing in Sialkot, Pakistan." },
  { value: "100%", label: "In-house", desc: "Design, print, cut, stitch and QA under one roof." },
  { value: "6", label: "Product lines", desc: "One supplier for everything your athletes wear." },
  { value: "B2B", label: "Wholesale ready", desc: "Low MOQs, private label and repeat programmes." },
];

function HomePage() {
  return (
    <div className="min-h-screen bg-background font-body">
      <SiteHeader />

      {/* HERO */}
      <section className="relative overflow-hidden bg-background">
        <div className="absolute inset-0">
          <video
            className="h-full w-full object-cover"
            autoPlay
            muted
            loop
            playsInline
            poster={heroArena}
          >
            <source src={heroLoop.url} type="video/mp4" />
          </video>
        </div>
        <div className="absolute inset-0 bg-gradient-to-r from-background via-background/80 to-background/20" />
        <div className="relative mx-auto flex min-h-[88vh] max-w-7xl flex-col justify-center px-6">
          <Reveal>
            <p className="mb-6 font-mono text-[11px] uppercase tracking-[0.3em] text-crimson">
              Established 2005 · Sialkot, Pakistan · Six specialist lines
            </p>
          </Reveal>
          <Reveal delay={80}>
            <h1 className="font-display text-[clamp(3.25rem,10vw,9rem)] leading-[0.82] tracking-tight text-bone">
              ONE FACTORY.
              <br />
              SIX WAYS TO
              <br />
              <span className="text-crimson">OUTFIT A TEAM</span>
            </h1>
          </Reveal>
          <Reveal delay={160}>
            <p className="mt-8 max-w-[50ch] text-pretty text-base text-bone/70 md:text-lg">
              Uzas Sports manufactures performance apparel, paintball gear,
              martial arts uniforms, gloves, custom patches and sublimated
              clothing — designed, printed, cut and stitched entirely in-house
              since 2005.
            </p>
          </Reveal>
          <Reveal delay={240}>
            <div className="mt-10 flex flex-wrap items-center gap-4">
              <Link
                to="/wholesale"
                className="bg-crimson px-7 py-4 text-sm font-semibold uppercase tracking-wider text-primary-foreground transition-colors hover:bg-bone"
              >
                For gyms & teams
              </Link>
              <Link
                to="/catalogues"
                className="border border-bone/30 px-7 py-4 text-sm font-semibold uppercase tracking-wider text-bone transition-colors hover:border-bone"
              >
                Browse catalogues
              </Link>
            </div>
          </Reveal>
        </div>
      </section>

      {/* MARQUEE */}
      <div className="overflow-hidden border-y border-bone/10 bg-crimson py-4">
        <div className="flex w-max animate-marquee whitespace-nowrap font-display text-2xl uppercase tracking-tight text-primary-foreground md:text-3xl">
          <span className="px-6">{MARQUEE_ITEMS}</span>
          <span className="px-6">{MARQUEE_ITEMS}</span>
        </div>
      </div>

      {/* SIX LINES */}
      <section id="products" className="bg-coal py-24">
        <div className="mx-auto max-w-7xl px-6">
          <Reveal>
            <div className="mb-12 flex items-end justify-between">
              <div>
                <p className="mb-3 font-mono text-[11px] uppercase tracking-[0.3em] text-crimson">
                  (a) — Product lines
                </p>
                <h2 className="font-display text-5xl leading-[0.9] tracking-tight text-bone md:text-6xl">
                  SIX LINES,
                  <br />
                  ONE STANDARD
                </h2>
              </div>
              <Link
                to="/catalogues"
                className="hidden font-mono text-[11px] uppercase tracking-[0.2em] text-smoke transition-colors hover:text-bone md:inline"
              >
                All catalogues →
              </Link>
            </div>
          </Reveal>
          <div className="grid grid-cols-1 gap-px bg-bone/10 md:grid-cols-2 lg:grid-cols-3">
            {CATEGORIES.map((c, i) => (
              <Reveal key={c.slug} delay={i * 80}>
                <Link to={c.slug} className="group block h-full bg-coal">
                  <div className="overflow-hidden">
                    <img
                      src={c.image}
                      alt={`${c.name} — ${c.tagline}`}
                      loading="lazy"
                      width={1600}
                      height={1000}
                      className="aspect-[4/3] w-full object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                  </div>
                  <div className="p-6">
                    <h3 className="font-display text-2xl tracking-tight text-bone group-hover:text-crimson">
                      {c.name.toUpperCase()}
                    </h3>
                    <p className="mt-1 font-mono text-[10px] uppercase tracking-[0.2em] text-crimson">
                      {c.tagline}
                    </p>
                    <p className="mt-3 text-sm text-smoke">{c.intro}</p>
                    <span className="mt-4 inline-block font-mono text-[11px] uppercase tracking-[0.2em] text-bone">
                      Explore line →
                    </span>
                  </div>
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* TRUST BAR */}
      <section className="border-t border-bone/10 bg-background py-20">
        <div className="mx-auto grid max-w-7xl grid-cols-1 gap-px bg-bone/10 sm:grid-cols-2 lg:grid-cols-4">
          {TRUST.map((t, i) => (
            <Reveal key={t.label} delay={i * 80}>
              <div className="h-full bg-background p-8 transition-colors hover:bg-coal">
                <p className="font-display text-[3.5rem] leading-none tracking-tight text-bone">
                  {t.value}
                </p>
                <p className="mt-3 font-mono text-[11px] uppercase tracking-[0.25em] text-crimson">
                  {t.label}
                </p>
                <p className="mt-2 max-w-[26ch] text-sm text-smoke">{t.desc}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* SOCIAL PROOF / INSTAGRAM */}
      <section className="border-t border-bone/10 bg-coal py-24">
        <div className="mx-auto max-w-7xl px-6">
          <Reveal>
            <p className="mb-3 font-mono text-[11px] uppercase tracking-[0.3em] text-crimson">
              (b) — Off the line
            </p>
            <h2 className="max-w-[18ch] font-display text-5xl leading-[0.9] tracking-tight text-bone md:text-6xl">
              LIVE FROM THE FACTORY FLOOR
            </h2>
            <p className="mt-5 max-w-[52ch] text-sm text-smoke">
              Real orders, real teams, shipped worldwide. Follow{" "}
              <a
                href="https://www.instagram.com/uzas_sports/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-crimson hover:text-bone"
              >
                @uzas_sports
              </a>{" "}
              for daily production shots.
            </p>
          </Reveal>
          <Reveal delay={120}>
            <div className="mt-10 border border-bone/10 bg-background">
              <iframe
                title="Uzas Sports Instagram feed"
                src="https://www.instagram.com/uzas_sports/embed"
                loading="lazy"
                className="h-[620px] w-full"
                frameBorder={0}
                scrolling="no"
              />
            </div>
            <a
              href="https://www.instagram.com/uzas_sports/"
              target="_blank"
              rel="noopener noreferrer"
              className="mt-5 inline-block border border-bone/25 px-6 py-3 font-mono text-[11px] uppercase tracking-[0.2em] text-bone transition-colors hover:border-crimson hover:text-crimson"
            >
              View full Instagram ↗
            </a>
          </Reveal>
        </div>
      </section>

      {/* CTA */}
      <section className="border-t border-bone/10 bg-background py-28 text-center">
        <div className="mx-auto max-w-4xl px-6">
          <Reveal>
            <p className="mb-6 font-mono text-[11px] uppercase tracking-[0.3em] text-crimson">
              Ready when you are
            </p>
          </Reveal>
          <Reveal delay={80}>
            <h2 className="text-balance font-display text-5xl leading-[0.9] tracking-tight text-bone md:text-7xl">
              LET'S BUILD
              <br />
              YOUR NEXT ORDER
            </h2>
          </Reveal>
          <Reveal delay={160}>
            <p className="mx-auto mt-8 max-w-[52ch] text-pretty text-base text-smoke">
              Wholesale programmes for gyms, academies, clubs and brands — plus
              an AI mockup studio if you want to see your artwork on gear first.
            </p>
          </Reveal>
          <Reveal delay={240}>
            <div className="mt-10 flex flex-wrap justify-center gap-4">
              <Link
                to="/wholesale"
                className="bg-crimson px-8 py-4 text-sm font-semibold uppercase tracking-wider text-primary-foreground transition-colors hover:bg-bone"
              >
                For gyms & teams
              </Link>
              <Link
                to="/studio"
                className="border border-bone/30 px-8 py-4 text-sm font-semibold uppercase tracking-wider text-bone transition-colors hover:border-bone"
              >
                AI mockup studio
              </Link>
            </div>
          </Reveal>
        </div>
      </section>

      <SiteFooter />
    </div>
  );
}
