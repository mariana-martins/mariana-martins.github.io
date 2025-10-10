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
        // Blues & Teals
        "light-blue": "hsl(var(--light-blue) / <alpha-value>)",
        blue: "hsl(var(--blue) / <alpha-value>)",
        "steel-blue": "hsl(var(--steel-blue) / <alpha-value>)",
        "dark-blue": "hsl(var(--dark-blue) / <alpha-value>)",
        "dark-teal": "hsl(var(--dark-teal) / <alpha-value>)",
        indigo: "hsl(var(--indigo) / <alpha-value>)",

        // Pinks & Roses
        "light-rose": "hsl(var(--light-rose) / <alpha-value>)",
        "light-pink": "hsl(var(--light-pink) / <alpha-value>)",
        rose: "hsl(var(--rose) / <alpha-value>)",
        "dark-pink": "hsl(var(--dark-pink) / <alpha-value>)",

        // Purples
        "light-purple": "hsl(var(--light-purple) / <alpha-value>)",
        "dark-purple": "hsl(var(--dark-purple) / <alpha-value>)",

        // Yellows & Warm Tones
        seashell: "hsl(var(--seashell) / <alpha-value>)",
        orange: "hsl(var(--orange) / <alpha-value>)",
        "light-yellow": "hsl(var(--light-yellow) / <alpha-value>)",
        peach: "hsl(var(--peach) / <alpha-value>)",
        yellow: "hsl(var(--yellow) / <alpha-value>)",

        // Greens
        green: "hsl(var(--green) / <alpha-value>)",

        // Greys & Neutrals
        grey: "hsl(var(--grey) / <alpha-value>)",
        "dark-grey": "hsl(var(--dark-grey) / <alpha-value>)",
      },
    },
  },
  plugins: [typography],
};
