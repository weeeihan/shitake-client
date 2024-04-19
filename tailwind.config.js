/** @type {import('tailwindcss').Config} */
export default {
  content: [    
    "./index.html",
  "./src/**/*.{js,ts,jsx,tsx}",],
  theme: {
    extend: {
      fontFamily: {
        rubik: ["Rubik Scribble"],
        reenie: ["Reenie Beanie"],
        patrick: ["Patrick Hand"],
        pressStart: ["Pixelify Sans"],

      },
      letterSpacing: {
        wide: ".1em",
        superWide: ".5em",
      },

    },
  },
  plugins: [],
}

