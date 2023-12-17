/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        "dark1": "#050505",
        "dark2": "#000000",
        "dark3": "#101010",
        "dark4": "#070707",
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

