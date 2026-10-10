import Rose from "./Rose";

/** A bouquet of roses wrapped in cream paper and tied with a burgundy bow. */
export default function RoseBouquet({ className = "" }: { className?: string }) {
  const roses = [
    { x: 130, y: 84, s: 1.35 },
    { x: 80, y: 118, s: 1.1 },
    { x: 180, y: 118, s: 1.1 },
    { x: 106, y: 160, s: 1.0 },
    { x: 156, y: 160, s: 1.0 },
  ];

  return (
    <svg viewBox="0 0 260 320" role="img" aria-label="A bouquet of red roses" className={className}>
      {/* leaves */}
      <g fill="#2f7d4f">
        <ellipse cx="48" cy="140" rx="26" ry="9" transform="rotate(-35 48 140)" />
        <ellipse cx="212" cy="140" rx="26" ry="9" transform="rotate(35 212 140)" />
        <ellipse cx="60" cy="188" rx="24" ry="8" transform="rotate(-15 60 188)" />
        <ellipse cx="200" cy="188" rx="24" ry="8" transform="rotate(15 200 188)" />
      </g>

      {/* stems */}
      <g stroke="#2f7d4f" strokeWidth="4" strokeLinecap="round">
        {roses.map((r) => (
          <line key={r.x + "-" + r.y} x1={r.x} y1={r.y + 12} x2="130" y2="270" />
        ))}
      </g>

      {/* baby's breath */}
      <g fill="#fff4ea" opacity="0.9">
        {[
          [40, 96],
          [58, 74],
          [210, 92],
          [196, 68],
          [130, 30],
          [104, 40],
          [158, 42],
        ].map(([cx, cy]) => (
          <circle key={cx + "-" + cy} cx={cx} cy={cy} r="4" />
        ))}
      </g>

      {roses.map((r) => (
        <Rose key={r.x + "-" + r.y} x={r.x} y={r.y} size={r.s} />
      ))}

      {/* wrapping paper */}
      <path d="M62 196 L198 196 L158 306 L102 306 Z" fill="#fff4ea" opacity="0.95" />
      <path d="M62 196 L130 226 L198 196" fill="none" stroke="#f2a9bd" strokeWidth="3" strokeLinejoin="round" />

      {/* bow */}
      <g fill="#7a1a40">
        <path d="M130 234 C100 214 92 250 124 244 Z" />
        <path d="M130 234 C160 214 168 250 136 244 Z" />
        <circle cx="130" cy="240" r="7" fill="#5b1030" />
        <path d="M126 246 L112 276 L124 270 L128 280 Z" />
        <path d="M134 246 L148 276 L136 270 L132 280 Z" />
      </g>
    </svg>
  );
}
