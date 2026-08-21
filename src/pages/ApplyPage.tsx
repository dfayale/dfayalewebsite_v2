import { useState } from "react";
import SprintCalendar from "../components/SprintCalendar";
import imgDfam from "../assets/DFAm.JPG";

const steps = [
  {
    title: "Info Sessions",
    description: "Come hear who we are, what we build, and how the sprint runs.",
  },
  {
    title: "Design Sprint",
    description: "One week, one prompt, build.",
  },
  {
    title: "Short Written Application",
    description: "A very mini written statement about why DFA, why you.",
  },
];

const faqs: Array<{
  question: string;
  answer?: string;
  list?: string[];
}> = [
  {
    question: "Who are you looking for?",
    list: [
      "People who are curious about how products are made",
      "People who notice friction and want to fix it",
      "People who can think creatively, communicate clearly, and follow through",
      "People excited to collaborate across design, tech, business and beyond",
    ],
  },
  {
    question: "Do I need experience?",
    answer:
      "Not at all! And honestly, you probably already have more than you think (interviewing people, doing research, messing around with code or design, making art, planning an event) — it all counts. We care way more about how you approach the sprint — your curiosity, how you work with others, how you handle a problem you've never seen before — than anything on your résumé.",
  },
  {
    question: "Can I use AI?",
    answer:
      "Yes — in fact we encourage it! AI is a tool, and knowing how to use it well is a real skill in product. Use it to research, sketch ideas, write code, whatever helps you move. The one thing we ask: the thinking and the decisions should be yours. We want to see how you approach the prompt — AI can help you get there, but it shouldn't be the one doing the sprint for you. Be ready to talk through your choices and you're golden.",
  },
  {
    question: "What if I can't commit the full week?",
    answer:
      "Totally okay. We know you're a full-time student with a life! The sprint is designed to be flexible, and you won't be sitting in sessions the whole week. If you're pairing with someone, just communicate early so you can plan around each other's schedules. As long as you can show up for the key moments (launch + deliver) and put in real effort during the week, you're good. If you're worried about a specific conflict, just email us.",
  },
  {
    question: "How are you evaluating this?",
    answer:
      "We're looking at your process way more than a polished final product: how you approach the problem, how you collaborate, how you push through when something's hard, and how you tell the story of what you made. You don't need it to be perfect — show us how you think and we'll be thrilled. That said, we'll provide more concrete details on what to include so you won't feel lost ;)",
  },
];

