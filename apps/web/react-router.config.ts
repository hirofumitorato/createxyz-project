import type { Config } from '@react-router/dev/config';

export default {
	appDirectory: './src/app',
	ssr: true,
	prerender: ['/*?'],
	buildEnd: async ({ viteConfig }) => {
		viteConfig.build = viteConfig.build || {};
		viteConfig.build.target = 'es2022';
	},
} satisfies Config;
