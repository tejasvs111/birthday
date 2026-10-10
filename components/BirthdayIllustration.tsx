"use client";

import { motion, useReducedMotion } from "framer-motion";
import Rose from "./Rose";

const heartPath = "M0 5 C-7 -2 -4 -8 0 -3 C4 -8 7 -2 0 5Z";

/** Birthday cake with glowing candles, roses and little hearts. */
export default function BirthdayIllustration({ className = "" }: { className?: string }) {
  const reduce = useReducedMotion();
  const flame = (cx: number, delay: number) => (
    <g key={cx}>
      <circle cx={cx} cy={92} r={20} fill="url(#flameGlow)" />
      <motion.ellipse
        cx={cx}
        cy={92}
        rx={5}
        ry={10}
        fill="#ffd27a"
        style={{ transformOrigin: "50% 100%", transformBox: "fill-box" }}
        animate={reduce ? undefined : { scaleY: [1, 1.18, 0.92, 1.1, 1], scaleX: [1, 0.9, 1.05, 0.95, 1] }}
        transition={{ duration: 1.6, repeat: Infinity, delay, ease: "easeInOut" }}
      />
      <ellipse cx={cx} cy={95} rx={2.4} ry={5} fill="#fff4ea" />
    </g>
  );

  return (
    <svg
      viewBox="0 0 320 300"
      role="img"
      aria-label="A birthday cake with glowing candles, roses and hearts"
      className={className}
    >
      <defs>
        <linearGradient id="tierDark" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#8a2250" />
          <stop offset="1" stopColor="#5b1030" />
        </linearGradient>
        <linearGradient id="tierRose" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#e8527a" />
          <stop offset="1" stopColor="#b82a55" />
        </linearGradient>
        <linearGradient id="frost" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#fff4ea" />
          <stop offset="1" stopColor="#f9d3dc" />
        </linearGradient>
        <radialGradient id="flameGlow">
          <stop offset="0" stopColor="#ffd27a" stopOpacity="0.8" />
          <stop offset="1" stopColor="#ffd27a" stopOpacity="0" />
        </radialGradient>
      </defs>

      {/* plate */}
      <ellipse cx="160" cy="266" rx="136" ry="16" fill="#1c0510" opacity="0.5" />
      <ellipse cx="160" cy="260" rx="130" ry="15" fill="#fff4ea" opacity="0.92" />

      {/* leaves and roses around the base */}
      <g fill="#2f7d4f">
        <ellipse cx="40" cy="244" rx="16" ry="6" transform="rotate(-25 40 244)" />
        <ellipse cx="80" cy="258" rx="16" ry="6" transform="rotate(20 80 258)" />
        <ellipse cx="282" cy="244" rx="16" ry="6" transform="rotate(25 282 244)" />
        <ellipse cx="240" cy="258" rx="16" ry="6" transform="rotate(-20 240 258)" />
      </g>
      <Rose x={58} y={246} size={0.8} />
      <Rose x={264} y={246} size={0.8} />
      <Rose x={92} y={262} size={0.5} petal="#f27a9b" dark="#c2456b" light="#f9d3dc" />
      <Rose x={228} y={262} size={0.5} petal="#f27a9b" dark="#c2456b" light="#f9d3dc" />

      {/* bottom tier */}
      <rect x="70" y="190" width="180" height="68" rx="14" fill="url(#tierDark)" />
      <path
        d="M70 204 Q70 190 84 190 H236 Q250 190 250 204 Q240 224 228 206 Q218 228 204 206 Q190 232 176 206 Q162 226 148 206 Q134 230 120 206 Q106 226 96 206 Q82 224 70 204 Z"
        fill="url(#frost)"
      />
      {[96, 128, 160, 192, 224].map((cx) => (
        <path key={cx} d={heartPath} transform={`translate(${cx} 238)`} fill="#f9d3dc" opacity="0.9" />
      ))}

      {/* top tier */}
      <rect x="105" y="135" width="110" height="58" rx="12" fill="url(#tierRose)" />
      <path
        d="M105 148 Q105 135 118 135 H202 Q215 135 215 148 Q205 168 195 150 Q184 172 172 150 Q160 170 148 150 Q136 172 126 150 Q114 166 105 148 Z"
        fill="url(#frost)"
      />
      {[128, 160, 192].map((cx) => (
        <path key={cx} d={heartPath} transform={`translate(${cx} 176)`} fill="#fff4ea" opacity="0.9" />
      ))}

      {/* candles */}
      {[142, 160, 178].map((cx) => (
        <g key={cx}>
          <rect x={cx - 3.5} y="101" width="7" height="36" rx="2" fill="#fff4ea" />
          <rect x={cx - 3.5} y="110" width="7" height="4" fill="#f2a9bd" />
          <rect x={cx - 3.5} y="120" width="7" height="4" fill="#f2a9bd" />
        </g>
      ))}
      {flame(142, 0)}
      {flame(160, 0.4)}
      {flame(178, 0.8)}

      {/* floating hearts */}
      {[
        { x: 52, y: 120, d: 0 },
        { x: 268, y: 100, d: 0.6 },
        { x: 88, y: 60, d: 1.1 },
        { x: 236, y: 50, d: 1.6 },
      ].map((h) => (
        <motion.path
          key={h.x}
          d={heartPath}
          transform={`translate(${h.x} ${h.y}) scale(1.6)`}
          fill="#ff6f91"
          animate={reduce ? undefined : { y: [0, -8, 0], opacity: [0.7, 1, 0.7] }}
          transition={{ duration: 3.2, repeat: Infinity, delay: h.d, ease: "easeInOut" }}
        />
      ))}
    </svg>
  );
}
