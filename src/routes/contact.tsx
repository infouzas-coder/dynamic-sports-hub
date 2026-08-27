import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { SiteFooter, SiteHeader } from "@/components/site-chrome";
import { Reveal } from "@/components/Reveal";
import { SOCIALS } from "@/lib/site-data";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact Uzas Sports — Sportswear Manufacturer in Sialkot" },
      {
        name: "description",
        content:
          "Contact Uzas Sports for wholesale or general inquiries. Sportswear, combat sports gear, gloves and patches manufactured in Sialkot, Pakistan since 2005.",
      },
      { property: "og:title", content: "Contact Uzas Sports" },
      {
        property: "og:description",
        content: "Wholesale inquiries and general questions — direct to our Sialkot factory team.",
      },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "/contact" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "canonical", href: "/contact" }],
  }),
  component: ContactPage,
});

function ContactPage() {
  const [form, setForm] = useState({ name: "", email: "", phone: "", subject: "", message: "" });
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
    const { error: insertError } = await supabase.from("contact_messages").insert({
      name: form.name,
      email: form.email,
      phone: form.phone || null,
      subject: form.subject || null,
      message: form.message,
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

      <section className="border-b border-bone/10 py-20">
        <div className="mx-auto max-w-7xl px-6">
          <Reveal>
            <p className="mb-5 font-mono text-[11px] uppercase tracking-[0.3em] text-crimson">
              Sialkot, Pakistan · Est. 2005
            </p>
            <h1 className="font-display text-[clamp(2.75rem,8vw,6rem)] leading-[0.85] tracking-tight text-bone">
              GET IN TOUCH
            </h1>
            <p className="mt-6 max-w-[54ch] text-pretty text-base text-smoke md:text-lg">
              Two routes in: a dedicated wholesale desk for gyms, academies,
              clubs and resellers, and a general line for everything else.
            </p>
          </Reveal>
        </div>
      </section>

      {/* ROUTING */}
      <section className="bg-coal py-16">
        <div className="mx-auto grid max-w-7xl gap-px bg-bone/10 px-0 md:grid-cols-2">
          <Reveal>
            <div className="h-full bg-coal p-10">
              <p className="font-mono text-[11px] uppercase tracking-[0.25em] text-crimson">
                Option A
              </p>
              <h2 className="mt-3 font-display text-3xl tracking-tight text-bone">
                WHOLESALE INQUIRY
              </h2>
              <p className="mt-3 max-w-[40ch] text-sm text-smoke">
                Bulk orders, team kits, private label and repeat programmes. Use
                the dedicated wholesale form so we can quote MOQs and tiers
                straight away.
              </p>
              <Link
                to="/wholesale"
                className="mt-6 inline-block bg-crimson px-7 py-3.5 text-sm font-semibold uppercase tracking-wider text-primary-foreground transition-colors hover:bg-bone"
              >
                Go to wholesale form
              </Link>
            </div>
          </Reveal>
          <Reveal delay={100}>
            <div className="h-full bg-coal p-10">
              <p className="font-mono text-[11px] uppercase tracking-[0.25em] text-crimson">
                Option B
              </p>
              <h2 className="mt-3 font-display text-3xl tracking-tight text-bone">
                GENERAL INQUIRY
              </h2>
              <p className="mt-3 max-w-[40ch] text-sm text-smoke">
                Product questions, samples, shipping, partnerships or anything
                else — send it below and we'll route it internally.
              </p>
              <a
                href="#general"
                className="mt-6 inline-block border border-bone/30 px-7 py-3.5 text-sm font-semibold uppercase tracking-wider text-bone transition-colors hover:border-crimson hover:text-crimson"
              >
                Use general form
              </a>
            </div>
          </Reveal>
        </div>
      </section>

      {/* GENERAL FORM */}
      <section id="general" className="border-t border-bone/10 bg-background py-20">
        <div className="mx-auto grid max-w-7xl gap-12 px-6 lg:grid-cols-[1fr_1.1fr]">
          <Reveal>
            <div>
              <p className="mb-3 font-mono text-[11px] uppercase tracking-[0.3em] text-crimson">
                General inquiry
              </p>
              <h2 className="font-display text-4xl leading-[0.95] tracking-tight text-bone md:text-5xl">
                SEND US A MESSAGE
              </h2>
              <div className="mt-8 space-y-3 text-sm text-smoke">
                <p>
                  Email:{" "}
                  <a href="mailto:info@uzassports.com" className="text-bone hover:text-crimson">
                    info@uzassports.com
                  </a>
                </p>
                <p>Factory: Sialkot, Punjab, Pakistan</p>
                <div className="flex flex-wrap gap-4 pt-2">
                  {SOCIALS.map((s) => (
                    <a
                      key={s.label}
                      href={s.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="font-mono text-[11px] uppercase tracking-[0.2em] text-smoke hover:text-crimson"
                    >
                      {s.label} ↗
                    </a>
                  ))}
                </div>
              </div>
            </div>
          </Reveal>

          <Reveal delay={100}>
            {submitted ? (
              <div className="border border-crimson/40 bg-coal p-10">
                <p className="font-display text-3xl tracking-tight text-bone">MESSAGE SENT.</p>
                <p className="mt-3 text-sm text-smoke">We'll reply to your email shortly.</p>
              </div>
            ) : (
              <form onSubmit={onSubmit} className="grid gap-5 border border-bone/10 bg-coal p-8 sm:grid-cols-2">
                <div>
                  <label className={label} htmlFor="name">Name *</label>
                  <input id="name" required className={field} value={form.name} onChange={(e) => set("name", e.target.value)} />
                </div>
                <div>
                  <label className={label} htmlFor="email">Email *</label>
                  <input id="email" type="email" required className={field} value={form.email} onChange={(e) => set("email", e.target.value)} />
                </div>
                <div>
                  <label className={label} htmlFor="phone">Phone</label>
                  <input id="phone" className={field} value={form.phone} onChange={(e) => set("phone", e.target.value)} />
                </div>
                <div>
                  <label className={label} htmlFor="subject">Subject</label>
                  <input id="subject" className={field} value={form.subject} onChange={(e) => set("subject", e.target.value)} />
                </div>
                <div className="sm:col-span-2">
                  <label className={label} htmlFor="message">Message *</label>
                  <textarea id="message" rows={5} required className={field} value={form.message} onChange={(e) => set("message", e.target.value)} />
                </div>
                {error && (
                  <p className="sm:col-span-2 border border-destructive/40 bg-destructive/10 px-4 py-3 text-sm text-bone">{error}</p>
                )}
                <button
                  type="submit"
                  disabled={submitting}
                  className="sm:col-span-2 bg-crimson px-8 py-4 text-sm font-semibold uppercase tracking-wider text-primary-foreground transition-colors hover:bg-bone disabled:opacity-40"
                >
                  {submitting ? "Sending…" : "Send message"}
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
