module.exports = {
  purge: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      colors: {
        'hacker-green': '#00ff00',
        'hacker-black': '#000000',
      },
      boxShadow: {
        'hacker-glow': '0 0 10px rgba(0, 255, 0, 0.5), 0 0 20px rgba(0, 255, 0, 0.3), 0 0 30px rgba(0, 255, 0, 0.2)',
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
};

