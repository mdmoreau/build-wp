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
  proxy: 'site.localhost',
  open: 'ui',
};
