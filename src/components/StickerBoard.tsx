import {
  useEffect,
  useRef,
  useState,
  type PointerEvent,
  type ReactNode,
} from "react";
import sticker1 from "../assets/stickers/sticker1.png";
import sticker3 from "../assets/stickers/sticker3.png";
import stamp from "../assets/stickers/stamp.png";
import iHeartYale from "../assets/stickers/i-heart-yale.png";
import pic1 from "../assets/pics/web/pic1.jpg";
import pic2 from "../assets/pics/web/pic2.jpg";
import pic3 from "../assets/pics/web/pic3.jpg";
import pic4 from "../assets/pics/web/pic4.jpg";
import pic5 from "../assets/pics/web/pic5.jpg";
import pic6 from "../assets/pics/web/pic6.jpg";
import pic7 from "../assets/pics/web/pic7.jpg";
import pic8 from "../assets/pics/web/pic8.jpg";
import pic9 from "../assets/pics/web/pic9.jpg";

type Item = {
  id: string;
  /* Resting spot as a % of the board, so the scatter survives any width */
  left: string;
  top: string;
  width: string;
  rotate: number;
  src?: string;
  /* Photos get a printed white border; stickers are die-cut */
  photo?: boolean;
  /* App-icon tiles that open a link when clicked (not dragged) */
  icon?: ReactNode;
  href?: string;
  label?: string;
  /* Thins the collage out on small screens */
  desktopOnly?: boolean;
  /* Narrow screens get their own scatter so nothing collides or clips */
  m?: { left: string; top: string };
};

/* Brand marks, die-cut like the rest of the stickers */
const InstagramTile = () => (
  <div
    className="aspect-square w-full rounded-[24%] ring-4 ring-white flex items-center justify-center"
    style={{
      background:
        "radial-gradient(circle at 30% 107%, #fdf497 0%, #fdf497 5%, #fd5949 45%, #d6249f 60%, #285aeb 90%)",
    }}
  >
    <svg
      viewBox="0 0 24 24"
      className="w-3/5 h-3/5"
      fill="none"
      stroke="#fff"
      strokeWidth={2}
    >
      <rect x="2" y="2" width="20" height="20" rx="5.5" />
      <circle cx="12" cy="12" r="4.3" />
      <circle cx="17.6" cy="6.4" r="1.3" fill="#fff" stroke="none" />
    </svg>
  </div>
);

const LinkedInTile = () => (
  <div className="aspect-square w-full rounded-[24%] ring-4 ring-white bg-white overflow-hidden">
    <svg viewBox="0 0 24 24" className="w-full h-full" fill="#0a66c2">
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
    </svg>
  </div>
);

const items: Item[] = [
  // --- photos ---
  {
    id: "pic1",
    src: pic1,
    photo: true,
    left: "18%",
    top: "3%",
    width: "clamp(150px, 15vw, 215px)",
    rotate: 4,
    m: { left: "28%", top: "5%" },
  },
  {
    id: "pic6",
    src: pic6,
    photo: true,
    left: "46%",
    top: "1%",
    width: "clamp(150px, 14vw, 200px)",
    rotate: -5,
    desktopOnly: true,
  },
  {
    id: "pic8",
    src: pic8,
    photo: true,
    left: "72%",
    top: "6%",
    width: "clamp(150px, 14vw, 198px)",
    rotate: 6,
    desktopOnly: true,
  },
  {
    id: "pic4",
    src: pic4,
    photo: true,
    left: "3%",
    top: "31%",
    width: "clamp(140px, 13vw, 178px)",
    rotate: -8,
    desktopOnly: true,
  },
  {
    id: "pic2",
    src: pic2,
    photo: true,
    left: "27%",
    top: "37%",
    width: "clamp(150px, 15vw, 208px)",
    rotate: 5,
    desktopOnly: true,
  },
  {
    id: "pic9",
    src: pic9,
    photo: true,
    left: "56%",
    top: "33%",
    width: "clamp(150px, 14vw, 195px)",
    rotate: -4,
    m: { left: "45%", top: "58%" },
  },
  {
    id: "pic3",
    src: pic3,
    photo: true,
    left: "11%",
    top: "68%",
    width: "clamp(150px, 14vw, 200px)",
    rotate: 7,
    desktopOnly: true,
  },
  {
    id: "pic7",
    src: pic7,
    photo: true,
    left: "39%",
    top: "71%",
    width: "clamp(150px, 14vw, 196px)",
    rotate: -6,
    desktopOnly: true,
  },
  {
    id: "pic5",
    src: pic5,
    photo: true,
    left: "67%",
    top: "66%",
    width: "clamp(150px, 14vw, 200px)",
    rotate: 3,
    m: { left: "8%", top: "34%" },
  },

  // --- stickers ---
  {
    id: "seal",
    src: sticker1,
    left: "2%",
    top: "5%",
    width: "clamp(100px, 10vw, 135px)",
    rotate: -14,
    m: { left: "1%", top: "4%" },
  },
  {
    id: "iheart",
    src: iHeartYale,
    left: "39%",
    top: "21%",
    width: "clamp(110px, 11vw, 155px)",
    rotate: 12,
    m: { left: "55%", top: "30%" },
  },
  {
    id: "stamp",
    src: stamp,
    left: "87%",
    top: "31%",
    width: "clamp(80px, 8vw, 112px)",
    rotate: 9,
    m: { left: "80%", top: "44%" },
  },
  {
    id: "dfa-icon",
    src: sticker3,
    left: "90%",
    top: "2%",
    width: "clamp(72px, 7.5vw, 102px)",
    rotate: -11,
    m: { left: "80%", top: "4%" },
  },

  // --- linked app icons ---
  {
    id: "instagram",
    icon: <InstagramTile />,
    href: "https://www.instagram.com/dfayale",
    label: "DFA Studio on Instagram",
    left: "83%",
    top: "64%",
    width: "clamp(62px, 6vw, 86px)",
    rotate: 7,
    m: { left: "6%", top: "72%" },
  },
  {
    id: "linkedin",
    icon: <LinkedInTile />,
    href: "https://www.linkedin.com/company/dfayale/",
    label: "DFA Studio on LinkedIn",
    left: "91%",
    top: "76%",
    width: "clamp(62px, 6vw, 86px)",
    rotate: -9,
    m: { left: "28%", top: "78%" },
  },
];

