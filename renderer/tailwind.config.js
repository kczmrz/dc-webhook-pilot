const colors = require('tailwindcss/colors');

module.exports = {
  content: [
    './renderer/pages/**/*.{js,ts,jsx,tsx}',
    './renderer/components/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    screens: {
      sm: '480px',
      md: '768px',
      lg: '976px',
      xl: '1440px',
    },
    colors: {
      transparent: 'transparent',
      current: 'currentColor',
      black: colors.black,
      white: colors.white,
      gray: colors.slate,
      blue: colors.blue,
      green: colors.emerald,
      purple: colors.violet,
      yellow: colors.amber,
      pink: colors.fuchsia,
      white: colors.white,
      red: colors.red,
      
      themeColor: {
        1: '#404258',
        2: '#474E68',
        3: '#50577A',
        4: '#6B728E',
        5: 'rgb(38, 50, 74, 0.6 )'
        
      }

    },
    minHeight: {
      '1/2': '50%',
    },
    extend: {
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
    },
  },
  plugins: [],
};