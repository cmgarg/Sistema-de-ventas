/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./app/**/*.{ts,tsx}",
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  prefix: "",
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
      },
    },
  },
  plugins: [
    require("tailwindcss-animate"),
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
        ".custom-scrollbar::-webkit-scrollbar": {
          width: "3px" /* Ancho del scrollbar */,
          "border-radius": "5px",
        },

        ".custom-scrollbar::-webkit-scrollbar-track": {
          background: "#737373" /* Color de fondo del track */,
          "border-radius": "5px",
        },

        ".custom-scrollbar::-webkit-scrollbar-thumb": {
          background: "#fff" /* Color del thumb */,
          "border-radius": "5px",
        },

        ".custom-scrollbar::-webkit-scrollbar-thumb:hover": {
          background: "#555" /* Color del thumb al pasar el mouse */,
          "border-radius": "5px",
        },
        ".recharts-rectangle::path": {
          fill: "#ffffff !important",
        },
      };
      addUtilities(newUtilities);
    },
  ],
};
