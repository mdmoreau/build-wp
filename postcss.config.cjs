module.exports = {
  plugins: {
    'postcss-preset-env': {
      stage: false,
      features: {
        'mixins': true,
        'nesting-rules': true,
      },
    },
  },
};
