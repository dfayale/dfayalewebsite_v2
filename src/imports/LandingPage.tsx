import React, { useState, useEffect } from "react";
import heic2any from "heic2any";
import { Instagram, Linkedin, Mail } from "lucide-react";
import imgRectangle6 from "../assets/8a422a85905442d01ff9c8145d5e0fc290a802bd.png";
import imgBoardPhotoshoot1 from "../assets/ffeb47a09533130cdc2895dbc6a985c87e87ffae.png";
import imgChromeRing from "../assets/14fc81b44105a3a3564ff22e1b185c6a3d297d63.png";
import imgDfaLogo from "../assets/d07af5e9b6d28faad2812d4cef674d40807934e6.png";
import imgDfaHeaderLogo from "../assets/e5731f83cab627ec39480198cb839983f187bf76.png";
import imgEventCard from "../assets/fe8eb4892c77866d59179faff9a17510b32333bf.png";
import logoIdeo from "../assets/63135bb0059bbfdd98cfd9be_612ce412d73e5000b3391506_5e00dc7dab5c151ca7dc92c2_Folie1.png";
import logoGoogle from "../assets/google-6.svg";
import logoMeta from "../assets/meta-3.svg";
import logoIbm from "../assets/ibm.svg";
import logoSpotify from "../assets/spotify-logo.svg";
import logoFrog from "../assets/frog-Cap-Invent-logo.svg";
import logoMcKinsey from "../assets/McKinsey & Company_idXaAYJuer_0.svg";
import logoNyt from "../assets/The_New_York_Times_logo.png";
import svgPathsTeam from "./svg-0i18wol5vg";
import svgPathsEvents from "./svg-l2jgvjvvmn";
import svgPathsHighlights from "./svg-afjt7qfqcj";
import ProStudioPage from "../components/ProStudioPage";
import ComingSoonPage from "../components/ComingSoonPage";
import {
  fetchEventsFromNotion,
  NotionEvent,
  formatDate,
  fetchMembersFromNotion,
  NotionMember,
} from "../utils/notionApi";

// --- Components ---

const SectionHeading = ({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) => (
  <h2
    className={`text-4xl md:text-5xl font-bold text-slate-900 text-center mb-12 ${className}`}
  >
    {children}
  </h2>
);

const ValueCard = ({
  title,
  description,
}: {
  title: string;
  description: string;
}) => (
  <div className="flex flex-col md:flex-row gap-8 items-start max-w-4xl mx-auto mb-16">
    <h3 className="text-2xl md:text-3xl font-bold text-slate-400 min-w-[300px] md:text-right shrink-0">
      {title}
    </h3>
    <p className="text-lg md:text-xl font-light text-slate-800 leading-relaxed">
      {description}
    </p>
  </div>
);

const MemberCard = ({
  name,
  major,
  role,
  coverImage,
}: {
  name: string;
  major: string;
  role: string;
  coverImage?: string;
}) => (
  <MemberCardBody
    name={name}
    major={major}
    role={role}
    coverImage={coverImage}
  />
);

const MemberCardBody = ({
  name,
  major,
  role,
  coverImage,
}: {
  name: string;
  major: string;
  role: string;
  coverImage?: string;
}) => {
  const [resolvedImage, setResolvedImage] = useState<string | undefined>(
    coverImage,
  );

  useEffect(() => {
    setResolvedImage(coverImage);
  }, [coverImage]);

  useEffect(() => {
    let isMounted = true;
    let objectUrl: string | undefined;

    const convertHeic = async () => {
      if (!coverImage) return;
      const isHeic = /\.(heic|heif)$/i.test(coverImage.split("?")[0]);
      if (!isHeic) return;

      try {
        const response = await fetch(coverImage);
        const blob = await response.blob();
        const converted = await heic2any({
          blob,
          toType: "image/jpeg",
          quality: 0.9,
        });
        const convertedBlob = Array.isArray(converted)
          ? converted[0]
          : converted;
        objectUrl = URL.createObjectURL(convertedBlob as Blob);
        if (isMounted) {
          setResolvedImage(objectUrl);
        }
      } catch (error) {
        if (isMounted) {
          setResolvedImage(coverImage);
        }
      }
    };

    convertHeic();

    return () => {
      isMounted = false;
      if (objectUrl) {
        URL.revokeObjectURL(objectUrl);
      }
    };
  }, [coverImage]);

  return (
    <div className="flex flex-col items-center text-center group">
      <div className="w-full aspect-square bg-slate-200 rounded-2xl mb-4 transition-transform duration-300 group-hover:-translate-y-1 overflow-hidden">
        {resolvedImage ? (
          <img
            src={resolvedImage}
            alt={name}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          />
        ) : (
          /* Placeholder for member image */
          <div className="w-full h-full bg-slate-300/50 relative">
            <div className="absolute inset-0 flex items-center justify-center opacity-20 text-slate-500">
              <svg
                className="w-12 h-12"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1}
                  d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                />
              </svg>
            </div>
          </div>
        )}
      </div>
      <h4 className="font-bold text-slate-900 text-lg leading-tight mb-1">
        {name}
      </h4>
      <p className="text-sm text-slate-600 mb-1 h-10 flex items-center justify-center leading-tight px-2">
        {major}
      </p>
      <p className="text-xs font-bold text-blue-500 uppercase tracking-wider">
        {role}
      </p>
    </div>
  );
};

