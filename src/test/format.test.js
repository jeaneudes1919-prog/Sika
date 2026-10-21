import { convert, formatMoney, formatPercent } from '../lib/format';

const normalize = (text) => text.replace(/[\u202f\u00a0]/g, ' ');

describe('formatage des montants', () => {
  it('formate en FCFA sans décimales', () => {
    expect(normalize(formatMoney(1250000))).toBe('1 250 000 F CFA');
  });

  it('convertit et formate en euros au taux fixe', () => {
    expect(convert(655957, 'EUR')).toBeCloseTo(1000, 5);
    expect(normalize(formatMoney(655957, 'EUR'))).toBe('1 000,00 €');
  });

  it('formate les variations en pourcentage', () => {
    expect(formatPercent(12.4)).toBe('+12 %');
    expect(formatPercent(-8)).toBe('-8 %');
  });
});
