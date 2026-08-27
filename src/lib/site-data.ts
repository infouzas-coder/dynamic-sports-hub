import catApparel from "@/assets/cat-apparel.jpg";
import catPaintball from "@/assets/cat-paintball.jpg";
import catGloves from "@/assets/cat-gloves.jpg";
import catPatches from "@/assets/cat-patches.jpg";
import catMartial from "@/assets/fight-shorts.jpg";
import catSublimation from "@/assets/teamwear.jpg";

export type CategorySlug =
  | "/apparel"
  | "/paintball"
  | "/martial-arts-combat-sports"
  | "/gloves"
  | "/custom-patches"
  | "/sublimation-clothing";

export type Category = {
  slug: CategorySlug;
  name: string;
  tagline: string;
  image: string;
  pdf: string;
  cta: "wholesale" | "contact";
  intro: string;
  title: string;
  description: string;
  ogTitle: string;
  customization: { label: string; value: string }[];
};

export const CATALOGUE_BASE = "https://uzassportscatalogues.netlify.app/catalogues";

export const CATEGORIES: Category[] = [
  {
    slug: "/apparel",
    name: "Apparel",
    tagline: "Performance apparel",
    image: catApparel,
    pdf: `${CATALOGUE_BASE}/catalogue1.pdf`,
    cta: "contact",
    intro:
      "Training tees, hoodies, joggers, shorts and track sets — cut and sewn in our Sialkot facility on performance knits built to survive real training loads.",
    title: "Custom Performance Apparel Manufacturer | Uzas Sports",
    description:
      "Custom sportswear manufacturer since 2005. Training tees, hoodies, joggers and track sets produced in-house in Sialkot for gyms, brands and teams worldwide.",
    ogTitle: "Performance Apparel — Manufactured by Uzas Sports",
    customization: [
      { label: "Sizing", value: "XS–5XL, plus made-to-measure size runs and youth grading." },
      { label: "Colours", value: "Pantone-matched dyeing, colour-blocking and contrast panels." },
      { label: "Branding", value: "Embroidery, screen print, heat transfer, woven labels and hang tags." },
      { label: "MOQ", value: "From 25 pieces per style; sample runs available before bulk." },
    ],
  },
  {
    slug: "/paintball",
    name: "Paintball",
    tagline: "Competition equipment",
    image: catPaintball,
    pdf: `${CATALOGUE_BASE}/catalogue2.pdf`,
    cta: "contact",
    intro:
      "Tournament-grade paintball jerseys, pants, gloves, pod packs and protective gear — engineered for abrasion resistance, airflow and full-team identity.",
    title: "Custom Paintball Jerseys & Team Gear Manufacturer | Uzas Sports",
    description:
      "Paintball equipment manufacturer producing custom tournament jerseys, pants, pod packs and gloves. Full sublimated team kits, made in-house in Sialkot.",
    ogTitle: "Paintball Equipment — Manufactured by Uzas Sports",
    customization: [
      { label: "Sizing", value: "Youth through 4XL, athletic and relaxed tournament fits." },
      { label: "Colours", value: "Unlimited sublimated colourways — no colour count limits." },
      { label: "Branding", value: "Sponsor panels, player names and numbers, team crests." },
      { label: "MOQ", value: "From 10 kits per team design." },
    ],
  },
  {
    slug: "/martial-arts-combat-sports",
    name: "Martial Arts & Combat Sports",
    tagline: "Tradition in motion",
    image: catMartial,
    pdf: `${CATALOGUE_BASE}/catalogue3.pdf`,
    cta: "wholesale",
    intro:
      "BJJ gis, karate and taekwondo uniforms, fight shorts, rash guards, belts and protective gear — built to federation weight specs and academy branding.",
    title: "Custom Martial Arts Uniforms Manufacturer | BJJ Gis & Fight Wear",
    description:
      "Custom martial arts uniforms manufacturer since 2005 — BJJ gis, karate and taekwondo uniforms, rash guards, fight shorts and belts for academies worldwide.",
    ogTitle: "Martial Arts & Combat Sports — Manufactured by Uzas Sports",
    customization: [
      { label: "Sizing", value: "A0–A6 gi grading, youth sizes and custom academy size runs." },
      { label: "Colours", value: "White, blue, black and fully custom dyed or sublimated finishes." },
      { label: "Branding", value: "Academy patches, embroidery, contrast stitching, custom belts." },
      { label: "MOQ", value: "From 20 units per uniform style; mixed sizes allowed." },
    ],
  },
  {
    slug: "/gloves",
    name: "Gloves",
    tagline: "Built for the mission",
    image: catGloves,
    pdf: `${CATALOGUE_BASE}/catalogue4.pdf`,
    cta: "contact",
    intro:
      "Boxing, MMA, bag, tactical, mechanic and cycling gloves — leather and synthetic constructions with multi-density foams and reinforced palms.",
    title: "Custom Gloves Manufacturer — Boxing, MMA & Tactical | Uzas Sports",
    description:
      "Glove manufacturer producing custom boxing, MMA, bag, tactical and work gloves. Leather and synthetic builds, private-label ready, made in Sialkot since 2005.",
    ogTitle: "Gloves — Manufactured by Uzas Sports",
    customization: [
      { label: "Sizing", value: "6oz–18oz boxing weights; S–XXL for tactical and work gloves." },
      { label: "Colours", value: "Full colour and material mixing, metallic and matte finishes." },
      { label: "Branding", value: "Debossing, embroidery, printed cuffs, custom packaging." },
      { label: "MOQ", value: "From 50 pairs per model." },
    ],
  },
  {
    slug: "/custom-patches",
    name: "Custom Patches",
    tagline: "The finishing detail",
    image: catPatches,
    pdf: `${CATALOGUE_BASE}/catalogue5.pdf`,
    cta: "wholesale",
    intro:
      "Embroidered, woven, PVC, leather and chenille patches — iron-on, sew-on or hook-and-loop backing, produced to tight tolerances at any volume.",
    title: "Custom Embroidered Patches Wholesale Manufacturer | Uzas Sports",
    description:
      "Wholesale custom patches manufacturer — embroidered, woven, PVC, leather and chenille patches with iron-on, sew-on or velcro backing. Low MOQ, fast turnaround.",
    ogTitle: "Custom Patches — Manufactured by Uzas Sports",
    customization: [
      { label: "Sizing", value: "From 1\" pin badges up to full back panels." },
      { label: "Colours", value: "Thread-matched to Pantone, metallic and glow-in-the-dark threads." },
      { label: "Branding", value: "Merrowed or laser-cut borders, custom backing and packaging." },
      { label: "MOQ", value: "From 50 pieces per design." },
    ],
  },
  {
    slug: "/sublimation-clothing",
    name: "Sublimation Clothing",
    tagline: "Identity, elevated",
    image: catSublimation,
    pdf: `${CATALOGUE_BASE}/catalogue6.pdf`,
    cta: "wholesale",
    intro:
      "Edge-to-edge sublimated teamwear — jerseys, singlets, rash guards, cycling kits and warm-ups where the print is locked into the fibre, never on top of it.",
    title: "Custom Sublimation Clothing Manufacturer | Sublimated Teamwear",
    description:
      "Custom sublimation clothing manufacturer — all-over printed jerseys, rash guards, singlets and cycling kits. Wash-proof edge-to-edge print, any quantity.",
    ogTitle: "Sublimation Clothing — Manufactured by Uzas Sports",
    customization: [
      { label: "Sizing", value: "Youth 6 through adult 5XL, male and female patterns." },
      { label: "Colours", value: "Unlimited colours and gradients at no extra cost." },
      { label: "Branding", value: "Names, numbers, sponsor logos, roster-level personalisation." },
      { label: "MOQ", value: "From 10 pieces per design — single samples on request." },
    ],
  },
];

export const SOCIALS = [
  { label: "Instagram", href: "https://www.instagram.com/uzas_sports/" },
  { label: "Facebook", href: "https://www.facebook.com/uzalabel" },
  { label: "LinkedIn", href: "https://pk.linkedin.com/in/uzas-sports" },
];
