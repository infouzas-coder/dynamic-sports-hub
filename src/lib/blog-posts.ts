import teamwear from "@/assets/teamwear.jpg";
import rashGuard from "@/assets/rash-guard.jpg";
import fightShorts from "@/assets/fight-shorts.jpg";
import catPatches from "@/assets/cat-patches.jpg";
import catPaintball from "@/assets/cat-paintball.jpg";
import heroArena from "@/assets/hero-arena.jpg";

// Blog content. Each post is a list of blocks so pages render as real HTML (good for search engines)
// without a markdown library. Keep claims factual: no invented prices, stats or credentials.

export type Block =
  | { type: "p"; text: string }
  | { type: "h2"; text: string }
  | { type: "h3"; text: string }
  | { type: "ul"; items: string[] }
  | { type: "ol"; items: string[] }
  | { type: "cta"; text: string; to: string; label: string };

export type Post = {
  slug: string;
  title: string;
  /** <title> tag, under ~60 characters */
  seoTitle: string;
  /** meta description, under ~155 characters */
  description: string;
  excerpt: string;
  category: string;
  date: string; // ISO yyyy-mm-dd
  image: string;
  imageAlt: string;
  related: string[]; // category page slugs, e.g. "/sublimation-clothing"
  faq?: { q: string; a: string }[];
  body: Block[];
};

