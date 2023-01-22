// postcss.config.js
module.exports = {
  plugins: {
    'postcss-import-ext-glob': {},
    'postcss-import': {},
    'postcss-custom-media': {},
    'tailwindcss/nesting': 'postcss-nesting',
    'tailwindcss': {},
    'autoprefixer': {},
    'cssnano': {}
  }
};
