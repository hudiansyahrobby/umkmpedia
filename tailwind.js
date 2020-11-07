const { colors } = require('tailwindcss/defaultTheme');

module.exports = {
  future: {
    removeDeprecatedGapUtilities: true,
  },
  purge: ['./src/components/**/*.{js,ts,jsx,tsx}', './src/pages/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        poppins: ['Poppins', 'sans-serif'],
      },
      colors: {
        blacklight: 'rgba(0, 0, 0, 0.6)',
        red: {
          ...colors.red,
          hell: '#FF0000',
          light: '#E34133',
          lightest: '#FFF2F2',
        },
        blue: {
          ...colors.blue,
          sea: '#11BDEF',
          beach: '#11BDEF',
          dark: '#4064AC',
          light: '#1C9CEA',
        },
        yellow: {
          ...colors.yellow,
          dark: '#FFD600',
        },
        gray: {
          ...colors.gray,
          light: '#F6F6F6',
          lighter: '#ABABAB',
          lightest: '#F5F5F5',
          normal: '#A4A4A4',
          dark: '#D1D1D1',
          darker: '#515050',
          darkest: '#666161',
        },
      },
      screens: {
        smx: '696px',
        mdx: '992px',
      },
      backgroundImage: (theme) => ({
        hero: "url('/images/shoe-1.png')",
      }),
      borderRadius: {
        mammoth: '1.25rem',
      },
      fontSize: {
        tiny: '0.5rem',
      },
    },
  },
  variants: {},
  plugins: [],
};
