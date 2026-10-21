import { ArrowDownRight, ArrowUpRight } from 'lucide-react';
import clsx from 'clsx';
import { formatPercent } from '../../lib/format';
import { pctChange } from '../../lib/transactions';
import Card from '../ui/Card';
import Money from '../ui/Money';

export default function StatCard({ label, amount, previous, kind, icon: Icon }) {
  const isIncome = kind === 'income';
  const change = pctChange(amount, previous);
  const favorable = change === null ? true : isIncome ? change >= 0 : change <= 0;

  return (
    <Card className="flex flex-col justify-between gap-4">
      <div className="flex items-center justify-between">
        <p className="text-sm font-medium text-muted">{label}</p>
        <span className={clsx('flex h-10 w-10 items-center justify-center rounded-xl', isIncome ? 'bg-mint/15 text-mint' : 'bg-coral/15 text-coral')}>
          <Icon className="h-5 w-5" aria-hidden="true" />
        </span>
      </div>
      <p className={clsx('text-2xl font-bold tracking-tight', isIncome ? 'text-mint' : 'text-coral')}>
        <Money amount={amount} animated />
      </p>
      <p className={clsx('flex items-center gap-1.5 text-xs font-medium', change === null ? 'text-muted' : favorable ? 'text-mint' : 'text-coral')}>
        {change === null ? (
          'Pas de données le mois dernier'
        ) : (
          <>
            {change >= 0 ? <ArrowUpRight className="h-3.5 w-3.5" aria-hidden="true" /> : <ArrowDownRight className="h-3.5 w-3.5" aria-hidden="true" />}
            {formatPercent(change)} vs mois précédent
          </>
        )}
      </p>
    </Card>
  );
}
