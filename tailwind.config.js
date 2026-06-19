/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        paper: "#FFFDE8",
        pink: {
          DEFAULT: "#FF9899",
          light: "#FDC9C6",
          cta: "#FDA8A6",
        },
        blue: {
          DEFAULT: "#66D2FF",
          lleken: "#DFF5FF",
        },
        yellow: {
          DEFAULT: "#FEEE74",
          kellun: "#FFFACC",
        },
        ink: {
          DEFAULT: "#1A1A1A",
          2: "#444444",
        },
      },
      fontFamily: {
        sans: ["'Plus Jakarta Sans'", "sans-serif"],
        mono: ["'Space Mono'", "monospace"],
        serif: ["'Playfair Display'", "serif"],
      },
      boxShadow: {
        'hard': '5px 5px 0px 0px #1A1A1A',
        'hard-sm': '3px 3px 0px 0px #1A1A1A',
        'hard-pink': '4px 4px 0px 0px #FF9899',
        'hard-blue': '4px 4px 0px 0px #66D2FF',
        'hard-yellow': '4px 4px 0px 0px #FEEE74',
      },
      borderWidth: {
        '1.5': '1.5px',
      }
    },
  },
  plugins: [],
}
