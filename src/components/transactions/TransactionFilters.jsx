import { Search } from 'lucide-react';
import { EXPENSE_CATEGORIES, INCOME_CATEGORIES } from '../../data/categories';
import { PERIOD_OPTIONS, SORT_OPTIONS } from '../../lib/constants';
import { Input, Select } from '../ui/Field';

const TYPE_OPTIONS = [
  { value: 'all', label: 'Tous les types' },
  { value: 'income', label: 'Revenus' },
  { value: 'expense', label: 'Dépenses' },
];

function Options({ options }) {
  return options.map((o) => <option key={o.value} value={o.value}>{o.label}</option>);
}

export default function TransactionFilters({ filters, onChange }) {
  const set = (key) => (event) => onChange({ ...filters, [key]: event.target.value });
  return (
    <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-6">
      <div className="relative sm:col-span-2 lg:col-span-2">
        <Search className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-muted" aria-hidden="true" />
        <Input type="search" aria-label="Rechercher une transaction" placeholder="Rechercher…" className="pl-10" value={filters.query} onChange={set('query')} />
      </div>
      <Select aria-label="Type" value={filters.type} onChange={set('type')}><Options options={TYPE_OPTIONS} /></Select>
      <Select aria-label="Catégorie" value={filters.categoryId} onChange={set('categoryId')}>
        <option value="all">Toutes catégories</option>
        <optgroup label="Dépenses">{EXPENSE_CATEGORIES.map((c) => <option key={c.id} value={c.id}>{c.label}</option>)}</optgroup>
        <optgroup label="Revenus">{INCOME_CATEGORIES.map((c) => <option key={c.id} value={c.id}>{c.label}</option>)}</optgroup>
      </Select>
      <Select aria-label="Période" value={filters.period} onChange={set('period')}><Options options={PERIOD_OPTIONS} /></Select>
      <Select aria-label="Trier par" value={filters.sort} onChange={set('sort')}><Options options={SORT_OPTIONS} /></Select>
    </div>
  );
}
