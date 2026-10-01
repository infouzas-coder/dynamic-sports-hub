// Site-wide SEO helpers. SITE_URL is the public address search engines should index.
// Set VITE_SITE_URL in Vercel when the site moves to its own domain (e.g. https://www.uzassports.com).
export const SITE_URL: string = (
  import.meta.env["VITE_SITE_URL"] || "https://dynamic-sports-hub.vercel.app"
).replace(/\/$/, "");

export const absUrl = (path: string) => (/^https?:\/\//.test(path) ? path : `${SITE_URL}${path.startsWith("/") ? "" : "/"}${path}`);

export const ORG = {
  "@type": "Organization",
  "@id": `${SITE_URL}/#organization`,
  name: "Uzas Sports",
  url: SITE_URL,
  email: "info@uzassports.com",
  foundingDate: "2005",
  description:
    "Manufacturer of custom sublimated team kits, performance apparel, paintball gear, martial arts uniforms, gloves and custom patches, based in Sialkot, Pakistan.",
  logo: `${SITE_URL}/favicon.png`,
  slogan: "Where expectations meet quality",
  address: { "@type": "PostalAddress", addressLocality: "Sialkot", addressRegion: "Punjab", addressCountry: "PK" },
  location: [
    {
      "@type": "Place",
      name: "Uzas Sports factory and showroom",
      address: { "@type": "PostalAddress", addressLocality: "Sialkot", addressRegion: "Punjab", addressCountry: "PK" },
    },
    {
      "@type": "Place",
      name: "Uzas Sports Melbourne showroom",
      address: { "@type": "PostalAddress", addressLocality: "Hadfield", addressRegion: "VIC", addressCountry: "AU" },
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
