import { createFileRoute, Link } from "@tanstack/react-router";
import { SiteFooter, SiteHeader } from "@/components/site-chrome";
import { Reveal } from "@/components/Reveal";
import heroArena from "@/assets/hero-arena.jpg";
import heroLoop from "@/assets/hero-loop.mp4.asset.json";
import fightShorts from "@/assets/fight-shorts.jpg";
import rashGuard from "@/assets/rash-guard.jpg";
import teamwear from "@/assets/teamwear.jpg";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Uzas Sports — Martial Arts Gear & Sublimation Apparel Manufacturer" },
      {
        name: "description",
        content:
          "Uzas Sports builds custom fight shorts, rash guards, gi and sublimated teamwear — fully in-house, from scratch to finish, in any quantity.",
      },
      {
        property: "og:title",
        content: "Uzas Sports — Built Scratch to Finish",
      },
      {
        property: "og:description",
        content:
          "In-house manufacturer of martial arts gear and custom sublimation apparel. Any quantity, one facility, no hand-offs.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: HomePage,
});

const MARQUEE_ITEMS =
  "In-house production\u2003·\u2003Any quantity\u2003·\u2003Fast turnaround\u2003·\u2003Scratch to finish\u2003·\u2003Sublimation apparel\u2003·\u2003";

const CATEGORIES = [
  {
    image: fightShorts,
    title: "FIGHT SHORTS",
    desc: "Sublimated patterns, reinforced waist, fight-spec sizing.",
  },
  {
    image: rashGuard,
    title: "RASH GUARDS",
    desc: "All-over print, 4-way stretch, no bleeding — ever.",
  },
  {
    image: teamwear,
    title: "TEAM APPAREL",
    desc: "Rosters, academies and clubs. One sample to full run.",
  },
];

const PROCESS = [
  {
    step: "01",
    title: "Design",
    desc: "Your artwork, refined for sublimation and print-proofed before a single thread is cut.",
  },
  {
    step: "02",
    title: "Cut",
    desc: "Precision cutting on performance fabrics, spec-matched to your size run.",
  },
  {
    step: "03",
    title: "Sublimate",
    desc: "Full-transfer heat press locks the print into the fibre. Wash-proof, edge to edge.",
  },
  {
    step: "04",
    title: "Sew & QA",
    desc: "Stitched, pressed and inspected in-house. We ship finished product, not panels.",
  },
];

