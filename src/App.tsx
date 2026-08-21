import { useEffect, useState } from "react";
import Cursor from "./components/Cursor";
import Nav from "./components/Nav";
import Footer from "./components/Footer";
import HomePage from "./pages/HomePage";
import AboutPage from "./pages/AboutPage";
import EventsPage from "./pages/EventsPage";
import TeamPage from "./pages/TeamPage";
import ApplyPage from "./pages/ApplyPage";

export type Page = "home" | "about" | "events" | "team" | "apply";

const pageFromHash = (): Page => {
  const hash = window.location.hash.replace(/^#\/?/, "");
  return (
    ["about", "events", "team", "apply"].includes(hash) ? hash : "home"
  ) as Page;
};

export default function App() {
  const [page, setPage] = useState<Page>(pageFromHash);

  useEffect(() => {
    const onHashChange = () => {
      setPage(pageFromHash());
      window.scrollTo(0, 0);
    };
    window.addEventListener("hashchange", onHashChange);
    return () => window.removeEventListener("hashchange", onHashChange);
  }, []);

  const navigate = (next: Page) => {
    window.location.hash = next === "home" ? "/" : `/${next}`;
  };

  return (
    <div className="min-h-screen w-full bg-dfa-paper font-sans text-dfa-ink overflow-x-clip">
      <Nav page={page} onNavigate={navigate} />
      {/*
        Page content rides above the footer so the footer can sit pinned
        behind it and be revealed as the last section scrolls away.
      */}
      <div key={page} className="animate-page-in relative z-10 bg-dfa-paper">
        {page === "home" && <HomePage onNavigate={navigate} />}
        {page === "about" && <AboutPage onNavigate={navigate} />}
        {page === "events" && <EventsPage />}
        {page === "team" && <TeamPage />}
        {page === "apply" && <ApplyPage />}
      </div>
      {/* The home page ends on the blue band — no footer there */}
      {page !== "home" && <Footer />}
      <Cursor />
    </div>
  );
}
