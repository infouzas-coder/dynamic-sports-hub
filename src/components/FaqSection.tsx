import { Reveal } from "@/components/Reveal";
import { ORDER_FAQS } from "@/lib/site-data";

export const faqJsonLd = (faqs = ORDER_FAQS) => ({
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: faqs.map((f) => ({
    "@type": "Question",
    name: f.q,
    acceptedAnswer: { "@type": "Answer", text: f.a },
  })),
});

/** Visible buyer FAQ. Pair with faqJsonLd() in the route head so the markup matches what is shown. */
export function FaqSection({ faqs = ORDER_FAQS, className = "bg-background" }) {
  return (
    <section className={`border-t border-bone/10 py-20 ${className}`}>
      <div className="mx-auto max-w-4xl px-6">
        <Reveal>
          <p className="mb-3 font-mono text-[11px] uppercase tracking-[0.3em] text-crimson">
            Before you order
          </p>
          <h2 className="font-display text-4xl leading-[0.95] tracking-tight text-bone md:text-5xl">
            COMMON QUESTIONS
          </h2>
        </Reveal>
        <div className="mt-10 divide-y divide-bone/10 border-y border-bone/10">
          {faqs.map((f, i) => (
            <Reveal key={f.q} delay={i * 50}>
              <details className="group py-5" open={i === 0}>
                <summary className="flex cursor-pointer list-none items-center justify-between gap-6 font-display text-xl text-bone transition-colors hover:text-gold md:text-2xl">
                  {f.q}
                  <span className="grid h-8 w-8 shrink-0 -skew-x-6 place-items-center border border-gold/50 text-gold transition-transform duration-300 group-open:rotate-45">
                    +
                  </span>
                </summary>
                <p className="mt-3 max-w-[65ch] text-base text-smoke">{f.a}</p>
              </details>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