const STATS = [
  { value: "1", suffix: "–∞", desc: "Any quantity. One unit to a full team run — same in-house quality on both." },
  { value: "100", suffix: "%", desc: "In-house. Nothing outsourced, nothing subcontracted, nothing left to chance." },
  { value: "7–12", suffix: "d", desc: "Turnaround from approved artwork to deliverable, finished product." },
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
              MMA & martial arts gear · in-house sublimation
            </p>
          </Reveal>
          <Reveal delay={80}>
            <h1 className="font-display text-[clamp(3.5rem,11vw,10rem)] leading-[0.82] tracking-tight text-bone">
              BUILT
              <br />
              SCRATCH
              <br />
              <span className="text-crimson">TO FINISH</span>
            </h1>
          </Reveal>
          <Reveal delay={160}>
            <p className="mt-8 max-w-[46ch] text-pretty text-base text-bone/70 md:text-lg">
              Fight shorts, rash guards, gi and fully custom sublimated teamwear
              — designed, cut, printed and sewn by one floor. Any order
              quantity, from one fighter to one whole roster.
            </p>
          </Reveal>
          <Reveal delay={240}>
            <div className="mt-10 flex flex-wrap items-center gap-4">
              <Link
                to="/studio"
                className="bg-crimson px-7 py-4 text-sm font-semibold uppercase tracking-wider text-primary-foreground transition-colors hover:bg-bone"
              >
                Try the AI Studio
              </Link>
              <a
                href="#process"
                className="border border-bone/30 px-7 py-4 text-sm font-semibold uppercase tracking-wider text-bone transition-colors hover:border-bone"
              >
                See the process
              </a>
            </div>
          </Reveal>
          <Reveal delay={340}>
            <div className="mt-14 flex flex-wrap gap-x-10 gap-y-3 font-mono text-[11px] uppercase tracking-[0.2em] text-smoke">
              <span>In-house only</span>
              <span>Any quantity</span>
              <span>7–12 day turnaround</span>
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

      {/* CATALOG */}
      <section id="products" className="bg-coal py-24">
        <div className="mx-auto max-w-7xl px-6">
          <Reveal>
            <div className="mb-12 flex items-end justify-between">
              <div>
                <p className="mb-3 font-mono text-[11px] uppercase tracking-[0.3em] text-crimson">
                  (a) — Catalog
                </p>
                <h2 className="font-display text-5xl leading-[0.9] tracking-tight text-bone md:text-6xl">
                  BUILD YOUR
                  <br />
                  GEAR
                </h2>
              </div>
              <Link
                to="/studio"
                className="hidden font-mono text-[11px] uppercase tracking-[0.2em] text-smoke transition-colors hover:text-bone md:inline"
              >
                Design yours →
              </Link>
            </div>
          </Reveal>
          <div className="grid grid-cols-1 gap-px bg-bone/10 md:grid-cols-3">
            {CATEGORIES.map((cat, i) => (
              <Reveal key={cat.title} delay={i * 100}>
                <div className="group h-full bg-coal">
                  <div className="overflow-hidden">
                    <img
                      src={cat.image}
                      alt={cat.title}
                      loading="lazy"
                      width={800}
                      height={1000}
                      className="aspect-[4/5] w-full object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                  </div>
                  <div className="p-6">
                    <h3 className="font-display text-2xl tracking-tight text-bone">
                      {cat.title}
                    </h3>
                    <p className="mt-2 text-sm text-smoke">{cat.desc}</p>
                    <Link
                      to="/studio"
                      className="mt-4 inline-block font-mono text-[11px] uppercase tracking-[0.2em] text-crimson hover:text-bone"
                    >
                      Customise →
                    </Link>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* PROCESS */}
      <section id="process" className="border-t border-bone/10 bg-background py-24">
        <div className="mx-auto max-w-7xl px-6">
          <Reveal>
            <div className="mb-14">
              <p className="mb-3 font-mono text-[11px] uppercase tracking-[0.3em] text-crimson">
                (b) — In-house
              </p>
              <h2 className="max-w-[16ch] font-display text-5xl leading-[0.9] tracking-tight text-bone md:text-6xl">
                ONE FLOOR, NO HAND-OFFS
              </h2>
            </div>
          </Reveal>
          <div className="grid grid-cols-1 gap-px bg-bone/10 md:grid-cols-4">
            {PROCESS.map((p, i) => (
              <Reveal key={p.step} delay={i * 90}>
                <div className="h-full bg-background p-7 transition-colors hover:bg-coal">
                  <span className="font-display text-5xl text-crimson">{p.step}</span>
                  <h3 className="mt-4 text-lg font-semibold text-bone">{p.title}</h3>
                  <p className="mt-2 text-sm text-smoke">{p.desc}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* STATS */}
      <section id="terms" className="border-t border-bone/10 bg-coal py-24">
        <div className="mx-auto max-w-7xl px-6">
          <Reveal>
            <p className="mb-10 font-mono text-[11px] uppercase tracking-[0.3em] text-crimson">
              (c) — The terms
            </p>
          </Reveal>
          <div className="grid grid-cols-1 gap-12 md:grid-cols-3">
            {STATS.map((s, i) => (
              <Reveal key={s.value} delay={i * 100}>
                <div>
                  <p className="font-display text-[5rem] leading-none tracking-tight text-bone">
                    {s.value}
                    <span className="text-crimson">{s.suffix}</span>
                  </p>
                  <p className="mt-3 max-w-[24ch] text-sm text-smoke">{s.desc}</p>
                </div>
              </Reveal>
            ))}
          </div>
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
              YOUR NEXT ROSTER
            </h2>
          </Reveal>
          <Reveal delay={160}>
            <p className="mx-auto mt-8 max-w-[52ch] text-pretty text-base text-smoke">
              Drop your design in the AI Studio, see it on real gear, and send
              it straight to a quote — no middlemen, no markup games.
            </p>
          </Reveal>
          <Reveal delay={240}>
            <div className="mt-10 flex flex-wrap justify-center gap-4">
              <Link
                to="/studio"
                className="bg-crimson px-8 py-4 text-sm font-semibold uppercase tracking-wider text-primary-foreground transition-colors hover:bg-bone"
              >
                Open the AI Studio
              </Link>
              <a
                href="mailto:info@uzassports.com"
                className="border border-bone/30 px-8 py-4 text-sm font-semibold uppercase tracking-wider text-bone transition-colors hover:border-bone"
              >
                info@uzassports.com
              </a>
            </div>
          </Reveal>
        </div>
      </section>

      <SiteFooter />
    </div>
  );
}
