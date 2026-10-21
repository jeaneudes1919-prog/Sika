import { motion } from 'framer-motion';
import clsx from 'clsx';

export default function IconButton({ icon: Icon, label, className, ...props }) {
  return (
    <motion.button
      type="button"
      aria-label={label}
      title={label}
      whileTap={{ scale: 0.9 }}
      className={clsx('flex h-11 w-11 items-center justify-center rounded-xl text-muted transition-colors hover:bg-ink/10 hover:text-ink', className)}
      {...props}
    >
      <Icon className="h-[18px] w-[18px]" aria-hidden="true" />
    </motion.button>
  );
}
