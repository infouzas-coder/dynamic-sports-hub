import { useCallback, useEffect } from "react";

// Google reCAPTCHA v3 — invisible. The script scores each visitor in the background and we request
// a token at submit time; the server verifies it and rejects low scores (src/lib/forms.server.ts).
// Site key comes from the VITE_RECAPTCHA_SITE_KEY build variable; when it's not set nothing loads
// and the server skips verification.
export const RECAPTCHA_SITE_KEY: string = import.meta.env["VITE_RECAPTCHA_SITE_KEY"] ?? "";

type GrecaptchaV3 = {
  ready: (cb: () => void) => void;
  execute: (siteKey: string, opts: { action: string }) => Promise<string>;
};
declare global {
  interface Window {
    grecaptcha?: GrecaptchaV3;
  }
}

let scriptPromise: Promise<void> | null = null;
function loadScript(): Promise<void> {
  if (typeof window === "undefined" || !RECAPTCHA_SITE_KEY) return Promise.resolve();
  scriptPromise ??= new Promise((resolve, reject) => {
    const s = document.createElement("script");
    s.src = `https://www.google.com/recaptcha/api.js?render=${encodeURIComponent(RECAPTCHA_SITE_KEY)}`;
    s.async = true;
    s.defer = true;
    s.onload = () => window.grecaptcha?.ready(() => resolve());
    s.onerror = () => {
      scriptPromise = null;
      reject(new Error("Couldn't load the spam check. Please turn off ad-blockers for this site and try again."));
    };
    document.head.appendChild(s);
  });
  return scriptPromise;
}

/**
 * Loads reCAPTCHA v3 on the page and returns getToken(action), which resolves to a fresh token
 * (or "" when reCAPTCHA isn't configured). Tokens expire after 2 minutes, so call it on submit.
 */
export function useRecaptcha() {
  useEffect(() => {
    loadScript().catch(() => {});
  }, []);

  return useCallback(async (action: string) => {
    if (!RECAPTCHA_SITE_KEY) return "";
    await loadScript();
    return window.grecaptcha!.execute(RECAPTCHA_SITE_KEY, { action });
  }, []);
}

/** Google requires this notice when the floating reCAPTCHA badge is hidden (see styles.css). */
export function RecaptchaNotice({ className = "" }: { className?: string }) {
  if (!RECAPTCHA_SITE_KEY) return null;
  return (
    <p className={`text-[11px] leading-relaxed text-smoke/80 ${className}`}>
      Protected by reCAPTCHA. The Google{" "}
      <a href="https://policies.google.com/privacy" target="_blank" rel="noopener noreferrer" className="underline hover:text-bone">
        Privacy Policy
      </a>{" "}
      and{" "}
      <a href="https://policies.google.com/terms" target="_blank" rel="noopener noreferrer" className="underline hover:text-bone">
        Terms of Service
      </a>{" "}
      apply.
    </p>
  );
}
