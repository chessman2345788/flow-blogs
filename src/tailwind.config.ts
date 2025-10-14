import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
      },
      colors: {
        background: 'rgba(10, 10, 10, 1)',
        surface: 'rgba(26, 26, 26, 1)',
        primary: 'rgba(59, 130, 246, 1)',  
        secondary: 'rgba(236, 72, 153, 1)', 
        text: {
          DEFAULT: 'rgba(248, 250, 252, 1)',
          muted: 'rgba(148, 163, 184, 1)',
        },
        border: 'rgba(42, 42, 42, 1)',
      },
      borderRadius: {
        'lg': '12px',
      },
    },
  },
  plugins: [],
}
export default config