export default function ApplyPage() {
  /* Accordion: only one answer open at a time */
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  return (
    <>
      {/* --- Intro --- */}
      <section className="relative overflow-hidden bg-white px-8 md:px-16 lg:px-24 pt-32 md:pt-44 pb-28 md:pb-40">
        {/* Anchored to the bottom, runs off the bottom and right edges */}
        <img
          src={imgDfam}
          alt="DFAm"
          className="hidden md:block absolute -bottom-16 -right-12 lg:-right-16 w-[50vw] max-w-[880px] h-auto opacity-60 grayscale hover:opacity-100 hover:grayscale-0 transition-[opacity,filter] duration-300 ease-swift"
        />
        <div className="relative z-10 max-w-[1600px] mx-auto">
          <h1 className="text-4xl md:text-6xl font-bold tracking-tight text-dfa-ink mb-10">
            F26 Application Hub
          </h1>
          <div className="flex flex-wrap items-center gap-x-5 gap-y-3">
            <div className="flex items-center gap-3">
              {/* Live status dot */}
              <span className="relative flex w-3 h-3 shrink-0" aria-hidden="true">
                <span className="absolute inset-0 rounded-full bg-red-500 opacity-75 animate-ping motion-reduce:animate-none" />
                <span className="relative w-3 h-3 rounded-full bg-red-500" />
              </span>
              <span className="text-lg md:text-2xl text-dfa-ink/80 leading-snug">
                opening 09/10
              </span>
            </div>
            <span
              className="hidden sm:block w-px h-6 bg-dfa-ink/20"
              aria-hidden="true"
            />
            <a
              href="https://luma.com/dfastudio"
              target="_blank"
              rel="noreferrer"
              className="group inline-flex items-center gap-2 text-lg md:text-2xl text-dfa-ink/70 hover:text-dfa-ink leading-snug transition-[color,transform] duration-150 ease-swift active:scale-[0.98]"
            >
              <span>get notified</span>
              <svg
                viewBox="0 0 24 24"
                aria-hidden="true"
                className="w-5 h-5 md:w-6 md:h-6 shrink-0 transition-transform duration-150 ease-swift group-hover:translate-x-1 group-hover:-translate-y-1"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.75"
              >
                <path d="M7 17 17 7" />
                <path d="M8 7h9v9" />
              </svg>
            </a>
          </div>
        </div>
      </section>

      {/* --- How it works --- */}
      <section className="relative bg-dfa-paper px-8 md:px-16 lg:px-24 pt-24 md:pt-32 pb-12 md:pb-16">
        <div className="max-w-[1600px] mx-auto grid md:grid-cols-[1fr_1.5fr] gap-10 md:gap-16 items-start">
          <h2 className="text-3xl md:text-5xl font-bold tracking-tight text-dfa-ink">
            How it works
          </h2>
          <ol className="space-y-8">
            {steps.map((step, i) => (
              <li key={step.title} className="flex gap-6 items-baseline">
                <span className="text-2xl md:text-4xl font-bold text-dfa-blue-light tabular-nums shrink-0">
                  {i + 1}
                </span>
                <div>
                  <h3 className="text-xl md:text-2xl font-bold tracking-tight text-dfa-ink">
                    {step.title}
                  </h3>
                  <p className="mt-2 text-base md:text-lg text-dfa-ink/70 leading-snug">
                    {step.description}
                  </p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* --- Pre-save the dates --- */}
      <section className="relative bg-dfa-paper px-8 md:px-16 lg:px-24 pt-12 md:pt-16 pb-24 md:pb-32">
        <div className="max-w-[1600px] mx-auto">
          <div className="flex flex-wrap items-baseline justify-between gap-x-10 gap-y-4 mb-10">
            <h2 className="text-3xl md:text-5xl font-bold tracking-tight text-dfa-ink">
              Pre-save the dates
            </h2>
            <a
              href="https://luma.com/dfastudio"
              target="_blank"
              rel="noreferrer"
              className="group inline-flex items-center gap-3 text-dfa-ink/70 hover:text-dfa-ink text-xl md:text-3xl font-normal tracking-tight transition-[color,transform] duration-150 ease-swift active:scale-[0.98]"
            >
              <span>get notified</span>
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
          <SprintCalendar />
        </div>
      </section>

      {/* --- Design Sprint --- */}
      <section className="relative bg-white px-8 md:px-16 lg:px-24 pt-24 md:pt-32 pb-24 md:pb-32">
        <div className="max-w-[1600px] mx-auto">
          <h2 className="text-3xl md:text-5xl font-bold tracking-tight text-dfa-ink mb-10">
            What is a Design Sprint?
          </h2>

          <div className="max-w-4xl border-l-4 border-dfa-blue pl-6 md:pl-8 space-y-5 text-lg md:text-2xl text-dfa-ink/80 leading-snug">
            <p>
              We&rsquo;re cooking up our{" "}
              <strong className="font-bold text-dfa-ink">
                week-long Design Sprint
              </strong>
              : a real product challenge, with real building and prototyping. No
              experience needed, just curiosity and hustle to show us what
              you&rsquo;re made of! &#128153;
            </p>
            <p>
              The full prompt, teams, and details drop at our{" "}
              <strong className="font-bold text-dfa-ink">
                Launch Event 09/10
              </strong>
            </p>
          </div>
        </div>
      </section>

      {/* --- FAQs --- */}
      <section className="relative bg-dfa-paper px-8 md:px-16 lg:px-24 pt-24 md:pt-32 pb-24 md:pb-32">
        <div className="max-w-[1600px] mx-auto">
          <h2 className="text-3xl md:text-5xl font-bold tracking-tight text-dfa-ink mb-10">
            FAQs
          </h2>
          <div className="border-t border-dfa-ink/15">
            {faqs.map((faq, i) => (
              <details
                key={faq.question}
                open={openFaq === i}
                className="group border-b border-dfa-ink/15"
              >
                <summary
                  onClick={(e) => {
                    e.preventDefault();
                    setOpenFaq(openFaq === i ? null : i);
                  }}
                  className="flex items-center justify-between gap-6 py-5 cursor-pointer list-none text-lg md:text-xl font-bold tracking-tight text-dfa-ink hover:text-dfa-blue transition-colors duration-150"
                >
                  <span>{faq.question}</span>
                  <svg
                    viewBox="0 0 24 24"
                    aria-hidden="true"
                    className="w-6 h-6 shrink-0 transition-transform duration-200 ease-swift group-open:rotate-45"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.75"
                  >
                    <path d="M12 5v14" />
                    <path d="M5 12h14" />
                  </svg>
                </summary>
                {faq.answer && (
                  <p className="max-w-4xl pb-7 pr-10 text-base md:text-lg text-dfa-ink/70 leading-relaxed">
                    {faq.answer}
                  </p>
                )}
                {faq.list && (
                  <ul className="max-w-4xl pb-7 pr-10 space-y-3 text-base md:text-lg text-dfa-ink/70 leading-relaxed">
                    {faq.list.map((item) => (
                      <li key={item} className="flex gap-3">
                        <span
                          className="text-dfa-blue-light shrink-0"
                          aria-hidden="true"
                        >
                          &mdash;
                        </span>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                )}
              </details>
            ))}
          </div>

          <p className="mt-16 text-base md:text-lg text-dfa-ink/60 italic">
            Questions? Email{" "}
            <a
              href="mailto:yale@designforamerica.com"
              className="font-bold text-dfa-blue hover:text-dfa-blue-light transition-colors not-italic"
            >
              yale@designforamerica.com
            </a>
          </p>
        </div>
      </section>
    </>
  );
}
