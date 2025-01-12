/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}", // Adjust if your project uses TypeScript or other folders
  ],
  theme: {
    extend: {},
  },
  plugins: [
    require('tailwindcss-rtl')
  ],
};
