import typography from "@tailwindcss/typography";

/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        heading: ["var(--font-heading)"],
        body: ["var(--font-body)"],
      },
      colors: {
        // Blue Scale
        blue: {
          50: "hsl(var(--blue-50) / <alpha-value>)",
          100: "hsl(var(--blue-100) / <alpha-value>)",
          300: "hsl(var(--blue-300) / <alpha-value>)",
          500: "hsl(var(--blue-500) / <alpha-value>)",
          700: "hsl(var(--blue-700) / <alpha-value>)",
          900: "hsl(var(--blue-900) / <alpha-value>)",
        },

        // Indigo Scale
        indigo: {
          700: "hsl(var(--indigo-700) / <alpha-value>)",
          800: "hsl(var(--indigo-800) / <alpha-value>)",
          900: "hsl(var(--indigo-900) / <alpha-value>)",
        },

        // Pink Scale
        pink: {
          100: "hsl(var(--pink-100) / <alpha-value>)",
          300: "hsl(var(--pink-300) / <alpha-value>)",
          700: "hsl(var(--pink-700) / <alpha-value>)",
        },

        // Purple Scale
        purple: {
          200: "hsl(var(--purple-200) / <alpha-value>)",
          600: "hsl(var(--purple-600) / <alpha-value>)",
        },

        // Warm Tones Scale
        warm: {
          50: "hsl(var(--warm-50) / <alpha-value>)",
          100: "hsl(var(--warm-100) / <alpha-value>)",
          200: "hsl(var(--warm-200) / <alpha-value>)",
          300: "hsl(var(--warm-300) / <alpha-value>)",
          500: "hsl(var(--warm-500) / <alpha-value>)",
        },

        // Green
        green: "hsl(var(--green) / <alpha-value>)",

        // Grey
        grey: "hsl(var(--grey) / <alpha-value>)",

        // Utility Colors
        text: "hsl(var(--text-color) / <alpha-value>)",
        heading: "hsl(var(--heading-color) / <alpha-value>)",
      },
      backgroundImage: {
        "gradient-main": "var(--background-gradient)",
      },
    },
  },
  plugins: [typography],
};
