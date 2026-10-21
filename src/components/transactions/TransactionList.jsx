import { AnimatePresence, motion } from 'framer-motion';
import { formatDay } from '../../lib/dates';
import Card from '../ui/Card';
import Money from '../ui/Money';
import TransactionRow from './TransactionRow';

export default function TransactionList({ groups, onEdit, onDelete }) {
  return (
    <div className="space-y-5">
      {groups.map((group) => (
        <section key={group.date ?? 'all'} aria-label={group.date ? formatDay(group.date) : 'Transactions'}>
          {group.date && (
            <div className="mb-2 flex items-baseline justify-between px-2">
              <h2 className="text-sm font-semibold">{formatDay(group.date)}</h2>
              <p className="text-xs text-muted">
                Net : {group.net > 0 ? '+' : group.net < 0 ? '−' : ''}
                <Money amount={Math.abs(group.net)} />
              </p>
            </div>
          )}
          <Card className="divide-y divide-line !p-3 sm:!p-4">
            <AnimatePresence initial={false}>
              {group.items.map((transaction) => (
                <motion.div key={transaction.id} exit={{ opacity: 0, x: -16 }} transition={{ duration: 0.2 }}>
                  <TransactionRow transaction={transaction} showDate={!group.date} onEdit={onEdit} onDelete={onDelete} />
                </motion.div>
              ))}
            </AnimatePresence>
          </Card>
        </section>
      ))}
    </div>
  );
}
