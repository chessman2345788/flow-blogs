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
        background: 'rgba(26, 32, 44, 1)',
        surface: 'rgba(45, 55, 72, 1)',   
        secondary: 'rgba(56, 178, 172, 1)', 
        text: {
          DEFAULT: 'rgba(226, 232, 240, 1)', 
          muted: 'rgba(160, 174, 192, 1)',   
          light: 'rgba(113, 128, 150, 1)',    
        },
        border: 'rgba(74, 85, 104, 1)',     
      },
      
      borderRadius: {
        'lg': '0.75rem',
        'xl': '1rem',
        'full': '9999px',
      },
      boxShadow: {
        'soft': '0 4px 12px rgba(0, 0, 0, 0.4)',
        // Adjust button shadow to match new primary color
        'button-primary': '0 6px 15px rgba(246, 173, 85, 0.4)', // Orange shadow
      },
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
  ],
}
export default config