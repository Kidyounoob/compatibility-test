/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        // Backgrounds
        blush: '#FFF9F5',
        petal: '#FDF5F7',
        // Botanical palette (from the brief)
        pink: '#EFA7C4',
        rose: '#D96C9D',
        lavender: '#B9A7E8',
        sage: '#9CAF88',
        cream: '#FFF4DF',
        sun: '#F7D774',
        gold: '#C9A45C',
        // Deep ink used for readable text on light backgrounds
        ink: '#4A3B45',
        'ink-soft': '#7B6470',
      },
      fontFamily: {
        // Warm optical serif for the emotional / botanical headings
        display: ['Fraunces', 'ui-serif', 'Georgia', 'serif'],
        // Clean sans for UI + body
        sans: ['Inter', 'ui-sans-serif', 'system-ui', 'sans-serif'],
        // Monospace, used ONLY for the fake-lab readouts
        mono: ['"Space Mono"', 'ui-monospace', 'SFMono-Regular', 'monospace'],
      },
      boxShadow: {
        petal: '0 20px 60px -20px rgba(217, 108, 157, 0.35)',
        glow: '0 0 40px -5px rgba(247, 215, 116, 0.55)',
        card: '0 30px 80px -40px rgba(74, 59, 69, 0.45)',
      },
      backgroundImage: {
        'garden-day':
          'radial-gradient(1200px 600px at 50% -10%, #FFF4DF 0%, rgba(255,244,223,0) 60%), linear-gradient(180deg, #FFF9F5 0%, #FDF5F7 100%)',
        'garden-dusk':
          'radial-gradient(1000px 700px at 50% 120%, #F7D774 0%, rgba(247,215,116,0) 55%), linear-gradient(180deg, #FDF5F7 0%, #F6E7EE 55%, #EAD7E4 100%)',
      },
      keyframes: {
        sway: {
          '0%, 100%': { transform: 'rotate(-3deg)' },
          '50%': { transform: 'rotate(3deg)' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        shimmer: {
          '0%': { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        },
        'pulse-soft': {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0.6' },
        },
      },
      animation: {
        sway: 'sway 6s ease-in-out infinite',
        float: 'float 5s ease-in-out infinite',
        shimmer: 'shimmer 3s linear infinite',
        'pulse-soft': 'pulse-soft 2s ease-in-out infinite',
      },
    },
  },
  plugins: [],
}
