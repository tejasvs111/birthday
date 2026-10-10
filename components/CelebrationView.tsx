"use client";

import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import Link from "next/link";
import { useRef, useState } from "react";
import Confetti from "./Confetti";
import FloatingItems from "./FloatingItems";
import Gallery from "./Gallery";
import GlowHeart from "./GlowHeart";
import RoseBouquet from "./RoseBouquet";
import {
  CELEBRATION_MESSAGE,
  CELEBRATION_SUBTITLE,
  CELEBRATION_TITLE,
  FINAL_LINE,
  FOOTER_TEXT,
  REPLAY_LABEL,
  SEND_LOVE_LABEL,
  SIGNATURE,
} from "@/config/site";

type Love = { id: number; left: number; size: number; rise: number; glyph: string };

const PETALS = ["🌸", "🌹", "💮", "🌷"];
const LOVE_GLYPHS = ["❤️", "💖", "💗", "💕", "💘"];

export default function CelebrationView() {
  const reduce = useReducedMotion();
  const nextId = useRef(0);
  const [loves, setLoves] = useState<Love[]>([]);
  const [burst, setBurst] = useState(0);

  const sendLove = () => {
    const amount = reduce ? 4 : 14;
    const fresh: Love[] = Array.from({ length: amount }, () => {
      nextId.current += 1;
      return {
        id: nextId.current,
        left: 5 + Math.random() * 90,
        size: 22 + Math.random() * 26,
        rise: window.innerHeight * (0.6 + Math.random() * 0.5),
        glyph: LOVE_GLYPHS[Math.floor(Math.random() * LOVE_GLYPHS.length)],
      };
    });
    setLoves((prev) => [...prev, ...fresh]);
    setBurst((b) => b + 1);
    const ids = new Set(fresh.map((f) => f.id));
    window.setTimeout(() => setLoves((prev) => prev.filter((l) => !ids.has(l.id))), 3600);
  };

  const fade = (delay: number) => ({
    initial: { opacity: 0, y: reduce ? 0 : 30 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.9, delay, ease: "easeOut" as const },
  });

  return (
    <>
      <div aria-hidden="true" className="pointer-events-none fixed inset-0 z-0 overflow-hidden">
        <FloatingItems count={18} glyphs={PETALS} minSize={18} maxSize={36} />
      </div>
      <Confetti shower burstKey={burst} origin={{ x: 0.5, y: 0.8 }} />

      <main className="relative mx-auto flex w-full max-w-3xl flex-col items-center px-5 pb-10 pt-20 text-center">
        <motion.div {...fade(0)}>
          <GlowHeart className="h-24 w-24 sm:h-28 sm:w-28" />
        </motion.div>

        <motion.h1
          {...fade(0.2)}
          className="text-glow mt-5 text-balance font-display text-5xl font-semibold leading-[1.05] text-cream sm:text-7xl"
        >
          {CELEBRATION_TITLE}
        </motion.h1>

        <motion.p {...fade(0.45)} className="mt-5 max-w-xl text-lg leading-relaxed text-blush sm:text-xl">
          {CELEBRATION_SUBTITLE}
        </motion.p>

        <motion.div {...fade(0.65)} className="mt-8 w-52 sm:w-64">
          <RoseBouquet className="h-auto w-full drop-shadow-[0_10px_40px_rgba(255,111,145,0.35)]" />
        </motion.div>

        <motion.article
          initial={{ opacity: 0, y: reduce ? 0 : 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.9, ease: "easeOut" }}
          className="glass glow-card mt-12 flex flex-col gap-4 rounded-[2rem] p-6 text-left text-base leading-relaxed text-cream sm:p-10 sm:text-lg"
        >
          {CELEBRATION_MESSAGE.map((paragraph, i) => (
            <p key={i} className={i === 0 ? "font-display text-2xl font-semibold text-blush sm:text-3xl" : undefined}>
              {paragraph}
            </p>
          ))}
        </motion.article>

        <motion.p
          initial={{ opacity: 0, scale: reduce ? 1 : 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1 }}
          className="text-glow mt-14 text-balance font-display text-4xl font-semibold italic leading-tight text-cream sm:text-6xl"
        >
          {FINAL_LINE}
        </motion.p>

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1, delay: 0.4 }}
          className="mt-6 font-display text-3xl font-semibold text-blush sm:text-4xl"
        >
          {SIGNATURE}
        </motion.p>

        <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
          <motion.button
            type="button"
            onClick={sendLove}
            whileHover={reduce ? undefined : { scale: 1.05 }}
            whileTap={reduce ? undefined : { scale: 0.96 }}
            className="btn-primary"
          >
            {SEND_LOVE_LABEL}
          </motion.button>
          <Link href="/" className="btn-ghost">
            {REPLAY_LABEL}
          </Link>
        </div>
      </main>

      <Gallery />

      <footer className="relative px-5 pb-12 pt-6 text-center">
        <motion.p
          animate={reduce ? undefined : { opacity: [0.6, 1, 0.6] }}
          transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut" }}
          className="text-sm text-blush"
        >
          {FOOTER_TEXT}
        </motion.p>
      </footer>

      <div aria-hidden="true" className="pointer-events-none fixed inset-0 z-[50] overflow-hidden">
        <AnimatePresence>
          {loves.map((l) => (
            <motion.span
              key={l.id}
              className="absolute bottom-0 leading-none"
              style={{ left: `${l.left}%`, fontSize: l.size }}
              initial={{ y: 0, opacity: 1, scale: 0.6 }}
              animate={
                reduce
                  ? { opacity: [1, 0] }
                  : { y: -l.rise, opacity: [1, 1, 0], scale: [0.6, 1, 1] }
              }
              transition={{ duration: reduce ? 1.5 : 3, ease: "easeOut" }}
            >
              {l.glyph}
            </motion.span>
          ))}
        </AnimatePresence>
      </div>
    </>
  );
}
