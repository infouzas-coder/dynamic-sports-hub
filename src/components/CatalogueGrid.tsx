import { Link } from "@tanstack/react-router";
import { ArrowRight, FileText } from "lucide-react";
import { useState } from "react";
import { Reveal } from "@/components/Reveal";
import { catalogueProducts } from "@/lib/catalogue-products";
import type { Category } from "@/lib/site-data";

const INITIAL = 8;

/** Product cards with real catalogue photos, plus a quick link to the full PDF catalogue */
export function CatalogueGrid({ category }: { category: Category }) {
  const all = catalogueProducts(category.slug);
  const [showAll, setShowAll] = useState(false);
  const items = showAll ? all : all.slice(0, INITIAL);

  return (
    <section id="products" className="scroll-mt-32 bg-coal py-16 md:py-20 lg:scroll-mt-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <Reveal>
          <div className="flex flex-wrap items-end justify-between gap-4">
            <div>
              <p className="mb-3 font-mono text-[11px] uppercase tracking-[0.3em] text-crimson">
                From our catalogue
              </p>
              <h2 className="font-display text-4xl leading-[0.95] tracking-tight text-bone md:text-5xl">
                {category.name.toUpperCase()}
              </h2>
              <p className="mt-3 max-w-[60ch] text-sm text-smoke">
                {all.length} products from our {category.name.toLowerCase()} catalogue. Every one
                can be made in your colours, sizes and branding.
              </p>
            </div>
            <a
              href={category.pdf}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-ghost btn-sm"
            >
              <FileText className="h-4 w-4" /> Full catalogue (PDF)
            </a>
          </div>
        </Reveal>

        <div className="mt-8 grid grid-cols-2 gap-3 sm:gap-4 md:grid-cols-3 lg:grid-cols-4">
          {items.map((p) => (
            <Link
              key={p.code}
              to="/contact"
              className="cat-card group flex flex-col overflow-hidden border border-bone/10 bg-background transition-all duration-300 hover:-translate-y-1 hover:border-gold/60"
            >
              <div className="aspect-square overflow-hidden bg-white">
                <img
                  src={p.image}
                  alt={`${p.name}, Uzas Sports article ${p.code}`}
                  loading="lazy"
                  width={640}
                  height={640}
                  className="h-full w-full object-contain p-2 transition-transform duration-500 group-hover:scale-105"
                />
              </div>
              <div className="flex flex-1 flex-col p-3 sm:p-4">
                <h3 className="font-display text-base leading-tight text-bone sm:text-lg">
                  {p.name}
                </h3>
                <p className="mt-1 font-mono text-[10px] uppercase tracking-[0.18em] text-smoke">
                  Art. {p.code}
                </p>
                <span className="mt-auto inline-flex items-center gap-1 pt-3 font-mono text-[10px] uppercase tracking-[0.18em] text-gold">
                  Get a quote{" "}
                  <ArrowRight className="h-3 w-3 transition-transform group-hover:translate-x-1" />
                </span>
              </div>
            </Link>
          ))}
        </div>

        {all.length > INITIAL && (
          <div className="mt-8 flex justify-center">
            <button
              type="button"
              onClick={() => setShowAll((v) => !v)}
              className="btn btn-ghost btn-sm"
            >
              {showAll ? "Show fewer" : `Show all ${all.length} products`}
            </button>
          </div>
        )}
      </div>
    </section>
  );
}
