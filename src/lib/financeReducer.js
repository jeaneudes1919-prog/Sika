export const ACTIONS = {
  ADD_TX: 'tx/add',
  UPDATE_TX: 'tx/update',
  REMOVE_TX: 'tx/remove',
  SET_BUDGET: 'budget/set',
  REMOVE_BUDGET: 'budget/remove',
  ADD_GOAL: 'goal/add',
  CONTRIBUTE: 'goal/contribute',
  REMOVE_GOAL: 'goal/remove',
  SET_CURRENCY: 'settings/currency',
  RESET: 'reset',
};

export function financeReducer(state, { type, payload }) {
  switch (type) {
    case ACTIONS.ADD_TX:
      return { ...state, transactions: [payload, ...state.transactions] };
    case ACTIONS.UPDATE_TX:
      return { ...state, transactions: state.transactions.map((t) => (t.id === payload.id ? payload : t)) };
    case ACTIONS.REMOVE_TX:
      return { ...state, transactions: state.transactions.filter((t) => t.id !== payload) };
    case ACTIONS.SET_BUDGET:
      return { ...state, budgets: { ...state.budgets, [payload.categoryId]: payload.amount } };
    case ACTIONS.REMOVE_BUDGET:
      return { ...state, budgets: Object.fromEntries(Object.entries(state.budgets).filter(([id]) => id !== payload)) };
    case ACTIONS.ADD_GOAL:
      return { ...state, goals: [payload, ...state.goals] };
    case ACTIONS.CONTRIBUTE:
      return {
        ...state,
        goals: state.goals.map((g) => (g.id === payload.id ? { ...g, saved: g.saved + payload.amount } : g)),
      };
    case ACTIONS.REMOVE_GOAL:
      return { ...state, goals: state.goals.filter((g) => g.id !== payload) };
    case ACTIONS.SET_CURRENCY:
      return { ...state, settings: { ...state.settings, currency: payload } };
    case ACTIONS.RESET:
      return payload;
    default:
      return state;
  }
}
