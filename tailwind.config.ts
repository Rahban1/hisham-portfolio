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
        piano: {
          black: "#0D0D0D",
          white: "#F5F5F5",
          dark: "#0A0A0A",
          gray: "#141414",
          card: "#1A1A1A",
        },
        text: {
          primary: "#FAFAFA",
          secondary: "#A3A3A3",
          accent: "#FFFFFF",
        },
      },
      fontFamily: {
        heading: ["var(--font-cormorant)", "serif"],
        body: ["var(--font-inter)", "sans-serif"],
      },
    },
  },
  plugins: [],
};
export default config;
