/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {},
  },
  plugins: [
    function ({ addUtilities }) {
      const newUtilities = {
        ".app-region-drag": {
          "-webkit-app-region": "drag",
        },
        ".app-region-no-drag": {
          "-webkit-app-region": "no-drag",
        },
        ".border-x-1": {
          "border-left-width": "1px",
          "border-right-width": "1px",
        },
        ".border-y-1": {
          "border-top-width": "1px",
          "border-bottom-width": "1px",
        },
        ".border-b-1": {
          "border-bottom-width": "1px",
        },
        ".border-r-1": {
          "border-right-width": "1px",
        },
        ".border-l-1": {
          "border-lefth-width": "1px",
        },
        ".border-t-1": {
          "border-top-width": "1px",
        },
      };
      addUtilities(newUtilities);
    },
  ],
};
