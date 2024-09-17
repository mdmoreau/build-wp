import defaultConfig from '@wordpress/scripts/config/webpack.config.js';

export default {
  ...defaultConfig,
  entry: {
    ...defaultConfig.entry(),
    editor: ['./src/editor.css', './src/editor.js'],
  },
};
