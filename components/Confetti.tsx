"use client";

import { useCallback, useEffect, useRef } from "react";

type Particle = {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  rot: number;
  vr: number;
  color: string;
  shape: "heart" | "rect" | "dot";
  life: number;
  max: number;
  gravity: number;
};

type Props = {
  /** Increase this number to fire a burst. */
  burstKey?: number;
  /** Burst origin as a fraction of the viewport (0 to 1). */
  origin?: { x: number; y: number };
  /** Rain confetti from the top for a few seconds when the component mounts. */
  shower?: boolean;
};

const COLORS = ["#ff6f91", "#f9d3dc", "#fff4ea", "#d1345b", "#ffc2d1", "#ffd27a"];
const SHAPES: Particle["shape"][] = ["heart", "heart", "rect", "dot"];

function drawHeart(ctx: CanvasRenderingContext2D, size: number) {
  const s = size / 2;
  ctx.beginPath();
  ctx.moveTo(0, s * 0.4);
  ctx.bezierCurveTo(-s * 1.2, -s * 0.3, -s * 0.5, -s * 1.1, 0, -s * 0.4);
  ctx.bezierCurveTo(s * 0.5, -s * 1.1, s * 1.2, -s * 0.3, 0, s * 0.4);
  ctx.fill();
}

/** Lightweight canvas confetti made of hearts, ribbons and dots. Skipped when the visitor prefers reduced motion. */
export default function Confetti({ burstKey = 0, origin, shower = false }: Props) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const particles = useRef<Particle[]>([]);
  const raf = useRef<number | null>(null);
  const reduced = useRef(false);
  const size = useRef({ w: 0, h: 0 });
  const originRef = useRef(origin);
  originRef.current = origin;

  const draw = useCallback(() => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");
    if (!canvas || !ctx) {
      raf.current = null;
      return;
    }
    const { w, h } = size.current;
    ctx.clearRect(0, 0, w, h);
    const alive: Particle[] = [];
    for (const p of particles.current) {
      p.life += 1;
      p.vy += p.gravity;
      p.vx *= 0.99;
      p.x += p.vx;
      p.y += p.vy;
      p.rot += p.vr;
      if (p.life >= p.max || p.y > h + 40) continue;
      alive.push(p);
      ctx.save();
      ctx.globalAlpha = Math.min(1, (p.max - p.life) / 30);
      ctx.translate(p.x, p.y);
      ctx.rotate(p.rot);
      ctx.fillStyle = p.color;
      if (p.shape === "heart") {
        drawHeart(ctx, p.size * 1.4);
      } else if (p.shape === "rect") {
        ctx.fillRect(-p.size / 2, -p.size / 3, p.size, p.size * 0.6);
      } else {
        ctx.beginPath();
        ctx.arc(0, 0, p.size / 3, 0, Math.PI * 2);
        ctx.fill();
      }
      ctx.restore();
    }
    particles.current = alive;
    if (alive.length) {
      raf.current = requestAnimationFrame(draw);
    } else {
      raf.current = null;
      ctx.clearRect(0, 0, w, h);
    }
  }, []);

  const start = useCallback(() => {
    if (raf.current === null) raf.current = requestAnimationFrame(draw);
  }, [draw]);

  useEffect(() => {
    reduced.current = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  }, []);

  useEffect(() => {
    const resize = () => {
      const canvas = canvasRef.current;
      if (!canvas) return;
      const dpr = window.devicePixelRatio || 1;
      const w = window.innerWidth;
      const h = window.innerHeight;
      canvas.width = w * dpr;
      canvas.height = h * dpr;
      size.current = { w, h };
      canvas.getContext("2d")?.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    resize();
    window.addEventListener("resize", resize);
    return () => {
      window.removeEventListener("resize", resize);
      if (raf.current !== null) cancelAnimationFrame(raf.current);
      raf.current = null;
    };
  }, []);

  useEffect(() => {
    if (!burstKey || reduced.current) return;
    const o = originRef.current ?? { x: 0.5, y: 0.55 };
    const { w, h } = size.current;
    for (let i = 0; i < 110; i++) {
      const angle = Math.random() * Math.PI * 2;
      const speed = 4 + Math.random() * 9;
      particles.current.push({
        x: o.x * w,
        y: o.y * h,
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed - 4,
        size: 7 + Math.random() * 9,
        rot: Math.random() * Math.PI * 2,
        vr: (Math.random() - 0.5) * 0.3,
        color: COLORS[Math.floor(Math.random() * COLORS.length)],
        shape: SHAPES[Math.floor(Math.random() * SHAPES.length)],
        life: 0,
        max: 90 + Math.random() * 60,
        gravity: 0.18,
      });
    }
    start();
  }, [burstKey, start]);

  useEffect(() => {
    if (!shower || reduced.current) return;
    let rounds = 0;
    const id = window.setInterval(() => {
      const { w } = size.current;
      for (let i = 0; i < 14; i++) {
        particles.current.push({
          x: Math.random() * w,
          y: -20,
          vx: (Math.random() - 0.5) * 2,
          vy: 1.5 + Math.random() * 2.5,
          size: 7 + Math.random() * 9,
          rot: Math.random() * Math.PI * 2,
          vr: (Math.random() - 0.5) * 0.2,
          color: COLORS[Math.floor(Math.random() * COLORS.length)],
          shape: SHAPES[Math.floor(Math.random() * SHAPES.length)],
          life: 0,
          max: 400,
          gravity: 0.02,
        });
      }
      start();
      rounds += 1;
      if (rounds > 40) window.clearInterval(id);
    }, 180);
    return () => window.clearInterval(id);
  }, [shower, start]);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 z-[60] h-full w-full"
    />
  );
}