export default function StickerBoard() {
  const boardRef = useRef<HTMLDivElement>(null);
  const [offsets, setOffsets] = useState<
    Record<string, { x: number; y: number }>
  >({});
  const [dragging, setDragging] = useState<string | null>(null);
  const [order, setOrder] = useState<string[]>(items.map((i) => i.id));
  const [narrow, setNarrow] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(max-width: 767px)");
    const sync = () => setNarrow(mq.matches);
    sync();
    mq.addEventListener("change", sync);
    return () => mq.removeEventListener("change", sync);
  }, []);
  const drag = useRef<{
    id: string;
    pointerId: number;
    startX: number;
    startY: number;
    baseX: number;
    baseY: number;
    moved: number;
  } | null>(null);

  const onPointerDown = (e: PointerEvent<HTMLDivElement>, id: string) => {
    e.preventDefault();
    e.currentTarget.setPointerCapture(e.pointerId);
    const base = offsets[id] ?? { x: 0, y: 0 };
    drag.current = {
      id,
      pointerId: e.pointerId,
      startX: e.clientX,
      startY: e.clientY,
      baseX: base.x,
      baseY: base.y,
      moved: 0,
    };
    setDragging(id);
    // Whatever you grab comes to the top of the pile
    setOrder((prev) => [...prev.filter((s) => s !== id), id]);
  };

  const onPointerMove = (e: PointerEvent<HTMLDivElement>) => {
    const d = drag.current;
    if (!d || d.pointerId !== e.pointerId) return;

    const dx = e.clientX - d.startX;
    const dy = e.clientY - d.startY;
    d.moved = Math.max(d.moved, Math.hypot(dx, dy));

    let x = d.baseX + dx;
    let y = d.baseY + dy;

    // Keep everything on the board
    const board = boardRef.current?.getBoundingClientRect();
    const el = e.currentTarget.getBoundingClientRect();
    if (board) {
      const restLeft = el.left - (offsets[d.id]?.x ?? d.baseX);
      const restTop = el.top - (offsets[d.id]?.y ?? d.baseY);
      x = Math.min(
        Math.max(x, board.left - restLeft),
        board.right - el.width - restLeft,
      );
      y = Math.min(
        Math.max(y, board.top - restTop),
        board.bottom - el.height - restTop,
      );
    }

    setOffsets((prev) => ({ ...prev, [d.id]: { x, y } }));
  };

  const endDrag = (e: PointerEvent<HTMLDivElement>, item: Item) => {
    const d = drag.current;
    if (d?.pointerId !== e.pointerId) return;
    // A press that never really moved counts as a click, not a drag
    if (item.href && d.moved < 5) {
      window.open(item.href, "_blank", "noopener,noreferrer");
    }
    drag.current = null;
    setDragging(null);
  };

  return (
    <div
      ref={boardRef}
      className="relative h-[500px] md:h-[720px] select-none overflow-hidden"
    >
      {/*
        Stickers come to rest inside the site's content margins, but the drag
        bounds are the full-bleed board above — so they can be pulled edge to edge.
      */}
      <div className="absolute inset-y-0 left-8 right-8 md:left-16 md:right-16 lg:left-24 lg:right-24">
        {items.map((item) => (
          <div
            key={item.id}
            onPointerDown={(e) => onPointerDown(e, item.id)}
            onPointerMove={onPointerMove}
            onPointerUp={(e) => endDrag(e, item)}
            onPointerCancel={(e) => endDrag(e, item)}
            role={item.href ? "link" : undefined}
            aria-label={item.label}
            style={{
              left: narrow && item.m ? item.m.left : item.left,
              top: narrow && item.m ? item.m.top : item.top,
              width: item.width,
              zIndex: order.indexOf(item.id) + 1,
              translate: `${offsets[item.id]?.x ?? 0}px ${offsets[item.id]?.y ?? 0}px`,
            }}
            className={`absolute touch-none ${item.desktopOnly ? "hidden md:block" : ""} ${
              dragging === item.id ? "cursor-grabbing" : "cursor-grab"
            }`}
          >
            <div
              style={{ rotate: `${item.rotate}deg` }}
              className={`sticker ${dragging === item.id ? "is-dragging" : ""}`}
            >
              {item.icon ? (
                item.icon
              ) : item.photo ? (
                <div className="bg-white p-2 pb-5">
                  <img
                    src={item.src}
                    alt=""
                    draggable={false}
                    className="w-full h-auto pointer-events-none"
                  />
                </div>
              ) : (
                <img
                  src={item.src}
                  alt=""
                  draggable={false}
                  className="w-full h-auto pointer-events-none"
                />
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
