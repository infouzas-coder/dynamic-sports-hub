import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { SiteFooter, SiteHeader } from "@/components/site-chrome";
import { Reveal } from "@/components/Reveal";
import { CATEGORIES } from "@/lib/site-data";

export const Route = createFileRoute("/wholesale")({
  head: () => ({
    meta: [
      { title: "Wholesale Sportswear for Gyms & Academies | Uzas Sports" },
      {
        name: "description",
        content:
          "Wholesale manufacturing for gyms, academies and clubs — custom team branding, low MOQs, sample orders and 2–4 week turnaround direct from our Sialkot factory.",
      },
      { property: "og:title", content: "For Gyms & Academies — Wholesale by Uzas Sports" },
      {
        property: "og:description",
        content:
          "Custom team kit programmes for gyms and academies: MOQs, branding process, turnaround and sample ordering.",
      },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "/wholesale" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "canonical", href: "/wholesale" }],
  }),
  component: WholesalePage,
});

const STEPS = [
  {
    step: "01",
    title: "Send your brief",
    desc: "Logo files, colours, roster size and the product lines you need. No artwork? Our design team drafts it.",
  },
  {
    step: "02",
    title: "Digital proofs",
    desc: "You get flat and 3D proofs within 48–72 hours, revised until the kit is exactly right.",
  },
  {
    step: "03",
    title: "Sample run",
    desc: "Approve a physical sample before bulk. Fit, fabric and print checked in your own gym.",
  },
  {
    step: "04",
    title: "Bulk production",
    desc: "Cut, printed, stitched and QA'd in-house, then shipped door-to-door worldwide.",
  },
];

const FACTS = [
  { k: "MOQ", v: "10–50 units", d: "Depending on line — sublimated kit starts at 10, gloves at 50." },
  { k: "Sampling", v: "1 piece", d: "Single pre-production samples available on every product line." },
  { k: "Turnaround", v: "2–4 weeks", d: "From approved artwork to shipment, bulk orders included." },
  { k: "Re-orders", v: "Patterns kept", d: "Your specs stay on file — repeat runs match the first batch." },
];

