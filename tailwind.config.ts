import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        night: {
          DEFAULT: "#0F1210",
          light: "#161B18",
          lighter: "#1C2420",
        },
        cream: "#F2F0EB",
        "cream-dark": "#E8E6E0",
        forest: {
          DEFAULT: "#2ECC71",
          dark: "#1A5C32",
          muted: "#1A5C32",
          dim: "rgba(46, 204, 113, 0.15)",
          glow: "rgba(46, 204, 113, 0.08)",
        },
        bark: "#3d3529",
        ivory: "#E8E6E0",
        stone: "#8B9490",
        gold: "#C9A84C",
        moss: "#8a9a7b",
      },
      keyframes: {
        "gradient-shift": {
          "0%, 100%": { backgroundPosition: "0% 50%" },
          "50%": { backgroundPosition: "100% 50%" },
        },
        float: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-10px)" },
        },
        "pulse-soft": {
          "0%, 100%": { opacity: "0.4" },
          "50%": { opacity: "0.8" },
        },
      },
      animation: {
        "gradient-shift": "gradient-shift 12s ease infinite",
        float: "float 6s ease-in-out infinite",
        "pulse-soft": "pulse-soft 4s ease-in-out infinite",
      },
      fontFamily: {
        serif: [
          "var(--font-fraunces)",
          "Georgia",
          "'Times New Roman'",
          "serif",
        ],
        sans: ["var(--font-inter)", "system-ui", "sans-serif"],
        mono: ["var(--font-jetbrains-mono)", "monospace"],
        display: ["var(--font-fraunces)", "Georgia", "serif"],
      },
    },
  },
  plugins: [require("@tailwindcss/typography")],
};
export default config;
