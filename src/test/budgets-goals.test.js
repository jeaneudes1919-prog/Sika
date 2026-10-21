import { budgetProgress } from '../lib/budgets';
import { projectGoal, validateGoal } from '../lib/goals';

describe('budgets', () => {
  it('statut normal sous 80 %', () => {
    expect(budgetProgress(50000, 100000)).toMatchObject({ percent: 50, status: 'ok', remaining: 50000 });
  });

  it('statut alerte à partir de 80 %', () => {
    expect(budgetProgress(80000, 100000).status).toBe('warning');
    expect(budgetProgress(100000, 100000).status).toBe('warning');
  });

  it('statut dépassé au-delà de 100 %', () => {
    expect(budgetProgress(120000, 100000)).toMatchObject({ status: 'exceeded', remaining: -20000 });
  });
});

describe('objectifs d’épargne', () => {
  const NOW = new Date(2026, 9, 20);
  const goal = { target: 600000, saved: 200000, createdAt: '2026-08-21', deadline: '2027-06-30' };

  it('projette la date d’atteinte au rythme actuel', () => {
    // 200 000 en 60 jours => 400 000 restants = 120 jours
    expect(projectGoal(goal, NOW)).toEqual({ status: 'on-track', date: '2027-02-17' });
  });

  it('signale un retard si la projection dépasse l’échéance', () => {
    expect(projectGoal({ ...goal, deadline: '2026-12-31' }, NOW).status).toBe('late');
  });

  it('gère objectif atteint et aucune contribution', () => {
    expect(projectGoal({ ...goal, saved: 600000 }, NOW).status).toBe('reached');
    expect(projectGoal({ ...goal, saved: 0 }, NOW).status).toBe('unknown');
  });

  it('valide la création d’un objectif', () => {
    expect(validateGoal({ name: 'Moto', target: '500000', deadline: '2027-01-01' }, NOW)).toEqual({});
    expect(Object.keys(validateGoal({ name: ' ', target: '0', deadline: '2026-01-01' }, NOW))).toHaveLength(3);
  });
});
