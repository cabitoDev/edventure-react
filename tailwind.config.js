const { nextui } = require('@nextui-org/react')
/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './src/**/*.{js,jsx,ts,tsx}',
    './index.html',
    './node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}',
    './node_modules/react-tailwindcss-datepicker/dist/index.esm.js'
  ],
  theme: {
    extend: {}
  },
  darkMode: 'class',
  plugins: [nextui(), require('tailwindcss'), require('autoprefixer')]
}
