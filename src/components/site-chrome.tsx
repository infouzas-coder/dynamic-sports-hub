import { Link } from "@tanstack/react-router";

export function SiteHeader() {
  return (
    <nav className="sticky top-0 z-40 border-b border-bone/10 bg-background/85 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6">
        <Link
          to="/"
          className="font-display text-2xl leading-none tracking-tight text-bone"
        >
          UZAS<span className="text-crimson">.</span>
        </Link>
        <div className="hidden items-center gap-9 font-mono text-[11px] uppercase tracking-[0.22em] text-smoke md:flex">
          <a href="/#products" className="transition-colors hover:text-bone">
            Products
          </a>
          <a href="/#process" className="transition-colors hover:text-bone">
            Process
          </a>
          <a href="/#terms" className="transition-colors hover:text-bone">
            Why Uzas
          </a>
          <Link
            to="/studio"
            className="text-crimson transition-colors hover:text-bone"
          >
            AI Studio
          </Link>
        </div>
        <Link
          to="/studio"
          className="border border-bone/30 px-4 py-2 font-mono text-[11px] uppercase tracking-[0.2em] text-bone transition-colors hover:border-crimson hover:bg-crimson hover:text-primary-foreground"
        >
          Get a quote
        </Link>
      </div>
    </nav>
  );
}

export function SiteFooter() {
  return (
    <footer className="border-t border-bone/10 bg-background">
      <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-4 px-6 py-10 md:flex-row">
        <span className="font-display text-xl tracking-tight text-bone">
          UZAS<span className="text-crimson">.</span> SPORTS
        </span>
        <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-smoke">
          In-house manufacturer · Any quantity · Scratch to finish
        </p>
        <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-smoke">
          © 2026 Uzas Sports
        </p>
      </div>
    </footer>
  );
}
