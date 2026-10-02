import { ArrowUpRight, ShieldCheck } from "lucide-react";
import { ALIBABA_URL } from "@/lib/site-data";

// "Alibaba Premium Supplier" trust badge linking to our Alibaba store
export function AlibabaBadge({ className = "" }: { className?: string }) {
  return (
    <a
      href={ALIBABA_URL}
      target="_blank"
      rel="noopener noreferrer"
      title="See UZAS Sports on Alibaba"
      className={`group inline-flex items-center gap-3 border border-gold/50 bg-background/60 px-4 py-2.5 backdrop-blur transition-colors hover:border-gold hover:bg-gold/10 ${className}`}
    >
      <ShieldCheck className="h-6 w-6 shrink-0 text-gold" strokeWidth={2} />
      <span className="leading-tight">
        <span className="block font-mono text-[10px] uppercase tracking-[0.22em] text-smoke">
          Alibaba
        </span>
        <span className="block font-mono text-[12px] font-semibold uppercase tracking-[0.16em] text-bone">
          Premium Supplier
        </span>
      </span>
      <ArrowUpRight className="h-4 w-4 text-gold transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
    </a>
  );
}
