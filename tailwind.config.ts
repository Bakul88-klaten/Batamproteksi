import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        // Design plan (see notes below): grounded in Batam as a port /
        // free-trade-zone city — ledger, manifest, cargo-seal vocabulary —
        // rather than the generic navy/gold insurance palette.
        ink: "#15231D",       // near-black green, like old harbor ledgers
        sand: "#EDE6D6",      // manifest paper
        rust: "#A6552E",      // cargo-seal copper, the one accent color
        slate: "#3E5A55",     // muted dock-teal, secondary
        line: "#C9BFA8",      // hairline rule color on sand
      },
      fontFamily: {
        display: ["'Source Serif 4'", "Georgia", "serif"],
        body: ["'IBM Plex Sans'", "system-ui", "sans-serif"],
        mono: ["'IBM Plex Mono'", "monospace"],
      },
      borderRadius: {
        none: "0px",
      },
    },
  },
  plugins: [],
};

export default config;
