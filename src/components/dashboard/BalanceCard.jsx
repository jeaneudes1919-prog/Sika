import { ArrowDownRight, ArrowUpRight, Plus } from 'lucide-react';
import Button from '../ui/Button';
import Money from '../ui/Money';

export default function BalanceCard({ balance, monthNet, onAdd }) {
  const positive = monthNet >= 0;
  return (
    <section
      aria-label="Solde total"
      className="relative overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-br from-[#0E7C66] via-[#0F5F7A] to-[#1E3A8A] p-6 text-white shadow-card sm:p-8"
    >
      <div aria-hidden="true" className="aurora-blob -right-10 -top-16 h-64 w-64 bg-white" style={{ opacity: 0.18 }} />
      <div aria-hidden="true" className="grain absolute inset-0 opacity-[0.06]" />
      <div className="relative flex h-full flex-col justify-between gap-8">
        <div>
          <p className="text-sm font-medium text-white/75">Solde total</p>
          <p className="mt-2 text-[clamp(2rem,6vw,3.25rem)] font-bold leading-none tracking-tight">
            <Money amount={balance} animated />
          </p>
        </div>
        <div className="flex flex-wrap items-center justify-between gap-3">
          <p className="flex items-center gap-2 rounded-full bg-black/20 px-3.5 py-2 text-sm font-medium backdrop-blur">
            {positive ? <ArrowUpRight className="h-4 w-4 text-[#2DD4A0]" aria-hidden="true" /> : <ArrowDownRight className="h-4 w-4 text-[#FB7185]" aria-hidden="true" />}
            <span>
              {positive ? '+' : '−'}
              <Money amount={Math.abs(monthNet)} /> ce mois-ci
            </span>
          </p>
          <Button variant="soft" icon={Plus} onClick={onAdd} className="!border-white/20 !bg-white/15 !text-white hover:!bg-white/25">
            Ajouter
          </Button>
        </div>
      </div>
    </section>
  );
}
