import { TX_TYPE } from '../../lib/constants';
import Segmented from '../ui/Segmented';

const OPTIONS = [
  { value: TX_TYPE.expense, label: 'Dépense', activeClass: 'bg-coral/20 text-coral' },
  { value: TX_TYPE.income, label: 'Revenu', activeClass: 'bg-mint/20 text-mint' },
];

export default function TypeToggle({ value, onChange }) {
  return <Segmented label="Type de transaction" value={value} onChange={onChange} options={OPTIONS} />;
}
