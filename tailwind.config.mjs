/** @type {import('tailwindcss').Config} */
export default {
	content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
	theme: {
		extend: {
			colors: {
				accent: "rgb(var(--accent))",
				'accent-dark': "rgb(var(--accent-dark))",
				'mono-50':  'var(--mono-50)',
				'mono-100': 'var(--mono-100)',
				'mono-200': 'var(--mono-200)',
				'mono-300': 'var(--mono-300)',
				'mono-400': 'var(--mono-400)',
				'mono-500': 'var(--mono-500)',
				'mono-600': 'var(--mono-600)',
				'mono-700': 'var(--mono-700)',
				'mono-800': 'var(--mono-800)',
				'mono-900': 'var(--mono-900)',
				'mono-950': 'var(--mono-950)',
			}
		},
	},
	plugins: [],
}
