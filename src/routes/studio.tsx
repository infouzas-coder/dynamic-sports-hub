import { createFileRoute, Link } from "@tanstack/react-router";
import { absUrl } from "@/lib/seo";
import { useServerFn } from "@tanstack/react-start";
import { useEffect, useRef, useState } from "react";
import {
  CONCEPT_COLOURS,
  CONCEPT_PATTERNS,
  CONCEPT_STYLES,
  generateConcept,
  generateMockup,
} from "@/lib/mockup.functions";
import { submitQuote } from "@/lib/forms.functions";
import { RecaptchaNotice, useRecaptcha } from "@/components/Recaptcha";
import { SiteFooter, SiteHeader } from "@/components/site-chrome";
import { Reveal } from "@/components/Reveal";
import uzasLogo from "@/assets/uzas-logo.png";
import blankShorts from "@/assets/blank-shorts.jpg";
import blankRashguard from "@/assets/blank-rashguard.jpg";
import blankJersey from "@/assets/blank-jersey.jpg";
import maskShorts from "@/assets/blank-shorts-mask.png";
import maskRashguard from "@/assets/blank-rashguard-mask.png";
import maskJersey from "@/assets/blank-jersey-mask.png";

export const Route = createFileRoute("/studio")({
  head: () => ({
    meta: [
      { title: "AI Mockup Studio | Uzas Sports" },
      {
        name: "description",
        content:
          "Upload your design and see an AI-generated mockup on real Uzas Sports gear: fight shorts, rash guards and team jerseys. Get an instant quote on any quantity.",
      },
      { property: "og:title", content: "AI Mockup Studio | Uzas Sports" },
      { property: "og:url", content: absUrl("/studio") },
      {
        property: "og:description",
        content:
          "Upload your design, preview it on premium martial arts gear, and request a production quote.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "canonical", href: absUrl("/studio") }],
  }),
  component: StudioPage,
});

const PRODUCTS = [
  { id: "MMA fight shorts", label: "Fight Shorts", image: blankShorts, mask: maskShorts },
  { id: "long-sleeve rash guard", label: "Rash Guard", image: blankRashguard, mask: maskRashguard },
  { id: "sports team jersey", label: "Team Jersey", image: blankJersey, mask: maskJersey },
] as const;

type ProductId = (typeof PRODUCTS)[number]["id"];

// Shrink an image to a compact JPEG so it always fits as an email attachment
async function toEmailJpeg(dataUrl: string, maxSide = 1200): Promise<string> {
  try {
    const img = new Image();
    img.src = dataUrl;
    await img.decode();
    const scale = Math.min(1, maxSide / Math.max(img.width, img.height));
    const c = document.createElement("canvas");
    c.width = Math.round(img.width * scale);
    c.height = Math.round(img.height * scale);
    const ctx = c.getContext("2d");
    if (!ctx) return dataUrl;
    ctx.fillStyle = "#ffffff";
    ctx.fillRect(0, 0, c.width, c.height);
    ctx.drawImage(img, 0, 0, c.width, c.height);
    return c.toDataURL("image/jpeg", 0.86);
  } catch {
    return dataUrl;
  }
}

function fileToDataUrl(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
}

// ---- Instant in-browser preview (no AI needed) ----
type Spot = { x: number; y: number; w: number; rot?: number };
// Logo positions as fractions of each blank garment photo (800x1000)
const SPOTS: Record<string, Record<string, Spot>> = {
  "sports team jersey": {
    Chest: { x: 0.5, y: 0.36, w: 0.3 },
    "Left chest": { x: 0.63, y: 0.27, w: 0.12 },
    "Left sleeve": { x: 0.13, y: 0.33, w: 0.09, rot: -18 },
    "Right sleeve": { x: 0.87, y: 0.33, w: 0.09, rot: 18 },
    "Bottom left": { x: 0.32, y: 0.8, w: 0.12 },
    "Bottom right": { x: 0.68, y: 0.8, w: 0.12 },
  },
  "long-sleeve rash guard": {
    Chest: { x: 0.5, y: 0.33, w: 0.26 },
    "Left chest": { x: 0.6, y: 0.26, w: 0.1 },
    "Left sleeve": { x: 0.235, y: 0.42, w: 0.07, rot: 6 },
    "Right sleeve": { x: 0.765, y: 0.42, w: 0.07, rot: -6 },
    "Bottom left": { x: 0.38, y: 0.74, w: 0.1 },
    "Bottom right": { x: 0.62, y: 0.74, w: 0.1 },
  },
  "MMA fight shorts": {
    Waistband: { x: 0.5, y: 0.36, w: 0.1 },
    "Left leg": { x: 0.35, y: 0.52, w: 0.13, rot: -4 },
    "Right leg": { x: 0.66, y: 0.52, w: 0.13, rot: 4 },
    "Bottom left": { x: 0.28, y: 0.6, w: 0.07, rot: -8 },
    "Bottom right": { x: 0.73, y: 0.6, w: 0.07, rot: 8 },
  },
};
const COLOURS: Array<[name: string, rgb: [number, number, number]]> = [
  ["White", [255, 255, 255]],
  ["Black", [26, 26, 28]],
  ["Navy", [22, 34, 72]],
  ["Royal blue", [24, 72, 170]],
  ["Red", [178, 28, 34]],
  ["Gold", [227, 191, 41]],
  ["Green", [18, 98, 52]],
  ["Grey", [120, 122, 126]],
];

const SWATCH: Record<string, string> = {
  White: "#ffffff",
  Black: "#1a1a1c",
  Navy: "#162248",
  "Royal blue": "#1848aa",
  "Sky blue": "#5aaee6",
  Red: "#b21c22",
  Maroon: "#6b1a24",
  Orange: "#e8701c",
  Gold: "#e3bf29",
  Yellow: "#f2d230",
  Green: "#126234",
  Purple: "#5b2a86",
  Pink: "#e46aa0",
  Grey: "#787a7e",
  Silver: "#c0c2c6",
};

const SIMPLE_COLOURS = [
  "Black",
  "White",
  "Navy",
  "Royal blue",
  "Red",
  "Gold",
  "Green",
  "Purple",
] as const;
const SIMPLE_LOOKS = [
  ["Stripes", "Diagonal stripes"],
  ["Geometric", "Geometric shapes"],
  ["Fade", "Gradient fade"],
  ["Camo", "Camouflage"],
  ["Waves", "Wave lines"],
  ["Clean", "Solid with contrast side panels"],
] as const;

async function renderPreview(
  baseUrl: string,
  maskUrl: string,
  artUrl: string | null,
  rgb: [number, number, number],
  spots: Spot[],
): Promise<string> {
  const load = (src: string) =>
    new Promise<HTMLImageElement>((resolve, reject) => {
      const img = new Image();
      img.onload = () => resolve(img);
      img.onerror = reject;
      img.src = src;
    });
  const base = await load(baseUrl);
  const canvas = document.createElement("canvas");
  canvas.width = base.naturalWidth;
  canvas.height = base.naturalHeight;
  const ctx = canvas.getContext("2d")!;
  ctx.drawImage(base, 0, 0);

  // Dye the garment: the blank is white on a dark background, so bright pixels are fabric.
  // Keep the fabric's shading (folds, seams) by scaling the chosen colour by brightness.
  const dark = rgb[0] * 0.3 + rgb[1] * 0.59 + rgb[2] * 0.11 < 110;
  if (rgb.some((c) => c !== 255)) {
    const img = ctx.getImageData(0, 0, canvas.width, canvas.height);
    const d = img.data;
    // Precomputed garment mask (white = fabric) so shadows in folds get dyed too
    const maskImg = await load(maskUrl);
    const mc = document.createElement("canvas");
    mc.width = canvas.width;
    mc.height = canvas.height;
    const mctx = mc.getContext("2d")!;
    mctx.drawImage(maskImg, 0, 0, canvas.width, canvas.height);
    const md = mctx.getImageData(0, 0, canvas.width, canvas.height).data;
    for (let i = 0; i < d.length; i += 4) {
      const lum = (d[i]! * 0.3 + d[i + 1]! * 0.59 + d[i + 2]! * 0.11) / 255;
      const m = md[i]! / 255; // fabric mask
      if (m === 0) continue;
      const shade = Math.min(1.05, lum / 0.93);
      for (let c = 0; c < 3; c++) {
        const dyed = dark
          ? rgb[c]! * (0.55 + 0.6 * shade) + 34 * Math.max(0, shade - 0.85)
          : rgb[c]! * shade;
        d[i + c] = d[i + c]! * (1 - m) + Math.min(255, dyed) * m;
      }
    }
    ctx.putImageData(img, 0, 0);
  }

  if (artUrl) {
    const art = await load(artUrl);
    for (const sp of spots) {
      const boxW = canvas.width * sp.w;
      const scale = boxW / Math.max(art.naturalWidth, art.naturalHeight * 0.9);
      const w = art.naturalWidth * scale;
      const h = art.naturalHeight * scale;
      ctx.save();
      ctx.translate(canvas.width * sp.x, canvas.height * sp.y);
      ctx.rotate(((sp.rot ?? 0) * Math.PI) / 180);
      // On light fabric "multiply" lets folds show through like a real print; on dark fabric draw normally
      ctx.globalCompositeOperation = dark ? "source-over" : "multiply";
      ctx.globalAlpha = 0.95;
      ctx.drawImage(art, -w / 2, -h / 2, w, h);
      ctx.restore();
    }
  }
  return canvas.toDataURL("image/jpeg", 0.9);
}

async function urlToDataUrl(url: string): Promise<string> {
  const blob = await (await fetch(url)).blob();
  return fileToDataUrl(new File([blob], "base.jpg", { type: blob.type }));
}

function StudioPage() {
  const callGenerate = useServerFn(generateMockup);
  const callConcept = useServerFn(generateConcept);
  const [mode, setMode] = useState<"upload" | "describe">("describe");
  const [concept, setConcept] = useState({
    primary: "Black" as (typeof CONCEPT_COLOURS)[number],
    secondary: "Gold" as (typeof CONCEPT_COLOURS)[number],
    accent: "" as (typeof CONCEPT_COLOURS)[number] | "",
    pattern: "Diagonal stripes" as (typeof CONCEPT_PATTERNS)[number],
    style: "Minimal" as (typeof CONCEPT_STYLES)[number],
    teamName: "",
    number: "",
    extra: "",
  });
  const setC = <K extends keyof typeof concept>(k: K, v: (typeof concept)[K]) =>
    setConcept((c) => ({ ...c, [k]: v }));
  const description = [
    `${concept.style} ${concept.pattern.toLowerCase()}`,
    `in ${[concept.primary, concept.secondary, concept.accent].filter(Boolean).join(", ").toLowerCase()}`,
    concept.teamName && `team name ${concept.teamName.toUpperCase()}`,
    concept.number && `number ${concept.number}`,
    concept.extra,
  ]
    .filter(Boolean)
    .join(", ");
  const [mockupKind, setMockupKind] = useState<"ai" | "preview" | "concept">("ai");
  const [colour, setColour] = useState(0);
  const [spots, setSpots] = useState<string[]>(["Chest", "Left leg"]);
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
  const getCaptchaToken = useRecaptcha();
  const sendQuote = useServerFn(submitQuote);

  const selected = PRODUCTS.find((p) => p.id === product) ?? PRODUCTS[1];

  const spotMap = SPOTS[product] ?? {};
  const activeSpots = spots.filter((n) => spotMap[n]);

  // Live preview in upload mode: re-render whenever the garment, colour, logo or positions change
  useEffect(() => {
    if (mode !== "upload") return;
    if (!designUrl && colour === 0) {
      setMockup(null);
      return;
    }
    let cancelled = false;
    renderPreview(
      selected.image,
      selected.mask,
      designUrl,
      COLOURS[colour]![1],
      activeSpots.map((n) => spotMap[n]!),
    )
      .then((url) => {
        if (!cancelled) {
          setMockup(url);
          setMockupKind("preview");
        }
      })
      .catch(() => {});
    return () => {
      cancelled = true;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [mode, product, designUrl, colour, spots.join("|")]);

  async function onDesignPicked(file: File | undefined) {
    if (!file) return;
    setDesignUrl(await fileToDataUrl(file));
    setMockup(null);
  }

  async function onGenerate() {
    if (generating) return;
    if (mode === "describe") return onConcept();
    if (!designUrl) return;
    setGenerating(true);
    setError(null);
    try {
      const baseDataUrl = await urlToDataUrl(selected.image);
      const result = await callGenerate({
        data: {
          product: selected.id,
          designDataUrl: designUrl,
          baseDataUrl,
          notes:
            [
              `Garment colour: ${COLOURS[colour]![0]}.`,
              activeSpots.length ? `Place the artwork at: ${activeSpots.join(", ")}.` : "",
              designNotes,
            ]
              .filter(Boolean)
              .join(" ") || undefined,
        },
      });
      setMockup(result.image);
      setMockupKind("ai");
    } catch (err) {
      const msg = err instanceof Error ? err.message : "";
      if (msg.includes("NO_GEMINI_KEY")) {
        // AI rendering not configured: the live preview already shows the design
        setMockupKind("preview");
      } else {
        setError(msg || "Generation failed");
      }
    } finally {
      setGenerating(false);
    }
  }

  async function onConcept() {
    setGenerating(true);
    setError(null);
    try {
      const garment =
        product === "MMA fight shorts"
          ? "shorts"
          : product === "long-sleeve rash guard"
            ? "rashguard"
            : "jersey";
      const result = await callConcept({
        data: {
          garment,
          primary: concept.primary,
          secondary: concept.secondary,
          pattern: concept.pattern,
          style: "Minimal",
          teamName: concept.teamName.trim() || undefined,
        },
      });
      setMockup(result.image);
      setMockupKind("concept");
    } catch (err) {
      const msg = err instanceof Error ? err.message : "";
      setError(
        msg.startsWith("[") || msg.startsWith("{")
          ? "Please check your design options and try again."
          : msg || "Generation failed",
      );
    } finally {
      setGenerating(false);
    }
  }

  async function onSubmitQuote(e: React.FormEvent) {
    e.preventDefault();
    if (submitting) return;
    setSubmitting(true);
    setSubmitError(null);
    try {
      const captchaToken = await getCaptchaToken("quote");
      const qty = quantity ? Math.round(Number(quantity)) : null;
      await sendQuote({
        data: {
          name,
          email,
          phone,
          product: selected.id,
          productLabel: selected.label,
          quantity: qty && qty > 0 ? qty : null,
          notes,
          designNotes: mode === "describe" ? `AI design brief: ${description}` : designNotes,
          mockupDataUrl: mockup ? await toEmailJpeg(mockup) : undefined,
          designDataUrl: designUrl ?? undefined,
          captchaToken,
        },
      });
      setSubmitted(true);
    } catch (err) {
      setSubmitError(
        err instanceof Error ? err.message : "Something went wrong. Please try again.",
      );
    } finally {
      setSubmitting(false);
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
            Upload your artwork, pick a garment, and our AI renders a production mockup in seconds.
            Like what you see? Send it straight to a quote for any quantity, made fully in-house.
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
                01. Pick your garment
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
                      product === p.id ? "border-crimson" : "border-bone/10 hover:border-bone/30"
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
                02. Choose your look
              </p>
              <div className="mb-4 grid grid-cols-2 border border-bone/15" role="tablist">
                {(
                  [
                    ["describe", "Design with AI"],
                    ["upload", "Use my logo"],
                  ] as const
                ).map(([m, label]) => (
                  <button
                    key={m}
                    type="button"
                    role="tab"
                    aria-selected={mode === m}
                    onClick={() => {
                      setMode(m);
                      setError(null);
                    }}
                    className={`px-4 py-3 font-mono text-[11px] uppercase tracking-[0.15em] transition-colors ${
                      mode === m
                        ? "bg-primary text-primary-foreground"
                        : "text-smoke hover:text-bone"
                    }`}
                  >
                    {label}
                  </button>
                ))}
              </div>
              {mode === "describe" ? (
                <div className="space-y-6">
                  {(
                    [
                      ["primary", "Main colour"],
                      ["secondary", "Second colour"],
                    ] as const
                  ).map(([k, label]) => (
                    <div key={k}>
                      <p className="mb-2 font-mono text-[10px] uppercase tracking-[0.2em] text-smoke">
                        {label}: <span className="text-bone">{concept[k]}</span>
                      </p>
                      <div className="flex flex-wrap gap-2">
                        {SIMPLE_COLOURS.map((c) => (
                          <button
                            key={c}
                            type="button"
                            title={c}
                            aria-label={`${label}: ${c}`}
                            aria-pressed={concept[k] === c}
                            onClick={() => setC(k, c)}
                            className={`h-10 w-10 border-2 transition ${concept[k] === c ? "scale-110 border-gold" : "border-bone/20 hover:border-bone/60"}`}
                            style={{ backgroundColor: SWATCH[c] }}
                          />
                        ))}
                      </div>
                    </div>
                  ))}
                  <div>
                    <p className="mb-2 font-mono text-[10px] uppercase tracking-[0.2em] text-smoke">
                      Look
                    </p>
                    <div className="grid grid-cols-3 gap-2">
                      {SIMPLE_LOOKS.map(([label, pattern]) => (
                        <button
                          key={label}
                          type="button"
                          aria-pressed={concept.pattern === pattern}
                          onClick={() => setC("pattern", pattern)}
                          className={`border px-3 py-3 font-mono text-[11px] uppercase tracking-[0.12em] transition-colors ${concept.pattern === pattern ? "border-gold bg-gold/15 text-gold" : "border-bone/20 text-smoke hover:text-bone"}`}
                        >
                          {label}
                        </button>
                      ))}
                    </div>
                  </div>
                  <label className="block">
                    <span className="mb-2 block font-mono text-[10px] uppercase tracking-[0.2em] text-smoke">
                      Team name (optional)
                    </span>
                    <input
                      value={concept.teamName}
                      maxLength={16}
                      onChange={(e) =>
                        setC("teamName", e.target.value.replace(/[^A-Za-z0-9 &'.-]/g, ""))
                      }
                      placeholder="e.g. TITANS"
                      className="w-full border border-bone/15 bg-background px-4 py-3 text-sm text-bone placeholder:text-smoke/60 focus:border-crimson focus:outline-none"
                    />
                  </label>
                </div>
              ) : (
                <>
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
                  <div className="mt-6">
                    <p className="mb-2 font-mono text-[10px] uppercase tracking-[0.2em] text-smoke">
                      Garment colour: <span className="text-bone">{COLOURS[colour]![0]}</span>
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {COLOURS.map(([n, c], i) => (
                        <button
                          key={n}
                          type="button"
                          title={n}
                          aria-label={n}
                          aria-pressed={colour === i}
                          onClick={() => setColour(i)}
                          className={`h-9 w-9 border-2 transition ${colour === i ? "scale-110 border-gold" : "border-bone/20 hover:border-bone/60"}`}
                          style={{ backgroundColor: `rgb(${c.join(",")})` }}
                        />
                      ))}
                    </div>
                  </div>
                  <div className="mt-5">
                    <p className="mb-2 font-mono text-[10px] uppercase tracking-[0.2em] text-smoke">
                      Logo positions (pick any)
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {Object.keys(spotMap).map((n) => {
                        const on = spots.includes(n);
                        return (
                          <button
                            key={n}
                            type="button"
                            aria-pressed={on}
                            onClick={() =>
                              setSpots((cur) => (on ? cur.filter((x) => x !== n) : [...cur, n]))
                            }
                            className={`border px-3 py-2 font-mono text-[10px] uppercase tracking-[0.15em] transition-colors ${on ? "border-gold bg-gold/15 text-gold" : "border-bone/20 text-smoke hover:text-bone"}`}
                          >
                            {n}
                          </button>
                        );
                      })}
                    </div>
                  </div>
                  <textarea
                    value={designNotes}
                    onChange={(e) => setDesignNotes(e.target.value)}
                    placeholder="Notes for our designers, e.g. sponsor on the back, team name across the front. Sent with your quote."
                    rows={3}
                    className="mt-4 w-full border border-bone/15 bg-background px-4 py-3 text-sm text-bone placeholder:text-smoke/60 focus:border-crimson focus:outline-none"
                  />
                </>
              )}
            </Reveal>

            <Reveal delay={180}>
              <p className="mt-10 mb-4 font-mono text-[11px] uppercase tracking-[0.3em] text-crimson">
                03. Generate
              </p>
              <button
                type="button"
                onClick={onGenerate}
                disabled={generating || (mode === "upload" && !designUrl)}
                className="btn btn-gold w-full disabled:opacity-40"
              >
                {generating
                  ? mode === "describe"
                    ? "Creating your design…"
                    : "Rendering your mockup…"
                  : mode === "describe"
                    ? "Create my design"
                    : "Generate mockup"}
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
                      <img
                        src={uzasLogo}
                        alt="Uzas Sports"
                        className="mx-auto mb-5 h-24 w-auto animate-pulse-slow drop-shadow-[0_0_18px_rgba(227,191,41,0.45)]"
                      />
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
                  {!mockup
                    ? `Blank ${selected.label}`
                    : mockupKind === "concept"
                      ? "Your AI design"
                      : mockupKind === "preview"
                        ? "Quick preview"
                        : "Your AI mockup"}
                </span>
              </div>
              {mockup && (
                <div className="mt-5 border border-gold/40 bg-coal p-6">
                  <p className="font-display text-2xl leading-tight text-bone">LIKE THIS LOOK?</p>
                  <p className="mt-2 text-sm text-smoke">
                    Our designers will turn it into a professional, print-ready mockup with your
                    real logo, free. Send us a quick inquiry and we'll reply with your mockup and a
                    price.
                  </p>
                  <div className="mt-5 flex flex-wrap gap-3">
                    <a
                      href="#quote"
                      onClick={() => {
                        if (!notes)
                          setNotes(
                            `I'd like a professional mockup of this ${selected.label.toLowerCase()} design${mode === "describe" ? ` (${description})` : ""}.`,
                          );
                      }}
                      className="btn btn-gold btn-sm"
                    >
                      Get my free mockup
                    </a>
                    <a
                      onClick={() => {
                        const a = document.createElement("a");
                        a.href = mockup;
                        a.download = `uzas-design-${selected.label.toLowerCase().replace(/\s+/g, "-")}.jpg`;
                        a.click();
                      }}
                      href={`mailto:info@uzassports.com?subject=${encodeURIComponent(`Professional mockup request: ${selected.label}`)}&body=${encodeURIComponent(`Hi Uzas Sports,\n\nI made a design in your AI Studio and would like a professional mockup and a quote. My design image is attached.\n\nGarment: ${selected.label}\n${mode === "describe" ? `Design: ${description}\n` : ""}Quantity:\nDeadline:\n\nThanks`)}`}
                      className="btn btn-ghost btn-sm"
                    >
                      Email us
                    </a>
                    <a
                      href={mockup}
                      download={`uzas-design-${selected.label.toLowerCase().replace(/\s+/g, "-")}.jpg`}
                      className="px-2 py-3 font-mono text-[11px] uppercase tracking-[0.2em] text-smoke underline-offset-4 hover:text-bone hover:underline"
                    >
                      Download
                    </a>
                  </div>
                </div>
              )}
            </div>
          </Reveal>
        </div>
      </section>

      {/* Quote form */}
      <section
        id="quote"
        className="scroll-mt-32 lg:scroll-mt-20 border-t border-bone/10 bg-background py-16 md:py-24"
      >
        <div className="mx-auto max-w-3xl px-6">
          <Reveal>
            <p className="mb-3 font-mono text-[11px] uppercase tracking-[0.3em] text-crimson">
              Free professional mockup
            </p>
            <h2 className="font-display text-4xl leading-[0.9] tracking-tight text-bone md:text-6xl">
              GET YOUR MOCKUP AND QUOTE
            </h2>
            <p className="mt-4 max-w-[50ch] text-pretty text-smoke">
              Tell us the quantity and we'll come back with a production quote, from a single piece
              to a full team run.
            </p>
          </Reveal>

          {submitted ? (
            <Reveal delay={100}>
              <div className="mt-10 border border-crimson/40 bg-crimson/10 px-8 py-10 text-center">
                <p className="font-display text-3xl uppercase tracking-tight text-bone">
                  Quote request received
                </p>
                <p className="mt-3 text-sm text-smoke">
                  Our production team will email you at <span className="text-bone">{email}</span>{" "}
                  with pricing and a sample timeline. Talk soon.
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
                {mockup && (
                  <div className="flex items-center gap-4 border border-gold/40 bg-gold/10 p-3">
                    <img
                      src={mockup}
                      alt="Your design"
                      className="h-20 w-16 shrink-0 border border-bone/15 object-cover"
                    />
                    <p className="text-sm text-bone">
                      Your design is attached to this request for reference.
                      <span className="mt-1 block text-xs text-smoke">
                        Our designers use it to build your professional mockup.
                      </span>
                    </p>
                  </div>
                )}
                {submitError && (
                  <p className="border border-destructive/40 bg-destructive/10 px-4 py-3 text-sm text-bone">
                    {submitError}
                  </p>
                )}
                <button type="submit" disabled={submitting} className="btn btn-gold">
                  {submitting ? "Sending…" : "Send quote request"}
                </button>
                <RecaptchaNotice />
              </form>
            </Reveal>
          )}
        </div>
      </section>

      <SiteFooter />
    </div>
  );
}
