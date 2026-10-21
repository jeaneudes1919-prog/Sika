import clsx from 'clsx';

export const inputClass =
  'min-h-[44px] w-full rounded-xl border border-line bg-ink/5 px-3.5 text-sm text-ink placeholder:text-muted/70 transition-colors focus:border-mint/60 focus:bg-ink/[0.07] focus:outline-none';

export function Field({ label, htmlFor, error, children, className }) {
  return (
    <div className={clsx('space-y-1.5', className)}>
      <label htmlFor={htmlFor} className="text-sm font-medium text-muted">{label}</label>
      {children}
      {error && <p role="alert" className="text-xs font-medium text-coral">{error}</p>}
    </div>
  );
}

export function Input({ className, ...props }) {
  return <input className={clsx(inputClass, className)} {...props} />;
}

export function Select({ className, children, ...props }) {
  return <select className={clsx(inputClass, 'pr-8', className)} {...props}>{children}</select>;
}
