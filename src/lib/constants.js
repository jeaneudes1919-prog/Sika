export const EUR_RATE = 655.957;
export const STORAGE_KEYS = { data: 'sika:data:v1', theme: 'sika:theme' };
export const CURRENCY = { XOF: 'XOF', EUR: 'EUR' };
export const CURRENCY_LABELS = { XOF: 'FCFA', EUR: 'EUR' };
export const THEME = { dark: 'dark', light: 'light' };
export const TX_TYPE = { income: 'income', expense: 'expense' };
export const BUDGET_STATUS = { ok: 'ok', warning: 'warning', exceeded: 'exceeded' };
export const GOAL_STATUS = { reached: 'reached', unknown: 'unknown', onTrack: 'on-track', late: 'late' };

export const BUDGET_WARNING_PERCENT = 80;
export const BUDGET_EXCEEDED_PERCENT = 100;
export const LOADING_DELAY_MS = 700;
export const TOAST_DURATION_MS = 5000;
export const CONFETTI_DURATION_MS = 3800;
export const RECENT_COUNT = 5;
export const CHART_MONTHS = 6;
export const BALANCE_CURVE_DAYS = 90;
export const NOTE_MAX_LENGTH = 120;
export const NAME_MAX_LENGTH = 60;
export const MAX_AMOUNT = 1_000_000_000;
export const COUNT_UP_MS = 1000;

export const DEFAULT_FILTERS = { query: '', type: 'all', categoryId: 'all', period: 'all', sort: 'date-desc' };

export const PERIOD_OPTIONS = [
  { value: 'all', label: 'Toute période' },
  { value: 'this-month', label: 'Ce mois-ci' },
  { value: 'last-month', label: 'Mois dernier' },
  { value: '30d', label: '30 derniers jours' },
  { value: '3m', label: '3 derniers mois' },
];

export const SORT_OPTIONS = [
  { value: 'date-desc', label: 'Plus récentes' },
  { value: 'date-asc', label: 'Plus anciennes' },
  { value: 'amount-desc', label: 'Montant décroissant' },
  { value: 'amount-asc', label: 'Montant croissant' },
];

export const CHART_COLORS = {
  income: '#2DD4A0',
  expense: '#FB7185',
  balance: '#60A5FA',
  grid: 'rgba(148,163,184,0.18)',
  tick: '#94A3B8',
};
