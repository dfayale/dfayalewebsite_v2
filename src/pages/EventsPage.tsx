import PastEventsGallery from "../components/PastEventsGallery";

export default function EventsPage() {
  return (
    <>
      {/* --- Upcoming Events (Luma) --- */}
      <section className="relative bg-[#F8F8F8] px-8 md:px-16 lg:px-24 pt-24 md:pt-28 pb-24">
        <div className="max-w-[1600px] mx-auto grid md:grid-cols-[1fr_1.8fr] gap-10 md:gap-16 items-start">
          <div>
            <h2 className="text-3xl md:text-5xl font-bold tracking-tight text-dfa-ink">
              Upcoming Events
            </h2>
            <a
              href="https://luma.com/dfastudio"
              target="_blank"
              rel="noreferrer"
              className="group mt-6 inline-flex items-center gap-3 text-dfa-ink/70 hover:text-dfa-ink text-xl md:text-3xl font-normal tracking-tight transition-[color,transform] duration-150 ease-swift active:scale-[0.98]"
            >
              <span>Subscribe</span>
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
            </a>
          </div>
          <iframe
            src="https://luma.com/embed/calendar/cal-kbROjJmhgKG0Nix/events"
            title="DFA Studio upcoming events calendar"
            className="w-full h-[380px] md:h-[420px] border border-dfa-ink/15 bg-white"
            allowFullScreen
          ></iframe>
        </div>
      </section>

      {/* --- Past Events --- */}
      <section className="relative bg-dfa-paper px-8 md:px-16 lg:px-24 pt-20 md:pt-28 pb-32 md:pb-44">
        <div className="max-w-[1600px] mx-auto">
          <PastEventsGallery />
        </div>
      </section>
    </>
  );
}
