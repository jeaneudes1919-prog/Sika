const token = (name) => `rgb(var(--${name}) / <alpha-value>)`;

/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        bg: token('bg'),
        card: token('card'),
        ink: token('ink'),
        muted: token('muted'),
        mint: token('mint'),
        coral: token('coral'),
        sky: token('sky'),
        amber: token('amber'),
        warn: token('warn'),
        onmint: token('onmint'),
        line: 'var(--line)',
      },
      fontFamily: { sans: ['"Inter Variable"', 'system-ui', 'sans-serif'] },
      boxShadow: {
        card: '0 1px 0 rgb(255 255 255 / 0.04) inset, 0 2px 6px rgb(0 0 0 / 0.12), 0 12px 32px -16px rgb(0 0 0 / 0.45)',
        glow: '0 8px 28px -8px rgb(var(--mint) / 0.55)',
        pop: '0 24px 64px -16px rgb(0 0 0 / 0.6), 0 4px 12px rgb(0 0 0 / 0.25)',
      },
      keyframes: {
        blob: {
          '0%, 100%': { transform: 'translate3d(0,0,0) scale(1)' },
          '50%': { transform: 'translate3d(40px,-30px,0) scale(1.15)' },
        },
        shimmer: { '100%': { transform: 'translateX(100%)' } },
        confetti: {
          '0%': { transform: 'translate3d(0,-10vh,0) rotate(0deg)', opacity: '1' },
          '100%': { transform: 'translate3d(var(--drift),105vh,0) rotate(720deg)', opacity: '0.9' },
        },
      },
      animation: {
        blob: 'blob 18s ease-in-out infinite',
        shimmer: 'shimmer 1.6s infinite',
        confetti: 'confetti var(--dur) linear var(--delay) forwards',
      },
    },
  },
  plugins: [],
};
