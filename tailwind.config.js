/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        red: {
          DEFAULT: '#C0392B',
          bright:  '#E53935',
          deep:    '#7B0000',
          dim:     '#b23b3b',
        },
        bg: {
          DEFAULT: '#0D0D0D',
          card:    '#181818',
          surface: '#222222',
        },
        mil: {
          green: '#2f7a3f',
        },
      },
      fontFamily: {
        display: ['"Cormorant Garamond"', 'Georgia', 'serif'],
        body:    ['"IBM Plex Sans"', 'system-ui', 'sans-serif'],
      },
      animation: {
        'fade-up':  'fadeUp .6s cubic-bezier(.22,1,.36,1) both',
        'spin-slow':'spin 1s linear infinite',
      },
      keyframes: {
        fadeUp: { from:{ opacity:0, transform:'translateY(14px)' }, to:{ opacity:1, transform:'translateY(0)' } },
      },
    },
  },
  plugins: [],
}
