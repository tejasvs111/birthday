"use client";

import { useEffect, useState } from "react";
import type { CSSProperties } from "react";

type Spark = { id: number; left: number; top: number; size: number; dur: number; delay: number };

/** Small glowing particles that twinkle in place. */
export default function Sparkles({ count = 36 }: { count?: number }) {
  const [sparks, setSparks] = useState<Spark[]>([]);

  useEffect(() => {
    setSparks(
      Array.from({ length: count }, (_, i) => ({
        id: i,
        left: Math.random() * 100,
        top: Math.random() * 100,
        size: 2 + Math.random() * 3,
        dur: 3 + Math.random() * 4,
        delay: -Math.random() * 6,
      })),
    );
  }, [count]);

  return (
    <>
      {sparks.map((s) => (
        <span
          key={s.id}
          className="twinkle"
          style={
            {
              left: `${s.left}%`,
              top: `${s.top}%`,
              width: s.size,
              height: s.size,
              "--dur": `${s.dur}s`,
              "--delay": `${s.delay}s`,
            } as CSSProperties
          }
        />
      ))}
    </>
  );
}
