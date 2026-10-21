import { useMemo, useState } from 'react';
import { Download, Plus, SearchX, Wallet } from 'lucide-react';
import TransactionFilters from '../components/transactions/TransactionFilters';
import TransactionList from '../components/transactions/TransactionList';
import TransactionModal from '../components/transactions/TransactionModal';
import Button from '../components/ui/Button';
import Card from '../components/ui/Card';
import EmptyState from '../components/ui/EmptyState';
import Money from '../components/ui/Money';
import PageHeader from '../components/ui/PageHeader';
import PageSkeleton from '../components/ui/PageSkeleton';
import { useFinance } from '../context/FinanceContext';
import { useToast } from '../context/ToastContext';
import { DEFAULT_FILTERS } from '../lib/constants';
import { downloadCSV, transactionsToCSV } from '../lib/csv';
import { todayISO } from '../lib/dates';
import { ACTIONS } from '../lib/financeReducer';
import { applyFilters, computeTotals, groupByDate } from '../lib/transactions';

export default function Transactions() {
  const { transactions, loading, now, dispatch } = useFinance();
  const { push } = useToast();
  const [filters, setFilters] = useState(DEFAULT_FILTERS);
  const [editor, setEditor] = useState({ open: false, transaction: null });

  const visible = useMemo(() => applyFilters(transactions, filters, now), [transactions, filters, now]);
  const totals = useMemo(() => computeTotals(visible), [visible]);
  const groups = useMemo(
    () => (filters.sort.startsWith('date') ? groupByDate(visible) : [{ date: null, items: visible }]),
    [visible, filters.sort],
  );

  if (loading) return <PageSkeleton />;

  const openEditor = (transaction = null) => setEditor({ open: true, transaction });
  const closeEditor = () => setEditor((current) => ({ ...current, open: false }));

  const handleDelete = (transaction) => {
    dispatch({ type: ACTIONS.REMOVE_TX, payload: transaction.id });
    push('Transaction supprimée', { label: 'Annuler', onClick: () => dispatch({ type: ACTIONS.ADD_TX, payload: transaction }) });
  };

  const handleExport = () => {
    downloadCSV(transactionsToCSV(visible), `sika-transactions-${todayISO()}.csv`);
    push(`Export CSV prêt (${visible.length} lignes)`);
  };

  return (
    <>
      <PageHeader title="Transactions" subtitle={`${transactions.length} opérations enregistrées`}>
        <Button variant="soft" icon={Download} onClick={handleExport} disabled={visible.length === 0}>Exporter en CSV</Button>
        <Button icon={Plus} onClick={() => openEditor()}>Nouvelle transaction</Button>
      </PageHeader>

      <Card className="mb-6 !p-4 sm:!p-5">
        <TransactionFilters filters={filters} onChange={setFilters} />
        <p className="mt-4 text-sm text-muted" aria-live="polite">
          {visible.length} résultat{visible.length > 1 ? 's' : ''} · Revenus <Money amount={totals.income} className="font-semibold text-mint" /> · Dépenses{' '}
          <Money amount={totals.expense} className="font-semibold text-coral" />
        </p>
      </Card>

      {transactions.length === 0 ? (
        <Card>
          <EmptyState icon={Wallet} title="Aucune transaction" text="Commencez par ajouter un revenu ou une dépense pour suivre votre budget.">
            <Button icon={Plus} onClick={() => openEditor()}>Ajouter une transaction</Button>
          </EmptyState>
        </Card>
      ) : visible.length === 0 ? (
        <Card>
          <EmptyState icon={SearchX} title="Aucun résultat" text="Aucune transaction ne correspond à ces filtres.">
            <Button variant="soft" onClick={() => setFilters(DEFAULT_FILTERS)}>Réinitialiser les filtres</Button>
          </EmptyState>
        </Card>
      ) : (
        <TransactionList groups={groups} onEdit={openEditor} onDelete={handleDelete} />
      )}

      <TransactionModal open={editor.open} onClose={closeEditor} transaction={editor.transaction} />
    </>
  );
}
