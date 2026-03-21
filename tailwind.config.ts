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
        cream: "#faf9f6",
        "cream-dark": "#ece9e3",
        forest: {
          DEFAULT: "#1a5c32",
          dark: "#14532d",
          light: "#d4e8d0",
        },
        bark: "#3d3529",
        stone: "#57534e",
        gold: "#c9a84c",
        moss: "#8a9a7b",
      },
      keyframes: {
        "gradient-shift": {
          "0%, 100%": { backgroundPosition: "0% 50%" },
          "50%": { backgroundPosition: "100% 50%" },
        },
      },
      animation: {
        "gradient-shift": "gradient-shift 12s ease infinite",
      },
      fontFamily: {
        display: ['"DM Sans"', "sans-serif"],
        body: ['"Outfit"', "sans-serif"],
        sans: ["var(--font-geist-sans)", "system-ui", "sans-serif"],
        mono: ["var(--font-geist-mono)", "monospace"],
      },
    },
  },
  plugins: [require("@tailwindcss/typography")],
};
export default config;
