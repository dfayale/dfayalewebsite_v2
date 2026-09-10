import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";

/**
 * A single blob that replaces the system cursor. It paints white through
 * `mix-blend-mode: difference`, so it always reads as the exact inverse of
 * whatever it sits on — paper goes dark, the blue band goes orange, photos
 * invert under it. It grows over anything clickable and snaps small on press.
 *
 * The blob eases toward the pointer instead of tracking it exactly: the lag is
 * what makes the click and hover changes legible as motion.
 */

// Anything that should make the blob swell — the same set the browser would
// normally show a pointer or text caret over.
const INTERACTIVE =
  'a, button, [role="button"], input, textarea, select, label, summary, [data-cursor="hover"]';

export default function Cursor() {
  // Pointer-driven devices only: a phone has no cursor to replace.
  const [enabled, setEnabled] = useState(false);
  const dotRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const fine = window.matchMedia("(pointer: fine)");
    const sync = () => setEnabled(fine.matches);
    sync();
    fine.addEventListener("change", sync);
    return () => fine.removeEventListener("change", sync);
  }, []);

  useEffect(() => {
    if (!enabled) return;
    const dot = dotRef.current;
    if (!dot) return;

    // Hiding the native cursor lives on <html> rather than in the stylesheet so
    // the arrow only ever disappears once this component is actually running.
    document.documentElement.classList.add("cursor-blob-on");

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)")
      .matches;

    // Target = where the pointer is. Current = where the blob is drawn.
    let targetX = window.innerWidth / 2;
    let targetY = window.innerHeight / 2;
    let x = targetX;
    let y = targetY;
    let placed = false;
    let frame = 0;

    const draw = () => {
      // A fresh lerp each frame: fast enough to feel attached, slow enough to
      // trail. Reduced motion gets a rigid 1:1 follow.
      const ease = reduced ? 1 : 0.2;
      x += (targetX - x) * ease;
      y += (targetY - y) * ease;
      dot.style.transform = `translate3d(${x}px, ${y}px, 0) translate(-50%, -50%)`;
      frame = requestAnimationFrame(draw);
    };
    frame = requestAnimationFrame(draw);

    const onMove = (e: PointerEvent) => {
      targetX = e.clientX;
      targetY = e.clientY;
      if (!placed) {
        // First sighting: drop the blob straight onto the pointer so it does
        // not come flying in from the middle of the screen.
        placed = true;
        x = targetX;
        y = targetY;
        dot.dataset.visible = "true";
      }
      const target = e.target as Element | null;
      dot.dataset.hover = String(!!target?.closest?.(INTERACTIVE));
    };

    const onDown = () => (dot.dataset.down = "true");
    const onUp = () => (dot.dataset.down = "false");
    const onLeave = () => (dot.dataset.visible = "false");
    const onEnter = () => (dot.dataset.visible = "true");

    window.addEventListener("pointermove", onMove, { passive: true });
    window.addEventListener("pointerdown", onDown, { passive: true });
    window.addEventListener("pointerup", onUp, { passive: true });
    document.addEventListener("mouseleave", onLeave);
    document.addEventListener("mouseenter", onEnter);
    // Losing the pointer to a native dialog or another window would otherwise
    // strand the blob mid-press.
    window.addEventListener("blur", onUp);

    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("pointerdown", onDown);
      window.removeEventListener("pointerup", onUp);
      document.removeEventListener("mouseleave", onLeave);
      document.removeEventListener("mouseenter", onEnter);
      window.removeEventListener("blur", onUp);
      document.documentElement.classList.remove("cursor-blob-on");
    };
  }, [enabled]);

  if (!enabled) return null;

  // Mounted on <body> rather than inside the app tree: `difference` only
  // blends against its own stacking context, and body is the one context that
  // has the whole page painted behind it.
  return createPortal(
    <div
      ref={dotRef}
      aria-hidden="true"
      className="cursor-blob"
      data-visible="false"
      data-hover="false"
      data-down="false"
    >
      <span className="cursor-blob-inner" />
    </div>,
    document.body,
  );
}
