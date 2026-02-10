import React from "react";
import imgDfaHeaderLogo from "../assets/e5731f83cab627ec39480198cb839983f187bf76.png";

export default function ComingSoonPage({
  onNavigate,
}: {
  onNavigate: (page: "home" | "pro-studio" | "coming-soon") => void;
}) {
  return (
    <div className="min-h-screen bg-[#1f3449] text-white font-sans flex flex-col">
      <nav className="bg-white/90 backdrop-blur-md text-slate-900 py-4 px-6 md:px-12 flex items-center justify-between shadow-sm">
        <button
          className="flex items-center gap-3"
          onClick={() => onNavigate("home")}
        >
          <img
            src={imgDfaHeaderLogo}
            alt="DFA Logo"
            className="w-10 h-10 object-contain"
          />
          <div className="leading-tight text-left">
            <div className="font-bold text-lg">Design for America at Yale</div>
            <div className="text-xs text-slate-500 font-medium tracking-wide">
              Design Studio & Community
            </div>
          </div>
        </button>
        <button
          className="px-4 py-2 bg-slate-900 text-white rounded-full font-medium hover:bg-slate-700 transition-colors"
          onClick={() => onNavigate("home")}
        >
          Back to Home
        </button>
      </nav>

      <main className="flex-1 flex items-center justify-center px-6">
        <div className="text-center max-w-2xl">
          <p className="uppercase tracking-[0.35em] text-blue-300 text-xs font-bold mb-4">
            Coming Soon
          </p>
          <h1 className="text-4xl md:text-6xl font-bold mb-4">
            We’re polishing this page.
          </h1>
          <p className="text-lg md:text-xl text-slate-200 mb-10">
            Thanks for your patience — more details will be available shortly.
          </p>
          <button
            className="px-8 py-4 bg-white text-slate-900 rounded-full font-bold hover:bg-blue-50 transition-transform hover:scale-105"
            onClick={() => onNavigate("home")}
          >
            Return Home
          </button>
        </div>
      </main>
    </div>
  );
}
