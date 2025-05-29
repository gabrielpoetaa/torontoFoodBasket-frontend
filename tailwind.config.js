/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}", "./public/index.html"],
  theme: {
    extend: {
      colors: {
        woodsmoke: {
          50: "#F7F7F8",
          100: "#EEEEF0",
          200: "#D9D9DC",
          300: "#B8B8BE",
          400: "#92929A",
          500: "#6E6E78",
          600: "#56565F",
          700: "#45454D",
          800: "#38383F",
          900: "#2F2F35",
        },
        sweetcorn: {
          50: "#FDFBF4",
          100: "#FBF7E9",
          200: "#F7EFD3",
          300: "#F3E7BD",
          400: "#EFDFA7",
          500: "#EBD791",
          600: "#E7CF7B",
          700: "#E3C765",
          800: "#DFBF4F",
          900: "#DBB739",
        },
      },
    },
  },
  plugins: [],
  corePlugins: {
    preflight: true,
  },
};
