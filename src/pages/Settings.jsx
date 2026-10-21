import { useState } from 'react';
import { RotateCcw } from 'lucide-react';
import Button from '../components/ui/Button';
import Card from '../components/ui/Card';
import Modal from '../components/ui/Modal';
import PageHeader from '../components/ui/PageHeader';
import PageSkeleton from '../components/ui/PageSkeleton';
import Segmented from '../components/ui/Segmented';
import Switch from '../components/ui/Switch';
import { useFinance } from '../context/FinanceContext';
import { useTheme } from '../context/ThemeContext';
import { useToast } from '../context/ToastContext';
import { CURRENCY, CURRENCY_LABELS, EUR_RATE, THEME } from '../lib/constants';
import { ACTIONS } from '../lib/financeReducer';

const CURRENCY_OPTIONS = Object.values(CURRENCY).map((value) => ({ value, label: CURRENCY_LABELS[value] }));

function Row({ title, text, children }) {
  return (
    <div className="flex flex-col gap-4 py-5 sm:flex-row sm:items-center sm:justify-between">
      <div>
        <h2 className="font-semibold">{title}</h2>
        <p className="mt-1 max-w-md text-sm text-muted">{text}</p>
      </div>
      <div className="shrink-0">{children}</div>
    </div>
  );
}

export default function Settings() {
  const { currency, loading, dispatch, resetDemo } = useFinance();
  const { theme, setTheme } = useTheme();
  const { push } = useToast();
  const [confirming, setConfirming] = useState(false);

  if (loading) return <PageSkeleton />;

  const handleReset = () => {
    resetDemo();
    setConfirming(false);
    push('Données de démonstration réinitialisées');
  };

  return (
    <>
      <PageHeader title="Paramètres" subtitle="Personnalisez l’apparence et l’affichage des montants." />
      <Card className="divide-y divide-line !py-1">
        <Row title="Thème sombre" text="Activez le mode sombre pour reposer vos yeux. Votre choix est mémorisé.">
          <Switch label="Thème sombre" checked={theme === THEME.dark} onChange={(on) => setTheme(on ? THEME.dark : THEME.light)} />
        </Row>
        <Row title="Devise d’affichage" text={`Affichage uniquement, les données restent en FCFA. Taux fixe : 1 € = ${EUR_RATE.toString().replace('.', ',')} FCFA.`}>
          <Segmented label="Devise d’affichage" value={currency} options={CURRENCY_OPTIONS} onChange={(value) => dispatch({ type: ACTIONS.SET_CURRENCY, payload: value })} />
        </Row>
        <Row title="Données de démonstration" text="Remplace toutes vos transactions, budgets et objectifs par le jeu de démonstration d’origine.">
          <Button variant="danger" icon={RotateCcw} onClick={() => setConfirming(true)}>Réinitialiser</Button>
        </Row>
      </Card>

      <Modal open={confirming} onClose={() => setConfirming(false)} title="Réinitialiser les données ?">
        <p className="text-sm text-muted">Cette action efface vos modifications et recharge les données de démonstration. Elle est irréversible.</p>
        <div className="mt-6 flex flex-col-reverse gap-2 sm:flex-row sm:justify-end">
          <Button variant="soft" onClick={() => setConfirming(false)}>Annuler</Button>
          <Button variant="danger" onClick={handleReset}>Oui, réinitialiser</Button>
        </div>
      </Modal>
    </>
  );
}
