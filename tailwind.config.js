/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx}",       // classic routing
    "./src/components/**/*.{js,ts,jsx,tsx}",  // shared UI components
    "./src/app/**/*.{js,ts,jsx,tsx}",         // optional: if you're using App Router
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}
