/** @type {import('tailwindcss').Config} */
module.exports = {
	content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx,css}"],
	theme: {
		extend: {
			keyframes: {
				"caret-blink": {
					"0%,70%,100%": { opacity: "1" },
					"20%,50%": { opacity: "0" },
				},
			},
			animation: {
				"caret-blink": "caret-blink 1.25s ease-out infinite",
			},
			fontFamily: {
				poppins: ["Poppins", "sans-serif"],
			},
			fontSize: {
				xxs: "10px",
				xs: "12px",
				sm: "14px",
				base: "16px",
				lg: "18px",
				xl: "20px",
				"2xl": "24px",
				"3xl": "32px",
				"4xl": "64px",
			},
			fontWeight: {
				100: 100,
				200: 200,
				300: 300,
				400: 400,
				500: 500,
				600: 600,
				700: 700,
				800: 800,
				900: 900,
			},
		},
	},
	sidebar: {
		DEFAULT: "hsl(var(--sidebar-background))",
		foreground: "hsl(var(--sidebar-foreground))",
		primary: "hsl(var(--sidebar-primary))",
		"primary-foreground": "hsl(var(--sidebar-primary-foreground))",
		accent: "hsl(var(--sidebar-accent))",
		"accent-foreground": "hsl(var(--sidebar-accent-foreground))",
		border: "hsl(var(--sidebar-border))",
		ring: "hsl(var(--sidebar-ring))",
	},
	plugins: [],
};
