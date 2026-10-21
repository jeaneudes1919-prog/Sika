import clsx from 'clsx';

export default function Card({ as: Tag = 'div', className, children, ...props }) {
  const handleMove = (event) => {
    const rect = event.currentTarget.getBoundingClientRect();
    event.currentTarget.style.setProperty('--mx', `${event.clientX - rect.left}px`);
    event.currentTarget.style.setProperty('--my', `${event.clientY - rect.top}px`);
  };
  return (
    <Tag
      onMouseMove={handleMove}
      className={clsx(
        'glow-card rounded-3xl border border-line bg-card/80 p-5 shadow-card backdrop-blur-xl transition-transform duration-300 hover:-translate-y-0.5 sm:p-6',
        className,
      )}
      {...props}
    >
      {children}
    </Tag>
  );
}
