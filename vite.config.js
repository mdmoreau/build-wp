const host = 'site.localhost';

export default {
  server: {
    host,
    proxy: {
      '^(?!/(@vite|node_modules|src|images)/)': {
        target: `http://${host}`,
      },
    },
  },
  build: {
    rollupOptions: {
      input: ['src/styles/style.css', 'src/scripts/script.ts'],
      output: {
        assetFileNames: '[name][extname]',
        entryFileNames: '[name].js',
      },
    },
  },
  plugins: [
    {
      handleHotUpdate({ file, server }) {
        if (file.endsWith('.php')) {
          server.ws.send({ type: 'full-reload', path: '*' });
        }
      },
    },
  ],
}
