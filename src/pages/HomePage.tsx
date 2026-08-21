import StarCanvas from "../components/StarCanvas";
import type { Page } from "../App";

export default function HomePage({
  onNavigate,
}: {
  onNavigate: (page: Page) => void;
}) {
  return (
    <>
      {/*
        The star is pinned for the life of the page (negative margin keeps it
        from taking up layout height); the wordmark and every section below
        scroll up over it.
      */}
      <div className="sticky top-0 z-10 h-[100svh] -mb-[100svh] pointer-events-none">
        <div className="absolute inset-x-0 top-0 bottom-[4vw] pointer-events-auto touch-pan-y">
          <StarCanvas />
        </div>
      </div>

      {/* --- Hero: wordmark scrolls away beneath the star --- */}
      <header className="relative z-0 h-[100svh] min-h-[560px] bg-white overflow-hidden">
        {/* Wordmark pinned to the bottom, edge to edge */}
        <h1
          className="animate-wordmark-in absolute bottom-[-0.04em] left-0 right-0 text-center font-bold uppercase text-dfa-ink tracking-[-0.02em] leading-[0.78] select-none whitespace-nowrap text-[15.5vw]"
          aria-label="DFA Studio"
        >
          DFA&nbsp;Studio
        </h1>
      </header>

      {/* --- Blue band --- */}
      <section className="relative z-20 bg-dfa-blue px-8 md:px-16 lg:px-24 py-24 md:py-32">
        <div className="max-w-[1600px] mx-auto grid md:grid-cols-2 gap-10 md:gap-16 items-end">
          <p className="text-3xl md:text-5xl text-white font-bold tracking-tight leading-[1.1]">
            Yale&rsquo;s Student
            <br />
            Product &amp; Design Studio
          </p>
          <div className="md:justify-self-end">
            <button
              onClick={() => onNavigate("apply")}
              className="group inline-flex items-center gap-3 text-white/90 hover:text-white text-xl md:text-3xl font-normal tracking-tight transition-[color,transform] duration-150 ease-swift active:scale-[0.98]"
            >
              <span>Apply F26</span>
              <svg
                viewBox="0 0 24 24"
                aria-hidden="true"
                className="w-6 h-6 md:w-8 md:h-8 shrink-0 transition-transform duration-150 ease-swift group-hover:translate-x-1 group-hover:-translate-y-1"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.75"
              >
                <path d="M7 17 17 7" />
                <path d="M8 7h9v9" />
              </svg>
            </button>
          </div>
        </div>
      </section>
    </>
  );
}
