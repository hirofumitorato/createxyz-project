import type { Config } from '@react-router/dev/config';

export default {
	appDirectory: './src/app',
	ssr: false,
	prerender: ['/*'],
	buildEnd: async ({ viteConfig }) => {
		// Ensure static build
		viteConfig.build = viteConfig.build || {};
		viteConfig.build.ssr = false;
	},
} satisfies Config;
