module.exports = {
  purge: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
  darkMode: false,
  theme: {
    extend: {
      colors: {
        'custom-dark-blue': '#334155',
      },
      animation: {
        marqueeLtoR: 'marqueeLtoR 20s linear infinite',
        marqueeRtoL: 'marqueeRtoL 20s linear infinite',
        borderPulse: 'borderPulse 2s infinite',
        rotateBorder: 'rotateBorder 3s linear infinite',      },
      keyframes: {
        marqueeLtoR: {
          '0%': { transform: 'translateX(-100%)' },
          '100%': { transform: 'translateX(100%)' },
        },
        marqueeRtoL: {
          '0%': { transform: 'translateX(100%)' },
          '100%': { transform: 'translateX(-100%)' },
        },
        borderPulse: {
          '0%': { borderColor: '#334155' },
          '50%': { borderColor: '#ff9900' },
          '100%': { borderColor: '#334155' },
        },
        borderRotate: {
          '0%': { borderColor: '#334155', transform: 'rotate(0deg)' },
          '100%': { borderColor: '#ff9900', transform: 'rotate(360deg)' },
        },
        rotateBorder: {
          '0%': {
            transform: 'rotate(0deg)',
            borderColor: 'transparent transparent transparent #ff9900',
          },
          '25%': {
            transform: 'rotate(90deg)',
            borderColor: 'transparent transparent #ff9900 transparent',
          },
          '50%': {
            transform: 'rotate(180deg)',
            borderColor: 'transparent #ff9900 transparent transparent',
          },
          '75%': {
            transform: 'rotate(270deg)',
            borderColor: '#ff9900 transparent transparent transparent',
          },
          '100%': {
            transform: 'rotate(360deg)',
            borderColor: 'transparent transparent transparent #ff9900',
          },
        },
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
}
