import catApparel from "@/assets/categories/apparel.jpg";
import catPaintball from "@/assets/categories/paintball.jpg";
import catGloves from "@/assets/categories/gloves.jpg";
import catPatches from "@/assets/categories/patches.jpg";
import catMartial from "@/assets/categories/martial.jpg";
import catSublimation from "@/assets/categories/sublimation.jpg";

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
  products: { name: string; desc: string }[];
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
      "Training tees, hoodies, joggers, shorts and track sets, cut and sewn in our Sialkot facility on performance knits built to survive real training loads.",
    title: "Custom Performance Apparel Manufacturer | Uzas Sports",
    description:
      "Custom sportswear manufacturer since 2005. Training tees, hoodies, joggers and track sets produced in-house in Sialkot for gyms, brands and teams worldwide.",
    ogTitle: "Performance Apparel | Manufactured by Uzas Sports",
    products: [
      {
        name: "Training T-Shirts",
        desc: "Moisture-wicking performance tees for gyms, clubs and brands. Choose your fabric, fit and neckline, then add your logo in print or embroidery.",
      },
      {
        name: "Hoodies & Sweatshirts",
        desc: "Heavyweight fleece pullovers and zip hoodies with ribbed cuffs and double-stitched seams. Ideal for team merch and gym retail.",
      },
      {
        name: "Joggers & Track Pants",
        desc: "Tapered joggers and track pants with zip pockets and an elastic drawcord waist. Made to match your hoodies and tees.",
      },
      {
        name: "Tracksuits",
        desc: "Two-piece track jackets and pants in your club colours, with contrast piping, panels and embroidered crests.",
      },
      {
        name: "Training Shorts",
        desc: "Lightweight gym and running shorts with a comfortable waistband and optional inner liner, printed or embroidered to order.",
      },
      {
        name: "Polo Shirts",
        desc: "Pique and performance polos for coaches, staff and events, finished with an embroidered logo on the chest or sleeve.",
      },
    ],
    customization: [
      { label: "Sizing", value: "XS–5XL, plus made-to-measure size runs and youth grading." },
      { label: "Colours", value: "Pantone-matched dyeing, colour-blocking and contrast panels." },
      {
        label: "Branding",
        value: "Embroidery, screen print, heat transfer, woven labels and hang tags.",
      },
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
      "Tournament-grade paintball jerseys, pants, gloves, pod packs and protective gear. Built for abrasion resistance, airflow and full-team identity.",
    title: "Custom Paintball Jerseys & Team Gear Manufacturer | Uzas Sports",
    description:
      "Paintball equipment manufacturer producing custom tournament jerseys, pants, pod packs and gloves. Full sublimated team kits, made in-house in Sialkot.",
    ogTitle: "Paintball Equipment | Manufactured by Uzas Sports",
    products: [
      {
        name: "Paintball Jerseys",
        desc: "Tournament jerseys with padded forearms and breathable side panels, fully sublimated with your team design and sponsors.",
      },
      {
        name: "Paintball Pants",
        desc: "Durable pants with knee padding and an adjustable waist, built to handle slides, dives and long tournament days.",
      },
      {
        name: "Paintball Gloves",
        desc: "Protective gloves with padded knuckles and a grippy palm that keep your fingers free for fast trigger work.",
      },
      {
        name: "Pod Packs & Harnesses",
        desc: "Harnesses that hold multiple pods for quick reloads, made in your team colours with a custom logo.",
      },
      {
        name: "Team Tees & Hoodies",
        desc: "Off-field shirts and hoodies to match your match-day kit, for players, staff and supporters.",
      },
      {
        name: "Headbands & Accessories",
        desc: "Sublimated headbands, wraps and small accessories that finish the team look.",
      },
    ],
    customization: [
      { label: "Sizing", value: "Youth through 4XL, athletic and relaxed tournament fits." },
      { label: "Colours", value: "Unlimited sublimated colourways with no limit on colour count." },
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
      "BJJ gis, karate and taekwondo uniforms, fight shorts, rash guards, belts and protective gear, built to federation weight specs and academy branding.",
    title: "Custom Martial Arts Uniforms Manufacturer | BJJ Gis & Fight Wear",
    description:
      "Custom martial arts uniforms manufacturer since 2005. BJJ gis, karate and taekwondo uniforms, rash guards, fight shorts and belts for academies worldwide.",
    ogTitle: "Martial Arts & Combat Sports | Manufactured by Uzas Sports",
    products: [
      {
        name: "BJJ Gi",
        desc: "Pearl weave Brazilian jiu-jitsu gi at 450 gsm, with reinforced stress points and room for your academy patches and embroidery.",
      },
      {
        name: "Karate Uniforms",
        desc: "Clean-cut karate gis for training and grading, in white, black or your academy colours, with embroidered branding.",
      },
      {
        name: "Taekwondo Doboks",
        desc: "V-neck taekwondo doboks with contrast collars for schools and clubs, made to your sizing and badge layout.",
      },
      {
        name: "Fight Shorts",
        desc: "MMA and grappling shorts with a secure waistband and stretch panels, fully sublimated with your design.",
      },
      {
        name: "Rash Guards",
        desc: "Long and short sleeve rash guards in four-way stretch fabric, sublimated so the print won't crack or peel.",
      },
      {
        name: "Martial Arts Belts",
        desc: "Rank belts in every colour, with custom stripes and embroidered academy names or student names.",
      },
    ],
    customization: [
      { label: "Sizing", value: "A0–A6 gi grading, youth sizes and custom academy size runs." },
      {
        label: "Colours",
        value: "White, blue, black and fully custom dyed or sublimated finishes.",
      },
      {
        label: "Branding",
        value: "Academy patches, embroidery, contrast stitching, custom belts.",
      },
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
      "Boxing, MMA, bag, tactical, mechanic and cycling gloves in leather and synthetic builds with multi-density foams and reinforced palms.",
    title: "Custom Gloves Manufacturer: Boxing, MMA & Tactical | Uzas Sports",
    description:
      "Glove manufacturer producing custom boxing, MMA, bag, tactical and work gloves. Leather and synthetic builds, private-label ready, made in Sialkot since 2005.",
    ogTitle: "Gloves | Manufactured by Uzas Sports",
    products: [
      {
        name: "Boxing Gloves",
        desc: "Training and sparring gloves from 6 oz to 18 oz, with layered foam padding and a wrist strap for support.",
      },
      {
        name: "MMA Gloves",
        desc: "Open-finger grappling gloves with knuckle padding and a secure wrist closure for sparring and competition.",
      },
      {
        name: "Bag Gloves",
        desc: "Compact gloves for heavy bag and pad work, with a padded striking surface and a durable outer.",
      },
      {
        name: "Tactical Gloves",
        desc: "Hard-knuckle and lightweight tactical gloves with reinforced palms, made for security, outdoor and field use.",
      },
      {
        name: "Mechanic & Work Gloves",
        desc: "Work gloves with a padded palm and a snug fit, built for workshops and tough jobs, with your branding on the cuff.",
      },
      {
        name: "Cycling Gloves",
        desc: "Half and full finger cycling gloves with palm padding and a breathable back for long rides.",
      },
    ],
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
      "Embroidered, woven, PVC, leather and chenille patches with iron-on, sew-on or hook-and-loop backing, produced to tight tolerances at any volume.",
    title: "Custom Embroidered Patches Wholesale Manufacturer | Uzas Sports",
    description:
      "Wholesale custom patches manufacturer. Embroidered, woven, PVC, leather and chenille patches with iron-on, sew-on or velcro backing. Low MOQ, fast turnaround.",
    ogTitle: "Custom Patches | Manufactured by Uzas Sports",
    products: [
      {
        name: "Embroidered Patches",
        desc: "Classic stitched patches for uniforms, gis and jackets, matched to your logo colours thread by thread.",
      },
      {
        name: "Tactical Morale Patches",
        desc: "Our tactical patch range (catalogue art. 8001 to 8024) with hook-and-loop backing, ready for vests, bags and caps.",
      },
      {
        name: "Woven Patches",
        desc: "Fine woven patches that hold small text and sharp detail better than embroidery, with a flat, smooth finish.",
      },
      {
        name: "PVC Patches",
        desc: "Soft rubber patches that stay bright and weatherproof, a strong fit for tactical, outdoor and paintball gear.",
      },
      {
        name: "Leather Patches",
        desc: "Debossed or printed leather patches for caps, bags and premium apparel.",
      },
      {
        name: "Chenille Patches",
        desc: "Thick, textured letterman-style patches for jackets and hoodies.",
      },
    ],
    customization: [
      { label: "Sizing", value: 'From 1" pin badges up to full back panels.' },
      {
        label: "Colours",
        value: "Thread-matched to Pantone, metallic and glow-in-the-dark threads.",
      },
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
      "Edge-to-edge sublimated teamwear: jerseys, singlets, rash guards, cycling kits and warm-ups where the print is locked into the fibre, never on top of it.",
    title: "Custom Sublimation Clothing Manufacturer | Sublimated Teamwear",
    description:
      "Custom sublimation clothing manufacturer. All-over printed jerseys, rash guards, singlets and cycling kits. Wash-proof edge-to-edge print, any quantity.",
    ogTitle: "Sublimation Clothing | Manufactured by Uzas Sports",
    products: [
      {
        name: "Sublimated Team Jerseys",
        desc: "Full-colour jerseys for football, basketball, cricket and more, with names and numbers printed across the whole roster.",
      },
      {
        name: "Singlets & Tank Tops",
        desc: "Lightweight singlets for running, athletics and gym teams, printed edge to edge in any design.",
      },
      {
        name: "Rash Guards & Compression Tops",
        desc: "Stretch tops for grappling and training with prints that don't crack, peel or fade in the wash.",
      },
      {
        name: "Cycling Kits",
        desc: "Jerseys and bib shorts for clubs and events, with your full design and sponsor logos printed right into the fabric.",
      },
      {
        name: "Warm-Up Jackets",
        desc: "Sublimated warm-up and pre-match jackets to go with your playing kit.",
      },
      {
        name: "Fishing & Outdoor Shirts",
        desc: "Long sleeve sun-protection shirts for fishing clubs and outdoor brands, printed in any pattern.",
      },
    ],
    customization: [
      { label: "Sizing", value: "Youth 6 through adult 5XL, male and female patterns." },
      { label: "Colours", value: "Unlimited colours and gradients at no extra cost." },
      { label: "Branding", value: "Names, numbers, sponsor logos, roster-level personalisation." },
      { label: "MOQ", value: "From 10 pieces per design. Single samples on request." },
    ],
  },
];

export const WHATSAPP_URL = "https://wa.me/message/NCHQVYIYJYWGG1";

export const SOCIALS = [
  { label: "Instagram", href: "https://www.instagram.com/uzas_sports/", icon: "instagram" },
  { label: "Facebook", href: "https://www.facebook.com/uzalabel", icon: "facebook" },
  { label: "LinkedIn", href: "https://pk.linkedin.com/in/uzas-sports", icon: "linkedin" },
  { label: "WhatsApp", href: WHATSAPP_URL, icon: "whatsapp" },
] as const;

// Team shown on the About page. Add a `photo` (imported image) to replace the initials badge.
export type TeamMember = {
  name: string;
  role: string;
  location: string;
  email: string;
  bio: string;
  photo?: string;
};

export const TEAM: TeamMember[] = [
  {
    name: "Saad Zaheen",
    role: "Sales & Operations",
    location: "Melbourne, Australia",
    email: "info@uzassports.com",
    bio: "Leads sales, operations and IT, and looks after clients in Australia and worldwide.",
  },
  {
    name: "Haysum Zaheen",
    role: "Production Manager",
    location: "Sialkot factory, Pakistan",
    email: "haysum@uzassports.com",
    bio: "Runs the factory floor and takes every order from pricing and design approval through to production.",
  },
  {
    name: "Hashim Abbasi",
    role: "Sales, Australia",
    location: "Melbourne, Australia",
    email: "hashim@uzassports.com",
    bio: "Works with gyms, academies, clubs and teams across Australia and overseas.",
  },
  {
    name: "Mark Henry",
    role: "Sales, USA",
    location: "United States",
    email: "mark@uzassports.com",
    bio: "First point of contact for clubs, gyms and brands across the USA, from first call to free samples.",
  },
];

// Where UZAS is based, shown on the About page and footer
export const LOCATIONS = [
  {
    kind: "Manufacturing",
    title: "Factory",
    place: "Sialkot, Punjab, Pakistan",
    text: "Our own factory, where every order is designed, printed, cut, stitched and checked.",
  },
  {
    kind: "Showroom",
    title: "Sialkot showroom",
    place: "Sialkot, Punjab, Pakistan",
    text: "See fabrics, samples and finished gear right next to the production floor.",
  },
  {
    kind: "Showroom",
    title: "Melbourne showroom",
    place: "Hadfield, Melbourne VIC, Australia",
    text: "Visit us in Melbourne to see samples, feel the fabrics and talk through your order.",
  },
];

// Couriers we ship with (names only)
export const CARRIERS = ["DHL Express", "FedEx", "UPS", "Aramex"];
