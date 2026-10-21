import { motion } from 'framer-motion';

export default function ProgressBar({ percent, color = 'rgb(var(--mint))', label }) {
  const ratio = Math.min(Math.max(percent, 0), 100) / 100;
  return (
    <div role="progressbar" aria-label={label} aria-valuemin={0} aria-valuemax={100} aria-valuenow={Math.round(ratio * 100)} className="h-3 overflow-hidden rounded-full bg-ink/10">
      <motion.div
        className="h-full w-full origin-left rounded-full"
        style={{ background: color }}
        initial={{ scaleX: 0 }}
        animate={{ scaleX: ratio }}
        transition={{ duration: 1, ease: 'easeOut' }}
      />
    </div>
  );
}