const fallbackBoardMembers: Array<{
  name: string;
  major: string;
  role: string;
}> = [];
const fallbackStudioMembers: Array<{
  name: string;
  major: string;
  role: string;
}> = [];

const events = [
  {
    title: "Unilever Speaker Event",
    host: "Chief R&D Officer Jason Harcup",
    description: "Join us for speaker session with Jason Harcup from Unilever!",
    image: imgEventCard,
  },
  {
    title: "Intro to Figma Workshop",
    host: "Hosted by Presidents & Richa",
    description: "Learn the basics of Figma with our presidents!",
    image: imgEventCard,
  },
  {
    title: "Autodesk Blender Workshop",
    host: "Hosted by Mandy!",
    description: "Dive into 3D modeling with Blender.",
    image: imgEventCard,
  },
  {
    title: "Branding 101 w/ Adobe",
    host: "Hosted by Mandy",
    description: "Explore the fundamentals of branding with Adobe tools.",
    image: imgEventCard,
  },
  {
    title: "Roblox Study Break",
    host: "Hosted by DFA Board",
    description: "Take a break and build with us in Roblox.",
    image: imgEventCard,
  },
  {
    title: "Self Branding 101",
    host: "Hosted by DFA Board",
    description: "Learn how to build your personal brand.",
    image: imgEventCard,
  },
];

const EventCard = ({ event }: { event: NotionEvent | any }) => {
  // Handle both Notion events and legacy events
  const title = event.title || event.name || "Event";
  const host = event.host || event.subtitle || "";
  const description = event.description || "";
  const image = event.image || imgEventCard;
  const location = event.location || "";
  const date = event.date ? formatDate(event.date) : "";

  return (
    <div className="bg-white rounded-2xl overflow-hidden border border-slate-200 shadow-sm hover:shadow-md transition-shadow flex flex-col h-full">
      <div className="p-4 flex items-center gap-3 border-b border-slate-100">
        <div className="flex-1 min-w-0">
          <h4
            className="font-bold text-slate-900 text-lg leading-tight truncate"
            title={title}
          >
            {title}
          </h4>
          <p className="text-sm text-slate-500 truncate" title={host}>
            {host}
          </p>
        </div>
        <button className="text-slate-400 hover:text-slate-600 shrink-0">
          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
            <path d="M10 6a2 2 0 110-4 2 2 0 010 4zM10 12a2 2 0 110-4 2 2 0 010 4zM10 18a2 2 0 110-4 2 2 0 010 4z" />
          </svg>
        </button>
      </div>
      <div className="h-48 bg-slate-100 relative shrink-0">
        {image ? (
          <img src={image} alt={title} className="w-full h-full object-cover" />
        ) : (
          <div className="w-full h-full flex items-center justify-center bg-slate-200 text-slate-400">
            No image
          </div>
        )}
      </div>
      <div className="p-6 flex flex-col flex-1">
        <div className="text-sm text-slate-500 mb-4 space-y-1">
          {location && (
            <p>
              <span className="font-semibold">Location:</span> {location}
            </p>
          )}
          {date && (
            <p>
              <span className="font-semibold">Time:</span> {date}
            </p>
          )}
        </div>
        <p className="text-slate-700 text-sm mt-auto">{description}</p>
      </div>
    </div>
  );
};

