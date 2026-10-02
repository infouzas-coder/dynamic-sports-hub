import { Link, useRouterState } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { ChevronDown, House, Mail } from "lucide-react";
import { SocialRow, WhatsAppIcon } from "./SocialIcons";
import { ThemeToggle } from "./ThemeToggle";
import { RotatingCta } from "./RotatingCta";
import { WhatsAppButton } from "./WhatsAppButton";
import { CATEGORIES, WHATSAPP_URL } from "@/lib/site-data";
import uzasLogo from "@/assets/uzas-logo.png";

// Short names for the category bar on phones (full names stay in the menu)
const QUICK_LINKS = [
  { to: "/sublimation-clothing", label: "Team Kits" },
  { to: "/martial-arts-combat-sports", label: "Martial Arts" },
  { to: "/gloves", label: "Gloves" },
  { to: "/apparel", label: "Apparel" },
  { to: "/custom-patches", label: "Patches" },
  { to: "/paintball", label: "Paintball" },
  { to: "/studio", label: "AI Studio", highlight: true },
];

export function SiteHeader() {
  const [open, setOpen] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [mobileProducts, setMobileProducts] = useState(false);
  const pathname = useRouterState({ select: (s) => s.location.pathname });

  // Close the mobile menu whenever the page changes
  useEffect(() => {
    setMobileOpen(false);
    setMobileProducts(false);
  }, [pathname]);

  // Lock page scroll behind the open menu; Escape closes it
  useEffect(() => {
    if (!mobileOpen) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setMobileOpen(false);
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = prev;
      window.removeEventListener("keydown", onKey);
    };
  }, [mobileOpen]);

  return (
    <>
      <nav className="sticky top-0 z-40 border-b border-bone/10 bg-background/85 backdrop-blur-md">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6">
          <Link to="/" className="flex items-center" aria-label="UZAS Sports home">
            <img
              src={uzasLogo}
              alt="UZAS Sports"
              className="logo-img h-11 w-auto sm:h-12"
              width={600}
              height={489}
            />
          </Link>

          <div className="hidden items-center gap-7 lg:flex">
            <Link
              to="/"
              activeOptions={{ exact: true }}
              className="nav-link inline-flex items-center gap-1.5"
            >
              <House className="h-4 w-4" strokeWidth={2.4} />
              Home
            </Link>
            <div
              className="relative"
              onMouseEnter={() => setOpen(true)}
              onMouseLeave={() => setOpen(false)}
            >
              <button
                type="button"
                className={`nav-link inline-flex items-center gap-1 ${open ? "is-active" : ""}`}
              >
                Products
                <ChevronDown
                  className={`h-4 w-4 transition-transform duration-300 ${open ? "rotate-180" : ""}`}
                />
              </button>
              {open && (
                <div className="absolute left-1/2 top-full w-80 -translate-x-1/2 pt-3">
                  <div className="border border-bone/10 bg-coal p-2 shadow-2xl">
                    {CATEGORIES.map((c) => (
                      <Link
                        key={c.slug}
                        to={c.slug}
                        className="group flex items-center justify-between px-4 py-3 font-display text-lg font-bold italic uppercase tracking-wide text-bone/80 transition-all hover:bg-ash hover:pl-5 hover:text-gold"
                      >
                        {c.name}
                        <span className="text-gold opacity-0 transition-opacity group-hover:opacity-100">
                          →
                        </span>
                      </Link>
                    ))}
                  </div>
                </div>
              )}
            </div>
            <Link to="/catalogues" className="nav-link">
              Catalogues
            </Link>
            <Link to="/wholesale" className="nav-link">
              Wholesale
            </Link>
            <Link to="/about" className="nav-link">
              About
            </Link>
            <Link to="/blog" className="nav-link">
              Blog
            </Link>
            <Link to="/studio" className="nav-link !text-gold">
              AI Studio
            </Link>
          </div>

          <div className="flex items-center gap-2.5 sm:gap-3">
            <ThemeToggle />
            <RotatingCta />
            <button
              type="button"
              onClick={() => setMobileOpen((v) => !v)}
              aria-label={mobileOpen ? "Close menu" : "Open menu"}
              aria-expanded={mobileOpen}
              aria-controls="mobile-menu"
              className="icon-btn lg:hidden"
            >
              <span className="burger" aria-hidden="true">
                <span />
                <span />
                <span />
              </span>
            </button>
          </div>
        </div>
        {/* Phones and tablets: main categories always visible in a swipeable bar */}
        <div className="border-t border-bone/10 lg:hidden">
          <div className="no-scrollbar mx-auto flex h-11 max-w-7xl items-center gap-0.5 overflow-x-auto px-3 [mask-image:linear-gradient(to_right,black_82%,transparent)] pr-10">
            {QUICK_LINKS.map((q) => (
              <Link
                key={q.to}
                to={q.to}
                className={`cat-chip ${q.highlight ? "cat-chip-gold" : ""}`}
              >
                {q.label}
              </Link>
            ))}
          </div>
        </div>
      </nav>
      {/* Mobile / tablet menu */}
      {mobileOpen && (
        <div
          id="mobile-menu"
          className="fixed inset-x-0 bottom-0 top-[6.75rem] z-50 overflow-y-auto border-t border-bone/10 bg-background lg:hidden"
        >
          <div className="mx-auto flex min-h-full max-w-7xl flex-col px-6 pb-10 pt-4">
            <Link
              to="/"
              className="flex items-center gap-3 border-b border-bone/10 py-4 font-display text-3xl text-bone transition-colors hover:text-gold"
            >
              <House className="h-6 w-6 text-gold" strokeWidth={2.2} />
              Home
            </Link>
            <button
              type="button"
              onClick={() => setMobileProducts((v) => !v)}
              aria-expanded={mobileProducts}
              className="flex w-full items-center justify-between border-b border-bone/10 py-4 text-left font-display text-3xl text-bone"
            >
              Products
              <ChevronDown
                className={`h-6 w-6 text-gold transition-transform ${mobileProducts ? "rotate-180" : ""}`}
              />
            </button>
            {mobileProducts && (
              <div className="border-b border-bone/10 py-2">
                {CATEGORIES.map((c) => (
                  <Link
                    key={c.slug}
                    to={c.slug}
                    className="block py-2.5 pl-2 font-mono text-[12px] uppercase tracking-[0.18em] text-smoke transition-colors hover:text-gold"
                  >
                    {c.name}
                  </Link>
                ))}
              </div>
            )}
            {[
              { to: "/catalogues", label: "Catalogues" },
              { to: "/wholesale", label: "Wholesale" },
              { to: "/about", label: "About" },
              { to: "/blog", label: "Blog" },
              { to: "/contact", label: "Contact" },
            ].map((l) => (
              <Link
                key={l.to}
                to={l.to}
                className="border-b border-bone/10 py-4 font-display text-3xl text-bone transition-colors hover:text-gold"
              >
                {l.label}
              </Link>
            ))}
            <Link
              to="/studio"
              className="border-b border-bone/10 py-4 font-display text-3xl text-gold transition-colors hover:text-bone"
            >
              AI Studio
            </Link>

            <Link to="/wholesale" hash="inquiry" className="btn btn-gold mt-8 text-center">
              Start a wholesale inquiry
            </Link>
            <SocialRow className="mt-8" />
            <a
              href="mailto:info@uzassports.com"
              className="mt-4 text-sm text-smoke transition-colors hover:text-bone"
            >
              info@uzassports.com
            </a>
          </div>
        </div>
      )}
    </>
  );
}

