const pad = (n) => String(n).padStart(2, '0');
const capitalize = (text) => text.charAt(0).toUpperCase() + text.slice(1);
const formatter = (options) => new Intl.DateTimeFormat('fr-FR', options);

const DAY_FORMAT = formatter({ weekday: 'long', day: 'numeric', month: 'long' });
const SHORT_FORMAT = formatter({ day: 'numeric', month: 'short', year: 'numeric' });
const CHART_FORMAT = formatter({ day: 'numeric', month: 'short' });
const MONTH_SHORT_FORMAT = formatter({ month: 'short' });
const MONTH_LONG_FORMAT = formatter({ month: 'long', year: 'numeric' });

export const toISO = (date) => `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())}`;
export const todayISO = () => toISO(new Date());

export function parseISO(iso) {
  const [year, month, day] = iso.split('-').map(Number);
  return new Date(year, month - 1, day);
}

export function isValidISO(iso) {
  return typeof iso === 'string' && /^\d{4}-\d{2}-\d{2}$/.test(iso) && toISO(parseISO(iso)) === iso;
}

export const monthKey = (value) => (typeof value === 'string' ? value : toISO(value)).slice(0, 7);
export const shiftMonth = (date, delta) => new Date(date.getFullYear(), date.getMonth() + delta, 1);
export const addDays = (date, n) => new Date(date.getFullYear(), date.getMonth(), date.getDate() + n);
export const diffDays = (a, b) => Math.round((a - b) / 86_400_000);

export const formatDay = (iso) => capitalize(DAY_FORMAT.format(parseISO(iso)));
export const formatShortDate = (iso) => SHORT_FORMAT.format(parseISO(iso));
export const formatChartDate = (iso) => CHART_FORMAT.format(parseISO(iso));
export const formatMonthShort = (date) => MONTH_SHORT_FORMAT.format(date).replace('.', '');
export const formatMonthYear = (date) => capitalize(MONTH_LONG_FORMAT.format(date));
