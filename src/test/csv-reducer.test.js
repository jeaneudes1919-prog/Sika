import { transactionsToCSV } from '../lib/csv';
import { ACTIONS, financeReducer } from '../lib/financeReducer';

describe('export CSV', () => {
  it('génère l’en-tête, les lignes et échappe les guillemets', () => {
    const csv = transactionsToCSV([
      { id: '1', type: 'expense', amount: 8000, categoryId: 'nourriture', date: '2026-10-05', note: 'Chez "Maman"' },
    ]);
    const [header, row] = csv.split('\r\n');
    expect(header).toBe('"Date";"Type";"Catégorie";"Note";"Montant (FCFA)"');
    expect(row).toBe('"2026-10-05";"Dépense";"Nourriture";"Chez ""Maman""";"8000"');
  });
});

describe('financeReducer', () => {
  const base = { transactions: [], budgets: { transport: 20000 }, goals: [{ id: 'g', saved: 10, target: 100 }], settings: { currency: 'XOF' } };

  it('ajoute puis supprime une transaction', () => {
    const added = financeReducer(base, { type: ACTIONS.ADD_TX, payload: { id: 'a' } });
    expect(added.transactions).toHaveLength(1);
    expect(financeReducer(added, { type: ACTIONS.REMOVE_TX, payload: 'a' }).transactions).toHaveLength(0);
  });

  it('ajoute une contribution et supprime un budget', () => {
    expect(financeReducer(base, { type: ACTIONS.CONTRIBUTE, payload: { id: 'g', amount: 40 } }).goals[0].saved).toBe(50);
    expect(financeReducer(base, { type: ACTIONS.REMOVE_BUDGET, payload: 'transport' }).budgets).toEqual({});
  });
});
