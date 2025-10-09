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
        // Background Colors
        "background-top": "hsl(var(--background-top))",
        "background-bottom": "hsl(var(--background-bottom))",
        background: "hsl(var(--background))",

        // Text Colors
        foreground: "hsl(var(--foreground))",
        "foreground-secondary": "hsl(var(--foreground-secondary))",

        // Card Colors
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },

        // Accent Colors
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },

        // Border Colors
        border: "hsl(var(--border))",
        ring: "hsl(var(--ring))",

        // Skill Badge Colors
        "badge-html-css": "hsl(var(--badge-html-css))",
        "badge-js-ts": "hsl(var(--badge-js-ts))",
        "badge-react": "hsl(var(--badge-react))",
        "badge-tailwind": "hsl(var(--badge-tailwind))",
        "badge-git": "hsl(var(--badge-git))",
        "badge-testing": "hsl(var(--badge-testing))",
      },
    },
  },
  plugins: [typography],
};
