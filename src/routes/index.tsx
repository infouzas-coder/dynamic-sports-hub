import { createFileRoute, Link } from "@tanstack/react-router";
import { absUrl, ORG } from "@/lib/seo";
import { SiteFooter, SiteHeader } from "@/components/site-chrome";
import { Reveal } from "@/components/Reveal";
import heroPoster from "@/assets/hero-poster.jpg";
import { CATEGORIES } from "@/lib/site-data";
import { ArrowRight, Dumbbell, Instagram, Shirt, Sparkles } from "lucide-react";
import uzasLogo from "@/assets/uzas-logo.png";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Uzas Sports | Sportswear & Combat Gear Manufacturer Since 2005" },
      {
        name: "description",
        content:
          "Uzas Sports is a Sialkot-based manufacturer established in 2005, making apparel, paintball gear, martial arts gear, gloves, custom patches and sublimation clothing, all made in-house.",
      },
      { property: "og:title", content: "Uzas Sports | Six Product Lines, One Factory" },
      {
        property: "og:description",
        content:
          "Manufacturer of performance apparel, paintball gear, martial arts uniforms, gloves, custom patches and sublimated teamwear. Sialkot, Pakistan since 2005.",
      },
      { property: "og:type", content: "website" },
      { property: "og:url", content: absUrl("/") },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "canonical", href: absUrl("/") }],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({ "@context": "https://schema.org", ...ORG }),
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
  {
    value: "B2B",
    label: "Wholesale ready",
    desc: "No minimum order, private label and repeat programmes.",
  },
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
            poster={heroPoster}
          >
            <source src="/hero-loop.mp4" type="video/mp4" />
          </video>
        </div>
        <div className="absolute inset-0 bg-gradient-to-r from-background via-background/80 to-background/20" />
        <div className="relative mx-auto flex min-h-[88vh] max-w-7xl flex-col justify-center px-6">
          <Reveal>
            <p className="mb-6 font-mono text-[11px] uppercase tracking-[0.3em] text-crimson">
              Est. 2005 · Made in Sialkot, Pakistan · Showrooms in Sialkot &amp; Melbourne
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
              Uzas Sports manufactures performance apparel, paintball gear, martial arts uniforms,
              gloves, custom patches and sublimated clothing. Everything is designed, printed, cut
              and stitched in our own factory since 2005.
            </p>
          </Reveal>
          <Reveal delay={240}>
            <div className="mt-10 flex flex-wrap items-center gap-x-5 gap-y-4">
              <Link to="/sublimation-clothing" className="btn btn-gold">
                <Shirt className="h-5 w-5" strokeWidth={2.2} />
                Custom team kits
                <ArrowRight className="btn-arrow h-4 w-4" strokeWidth={2.5} />
              </Link>
              <Link to="/wholesale" className="btn btn-ghost">
                <Dumbbell className="h-5 w-5" strokeWidth={2.2} />
                Gym &amp; academy wholesale
              </Link>
              <Link
                to="/catalogues"
                className="nav-link ml-1 inline-flex items-center gap-2 text-sm"
              >
                Browse catalogues <ArrowRight className="h-4 w-4" />
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
                  (a) Product lines
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
                      alt={`${c.name}: ${c.tagline}`}
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
              (b) Off the line
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
            <InstagramFeed />
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
              Wholesale programmes for gyms, academies, clubs and brands, plus an AI mockup studio
              if you want to see your artwork on gear first.
            </p>
          </Reveal>
          <Reveal delay={240}>
            <div className="mt-10 flex flex-wrap justify-center gap-x-5 gap-y-4">
              <Link to="/sublimation-clothing" className="btn btn-gold">
                <Shirt className="h-5 w-5" strokeWidth={2.2} />
                Custom team kits
                <ArrowRight className="btn-arrow h-4 w-4" strokeWidth={2.5} />
              </Link>
              <Link to="/wholesale" className="btn btn-ghost">
                <Dumbbell className="h-5 w-5" strokeWidth={2.2} />
                Gym &amp; academy wholesale
              </Link>
              <Link to="/studio" className="btn btn-ghost">
                <Sparkles className="h-5 w-5" strokeWidth={2.2} />
                Design with AI
              </Link>
            </div>
          </Reveal>
        </div>
      </section>

      <SiteFooter />
    </div>
  );
}

/* Instagram profile embed, restyled: Instagram's white header is cropped away and replaced with a
   branded dark header, and the frame is sized to show a clean grid of the latest posts. */
const IG_URL = "https://www.instagram.com/uzas_sports/";
const IG_EMBED_HEADER_PX = 158; // height of Instagram's own profile header inside the embed

function InstagramFeed() {
  return (
    <div className="mt-10 overflow-hidden border border-bone/10 bg-background">
      <div className="flex flex-wrap items-center justify-between gap-4 border-b border-bone/10 px-5 py-4 md:px-6">
        <a
          href={IG_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="group flex items-center gap-4"
        >
          <span className="grid h-14 w-14 shrink-0 place-items-center rounded-full border border-gold/60 bg-coal p-2 transition-colors group-hover:border-gold">
            <img src={uzasLogo} alt="" className="h-full w-full object-contain" />
          </span>
          <span>
            <span className="block font-display text-2xl leading-none text-bone">@uzas_sports</span>
            <span className="mt-1.5 block font-mono text-[11px] uppercase tracking-[0.2em] text-smoke">
              10K+ followers · Production, daily
            </span>
          </span>
        </a>
        <a href={IG_URL} target="_blank" rel="noopener noreferrer" className="btn btn-gold btn-sm">
          <Instagram className="h-4 w-4" /> Follow on Instagram
        </a>
      </div>
      <div className="w-full">
        {/* Instagram's profile embed carries the 6 latest posts: 2 rows of 3 square tiles */}
        <div className="relative w-full overflow-hidden bg-coal" style={{ aspectRatio: "3 / 2" }}>
          <iframe
            title="Uzas Sports on Instagram"
            src={`${IG_URL}embed`}
            loading="lazy"
            scrolling="no"
            frameBorder={0}
            className="absolute left-0 w-full"
            style={{
              top: -IG_EMBED_HEADER_PX,
              height: `calc(100% + ${IG_EMBED_HEADER_PX + 120}px)`,
            }}
          />
        </div>
      </div>
    </div>
  );
}
