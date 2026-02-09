/// <reference types="vite/client" />

declare module '*.vue' {
  import type { DefineComponent } from 'vue';
  // eslint-disable-next-line @typescript-eslint/ban-types, @typescript-eslint/no-explicit-any
  const component: DefineComponent<{}, {}, any>;
  export default component;
}

declare module 'vite-plugin-purge-icons' {
  import type { Plugin } from 'vite';
  export default function PurgeIcons(options?: Record<string, unknown>): Plugin;
}

declare module 'postcss-normalize' {
  import type { PluginCreator } from 'postcss';
  const postcssNormalize: PluginCreator<Record<string, unknown>>;
  export default postcssNormalize;
}
