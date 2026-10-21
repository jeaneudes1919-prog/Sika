import { Link } from 'react-router-dom';
import { Receipt } from 'lucide-react';
import Card from '../ui/Card';
import EmptyState from '../ui/EmptyState';
import TransactionRow from '../transactions/TransactionRow';

export default function RecentTransactions({ transactions }) {
  return (
    <Card>
      <div className="mb-2 flex items-center justify-between">
        <h2 className="text-base font-semibold">Dernières transactions</h2>
        <Link to="/transactions" className="rounded-lg px-2 py-2 text-sm font-medium text-mint hover:underline">Tout voir</Link>
      </div>
      {transactions.length === 0 ? (
        <EmptyState icon={Receipt} title="Rien pour l’instant" text="Ajoutez votre première transaction." />
      ) : (
        <div className="divide-y divide-line">
          {transactions.map((t) => <TransactionRow key={t.id} transaction={t} showDate />)}
        </div>
      )}
    </Card>
  );
}
