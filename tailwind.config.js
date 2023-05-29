/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      colors: {
        primary: "#FF2E00",
        offwhite: "#E3C8C2",
      },
      fontFamily: {
        ortica: "Ortica",
        glyph: "Glyph World",
      },
      fontSize: {
        zuzany: [
          "48px",
          {
            letterSpacing: "-1px",
            fontWeight: "400",
            lineHeight: "57.6px",
          },
        ],
        jirsove: [
          "48px",
          {
            letterSpacing: "-2px",
            fontWeight: "600",
            lineHeight: "57.6px",
          },
        ],
      },
      animation: {
        pulseShadow: "pulseShadow 2.5s linear infinite",
      },
      keyframes: {
        pulseShadow: {
          "0%": {
            boxShadow: "0 0 10px -5px rgba(227, 200, 194, 1)",
          },
          "40%, 100%": {
            boxShadow: "0 0 10px 40px rgba(0, 0, 0, 0)",
          },
        },
      },
    },
  },
  plugins: [],
};
