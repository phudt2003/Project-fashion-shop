/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        brand: {
          50: '#f8fafc',
          500: '#111827',
          700: '#0f172a',
        },
      },
    },
  },
  plugins: [],
};

