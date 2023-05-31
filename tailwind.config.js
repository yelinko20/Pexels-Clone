/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      backgroundImage: {
        searchImage: "url('./src/assets/header.jpg')",
      },
      colors: {
        White: "#ffffff",
        Black: "#000000",
        Emerald600: "#059669",
        Emerald800: "#065F46",
        Gray200: "#e5e7eb",
      },
    },
  },
  plugins: [],
};
