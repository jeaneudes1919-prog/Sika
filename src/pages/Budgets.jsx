import { useMemo, useState } from 'react';
import BudgetCard from '../components/budgets/BudgetCard';
import BudgetModal from '../components/budgets/BudgetModal';
import Card from '../components/ui/Card';
import Money from '../components/ui/Money';
import PageHeader from '../components/ui/PageHeader';
import PageSkeleton from '../components/ui/PageSkeleton';
import ProgressBar from '../components/ui/ProgressBar';
import Reveal from '../components/ui/Reveal';
import { EXPENSE_CATEGORIES } from '../data/categories';
import { useFinance } from '../context/FinanceContext';
import { budgetProgress } from '../lib/budgets';
import { formatMonthYear, monthKey } from '../lib/dates';
import { spendingByCategory } from '../lib/transactions';

const STATUS_COLOR = { ok: '#2DD4A0', warning: '#FB923C', exceeded: '#FB7185' };

export default function Budgets() {
  const { transactions, budgets, loading, now } = useFinance();
  const [editing, setEditing] = useState(null);

  const spentByCategory = useMemo(() => {
    const key = monthKey(now);
    const monthTx = transactions.filter((t) => monthKey(t.date) === key);
    return Object.fromEntries(spendingByCategory(monthTx).map((s) => [s.categoryId, s.total]));
  }, [transactions, now]);

  if (loading) return <PageSkeleton />;

  const ordered = [...EXPENSE_CATEGORIES].sort((a, b) => Number(Boolean(budgets[b.id])) - Number(Boolean(budgets[a.id])));
  const totalLimit = Object.values(budgets).reduce((sum, v) => sum + v, 0);
  const totalSpent = Object.keys(budgets).reduce((sum, id) => sum + (spentByCategory[id] ?? 0), 0);
  const overall = budgetProgress(totalSpent, totalLimit);

  return (
    <>
      <PageHeader title="Budgets" subtitle={`Suivi mensuel — ${formatMonthYear(now)}`} />
      {totalLimit > 0 && (
        <Reveal>
          <Card className="mb-6">
            <div className="mb-3 flex flex-wrap items-baseline justify-between gap-2">
              <h2 className="text-base font-semibold">Budget global du mois</h2>
              <p className="text-sm text-muted"><Money amount={totalSpent} className="font-semibold text-ink" /> sur <Money amount={totalLimit} /></p>
            </div>
            <ProgressBar label="Budget global" percent={overall.percent} color={STATUS_COLOR[overall.status]} />
          </Card>
        </Reveal>
      )}
      <ul className="grid gap-4 md:grid-cols-2">
        {ordered.map((category, index) => (
          <li key={category.id}>
            <Reveal delay={Math.min(index, 5) * 0.05}>
              <BudgetCard category={category} limit={budgets[category.id]} spent={spentByCategory[category.id] ?? 0} onEdit={() => setEditing(category)} />
            </Reveal>
          </li>
        ))}
      </ul>
      <BudgetModal category={editing} current={editing ? budgets[editing.id] : undefined} onClose={() => setEditing(null)} />
    </>
  );
}
