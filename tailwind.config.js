/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        "primary-black": "#0f172a",
        "primary-gray": "#9ca3af",
        "primary-amber": "#f59e0b",
        "primary-green": "#059669",
        "primary-red": "#dc2626",
        "secondary-blue": "#3b82f6"
      },
      fontFamily: {
        baseFamily: "Inter",
        artFamily: "Qwitcher Grypen",
        headFamily: "Oswald",
      },
      fontSize: {
        h4: ['1.125rem', "1"], // 18px
        h3: ['1.25rem', "1"], // 20px
        h2: ['1.5rem', "1"], // 24px
        h1: ['2.25rem', "1"], // 30px
        headline: ['3.25rem', "1.25"],
        small: ['0.75rem', "1"],
      },
    },
  },
  plugins: [
    require('tailwind-scrollbar-hide'),
    require('@tailwindcss/typography')
    // ...
  ]
}
