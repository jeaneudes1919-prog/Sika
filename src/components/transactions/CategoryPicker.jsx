import clsx from 'clsx';
import { categoriesForType } from '../../data/categories';

export default function CategoryPicker({ type, value, onChange }) {
  return (
    <div role="radiogroup" aria-label="Catégorie" className="grid grid-cols-2 gap-2 sm:grid-cols-3">
      {categoriesForType(type).map((category) => {
        const Icon = category.icon;
        const selected = value === category.id;
        return (
          <button
            key={category.id}
            type="button"
            role="radio"
            aria-checked={selected}
            onClick={() => onChange(category.id)}
            className={clsx(
              'flex min-h-[48px] items-center gap-2 rounded-xl border px-3 text-left text-sm font-medium transition-all active:scale-95',
              selected ? 'border-transparent text-ink' : 'border-line bg-ink/5 text-muted hover:text-ink',
            )}
            style={selected ? { background: `${category.color}26`, boxShadow: `0 0 0 1.5px ${category.color}` } : undefined}
          >
            <Icon className="h-4 w-4 shrink-0" style={{ color: category.color }} aria-hidden="true" />
            <span className="truncate">{category.label}</span>
          </button>
        );
      })}
    </div>
  );
}
