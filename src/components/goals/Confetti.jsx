import { useReducedMotion } from 'framer-motion';

const PIECES = 48;
const COLORS = ['#2DD4A0', '#FB7185', '#60A5FA', '#FBBF24', '#A78BFA'];

const pieces = Array.from({ length: PIECES }, (_, i) => ({
  left: (i * 37) % 100,
  delay: (i % 12) * 0.12,
  duration: 2.4 + (i % 5) * 0.35,
  drift: ((i * 53) % 160) - 80,
  size: 8 + (i % 4) * 3,
  color: COLORS[i % COLORS.length],
}));

export default function Confetti() {
  const reduce = useReducedMotion();
  if (reduce) return null;
  return (
    <div aria-hidden="true" className="pointer-events-none fixed inset-0 z-[65] overflow-hidden">
      {pieces.map((p, i) => (
        <span
          key={i}
          className="absolute top-0 animate-confetti rounded-sm will-change-transform"
          style={{ left: `${p.left}%`, width: p.size, height: p.size * 0.5, background: p.color, '--delay': `${p.delay}s`, '--dur': `${p.duration}s`, '--drift': `${p.drift}px`, opacity: 0 }}
        />
      ))}
    </div>
  );
}
