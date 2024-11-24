import { brandColors } from './src/styles/constants';

/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        brand: brandColors
      },
    },
  },
  plugins: [],
};