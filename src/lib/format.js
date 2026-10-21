import { CURRENCY, EUR_RATE } from './constants';

const FORMATTERS = {
  [CURRENCY.XOF]: new Intl.NumberFormat('fr-FR', { style: 'currency', currency: 'XOF', maximumFractionDigits: 0 }),
  [CURRENCY.EUR]: new Intl.NumberFormat('fr-FR', { style: 'currency', currency: 'EUR' }),
};
const COMPACT = new Intl.NumberFormat('fr-FR', { notation: 'compact', maximumFractionDigits: 1 });

export const convert = (amountXof, currency) => (currency === CURRENCY.EUR ? amountXof / EUR_RATE : amountXof);
export const formatMoney = (amountXof, currency = CURRENCY.XOF) => FORMATTERS[currency].format(convert(amountXof, currency));
export const formatCompact = (amountXof, currency = CURRENCY.XOF) => COMPACT.format(convert(amountXof, currency));
export const formatPercent = (value) => `${value > 0 ? '+' : ''}${Math.round(value)} %`;
