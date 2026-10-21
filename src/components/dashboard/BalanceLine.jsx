import { Area, AreaChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';
import { useFinance } from '../../context/FinanceContext';
import { CHART_COLORS } from '../../lib/constants';
import { formatChartDate } from '../../lib/dates';
import { formatCompact } from '../../lib/format';
import Card from '../ui/Card';
import ChartTooltip from './ChartTooltip';

export default function BalanceLine({ curve }) {
  const { currency } = useFinance();
  return (
    <Card>
      <h2 className="mb-4 text-base font-semibold">Évolution du solde (90 jours)</h2>
      <div className="h-64">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={curve} margin={{ left: -12, right: 8, top: 4 }}>
            <defs>
              <linearGradient id="balanceFill" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor={CHART_COLORS.balance} stopOpacity={0.45} />
                <stop offset="100%" stopColor={CHART_COLORS.balance} stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid vertical={false} stroke={CHART_COLORS.grid} />
            <XAxis dataKey="date" axisLine={false} tickLine={false} minTickGap={48} tick={{ fill: CHART_COLORS.tick, fontSize: 12 }} tickFormatter={formatChartDate} />
            <YAxis axisLine={false} tickLine={false} width={52} tick={{ fill: CHART_COLORS.tick, fontSize: 12 }} tickFormatter={(v) => formatCompact(v, currency)} />
            <Tooltip content={<ChartTooltip labelFormatter={formatChartDate} />} />
            <Area type="monotone" dataKey="balance" name="Solde" stroke={CHART_COLORS.balance} strokeWidth={2.5} fill="url(#balanceFill)" />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </Card>
  );
}
