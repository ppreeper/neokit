import commonjs from '@rollup/plugin-commonjs';
import { terser } from 'rollup-plugin-terser';
import { defineConfig } from 'vite';

export default defineConfig({
  build: {
    rollupOptions: {
      input: 'src/index.js',
      output: [
        {
          file: './dist/neokit.js',
          format: 'es',
        },
        {
          file: './dist/neokit.min.js',
          format: 'es',
          name: 'version',
          plugins: [terser()],
        },
      ],
      plugins: [commonjs()],
    },
  },
});
