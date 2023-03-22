/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
    "./app/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      textShadow: {
        md: "2px 2px 4px rgb(0 0 0 / 45%);",
      },
      backgroundImage: {
        "gradient-to-b-dark":
          "linear-gradient(to bottom, rgba(20,20,20,.15) 0, rgba(20,20,20,.25) 25%, rgba(20,20,20,.45) 29%, rgba(20,20,20,.65) 44%, rgb(20,20,20,.85) 68%, rgb(20,20,20,100) 100%);",
        "gradient-to-b-light":
          "linear-gradient(to bottom, rgba(235,235,235,.15) 0, rgba(235,235,235,.25) 25%, rgba(235,235,235,.45) 29%, rgba(235,235,235,.65) 44%, rgb(235,235,235,.85) 68%, rgb(235,235,235,100) 100%);",
      },
    },
  },
  plugins: [
    require("tailwindcss-textshadow"),
    require("tailwind-scrollbar-hide"),
    require("tailwind-scrollbar"),
  ],
};
