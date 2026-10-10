"use client";

import { motion, useReducedMotion } from "framer-motion";
import type { RefObject } from "react";
import { useCallback, useEffect, useRef, useState } from "react";
import { NO_LABEL } from "@/config/site";

type Props = {
  /** The area the button is allowed to roam in. */
  areaRef: RefObject<HTMLDivElement>;
  /** The Yes button, which the No button must never cover. */
  yesRef: RefObject<HTMLButtonElement>;
  onDodge: () => void;
  disabled?: boolean;
};

/**
 * A "No" button that runs away. It hops to a random safe spot inside the area
 * when a mouse gets close, when it is touched, and when it is activated by keyboard.
 * It never navigates anywhere and never covers the Yes button.
 */
export default function DodgingNoButton({ areaRef, yesRef, onDodge, disabled = false }: Props) {
  const slotRef = useRef<HTMLSpanElement>(null);
  const btnRef = useRef<HTMLButtonElement>(null);
  const lastMove = useRef(0);
  const [pos, setPos] = useState({ x: 0, y: 0 });
  const reduce = useReducedMotion();

  const move = useCallback(() => {
    const slot = slotRef.current;
    const btn = btnRef.current;
    const area = areaRef.current;
    const yes = yesRef.current;
    if (!slot || !btn || !area || !yes) return;

    const now = Date.now();
    if (now - lastMove.current < 220) return;
    lastMove.current = now;

    const vw = document.documentElement.clientWidth;
    const vh = window.innerHeight;
    const areaRect = area.getBoundingClientRect();
    const home = slot.getBoundingClientRect();
    const current = btn.getBoundingClientRect();
    const yesRect = yes.getBoundingClientRect();

    const w = current.width;
    const h = current.height;
    const margin = 8;
    const minX = Math.max(areaRect.left, margin);
    const maxX = Math.min(areaRect.right, vw - margin) - w;
    const minY = Math.max(areaRect.top, margin);
    const maxY = Math.min(areaRect.bottom, vh - margin) - h;
    if (maxX <= minX || maxY <= minY) return;

    const pad = 18;
    let best: { x: number; y: number; score: number } | null = null;
    for (let i = 0; i < 40; i++) {
      const x = minX + Math.random() * (maxX - minX);
      const y = minY + Math.random() * (maxY - minY);
      const coversYes =
        x < yesRect.right + pad &&
        x + w > yesRect.left - pad &&
        y < yesRect.bottom + pad &&
        y + h > yesRect.top - pad;
      if (coversYes) continue;
      const dist = Math.hypot(x - current.left, y - current.top);
      if (dist >= 140) {
        best = { x, y, score: dist };
        break;
      }
      if (!best || dist > best.score) best = { x, y, score: dist };
    }
    if (!best) return;

    setPos({ x: best.x - home.left, y: best.y - home.top });
    onDodge();
  }, [areaRef, yesRef, onDodge]);

  // Dodge when a mouse pointer gets close, before it can even hover.
  useEffect(() => {
    if (disabled) return;
    const onMove = (e: PointerEvent) => {
      if (e.pointerType !== "mouse") return;
      const btn = btnRef.current;
      if (!btn) return;
      const r = btn.getBoundingClientRect();
      const dx = Math.max(r.left - e.clientX, 0, e.clientX - r.right);
      const dy = Math.max(r.top - e.clientY, 0, e.clientY - r.bottom);
      if (Math.hypot(dx, dy) < 48) move();
    };
    window.addEventListener("pointermove", onMove);
    return () => window.removeEventListener("pointermove", onMove);
  }, [move, disabled]);

  // Layout changes on resize, so send the button home.
  useEffect(() => {
    const reset = () => setPos({ x: 0, y: 0 });
    window.addEventListener("resize", reset);
    return () => window.removeEventListener("resize", reset);
  }, []);

  return (
    <span ref={slotRef} className="relative inline-block">
      <motion.button
        ref={btnRef}
        type="button"
        aria-describedby="no-help"
        animate={{ x: pos.x, y: pos.y }}
        transition={reduce ? { duration: 0 } : { type: "spring", stiffness: 260, damping: 20 }}
        onPointerEnter={(e) => {
          if (e.pointerType === "mouse") move();
        }}
        onPointerDown={(e) => {
          e.preventDefault();
          move();
        }}
        onClick={(e) => {
          e.preventDefault();
          move();
        }}
        disabled={disabled}
        className="btn-ghost touch-none select-none"
      >
        {NO_LABEL}
      </motion.button>
    </span>
  );
}
