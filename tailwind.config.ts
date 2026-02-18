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
        "cream-dark": "#f0eeea",
        forest: {
          DEFAULT: "#166534",
          dark: "#14532d",
          light: "#22c55e",
        },
        bark: "#3d3529",
        stone: "#57534e",
      },
      fontFamily: {
        display: ['"DM Sans"', "sans-serif"],
        body: ['"Outfit"', "sans-serif"],
      },
    },
  },
  plugins: [],
};
export default config;
