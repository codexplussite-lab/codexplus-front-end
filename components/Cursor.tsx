"use client";

import { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";
import { cn } from "@/lib/utils";

const INTERACTIVE_SELECTOR = "a, button, [data-hover], input, textarea, select, label";

export default function Cursor() {
  const [enabled, setEnabled] = useState(false);
  const [active, setActive] = useState(false);
  const [pressed, setPressed] = useState(false);

  const x = useMotionValue(-100);
  const y = useMotionValue(-100);
  const ringX = useSpring(x, { stiffness: 320, damping: 28, mass: 0.55 });
  const ringY = useSpring(y, { stiffness: 320, damping: 28, mass: 0.55 });

  useEffect(() => {
    if (!window.matchMedia("(pointer: fine)").matches) return;
    setEnabled(true);

    const onMove = (e: MouseEvent) => {
      x.set(e.clientX);
      y.set(e.clientY);
      const target = e.target as HTMLElement | null;
      setActive(!!target?.closest?.(INTERACTIVE_SELECTOR));
    };
    const onDown = () => setPressed(true);
    const onUp = () => setPressed(false);

    window.addEventListener("mousemove", onMove, { passive: true });
    window.addEventListener("mousedown", onDown);
    window.addEventListener("mouseup", onUp);
    return () => {
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mousedown", onDown);
      window.removeEventListener("mouseup", onUp);
    };
  }, [x, y]);

  if (!enabled) return null;

  return (
    <>
      <motion.div
        aria-hidden
        className="pointer-events-none fixed left-0 top-0 z-[9999]"
        style={{ x, y }}
      >
        <div
          className={cn(
            "-translate-x-1/2 -translate-y-1/2 size-1.5 rounded-full bg-accent transition-transform duration-200 ease-out",
            active && "scale-[2.6]",
            pressed && "scale-50"
          )}
        />
      </motion.div>

      <motion.div
        aria-hidden
        className="pointer-events-none fixed left-0 top-0 z-[9998]"
        style={{ x: ringX, y: ringY }}
      >
        <motion.div
          className="-translate-x-1/2 -translate-y-1/2 size-9 rounded-full border"
          animate={{
            scale: pressed ? 0.6 : active ? 1.7 : 1,
            backgroundColor: active ? "rgba(116,55,255,0.14)" : "rgba(116,55,255,0)",
            borderColor: active ? "rgba(116,55,255,0.9)" : "rgba(226,232,240,0.35)",
          }}
          transition={{ type: "spring", stiffness: 300, damping: 22 }}
        />
      </motion.div>
    </>
  );
}
