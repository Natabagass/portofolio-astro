import defaultTheme from 'tailwindcss/defaultTheme'

/** @type {import('tailwindcss').Config} */
export default {
	content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
	theme: {
		extend: {
			screens: {
				xs: '450px'
			},
			fontFamily: {
				urbanist: ['Urbanist', ...defaultTheme.fontFamily.sans],
				inter: ['Inter', ...defaultTheme.fontFamily.sans]
			},
			margin: {
				mainScreen: '250px',
				secondScreen: '200px'
			},
			colors: {
				base: '#1A1A1A',
				title: '#F4F4F4',
				secondary: '#28282880',
				gray: {
					200: '#616161',
					100: '#D4D4D4',
					400: '#393939',
					300: '#515151'
				},
				subtitle: '#7E7E7E',
				pink: {
					200: '#FABFFF',
					100: '#F3CAF6'
				}
			},
			boxShadow: {
				inner: 'inset 2px 4px 16px 0px rgba(248, 248, 248, 0.06)',
				buttonPink: 'inset -2px -2px 4px 0px rgba(194, 153, 197, 1)',
			},
		},
	},
	plugins: [
		({ addBase }) => {
			addBase({
				".d1": {
					fontSize: "84px",
					lineHeight: "104px",

					"@screen md": [
						{
							fontSize: "64px",
							lineHeight: "72px",
						},
					],
					"@screen sm": [
						{
							fontSize: '56px',
							lineHeight: '58px'
						}
					]
				},

				".d2": {
					fontSize: "64px",
					lineHeight: "72px",
				},

				".d3": {
					fontSize: '56px',
					lineHeight: '58px'
				},

				".h1": {
					fontSize: '48px',
					lineHeight: '56px'
				},

				".h2": {
					fontSize: '32px',
					lineHeight: '40px'
				},

				".h3": {
					fontSize: '24px',
					lineHeight: '32px'
				},

				".h4": {
					fontSize: '20px',
					lineHeight: '32px'
				},

				".p1": {
					fontSize: '18px',
					lineHeight: '26px'
				},

				".p2": {
					fontSize: '16px',
					lineHeight: '24px'
				},

				".p3": {
					fontSize: '14px',
					lineHeight: '22px'
				},

				".cpt1": {
					fontSize: '12px',
					lineHeight: '16px'
				},

				".cpt2": {
					fontSize: '10px',
					lineHeight: '16px'
				},
			})
		}
	],
}
