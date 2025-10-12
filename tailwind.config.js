// tailwind.config.js
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/app/**/*.{js,ts,jsx,tsx}",        // ✅ your pages/components
    "./src/components/**/*.{js,ts,jsx,tsx}",  // ✅ if you have a components folder
    "./src/**/*.{js,ts,jsx,tsx}",             // ✅ optional but safe
  ],
  safelist: [
    'slick-center',
    'opacity-60',
    'opacity-100',
    'blur-sm',
    'blur-none',
    'scale-90',
    'scale-100',
  ],
  theme: {
    extend: {},
  },
  plugins: [],
};
