import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { vi } from 'vitest';
import Modal from '../components/ui/Modal';
import TransactionForm from '../components/transactions/TransactionForm';

describe('TransactionForm', () => {
  it('affiche les erreurs et n’envoie rien si le formulaire est invalide', async () => {
    const onSubmit = vi.fn();
    render(<TransactionForm onSubmit={onSubmit} onCancel={() => {}} />);
    await userEvent.click(screen.getByRole('button', { name: 'Ajouter' }));
    expect(screen.getByText('Saisissez un montant supérieur à 0.')).toBeInTheDocument();
    expect(screen.getByText('Choisissez une catégorie.')).toBeInTheDocument();
    expect(onSubmit).not.toHaveBeenCalled();
  });

  it('envoie les valeurs normalisées quand le formulaire est valide', async () => {
    const onSubmit = vi.fn();
    render(<TransactionForm onSubmit={onSubmit} onCancel={() => {}} />);
    await userEvent.type(screen.getByLabelText('Montant (FCFA)'), '15000');
    await userEvent.click(screen.getByRole('radio', { name: 'Transport' }));
    await userEvent.click(screen.getByRole('button', { name: 'Ajouter' }));
    expect(onSubmit).toHaveBeenCalledWith(expect.objectContaining({ type: 'expense', amount: 15000, categoryId: 'transport' }));
  });
});

describe('Modal', () => {
  it('se ferme avec la touche Échap', async () => {
    const onClose = vi.fn();
    render(<Modal open onClose={onClose} title="Test"><button>OK</button></Modal>);
    expect(screen.getByRole('dialog', { name: 'Test' })).toBeInTheDocument();
    await userEvent.keyboard('{Escape}');
    expect(onClose).toHaveBeenCalled();
  });
});