function WholesalePage() {
  const [form, setForm] = useState({
    business_name: "",
    contact_name: "",
    email: "",
    phone: "",
    product_interest: CATEGORIES[0]!.name,
    estimated_quantity: "",
    message: "",
  });
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState<string | null>(null);

  function set(key: keyof typeof form, value: string) {
    setForm((f) => ({ ...f, [key]: value }));
  }

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (submitting) return;
    setSubmitting(true);
    setError(null);
    const { error: insertError } = await supabase.from("wholesale_inquiries").insert({
      business_name: form.business_name,
      contact_name: form.contact_name,
      email: form.email,
      phone: form.phone || null,
      product_interest: form.product_interest,
      estimated_quantity: form.estimated_quantity || null,
      message: form.message || null,
    });
    setSubmitting(false);
    if (insertError) setError(insertError.message);
    else setSubmitted(true);
  }

  const field =
    "w-full border border-bone/15 bg-background px-4 py-3 text-sm text-bone placeholder:text-smoke/60 focus:border-crimson focus:outline-none";
  const label = "mb-2 block font-mono text-[11px] uppercase tracking-[0.2em] text-smoke";

  return (
    <div className="min-h-screen bg-background font-body">
      <SiteHeader />

      <section className="border-b border-bone/10 bg-background">
        <div className="mx-auto max-w-7xl px-6 py-20 md:py-28">
          <Reveal>
            <p className="mb-5 font-mono text-[11px] uppercase tracking-[0.3em] text-crimson">
              Wholesale · B2B · Est. 2005
            </p>
          </Reveal>
          <Reveal delay={80}>
            <h1 className="max-w-[18ch] font-display text-[clamp(2.75rem,8vw,7rem)] leading-[0.85] tracking-tight text-bone">
              KIT YOUR GYM
              <br />
              <span className="text-crimson">LIKE A PRO TEAM</span>
            </h1>
          </Reveal>
          <Reveal delay={160}>
            <p className="mt-7 max-w-[58ch] text-pretty text-base text-bone/70 md:text-lg">
              We supply gyms, academies, clubs and resellers direct from the
              factory floor in Sialkot — no trading house, no agency markup.
              Your uniforms, rash guards, gloves, patches and merch under one
              production roof.
            </p>
          </Reveal>
          <Reveal delay={240}>
            <div className="mt-10 flex flex-wrap gap-4">
              <a
                href="#inquiry"
                className="bg-crimson px-8 py-4 text-sm font-semibold uppercase tracking-wider text-primary-foreground transition-colors hover:bg-bone"
              >
                Start a wholesale inquiry
              </a>
              <Link
                to="/catalogues"
                className="border border-bone/30 px-8 py-4 text-sm font-semibold uppercase tracking-wider text-bone transition-colors hover:border-bone"
              >
                Browse catalogues
              </Link>
            </div>
          </Reveal>
        </div>
      </section>

      {/* FACTS */}
      <section className="border-b border-bone/10 bg-coal py-16">
        <div className="mx-auto grid max-w-7xl grid-cols-1 gap-px bg-bone/10 px-0 sm:grid-cols-2 lg:grid-cols-4">
          {FACTS.map((f, i) => (
            <Reveal key={f.k} delay={i * 80}>
              <div className="h-full bg-coal p-7">
                <p className="font-mono text-[11px] uppercase tracking-[0.25em] text-crimson">{f.k}</p>
                <p className="mt-3 font-display text-3xl tracking-tight text-bone">{f.v}</p>
                <p className="mt-2 text-sm text-smoke">{f.d}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* PROCESS */}
      <section className="bg-background py-20">
        <div className="mx-auto max-w-7xl px-6">
          <Reveal>
            <p className="mb-3 font-mono text-[11px] uppercase tracking-[0.3em] text-crimson">
              Custom team branding process
            </p>
            <h2 className="max-w-[18ch] font-display text-4xl leading-[0.95] tracking-tight text-bone md:text-5xl">
              FROM LOGO TO LOADED CONTAINER
            </h2>
          </Reveal>
          <div className="mt-10 grid grid-cols-1 gap-px bg-bone/10 md:grid-cols-4">
            {STEPS.map((s, i) => (
              <Reveal key={s.step} delay={i * 90}>
                <div className="h-full bg-background p-7 transition-colors hover:bg-coal">
                  <span className="font-display text-5xl text-crimson">{s.step}</span>
                  <h3 className="mt-4 text-lg font-semibold text-bone">{s.title}</h3>
                  <p className="mt-2 text-sm text-smoke">{s.desc}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* FORM */}
      <section id="inquiry" className="border-t border-bone/10 bg-coal py-20">
        <div className="mx-auto grid max-w-7xl gap-12 px-6 lg:grid-cols-[1fr_1.1fr]">
          <Reveal>
            <div>
              <p className="mb-3 font-mono text-[11px] uppercase tracking-[0.3em] text-crimson">
                Wholesale inquiry
              </p>
              <h2 className="max-w-[16ch] font-display text-4xl leading-[0.95] tracking-tight text-bone md:text-5xl">
                TELL US ABOUT YOUR GYM
              </h2>
              <p className="mt-5 max-w-[46ch] text-sm text-smoke">
                One form, straight to production planning. We reply with pricing
                tiers, MOQs and a realistic delivery date — usually within one
                business day.
              </p>
            </div>
          </Reveal>

          <Reveal delay={100}>
            {submitted ? (
              <div className="border border-crimson/40 bg-background p-10">
                <p className="font-display text-3xl tracking-tight text-bone">
                  INQUIRY RECEIVED.
                </p>
                <p className="mt-3 text-sm text-smoke">
                  Thanks — our wholesale team will be in touch by email shortly.
                </p>
              </div>
            ) : (
              <form onSubmit={onSubmit} className="grid gap-5 border border-bone/10 bg-background p-8 sm:grid-cols-2">
                <div>
                  <label className={label} htmlFor="business_name">Business / gym name *</label>
                  <input id="business_name" required className={field} value={form.business_name} onChange={(e) => set("business_name", e.target.value)} />
                </div>
                <div>
                  <label className={label} htmlFor="contact_name">Contact name *</label>
                  <input id="contact_name" required className={field} value={form.contact_name} onChange={(e) => set("contact_name", e.target.value)} />
                </div>
                <div>
                  <label className={label} htmlFor="email">Email *</label>
                  <input id="email" type="email" required className={field} value={form.email} onChange={(e) => set("email", e.target.value)} />
                </div>
                <div>
                  <label className={label} htmlFor="phone">Phone / WhatsApp</label>
                  <input id="phone" className={field} value={form.phone} onChange={(e) => set("phone", e.target.value)} />
                </div>
                <div>
                  <label className={label} htmlFor="product_interest">Product interest *</label>
                  <select id="product_interest" className={field} value={form.product_interest} onChange={(e) => set("product_interest", e.target.value)}>
                    {CATEGORIES.map((c) => (
                      <option key={c.slug} value={c.name}>{c.name}</option>
                    ))}
                    <option value="Multiple lines">Multiple lines</option>
                  </select>
                </div>
                <div>
                  <label className={label} htmlFor="estimated_quantity">Estimated quantity</label>
                  <input id="estimated_quantity" placeholder="e.g. 60 rash guards + 40 tees" className={field} value={form.estimated_quantity} onChange={(e) => set("estimated_quantity", e.target.value)} />
                </div>
                <div className="sm:col-span-2">
                  <label className={label} htmlFor="message">Anything else?</label>
                  <textarea id="message" rows={4} className={field} value={form.message} onChange={(e) => set("message", e.target.value)} />
                </div>
                {error && (
                  <p className="sm:col-span-2 border border-destructive/40 bg-destructive/10 px-4 py-3 text-sm text-bone">{error}</p>
                )}
                <button
                  type="submit"
                  disabled={submitting}
                  className="sm:col-span-2 bg-crimson px-8 py-4 text-sm font-semibold uppercase tracking-wider text-primary-foreground transition-colors hover:bg-bone disabled:opacity-40"
                >
                  {submitting ? "Sending…" : "Send wholesale inquiry"}
                </button>
              </form>
            )}
          </Reveal>
        </div>
      </section>

      <SiteFooter />
    </div>
  );
}
