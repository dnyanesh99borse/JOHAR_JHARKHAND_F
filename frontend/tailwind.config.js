/** @type {import('tailwindcss').Config} */
export default {
  content: [
  "./index.html",
  "./src/**/*.{js,jsx,ts,tsx}",
  "./hotel-booking/src/**/*.{js,jsx,ts,tsx}",
  "./registered-tour-operators/src/**/*.{js,jsx,ts,tsx}",
  "./src/**/*.css",
],

  theme: {
    extend: {
      colors: {
        primary: "#2563EB",   // Blue
        secondary: "#FBBF24", // Yellow
      },
      fontFamily: {
        outfit: ["Outfit", "sans-serif"],
        playfair: ["Playfair", "serif"],
      },
    },
  },
  plugins: [],
}
