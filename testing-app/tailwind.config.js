/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,ts}", // Đảm bảo Tailwind quét qua tất cả các tệp HTML và TypeScript
  ],
  theme: {
    extend: {
      colors: {
        background: '#F5F5F5',

      }
    },
  },
  plugins: [],
};