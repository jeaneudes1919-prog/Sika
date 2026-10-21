import { useId, useState } from 'react';
import { validateBudget } from '../../lib/budgets';
import Button from '../ui/Button';
import { Field, Input } from '../ui/Field';
import Modal from '../ui/Modal';

function ContributeForm({ onSubmit, onClose }) {
  const uid = useId();
  const [amount, setAmount] = useState('');
  const [error, setError] = useState(null);

  const handleSubmit = (event) => {
    event.preventDefault();
    const problem = validateBudget(amount);
    setError(problem);
    if (!problem) onSubmit(Number(amount));
  };

  return (
    <form onSubmit={handleSubmit} noValidate className="space-y-5">
      <Field label="Montant à ajouter (FCFA)" htmlFor={`${uid}-amount`} error={error}>
        <Input id={`${uid}-amount`} type="number" inputMode="numeric" min="1" placeholder="Ex. 25000" value={amount} onChange={(e) => setAmount(e.target.value)} />
      </Field>
      <div className="flex flex-col-reverse gap-2 sm:flex-row sm:justify-end">
        <Button variant="soft" onClick={onClose}>Annuler</Button>
        <Button type="submit">Contribuer</Button>
      </div>
    </form>
  );
}

export default function ContributeModal({ goal, onSubmit, onClose }) {
  return (
    <Modal open={Boolean(goal)} onClose={onClose} title={goal ? `Contribuer à « ${goal.name} »` : 'Contribuer'}>
      {goal && <ContributeForm key={goal.id} onSubmit={onSubmit} onClose={onClose} />}
    </Modal>
  );
}
