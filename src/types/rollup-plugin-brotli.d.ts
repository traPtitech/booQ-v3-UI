declare module 'rollup-plugin-brotli' {
  import type { Plugin } from 'vite';

  function createPlugin(): Plugin;

  export { createPlugin as default };
}