export const POSTS: Post[] = [
  {
    slug: "what-is-sublimation-printing",
    title: "What is sublimation printing? A plain guide for team managers",
    seoTitle: "What Is Sublimation Printing? A Guide for Teams",
    description:
      "How sublimation printing works, why sublimated jerseys don't crack or fade, which fabrics it needs, and when it's the right choice for your team kit.",
    excerpt:
      "Why sublimated jerseys never crack, peel or fade, what fabric they need, and how to tell if it's the right choice for your club.",
    category: "Sublimation",
    date: "2026-10-01",
    image: teamwear,
    imageAlt: "Custom sublimated team jerseys on a rack",
    related: ["/sublimation-clothing", "/apparel"],
    faq: [
      {
        q: "Does sublimation printing fade in the wash?",
        a: "No. The ink turns into a gas and bonds with the polyester fibres, so the design is part of the fabric rather than a layer on top. There is nothing to crack, peel or wash off.",
      },
      {
        q: "Can you sublimate on cotton?",
        a: "Not properly. Sublimation needs polyester or a high-polyester blend. On cotton the ink has nothing to bond with, so the print comes out pale and washes out.",
      },
      {
        q: "Does a full-colour sublimated design cost more than a simple one?",
        a: "No. The whole garment is printed in one pass, so a design with twenty colours and gradients costs the same to print as a plain one.",
      },
    ],
    body: [
      { type: "p", text: "If you've ordered team kits before, you've probably heard the word sublimation. It's how most modern jerseys, rash guards and cycling kits are printed, and it's the process we use for our sublimated teamwear. Here's what it actually means, in plain terms, so you can order with confidence." },
      { type: "h2", text: "How sublimation printing works" },
      { type: "p", text: "Your design is printed onto special transfer paper using sublimation inks. The paper is laid on the fabric and pressed with heat and pressure. At that temperature the ink turns into a gas, the polyester fibres open up, and the ink bonds inside them. When the fabric cools, the design is locked into the fibre itself." },
      { type: "p", text: "Because the print is inside the fabric rather than sitting on top, you can't feel it. The shirt stays as light and breathable as the blank fabric." },
      { type: "h2", text: "Why teams choose sublimated kits" },
      { type: "ul", items: [
        "It won't crack, peel or fade. There is no ink layer to break down, even after a full season of washing.",
        "Unlimited colours. Gradients, photos, patterns and sponsor logos cost the same as a single colour.",
        "Edge-to-edge designs. The print can run across seams, sleeves and collars.",
        "Names and numbers for every player are printed in the same pass, so every shirt in the roster can be different.",
        "Lightweight and breathable, which matters in summer sports and combat sports.",
      ] },
      { type: "h2", text: "What sublimation needs: polyester" },
      { type: "p", text: "Sublimation only works properly on polyester or high-polyester blends, usually in white or light base fabric. That's why nearly all performance sportswear is polyester anyway. If you need a cotton feel, for example on casual team tees, screen printing or embroidery is the better choice. We can advise on which suits each piece of your kit." },
      { type: "h2", text: "What can be sublimated?" },
      { type: "p", text: "Almost any polyester garment. The most common items we make are team jerseys for football, basketball, cricket and netball, running singlets, rash guards and compression tops, fight shorts, cycling kits, warm-up jackets and long sleeve fishing shirts." },
      { type: "h2", text: "Is sublimation right for your team?" },
      { type: "p", text: "If you want bold designs, individual names and numbers, and a kit that still looks new at the end of the season, sublimation is almost always the right call. If you only need a small logo on a cotton tee, a simpler print method may suit better." },
      { type: "cta", text: "Want to see your design on a real garment first? Upload your logo or artwork and preview it in seconds.", to: "/studio", label: "Try the AI mockup studio" },
    ],
  },
  {
    slug: "how-to-order-custom-sublimated-team-kits",
    title: "How to order custom sublimated team kits, step by step",
    seoTitle: "How to Order Custom Sublimated Team Kits",
    description:
      "A step-by-step guide to ordering custom sublimated team kits: what to prepare, how design and sampling work, sizing tips and how to avoid delays.",
    excerpt:
      "What to prepare, how design and sampling work, how to get sizing right, and the small things that stop orders being delayed.",
    category: "Team kits",
    date: "2026-10-01",
    image: heroArena,
    imageAlt: "Athlete in a custom sublimated long sleeve top",
    related: ["/sublimation-clothing", "/wholesale"],
    body: [
      { type: "p", text: "Ordering kits for a whole club can feel like a lot of back and forth. It doesn't need to be. This is the process we follow with every team, and what you can do at each step to keep things moving." },
      { type: "h2", text: "1. Gather your brief" },
      { type: "p", text: "Before you contact any manufacturer, have these ready. It saves days of emails." },
      { type: "ul", items: [
        "Your logo, ideally as a vector file (AI, EPS, SVG or PDF). A high resolution PNG also works.",
        "Club colours, and Pantone references if you have them.",
        "Which items you need: playing tops, shorts, training tees, warm-up jackets, and so on.",
        "A rough headcount, and whether you need junior and adult sizes.",
        "Sponsor logos and where they need to go.",
        "The date you need the kit in hand, not just the date you'd like it.",
      ] },
      { type: "h2", text: "2. Design and mockups" },
      { type: "p", text: "No design yet? That's normal. Our design team can build one from your logo and colours. You'll get mockups to review, and we revise them until the kit is right. You can also try your own artwork on our garments in the AI mockup studio to get a feel for it before you brief us." },
      { type: "h2", text: "3. Approve a sample" },
      { type: "p", text: "Before a full run, we make a physical sample with your logo so you can check the fit, fabric and colours in person. This is the single best way to avoid surprises. Check it on a couple of different body types, and wash it once." },
      { type: "h2", text: "4. Collect sizes and names" },
      { type: "p", text: "This is where most delays happen. Use one spreadsheet with a column each for player name, number, top size and short size. Chase late players early, and order a few spare sizes for new players who join mid-season." },
      { type: "h2", text: "5. Production and delivery" },
      { type: "p", text: "Once the design, sample and roster are approved, production starts. Everything is printed, cut and stitched in our own factory, then checked and shipped to your door. See our wholesale page for typical turnaround times." },
      { type: "h2", text: "Tips that save time" },
      { type: "ol", items: [
        "Order earlier than you think. Allow time for design rounds and the sample, not just production.",
        "Name one person as the contact for approvals, so decisions don't stall.",
        "Keep your final files. Re-orders are faster when your design is already on file.",
      ] },
      { type: "cta", text: "Ready to start? Send us your logo, colours and rough numbers and we'll come back with pricing and a sample plan.", to: "/wholesale", label: "Start a team kit inquiry" },
    ],
  },
  {
    slug: "sublimated-vs-screen-printed-jerseys",
    title: "Sublimated vs screen printed jerseys: which is right for your club?",
    seoTitle: "Sublimated vs Screen Printed Jerseys Compared",
    description:
      "Sublimation or screen printing for your club jerseys? Compare durability, design freedom, fabrics and when each method makes sense.",
    excerpt:
      "An honest comparison of the two most common ways to print sports jerseys, and when each one makes sense.",
    category: "Sublimation",
    date: "2026-10-01",
    image: fightShorts,
    imageAlt: "Sublimated fight shorts with an all-over pattern",
    related: ["/sublimation-clothing", "/apparel"],
    body: [
      { type: "p", text: "Both methods have a place. The right one depends on your design, your fabric and how the garment will be used. Here's how they compare." },
      { type: "h2", text: "How each method works" },
      { type: "p", text: "Screen printing pushes ink through a mesh stencil onto the fabric, one colour at a time. The ink sits on top of the fabric. Sublimation turns the ink into a gas that bonds inside polyester fibres, so the design becomes part of the fabric." },
      { type: "h2", text: "Side by side" },
      { type: "ul", items: [
        "Durability: sublimation can't crack or peel because there's no ink layer. Screen prints are durable too, but can crack over time with heavy washing and stretching.",
        "Design: sublimation handles unlimited colours, gradients and all-over patterns. Screen printing suits bold designs with a few solid colours.",
        "Fabric: sublimation needs polyester. Screen printing works on cotton, blends and polyester.",
        "Feel: a sublimated print can't be felt. A screen print has a slight raised feel, more so with large solid areas.",
        "Names and numbers: sublimation prints every player's name and number in the same pass. With screen printing they're usually added separately.",
      ] },
      { type: "h2", text: "When to choose sublimation" },
      { type: "p", text: "Match day jerseys, rash guards, cycling kits, singlets and anything with a full-colour or edge-to-edge design. It's the standard for performance sportswear for good reason." },
      { type: "h2", text: "When to choose screen printing" },
      { type: "p", text: "Cotton tees and hoodies for supporters, merch and casual team wear, especially with a simple one or two colour logo." },
      { type: "h2", text: "You don't have to pick just one" },
      { type: "p", text: "Most clubs end up with both: sublimated playing kits, plus screen printed or embroidered hoodies and tees for training and supporters. We make both under one roof, so it all matches." },
      { type: "cta", text: "Tell us what your club needs and we'll recommend the right method for each piece.", to: "/contact", label: "Ask our team" },
    ],
  },
  {
    slug: "custom-bjj-gis-and-rash-guards-for-academies",
    title: "Custom BJJ gis and rash guards for your academy: what to look for",
    seoTitle: "Custom BJJ Gis & Rash Guards for Academies",
    description:
      "What academy owners should look for when ordering custom BJJ gis and rash guards: weave and weight, fit, branding options and ordering tips.",
    excerpt:
      "Weave, weight, fit and branding: what matters when you're kitting out your academy with its own gis and rash guards.",
    category: "Martial arts",
    date: "2026-10-01",
    image: rashGuard,
    imageAlt: "Custom sublimated long sleeve rash guard",
    related: ["/martial-arts-combat-sports", "/custom-patches"],
    body: [
      { type: "p", text: "A branded gi and rash guard is one of the easiest ways for an academy to build identity and add a steady line of revenue. Here's what to think about before you order." },
      { type: "h2", text: "Choosing the gi" },
      { type: "h3", text: "Weave and weight" },
      { type: "p", text: "Pearl weave is the most popular choice for academy gis. It's strong but light enough for long training sessions. Our standard BJJ gi is a 450 gsm pearl weave, which suits most students for everyday training." },
      { type: "h3", text: "Fit and sizing" },
      { type: "p", text: "BJJ gis are sized A0 to A6 for adults, with separate youth sizes. Order a sample in a couple of sizes and have students of different builds try them before you commit to a full run." },
      { type: "h3", text: "Branding" },
      { type: "p", text: "Most academies use a mix of embroidery and patches: a chest logo, a shoulder or back patch, and sometimes the academy name down the pant leg. Keep in mind that federation competitions have rules on patch placement, so check them if your students compete." },
      { type: "h2", text: "Choosing the rash guard" },
      { type: "p", text: "For rash guards, sublimation is the clear winner. The design is printed into four-way stretch fabric, so it won't crack when the fabric stretches during rolling. You can use your academy colours, rank colours, or a fully custom pattern." },
      { type: "ul", items: [
        "Long sleeve for gi and no-gi training, short sleeve for warmer climates.",
        "Rank-coloured versions are popular for no-gi classes.",
        "Match the rash guard design to your fight shorts for a complete no-gi set.",
      ] },
      { type: "h2", text: "Ordering tips for academy owners" },
      { type: "ol", items: [
        "Start with a sample of each item and let your coaches train in it for a week.",
        "Pre-sell to students with a sign-up sheet before ordering bulk, so you know your sizes.",
        "Keep a few of each popular size in stock for new members.",
      ] },
      { type: "cta", text: "We make academy gis, rash guards, fight shorts, belts and patches, with a free sample carrying your logo before you order.", to: "/martial-arts-combat-sports", label: "See martial arts range" },
    ],
  },
  {
    slug: "embroidered-vs-woven-vs-pvc-patches",
    title: "Embroidered, woven or PVC patches? How to choose",
    seoTitle: "Embroidered vs Woven vs PVC Patches: How to Choose",
    description:
      "The difference between embroidered, woven, PVC, leather and chenille patches, plus backing options, so you can pick the right patch for uniforms and gear.",
    excerpt:
      "The differences between the main patch types and backings, and which one suits uniforms, gis, caps and tactical gear.",
    category: "Patches",
    date: "2026-10-01",
    image: catPatches,
    imageAlt: "Custom embroidered patches in gold thread on black",
    related: ["/custom-patches", "/martial-arts-combat-sports"],
    body: [
      { type: "p", text: "Patches finish a uniform. The right type depends on your logo, where it's going and how much wear it will take." },
      { type: "h2", text: "The main patch types" },
      { type: "h3", text: "Embroidered" },
      { type: "p", text: "The classic. Thread is stitched onto a twill base for a raised, textured look. Best for bold logos with clear shapes. Very fine text can get lost, so keep lettering a reasonable size." },
      { type: "h3", text: "Woven" },
      { type: "p", text: "Thinner threads woven together give a flat, smooth patch that holds small text and fine detail far better than embroidery. A good choice for detailed crests." },
      { type: "h3", text: "PVC" },
      { type: "p", text: "Soft moulded rubber. Waterproof, bright and very durable, which makes it popular for tactical gear, paintball and outdoor use." },
      { type: "h3", text: "Leather" },
      { type: "p", text: "Debossed or printed leather gives a premium look on caps, bags and jackets." },
      { type: "h3", text: "Chenille" },
      { type: "p", text: "Thick, fluffy, letterman-style patches, great for jackets and hoodies." },
      { type: "h2", text: "Choosing a backing" },
      { type: "ul", items: [
        "Sew-on: the most secure option. Best for gis, uniforms and anything washed often.",
        "Iron-on: quick to apply, fine for casual wear, less durable over many washes.",
        "Hook and loop (velcro): swappable. The standard for tactical vests, bags and caps.",
      ] },
      { type: "h2", text: "Quick guide" },
      { type: "ul", items: [
        "Martial arts gis: embroidered or woven, sew-on.",
        "Team jackets: chenille or embroidered.",
        "Tactical and paintball gear: PVC or embroidered, hook and loop.",
        "Caps and bags: PVC or leather.",
      ] },
      { type: "cta", text: "Browse our patch range or send us your logo for a recommendation.", to: "/custom-patches", label: "See custom patches" },
    ],
  },
  {
    slug: "custom-paintball-jerseys-guide",
    title: "Custom paintball jerseys: what makes a good tournament jersey",
    seoTitle: "Custom Paintball Jerseys: A Buyer's Guide",
    description:
      "What to look for in custom paintball jerseys: padding, breathability, durability, sizing and sublimated team designs with sponsor logos.",
    excerpt:
      "Padding, airflow, durability and design: what separates a good tournament jersey from a basic one.",
    category: "Paintball",
    date: "2026-10-01",
    image: catPaintball,
    imageAlt: "Paintball player in a custom team jersey and harness",
    related: ["/paintball", "/sublimation-clothing"],
    body: [
      { type: "p", text: "A paintball jersey has a harder life than most sportswear. It gets dragged across the ground, soaked in sweat and hit at speed. Here's what to look for when you're ordering for your team." },
      { type: "h2", text: "Padding where it counts" },
      { type: "p", text: "Look for padding on the forearms and elbows, where you land on dives and slides. It should protect without making the sleeve stiff." },
      { type: "h2", text: "Airflow" },
      { type: "p", text: "Breathable panels under the arms and down the sides keep players cooler on long tournament days. This matters more than most teams expect." },
      { type: "h2", text: "Durable fabric and stitching" },
      { type: "p", text: "Reinforced stitching at the shoulders and cuffs, and a tough outer fabric on the arms, stop jerseys wearing through after a few events." },
      { type: "h2", text: "A design that lasts" },
      { type: "p", text: "Sublimated jerseys carry your team design, player names, numbers and sponsor logos without any print to crack or peel. Unlimited colours cost the same as one, so there's no reason to hold back on the design." },
      { type: "h2", text: "Complete the kit" },
      { type: "p", text: "Most teams order matching pants, gloves and pod harnesses, plus team tees and hoodies for off the field. Ordering it all together keeps colours consistent." },
      { type: "cta", text: "Get your team kitted out with custom jerseys, pants and harnesses.", to: "/paintball", label: "See paintball range" },
    ],
  },
];

export const postBySlug = (slug: string) => POSTS.find((p) => p.slug === slug);

export const readingMinutes = (post: Post) => {
  const words = post.body
    .map((b) => ("text" in b ? b.text : "items" in b ? b.items.join(" ") : ""))
    .join(" ")
    .split(/\s+/).length;
  return Math.max(2, Math.round(words / 220));
};
