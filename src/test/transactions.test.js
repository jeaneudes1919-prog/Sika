import {
  applyFilters, balanceCurve, computeTotals, groupByDate, monthlySeries, pctChange, spendingByCategory, validateTransaction,
} from '../lib/transactions';
import { DEFAULT_FILTERS } from '../lib/constants';

const NOW = new Date(2026, 9, 20);
const tx = (id, type, amount, categoryId, date, note = '') => ({ id, type, amount, categoryId, date, note });
const SAMPLE = [
  tx('1', 'income', 450000, 'salaire', '2026-10-01', 'Salaire'),
  tx('2', 'expense', 120000, 'logement', '2026-10-05', 'Loyer'),
  tx('3', 'expense', 8000, 'nourriture', '2026-10-05', 'Marché Dantokpa'),
  tx('4', 'expense', 3000, 'nourriture', '2026-09-12', 'Boulangerie'),
  tx('5', 'income', 80000, 'freelance', '2026-09-14', 'Mission'),
];

describe('totaux et agrégations', () => {
  it('calcule revenus, dépenses et solde', () => {
    expect(computeTotals(SAMPLE)).toEqual({ income: 530000, expense: 131000, balance: 399000 });
  });

  it('agrège les dépenses par catégorie, triées par montant', () => {
    expect(spendingByCategory(SAMPLE)).toEqual([
      { categoryId: 'logement', total: 120000 },
      { categoryId: 'nourriture', total: 11000 },
    ]);
  });

  it('calcule une variation et gère un mois précédent vide', () => {
    expect(pctChange(150, 100)).toBe(50);
    expect(pctChange(100, 0)).toBeNull();
  });

  it('produit une série mensuelle de 6 mois', () => {
    const series = monthlySeries(SAMPLE, NOW);
    expect(series).toHaveLength(6);
    expect(series.at(-1)).toMatchObject({ key: '2026-10', income: 450000, expense: 128000 });
  });

  it('construit une courbe de solde cumulée', () => {
    const curve = balanceCurve(SAMPLE, NOW, 30);
    expect(curve).toHaveLength(30);
    expect(curve.at(-1).balance).toBe(399000);
  });
});

describe('validation d’une transaction', () => {
  const valid = { type: 'expense', amount: '5000', categoryId: 'transport', date: '2026-10-10', note: '' };

  it('accepte une transaction valide', () => {
    expect(validateTransaction(valid)).toEqual({});
  });

  it('rejette montant, catégorie et date invalides', () => {
    const errors = validateTransaction({ ...valid, amount: '-5', categoryId: 'salaire', date: '2026-13-45' });
    expect(Object.keys(errors).sort()).toEqual(['amount', 'categoryId', 'date']);
  });
});

describe('filtres et tris combinés', () => {
  it('filtre par type et période puis trie par montant décroissant', () => {
    const result = applyFilters(SAMPLE, { ...DEFAULT_FILTERS, type: 'expense', period: 'this-month', sort: 'amount-desc' }, NOW);
    expect(result.map((t) => t.id)).toEqual(['2', '3']);
  });

  it('recherche dans la note et le nom de catégorie', () => {
    expect(applyFilters(SAMPLE, { ...DEFAULT_FILTERS, query: 'marché' }, NOW).map((t) => t.id)).toEqual(['3']);
    expect(applyFilters(SAMPLE, { ...DEFAULT_FILTERS, query: 'freelance' }, NOW).map((t) => t.id)).toEqual(['5']);
  });

  it('groupe par date en conservant l’ordre et le net du jour', () => {
    const groups = groupByDate(applyFilters(SAMPLE, DEFAULT_FILTERS, NOW));
    expect(groups.map((g) => g.date)).toEqual(['2026-10-05', '2026-10-01', '2026-09-14', '2026-09-12']);
    expect(groups[0].net).toBe(-128000);
  });
});
