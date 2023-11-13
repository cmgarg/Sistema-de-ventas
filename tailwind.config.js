/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {},
  },
  plugins: [function ({ addUtilities }) {
    const newUtilities = {
      '.app-region-drag': {
        '-webkit-app-region': 'drag',
      },
      '.app-region-no-drag': {
        '-webkit-app-region': 'no-drag',
      },
    };
    addUtilities(newUtilities);
  },],
}

