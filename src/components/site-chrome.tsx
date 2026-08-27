import { Link } from "@tanstack/react-router";
import { useState } from "react";
import { CATEGORIES, SOCIALS } from "@/lib/site-data";

export function SiteHeader() {
  const [open, setOpen] = useState(false);

  return (
    <nav className="sticky top-0 z-40 border-b border-bone/10 bg-background/85 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6">
        <Link
          to="/"
          className="font-display text-2xl leading-none tracking-tight text-bone"
        >
          UZAS<span className="text-crimson">.</span>
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
          <Link to="/studio" className="text-crimson transition-colors hover:text-bone">
            AI Studio
          </Link>
        </div>

        <Link
          to="/contact"
          className="border border-bone/30 px-4 py-2 font-mono text-[11px] uppercase tracking-[0.2em] text-bone transition-colors hover:border-crimson hover:bg-crimson hover:text-primary-foreground"
        >
          Contact
        </Link>
      </div>
    </nav>
  );
}

export function SiteFooter() {
  return (
    <footer className="border-t border-bone/10 bg-background">
      <div className="mx-auto grid max-w-7xl gap-10 px-6 py-14 md:grid-cols-4">
        <div>
          <span className="font-display text-2xl tracking-tight text-bone">
            UZAS<span className="text-crimson">.</span> SPORTS
          </span>
          <p className="mt-3 max-w-[30ch] text-sm text-smoke">
            Manufacturer of sportswear, combat sports gear, gloves and patches.
            Established 2005 — Sialkot, Pakistan.
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
            <li><Link to="/about" className="transition-colors hover:text-bone">About the factory</Link></li>
            <li><Link to="/catalogues" className="transition-colors hover:text-bone">Catalogues</Link></li>
            <li><Link to="/wholesale" className="transition-colors hover:text-bone">For gyms & academies</Link></li>
            <li><Link to="/studio" className="transition-colors hover:text-bone">AI mockup studio</Link></li>
            <li><Link to="/contact" className="transition-colors hover:text-bone">Contact</Link></li>
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
