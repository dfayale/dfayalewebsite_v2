/**
 * Past events, hand-maintained.
 *
 * Add a row per event, newest or oldest order does not matter — the gallery
 * groups by year and sorts for you. Leave `image` off and add a `note` and the
 * cell renders as a text-only notice instead of a picture.
 *
 * NOTE: the dates below are placeholders — swap in the real ones.
 */

import imgAutodesk from "../assets/events/Autodesk Event.jpg";
import imgFigAndFries from "../assets/events/Fig & Fries.jpg";
import imgFinalShowcase from "../assets/events/final showcase.jpg";
import imgMinecraft from "../assets/events/minecraft.jpg";
import imgNetflix from "../assets/events/netflix.jpg";
import imgStudioNight from "../assets/events/studio night.jpg";
import imgYDesign from "../assets/events/Y-Design.jpg";

export type PastEvent = {
  /** ISO day, "2026-04-18". Anything unparseable lands in the Undated group. */
  date: string;
  name: string;
  /** Second caption line — host, series, or location */
  subtitle?: string;
  /** Omit for a text-only cell */
  image?: string;
  /** Standalone copy for text-only cells */
  note?: string;
};

export const pastEvents: PastEvent[] = [
  {
    date: "2026-04-24",
    name: "Final Showcase",
    subtitle: "@ Tsai City",
    image: imgFinalShowcase,
  },
  {
    date: "2026-04-09",
    name: "Studio Night",
    image: imgStudioNight,
  },
  {
    date: "2026-03-26",
    name: "Minecraft Study Break",
    image: imgMinecraft,
  },
  {
    date: "2025-10-02",
    name: "Autodesk Workshop",
    subtitle: "CAD and 3D modelling",
    image: imgAutodesk,
  },
  {
    date: "2025-10-28",
    name: "Fig & Fries",
    subtitle: "Figma workshop and best fry ranking",
    image: imgFigAndFries,
  },
  {
    date: "2026-02-07",
    name: "Y-Design",
    subtitle: "90+ attendees, 10 universities",
    image: imgYDesign,
  },
  {
    date: "2025-12-03",
    name: "Roblox Night",
    note: "Pizza and games @Mann Center",
  },
  {
    date: "2025-11-12",
    name: "Netflix Speaker Event",
    subtitle: "Netflix CEO",
    image: imgNetflix,
  },
];
