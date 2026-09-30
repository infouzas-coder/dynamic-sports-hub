import { Link, useRouterState } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { ChevronDown, Menu, X } from "lucide-react";
import { CATEGORIES, SOCIALS } from "@/lib/site-data";
import uzasLogo from "@/assets/uzas-logo.png";

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
              className="h-11 w-auto sm:h-12"
              width={600}
              height={489}
            />
          </Link>

          <div className="hidden items-center gap-8 font-mono text-[11px] uppercase tracking-[0.22em] text-smoke lg:flex">
            <div
              className="relative"
              onMouseEnter={() => setOpen(true)}
              onMouseLeave={() => setOpen(false)}
            >
              <button className="uppercase tracking-[0.22em] transition-colors hover:text-bone">
                Products
              </button>
              {open && (
                <div className="absolute left-1/2 top-full w-72 -translate-x-1/2 border border-bone/10 bg-coal p-2">
                  {CATEGORIES.map((c) => (
                    <Link
                      key={c.slug}
                      to={c.slug}
                      className="block px-3 py-2 text-bone/80 transition-colors hover:bg-ash hover:text-crimson"
                    >
                      {c.name}
                    </Link>
                  ))}
                </div>
              )}
            </div>
            <Link to="/catalogues" className="transition-colors hover:text-bone">
              Catalogues
            </Link>
            <Link to="/wholesale" className="transition-colors hover:text-bone">
              Wholesale
            </Link>
            <Link to="/about" className="transition-colors hover:text-bone">
              About
            </Link>
            <Link to="/blog" className="transition-colors hover:text-bone">
              Blog
            </Link>
            <Link to="/studio" className="text-crimson transition-colors hover:text-bone">
              AI Studio
            </Link>
          </div>

          <div className="flex items-center gap-3">
            <Link
              to="/contact"
              className="border border-bone/30 px-4 py-2 font-mono text-[11px] uppercase tracking-[0.2em] text-bone transition-colors hover:border-crimson hover:bg-crimson hover:text-primary-foreground"
            >
              Contact
            </Link>
            <button
              type="button"
              onClick={() => setMobileOpen((v) => !v)}
              aria-label={mobileOpen ? "Close menu" : "Open menu"}
              aria-expanded={mobileOpen}
              aria-controls="mobile-menu"
              className="grid h-10 w-10 place-items-center border border-bone/30 text-bone transition-colors hover:border-gold hover:text-gold lg:hidden"
            >
              {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </div>
      </nav>
      {/* Mobile / tablet menu */}
      {mobileOpen && (
        <div
          id="mobile-menu"
          className="fixed inset-x-0 bottom-0 top-16 z-50 overflow-y-auto border-t border-bone/10 bg-background lg:hidden"
        >
          <div className="mx-auto flex min-h-full max-w-7xl flex-col px-6 pb-10 pt-4">
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

            <Link
              to="/wholesale"
              hash="inquiry"
              className="mt-8 bg-primary px-6 py-4 text-center text-sm font-semibold uppercase tracking-wider text-primary-foreground transition-colors hover:bg-gold-light"
            >
              Start a wholesale inquiry
            </Link>
            <div className="mt-8 flex flex-wrap gap-x-6 gap-y-3 font-mono text-[11px] uppercase tracking-[0.2em] text-smoke">
              {SOCIALS.map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="transition-colors hover:text-bone"
                >
                  {s.label} ↗
                </a>
              ))}
            </div>
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
      <div className="mx-auto grid max-w-7xl gap-10 px-6 py-14 md:grid-cols-4">
        <div>
          <img
            src={uzasLogo}
            alt="UZAS Sports"
            className="h-24 w-auto"
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
          <ul className="space-y-2 text-sm text-smoke">
            {SOCIALS.map((s) => (
              <li key={s.label}>
                <a
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="transition-colors hover:text-bone"
                >
                  {s.label}
                </a>
              </li>
            ))}
            <li>
              <a href="mailto:info@uzassports.com" className="transition-colors hover:text-bone">
                info@uzassports.com
              </a>
            </li>
          </ul>
        </div>
      </div>
      <div className="border-t border-bone/10">
        <div className="mx-auto flex max-w-7xl flex-col gap-2 px-6 py-6 md:flex-row md:items-center md:justify-between">
          <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-smoke">
            In-house manufacturing · Any quantity · Worldwide shipping
          </p>
          <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-smoke">
            © 2026 Uzas Sports
          </p>
        </div>
      </div>
    </footer>
  );
}
