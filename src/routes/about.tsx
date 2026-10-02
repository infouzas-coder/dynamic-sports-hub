import { createFileRoute, Link } from "@tanstack/react-router";
import { Factory, Linkedin, Mail, MapPin, Plane, Ship, Store, Timer } from "lucide-react";
import { absUrl, ORG } from "@/lib/seo";
import { SiteFooter, SiteHeader } from "@/components/site-chrome";
import { Reveal } from "@/components/Reveal";
import aboutHero from "@/assets/about/about-hero.jpg";
import imgDesign from "@/assets/about/process-design.jpg";
import imgPrinting from "@/assets/about/process-printing.jpg";
import imgCutting from "@/assets/about/process-cutting.jpg";
import imgStitching from "@/assets/about/process-stitching.jpg";
import imgEmbroidery from "@/assets/about/process-embroidery.jpg";
import imgQuality from "@/assets/about/process-quality.jpg";
import imgPacking from "@/assets/about/process-packing.jpg";
import { CARRIERS, CATEGORIES, LOCATIONS, TEAM, type TeamMember } from "@/lib/site-data";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About Uzas Sports | Sialkot Sportswear Manufacturer Since 2005" },
      {
        name: "description",
        content:
          "Uzas Sports is a Sialkot-based sportswear and combat sports gear manufacturer established in 2005, producing six specialist product lines fully in-house.",
      },
      { property: "og:title", content: "About Uzas Sports | Manufacturing Since 2005" },
      {
        property: "og:description",
        content:
          "Two decades of manufacturing in Sialkot, Pakistan: apparel, paintball, martial arts, gloves, patches and sublimation under one roof.",
      },
      { property: "og:type", content: "website" },
      { property: "og:url", content: absUrl("/about") },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "canonical", href: absUrl("/about") }],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({ "@context": "https://schema.org", ...ORG }),
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
          src={aboutHero}
          alt="Garment factory floor with rows of sewing machines"
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
              Uzas Sports started in 2005 in Sialkot, the city that has been stitching the world's
              sporting goods for over a century. We began with gloves and combat sports gear and
              grew into six specialist lines, all still made under our own roof.
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
                Design, pattern-making, cutting, sublimation printing, embroidery, stitching,
                finishing and QA all happen in our own facility. Nothing is subcontracted out, so
                nothing gets lost between hands.
              </p>
              <p>
                That control is why we can take a single sample and a thousand-piece bulk order
                through the same line with the same spec, and why our clients get honest lead times
                instead of agency guesses.
              </p>
              <p>
                We work with gyms, academies, clubs, teams, tactical outfitters, and apparel brands
                across Europe, North America, the Middle East and Australia.
              </p>
              <a
                href="https://pk.linkedin.com/in/uzas-sports"
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-ghost btn-sm"
              >
                <Linkedin className="h-4 w-4" /> Uzas Sports on LinkedIn
              </a>
            </div>
          </Reveal>
        </div>
      </section>

      <LocationsSection />
      <ProcessSection />
      <ShippingSection />
      <TeamSection />

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
                <Link
                  to={c.slug}
                  className="group block h-full bg-background p-7 transition-colors hover:bg-coal"
                >
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

const PROCESS = [
  {
    img: imgDesign,
    title: "Design",
    text: "Free design support. We turn your idea or logo into a print-ready template.",
  },
  {
    img: imgPrinting,
    title: "Sublimation print",
    text: "Colours are printed onto transfer paper and pressed into the fabric.",
  },
  {
    img: imgCutting,
    title: "Cutting",
    text: "Printed fabric is cut to pattern for every size in your order.",
  },
  {
    img: imgStitching,
    title: "Stitching",
    text: "Panels are sewn with flatlock and overlock seams built for training.",
  },
  {
    img: imgEmbroidery,
    title: "Embroidery & patches",
    text: "Logos, badges and patches are stitched in house.",
  },
  {
    img: imgQuality,
    title: "Quality check",
    text: "Every piece is measured and inspected before it is packed.",
  },
  {
    img: imgPacking,
    title: "Packed & shipped",
    text: "Bagged, boxed and shipped worldwide, from one piece to a full team.",
  },
];