export function SiteFooter() {
  return (
    <footer className="border-t border-bone/10 bg-background">
      <WhatsAppButton />
      <div className="mx-auto grid max-w-7xl gap-10 px-6 py-14 md:grid-cols-4">
        <div>
          <img
            src={uzasLogo}
            alt="UZAS Sports"
            className="logo-img h-24 w-auto"
            width={600}
            height={489}
            loading="lazy"
          />
          <p className="mt-3 max-w-[30ch] text-sm text-smoke">
            Manufacturer of sportswear, combat sports gear, gloves and patches. Established 2005 in
            Sialkot, Pakistan.
          </p>
        </div>

        <div>
          <p className="mb-3 font-mono text-[11px] uppercase tracking-[0.25em] text-crimson">
            Product lines
          </p>
          <ul className="space-y-2 text-sm text-smoke">
            {CATEGORIES.map((c) => (
              <li key={c.slug}>
                <Link to={c.slug} className="transition-colors hover:text-bone">
                  {c.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <p className="mb-3 font-mono text-[11px] uppercase tracking-[0.25em] text-crimson">
            Company
          </p>
          <ul className="space-y-2 text-sm text-smoke">
            <li>
              <Link to="/about" className="transition-colors hover:text-bone">
                About the factory
              </Link>
            </li>
            <li>
              <Link to="/blog" className="transition-colors hover:text-bone">
                Blog
              </Link>
            </li>
            <li>
              <Link to="/catalogues" className="transition-colors hover:text-bone">
                Catalogues
              </Link>
            </li>
            <li>
              <Link to="/wholesale" className="transition-colors hover:text-bone">
                For gyms & academies
              </Link>
            </li>
            <li>
              <Link to="/studio" className="transition-colors hover:text-bone">
                AI mockup studio
              </Link>
            </li>
            <li>
              <Link to="/contact" className="transition-colors hover:text-bone">
                Contact
              </Link>
            </li>
          </ul>
        </div>

        <div>
          <p className="mb-3 font-mono text-[11px] uppercase tracking-[0.25em] text-crimson">
            Follow
          </p>
          <SocialRow />
          <a
            href={WHATSAPP_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-5 inline-flex items-center gap-2 text-sm text-smoke transition-colors hover:text-[#25d366]"
          >
            <WhatsAppIcon className="h-4 w-4" /> Chat on WhatsApp
          </a>
          <a
            href="mailto:info@uzassports.com"
            className="mt-2 flex items-center gap-2 text-sm text-smoke transition-colors hover:text-bone"
          >
            <Mail className="h-4 w-4" /> info@uzassports.com
          </a>
        </div>
      </div>
      <div className="border-t border-bone/10">
        <div className="mx-auto flex max-w-7xl flex-col gap-2 px-6 py-6 md:flex-row md:items-center md:justify-between">
          <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-smoke">
            Made in Sialkot, Pakistan · Showrooms in Sialkot &amp; Melbourne · Worldwide shipping
          </p>
          <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-smoke">
            © 2026 Uzas Sports
          </p>
        </div>
      </div>
    </footer>
  );
}