export default function LandingPage() {
  const [currentPage, setCurrentPage] = useState<
    "home" | "pro-studio" | "coming-soon"
  >("home");
  const [activeTab, setActiveTab] = useState<"team" | "events">("team");
  const [notionEvents, setNotionEvents] = useState<NotionEvent[]>([]);
  const [isLoadingEvents, setIsLoadingEvents] = useState(true);
  const [notionMembers, setNotionMembers] = useState<NotionMember[]>([]);
  const [isLoadingMembers, setIsLoadingMembers] = useState(true);
  const [newsletterEmail, setNewsletterEmail] = useState("");
  const [newsletterStatus, setNewsletterStatus] = useState<
    "idle" | "loading" | "success" | "error"
  >("idle");
  const [newsletterMessage, setNewsletterMessage] = useState("");

  const MEMBERS_DATABASE_ID = "239145b63a1f81f690f4e7267863055c";

  const handleNewsletterSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setNewsletterStatus("loading");
    setNewsletterMessage("");

    try {
      const response = await fetch("/api/mailchimp/subscribe", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: newsletterEmail,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        setNewsletterStatus("error");
        setNewsletterMessage(
          data.error || "Failed to subscribe. Please try again.",
        );
        return;
      }

      setNewsletterStatus("success");
      setNewsletterMessage(data.message || "Thanks for subscribing!");
      setNewsletterEmail("");
    } catch (error) {
      setNewsletterStatus("error");
      setNewsletterMessage("Oops! Something went wrong. Please try again.");
    }
  };

  useEffect(() => {
    const loadEvents = async () => {
      console.log("Loading events from Notion...");
      try {
        const fetchedEvents = await fetchEventsFromNotion();
        console.log("Loaded", fetchedEvents.length, "events from Notion");
        setNotionEvents(fetchedEvents);
      } catch (error) {
        console.error("Failed to load events from Notion:", error);
      } finally {
        setIsLoadingEvents(false);
      }
    };

    loadEvents();
  }, []);

  useEffect(() => {
    const loadMembers = async () => {
      console.log("Loading members from Notion...");
      try {
        const fetchedMembers =
          await fetchMembersFromNotion(MEMBERS_DATABASE_ID);
        console.log("Loaded", fetchedMembers.length, "members from Notion");
        setNotionMembers(fetchedMembers);
      } catch (error) {
        console.error("Failed to load members from Notion:", error);
      } finally {
        setIsLoadingMembers(false);
      }
    };

    loadMembers();
  }, []);

  // Use Notion events if available, otherwise fall back to hardcoded events
  const displayEvents = notionEvents.length > 0 ? notionEvents : events;

  const eventsByYear = displayEvents.reduce(
    (acc: Record<string, Array<NotionEvent | any>>, event) => {
      const parsedYear = event.date ? new Date(event.date).getFullYear() : NaN;
      const yearLabel = Number.isFinite(parsedYear)
        ? String(parsedYear)
        : "Upcoming";
      if (!acc[yearLabel]) acc[yearLabel] = [];
      acc[yearLabel].push(event);
      return acc;
    },
    {},
  );

  const sortedEventYears = Object.keys(eventsByYear).sort((a, b) => {
    if (a === "Upcoming") return 1;
    if (b === "Upcoming") return -1;
    return Number(b) - Number(a);
  });

  const normalizedMembers = notionMembers.map((member) => {
    const role = member.role?.trim() || "Member";
    const roleLower = role.toLowerCase();
    const isGeneralMember = roleLower === "member";

    return {
      name: member.name,
      major: member.major,
      role: isGeneralMember ? "Studio Member" : role,
      coverImage: member.coverImage,
      isGeneralMember,
    };
  });

  const boardMembers =
    normalizedMembers.length > 0
      ? normalizedMembers.filter((member) => !member.isGeneralMember)
      : fallbackBoardMembers;

  const studioMembers =
    normalizedMembers.length > 0
      ? normalizedMembers.filter((member) => member.isGeneralMember)
      : fallbackStudioMembers;

  if (currentPage === "pro-studio") {
    return <ProStudioPage onNavigate={setCurrentPage} />;
  }

  if (currentPage === "coming-soon") {
    return <ComingSoonPage onNavigate={setCurrentPage} />;
  }

  return (
    <div className="min-h-screen bg-white font-sans text-slate-900 overflow-x-hidden">
      {/* --- Navigation --- */}
      <nav className="sticky top-0 z-50 bg-white/90 backdrop-blur-md border-b border-slate-100 shadow-sm">
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          <div
            className="flex items-center gap-2 cursor-pointer"
            onClick={() => setCurrentPage("home")}
          >
            <img
              src={imgDfaHeaderLogo}
              alt="DFA Logo"
              className="w-10 h-10 object-contain"
            />
            <div className="hidden md:flex flex-col">
              <div className="leading-tight">
                <span className="font-bold text-lg">Design</span>{" "}
                <span className="italic font-serif">for</span>{" "}
                <span className="font-bold text-lg">America at Yale</span>
              </div>
              <span className="text-xs text-slate-500 font-medium tracking-wide">
                Design Studio & Community
              </span>
            </div>
          </div>

          <div className="flex items-center gap-1 md:gap-4">
            <button
              onClick={() => setCurrentPage("coming-soon")}
              className="px-4 py-2 text-lg font-bold transition-colors text-slate-800 hover:text-blue-600"
            >
              Work
            </button>
            <button
              onClick={() => {
                setCurrentPage("home");
                setTimeout(
                  () =>
                    document
                      .getElementById("community")
                      ?.scrollIntoView({ behavior: "smooth" }),
                  100,
                );
              }}
              className="px-4 py-2 text-lg font-bold transition-colors text-slate-800 hover:text-blue-600"
            >
              Community
            </button>
            <button
              onClick={() => setCurrentPage("pro-studio")}
              className="px-4 py-2 text-lg font-bold transition-colors text-slate-800 hover:text-blue-600"
            >
              Pro Studio
            </button>
            <div className="bg-slate-200 h-8 w-[1px] mx-2 hidden md:block"></div>
            <button
              onClick={() => {
                setCurrentPage("home");
                setTimeout(
                  () =>
                    document
                      .getElementById("get-involved")
                      ?.scrollIntoView({ behavior: "smooth" }),
                  100,
                );
              }}
              className="px-6 py-2 bg-slate-900 text-white rounded-full font-medium hover:bg-slate-700 transition-colors"
            >
              Get Involved
            </button>
          </div>
        </div>
      </nav>

      {/* --- Hero Section --- */}
      <header className="relative min-h-[90vh] bg-[#1f3449] flex items-center overflow-hidden">
        {/* Background Elements */}
        <div className="absolute inset-0 z-0">
          <img
            src={imgRectangle6}
            alt="Texture"
            className="w-full h-full object-cover opacity-20 mix-blend-overlay"
          />
        </div>

        <div className="absolute right-0 bottom-0 translate-x-[40%] translate-y-[50%] w-[130vh] h-[130vh] md:w-[170vh] md:h-[170vh] opacity-80 md:opacity-100 pointer-events-none animate-[spin_60s_linear_infinite]">
          <img
            src={imgChromeRing}
            alt="Abstract Ring"
            className="w-full h-full object-contain"
          />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-6 w-full grid md:grid-cols-2 gap-12 items-center">
          <div className="text-white space-y-8">
            <h1 className="text-6xl md:text-8xl font-bold tracking-tight leading-none">
              Design for <br />
              <span className="text-blue-300">America</span> <br />@ Yale
            </h1>
            <p className="text-xl md:text-2xl text-slate-300 max-w-lg leading-relaxed font-light">
              A human-centered design community and studio designing innovative
              solutions for local businesses, non-profits, and more.
            </p>
            <div className="flex flex-wrap gap-4 pt-4">
              <button
                onClick={() => setCurrentPage("coming-soon")}
                className="px-8 py-4 bg-white text-slate-900 rounded-full font-bold hover:bg-blue-50 transition-transform hover:scale-105 shadow-lg shadow-blue-900/20"
              >
                View Our Work
              </button>
              <button
                onClick={() => setCurrentPage("coming-soon")}
                className="px-8 py-4 bg-transparent border-2 border-white/20 text-white rounded-full font-bold hover:bg-white/10 transition-colors"
              >
                Learn More
              </button>
            </div>
          </div>

          {/* Right column intentionally left empty to allow the Chrome Ring to shine */}
          <div></div>
        </div>
      </header>

      {/* --- Community Section (Team / Events / Highlights) --- */}
      <section
        id="community"
        className="py-24 px-6 bg-slate-50 relative overflow-hidden"
      >
        {/* Decorations */}
        {activeTab === "team" && (
          <div className="absolute top-0 right-0 w-[300px] md:w-[600px] opacity-20 pointer-events-none translate-y-[-20%] translate-x-[20%]">
            <svg
              viewBox="0 0 598 234"
              className="w-full h-auto text-blue-400 stroke-current"
              fill="none"
              strokeWidth="5"
              strokeLinecap="round"
            >
              <path d={svgPathsTeam.p20090d00} />
            </svg>
          </div>
        )}
        {activeTab === "events" && (
          <div className="absolute top-0 right-0 w-[300px] md:w-[600px] opacity-20 pointer-events-none translate-y-[-20%] translate-x-[20%]">
            <svg
              viewBox="0 0 300 320"
              className="w-full h-auto text-blue-400 stroke-current"
              fill="none"
              strokeWidth="5"
              strokeLinecap="round"
            >
              <path d={svgPathsEvents.p1128ea00} />
            </svg>
          </div>
        )}
        {activeTab === "highlights" && null}

        <div className="max-w-7xl mx-auto relative z-10">
          {/* Header Content */}
          <div className="mb-16">
            {activeTab === "team" && (
              <div className="animate-in fade-in slide-in-from-bottom-2 duration-300">
                <h2 className="text-4xl md:text-6xl font-bold text-slate-900 mb-6">
                  Meet our team of{" "}
                  <span className="bg-blue-200/50 px-2 rounded-lg">
                    innovators.
                  </span>
                </h2>
                <p className="text-xl text-slate-600 max-w-3xl leading-relaxed font-light">
                  Our members consist of an interdisciplinary group of
                  designers, engineers, artists, and makers from 10+ majors.
                  These are the people who imagine, prototype, and build
                  everything you see. Get to know our studio, none of this would
                  be possible without them.
                </p>
              </div>
            )}
            {activeTab === "events" && (
              <div className="animate-in fade-in slide-in-from-bottom-2 duration-300">
                <h2 className="text-4xl md:text-6xl font-bold text-slate-900 mb-6">
                  Workshops, talks{" "}
                  <span className="bg-blue-200/50 px-2 rounded-lg">
                    & more.
                  </span>
                </h2>
                <p className="text-xl text-slate-600 max-w-3xl leading-relaxed font-light">
                  From hands-on workshops and speaker panels to design sprints
                  and our annual showcases, our events bring together
                  creativity, collaboration, and community. Explore what we've
                  hosted and discover opportunities to learn, build, and connect
                  with the studio.
                </p>
              </div>
            )}
            {activeTab === "highlights" && null}
          </div>

          {/* Tabs */}
          <div className="flex gap-6 md:gap-12 mb-12 border-b border-slate-200">
            {[
              { id: "team", label: "Team" },
              { id: "events", label: "Events" },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`text-xl md:text-2xl font-bold pb-2 -mb-[3px] transition-colors ${
                  activeTab === tab.id
                    ? "text-slate-900 border-b-4 border-slate-900"
                    : "text-slate-400 hover:text-slate-700 font-light"
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* Content */}
          {activeTab === "team" && (
            <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
              <div className="mb-24">
                <h3 className="text-3xl font-black text-slate-900 mb-12 text-center">
                  Board
                </h3>
                {isLoadingMembers ? (
                  <div className="text-center py-12 text-slate-500">
                    Loading members...
                  </div>
                ) : boardMembers.length === 0 ? (
                  <div className="text-center py-12 text-slate-500">
                    No board members found
                  </div>
                ) : (
                  <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-x-6 gap-y-12">
                    {boardMembers.map((member, i) => (
                      <MemberCard key={i} {...member} />
                    ))}
                  </div>
                )}
              </div>
              <div>
                <h3 className="text-3xl font-black text-slate-900 mb-12 text-center">
                  Studio Members
                </h3>
                {isLoadingMembers ? (
                  <div className="text-center py-12 text-slate-500">
                    Loading members...
                  </div>
                ) : studioMembers.length === 0 ? (
                  <div className="text-center py-12 text-slate-500">
                    No members found
                  </div>
                ) : (
                  <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-x-6 gap-y-12">
                    {studioMembers.map((member, i) => (
                      <MemberCard key={i} {...member} />
                    ))}
                  </div>
                )}
              </div>
            </div>
          )}

          {activeTab === "events" && (
            <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
              {/* Search Bar */}
              <div className="relative max-w-2xl mb-12">
                <input
                  type="text"
                  placeholder="Search for an event ..."
                  className="w-full px-6 py-4 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-500 text-lg shadow-sm"
                />
                <div className="absolute right-6 top-1/2 -translate-y-1/2 text-slate-400">
                  <svg
                    className="w-6 h-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                    />
                  </svg>
                </div>
              </div>

              {isLoadingEvents ? (
                <div className="text-center py-12 text-slate-500">
                  Loading events...
                </div>
              ) : displayEvents.length === 0 ? (
                <div className="text-center py-12 text-slate-500">
                  No events found
                </div>
              ) : (
                <div className="space-y-12">
                  {sortedEventYears.map((year) => (
                    <div key={year} className="space-y-8">
                      <h3 className="text-3xl font-black text-slate-900">
                        {year}
                      </h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {eventsByYear[year].map((event, i) => (
                          <EventCard key={`${year}-${i}`} event={event} />
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {activeTab === "highlights" && null}
        </div>
      </section>

      {/* --- Values --- */}
      <section className="py-24 px-6 bg-slate-50 border-y border-slate-200">
        <div className="max-w-7xl mx-auto">
          <SectionHeading className="mb-20">Our Values</SectionHeading>

          <ValueCard
            title="Interdisciplinary Learning"
            description="We believe the best ideas emerge when diverse perspectives meet. Our studio brings together students from engineering, design, social sciences, and the arts to solve complex problems through shared curiosity and collective creativity."
          />

          <ValueCard
            title="Human Centered Impact"
            description="Every project begins and ends with people. We ground our work in careful research, thoughtful iteration, and a deep understanding of user needs to deliver solutions that create meaningful, measurable impact for the communities and partners we serve."
          />
        </div>
      </section>

      {/* --- Get Involved --- */}
      <section id="get-involved" className="py-24 px-6 bg-white">
        <div className="max-w-7xl mx-auto">
          {/* Header & Image */}
          <div className="grid md:grid-cols-2 gap-12 items-center mb-32">
            <div className="space-y-8">
              <h2 className="text-5xl font-bold text-slate-900 leading-tight">
                Join our{" "}
                <span className="bg-[#6e92b4] text-white px-2">community!</span>
              </h2>
              <div className="text-lg text-slate-600 space-y-6 leading-relaxed font-light">
                <p>
                  We're looking for thoughtful, curious, and collaborative
                  students who want to grow as designers and problem-solvers.
                </p>
                <p>
                  Whether you're experienced or completely new to design, DFA is
                  a place to explore, learn by doing, and join a supportive
                  community of makers and innovators.
                </p>
                <p className="font-bold text-slate-900 text-xl">
                  Applications currently closed.
                </p>
              </div>
            </div>
            <div className="relative">
              <img
                src={imgBoardPhotoshoot1}
                alt="DFA Community"
                className="rounded-[40px] shadow-2xl w-full h-auto object-cover"
              />
            </div>
          </div>

          {/* Application Timeline */}
          <div className="max-w-4xl mx-auto">
            <h3 className="text-4xl font-bold text-center mb-6">
              Application Timeline
            </h3>
            <p className="text-center text-slate-500 max-w-2xl mx-auto mb-20">
              Want to learn more about our recruitment process? Make sure to
              attend our recruitment events below. Follow us on Instagram
              @dfayale for updates on dates, times, and locations.
            </p>

            <div className="relative">
              {/* Vertical Line */}
              <div className="hidden md:block absolute left-1/2 top-0 bottom-0 w-px bg-slate-900 -translate-x-1/2"></div>

              {/* Timeline Items */}

              {/* August 28 */}
              <div className="grid grid-cols-1 md:grid-cols-[1fr_80px_1fr] gap-4 md:gap-0 mb-12 relative">
                <div className="flex md:justify-end items-start md:pt-1 md:pr-8">
                  <span className="text-2xl font-bold text-slate-300">
                    August
                  </span>
                </div>
                <div className="flex justify-start md:justify-center items-start relative z-10">
                  <span className="text-3xl font-bold text-slate-300 bg-white px-2 leading-none">
                    28
                  </span>
                </div>
                <div className="md:pl-8 pt-1 pb-12 md:pb-0 border-l md:border-l-0 border-slate-200 pl-6 md:pl-0 ml-3 md:ml-0">
                  <h4 className="text-xl font-bold text-slate-900">
                    EC Bazaar Fair
                  </h4>
                  <p className="text-slate-600 font-light mt-2">
                    Come meet DFA at Yale and learn about who we are.
                  </p>
                </div>
              </div>

              {/* August 30 */}
              <div className="grid grid-cols-1 md:grid-cols-[1fr_80px_1fr] gap-4 md:gap-0 mb-12 relative">
                <div className="hidden md:block"></div>
                <div className="flex justify-start md:justify-center items-start relative z-10">
                  <span className="text-3xl font-bold text-slate-300 bg-white px-2 leading-none">
                    30
                  </span>
                </div>
                <div className="md:pl-8 pt-1 pb-12 md:pb-0 border-l md:border-l-0 border-slate-200 pl-6 md:pl-0 ml-3 md:ml-0">
                  <h4 className="text-xl font-bold text-slate-900">
                    Information Session
                  </h4>
                  <p className="text-slate-600 font-light mt-2">
                    Learn about DFA at Yale and the application process at the
                    CEID.
                  </p>
                </div>
              </div>

              {/* September 10 */}
              <div className="grid grid-cols-1 md:grid-cols-[1fr_80px_1fr] gap-4 md:gap-0 mb-12 relative">
                <div className="flex md:justify-end items-start md:pt-1 md:pr-8">
                  <span className="text-2xl font-bold text-slate-300">
                    September
                  </span>
                </div>
                <div className="flex justify-start md:justify-center items-start relative z-10">
                  <span className="text-3xl font-bold text-slate-300 bg-white px-2 leading-none">
                    10
                  </span>
                </div>
                <div className="md:pl-8 pt-1 pb-12 md:pb-0 border-l md:border-l-0 border-slate-200 pl-6 md:pl-0 ml-3 md:ml-0">
                  <h4 className="text-xl font-bold text-slate-900">
                    Design Sprint Kickoff
                  </h4>
                  <p className="text-slate-600 font-light mt-2">
                    Get paired into teams for introductory design sprint.
                  </p>
                </div>
              </div>

              {/* Office Hours */}
              <div className="grid grid-cols-1 md:grid-cols-[1fr_80px_1fr] gap-4 md:gap-0 mb-12 relative">
                <div className="hidden md:block"></div>
                <div className="flex justify-start md:justify-center items-start relative z-10">
                  {/* Dot for no date */}
                  <div className="w-3 h-3 rounded-full bg-slate-900 mt-3"></div>
                </div>
                <div className="md:pl-8 pt-1 pb-12 md:pb-0 border-l md:border-l-0 border-slate-200 pl-6 md:pl-0 ml-3 md:ml-0">
                  <h4 className="text-xl font-bold text-slate-900">
                    Office Hours
                  </h4>
                  <p className="text-slate-600 font-light mt-2">
                    Need early feedback? Stop by office hours with any
                    questions.
                  </p>
                </div>
              </div>

              {/* Presentations */}
              <div className="grid grid-cols-1 md:grid-cols-[1fr_80px_1fr] gap-4 md:gap-0 mb-12 relative">
                <div className="hidden md:block"></div>
                <div className="flex justify-start md:justify-center items-start relative z-10">
                  <div className="w-3 h-3 rounded-full bg-slate-900 mt-3"></div>
                </div>
                <div className="md:pl-8 pt-1 pb-12 md:pb-0 border-l md:border-l-0 border-slate-200 pl-6 md:pl-0 ml-3 md:ml-0">
                  <h4 className="text-xl font-bold text-slate-900">
                    Design Sprint Presentations
                  </h4>
                  <p className="text-slate-600 font-light mt-2">
                    Team design sprint presentations to present your design
                    process.
                  </p>
                </div>
              </div>

              {/* Studio Kickoff */}
              <div className="grid grid-cols-1 md:grid-cols-[1fr_80px_1fr] gap-4 md:gap-0 mb-12 relative">
                <div className="hidden md:block"></div>
                <div className="flex justify-start md:justify-center items-start relative z-10">
                  <div className="w-3 h-3 rounded-full bg-slate-900 mt-3"></div>
                </div>
                <div className="md:pl-8 pt-1 pb-0 border-l md:border-l-0 border-slate-200 pl-6 md:pl-0 ml-3 md:ml-0">
                  <h4 className="text-xl font-bold text-slate-900">
                    Studio Kickoff
                  </h4>
                  <p className="text-slate-600 font-light mt-2">
                    Accepted designers will be introduced to next steps!
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* --- Alumni Destinations --- */}
      <section className="py-24 px-6 bg-white">
        <div className="max-w-7xl mx-auto text-center">
          <SectionHeading>Where Our Alumni Are Now</SectionHeading>
          <p className="text-xl text-slate-600 max-w-2xl mx-auto mb-16 font-light">
            Our alumni go on to work at world-class design firms, leading tech
            companies, and impactful non-profits.
          </p>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-8">
            {[
              { name: "Google", src: logoGoogle },
              { name: "IDEO", src: logoIdeo },
              { name: "Meta", src: logoMeta },
              { name: "IBM", src: logoIbm },
              { name: "Spotify", src: logoSpotify },
              { name: "Frog Design", src: logoFrog },
              { name: "McKinsey & Co", src: logoMcKinsey },
              { name: "The New York Times", src: logoNyt },
            ].map(({ name, src }) => (
              <div
                key={name}
                className="flex items-center justify-center h-20 md:h-24 bg-slate-50 rounded-lg border border-slate-100 hover:border-blue-200 hover:bg-blue-50 transition-all duration-300"
                title={name}
              >
                <img
                  src={src}
                  alt={name}
                  className="h-10 md:h-12 max-w-[140px] object-contain"
                  loading="lazy"
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* --- Sponsors --- */}
      <section className="py-24 px-6 bg-slate-50 border-t border-slate-200">
        <div className="max-w-7xl mx-auto text-center">
          <SectionHeading>Our Sponsors & Partners</SectionHeading>
          <p className="text-xl text-slate-600 max-w-2xl mx-auto mb-16 font-light">
            We are grateful for the support of our partners who make our work
            possible.
          </p>
          <div className="flex flex-wrap justify-center gap-8 md:gap-16 items-center">
            <div className="text-2xl md:text-3xl font-bold text-slate-400 hover:text-slate-800 transition-colors cursor-default">
              Tsai CITY
            </div>
            <div className="text-2xl md:text-3xl font-bold text-slate-400 hover:text-slate-800 transition-colors cursor-default">
              Yale SEAS
            </div>
            <div className="text-2xl md:text-3xl font-bold text-slate-400 hover:text-slate-800 transition-colors cursor-default">
              Dwight Hall
            </div>
            <div className="text-2xl md:text-3xl font-bold text-slate-400 hover:text-slate-800 transition-colors cursor-default">
              CEID
            </div>
          </div>
        </div>
      </section>

      {/* --- Stay in Touch / Footer --- */}
      <footer className="bg-[#1f3449] text-white pt-24 pb-12 relative overflow-hidden">
        {/* Decorative Gradient */}
        <div className="absolute bottom-0 left-0 w-full h-[400px] bg-gradient-to-t from-blue-900/50 to-transparent pointer-events-none"></div>

        <div className="max-w-7xl mx-auto px-6 relative z-10 flex flex-col items-center">
          <div className="w-full flex flex-col md:flex-row items-center md:items-start gap-12 md:gap-16 mb-16">
            <div className="flex-1 md:flex-[0.85] text-center md:text-left flex flex-col items-center md:items-start">
              <img
                src={imgDfaLogo}
                alt="DFA Logo"
                className="w-24 h-auto mb-6 opacity-90 hover:opacity-100 transition-opacity"
              />

              <div className="flex justify-center md:justify-start gap-6">
                <a
                  href="https://www.instagram.com/dfayale"
                  aria-label="Instagram"
                  className="w-14 h-14 bg-white/10 rounded-full flex items-center justify-center hover:bg-blue-600 transition-all hover:-translate-y-1"
                >
                  <Instagram className="w-6 h-6 text-white" />
                </a>
                <a
                  href="https://www.linkedin.com/company/dfayale/"
                  aria-label="LinkedIn"
                  className="w-14 h-14 bg-white/10 rounded-full flex items-center justify-center hover:bg-blue-600 transition-all hover:-translate-y-1"
                >
                  <Linkedin className="w-6 h-6 text-white" />
                </a>
                <a
                  href="https://linktr.ee/dfayale"
                  aria-label="Linktree"
                  className="w-14 h-14 bg-white/10 rounded-full flex items-center justify-center hover:bg-blue-600 transition-all hover:-translate-y-1"
                >
                  <svg
                    viewBox="0 0 55 55"
                    className="w-6 h-6 text-white"
                    fill="currentColor"
                  >
                    <path d={svgPathsHighlights.p347dcb00} />
                  </svg>
                </a>
                <a
                  href="mailto:yale@designforamerica.com"
                  aria-label="Email"
                  className="w-14 h-14 bg-white/10 rounded-full flex items-center justify-center hover:bg-blue-600 transition-all hover:-translate-y-1"
                >
                  <Mail className="w-6 h-6 text-white" />
                </a>
              </div>
            </div>

            <div className="flex-1 md:flex-[1.15] w-full">
              <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-white/10 backdrop-blur-md shadow-2xl">
                <div className="absolute -top-24 -right-24 h-64 w-64 rounded-full bg-blue-300/30 blur-3xl"></div>
                <div className="absolute -bottom-24 -left-24 h-64 w-64 rounded-full bg-white/10 blur-3xl"></div>

                <div className="relative z-10 p-6 md:p-8 flex flex-col gap-6">
                  <div className="text-center md:text-left">
                    <h2 className="text-2xl md:text-3xl font-bold text-white mb-2">
                      Stay in the Loop, join our newsletter!
                    </h2>
                  </div>

                  <form onSubmit={handleNewsletterSubmit}>
                    <div className="flex flex-col md:flex-row md:items-center gap-3">
                      <input
                        type="email"
                        value={newsletterEmail}
                        onChange={(e) => setNewsletterEmail(e.target.value)}
                        placeholder="Enter your email"
                        required
                        disabled={
                          newsletterStatus === "loading" ||
                          newsletterStatus === "success"
                        }
                        className="w-full md:flex-1 md:min-w-[320px] px-5 py-4 rounded-xl border border-white/20 bg-white/90 text-slate-900 focus:border-blue-300 focus:outline-none focus:ring-2 focus:ring-blue-300/40 text-base md:text-lg disabled:bg-white/60 disabled:cursor-not-allowed transition-all"
                      />
                      <button
                        type="submit"
                        disabled={
                          newsletterStatus === "loading" ||
                          newsletterStatus === "success"
                        }
                        className="w-auto md:w-auto px-6 py-4 bg-white text-[#1f3449] font-bold rounded-xl hover:bg-blue-50 transition-all disabled:bg-white/70 disabled:cursor-not-allowed shadow-lg hover:shadow-xl flex justify-center items-center text-base md:text-lg whitespace-nowrap"
                      >
                        {newsletterStatus === "loading"
                          ? "Subscribing..."
                          : newsletterStatus === "success"
                            ? "Subscribed!"
                            : "Join"}
                      </button>
                    </div>

                    {newsletterMessage && (
                      <p
                        className={`mt-3 text-sm font-medium ${
                          newsletterStatus === "success"
                            ? "text-green-300"
                            : "text-red-300"
                        }`}
                      >
                        {newsletterMessage}
                      </p>
                    )}

                    <p className="mt-4 text-xs text-slate-300">
                      We respect your privacy. Unsubscribe at any time.
                    </p>
                  </form>
                </div>
              </div>
            </div>
          </div>

          <div className="border-t border-white/10 pt-12 flex flex-col md:flex-row justify-between items-center text-slate-400 text-sm w-full">
            <p className="mb-4 md:mb-0">
              Made with love by{" "}
              <span className="text-white font-bold">DFAm</span>
            </p>
            <p>
              For partnership & inquiries, email{" "}
              <a
                href="mailto:yale@designforamerica.com"
                className="text-blue-300 hover:text-white transition-colors"
              >
                yale@designforamerica.com
              </a>
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
