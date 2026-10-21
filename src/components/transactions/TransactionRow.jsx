import { Pencil, Trash2 } from 'lucide-react';
import clsx from 'clsx';
import { getCategory } from '../../data/categories';
import { TX_TYPE } from '../../lib/constants';
import { formatShortDate } from '../../lib/dates';
import IconButton from '../ui/IconButton';
import Money from '../ui/Money';

export default function TransactionRow({ transaction, onEdit, onDelete, showDate = false }) {
  const category = getCategory(transaction.categoryId);
  const Icon = category.icon;
  const isIncome = transaction.type === TX_TYPE.income;

  return (
    <div className="flex items-center gap-3 py-2.5">
      <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl" style={{ background: `${category.color}22`, color: category.color }}>
        <Icon className="h-5 w-5" aria-hidden="true" />
      </span>
      <div className="min-w-0 flex-1">
        <p className="truncate text-sm font-semibold">{transaction.note || category.label}</p>
        <p className="truncate text-xs text-muted">
          {category.label}
          {showDate && ` · ${formatShortDate(transaction.date)}`}
        </p>
      </div>
      <p className={clsx('whitespace-nowrap text-sm font-bold', isIncome ? 'text-mint' : 'text-coral')}>
        {isIncome ? '+' : '−'}
        <Money amount={transaction.amount} />
      </p>
      {onEdit && (
        <div className="flex shrink-0">
          <IconButton icon={Pencil} label={`Modifier « ${transaction.note || category.label} »`} onClick={() => onEdit(transaction)} />
          <IconButton icon={Trash2} label={`Supprimer « ${transaction.note || category.label} »`} onClick={() => onDelete(transaction)} className="hover:text-coral" />
        </div>
      )}
    </div>
  );
}
