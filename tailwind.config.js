/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
  },
  variants: {
    extend: {
      transform: ['before', 'after'],
      zIndex: ['before', 'after'],
      backgroundColor: ['before', 'after'],
      borderRadius: ['before', 'after'],
      inset: ['before', 'after'],
    },
  },
  plugins: [
	function ({ addUtilities }) {
      const newUtilities = {
        '.relative::before': {
          content: "''",
          position: 'absolute',
          zIndex: '0',
          width: '100%',
          height: '100%',
          borderRadius: '15% 70% 15% 70% / 70% 15% 70% 15%',
          transition: 'transform 0.2s',
          background: 'yellow',
          top: '-5px',
          left: '-5px',
        },
        '.relative::after': {
          content: "''",
          position: 'absolute',
          zIndex: '0',
          width: '100%',
          height: '100%',
          borderRadius: '15% 70% 15% 70% / 70% 15% 70% 15%',
          transition: 'transform 0.2s',
          background: 'red',
          top: '5px',
          right: '5px',
        },
      };

      addUtilities(newUtilities, ['before', 'after']);
    },
  ],
}

