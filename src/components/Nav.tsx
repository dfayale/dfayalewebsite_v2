import { useEffect, useState } from "react";
import type { Page } from "../App";

const links: Array<{ id: Page; label: string }> = [
  { id: "about", label: "About" },
  { id: "events", label: "Events" },
];

export default function Nav({
  page,
  onNavigate,
}: {
  page: Page;
  onNavigate: (page: Page) => void;
}) {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () =>
      setScrolled(window.scrollY > window.innerHeight - 120);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // On subpages there is no hero to scroll past — show the wordmark right away
  const showWordmark = page !== "home" || scrolled;

  return (
    <nav
      className={`fixed top-0 inset-x-0 z-50 transition-[background-color,backdrop-filter] duration-300 ${
        showWordmark
          ? "bg-white/15 backdrop-blur-md backdrop-saturate-150"
          : "bg-transparent"
      }`}
    >
      <div className="max-w-[1600px] mx-auto px-5 md:px-10 h-16 flex items-center justify-between">
        <button
          onClick={() => onNavigate("home")}
          aria-label="DFA Studio home"
          tabIndex={showWordmark ? 0 : -1}
          className={`font-bold text-base md:text-lg uppercase tracking-tight text-dfa-ink transition-[opacity,transform] duration-300 ease-swift ${
            showWordmark
              ? "opacity-100 translate-y-0"
              : "opacity-0 -translate-y-2 pointer-events-none"
          }`}
        >
          DFA Studio
        </button>

        <div className="flex items-center gap-5 md:gap-9">
          {links.map((link) => (
            <button
              key={link.id}
              onClick={() => onNavigate(link.id)}
              className="py-2 text-sm md:text-lg font-bold uppercase tracking-[0.02em] text-dfa-ink hover:text-dfa-blue-light transition-colors duration-150"
            >
              {/* Border on the text itself so the rule hugs the baseline */}
              <span
                className={`border-b-2 pb-px transition-colors duration-150 ${
                  page === link.id ? "border-dfa-ink" : "border-transparent"
                }`}
              >
                {link.label}
              </span>
            </button>
          ))}
          <button
            onClick={() => onNavigate("apply")}
            className="py-2 text-sm md:text-lg font-bold uppercase tracking-[0.02em] whitespace-nowrap text-dfa-blue hover:text-dfa-blue-light transition-colors duration-150"
          >
            <span
              className={`border-b-2 pb-px transition-colors duration-150 ${
                page === "apply" ? "border-dfa-blue" : "border-transparent"
              }`}
            >
              Apply
            </span>
          </button>
        </div>
      </div>
    </nav>
  );
}
