import type { Config } from '@react-router/dev/config';

export default {
	appDirectory: './src/app',
	ssr: false,
	prerender: ['/*'],
	buildEnd: async ({ viteConfig }) => {
		// Ensure static build
		viteConfig.build = viteConfig.build || {};
		viteConfig.build.ssr = false;
		viteConfig.build.sourcemap = false;
		// Disable sourcemap for SSR build
		viteConfig.ssr = viteConfig.ssr || {};
		viteConfig.ssr.sourcemap = false;
	},
} satisfies Config;
