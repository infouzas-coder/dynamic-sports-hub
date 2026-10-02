import { Link } from "@tanstack/react-router";
import { FileText, MessageCircle } from "lucide-react";
import { useEffect, useState } from "react";

const LABELS = [
  { text: "Get a quote", Icon: FileText },
  { text: "Contact us", Icon: MessageCircle },
] as const;

/** Header button that alternates "Get a quote" / "Contact us" with a gold flash on each change */
export function RotatingCta({ className = "" }: { className?: string }) {
  const [i, setI] = useState(0);
  useEffect(() => {
    const id = window.setInterval(() => setI((v) => (v + 1) % LABELS.length), 3200);
    return () => window.clearInterval(id);
  }, []);
  const { text, Icon } = LABELS[i]!;
  return (
    <Link
      to="/contact"
      aria-label="Get a quote or contact us"
      className={`btn btn-gold btn-sm cta-rotate ${className}`}
    >
      <span key={`flash-${i}`} className="cta-flash" aria-hidden="true" />
      <span key={i} className="cta-rotate-inner">
        <Icon className="h-4 w-4 shrink-0" strokeWidth={2.4} aria-hidden="true" />
        {text}
      </span>
    </Link>
  );
}
