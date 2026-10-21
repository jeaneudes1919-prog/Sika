import { motion } from 'framer-motion';
import clsx from 'clsx';

export default function Switch({ checked, onChange, label }) {
  return (
    <button
      type="button"
      role="switch"
      aria-checked={checked}
      aria-label={label}
      onClick={() => onChange(!checked)}
      className={clsx('flex h-8 w-14 items-center rounded-full border border-line p-1 transition-colors', checked ? 'justify-end bg-mint/30' : 'justify-start bg-ink/10')}
    >
      <motion.span layout transition={{ type: 'spring', stiffness: 500, damping: 30 }} className="h-6 w-6 rounded-full bg-ink shadow" />
    </button>
  );
}
