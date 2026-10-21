import { Coins } from 'lucide-react';

export default function Logo() {
  return (
    <div className="flex items-center gap-2.5">
      <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-mint to-sky text-onmint shadow-glow">
        <Coins className="h-5 w-5" aria-hidden="true" />
      </span>
      <span className="text-xl font-bold tracking-tight">Sika</span>
    </div>
  );
}
