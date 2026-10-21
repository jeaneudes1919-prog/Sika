import { AnimatePresence, motion } from 'framer-motion';
import { Route, Routes, useLocation } from 'react-router-dom';
import AppShell from './components/layout/AppShell';
import ScrollToTop from './components/layout/ScrollToTop';
import Budgets from './pages/Budgets';
import Dashboard from './pages/Dashboard';
import Goals from './pages/Goals';
import NotFound from './pages/NotFound';
import Settings from './pages/Settings';
import Transactions from './pages/Transactions';

export default function App() {
  const location = useLocation();
  return (
    <AppShell>
      <ScrollToTop />
      <AnimatePresence mode="wait">
        <motion.div
          key={location.pathname}
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -8 }}
          transition={{ duration: 0.25 }}
        >
          <Routes location={location}>
            <Route path="/" element={<Dashboard />} />
            <Route path="/transactions" element={<Transactions />} />
            <Route path="/budgets" element={<Budgets />} />
            <Route path="/objectifs" element={<Goals />} />
            <Route path="/parametres" element={<Settings />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </motion.div>
      </AnimatePresence>
    </AppShell>
  );
}
