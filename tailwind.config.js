/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        "bebas-neue": ['"Bebas Neue"', "sans-serif"],
        orbitron: ['"Orbitron"', "sans-serif"],
        rajdhani: ['"Rajdhani"', "sans-serif"],
        anton: ['"Anton"', "sans-serif"],
        michroma: ['"Michroma"', "sans-serif"],
      },
    },
  },
  plugins: [],
};
