import { createFileRoute, Link } from "@tanstack/react-router";
import { SiteFooter, SiteHeader } from "@/components/site-chrome";
import { Reveal } from "@/components/Reveal";
import heroArena from "@/assets/hero-arena.jpg";
import { CATEGORIES } from "@/lib/site-data";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About Uzas Sports — Sialkot Sportswear Manufacturer Since 2005" },
      {
        name: "description",
        content:
          "Uzas Sports is a Sialkot-based sportswear and combat sports gear manufacturer established in 2005, producing six specialist product lines fully in-house.",
      },
      { property: "og:title", content: "About Uzas Sports — Manufacturing Since 2005" },
      {
        property: "og:description",
        content:
          "Two decades of manufacturing in Sialkot, Pakistan — apparel, paintball, martial arts, gloves, patches and sublimation under one roof.",
      },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "/about" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "canonical", href: "/about" }],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Organization",
          name: "Uzas Sports",
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
  component: AboutPage,
});

function AboutPage() {
  return (
    <div className="min-h-screen bg-background font-body">
      <SiteHeader />

      <section className="relative overflow-hidden border-b border-bone/10">
        <img
          src={heroArena}
          alt="Uzas Sports manufacturing in Sialkot"
          width={1600}
          height={1000}
          className="absolute inset-0 h-full w-full object-cover opacity-50"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-background via-background/85 to-background/30" />
        <div className="relative mx-auto max-w-7xl px-6 py-24">
          <Reveal>
            <p className="mb-5 font-mono text-[11px] uppercase tracking-[0.3em] text-crimson">
              Established 2005 · Sialkot, Pakistan
            </p>
            <h1 className="max-w-[16ch] font-display text-[clamp(2.75rem,8vw,6.5rem)] leading-[0.85] tracking-tight text-bone">
              TWENTY YEARS ON ONE FLOOR
            </h1>
            <p className="mt-7 max-w-[58ch] text-pretty text-base text-bone/70 md:text-lg">
              Uzas Sports started in 2005 in Sialkot — the city that has been
              stitching the world's sporting goods for over a century. We began
              with gloves and combat sports gear and grew into six specialist
              lines, all still made under our own roof.
            </p>
          </Reveal>
        </div>
      </section>

      <section className="bg-coal py-20">
        <div className="mx-auto grid max-w-7xl gap-12 px-6 lg:grid-cols-2">
          <Reveal>
            <div>
              <p className="mb-3 font-mono text-[11px] uppercase tracking-[0.3em] text-crimson">
                The manufacturer
              </p>
              <h2 className="font-display text-4xl leading-[0.95] tracking-tight text-bone md:text-5xl">
                MADE HERE, NOT BROKERED
              </h2>
            </div>
          </Reveal>
          <Reveal delay={100}>
            <div className="space-y-5 text-base text-smoke">
              <p>
                Design, pattern-making, cutting, sublimation printing,
                embroidery, stitching, finishing and QA all happen in our own
                facility. Nothing is subcontracted out, so nothing gets lost
                between hands.
              </p>
              <p>
                That control is why we can take a single sample and a
                thousand-piece bulk order through the same line with the same
                spec — and why our clients get honest lead times instead of
                agency guesses.
              </p>
              <p>
                We work with gyms, academies, clubs, teams, tactical outfitters,
                and apparel brands across Europe, North America, the Middle East
                and Australia.
              </p>
              <a
                href="https://pk.linkedin.com/in/uzas-sports"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block border border-bone/30 px-6 py-3 font-mono text-[11px] uppercase tracking-[0.2em] text-bone transition-colors hover:border-crimson hover:text-crimson"
              >
                Uzas Sports on LinkedIn ↗
              </a>
            </div>
          </Reveal>
        </div>
      </section>

      <section className="border-t border-bone/10 py-20">
        <div className="mx-auto max-w-7xl px-6">
          <Reveal>
            <p className="mb-8 font-mono text-[11px] uppercase tracking-[0.3em] text-crimson">
              Six specialist lines
            </p>
          </Reveal>
          <div className="grid grid-cols-1 gap-px bg-bone/10 sm:grid-cols-2 lg:grid-cols-3">
            {CATEGORIES.map((c, i) => (
              <Reveal key={c.slug} delay={i * 70}>
                <Link to={c.slug} className="group block h-full bg-background p-7 transition-colors hover:bg-coal">
                  <h3 className="font-display text-2xl tracking-tight text-bone group-hover:text-crimson">
                    {c.name}
                  </h3>
                  <p className="mt-2 font-mono text-[10px] uppercase tracking-[0.2em] text-smoke">
                    {c.tagline}
                  </p>
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <SiteFooter />
    </div>
  );
}
