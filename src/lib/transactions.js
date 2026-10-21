import { getCategory } from '../data/categories';
import { CHART_MONTHS, BALANCE_CURVE_DAYS, MAX_AMOUNT, NOTE_MAX_LENGTH, TX_TYPE } from './constants';
import { addDays, formatMonthShort, isValidISO, monthKey, shiftMonth, toISO } from './dates';

const signed = (t) => (t.type === TX_TYPE.income ? t.amount : -t.amount);

export function computeTotals(transactions) {
  let income = 0;
  let expense = 0;
  for (const t of transactions) {
    if (t.type === TX_TYPE.income) income += t.amount;
    else expense += t.amount;
  }
  return { income, expense, balance: income - expense };
}

export const totalsForMonth = (transactions, key) =>
  computeTotals(transactions.filter((t) => monthKey(t.date) === key));

export function spendingByCategory(transactions) {
  const totals = new Map();
  for (const t of transactions) {
    if (t.type !== TX_TYPE.expense) continue;
    totals.set(t.categoryId, (totals.get(t.categoryId) ?? 0) + t.amount);
  }
  return [...totals]
    .map(([categoryId, total]) => ({ categoryId, total }))
    .sort((a, b) => b.total - a.total);
}

export function pctChange(current, previous) {
  if (!previous) return null;
  return ((current - previous) / previous) * 100;
}

export function validateTransaction({ type, amount, categoryId, date, note = '' }) {
  const errors = {};
  const value = Number(amount);
  if (!Number.isFinite(value) || value <= 0) errors.amount = 'Saisissez un montant supérieur à 0.';
  else if (value > MAX_AMOUNT) errors.amount = 'Ce montant est trop élevé.';
  const category = getCategory(categoryId);
  if (!category) errors.categoryId = 'Choisissez une catégorie.';
  else if (category.type !== type) errors.categoryId = 'Cette catégorie ne correspond pas au type choisi.';
  if (!isValidISO(date)) errors.date = 'Choisissez une date valide.';
  if (note.length > NOTE_MAX_LENGTH) errors.note = `La note ne peut pas dépasser ${NOTE_MAX_LENGTH} caractères.`;
  return errors;
}

function inPeriod(date, period, now) {
  switch (period) {
    case 'this-month': return monthKey(date) === monthKey(now);
    case 'last-month': return monthKey(date) === monthKey(shiftMonth(now, -1));
    case '30d': return date >= toISO(addDays(now, -29)) && date <= toISO(now);
    case '3m': return date >= toISO(shiftMonth(now, -2));
    default: return true;
  }
}

export function filterTransactions(list, filters, now = new Date()) {
  const query = filters.query.trim().toLowerCase();
  return list.filter((t) => {
    if (filters.type !== 'all' && t.type !== filters.type) return false;
    if (filters.categoryId !== 'all' && t.categoryId !== filters.categoryId) return false;
    if (!inPeriod(t.date, filters.period, now)) return false;
    if (query) {
      const haystack = `${t.note} ${getCategory(t.categoryId)?.label ?? ''}`.toLowerCase();
      if (!haystack.includes(query)) return false;
    }
    return true;
  });
}

const COMPARATORS = {
  'date-desc': (a, b) => b.date.localeCompare(a.date),
  'date-asc': (a, b) => a.date.localeCompare(b.date),
  'amount-desc': (a, b) => b.amount - a.amount,
  'amount-asc': (a, b) => a.amount - b.amount,
};

export const sortTransactions = (list, sort) =>
  [...list].sort((a, b) => (COMPARATORS[sort] ?? COMPARATORS['date-desc'])(a, b) || a.id.localeCompare(b.id));

export const applyFilters = (list, filters, now) =>
  sortTransactions(filterTransactions(list, filters, now), filters.sort);

export function groupByDate(list) {
  const groups = [];
  for (const t of list) {
    const last = groups.at(-1);
    if (last && last.date === t.date) last.items.push(t);
    else groups.push({ date: t.date, items: [t] });
  }
  return groups.map((g) => ({ ...g, net: g.items.reduce((sum, t) => sum + signed(t), 0) }));
}

export function monthlySeries(transactions, now, count = CHART_MONTHS) {
  return Array.from({ length: count }, (_, i) => {
    const month = shiftMonth(now, i - (count - 1));
    const { income, expense } = totalsForMonth(transactions, monthKey(month));
    return { key: monthKey(month), label: formatMonthShort(month), income, expense };
  });
}

export function balanceCurve(transactions, now, days = BALANCE_CURVE_DAYS) {
  const startISO = toISO(addDays(now, -(days - 1)));
  const deltas = new Map();
  let balance = 0;
  for (const t of transactions) {
    if (t.date < startISO) balance += signed(t);
    else deltas.set(t.date, (deltas.get(t.date) ?? 0) + signed(t));
  }
  return Array.from({ length: days }, (_, i) => {
    const date = toISO(addDays(now, -(days - 1 - i)));
    balance += deltas.get(date) ?? 0;
    return { date, balance };
  });
}
