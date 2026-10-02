// Site-wide SEO helpers. SITE_URL is the public address search engines should index.
// Set VITE_SITE_URL in Vercel when the site moves to its own domain (e.g. https://www.uzassports.com).
export const SITE_URL: string = (
  import.meta.env["VITE_SITE_URL"] || "https://dynamic-sports-hub.vercel.app"
).replace(/\/$/, "");

export const absUrl = (path: string) =>
  /^https?:\/\//.test(path) ? path : `${SITE_URL}${path.startsWith("/") ? "" : "/"}${path}`;

// Matches the Google Maps listing so Google links the knowledge panel to this site
const SIALKOT_ADDRESS = {
  "@type": "PostalAddress",
  streetAddress: "Building 21/436, Factory Area, Fazal Market, Mujahid Road, Prem Nagar",
  addressLocality: "Sialkot",
  addressRegion: "Punjab",
  postalCode: "51310",
  addressCountry: "PK",
};

export const ORG = {
  "@type": "Organization",
  "@id": `${SITE_URL}/#organization`,
  name: "UZAS Sports",
  url: SITE_URL,
  email: "info@uzassports.com",
  foundingDate: "2005",
  description:
    "Manufacturer of custom sublimated team kits, performance apparel, paintball gear, martial arts uniforms, gloves and custom patches, based in Sialkot, Pakistan.",
  logo: `${SITE_URL}/favicon.png`,
  slogan: "Where expectations meet quality",
  alternateName: ["UZAS", "Uzas Sports", "UZAS Sports & ActiveWear"],
  telephone: "+923211104552",
  address: SIALKOT_ADDRESS,
  location: [
    {
      "@type": "Place",
      name: "UZAS Sports factory and showroom",
      telephone: "+923211104552",
      address: SIALKOT_ADDRESS,
    },
    {
      "@type": "Place",
      name: "UZAS Sports Melbourne showroom",
      address: {
        "@type": "PostalAddress",
        addressLocality: "Hadfield",
        addressRegion: "VIC",
        addressCountry: "AU",
      },
    },
  ],
  contactPoint: {
    "@type": "ContactPoint",
    contactType: "sales",
    email: "info@uzassports.com",
    telephone: "+61452475193",
    availableLanguage: ["English", "Urdu"],
    areaServed: "Worldwide",
  },
  knowsAbout: [
    "Sublimated team kits",
    "Custom sportswear manufacturing",
    "Martial arts uniforms",
    "Boxing gloves",
    "Custom patches",
    "Paintball jerseys",
  ],
  sameAs: [
    "https://www.instagram.com/uzas_sports/",
    "https://www.instagram.com/uzas_apparels/",
    "https://www.facebook.com/uzalabel",
    "https://pk.linkedin.com/in/uzas-sports",
  ],
};

// Tells Google which name to show for the site in search results
export const WEBSITE = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  "@id": `${SITE_URL}/#website`,
  name: "UZAS Sports",
  alternateName: ["UZAS", "uzassports.com"],
  url: `${SITE_URL}/`,
  publisher: { "@id": `${SITE_URL}/#organization` },
};
