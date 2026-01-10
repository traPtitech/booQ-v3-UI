import { defineConfig } from 'vite';
import path from 'path';
import packageJson from './package.json';
import VuePlugin from '@vitejs/plugin-vue';
import PurgeIcons from 'vite-plugin-purge-icons';
import brotli from 'rollup-plugin-brotli';
import { PluginTrapAuth } from '@traptitech/vite-plugin-trap-auth';
import autoprefixer from 'autoprefixer';
import postcssNormalize from 'postcss-normalize';
import tailwindcss from '@tailwindcss/vite';
import dns from 'node:dns';

dns.setDefaultResultOrder('ipv4first');

export default defineConfig(({ mode }) => ({
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src'),
    },
  },
  css: {
    preprocessorOptions: {
      scss: {
        additionalData: `
          @use "sass:math";
          @import "@/styles/common.scss";
        `,
      },
    },
    postcss: {
      plugins: [
        postcssNormalize(),
        ...(mode === 'production' ? [autoprefixer()] : []),
      ],
    },
    devSourcemap: true,
  },
  define: {
    __VERSION__: `"${packageJson.version}"`,
  },
  plugins: [
    tailwindcss(), 
    VuePlugin(),
    PurgeIcons(),
    brotli(),
    PluginTrapAuth(),
  ],
}));
