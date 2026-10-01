import { Moon, Sun } from "lucide-react";
import { useEffect, useState } from "react";

const KEY = "uzas-theme";

// Runs in <head> before the page paints so a saved light theme never flashes dark first
export const THEME_BOOT_SCRIPT = `try{if(localStorage.getItem("${KEY}")==="light")document.documentElement.classList.add("light")}catch(e){}`;

export function ThemeToggle({ className = "" }: { className?: string }) {
  const [light, setLight] = useState(false);
  useEffect(() => setLight(document.documentElement.classList.contains("light")), []);

  function toggle() {
    const root = document.documentElement;
    const next = !light;
    root.classList.add("theme-anim");
    root.classList.toggle("light", next);
    window.setTimeout(() => root.classList.remove("theme-anim"), 400);
    try {
      localStorage.setItem(KEY, next ? "light" : "dark");
    } catch {
      /* storage blocked: theme still switches for this visit */
    }
    const meta = document.querySelector('meta[name="theme-color"]');
    meta?.setAttribute("content", next ? "#FAF8F2" : "#0A0A0A");
    setLight(next);
  }

  return (
    <button
      type="button"
      onClick={toggle}
      aria-label={light ? "Switch to dark mode" : "Switch to light mode"}
      title={light ? "Dark mode" : "Light mode"}
      className={`group relative grid h-10 w-10 place-items-center overflow-hidden rounded-full border border-bone/25 text-bone transition-all duration-300 hover:border-gold hover:text-gold hover:shadow-[0_0_18px_-4px_var(--gold)] ${className}`}
    >
      <Sun
        className={`absolute h-[18px] w-[18px] transition-all duration-500 ${light ? "translate-y-0 rotate-0 opacity-100" : "translate-y-6 rotate-90 opacity-0"}`}
      />
      <Moon
        className={`absolute h-[18px] w-[18px] transition-all duration-500 ${light ? "-translate-y-6 -rotate-90 opacity-0" : "translate-y-0 rotate-0 opacity-100"}`}
      />
    </button>
  );
}
