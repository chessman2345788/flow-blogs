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
        primary: '#3B82F6',   // Blue
        secondary: '#EC4899', // Pink
        text: { DEFAULT: '#F8FAFC', muted: '#94A3B8' },
        border: '#2A2A2A',
      },
      borderRadius: { 'lg': '0.75rem', 'full': '9999px' },
      boxShadow: { 'soft': '0 8px 24px rgba(0, 0, 0, 0.3)', 'button-primary': '0 6px 15px rgba(59, 130, 246, 0.4)' },
    },
  },
  plugins: [
    require('@tailwindcss/typography'), // Add this line
  ],
}
export default config