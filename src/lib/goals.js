import { GOAL_STATUS, MAX_AMOUNT, NAME_MAX_LENGTH } from './constants';
import { addDays, diffDays, isValidISO, parseISO, toISO } from './dates';

export const goalProgress = (goal) => (goal.target > 0 ? Math.min(100, (goal.saved / goal.target) * 100) : 0);

export function projectGoal(goal, now = new Date()) {
  const remaining = Math.max(goal.target - goal.saved, 0);
  if (remaining === 0) return { status: GOAL_STATUS.reached, date: null };
  const elapsedDays = Math.max(diffDays(now, parseISO(goal.createdAt)), 1);
  const dailyRate = goal.saved / elapsedDays;
  if (dailyRate <= 0) return { status: GOAL_STATUS.unknown, date: null };
  const date = toISO(addDays(now, Math.ceil(remaining / dailyRate)));
  return { status: date <= goal.deadline ? GOAL_STATUS.onTrack : GOAL_STATUS.late, date };
}

export function validateGoal({ name, target, deadline }, now = new Date()) {
  const errors = {};
  if (!name.trim()) errors.name = 'Donnez un nom à votre objectif.';
  else if (name.trim().length > NAME_MAX_LENGTH) errors.name = `Maximum ${NAME_MAX_LENGTH} caractères.`;
  const value = Number(target);
  if (!Number.isFinite(value) || value <= 0 || value > MAX_AMOUNT) errors.target = 'Saisissez un montant cible valide.';
  if (!isValidISO(deadline) || deadline <= toISO(now)) errors.deadline = 'Choisissez une date dans le futur.';
  return errors;
}
