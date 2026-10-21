import { motion } from 'framer-motion';
import clsx from 'clsx';

const VARIANTS = {
  primary: 'bg-gradient-to-br from-mint to-sky text-onmint shadow-glow hover:brightness-110',
  soft: 'border border-line bg-ink/5 text-ink hover:bg-ink/10',
  danger: 'border border-coral/30 bg-coral/10 text-coral hover:bg-coral/20',
  ghost: 'text-muted hover:bg-ink/5 hover:text-ink',
};

export default function Button({ variant = 'primary', icon: Icon, className, children, type = 'button', ...props }) {
  return (
    <motion.button
      type={type}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.96 }}
      className={clsx(
        'inline-flex min-h-[44px] items-center justify-center gap-2 rounded-xl px-4 text-sm font-semibold transition-colors',
        VARIANTS[variant],
        className,
      )}
      {...props}
    >
      {Icon && <Icon className="h-4 w-4" aria-hidden="true" />}
      {children}
    </motion.button>
  );
}
