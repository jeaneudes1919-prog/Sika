import { useFinance } from '../../context/FinanceContext';
import { useToast } from '../../context/ToastContext';
import { ACTIONS } from '../../lib/financeReducer';
import { createId } from '../../lib/id';
import Modal from '../ui/Modal';
import TransactionForm from './TransactionForm';

export default function TransactionModal({ open, onClose, transaction }) {
  const { dispatch } = useFinance();
  const { push } = useToast();

  const handleSubmit = (values) => {
    if (transaction) {
      dispatch({ type: ACTIONS.UPDATE_TX, payload: { ...transaction, ...values } });
      push('Transaction modifiée');
    } else {
      dispatch({ type: ACTIONS.ADD_TX, payload: { id: createId(), ...values } });
      push('Transaction ajoutée');
    }
    onClose();
  };

  return (
    <Modal open={open} onClose={onClose} title={transaction ? 'Modifier la transaction' : 'Nouvelle transaction'}>
      <TransactionForm key={transaction?.id ?? 'new'} initial={transaction} onSubmit={handleSubmit} onCancel={onClose} />
    </Modal>
  );
}
