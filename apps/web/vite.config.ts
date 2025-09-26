// apps/web/vite.config.ts
import path from 'node:path';
import { defineConfig } from 'vite';
import { reactRouter } from '@react-router/dev/vite';
import { reactRouterHonoServer } from 'react-router-hono-server/dev';
import babel from 'vite-plugin-babel';
import tsconfigPaths from 'vite-tsconfig-paths';

import { addRenderIds } from './plugins/addRenderIds';
import { aliases } from './plugins/aliases';
import consoleToParent from './plugins/console-to-parent';
import { layoutWrapperPlugin } from './plugins/layouts';
import { loadFontsFromTailwindSource } from './plugins/loadFontsFromTailwindSource';
import { nextPublicProcessEnv } from './plugins/nextPublicProcessEnv';
import { restart } from './plugins/restart';
import { restartEnvFileChange } from './plugins/restartEnvFileChange';

export default defineConfig(({ mode }) => ({
  // Keep them available via import.meta.env.NEXT_PUBLIC_*
  envPrefix: 'NEXT_PUBLIC_',

  build: {
    target: 'es2022',
    sourcemap: false,
    rollupOptions: {
      // 静的化時のうるさい SourceMap エラーを抑制（必要に応じて）
      onwarn(warning, warn) {
        if (warning.code === 'SOURCEMAP_ERROR') return;
        warn(warning);
      },
    },
  },

  optimizeDeps: {
    // fast-glob は動的 import されるので事前バンドル
    include: ['fast-glob', 'lucide-react'],
    // 重複していた @hono/auth-js を整理
    exclude: [
      '@hono/auth-js/react',
      '@hono/auth-js',
      '@auth/core',
      'hono/context-storage',
      '@auth/core/errors',
      'fsevents',
      'lightningcss',
    ],
  },

  logLevel: 'info',

  plugins: [
    nextPublicProcessEnv(),
    restartEnvFileChange(),

    // Hono ベースの SSR サーバ
    reactRouterHonoServer({
      serverEntryPoint: './__create/index.ts',
      runtime: 'node',
    }),

    // 必要最小限の Babel（styled-jsx 用）
    babel({
      include: ['src/**/*.{js,jsx,ts,tsx}'],
      exclude: /node_modules/,
      babelConfig: {
        babelrc: false,
        configFile: false,
        plugins: ['styled-jsx/babel'],
      },
    }),

    // 開発時の自動リスタートウォッチ
    restart({
      restart: [
        'src/**/page.jsx',
        'src/**/page.tsx',
        'src/**/layout.jsx',
        'src/**/layout.tsx',
        'src/**/route.js',
        'src/**/route.ts',
      ],
    }),

    consoleToParent(),
    loadFontsFromTailwindSource(),
    addRenderIds(),

    // React Router の Vite プラグインは Hono サーバ設定の後に
    reactRouter(),

    // ★ ここが重要：web の tsconfig のみ解決し、他ワークスペース（apps/mobile）を見に行かせない
    tsconfigPaths({
      projects: [path.resolve(__dirname, 'tsconfig.json')],
      ignoreConfigErrors: true,
    }),

    aliases(),
    layoutWrapperPlugin(),
  ],

  resolve: {
    alias: {
      lodash: 'lodash-es',
      'npm:stripe': 'stripe',
      stripe: path.resolve(__dirname, './src/__create/stripe'),
      '@auth/create/react': '@hono/auth-js/react',
      '@auth/create': path.resolve(__dirname, './src/__create/@auth/create'),
      '@': path.resolve(__dirname, 'src'),
    },
    dedupe: ['react', 'react-dom'],
  },

  // dev/test 用の分岐が本番に残らないように
  define: {
    'import.meta.vitest': 'undefined',
  },

  clearScreen: false,

  server: {
    allowedHosts: true,
    host: '0.0.0.0',
    port: 4000,
    hmr: {
      overlay: false,
    },
    warmup: {
      clientFiles: ['./src/app/**/*', './src/app/root.tsx', './src/app/routes.ts'],
    },
  },
}));
