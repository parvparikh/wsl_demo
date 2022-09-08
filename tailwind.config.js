/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}",],
  theme: {
   
    extend: {
      colors:{
        'orange':'#FF6525',
        'green':'#28996D',
  
      },
    },
    fontFamily: {
      'roboto': ['Roboto', 'sans-serif'],
    },
   
  },
  plugins: [],
}
