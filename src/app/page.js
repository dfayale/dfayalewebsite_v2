"use client";

import { useEffect, useState } from "react";

export default function Home() {
  const finalPhrase = "Great things are coming";
  const [typed, setTyped] = useState("");

  useEffect(() => {
    const typeDelay = 80; // ms per character while typing
    const pauseBeforeBack = 900; // pause after full phrase
    const backDelay = 55; // ms per character while deleting

    const timeouts = [];

    // Type forward
    for (let i = 1; i <= finalPhrase.length; i++) {
      timeouts.push(
        setTimeout(() => setTyped(finalPhrase.slice(0, i)), i * typeDelay)
      );
    }

    const afterType = finalPhrase.length * typeDelay + pauseBeforeBack;

    // Backspace
    for (let i = finalPhrase.length - 1; i >= 0; i--) {
      const step = finalPhrase.length - i;
      timeouts.push(
        setTimeout(() => setTyped(finalPhrase.slice(0, i)), afterType + step * backDelay)
      );
    }

    // After animation completes, show final phrase again for readability
    const total = afterType + finalPhrase.length * backDelay + 300;
    timeouts.push(
      setTimeout(() => setTyped(finalPhrase), total)
    );

    return () => {
      timeouts.forEach(clearTimeout);
    };
  }, []);
  return (
    <div className="relative min-h-screen overflow-hidden bg-[var(--background)] text-[var(--foreground)]">
      {/* Ambient animated background */}
      <div aria-hidden className="pointer-events-none absolute inset-0 bg-ominous" />
      <div aria-hidden className="pointer-events-none absolute inset-0 scanlines mix-blend-overlay opacity-20" />
      <div aria-hidden className="pointer-events-none absolute inset-0 vignette" />
      <div aria-hidden className="pointer-events-none absolute -top-24 -left-24 size-[60vmax] orb orb-purple" />
      <div aria-hidden className="pointer-events-none absolute -bottom-32 -right-16 size-[45vmax] orb orb-blue [animation-delay:700ms]" />

      {/* Content */}
      <main className="relative z-10 flex min-h-screen flex-col items-center justify-center px-6 text-center">
        <div className="mb-8 text-xs uppercase tracking-[0.35em] opacity-70">DFA Yale</div>
        <h1 className="text-pretty text-5xl sm:text-6xl md:text-7xl font-semibold tracking-tight">
          {typed}
          <span aria-hidden className="ml-2 inline-block caret blink">_</span>
        </h1>
        <p className="mt-6 max-w-xl text-balance text-sm sm:text-base opacity-80">
          A whole new experience is on the way. We’re crafting something a little different—stay tuned!
        </p>

        <div className="mt-10 flex items-center gap-4 opacity-90">
          <span className="h-px w-12 bg-current/40" />
          <span className="text-xs uppercase tracking-widest">Coming soon</span>
          <span className="h-px w-12 bg-current/40" />
        </div>
      </main>
    </div>
  );
}
