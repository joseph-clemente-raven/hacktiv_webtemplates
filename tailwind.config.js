/** @type {import('tailwindcss').Config} */
module.exports = {
    content: ["./src/**/*.{html,js}"],
    theme: {
      extend: {
        colors: {
          primary: '#5F8793',
          secondary: '',
          tertiary: ''
        },
        modal: {
          small: '300px',
          medium: '500px',
          large: '800px',
        },
        fontFamily: {},
      },
    },
    plugins: [],
};