import { useState } from "react";
import { Dialog, DialogContent, DialogDescription, DialogTitle } from "@/components/ui/dialog";
import logoAlibaba from "@/assets/partners/logo-alibaba.png";
import logoScci from "@/assets/partners/logo-scci.png";
import logoAsic from "@/assets/partners/logo-asic.png";
import logoFbr from "@/assets/partners/logo-fbr.png";
import logoEcrep from "@/assets/partners/logo-ecrep.png";
import certScci from "@/assets/partners/cert-scci.jpg";
import certAsic from "@/assets/partners/cert-asic.jpg";
import certEcrep from "@/assets/partners/cert-ecrep.jpg";

// Memberships and registrations shown in the lower footer. Logos and certificates come from the
// last page of our catalogues. Items without a certificate only show their name on hover.
// Logos are transparent with a thin white outline so they read the same in dark and light mode.
type Partner = { name: string; detail: string; logo: string; cert?: string };
const PARTNERS: Partner[] = [
  {
    name: "Alibaba Premium Supplier",
    detail: "Premium supplier on Alibaba.com",
    logo: logoAlibaba,
  },
  {
    name: "Sialkot Chamber of Commerce & Industry",
    detail: "Membership certificate",
    logo: logoScci,
    cert: certScci,
  },
  {
    name: "ASIC registered (Australia)",
    detail: "Business name details, Australian Securities & Investments Commission",
    logo: logoAsic,
    cert: certAsic,
  },
  { name: "FBR Pakistan", detail: "Registered with the Federal Board of Revenue", logo: logoFbr },
  {
    name: "EC REP",
    detail: "Certificate of EU Authorised Representative",
    logo: logoEcrep,
    cert: certEcrep,
  },
];

export function PartnerStrip() {
  const [open, setOpen] = useState<Partner | null>(null);
  return (
    <>
      <ul
        aria-label="Registered and certified"
        className="flex flex-wrap items-center gap-x-4 gap-y-3"
      >
        {PARTNERS.map((p, i) => {
          const inner = (
            <>
              <img src={p.logo} alt={p.name} loading="lazy" className="h-8 w-auto md:h-9" />
              <span className="partner-tip" role="tooltip">
                <strong className="block text-[11px] text-bone">{p.name}</strong>
                <span className="block text-[10px] normal-case tracking-normal text-smoke">
                  {p.cert ? "Click to view certificate" : p.detail}
                </span>
              </span>
            </>
          );
          const style = { animationDelay: `${i * 0.7}s` };
          return (
            <li key={p.name}>
              {p.cert ? (
                <button
                  type="button"
                  onClick={() => setOpen(p)}
                  aria-label={`${p.name}: view certificate`}
                  className="partner-logo"
                  style={style}
                >
                  {inner}
                </button>
              ) : (
                <span
                  tabIndex={0}
                  aria-label={`${p.name}. ${p.detail}`}
                  className="partner-logo"
                  style={style}
                >
                  {inner}
                </span>
              )}
            </li>
          );
        })}
      </ul>

      <Dialog open={!!open} onOpenChange={(v) => !v && setOpen(null)}>
        <DialogContent className="max-h-[92vh] max-w-3xl overflow-y-auto border-bone/15 bg-background p-4 sm:p-6">
          <DialogTitle className="pr-8 font-mono text-xs uppercase tracking-[0.2em] text-bone">
            {open?.name}
          </DialogTitle>
          <DialogDescription className="text-xs text-smoke">{open?.detail}</DialogDescription>
          {open?.cert && (
            <img
              src={open.cert}
              alt={`${open.name} certificate`}
              className="mt-2 w-full border border-bone/10 bg-white"
            />
          )}
        </DialogContent>
      </Dialog>
    </>
  );
}
