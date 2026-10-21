import { useId, useState } from 'react';
import { useFinance } from '../../context/FinanceContext';
import { useToast } from '../../context/ToastContext';
import { addDays, toISO } from '../../lib/dates';
import { ACTIONS } from '../../lib/financeReducer';
import { validateGoal } from '../../lib/goals';
import { createId } from '../../lib/id';
import Button from '../ui/Button';
import { Field, Input } from '../ui/Field';
import Modal from '../ui/Modal';

const DEFAULT_DEADLINE_DAYS = 180;

function GoalForm({ onClose }) {
  const uid = useId();
  const { dispatch, now } = useFinance();
  const { push } = useToast();
  const [form, setForm] = useState({ name: '', target: '', deadline: toISO(addDays(now, DEFAULT_DEADLINE_DAYS)) });
  const [errors, setErrors] = useState({});
  const update = (key) => (event) => setForm((f) => ({ ...f, [key]: event.target.value }));

  const handleSubmit = (event) => {
    event.preventDefault();
    const found = validateGoal(form, now);
    setErrors(found);
    if (Object.keys(found).length > 0) return;
    dispatch({
      type: ACTIONS.ADD_GOAL,
      payload: { id: createId(), name: form.name.trim(), target: Number(form.target), saved: 0, createdAt: toISO(now), deadline: form.deadline },
    });
    push('Objectif créé');
    onClose();
  };

  return (
    <form onSubmit={handleSubmit} noValidate className="space-y-5">
      <Field label="Nom de l’objectif" htmlFor={`${uid}-name`} error={errors.name}>
        <Input id={`${uid}-name`} placeholder="Ex. Voyage à Dakar" value={form.name} onChange={update('name')} />
      </Field>
      <Field label="Montant cible (FCFA)" htmlFor={`${uid}-target`} error={errors.target}>
        <Input id={`${uid}-target`} type="number" inputMode="numeric" min="1" placeholder="Ex. 300000" value={form.target} onChange={update('target')} />
      </Field>
      <Field label="Date cible" htmlFor={`${uid}-deadline`} error={errors.deadline}>
        <Input id={`${uid}-deadline`} type="date" value={form.deadline} onChange={update('deadline')} />
      </Field>
      <div className="flex flex-col-reverse gap-2 sm:flex-row sm:justify-end">
        <Button variant="soft" onClick={onClose}>Annuler</Button>
        <Button type="submit">Créer l’objectif</Button>
      </div>
    </form>
  );
}

export default function GoalModal({ open, onClose }) {
  return (
    <Modal open={open} onClose={onClose} title="Nouvel objectif d’épargne">
      <GoalForm onClose={onClose} />
    </Modal>
  );
}
