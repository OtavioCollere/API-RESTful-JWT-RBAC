
import { resolve } from 'node:path';
import swc from 'unplugin-swc';
import { defineConfig } from 'vitest/config';
import tsconfigPaths from 'vitest-tsconfig-paths'

export default defineConfig({
  test: {
    globals: true,
    root: './',
  },
  plugins: [
    tsconfigPaths(),
    swc.vite({
      // Explicitly set the module type to avoid inheriting this value from a `.swcrc` config file
      module: { type: 'es6' },
    }),
  ],
  resolve: {
    alias: {
      // Ensure Vitest correctly resolves TypeScript path aliases
      'src': resolve(__dirname, './src'),
    },
  },
});
