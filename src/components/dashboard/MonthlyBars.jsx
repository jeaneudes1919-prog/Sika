import { Bar, BarChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';
import { useFinance } from '../../context/FinanceContext';
import { CHART_COLORS } from '../../lib/constants';
import { formatCompact } from '../../lib/format';
import Card from '../ui/Card';
import ChartTooltip from './ChartTooltip';

export default function MonthlyBars({ series }) {
  const { currency } = useFinance();
  return (
    <Card>
      <div className="mb-4 flex flex-wrap items-center justify-between gap-2">
        <h2 className="text-base font-semibold">Revenus et dépenses sur 6 mois</h2>
        <ul className="flex gap-4 text-xs text-muted">
          <li className="flex items-center gap-1.5"><span className="h-2.5 w-2.5 rounded-full bg-mint" aria-hidden="true" />Revenus</li>
          <li className="flex items-center gap-1.5"><span className="h-2.5 w-2.5 rounded-full bg-coral" aria-hidden="true" />Dépenses</li>
        </ul>
      </div>
      <div className="h-64">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={series} barGap={4} margin={{ left: -12, right: 4, top: 4 }}>
            <CartesianGrid vertical={false} stroke={CHART_COLORS.grid} />
            <XAxis dataKey="label" axisLine={false} tickLine={false} tick={{ fill: CHART_COLORS.tick, fontSize: 12 }} />
            <YAxis axisLine={false} tickLine={false} width={52} tick={{ fill: CHART_COLORS.tick, fontSize: 12 }} tickFormatter={(v) => formatCompact(v, currency)} />
            <Tooltip cursor={{ fill: 'rgba(148,163,184,0.1)' }} content={<ChartTooltip />} />
            <Bar dataKey="income" name="Revenus" fill={CHART_COLORS.income} radius={[6, 6, 0, 0]} maxBarSize={28} />
            <Bar dataKey="expense" name="Dépenses" fill={CHART_COLORS.expense} radius={[6, 6, 0, 0]} maxBarSize={28} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </Card>
  );
}
