/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#6366f1", // Electric Indigo
        background: "#121212", // Deep Charcoal
        surface: "rgba(255, 255, 255, 0.05)", // Glassmorphism surface
        accent: "#94a3b8", // Slate Gray
      },
      fontFamily: {
        inter: ["Inter", "sans-serif"],
      },
      backdropBlur: {
        xs: "2px",
      },
    },
  },
  plugins: [],
};