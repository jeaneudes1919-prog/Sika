import { PiggyBank, Trash2, Trophy } from 'lucide-react';
import { useFinance } from '../../context/FinanceContext';
import { GOAL_STATUS } from '../../lib/constants';
import { formatShortDate } from '../../lib/dates';
import { goalProgress, projectGoal } from '../../lib/goals';
import Button from '../ui/Button';
import Card from '../ui/Card';
import IconButton from '../ui/IconButton';
import Money from '../ui/Money';
import ProgressBar from '../ui/ProgressBar';

function projectionText(goal, projection) {
  switch (projection.status) {
    case GOAL_STATUS.reached: return { text: 'Objectif atteint, bravo !', tone: 'text-mint' };
    case GOAL_STATUS.unknown: return { text: 'Ajoutez une contribution pour estimer la date d’atteinte.', tone: 'text-muted' };
    case GOAL_STATUS.onTrack: return { text: `Au rythme actuel : atteint vers le ${formatShortDate(projection.date)}, dans les temps.`, tone: 'text-mint' };
    default: return { text: `Au rythme actuel : ${formatShortDate(projection.date)}, après l’échéance du ${formatShortDate(goal.deadline)}.`, tone: 'text-warn' };
  }
}

export default function GoalCard({ goal, onContribute, onDelete }) {
  const { now } = useFinance();
  const percent = goalProgress(goal);
  const projection = projectGoal(goal, now);
  const { text, tone } = projectionText(goal, projection);
  const reached = projection.status === GOAL_STATUS.reached;

  return (
    <Card className="space-y-4">
      <div className="flex items-start justify-between gap-3">
        <div className="flex items-center gap-3">
          <span className="flex h-11 w-11 items-center justify-center rounded-2xl bg-sky/15 text-sky">
            {reached ? <Trophy className="h-5 w-5" aria-hidden="true" /> : <PiggyBank className="h-5 w-5" aria-hidden="true" />}
          </span>
          <div>
            <h3 className="font-semibold">{goal.name}</h3>
            <p className="text-xs text-muted">Échéance : {formatShortDate(goal.deadline)}</p>
          </div>
        </div>
        <IconButton icon={Trash2} label={`Supprimer l’objectif ${goal.name}`} onClick={() => onDelete(goal)} className="-mr-2 hover:text-coral" />
      </div>
      <div>
        <div className="mb-2 flex items-baseline justify-between text-sm">
          <p><Money amount={goal.saved} className="text-lg font-bold" /> <span className="text-muted">sur <Money amount={goal.target} /></span></p>
          <p className="font-semibold text-mint">{Math.round(percent)} %</p>
        </div>
        <ProgressBar label={`Progression de ${goal.name}`} percent={percent} />
      </div>
      <p className={`text-xs font-medium ${tone}`}>{text}</p>
      <Button variant="soft" onClick={() => onContribute(goal)} disabled={reached} className="w-full">
        {reached ? 'Objectif atteint' : 'Contribuer'}
      </Button>
    </Card>
  );
}
