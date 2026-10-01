import { Facebook, Instagram, Linkedin } from "lucide-react";
import { SOCIALS } from "@/lib/site-data";

export function WhatsAppIcon({ className = "h-5 w-5" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden="true" fill="none">
      <path
        d="M3.6 20.4l1.2-4.1A8.6 8.6 0 1 1 8 19.3l-4.4 1.1z"
        stroke="currentColor"
        strokeWidth="1.9"
        strokeLinejoin="round"
      />
      <path
        d="M9.1 7.9c.25-.4.7-.5 1-.25l1.05 1.45c.2.3.15.65-.1.9l-.5.5c.45.95 1.25 1.75 2.2 2.2l.5-.5c.25-.25.6-.3.9-.1l1.45 1.05c.3.25.3.7-.05 1-.65.7-1.6 1-2.5.7-2.05-.7-3.7-2.35-4.4-4.4-.25-.85-.05-1.75.45-2.55z"
        fill="currentColor"
      />
    </svg>
  );
}

const ICONS = {
  instagram: Instagram,
  facebook: Facebook,
  linkedin: Linkedin,
} as const;

export function SocialIcon({ name, className = "h-5 w-5" }: { name: string; className?: string }) {
  if (name === "whatsapp") return <WhatsAppIcon className={className} />;
  const Icon = ICONS[name as keyof typeof ICONS];
  return Icon ? <Icon className={className} strokeWidth={1.9} aria-hidden="true" /> : null;
}

/** Row of round social buttons with brand-coloured hover */
export function SocialRow({ className = "" }: { className?: string }) {
  const hover: Record<string, string> = {
    instagram: "hover:border-[#e1306c] hover:bg-[#e1306c] hover:text-white",
    facebook: "hover:border-[#1877f2] hover:bg-[#1877f2] hover:text-white",
    linkedin: "hover:border-[#0a66c2] hover:bg-[#0a66c2] hover:text-white",
    whatsapp: "hover:border-[#25d366] hover:bg-[#25d366] hover:text-white",
  };
  return (
    <div className={`flex flex-wrap gap-3 ${className}`}>
      {SOCIALS.map((s) => (
        <a
          key={s.label}
          href={s.href}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={`Uzas Sports on ${s.label}`}
          title={s.label}
          className={`grid h-11 w-11 place-items-center rounded-full border border-bone/20 text-bone transition-all duration-300 hover:-translate-y-0.5 ${hover[s.icon]}`}
        >
          <SocialIcon name={s.icon} />
        </a>
      ))}
    </div>
  );
}
