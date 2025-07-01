import defaultConfig from '@wordpress/scripts/config/webpack.config.js';
import { dirname } from 'path';
import BrowserSyncPlugin from 'browser-sync-webpack-plugin';

defaultConfig.module.rules
  .find((rule) => rule.test.source.includes('\.css$'))
  .use.find((loader) => loader.loader.includes('/css-loader/'))
  .options.url = false;

defaultConfig.optimization.splitChunks.cacheGroups.style.name = (_, chunks, cacheGroupKey) => {
  const chunkName = chunks[0].name;
  return `${dirname(chunkName)}/${cacheGroupKey}`;
};

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
      files: ['build/**/*.php', 'build/**/*.css', 'build/**/*.js'],
      ignore: ['build/**/*.asset.php', 'build/**/*-rtl.css'],
    }, {
      reload: false,
    }),
  ],
};
