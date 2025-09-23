import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Analytics } from "@vercel/analytics/next";
import Navbar from "./components/navbar";
import Footer from "./components/footer";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: {
    default: "DFA Yale | Design for America at Yale",
    template: "%s | DFA Yale",
  },
  description:
    "Design for America at Yale: student-led human-centered design studio creating social impact through interdisciplinary collaboration.",
  keywords: [
    "Design for America",
    "Yale",
    "human-centered design",
    "social impact",
    "student organization",
  ],
  openGraph: {
    title: "DFA Yale | Human-Centered Design at Yale",
    description:
      "We empower students to tackle social challenges through human-centered design projects with real community partners.",
    url: "https://dfayale.org",
    siteName: "DFA Yale",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "DFA Yale",
    description:
      "Human-centered design studio at Yale creating social impact through student projects.",
  },
  icons: {
    icon: "/favicon.ico",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="scroll-smooth">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased min-h-screen flex flex-col bg-gradient-to-b from-white to-slate-50 dark:from-neutral-900 dark:to-neutral-950`}
      >
        <Navbar />
        <main className="flex-1" id="main-content">
          {children}
        </main>
        <Footer />
        <Analytics />
      </body>
    </html>
  );
}
