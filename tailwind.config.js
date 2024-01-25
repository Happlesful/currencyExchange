/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx,html}"],
  theme: {
    extend: {
      spacing: { sm: "30rem", md: "36rem", slg: "44.5rem", lg: "48rem" },
      scale: { 102: "1.02" },
    },
  },
  plugins: [],
};
