/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        "dark1": "#0b090a",
        "dark2": "#161a1d",
        "dark3": "#262a2d",
        "dark4": "#141414",
        "red1": "#660708",
        "red2": "#a4161a",
        "red3": "#ba181b",
        "red4": "#e5383b",
        "light1": "#b1a7a6",
        "light2": "#d3d3d3",
        "light3": "#f5f3f4",
      },
      fontFamily: {
        monobold: ["mono-bold", "sans-serif"],
        monolight: ["mono-light", "sans"],
        monoregular: ["mono-regular", "sans-serif"]
      }
    },
  },
  plugins: [],
}

