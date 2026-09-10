import { useEffect, useRef, useState } from "react";
import ClientMarquee from "../components/ClientMarquee";
import imgBoard from "../assets/board-web.jpg";
import iHeartYale from "../assets/stickers/i-heart-yale.png";
import stickerDfa from "../assets/stickers/sticker3.png";
import type { Page } from "../App";
import PillarCard from "../components/PillarCard";
import imgBuild from "../assets/build.jpg";
import imgLearn from "../assets/learn.jpg";
import imgCommunity from "../assets/community.jpg";
import logoIdeo from "../assets/63135bb0059bbfdd98cfd9be_612ce412d73e5000b3391506_5e00dc7dab5c151ca7dc92c2_Folie1.png";
import logoGoogle from "../assets/google-6.svg";
import logoMeta from "../assets/meta-3.svg";
import logoIbm from "../assets/ibm.svg";
import logoSpotify from "../assets/spotify-logo.svg";
import logoFrog from "../assets/frog-Cap-Invent-logo.svg";
import logoMcKinsey from "../assets/McKinsey & Company_idXaAYJuer_0.svg";
import logoNyt from "../assets/The_New_York_Times_logo.png";

const pillars = [
  {
    title: "Build",
    description: "Real products for real clients",
    image: imgBuild,
    /* Bunched in the middle before the section scrolls in */
    closed: "md:translate-x-[calc(100%+3.5rem)] md:-rotate-6 md:scale-95",
    z: "z-10",
  },
  {
    title: "Learn",
    description: "Exclusive workshops, speakers, and tools",
    image: imgLearn,
    closed: "",
    z: "z-20",
  },
  {
    title: "Community",
    description: "DFAm of designers, engineers, artists, and more",
    image: imgCommunity,
    closed: "md:translate-x-[calc(-100%-3.5rem)] md:rotate-6 md:scale-95",
    z: "z-10",
  },
];

const alumniLogos = [
  { name: "Google", src: logoGoogle },
  { name: "IDEO", src: logoIdeo },
  { name: "Meta", src: logoMeta },
  { name: "IBM", src: logoIbm },
  { name: "Spotify", src: logoSpotify },
  { name: "Frog Design", src: logoFrog },
  { name: "McKinsey & Co", src: logoMcKinsey },
  { name: "The New York Times", src: logoNyt },
];

export default function AboutPage({
  onNavigate,
}: {
  onNavigate: (page: Page) => void;
}) {
  const pillarsRef = useRef<HTMLDivElement>(null);
  const [pillarsOpen, setPillarsOpen] = useState(false);

  useEffect(() => {
    const el = pillarsRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setPillarsOpen(true);
          observer.disconnect();
        }
      },
      { threshold: 0.35 },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <>
      {/* --- Intro --- */}
      <section className="relative bg-white px-8 md:px-16 lg:px-24 pt-32 md:pt-44 pb-28 md:pb-40">
        <div className="max-w-[1600px] mx-auto">
          <h1 className="text-4xl md:text-6xl font-bold tracking-tight text-dfa-ink mb-10">
            What is DFA Studio?
          </h1>
          <div className="max-w-4xl space-y-6 text-lg md:text-2xl text-dfa-ink/80 leading-snug">
            <p>
              DFA Studio is{" "}
              <strong className="font-bold text-dfa-ink">
                Yale&rsquo;s student-led product and design studio
              </strong>{" "}
              for students across 10+ disciplines who want to design and build!
              We bring
              together technical sense, design sense, business sense, and a lot
              of drive to help students learn by doing real work: from idea
              &rarr; prototype &rarr; launch.
            </p>
            <p>
              We run semesterly client project, workshops and exclusive speaker
              events, mentorship, and obvi fun studio nights and social events
              (a roblox game night or two)
            </p>
          </div>
        </div>
      </section>

      {/* --- Clients & Collaborators --- */}
      <section
        className="relative bg-dfa-paper pt-24 md:pt-32 pb-32 md:pb-44"
        aria-label="Clients and collaborators"
      >
        <ClientMarquee />
      </section>

      {/* --- Three Pillars --- */}
      <section
        className="relative bg-dfa-paper px-8 md:px-16 lg:px-24 pb-32 md:pb-44"
        aria-label="Our three pillars"
      >
        <div className="max-w-[1280px] mx-auto">
          <div ref={pillarsRef} className="grid md:grid-cols-3 gap-8 md:gap-14">
            {pillars.map((pillar) => (
              <div
                key={pillar.title}
                className={`relative ${pillar.z} transition-[translate,rotate,scale,opacity] duration-[900ms] ease-swift motion-reduce:transition-none motion-reduce:translate-none motion-reduce:rotate-none motion-reduce:scale-none ${
                  pillarsOpen
                    ? "opacity-100"
                    : `opacity-0 translate-y-6 md:opacity-100 md:translate-y-0 ${pillar.closed}`
                }`}
              >
                <PillarCard
                  title={pillar.title}
                  description={pillar.description}
                  image={pillar.image}
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* --- Board --- */}
      <section className="relative bg-dfa-paper px-8 md:px-16 lg:px-24 pt-4 md:pt-8 pb-32 md:pb-44">
        <div className="max-w-[1600px] mx-auto grid md:grid-cols-[1fr_1.5fr] gap-12 md:gap-16 items-center">
          <div>
            <h2 className="text-3xl md:text-5xl font-bold tracking-tight text-dfa-ink">
              Meet DFAm
            </h2>
            <button
              onClick={() => onNavigate("team")}
              className="group mt-6 inline-flex items-center gap-3 text-dfa-ink/70 hover:text-dfa-ink text-xl md:text-3xl font-normal tracking-tight transition-[color,transform] duration-150 ease-swift active:scale-[0.98]"
            >
              <span>full team</span>
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

          <div className="relative">
            <img
              src={imgBoard}
              alt="The DFA Studio board"
              className="w-full h-auto object-cover"
            />
            {/* Stickers slapped on the corners of the print */}
            <div
              className="sticker absolute -left-8 md:-left-20 bottom-6 md:bottom-10 w-24 md:w-40 pointer-events-none"
              style={{ rotate: "-13deg" }}
            >
              <img src={iHeartYale} alt="" className="w-full h-auto" />
            </div>
            <div
              className="sticker absolute -right-6 md:-right-14 -top-6 md:-top-10 w-20 md:w-32 pointer-events-none"
              style={{ rotate: "11deg" }}
            >
              <img src={stickerDfa} alt="" className="w-full h-auto" />
            </div>
          </div>
        </div>
      </section>

      {/* --- Alumni --- */}
      <section className="relative bg-dfa-paper px-8 md:px-16 lg:px-24 pb-32 md:pb-44">
        <div className="max-w-[1600px] mx-auto">
          <h2 className="text-xl md:text-3xl font-bold tracking-tight text-dfa-ink text-center mb-10">
            Where Our Alumni Are Now
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-px bg-dfa-ink/15 border border-dfa-ink/15">
            {alumniLogos.map(({ name, src }) => (
              <div
                key={name}
                className="flex items-center justify-center h-28 md:h-36 bg-dfa-paper"
                title={name}
              >
                <img
                  src={src}
                  alt={name}
                  className="h-8 md:h-10 max-w-[120px] object-contain opacity-60 grayscale hover:opacity-100 hover:grayscale-0 transition-[opacity,filter] duration-200"
                />
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
