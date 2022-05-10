module.exports = {
  content: ['src/**/*.{astro,svelte}'],
  theme: {
    extend: {
      colors: {
        'theme-light': '#D0B4AB',
        'theme-med': '#AD7461',
        'theme-dark': '#7A341A',
        'theme-text': '#362621',
      },
      fontFamily: {
        sans: 'Sora',
      },
    },
  },
  plugins: [],
};
