import { useRef, type PointerEvent } from "react";

const canHover = () =>
  typeof window !== "undefined" &&
  window.matchMedia("(hover: hover) and (pointer: fine)").matches &&
  !window.matchMedia("(prefers-reduced-motion: reduce)").matches;

export default function PillarCard({
  title,
  description,
  image,
  onClick,
}: {
  title: string;
  description: string;
  image: string;
  onClick?: () => void;
}) {
  const ref = useRef<HTMLButtonElement>(null);

  const onPointerMove = (e: PointerEvent<HTMLButtonElement>) => {
    const el = ref.current;
    if (!el || !canHover()) return;
    const rect = el.getBoundingClientRect();
    const px = (e.clientX - rect.left) / rect.width;
    const py = (e.clientY - rect.top) / rect.height;
    el.style.transition = "transform 60ms linear";
    el.style.transform = `perspective(900px) rotateY(${(px - 0.5) * 14}deg) rotateX(${(0.5 - py) * 14}deg) scale(1.02)`;
  };

  const onPointerLeave = () => {
    const el = ref.current;
    if (!el) return;
    el.style.transition = "transform 600ms cubic-bezier(0.23, 1, 0.32, 1)";
    el.style.transform = "perspective(900px)";
  };

  return (
    <button
      ref={ref}
      onClick={onClick}
      onPointerMove={onPointerMove}
      onPointerLeave={onPointerLeave}
      aria-label={`${title} — ${description}`}
      className="tilt-card group/card relative block w-full text-left overflow-hidden bg-dfa-ink aspect-[4/5]"
    >
      <img
        src={image}
        alt=""
        className="absolute inset-0 h-full w-full object-cover grayscale group-hover/card:grayscale-0 transition-[filter] duration-500 ease-swift motion-reduce:transition-none"
      />
      {/* Keeps the type legible; lifts on hover so the colour reads */}
      <div className="absolute inset-0 bg-gradient-to-t from-dfa-ink via-dfa-ink/65 to-dfa-ink/25 opacity-100 group-hover/card:opacity-70 transition-opacity duration-500 ease-swift motion-reduce:transition-none"></div>

      <div className="relative h-full p-8 md:p-10 flex flex-col justify-end">
        <h3 className="text-3xl md:text-4xl font-bold tracking-tight text-white mb-4">
          {title}
        </h3>
        <p className="text-base md:text-lg text-dfa-paper/80 leading-snug">
          {description}
        </p>
      </div>
    </button>
  );
}
