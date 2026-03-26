/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        fifa: {
          black:  "#0a0a0a",
          white:  "#ffffff",
          gray:   "#f2f2f2",
          mid:    "#8a8a8a",
          border: "#e0e0e0",
          blue:   "#1a4fd6",
        },
        gold:      "#c9a84c",
        "gold-lt": "#e8c96a",
        navy:      "#0a1628",
      },
      fontFamily: {
        display: ["'Bebas Neue'", "sans-serif"],
        body:    ["'DM Sans'",    "sans-serif"],
      },
      animation: {
        "fade-up":   "fadeUp .5s ease both",
        "pulse-dot": "pulseDot 1.5s ease-in-out infinite",
      },
      keyframes: {
        fadeUp: {
          from: { opacity: 0, transform: "translateY(16px)" },
          to:   { opacity: 1, transform: "translateY(0)"    },
        },
        pulseDot: {
          "0%,100%": { opacity: 1 },
          "50%":     { opacity: 0.3 },
        },
      },
    },
  },
  plugins: [],
};
