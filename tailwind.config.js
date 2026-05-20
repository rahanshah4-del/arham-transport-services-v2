/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        navy: {
          900: '#071739',
          800: '#0A1F44',
          700: '#0D2A5C',
        },
        gold: {
          500: '#F5B841',
          600: '#E0A12D',
        },
        mist: '#C7D2FE',
      },
      fontFamily: {
        heading: ['Sora', 'sans-serif'],
        body: ['Manrope', 'sans-serif'],
      },
      keyframes: {
        fadeUp: {
          '0%': { opacity: '0', transform: 'translateY(24px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        floatSoft: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        glowPulse: {
          '0%, 100%': { boxShadow: '0 0 0 rgba(245,184,65,0)' },
          '50%': { boxShadow: '0 0 24px rgba(245,184,65,0.25)' },
        },
      },
      animation: {
        'fade-up': 'fadeUp 700ms ease-out both',
        float: 'floatSoft 5s ease-in-out infinite',
        glow: 'glowPulse 2.8s ease-in-out infinite',
      },
    },
  },
  plugins: [],
}
