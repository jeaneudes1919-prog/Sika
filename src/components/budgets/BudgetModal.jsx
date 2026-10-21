import { useId, useState } from 'react';
import { useFinance } from '../../context/FinanceContext';
import { useToast } from '../../context/ToastContext';
import { validateBudget } from '../../lib/budgets';
import { ACTIONS } from '../../lib/financeReducer';
import Button from '../ui/Button';
import { Field, Input } from '../ui/Field';
import Modal from '../ui/Modal';

function BudgetForm({ category, current, onClose }) {
  const uid = useId();
  const { dispatch } = useFinance();
  const { push } = useToast();
  const [amount, setAmount] = useState(current ? String(current) : '');
  const [error, setError] = useState(null);

  const handleSubmit = (event) => {
    event.preventDefault();
    const problem = validateBudget(amount);
    setError(problem);
    if (problem) return;
    dispatch({ type: ACTIONS.SET_BUDGET, payload: { categoryId: category.id, amount: Number(amount) } });
    push(`Budget ${category.label} enregistré`);
    onClose();
  };

  const handleRemove = () => {
    dispatch({ type: ACTIONS.REMOVE_BUDGET, payload: category.id });
    push(`Budget ${category.label} supprimé`);
    onClose();
  };

  return (
    <form onSubmit={handleSubmit} noValidate className="space-y-5">
      <Field label="Budget mensuel (FCFA)" htmlFor={`${uid}-amount`} error={error}>
        <Input id={`${uid}-amount`} type="number" inputMode="numeric" min="1" placeholder="Ex. 50000" value={amount} onChange={(e) => setAmount(e.target.value)} />
      </Field>
      <div className="flex flex-col-reverse gap-2 sm:flex-row sm:justify-end">
        {current && <Button variant="danger" onClick={handleRemove}>Supprimer</Button>}
        <Button variant="soft" onClick={onClose}>Annuler</Button>
        <Button type="submit">Enregistrer</Button>
      </div>
    </form>
  );
}

export default function BudgetModal({ category, current, onClose }) {
  return (
    <Modal open={Boolean(category)} onClose={onClose} title={category ? `Budget ${category.label}` : 'Budget'}>
      {category && <BudgetForm key={category.id} category={category} current={current} onClose={onClose} />}
    </Modal>
  );
}