function ProcessSection() {
  return (
    <section className="border-t border-bone/10 bg-background py-20">
      <div className="mx-auto max-w-7xl px-6">
        <Reveal>
          <p className="mb-3 font-mono text-[11px] uppercase tracking-[0.3em] text-crimson">
            From idea to delivery
          </p>
          <h2 className="font-display text-4xl leading-[0.95] tracking-tight text-bone md:text-5xl">
            HOW YOUR ORDER IS MADE
          </h2>
        </Reveal>
        <div className="mt-12 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {PROCESS.map((step, i) => (
            <Reveal key={step.title} delay={(i % 4) * 80}>
              <figure className="group relative h-full overflow-hidden border border-bone/10 bg-coal">
                <div className="aspect-[4/3] overflow-hidden">
                  <img
                    src={step.img}
                    alt={step.title}
                    loading="lazy"
                    width={1344}
                    height={768}
                    className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                </div>
                <figcaption className="p-5">
                  <p className="font-display text-xl text-bone">
                    <span className="mr-2 text-gold">{String(i + 1).padStart(2, "0")}</span>
                    {step.title.toUpperCase()}
                  </p>
                  <p className="mt-1.5 text-sm text-smoke">{step.text}</p>
                </figcaption>
              </figure>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

function initials(name: string) {
  return name
    .split(/\s+/)
    .map((w) => w[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();
}

function TeamCard({ m }: { m: TeamMember }) {
  return (
    <article className="group h-full overflow-hidden border border-bone/10 bg-background transition-all duration-300 hover:-translate-y-1 hover:border-gold/60 hover:shadow-[0_18px_40px_-20px_var(--gold)]">
      <div className="relative aspect-[4/5] overflow-hidden bg-coal">
        {m.photo ? (
          <img
            src={m.photo}
            alt={m.name}
            loading="lazy"
            className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
          />
        ) : (
          <div className="relative grid h-full w-full place-items-center bg-[radial-gradient(circle_at_30%_20%,color-mix(in_srgb,var(--gold)_22%,transparent),transparent_60%)]">
            <div
              aria-hidden="true"
              className="absolute inset-0 opacity-[0.07] [background-image:repeating-linear-gradient(-45deg,var(--gold)_0_2px,transparent_2px_14px)]"
            />
            <span className="relative grid h-32 w-32 -skew-x-6 place-items-center border-2 border-gold bg-background/60 font-display text-6xl text-gold transition-transform duration-500 group-hover:scale-110">
              {initials(m.name)}
            </span>
          </div>
        )}
        <span className="absolute left-0 top-5 bg-primary px-3 py-1 font-display text-sm font-semibold uppercase tracking-wide text-primary-foreground">
          {m.role}
        </span>
      </div>
      <div className="p-6">
        <h3 className="font-display text-3xl leading-none text-bone">{m.name.toUpperCase()}</h3>
        <p className="mt-2 flex items-center gap-1.5 text-xs uppercase tracking-[0.15em] text-smoke">
          <MapPin className="h-3.5 w-3.5 text-gold" /> {m.location}
        </p>
        <p className="mt-4 text-sm text-smoke">{m.bio}</p>
        <a
          href={`mailto:${m.email}`}
          className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-bone transition-colors hover:text-gold"
        >
          <Mail className="h-4 w-4 text-gold" /> {m.email}
        </a>
      </div>
    </article>
  );
}

function TeamSection() {
  return (
    <section id="team" className="scroll-mt-32 lg:scroll-mt-20 border-t border-bone/10 bg-coal py-20">
      <div className="mx-auto max-w-7xl px-6">
        <Reveal>
          <p className="mb-3 font-mono text-[11px] uppercase tracking-[0.3em] text-crimson">
            The people behind your order
          </p>
          <h2 className="font-display text-4xl leading-[0.95] tracking-tight text-bone md:text-5xl">
            MEET THE TEAM
          </h2>
          <p className="mt-4 max-w-[56ch] text-smoke">
            Talk to the people who actually make your gear. Email any of us directly.
          </p>
        </Reveal>
        <div className="mt-12 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {TEAM.map((m, i) => (
            <Reveal key={m.email} delay={i * 80}>
              <TeamCard m={m} />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

function LocationsSection() {
  return (
    <section className="border-t border-bone/10 bg-background py-20">
      <div className="mx-auto max-w-7xl px-6">
        <Reveal>
          <p className="mb-3 font-mono text-[11px] uppercase tracking-[0.3em] text-crimson">
            Where to find us
          </p>
          <h2 className="font-display text-4xl leading-[0.95] tracking-tight text-bone md:text-5xl">
            MADE IN SIALKOT. SHOWROOMS IN SIALKOT AND MELBOURNE.
          </h2>
        </Reveal>
        <div className="mt-12 grid grid-cols-1 gap-5 md:grid-cols-3">
          {LOCATIONS.map((l, i) => {
            const Icon = l.kind === "Manufacturing" ? Factory : Store;
            return (
              <Reveal key={l.title} delay={i * 80}>
                <div className="group h-full border border-bone/10 bg-coal p-7 transition-all duration-300 hover:-translate-y-1 hover:border-gold/60">
                  <div className="flex items-center justify-between">
                    <span className="grid h-12 w-12 -skew-x-6 place-items-center border border-gold/60 text-gold transition-colors group-hover:bg-gold group-hover:text-primary-foreground">
                      <Icon className="h-6 w-6 skew-x-6" strokeWidth={1.8} />
                    </span>
                    <span className="font-mono text-[10px] uppercase tracking-[0.25em] text-gold">
                      {l.kind}
                    </span>
                  </div>
                  <h3 className="mt-6 font-display text-3xl leading-none text-bone">
                    {l.title.toUpperCase()}
                  </h3>
                  <p className="mt-2 flex items-center gap-1.5 text-sm font-semibold text-bone/80">
                    <MapPin className="h-4 w-4 text-gold" /> {l.place}
                  </p>
                  <p className="mt-3 text-sm text-smoke">{l.text}</p>
                </div>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}

const SHIPPING = [
  {
    icon: Plane,
    title: "Air freight",
    text: "Express courier and air cargo for samples, reorders and urgent team orders.",
  },
  {
    icon: Ship,
    title: "Sea freight",
    text: "Cost-effective shipping for large bulk and wholesale orders.",
  },
  {
    icon: Timer,
    title: "Fast turnaround",
    text: "Production and dispatch planned around your deadline, with tracking on every shipment.",
  },
];

function ShippingSection() {
  return (
    <section className="border-t border-bone/10 bg-coal py-20">
      <div className="mx-auto max-w-7xl px-6">
        <Reveal>
          <p className="mb-3 font-mono text-[11px] uppercase tracking-[0.3em] text-crimson">
            Worldwide delivery
          </p>
          <h2 className="font-display text-4xl leading-[0.95] tracking-tight text-bone md:text-5xl">
            SHIPPED TO YOUR DOOR, ANYWHERE
          </h2>
        </Reveal>
        <div className="mt-12 grid grid-cols-1 gap-5 md:grid-cols-3">
          {SHIPPING.map((sh, i) => (
            <Reveal key={sh.title} delay={i * 80}>
              <div className="group h-full border border-bone/10 bg-background p-7 transition-all duration-300 hover:-translate-y-1 hover:border-gold/60">
                <sh.icon
                  className="h-9 w-9 text-gold transition-transform duration-500 group-hover:translate-x-1"
                  strokeWidth={1.6}
                />
                <h3 className="mt-5 font-display text-2xl text-bone">{sh.title.toUpperCase()}</h3>
                <p className="mt-2 text-sm text-smoke">{sh.text}</p>
              </div>
            </Reveal>
          ))}
        </div>
        <Reveal delay={120}>
          <div className="mt-12 border-t border-bone/10 pt-10">
            <p className="font-mono text-[11px] uppercase tracking-[0.3em] text-smoke">
              Delivery partners
            </p>
            <div className="mt-5 grid grid-cols-2 gap-px bg-bone/10 sm:grid-cols-4">
              {CARRIERS.map((c) => (
                <div
                  key={c}
                  className="grid h-24 place-items-center bg-coal px-4 text-center font-display text-2xl font-bold tracking-wide text-bone/70 transition-colors hover:bg-background hover:text-gold"
                >
                  {c.toUpperCase()}
                </div>
              ))}
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
