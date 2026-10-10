"use client";

import { motion, useReducedMotion } from "framer-motion";

/** A softly pulsing, glowing heart. */
export default function GlowHeart({ className = "h-20 w-20" }: { className?: string }) {
  const reduce = useReducedMotion();

  return (
    <motion.div
      aria-hidden="true"
      className={className}
      animate={reduce ? undefined : { scale: [1, 1.12, 1, 1.08, 1] }}
      transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
      style={{ filter: "drop-shadow(0 0 18px rgba(255, 111, 145, 0.85))" }}
    >
      <svg viewBox="0 0 24 24" className="h-full w-full">
        <defs>
          <linearGradient id="glowHeartFill" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0" stopColor="#ff8fab" />
            <stop offset="1" stopColor="#d1345b" />
          </linearGradient>
        </defs>
        <path
          d="M12 21s-7.5-4.6-9.7-9.3A5.4 5.4 0 0 1 12 6.6a5.4 5.4 0 0 1 9.7 5.1C19.5 16.4 12 21 12 21z"
          fill="url(#glowHeartFill)"
        />
        <path d="M7 9.2a3 3 0 0 1 3-2" stroke="#fff4ea" strokeWidth="1.2" strokeLinecap="round" fill="none" opacity="0.7" />
      </svg>
    </motion.div>
  );
}
