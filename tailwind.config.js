/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
    "./src/**/*.{js,ts,jsx,tsx}",
    "node_modules/react-daisyui/dist/**/*.js",
    "node_modules/daisyui/dist/**/*.js"

  ],
    theme: {
    extend: {},
  },
  plugins: [require("daisyui")],
  important: true,
  darkMode: 'class',
}
