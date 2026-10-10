"use client";

import { useEffect, useState } from "react";
import type { CSSProperties } from "react";

type Item = {
  id: number;
  left: number;
  size: number;
  dur: number;
  delay: number;
  dx: number;
  rot: number;
  o: number;
  glyph: string;
};

type Props = {
  count?: number;
  glyphs?: string[];
  minSize?: number;
  maxSize?: number;
};

const DEFAULT_GLYPHS = ["❤️", "💖", "💗", "💕"];

/** Hearts or petals drifting upward. Positions are random, so they are created after mount to avoid hydration mismatches. */
export default function FloatingItems({
  count = 16,
  glyphs = DEFAULT_GLYPHS,
  minSize = 14,
  maxSize = 34,
}: Props) {
  const [items, setItems] = useState<Item[]>([]);
  const glyphKey = glyphs.join("|");

  useEffect(() => {
    const list = glyphKey.split("|");
    setItems(
      Array.from({ length: count }, (_, i) => ({
        id: i,
        left: Math.random() * 100,
        size: minSize + Math.random() * (maxSize - minSize),
        dur: 14 + Math.random() * 16,
        delay: -Math.random() * 24,
        dx: (Math.random() - 0.5) * 160,
        rot: (Math.random() - 0.5) * 80,
        o: 0.25 + Math.random() * 0.4,
        glyph: list[Math.floor(Math.random() * list.length)],
      })),
    );
  }, [count, glyphKey, minSize, maxSize]);

  return (
    <>
      {items.map((it) => (
        <span
          key={it.id}
          className="float-item"
          style={
            {
              left: `${it.left}%`,
              fontSize: it.size,
              "--dur": `${it.dur}s`,
              "--delay": `${it.delay}s`,
              "--dx": `${it.dx}px`,
              "--rot": `${it.rot}deg`,
              "--o": it.o,
            } as CSSProperties
          }
        >
          {it.glyph}
        </span>
      ))}
    </>
  );
}
