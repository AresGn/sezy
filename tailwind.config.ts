import type { Config } from 'tailwindcss'

const config: Config = {
  content: ['./src/**/*.{js,ts,jsx,tsx,mdx}'],
  theme: {
    extend: {
      colors: {
        sezy: {
          navy: '#1B3A6B',
          dark: '#142d54',
          light: '#2a5298',
          gold: '#D4AF37', // Added for Admin Sidebar accents
        },
        logistics: {
          DEFAULT: '#3B82F6',
          dark: '#2563EB',
          bg: '#EFF6FF',
        },
        shopping: {
          DEFAULT: '#10B981',
          dark: '#059669',
          bg: '#ECFDF5',
        },
        studies: {
          DEFAULT: '#F59E0B',
          dark: '#D97706',
          bg: '#FFFBEB',
        },
        whatsapp: {
          DEFAULT: '#25D366',
          dark: '#1DA851',
        },
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
        heading: ['Montserrat', 'Inter', 'sans-serif'],
        mono: ['JetBrains Mono', 'monospace'],
      },
      borderRadius: {
        btn: '8px',
        card: '12px',
      },
      boxShadow: {
        card: '0 1px 3px 0 rgb(0 0 0 / 0.06), 0 1px 2px -1px rgb(0 0 0 / 0.06)',
        'card-hover': '0 4px 6px -1px rgb(0 0 0 / 0.1)',
      },
    },
  },
  plugins: [],
}

export default config
