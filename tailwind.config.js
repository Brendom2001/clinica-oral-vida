/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'ocean': '#1B4F72',
        'ocean-dark': '#153D5A',
        'ocean-light': '#2E6B99',
        'gold': '#C9A84C',
        'gold-light': '#D9B96A',
        'bg-alt': '#F4F6F8',
        'text-main': '#1A2332',
        'text-muted': '#6B7A8D',
      },
      fontFamily: {
        'playfair': ['"Playfair Display"', 'Georgia', 'serif'],
        'dm': ['"DM Sans"', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
