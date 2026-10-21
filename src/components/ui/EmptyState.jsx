import { motion } from 'framer-motion';

export default function EmptyState({ icon: Icon, title, text, children }) {
  return (
    <div className="flex flex-col items-center px-4 py-12 text-center">
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        className="relative mb-5 flex h-20 w-20 items-center justify-center rounded-3xl border border-line bg-gradient-to-br from-mint/20 to-sky/20"
      >
        <span className="absolute inset-0 rounded-3xl bg-mint/20 blur-xl" aria-hidden="true" />
        <Icon className="relative h-9 w-9 text-mint" aria-hidden="true" />
      </motion.div>
      <h3 className="text-lg font-semibold">{title}</h3>
      <p className="mt-1.5 max-w-sm text-sm text-muted">{text}</p>
      {children && <div className="mt-5">{children}</div>}
    </div>
  );
}
