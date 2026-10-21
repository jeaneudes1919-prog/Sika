import { useMemo, useState } from 'react';
import { ArrowDownLeft, ArrowUpRight, Plus } from 'lucide-react';
import { useFinance } from '../context/FinanceContext';
import { RECENT_COUNT } from '../lib/constants';
import { formatMonthYear, monthKey, shiftMonth } from '../lib/dates';
import { balanceCurve, computeTotals, monthlySeries, sortTransactions, spendingByCategory, totalsForMonth } from '../lib/transactions';
import BalanceCard from '../components/dashboard/BalanceCard';
import BalanceLine from '../components/dashboard/BalanceLine';
import CategoryDonut from '../components/dashboard/CategoryDonut';
import MonthlyBars from '../components/dashboard/MonthlyBars';
import RecentTransactions from '../components/dashboard/RecentTransactions';
import StatCard from '../components/dashboard/StatCard';
import TransactionModal from '../components/transactions/TransactionModal';
import Button from '../components/ui/Button';
import PageHeader from '../components/ui/PageHeader';
import PageSkeleton from '../components/ui/PageSkeleton';
import Reveal from '../components/ui/Reveal';

export default function Dashboard() {
  const { transactions, loading, now } = useFinance();
  const [adding, setAdding] = useState(false);

  const data = useMemo(() => {
    const currentKey = monthKey(now);
    const monthTx = transactions.filter((t) => monthKey(t.date) === currentKey);
    return {
      current: totalsForMonth(transactions, currentKey),
      previous: totalsForMonth(transactions, monthKey(shiftMonth(now, -1))),
      total: computeTotals(transactions),
      spending: spendingByCategory(monthTx),
      series: monthlySeries(transactions, now),
      curve: balanceCurve(transactions, now),
      recent: sortTransactions(transactions, 'date-desc').slice(0, RECENT_COUNT),
    };
  }, [transactions, now]);

  if (loading) return <PageSkeleton />;

  return (
    <>
      <PageHeader title="Tableau de bord" subtitle={formatMonthYear(now)}>
        <Button icon={Plus} onClick={() => setAdding(true)}>Nouvelle transaction</Button>
      </PageHeader>

      <div className="grid gap-4 lg:grid-cols-3">
        <Reveal className="lg:col-span-2">
          <BalanceCard balance={data.total.balance} monthNet={data.current.balance} onAdd={() => setAdding(true)} />
        </Reveal>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-1">
          <Reveal delay={0.08}>
            <StatCard label="Revenus du mois" kind="income" icon={ArrowDownLeft} amount={data.current.income} previous={data.previous.income} />
          </Reveal>
          <Reveal delay={0.16}>
            <StatCard label="Dépenses du mois" kind="expense" icon={ArrowUpRight} amount={data.current.expense} previous={data.previous.expense} />
          </Reveal>
        </div>
        <Reveal><CategoryDonut spending={data.spending} /></Reveal>
        <Reveal delay={0.08} className="lg:col-span-2"><MonthlyBars series={data.series} /></Reveal>
        <Reveal className="lg:col-span-2"><BalanceLine curve={data.curve} /></Reveal>
        <Reveal delay={0.08}><RecentTransactions transactions={data.recent} /></Reveal>
      </div>

      <TransactionModal open={adding} onClose={() => setAdding(false)} />
    </>
  );
}
