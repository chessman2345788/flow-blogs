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
        background: '#0A0A0A',
        surface: '#1A1A1A',
        primary: '#3B82F6',   // Blue for buttons
        secondary: '#EC4899', // Pink for focus rings
        text: {
          DEFAULT: '#F8FAFC',
          muted: '#94A3B8',
        },
        border: '#2A2A2A',
      },
    },
  },
  plugins: [],
}
export default config