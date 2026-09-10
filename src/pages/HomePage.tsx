import StarCanvas from "../components/StarCanvas";

export default function HomePage() {
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
          <div>
            <p className="text-3xl md:text-5xl text-white font-bold tracking-tight leading-[1.1]">
              Yale&rsquo;s Student
              <br />
              Product &amp; Design Studio
            </p>
            <div className="mt-6 max-w-2xl space-y-4 text-base md:text-lg text-white/75 leading-relaxed">
              <p>
                DFA Studio is Yale&rsquo;s student-led product and design studio,
                bringing together students across 15+ disciplines. We pair
                technical, design, and business sense with a lot of drive &mdash;
                learning by doing real work, from idea &rarr; prototype &rarr;
                launch.
              </p>
              <p>
                Semesterly client projects, workshops, speaker events,
                mentorship, and community nights.
              </p>
              <p className="text-white font-bold">
                Join a community of builders and creatives today!
              </p>
            </div>
          </div>
          <div className="md:justify-self-end">
            <a
              href="https://dfastudio.notion.site/"
              target="_blank"
              rel="noreferrer"
              className="group inline-flex items-center gap-3 text-white hover:text-white text-2xl md:text-4xl font-bold tracking-tight transition-[color,transform] duration-150 ease-swift active:scale-[0.98]"
            >
              <span>Apply now</span>
              <svg
                viewBox="0 0 24 24"
                aria-hidden="true"
                className="w-7 h-7 md:w-9 md:h-9 shrink-0 transition-transform duration-150 ease-swift group-hover:translate-x-1 group-hover:-translate-y-1"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.75"
              >
                <path d="M7 17 17 7" />
                <path d="M8 7h9v9" />
              </svg>
            </a>
            <p className="mt-3 text-sm md:text-base text-white/70">
              Applications are open &middot; sprint details inside
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
