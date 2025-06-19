import defaultConfig from '@wordpress/scripts/config/webpack.config.js';
import BrowserSyncPlugin from 'browser-sync-webpack-plugin';

defaultConfig.module.rules
  .find((rule) => rule.test.toString().includes('.css'))
  .use.find((loader) => loader.loader.includes('/css-loader/'))
  .options.url = false;

export default {
  ...defaultConfig,
  entry: {
    ...defaultConfig.entry(),
    main: ['./src/main.css', './src/main.js'],
    editor: ['./src/editor.css', './src/editor.js'],
  },
  plugins: [
    ...defaultConfig.plugins,
    new BrowserSyncPlugin({
      proxy: 'http://localhost',
      files: ['**/*.php', 'build/*.css', 'build/*.js'],
      injectChanges: true,
    }),
  ],
};
