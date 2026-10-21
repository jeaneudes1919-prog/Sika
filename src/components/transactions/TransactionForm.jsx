import { useId, useState } from 'react';
import { TX_TYPE } from '../../lib/constants';
import { todayISO } from '../../lib/dates';
import { validateTransaction } from '../../lib/transactions';
import Button from '../ui/Button';
import { Field, Input } from '../ui/Field';
import CategoryPicker from './CategoryPicker';
import TypeToggle from './TypeToggle';

const buildInitial = (initial) => ({
  type: initial?.type ?? TX_TYPE.expense,
  amount: initial ? String(initial.amount) : '',
  categoryId: initial?.categoryId ?? '',
  date: initial?.date ?? todayISO(),
  note: initial?.note ?? '',
});

export default function TransactionForm({ initial, onSubmit, onCancel }) {
  const uid = useId();
  const [form, setForm] = useState(() => buildInitial(initial));
  const [errors, setErrors] = useState({});
  const update = (patch) => setForm((current) => ({ ...current, ...patch }));

  const handleSubmit = (event) => {
    event.preventDefault();
    const found = validateTransaction(form);
    setErrors(found);
    if (Object.keys(found).length > 0) return;
    onSubmit({ type: form.type, amount: Number(form.amount), categoryId: form.categoryId, date: form.date, note: form.note.trim() });
  };

  return (
    <form onSubmit={handleSubmit} noValidate className="space-y-5">
      <TypeToggle value={form.type} onChange={(type) => update({ type, categoryId: '' })} />
      <Field label="Montant (FCFA)" htmlFor={`${uid}-amount`} error={errors.amount}>
        <Input id={`${uid}-amount`} type="number" inputMode="numeric" min="1" step="1" placeholder="Ex. 15000" value={form.amount} onChange={(e) => update({ amount: e.target.value })} />
      </Field>
      <Field label="Catégorie" error={errors.categoryId}>
        <CategoryPicker type={form.type} value={form.categoryId} onChange={(categoryId) => update({ categoryId })} />
      </Field>
      <div className="grid gap-5 sm:grid-cols-2">
        <Field label="Date" htmlFor={`${uid}-date`} error={errors.date}>
          <Input id={`${uid}-date`} type="date" value={form.date} onChange={(e) => update({ date: e.target.value })} />
        </Field>
        <Field label="Note (facultatif)" htmlFor={`${uid}-note`} error={errors.note}>
          <Input id={`${uid}-note`} type="text" placeholder="Ex. Marché Dantokpa" value={form.note} onChange={(e) => update({ note: e.target.value })} />
        </Field>
      </div>
      <div className="flex flex-col-reverse gap-2 pt-1 sm:flex-row sm:justify-end">
        <Button variant="soft" onClick={onCancel}>Annuler</Button>
        <Button type="submit">{initial ? 'Enregistrer' : 'Ajouter'}</Button>
      </div>
    </form>
  );
}
