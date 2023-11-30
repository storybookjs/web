import type { Config } from "tailwindcss";
const { fontFamily } = require("tailwindcss/defaultTheme");

const config: Config = {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      height: {
        18: "4.5rem",
      },
      colors: {
        blue: {
          50: "#F3F9FE",
          100: "#E3F2FF",
          200: "#AFDAFF",
          300: "#8FCBFF",
          400: "#52AFFF",
          500: "#029CFD",
          600: "#1778E9",
          700: "#0D64CA",
          800: "#1E4FAF",
          900: "#1E3A8A",
        },
      },
      fontFamily: {
        sans: ["var(--font-sans)", ...fontFamily.sans],
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
      },
      maxWidth: {
        "8xl": "90rem",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
};
export default config;
