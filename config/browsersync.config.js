const compression = require('compression');

module.exports = {
  files: [
    '**/*.php',
    'dist/**/*',
  ],
  watchEvents: [
    'add',
    'change',
    'unlink',
    'addDir',
    'unlinkDir',
  ],
  proxy: {
    target: 'site.localhost',
    middleware: compression(),
  },
  open: 'ui',
};
