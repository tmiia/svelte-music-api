import type { Config } from 'tailwindcss';

export default {
	content: ['./src/**/*.{html,js,svelte,ts}'],

	theme: {
		extend: {
      colors: {
        transparentBlack: 'rgba(156, 163, 175, 0.6)',
      }
    }
	},

	plugins: []
} satisfies Config;
