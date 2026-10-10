"use client";

import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { useRouter } from "next/navigation";
import { useCallback, useEffect, useRef, useState } from "react";
import Confetti from "./Confetti";
import DodgingNoButton from "./DodgingNoButton";
import GlowHeart from "./GlowHeart";
import {
  NO_BUTTON_MESSAGES,
  PROPOSAL_MESSAGE,
  PROPOSAL_QUESTION,
  YES_LABEL,
} from "@/config/site";

const BURST_HEARTS = Array.from({ length: 14 }, (_, i) => {
  const angle = (i / 14) * Math.PI * 2;
  const dist = 120 + (i % 3) * 40;
  return { id: i, x: Math.cos(angle) * dist, y: Math.sin(angle) * dist, size: 22 + (i % 4) * 8 };
});

export default function ProposalSection() {
  const router = useRouter();
  const reduce = useReducedMotion();
  const areaRef = useRef<HTMLDivElement>(null);
  const yesRef = useRef<HTMLButtonElement>(null);
  const timer = useRef<number | null>(null);
  const messageIndex = useRef(0);

  const [phase, setPhase] = useState<"asking" | "celebrating">("asking");
  const [burst, setBurst] = useState(0);
  const [origin, setOrigin] = useState<{ x: number; y: number } | undefined>();
  const [announce, setAnnounce] = useState("");

  useEffect(() => {
    router.prefetch("/celebration");
    return () => {
      if (timer.current !== null) window.clearTimeout(timer.current);
    };
  }, [router]);

  const onDodge = useCallback(() => {
    setAnnounce(NO_BUTTON_MESSAGES[messageIndex.current % NO_BUTTON_MESSAGES.length]);
    messageIndex.current += 1;
  }, []);

  const onYes = () => {
    if (phase !== "asking") return;
    const rect = yesRef.current?.getBoundingClientRect();
    if (rect) {
      setOrigin({
        x: (rect.left + rect.width / 2) / window.innerWidth,
        y: (rect.top + rect.height / 2) / window.innerHeight,
      });
    }
    setBurst((b) => b + 1);
    setPhase("celebrating");
    timer.current = window.setTimeout(() => router.push("/celebration"), reduce ? 700 : 2000);
  };

  return (
    <section
      id="proposal"
      aria-labelledby="proposal-title"
      className="flex min-h-screen items-center justify-center px-4 py-20"
    >
      <motion.div
        initial={{ opacity: 0, y: reduce ? 0 : 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.9, ease: "easeOut" }}
        className="glass glow-card flex w-full max-w-3xl flex-col items-center rounded-[2rem] p-6 text-center sm:p-12"
      >
        <GlowHeart />
        <h2
          id="proposal-title"
          className="text-glow mt-5 text-balance font-display text-4xl font-semibold leading-tight text-cream sm:text-6xl"
        >
          {PROPOSAL_QUESTION}
        </h2>
        <p className="mt-6 max-w-xl text-base leading-relaxed text-blush sm:text-lg">{PROPOSAL_MESSAGE}</p>

        <div
          ref={areaRef}
          className="relative mt-8 flex min-h-[16rem] w-full flex-wrap items-center justify-center gap-6 sm:min-h-[14rem]"
        >
          <DodgingNoButton
            areaRef={areaRef}
            yesRef={yesRef}
            onDodge={onDodge}
            disabled={phase !== "asking"}
          />
          <motion.button
            ref={yesRef}
            type="button"
            onClick={onYes}
            disabled={phase !== "asking"}
            whileHover={reduce ? undefined : { scale: 1.07 }}
            whileTap={reduce ? undefined : { scale: 0.96 }}
            className="btn-primary text-lg"
          >
            {YES_LABEL}
          </motion.button>
        </div>

        <p id="no-help" className="sr-only">
          The No button is playful and hops away when you try to press it. Press Tab to reach the Absolutely Yes button.
        </p>
        <p role="status" aria-live="polite" className="mt-2 min-h-[1.75rem] text-sm text-blush/90">
          {announce}
        </p>
      </motion.div>

      <Confetti burstKey={burst} origin={origin} />

      <AnimatePresence>
        {phase === "celebrating" && (
          <motion.div
            key="transition"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
            className="fixed inset-0 z-[55] flex items-center justify-center bg-burgundy-deep/85 backdrop-blur-md"
            role="status"
          >
            <div className="relative flex flex-col items-center gap-4 px-6 text-center">
              {BURST_HEARTS.map((h) => (
                <motion.span
                  key={h.id}
                  aria-hidden="true"
                  className="absolute left-1/2 top-1/2 -ml-3 -mt-3 leading-none"
                  style={{ fontSize: h.size }}
                  initial={{ x: 0, y: 0, scale: 0, opacity: 0 }}
                  animate={
                    reduce
                      ? { opacity: 0.8, scale: 1 }
                      : { x: h.x, y: h.y, scale: [0, 1.4, 1], opacity: [0, 1, 0.85] }
                  }
                  transition={{ duration: 1.2, ease: "easeOut" }}
                >
                  {h.id % 3 === 0 ? "✨" : "💖"}
                </motion.span>
              ))}
              <GlowHeart className="h-24 w-24" />
              <p className="text-glow font-display text-3xl font-semibold text-cream sm:text-5xl">
                Opening your celebration…
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
