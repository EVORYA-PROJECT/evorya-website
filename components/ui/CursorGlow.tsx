"use client";

import { useEffect, useRef } from "react";
import { motion, useMotionValue, useSpring } from "motion/react";

/**
 * Soft light that trails the cursor on desktop pointers only.
 * Purely decorative — never intercepts pointer events.
 */
export default function CursorGlow() {
  const x = useMotionValue(-200);
  const y = useMotionValue(-200);
  const springX = useSpring(x, { stiffness: 120, damping: 26, mass: 0.6 });
  const springY = useSpring(y, { stiffness: 120, damping: 26, mass: 0.6 });
  const enabled = useRef(false);

  useEffect(() => {
    const fine = window.matchMedia("(pointer: fine)");
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)");
    enabled.current = fine.matches && !reduced.matches;

    if (!enabled.current) return;

    function handleMove(e: PointerEvent) {
      x.set(e.clientX);
      y.set(e.clientY);
    }

    window.addEventListener("pointermove", handleMove);
    return () => window.removeEventListener("pointermove", handleMove);
  }, [x, y]);

  return (
    <motion.div
      aria-hidden="true"
      className="pointer-events-none fixed left-0 top-0 z-40 hidden h-[520px] w-[520px] -translate-x-1/2 -translate-y-1/2 rounded-full lg:block"
      style={{
        x: springX,
        y: springY,
        background:
          "radial-gradient(circle, rgba(242,242,242,0.06) 0%, rgba(242,242,242,0.02) 40%, transparent 70%)",
      }}
    />
  );
}
