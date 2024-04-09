import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    letterSpacing: {
      wide: ".1em",
      superWide: ".5em",
    },
    extend: {
      fontFamily: {
        rubik: ["Rubik Scribble"],
        reenie: ["Reenie Beanie"],
        patrick: ["Patrick Hand"],
        pressStart: ["Pixelify Sans"],

      },

    }
  },
};
export default config;
