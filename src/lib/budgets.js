import { BUDGET_EXCEEDED_PERCENT, BUDGET_STATUS, BUDGET_WARNING_PERCENT, MAX_AMOUNT } from './constants';

export function budgetProgress(spent, limit) {
  const percent = limit > 0 ? (spent / limit) * 100 : 0;
  let status = BUDGET_STATUS.ok;
  if (percent > BUDGET_EXCEEDED_PERCENT) status = BUDGET_STATUS.exceeded;
  else if (percent >= BUDGET_WARNING_PERCENT) status = BUDGET_STATUS.warning;
  return { percent, status, remaining: limit - spent };
}

export function validateBudget(amount) {
  const value = Number(amount);
  if (!Number.isFinite(value) || value <= 0) return 'Saisissez un montant supérieur à 0.';
  if (value > MAX_AMOUNT) return 'Ce montant est trop élevé.';
  return null;
}
