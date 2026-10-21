import clsx from 'clsx';

export default function Skeleton({ className }) {
  return <div aria-hidden="true" className={clsx('skeleton rounded-2xl', className)} />;
}
