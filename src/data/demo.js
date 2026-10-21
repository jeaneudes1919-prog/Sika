import { CURRENCY, TX_TYPE } from '../lib/constants';
import { addDays, shiftMonth, toISO } from '../lib/dates';

const SEED = 20261;
const ROUND_TO = 500;
const MONTH_OFFSETS = [-2, -1, 0];
const MAX_DAY = 28;
const GOAL_DAYS = { laptop: 75, emergency: 110 };

const income = (categoryId, day, amount, note) => ({ type: TX_TYPE.income, categoryId, day, amount, note });
const expense = (categoryId, day, amount, note) => ({ type: TX_TYPE.expense, categoryId, day, amount, note });

const FIXED = [
  income('salaire', 1, 450000, 'Salaire mensuel — Atlantic Tech Cotonou'),
  expense('abonnements', 3, 15000, 'Forfait internet MTN Fibre'),
  expense('logement', 5, 120000, 'Loyer — appartement à Fidjrossè'),
  expense('abonnements', 8, 12000, 'Abonnement Canal+'),
  expense('logement', 10, 18000, 'Facture SBEE (électricité)'),
  expense('abonnements', 12, 6500, 'Netflix'),
];

const VARIABLE = [
  { type: TX_TYPE.income, categoryId: 'freelance', count: 1, min: 60000, max: 120000,
    notes: ['Mission freelance — site vitrine', 'Développement d’un bot Telegram', 'Maintenance application web'] },
  { type: TX_TYPE.expense, categoryId: 'nourriture', count: 9, min: 2500, max: 9500,
    notes: ['Marché Dantokpa', 'Supermarché Erevan', 'Déjeuner chez Maman Pauline', 'Maquis du quartier', 'Boulangerie du carrefour'] },
  { type: TX_TYPE.expense, categoryId: 'transport', count: 14, min: 800, max: 2500,
    notes: ['Zémidjan — trajet domicile/bureau', 'Taxi collectif', 'Carburant moto'] },
  { type: TX_TYPE.expense, categoryId: 'loisirs', count: 3, min: 4000, max: 9000,
    notes: ['Cinéma Canal Olympia', 'Sortie plage à Fidjrossè', 'Soirée entre amis'] },
  { type: TX_TYPE.expense, categoryId: 'sante', count: 1, min: 3000, max: 12000, notes: ['Pharmacie Camp Guézo', 'Consultation médicale'] },
  { type: TX_TYPE.expense, categoryId: 'shopping', count: 2, min: 8000, max: 25000, notes: ['Vêtements au marché Missèbo', 'Chaussures de ville'] },
  { type: TX_TYPE.expense, categoryId: 'education', count: 1, min: 8000, max: 20000, notes: ['Cours en ligne de cybersécurité', 'Livres techniques'] },
];

const DEFAULT_BUDGETS = {
  logement: 150000, nourriture: 60000, transport: 25000, loisirs: 25000,
  abonnements: 35000, sante: 20000, shopping: 40000, education: 30000,
};

function mulberry32(seed) {
  let a = seed;
  return () => {
    a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

export function generateDemoData(now = new Date()) {
  const rand = mulberry32(SEED);
  const today = toISO(now);
  const transactions = [];
  let counter = 0;

  const push = (month, day, template, amount, note) => {
    const id = `demo-${counter++}`;
    const date = toISO(new Date(month.getFullYear(), month.getMonth(), day));
    if (date > today) return;
    transactions.push({ id, type: template.type, amount, categoryId: template.categoryId, date, note });
  };

  for (const offset of MONTH_OFFSETS) {
    const month = shiftMonth(now, offset);
    FIXED.forEach((tpl) => push(month, tpl.day, tpl, tpl.amount, tpl.note));
    VARIABLE.forEach((tpl) => {
      for (let i = 0; i < tpl.count; i += 1) {
        const day = 1 + Math.floor(rand() * MAX_DAY);
        const amount = Math.round((tpl.min + rand() * (tpl.max - tpl.min)) / ROUND_TO) * ROUND_TO;
        push(month, day, tpl, amount, tpl.notes[Math.floor(rand() * tpl.notes.length)]);
      }
    });
  }

  const goals = [
    { id: 'goal-laptop', name: 'Ordinateur portable', target: 600000, saved: 245000,
      createdAt: toISO(addDays(now, -GOAL_DAYS.laptop)), deadline: toISO(addDays(now, 150)) },
    { id: 'goal-emergency', name: 'Fonds d’urgence', target: 500000, saved: 180000,
      createdAt: toISO(addDays(now, -GOAL_DAYS.emergency)), deadline: toISO(addDays(now, 120)) },
  ];

  return { transactions, budgets: { ...DEFAULT_BUDGETS }, goals, settings: { currency: CURRENCY.XOF } };
}
