import clsx from 'clsx';
import { useFinance } from '../../context/FinanceContext';
import { useCountUp } from '../../hooks/useCountUp';
import { formatMoney } from '../../lib/format';

function Animated({ amount, currency }) {
  const value = useCountUp(amount);
  return formatMoney(Math.round(value), currency);
}

export default function Money({ amount, animated = false, className }) {
  const { currency } = useFinance();
  return (
    <span className={clsx('tabular-nums', className)}>
      {animated ? <Animated amount={amount} currency={currency} /> : formatMoney(amount, currency)}
    </span>
  );
}
