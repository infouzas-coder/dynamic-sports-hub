import { WHATSAPP_URL } from "@/lib/site-data";
import { WhatsAppIcon } from "./SocialIcons";

/** Floating "Chat on WhatsApp" button, bottom-right on every page */
export function WhatsAppButton() {
  return (
    <a
      href={WHATSAPP_URL}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat with Uzas Sports on WhatsApp"
      className="group fixed bottom-5 right-5 z-40 flex items-center gap-0 rounded-full bg-[#25d366] p-3.5 text-white shadow-[0_10px_30px_-8px_rgb(37_211_102/0.7)] transition-all duration-300 hover:gap-2.5 hover:pr-5 sm:bottom-6 sm:right-6"
    >
      <span className="absolute inset-0 -z-10 animate-ping rounded-full bg-[#25d366] opacity-25 [animation-duration:2.4s]" />
      <WhatsAppIcon className="h-7 w-7" />
      <span className="max-w-0 overflow-hidden whitespace-nowrap font-display text-base font-semibold uppercase tracking-wide transition-all duration-300 group-hover:max-w-40">
        Chat with us
      </span>
    </a>
  );
}
