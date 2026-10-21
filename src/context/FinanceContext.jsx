import { createContext, useContext, useEffect, useMemo, useReducer, useState } from 'react';
import { generateDemoData } from '../data/demo';
import { ACTIONS, financeReducer } from '../lib/financeReducer';
import { CURRENCY, LOADING_DELAY_MS, STORAGE_KEYS } from '../lib/constants';
import { readJSON, writeJSON } from '../lib/storage';

const FinanceContext = createContext(null);

function loadInitialState() {
  const saved = readJSON(STORAGE_KEYS.data, null);
  if (!saved || !Array.isArray(saved.transactions)) return generateDemoData();
  return {
    transactions: saved.transactions,
    budgets: saved.budgets ?? {},
    goals: saved.goals ?? [],
    settings: { currency: CURRENCY.XOF, ...saved.settings },
  };
}

export function FinanceProvider({ children }) {
  const [state, dispatch] = useReducer(financeReducer, null, loadInitialState);
  const [loading, setLoading] = useState(true);
  const [now] = useState(() => new Date());

  useEffect(() => {
    const id = setTimeout(() => setLoading(false), LOADING_DELAY_MS);
    return () => clearTimeout(id);
  }, []);

  useEffect(() => {
    writeJSON(STORAGE_KEYS.data, state);
  }, [state]);

  const value = useMemo(
    () => ({
      ...state,
      currency: state.settings.currency,
      loading,
      now,
      dispatch,
      resetDemo: () => dispatch({ type: ACTIONS.RESET, payload: generateDemoData(new Date()) }),
    }),
    [state, loading, now],
  );

  return <FinanceContext.Provider value={value}>{children}</FinanceContext.Provider>;
}

export function useFinance() {
  const ctx = useContext(FinanceContext);
  if (!ctx) throw new Error('useFinance doit être utilisé dans un FinanceProvider');
  return ctx;
}
