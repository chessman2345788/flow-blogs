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
      // Final All-Black Theme Palette
      colors: {
        background: '#000000', // Pure Black
        surface: '#0A0A0A',   // Very dark gray for cards/sections
        primary: '#A3E635',   // Vibrant Lime Green for main buttons
        secondary: '#22D3EE', // Bright Cyan for secondary actions/focus
        text: {
          DEFAULT: '#FFFFFF', // Pure White for main text
          muted: '#333333',   // Very dark gray for placeholders
          light: '#CCCCCC',    // Lighter gray for subtle text
        },
        border: '#1A1A1A',     // Dark gray for borders
      },
      borderRadius: {
        'lg': '0.75rem',
        'xl': '1rem',
        'full': '9999px',
      },
      boxShadow: {
        'soft': '0 4px 12px rgba(0, 0, 0, 0.4)',
        'button-primary': '0 6px 15px rgba(163, 230, 53, 0.4)', // Lime Green shadow
      },
    },
  },
  plugins: [
    require('@tailwindcss/typography'), // For preview page styling
  ],
}
export default config