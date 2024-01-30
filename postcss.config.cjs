const presetEnv = require('postcss-preset-env');

module.exports = {
  plugins: [
    presetEnv({
      stage: false,
      features: {
        'media-query-ranges': true,
        'nesting-rules': true,
      },
    }),
  ],
};
