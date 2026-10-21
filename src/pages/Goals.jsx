import { useEffect, useState } from 'react';
import { Plus, Target } from 'lucide-react';
import ContributeModal from '../components/goals/ContributeModal';
import Confetti from '../components/goals/Confetti';
import GoalCard from '../components/goals/GoalCard';
import GoalModal from '../components/goals/GoalModal';
import Button from '../components/ui/Button';
import Card from '../components/ui/Card';
import EmptyState from '../components/ui/EmptyState';
import PageHeader from '../components/ui/PageHeader';
import PageSkeleton from '../components/ui/PageSkeleton';
import Reveal from '../components/ui/Reveal';
import { useFinance } from '../context/FinanceContext';
import { useToast } from '../context/ToastContext';
import { CONFETTI_DURATION_MS } from '../lib/constants';
import { ACTIONS } from '../lib/financeReducer';

export default function Goals() {
  const { goals, loading, dispatch } = useFinance();
  const { push } = useToast();
  const [creating, setCreating] = useState(false);
  const [contributing, setContributing] = useState(null);
  const [celebrating, setCelebrating] = useState(false);

  useEffect(() => {
    if (!celebrating) return undefined;
    const id = setTimeout(() => setCelebrating(false), CONFETTI_DURATION_MS);
    return () => clearTimeout(id);
  }, [celebrating]);

  if (loading) return <PageSkeleton />;

  const handleContribute = (amount) => {
    const goal = contributing;
    dispatch({ type: ACTIONS.CONTRIBUTE, payload: { id: goal.id, amount } });
    setContributing(null);
    if (goal.saved < goal.target && goal.saved + amount >= goal.target) {
      setCelebrating(true);
      push(`Bravo ! « ${goal.name} » est atteint.`);
    } else {
      push('Contribution ajoutée');
    }
  };

  const handleDelete = (goal) => {
    dispatch({ type: ACTIONS.REMOVE_GOAL, payload: goal.id });
    push('Objectif supprimé', { label: 'Annuler', onClick: () => dispatch({ type: ACTIONS.ADD_GOAL, payload: goal }) });
  };

  return (
    <>
      <PageHeader title="Objectifs d’épargne" subtitle="Mettez de côté pour ce qui compte vraiment.">
        <Button icon={Plus} onClick={() => setCreating(true)}>Nouvel objectif</Button>
      </PageHeader>

      {goals.length === 0 ? (
        <Card>
          <EmptyState icon={Target} title="Aucun objectif pour le moment" text="Créez un objectif (voyage, ordinateur, fonds d’urgence…) et suivez votre progression.">
            <Button icon={Plus} onClick={() => setCreating(true)}>Créer un objectif</Button>
          </EmptyState>
        </Card>
      ) : (
        <ul className="grid gap-4 md:grid-cols-2">
          {goals.map((goal, index) => (
            <li key={goal.id}>
              <Reveal delay={Math.min(index, 5) * 0.05}>
                <GoalCard goal={goal} onContribute={setContributing} onDelete={handleDelete} />
              </Reveal>
            </li>
          ))}
        </ul>
      )}

      <GoalModal open={creating} onClose={() => setCreating(false)} />
      <ContributeModal goal={contributing} onSubmit={handleContribute} onClose={() => setContributing(null)} />
      {celebrating && <Confetti />}
    </>
  );
}
