import { LayoutDashboard, ArrowLeftRight, PiggyBank, Target, Settings } from 'lucide-react';

export const NAV_ITEMS = [
  { to: '/', label: 'Accueil', icon: LayoutDashboard },
  { to: '/transactions', label: 'Transactions', icon: ArrowLeftRight },
  { to: '/budgets', label: 'Budgets', icon: PiggyBank },
  { to: '/objectifs', label: 'Objectifs', icon: Target },
  { to: '/parametres', label: 'Réglages', icon: Settings },
];
