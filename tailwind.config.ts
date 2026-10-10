import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        blush: { DEFAULT: "#f9d3dc", deep: "#f2a9bd" },
        rose: { DEFAULT: "#d1345b", glow: "#ff6f91" },
        cream: "#fff4ea",
        burgundy: { DEFAULT: "#5b1030", mid: "#7a1a40", deep: "#2a0715" },
      },
      fontFamily: {
        display: ["'Cormorant Garamond'", "Georgia", "serif"],
        body: ["Jost", "system-ui", "sans-serif"],
      },
      boxShadow: {
        glow: "0 0 40px rgba(255, 111, 145, 0.35)",
      },
    },
  },
  plugins: [],
};

export default config;
