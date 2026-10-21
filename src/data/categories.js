import {
  Home, Utensils, Bus, Gamepad2, Tv, HeartPulse, ShoppingBag, GraduationCap, Wallet, Laptop, Gift,
} from 'lucide-react';
import { TX_TYPE } from '../lib/constants';

export const CATEGORIES = [
  { id: 'logement', label: 'Logement', type: TX_TYPE.expense, icon: Home, color: '#60A5FA' },
  { id: 'nourriture', label: 'Nourriture', type: TX_TYPE.expense, icon: Utensils, color: '#FBBF24' },
  { id: 'transport', label: 'Transport', type: TX_TYPE.expense, icon: Bus, color: '#A78BFA' },
  { id: 'loisirs', label: 'Loisirs', type: TX_TYPE.expense, icon: Gamepad2, color: '#F472B6' },
  { id: 'abonnements', label: 'Abonnements', type: TX_TYPE.expense, icon: Tv, color: '#22D3EE' },
  { id: 'sante', label: 'Santé', type: TX_TYPE.expense, icon: HeartPulse, color: '#FB7185' },
  { id: 'shopping', label: 'Shopping', type: TX_TYPE.expense, icon: ShoppingBag, color: '#FB923C' },
  { id: 'education', label: 'Éducation', type: TX_TYPE.expense, icon: GraduationCap, color: '#A3E635' },
  { id: 'salaire', label: 'Salaire', type: TX_TYPE.income, icon: Wallet, color: '#2DD4A0' },
  { id: 'freelance', label: 'Freelance', type: TX_TYPE.income, icon: Laptop, color: '#34D399' },
  { id: 'autres-revenus', label: 'Autres revenus', type: TX_TYPE.income, icon: Gift, color: '#5EEAD4' },
];

export const EXPENSE_CATEGORIES = CATEGORIES.filter((c) => c.type === TX_TYPE.expense);
export const INCOME_CATEGORIES = CATEGORIES.filter((c) => c.type === TX_TYPE.income);
export const getCategory = (id) => CATEGORIES.find((c) => c.id === id);
export const categoriesForType = (type) => (type === TX_TYPE.income ? INCOME_CATEGORIES : EXPENSE_CATEGORIES);
