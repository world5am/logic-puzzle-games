import plugin from 'tailwindcss'

/** @type {import('tailwindcss').Config} */

export default {
	content: ['./src/**/*.{html,js,svelte,ts}'],
	safelist: ['active'],
	theme: {
		extend: {
			screens: {
				sm: { max: '639px' }
			},
			fontFamily: {
				sourcepro: ['Source Sans Pro', 'sans-serif']
			},
			fontSize: {
				custom: ['var(--number-font-size, calc(100vh / 16))', '24px']
			},
			gridTemplateRows: {
				sudoku: 'repeat(9, var(--cell-height))'
			},
			gridTemplateColumns: {
				sudoku: 'repeat(9, var(--cell-height))'
			}
		}
	}
}
