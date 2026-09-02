import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './sections/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        teal: {
          50: '#E8F4F7',
          100: '#C5E3EA',
          200: '#9ECFDA',
          300: '#77BBCA',
          400: '#4FA1B4',
          500: '#1A5167',
          600: '#164658',
          700: '#0F3A4D',
          800: '#0A2D3D',
          900: '#061E2B',
          950: '#031118',
        },
        gold: {
          50: '#FDF6E8',
          100: '#FAE8C0',
          200: '#F5D694',
          300: '#F0C468',
          400: '#E8AE3C',
          500: '#C8962C',
          600: '#A87B24',
          700: '#88631C',
          800: '#684C14',
          900: '#48340E',
        },
        dark: '#0D1B2A',
        muted: '#5A6672',
        light: '#FAFAF8',
        'light-gray': '#F2F2EE',
        'border-light': '#E5E5E0',
      },
      fontFamily: {
        sans: ['var(--font-inter)', 'system-ui', 'sans-serif'],
        display: ['var(--font-playfair)', 'Georgia', 'serif'],
        playfair: ['var(--font-playfair)', 'Georgia', 'serif'],
        inter: ['var(--font-inter)', 'system-ui', 'sans-serif'],
      },
      fontSize: {
        'hero': ['clamp(3rem, 8vw, 8rem)', { lineHeight: '0.95', letterSpacing: '-0.03em' }],
        'section': ['clamp(2rem, 5vw, 5rem)', { lineHeight: '1.05', letterSpacing: '-0.02em' }],
        'subtitle': ['clamp(1.125rem, 2vw, 1.5rem)', { lineHeight: '1.5' }],
      },
      animation: {
        'scroll-line': 'scrollLine 2s ease-in-out infinite',
        'fade-in': 'fadeIn 0.8s ease-out forwards',
        'slide-up': 'slideUp 0.8s ease-out forwards',
        'scale-in': 'scaleIn 0.6s ease-out forwards',
        'draw-line': 'drawLine 1.5s ease-out forwards',
        'pulse-slow': 'pulse 3s ease-in-out infinite',
      },
      keyframes: {
        scrollLine: {
          '0%': { transform: 'translateY(-100%)', opacity: '0' },
          '30%': { opacity: '1' },
          '100%': { transform: 'translateY(100%)', opacity: '0' },
        },
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { opacity: '0', transform: 'translateY(40px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        scaleIn: {
          '0%': { opacity: '0', transform: 'scale(0.9)' },
          '100%': { opacity: '1', transform: 'scale(1)' },
        },
        drawLine: {
          '0%': { strokeDashoffset: '1000' },
          '100%': { strokeDashoffset: '0' },
        },
      },
      transitionDuration: {
        '400': '400ms',
        '600': '600ms',
        '800': '800ms',
        '1200': '1200ms',
      },
      transitionTimingFunction: {
        'premium': 'cubic-bezier(0.22, 1, 0.36, 1)',
      },
    },
  },
  plugins: [],
};

export default config;
