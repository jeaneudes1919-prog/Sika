import { AlertTriangle, CheckCircle2, Pencil, Plus, XOctagon } from 'lucide-react';
import { useFinance } from '../../context/FinanceContext';
import { BUDGET_STATUS } from '../../lib/constants';
import { formatMoney } from '../../lib/format';
import { budgetProgress } from '../../lib/budgets';
import Card from '../ui/Card';
import IconButton from '../ui/IconButton';
import Money from '../ui/Money';
import ProgressRing from '../ui/ProgressRing';

const STATUS_STYLE = {
  [BUDGET_STATUS.ok]: { color: '#2DD4A0', text: 'text-mint', icon: CheckCircle2 },
  [BUDGET_STATUS.warning]: { color: '#FB923C', text: 'text-warn', icon: AlertTriangle },
  [BUDGET_STATUS.exceeded]: { color: '#FB7185', text: 'text-coral', icon: XOctagon },
};

export default function BudgetCard({ category, limit, spent, onEdit }) {
  const { currency } = useFinance();
  const Icon = category.icon;

  if (!limit) {
    return (
      <button
        type="button"
        onClick={onEdit}
        className="flex min-h-[148px] w-full flex-col items-center justify-center gap-2 rounded-3xl border border-dashed border-line p-5 text-muted transition-colors hover:border-mint/50 hover:text-mint"
      >
        <span className="flex h-10 w-10 items-center justify-center rounded-xl" style={{ background: `${category.color}22`, color: category.color }}>
          <Icon className="h-5 w-5" aria-hidden="true" />
        </span>
        <span className="flex items-center gap-1.5 text-sm font-semibold"><Plus className="h-4 w-4" aria-hidden="true" />Définir un budget {category.label.toLowerCase()}</span>
      </button>
    );
  }

  const { percent, status, remaining } = budgetProgress(spent, limit);
  const style = STATUS_STYLE[status];
  const StatusIcon = style.icon;
  const messages = {
    [BUDGET_STATUS.ok]: `Il vous reste ${formatMoney(remaining, currency)} ce mois-ci.`,
    [BUDGET_STATUS.warning]: `Attention : ${Math.round(percent)} % du budget est déjà utilisé.`,
    [BUDGET_STATUS.exceeded]: `Budget dépassé de ${formatMoney(spent - limit, currency)}.`,
  };

  return (
    <Card className="flex items-center gap-5">
      <ProgressRing percent={percent} color={style.color}>
        <span className={`text-xl font-bold ${style.text}`}>{Math.round(percent)} %</span>
      </ProgressRing>
      <div className="min-w-0 flex-1">
        <div className="flex items-start justify-between gap-2">
          <div className="flex items-center gap-2">
            <Icon className="h-4 w-4" style={{ color: category.color }} aria-hidden="true" />
            <h3 className="font-semibold">{category.label}</h3>
          </div>
          <IconButton icon={Pencil} label={`Modifier le budget ${category.label}`} onClick={onEdit} className="-mr-2 -mt-2" />
        </div>
        <p className="mt-1 text-sm text-muted">
          <Money amount={spent} className="font-semibold text-ink" /> sur <Money amount={limit} />
        </p>
        <p className={`mt-3 flex items-start gap-1.5 text-xs font-medium ${style.text}`}>
          <StatusIcon className="mt-0.5 h-4 w-4 shrink-0" aria-hidden="true" />
          {messages[status]}
        </p>
      </div>
    </Card>
  );
}
