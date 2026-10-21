import { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react';
import { STORAGE_KEYS, THEME } from '../lib/constants';
import { readJSON, writeJSON } from '../lib/storage';

const ThemeContext = createContext(null);

export function ThemeProvider({ children }) {
  const [theme, setTheme] = useState(() => (readJSON(STORAGE_KEYS.theme, THEME.dark) === THEME.light ? THEME.light : THEME.dark));

  useEffect(() => {
    document.documentElement.classList.toggle('dark', theme === THEME.dark);
    writeJSON(STORAGE_KEYS.theme, theme);
  }, [theme]);

  const toggle = useCallback(() => setTheme((t) => (t === THEME.dark ? THEME.light : THEME.dark)), []);
  const value = useMemo(() => ({ theme, setTheme, toggle }), [theme, toggle]);
  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
}

export function useTheme() {
  const ctx = useContext(ThemeContext);
  if (!ctx) throw new Error('useTheme doit être utilisé dans un ThemeProvider');
  return ctx;
}
