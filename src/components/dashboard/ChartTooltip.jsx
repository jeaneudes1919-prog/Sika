import { useFinance } from '../../context/FinanceContext';
import { formatMoney } from '../../lib/format';

export default function ChartTooltip({ active, payload, label, labelFormatter }) {
  const { currency } = useFinance();
  if (!active || !payload?.length) return null;
  return (
    <div className="rounded-xl border border-line bg-card px-3 py-2 text-xs shadow-pop">
      <p className="mb-1 font-semibold">{labelFormatter ? labelFormatter(label) : label}</p>
      {payload.map((item) => (
        <p key={item.dataKey} className="flex items-center gap-2 text-muted">
          <span className="h-2 w-2 rounded-full" style={{ background: item.color ?? item.stroke }} aria-hidden="true" />
          {item.name} : <span className="font-semibold text-ink">{formatMoney(item.value, currency)}</span>
        </p>
      ))}
    </div>
  );
}
