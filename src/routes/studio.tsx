import { createFileRoute, Link } from "@tanstack/react-router";
import { useServerFn } from "@tanstack/react-start";
import { useRef, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { generateMockup } from "@/lib/mockup.functions";
import { SiteFooter, SiteHeader } from "@/components/site-chrome";
import { Reveal } from "@/components/Reveal";
import blankShorts from "@/assets/blank-shorts.jpg";
import blankRashguard from "@/assets/blank-rashguard.jpg";
import blankJersey from "@/assets/blank-jersey.jpg";

export const Route = createFileRoute("/studio")({
  head: () => ({
    meta: [
      { title: "AI Mockup Studio — Uzas Sports" },
      {
        name: "description",
        content:
          "Upload your design and see an AI-generated mockup on real Uzas Sports gear — fight shorts, rash guards and team jerseys. Get an instant quote on any quantity.",
      },
      { property: "og:title", content: "AI Mockup Studio — Uzas Sports" },
      {
        property: "og:description",
        content:
          "Upload your design, preview it on premium martial arts gear, and request a production quote.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: StudioPage,
});

const PRODUCTS = [
  { id: "MMA fight shorts", label: "Fight Shorts", image: blankShorts },
  { id: "long-sleeve rash guard", label: "Rash Guard", image: blankRashguard },
  { id: "sports team jersey", label: "Team Jersey", image: blankJersey },
] as const;

type ProductId = (typeof PRODUCTS)[number]["id"];

function fileToDataUrl(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
}

async function urlToDataUrl(url: string): Promise<string> {
  const blob = await (await fetch(url)).blob();
  return fileToDataUrl(new File([blob], "base.jpg", { type: blob.type }));
}

function StudioPage() {
  const callGenerate = useServerFn(generateMockup);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [product, setProduct] = useState<ProductId>(PRODUCTS[1].id);
  const [designUrl, setDesignUrl] = useState<string | null>(null);
  const [designNotes, setDesignNotes] = useState("");
  const [mockup, setMockup] = useState<string | null>(null);
  const [generating, setGenerating] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [quantity, setQuantity] = useState("");
  const [notes, setNotes] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  const selected = PRODUCTS.find((p) => p.id === product) ?? PRODUCTS[1];

  async function onDesignPicked(file: File | undefined) {
    if (!file) return;
    setDesignUrl(await fileToDataUrl(file));
    setMockup(null);
  }

  async function onGenerate() {
    if (!designUrl || generating) return;
    setGenerating(true);
    setError(null);
    try {
      const baseDataUrl = await urlToDataUrl(selected.image);
      const result = await callGenerate({
        data: {
          product: selected.id,
          designDataUrl: designUrl,
          baseDataUrl,
          notes: designNotes || undefined,
        },
      });
      setMockup(result.image);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Generation failed");
    } finally {
      setGenerating(false);
    }
  }

  async function onSubmitQuote(e: React.FormEvent) {
    e.preventDefault();
    if (submitting) return;
    setSubmitting(true);
    setSubmitError(null);
    const { error: insertError } = await supabase.from("quote_requests").insert({
      name,
      email,
      phone: phone || null,
      product: selected.id,
      quantity: quantity ? Number(quantity) : null,
      notes: notes || null,
      mockup_summary: mockup
        ? `AI mockup generated for ${selected.id}${designNotes ? ` — "${designNotes}"` : ""}`
        : null,
    });
    setSubmitting(false);
    if (insertError) {
      setSubmitError(insertError.message);
    } else {
      setSubmitted(true);
    }
  }

  return (
    <div className="min-h-screen bg-background font-body">
      <SiteHeader />

      {/* Intro */}
      <section className="border-b border-bone/10 bg-background">
        <div className="mx-auto max-w-7xl px-6 py-16 md:py-20">
          <p className="mb-4 font-mono text-[11px] uppercase tracking-[0.3em] text-crimson">
            AI Mockup Studio
          </p>
          <h1 className="font-display text-5xl leading-[0.9] tracking-tight text-bone md:text-7xl">
            DROP YOUR DESIGN.
            <br />
            <span className="text-crimson">SEE IT ON GEAR.</span>
          </h1>
          <p className="mt-6 max-w-[52ch] text-pretty text-base text-smoke md:text-lg">
            Upload your artwork, pick a garment, and our AI renders a production
            mockup in seconds. Like what you see? Send it straight to a quote —
            any quantity, made fully in-house.
          </p>
        </div>
      </section>

      {/* Studio */}
      <section className="bg-coal py-16 md:py-24">
        <div className="mx-auto grid max-w-7xl gap-12 px-6 lg:grid-cols-2">
          {/* Left: controls */}
          <div>
            <Reveal>
              <p className="mb-4 font-mono text-[11px] uppercase tracking-[0.3em] text-crimson">
                01 — Pick your garment
              </p>
              <div className="grid grid-cols-3 gap-3">
                {PRODUCTS.map((p) => (
                  <button
                    key={p.id}
                    type="button"
                    onClick={() => {
                      setProduct(p.id);
                      setMockup(null);
                    }}
                    className={`group border text-left transition-colors ${
                      product === p.id
                        ? "border-crimson"
                        : "border-bone/10 hover:border-bone/30"
                    }`}
                  >
                    <img
                      src={p.image}
                      alt={p.label}
                      loading="lazy"
                      width={800}
                      height={1000}
                      className="aspect-[4/5] w-full object-cover"
                    />
                    <span className="block px-3 py-2 font-mono text-[10px] uppercase tracking-[0.15em] text-bone">
                      {p.label}
                    </span>
                  </button>
                ))}
              </div>
            </Reveal>

            <Reveal delay={100}>
              <p className="mt-10 mb-4 font-mono text-[11px] uppercase tracking-[0.3em] text-crimson">
                02 — Upload your artwork
              </p>
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                className="hidden"
                onChange={(e) => onDesignPicked(e.target.files?.[0])}
              />
              <button
                type="button"
                onClick={() => fileInputRef.current?.click()}
                className="flex w-full items-center justify-center gap-4 border border-dashed border-bone/25 px-6 py-8 transition-colors hover:border-crimson"
              >
                {designUrl ? (
                  <img
                    src={designUrl}
                    alt="Your uploaded artwork"
                    className="h-20 w-20 object-contain"
                  />
                ) : (
                  <span className="font-display text-3xl text-crimson">+</span>
                )}
                <span className="font-mono text-[11px] uppercase tracking-[0.2em] text-smoke">
                  {designUrl ? "Change artwork" : "Click to upload your design (PNG, JPG)"}
                </span>
              </button>
              <textarea
                value={designNotes}
                onChange={(e) => setDesignNotes(e.target.value)}
                placeholder="Optional notes — e.g. keep the logo centered on the chest, wrap the pattern around the sleeves…"
                rows={3}
                className="mt-4 w-full border border-bone/15 bg-background px-4 py-3 text-sm text-bone placeholder:text-smoke/60 focus:border-crimson focus:outline-none"
              />
            </Reveal>

            <Reveal delay={180}>
              <p className="mt-10 mb-4 font-mono text-[11px] uppercase tracking-[0.3em] text-crimson">
                03 — Generate
              </p>
              <button
                type="button"
                onClick={onGenerate}
                disabled={!designUrl || generating}
                className="w-full bg-crimson px-8 py-4 text-sm font-semibold uppercase tracking-wider text-primary-foreground transition-colors hover:bg-bone disabled:cursor-not-allowed disabled:opacity-40"
              >
                {generating ? "Rendering your mockup…" : "Generate AI mockup"}
              </button>
              {error && (
                <p className="mt-4 border border-destructive/40 bg-destructive/10 px-4 py-3 text-sm text-bone">
                  {error}
                </p>
              )}
            </Reveal>
          </div>

          {/* Right: result */}
          <Reveal delay={120}>
            <div className="sticky top-24">
              <div className="relative border border-bone/10 bg-ash">
                {generating && (
                  <div className="absolute inset-0 z-10 grid place-items-center bg-background/80">
                    <div className="text-center">
                      <div className="mx-auto mb-4 h-10 w-10 animate-pulse-slow border-2 border-crimson" />
                      <p className="font-mono text-[11px] uppercase tracking-[0.25em] text-smoke">
                        AI is sublimating your design…
                      </p>
                    </div>
                  </div>
                )}
                <img
                  src={mockup ?? selected.image}
                  alt={
                    mockup
                      ? `AI mockup of your design on ${selected.label}`
                      : `Blank ${selected.label}`
                  }
                  width={800}
                  height={1000}
                  className="aspect-[4/5] w-full object-cover"
                />
                <span className="absolute bottom-4 left-4 bg-background/80 px-3 py-1 font-mono text-[10px] uppercase tracking-[0.2em] text-bone backdrop-blur">
                  {mockup ? "Your AI mockup" : `Blank — ${selected.label}`}
                </span>
              </div>
              {mockup && (
                <a
                  href={mockup}
                  download={`uzas-mockup-${selected.label.toLowerCase().replace(/\s+/g, "-")}.png`}
                  className="mt-4 inline-block border border-bone/25 px-6 py-3 font-mono text-[11px] uppercase tracking-[0.2em] text-bone transition-colors hover:border-crimson hover:text-crimson"
                >
                  Download mockup
                </a>
              )}
            </div>
          </Reveal>
        </div>
      </section>

      {/* Quote form */}
      <section className="border-t border-bone/10 bg-background py-16 md:py-24">
        <div className="mx-auto max-w-3xl px-6">
          <Reveal>
            <p className="mb-3 font-mono text-[11px] uppercase tracking-[0.3em] text-crimson">
              Final step — get your price
            </p>
            <h2 className="font-display text-4xl leading-[0.9] tracking-tight text-bone md:text-6xl">
              REQUEST A QUOTE
            </h2>
            <p className="mt-4 max-w-[50ch] text-pretty text-smoke">
              Tell us the quantity and we'll come back with a production quote —
              from a single piece to a full team run.
            </p>
          </Reveal>

          {submitted ? (
            <Reveal delay={100}>
              <div className="mt-10 border border-crimson/40 bg-crimson/10 px-8 py-10 text-center">
                <p className="font-display text-3xl uppercase tracking-tight text-bone">
                  Quote request received
                </p>
                <p className="mt-3 text-sm text-smoke">
                  Our production team will email you at{" "}
                  <span className="text-bone">{email}</span> with pricing and a
                  sample timeline. Talk soon.
                </p>
                <Link
                  to="/"
                  className="mt-6 inline-block border border-bone/25 px-6 py-3 font-mono text-[11px] uppercase tracking-[0.2em] text-bone transition-colors hover:border-crimson"
                >
                  Back to home
                </Link>
              </div>
            </Reveal>
          ) : (
            <Reveal delay={100}>
              <form onSubmit={onSubmitQuote} className="mt-10 grid gap-5">
                <div className="grid gap-5 md:grid-cols-2">
                  <label className="block">
                    <span className="mb-2 block font-mono text-[10px] uppercase tracking-[0.2em] text-smoke">
                      Name *
                    </span>
                    <input
                      required
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="w-full border border-bone/15 bg-coal px-4 py-3 text-sm text-bone focus:border-crimson focus:outline-none"
                      placeholder="Your name"
                    />
                  </label>
                  <label className="block">
                    <span className="mb-2 block font-mono text-[10px] uppercase tracking-[0.2em] text-smoke">
                      Email *
                    </span>
                    <input
                      required
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full border border-bone/15 bg-coal px-4 py-3 text-sm text-bone focus:border-crimson focus:outline-none"
                      placeholder="you@team.com"
                    />
                  </label>
                </div>
                <div className="grid gap-5 md:grid-cols-3">
                  <label className="block">
                    <span className="mb-2 block font-mono text-[10px] uppercase tracking-[0.2em] text-smoke">
                      Phone / WhatsApp
                    </span>
                    <input
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      className="w-full border border-bone/15 bg-coal px-4 py-3 text-sm text-bone focus:border-crimson focus:outline-none"
                      placeholder="+92 …"
                    />
                  </label>
                  <label className="block">
                    <span className="mb-2 block font-mono text-[10px] uppercase tracking-[0.2em] text-smoke">
                      Product
                    </span>
                    <select
                      value={product}
                      onChange={(e) => setProduct(e.target.value as ProductId)}
                      className="w-full border border-bone/15 bg-coal px-4 py-3 text-sm text-bone focus:border-crimson focus:outline-none"
                    >
                      {PRODUCTS.map((p) => (
                        <option key={p.id} value={p.id}>
                          {p.label}
                        </option>
                      ))}
                    </select>
                  </label>
                  <label className="block">
                    <span className="mb-2 block font-mono text-[10px] uppercase tracking-[0.2em] text-smoke">
                      Quantity
                    </span>
                    <input
                      type="number"
                      min={1}
                      value={quantity}
                      onChange={(e) => setQuantity(e.target.value)}
                      className="w-full border border-bone/15 bg-coal px-4 py-3 text-sm text-bone focus:border-crimson focus:outline-none"
                      placeholder="e.g. 25"
                    />
                  </label>
                </div>
                <label className="block">
                  <span className="mb-2 block font-mono text-[10px] uppercase tracking-[0.2em] text-smoke">
                    Notes
                  </span>
                  <textarea
                    rows={4}
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                    className="w-full border border-bone/15 bg-coal px-4 py-3 text-sm text-bone focus:border-crimson focus:outline-none"
                    placeholder="Sizes, fabric preferences, deadline, delivery country…"
                  />
                </label>
                {submitError && (
                  <p className="border border-destructive/40 bg-destructive/10 px-4 py-3 text-sm text-bone">
                    {submitError}
                  </p>
                )}
                <button
                  type="submit"
                  disabled={submitting}
                  className="bg-crimson px-8 py-4 text-sm font-semibold uppercase tracking-wider text-primary-foreground transition-colors hover:bg-bone disabled:opacity-50"
                >
                  {submitting ? "Sending…" : "Send quote request"}
                </button>
              </form>
            </Reveal>
          )}
        </div>
      </section>

      <SiteFooter />
    </div>
  );
}
