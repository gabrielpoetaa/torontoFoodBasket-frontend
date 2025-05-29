/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}", "./public/index.html"],
  theme: {
    extend: {
      colors: {
        woodsmoke: {
          50: "var(--woodsmoke-50)",
          100: "var(--woodsmoke-100)",
          200: "var(--woodsmoke-200)",
          300: "var(--woodsmoke-300)",
          400: "var(--woodsmoke-400)",
          500: "var(--woodsmoke-500)",
          600: "var(--woodsmoke-600)",
          700: "var(--woodsmoke-700)",
          800: "var(--woodsmoke-800)",
          900: "var(--woodsmoke-900)",
          950: "var(--woodsmoke-950)",
        },
      },
    },
  },
  plugins: [],
  corePlugins: {
    preflight: false,
  },
};
