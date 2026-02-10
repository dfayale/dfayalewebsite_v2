import React from "react";
import svgPaths from "../imports/svg-afjt7qfqcj";
import imgRing from "../assets/14fc81b44105a3a3564ff22e1b185c6a3d297d63.png"; // Using the clean chrome ring
import imgLogoPart from "../assets/46efdca27ebd5f275f1dc1eb280f00664f4fab52.png";
import imgFooterLogo from "../assets/46efdca27ebd5f275f1dc1eb280f00664f4fab52.png";

export default function ProStudioPage({
  onNavigate,
}: {
  onNavigate: (page: "home" | "pro-studio") => void;
}) {
  return (
    <div className="min-h-screen bg-black text-white font-sans selection:bg-blue-500 selection:text-white overflow-x-hidden">
      {/* Navigation */}
      <nav className="bg-white text-black py-4 px-6 md:px-12 flex items-center justify-between sticky top-0 z-50 shadow-md">
        <div
          className="flex items-center gap-3 cursor-pointer"
          onClick={() => onNavigate("home")}
        >
          <div className="relative w-10 h-10 flex-shrink-0">
            <img
              src={imgLogoPart}
              alt="DFA Logo"
              className="w-full h-full object-contain"
            />
          </div>
          <div className="leading-tight flex flex-col justify-center">
            <div className="flex items-baseline gap-1">
              <span className="font-bold text-xl tracking-tight">DFA</span>
              <span className="font-serif italic font-bold text-xl">
                Pro Studio
              </span>
            </div>
            <span className="text-[10px] uppercase font-bold tracking-widest text-slate-500">
              Design Studio at Yale
            </span>
          </div>
        </div>

        <div className="hidden md:flex items-center gap-8 font-bold text-sm">
          <button
            onClick={() => onNavigate("home")}
            className="hover:text-blue-600 transition-colors uppercase tracking-wide"
          >
            Work
          </button>
          <button
            onClick={() => onNavigate("home")}
            className="hover:text-blue-600 transition-colors uppercase tracking-wide"
          >
            Community
          </button>
          <button className="text-blue-600 uppercase tracking-wide">
            Pro Studio
          </button>
          <button
            onClick={() => onNavigate("home")}
            className="hover:text-blue-600 transition-colors uppercase tracking-wide"
          >
            Get Involved
          </button>
        </div>
      </nav>

      {/* Hero Section */}
      <main className="relative max-w-7xl mx-auto px-6 py-20 min-h-[85vh] flex flex-col md:flex-row items-center justify-center overflow-visible">
        {/* Ring Image */}
        {/* Positioned absolutely on desktop to match the offset look */}
        <div className="absolute top-1/2 left-[-30%] md:left-[-25%] w-[100%] md:w-[80%] -translate-y-1/2 pointer-events-none opacity-100 mix-blend-screen z-0">
          <img
            src={imgRing}
            alt="Abstract Ring"
            className="w-full h-full object-contain scale-125 md:scale-150"
          />
        </div>

        {/* Content */}
        <div className="relative z-10 w-full md:w-1/2 ml-auto text-right flex flex-col items-end pt-32 md:pt-0">
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-8 leading-tight">
            DFA Pro Studio <br />
            at Yale University
          </h1>
          <p className="text-lg md:text-xl text-slate-300 max-w-xl mb-16 leading-relaxed font-medium">
            Preprofessional arm where students collaborate with external
            companies to explore early stage product features using the DFA
            design process
          </p>

          {/* Tags / Pills */}
          <div className="flex flex-wrap justify-end items-center gap-4 relative w-full">
            {/* Connecting Line - visual only */}
            <div className="hidden md:block absolute top-1/2 right-10 w-[60%] h-[2px] bg-white/30 -z-10 translate-y-[1px]"></div>

            <div className="bg-white text-black px-6 py-3 rounded-full font-bold text-sm md:text-base border-2 border-transparent">
              User Research
            </div>
            <div className="bg-[#4b3ecf] text-white px-6 py-3 rounded-full font-bold text-sm md:text-base shadow-[0_0_20px_rgba(75,62,207,0.6)] border-2 border-[#5b4edf]">
              Product Design
            </div>
            <div className="bg-white text-black px-6 py-3 rounded-full font-bold text-sm md:text-base border-2 border-transparent">
              HCI
            </div>
          </div>
        </div>
      </main>

      {/* Coming Soon */}
      <section className="py-32 text-center relative z-10">
        <h2 className="text-2xl md:text-4xl font-bold tracking-wide">
          More Details coming soon...
        </h2>
      </section>

      {/* Footer */}
      <footer className="py-24 text-center relative overflow-hidden bg-black z-10">
        <div className="flex flex-col items-center justify-center gap-6 mb-8">
          <img src={imgFooterLogo} alt="DFA Logo" className="w-20 h-auto" />
        </div>

        <p className="font-bold text-xl mb-2">Made with love by DFAm</p>
        <p className="text-slate-400 mb-12 text-sm">
          For partnership & inquires, email yale@designforamerica.com
        </p>

        <div className="flex justify-center gap-6">
          {/* Icons */}
          {/* Instagram */}
          <a
            href="https://www.instagram.com/dfayale"
            className="w-12 h-12 bg-white rounded-md flex items-center justify-center text-black hover:bg-slate-200 transition-colors"
          >
            <svg
              viewBox="0 0 48 48"
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              strokeWidth="4"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d={svgPaths.p186bba00} />
            </svg>
          </a>
          {/* LinkedIn */}
          <a
            href="https://www.linkedin.com/company/dfayale/"
            className="w-12 h-12 bg-white rounded-md flex items-center justify-center text-black hover:bg-slate-200 transition-colors"
          >
            <svg
              viewBox="0 0 48 48"
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              strokeWidth="4"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d={svgPaths.p61aa000} />
              <path d="M12 18H4V42H12V18Z" />
              <path d={svgPaths.p245eb100} />
            </svg>
          </a>
          {/* Email */}
          <a
            href="mailto:yale@designforamerica.com"
            className="w-12 h-12 bg-white rounded-md flex items-center justify-center text-black hover:bg-slate-200 transition-colors"
          >
            <svg
              viewBox="0 0 24 24"
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <rect x="3" y="5" width="18" height="14" rx="2" ry="2" />
              <path d="M3 7l9 6 9-6" />
            </svg>
          </a>
          {/* Linktree */}
          <a
            href="https://linktr.ee/dfayale"
            className="w-12 h-12 bg-white rounded-md flex items-center justify-center text-black hover:bg-slate-200 transition-colors"
          >
            <svg viewBox="0 0 55 55" className="w-6 h-6" fill="currentColor">
              <path d={svgPaths.p347dcb00} />
            </svg>
          </a>
        </div>
      </footer>
    </div>
  );
}
