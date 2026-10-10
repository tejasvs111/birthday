"use client";

import { motion, useReducedMotion } from "framer-motion";
import BirthdayIllustration from "./BirthdayIllustration";
import { BIRTHDAY_MESSAGE, HERO_TITLE, SURPRISE_BUTTON_LABEL } from "@/config/site";

export default function Hero() {
  const reduce = useReducedMotion();

  const scrollToProposal = () => {
    document
      .getElementById("proposal")
      ?.scrollIntoView({ behavior: reduce ? "auto" : "smooth", block: "start" });
  };

  const rise = (delay: number) => ({
    initial: { opacity: 0, y: reduce ? 0 : 28 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.9, delay, ease: "easeOut" as const },
  });

  return (
    <section
      aria-labelledby="hero-title"
      className="relative mx-auto flex min-h-screen w-full max-w-3xl flex-col items-center justify-center px-5 pb-16 pt-20 text-center"
    >
      <motion.div
        initial={{ opacity: 0, scale: reduce ? 1 : 0.85 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1.1, ease: "easeOut" }}
        className="w-64 sm:w-80"
      >
        <BirthdayIllustration className="h-auto w-full drop-shadow-[0_10px_40px_rgba(255,111,145,0.3)]" />
      </motion.div>

      <motion.h1
        id="hero-title"
        {...rise(0.3)}
        className="text-glow mt-6 text-balance font-display text-5xl font-semibold leading-[1.05] text-cream sm:text-7xl"
      >
        {HERO_TITLE}
      </motion.h1>

      <motion.p
        {...rise(0.55)}
        className="glass mt-8 rounded-3xl p-6 text-base leading-relaxed text-blush sm:p-8 sm:text-lg"
      >
        {BIRTHDAY_MESSAGE}
      </motion.p>

      <motion.div {...rise(0.8)} className="mt-10">
        <motion.button
          type="button"
          onClick={scrollToProposal}
          whileHover={reduce ? undefined : { scale: 1.05 }}
          whileTap={reduce ? undefined : { scale: 0.97 }}
          animate={
            reduce
              ? undefined
              : {
                  boxShadow: [
                    "0 0 20px rgba(255,111,145,0.3)",
                    "0 0 50px rgba(255,111,145,0.6)",
                    "0 0 20px rgba(255,111,145,0.3)",
                  ],
                }
          }
          transition={{ duration: 2.4, repeat: Infinity, ease: "easeInOut" }}
          className="btn-primary text-lg"
        >
          {SURPRISE_BUTTON_LABEL}
        </motion.button>
      </motion.div>
    </section>
  );
}
