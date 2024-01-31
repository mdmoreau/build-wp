export default {
  server: {
    open: 'http://vite.localhost/',
  },
  build: {
    outDir: 'public/dist',
    copyPublicDir: false,
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
