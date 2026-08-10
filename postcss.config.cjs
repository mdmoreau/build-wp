module.exports = {
  plugins: {
    '@csstools/postcss-global-data': {
      files: ['./src/global.css'],
    },
    'postcss-preset-env': {
      stage: false,
      features: {
        'mixins': true,
        'nesting-rules': true,
      },
    },
  },
};
