import { useState } from 'react';
import { Cell, Pie, PieChart, ResponsiveContainer } from 'recharts';
import clsx from 'clsx';
import { PieChart as PieIcon } from 'lucide-react';
import { getCategory } from '../../data/categories';
import { useFinance } from '../../context/FinanceContext';
import { formatMoney } from '../../lib/format';
import Card from '../ui/Card';
import EmptyState from '../ui/EmptyState';

export default function CategoryDonut({ spending }) {
  const { currency } = useFinance();
  const [active, setActive] = useState(null);
  const total = spending.reduce((sum, s) => sum + s.total, 0);
  const data = spending.map((s) => ({ ...s, category: getCategory(s.categoryId) }));
  const focus = data.find((d) => d.categoryId === active);

  return (
    <Card className="flex flex-col">
      <h2 className="text-base font-semibold">Dépenses par catégorie</h2>
      {data.length === 0 ? (
        <EmptyState icon={PieIcon} title="Aucune dépense" text="Vos dépenses du mois apparaîtront ici." />
      ) : (
        <>
          <div className="relative mx-auto mt-3 h-52 w-full max-w-[220px]">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie data={data} dataKey="total" innerRadius="68%" outerRadius="96%" paddingAngle={3} stroke="none" onMouseEnter={(_, i) => setActive(data[i].categoryId)} onMouseLeave={() => setActive(null)}>
                  {data.map((d) => (
                    <Cell key={d.categoryId} fill={d.category.color} fillOpacity={active && active !== d.categoryId ? 0.25 : 1} />
                  ))}
                </Pie>
              </PieChart>
            </ResponsiveContainer>
            <div className="pointer-events-none absolute inset-0 flex flex-col items-center justify-center text-center">
              <p className="text-xs text-muted">{focus ? focus.category.label : 'Total'}</p>
              <p className="text-sm font-bold">{formatMoney(focus ? focus.total : total, currency)}</p>
              {focus && <p className="text-xs text-muted">{Math.round((focus.total / total) * 100)} %</p>}
            </div>
          </div>
          <ul className="mt-4 grid grid-cols-1 gap-1 sm:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2">
            {data.map((d) => (
              <li key={d.categoryId}>
                <button
                  type="button"
                  aria-pressed={active === d.categoryId}
                  onClick={() => setActive(active === d.categoryId ? null : d.categoryId)}
                  onMouseEnter={() => setActive(d.categoryId)}
                  onMouseLeave={() => setActive(null)}
                  className={clsx('flex min-h-[44px] w-full items-center gap-2 rounded-lg px-2 text-left text-sm transition-colors hover:bg-ink/5', active === d.categoryId && 'bg-ink/5')}
                >
                  <span className="h-2.5 w-2.5 shrink-0 rounded-full" style={{ background: d.category.color }} aria-hidden="true" />
                  <span className="flex-1 truncate">{d.category.label}</span>
                  <span className="text-xs text-muted">{Math.round((d.total / total) * 100)} %</span>
                </button>
              </li>
            ))}
          </ul>
        </>
      )}
    </Card>
  );
}
