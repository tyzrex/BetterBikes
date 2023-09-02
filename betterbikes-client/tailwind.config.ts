import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
      screens: {
        "2xl": "1536px",
        "3xl": "1920px",
        xs: "375px",
      },
        colors: {
        "main-bg": "#F7F7F7",
        "main-foreground": "#3a3e44",
        "main-accent": "#e73538",
        "main-light": "#6b6b6b",
      },
    },
  },
  plugins: [],
}
export default config
