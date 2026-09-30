import { forwardRef, useEffect, useImperativeHandle, useRef } from "react";

// Google reCAPTCHA v2 ("I'm not a robot" checkbox), dark theme to match the site.
// Site key comes from the VITE_RECAPTCHA_SITE_KEY build variable; when it's not set the
// widget renders nothing and the server skips verification (see src/lib/forms.server.ts).
export const RECAPTCHA_SITE_KEY: string = import.meta.env["VITE_RECAPTCHA_SITE_KEY"] ?? "";

type Grecaptcha = {
  render: (el: HTMLElement, opts: Record<string, unknown>) => number;
  reset: (id?: number) => void;
};
declare global {
  interface Window {
    grecaptcha?: Grecaptcha & { ready?: (cb: () => void) => void };
    __uzasRecaptchaLoaded?: () => void;
  }
}

let scriptPromise: Promise<void> | null = null;
function loadScript(): Promise<void> {
  if (typeof window === "undefined") return Promise.resolve();
  if (window.grecaptcha?.render) return Promise.resolve();
  scriptPromise ??= new Promise((resolve) => {
    window.__uzasRecaptchaLoaded = () => resolve();
    const s = document.createElement("script");
    s.src = "https://www.google.com/recaptcha/api.js?onload=__uzasRecaptchaLoaded&render=explicit";
    s.async = true;
    s.defer = true;
    document.head.appendChild(s);
  });
  return scriptPromise;
}

export type RecaptchaHandle = { reset: () => void };

export const Recaptcha = forwardRef<RecaptchaHandle, { onChange: (token: string) => void }>(
  function Recaptcha({ onChange }, ref) {
    const el = useRef<HTMLDivElement>(null);
    const widgetId = useRef<number | null>(null);
    const cb = useRef(onChange);
    cb.current = onChange;

    useImperativeHandle(ref, () => ({
      reset() {
        if (widgetId.current !== null) window.grecaptcha?.reset(widgetId.current);
        cb.current("");
      },
    }));

    useEffect(() => {
      if (!RECAPTCHA_SITE_KEY) return;
      let cancelled = false;
      loadScript().then(() => {
        if (cancelled || !el.current || widgetId.current !== null || !window.grecaptcha) return;
        widgetId.current = window.grecaptcha.render(el.current, {
          sitekey: RECAPTCHA_SITE_KEY,
          theme: "dark",
          callback: (token: string) => cb.current(token),
          "expired-callback": () => cb.current(""),
          "error-callback": () => cb.current(""),
        });
      });
      return () => {
        cancelled = true;
      };
    }, []);

    if (!RECAPTCHA_SITE_KEY) return null;
    return <div ref={el} className="min-h-[78px]" />;
  },
);

/** True when the form can be submitted as far as the captcha is concerned. */
export const captchaReady = (token: string) => !RECAPTCHA_SITE_KEY || token.length > 0;
