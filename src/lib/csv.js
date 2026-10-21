import { getCategory } from '../data/categories';
import { TX_TYPE } from './constants';

const HEADER = ['Date', 'Type', 'Catégorie', 'Note', 'Montant (FCFA)'];
const BOM = '\uFEFF';
const SEPARATOR = ';';
const escapeCell = (value) => `"${String(value).replace(/"/g, '""')}"`;

export function transactionsToCSV(transactions) {
  const rows = transactions.map((t) => [
    t.date,
    t.type === TX_TYPE.income ? 'Revenu' : 'Dépense',
    getCategory(t.categoryId)?.label ?? t.categoryId,
    t.note,
    t.amount,
  ]);
  return [HEADER, ...rows].map((row) => row.map(escapeCell).join(SEPARATOR)).join('\r\n');
}

export function downloadCSV(content, filename) {
  const blob = new Blob([BOM, content], { type: 'text/csv;charset=utf-8' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  link.remove();
  URL.revokeObjectURL(url);
}
