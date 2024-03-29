import { defineConfig } from 'vite';

export default defineConfig({
  server: {
    host: true,
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
  css: {
    transformer: 'lightningcss',
  },
  plugins: [
    {
      handleHotUpdate({ file, server }) {
        if (file.endsWith('.php')) {
          server.hot.send({ type: 'full-reload', path: '*' });
        }
      },
    },
  ],
});
