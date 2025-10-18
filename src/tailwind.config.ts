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
      // Light Theme Color Palette
      colors: {
        background: '#F8F9FA', // Off-white background
        surface: '#FFFFFF',   // Pure white for cards
        primary: '#3B82F6',   // Blue accent
        secondary: '#EC4899', // Pink accent
        text: {
          DEFAULT: '#111827', // Near-black text
          muted: '#6B7280',   // Gray text
        },
        border: '#E5E7EB',     // Light gray borders
      },
      borderRadius: {
        'lg': '0.75rem',
        'full': '9999px',
      },
      boxShadow: {
        'soft': '0 4px 12px rgba(0, 0, 0, 0.05)',
        'button-primary': '0 6px 15px rgba(59, 130, 246, 0.2)', // Lighter shadow for light theme
      },
    },
  },
  plugins: [],
}
export default config