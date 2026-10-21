import { createContext, useCallback, useContext, useMemo, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { CheckCircle2, X } from 'lucide-react';
import { TOAST_DURATION_MS } from '../lib/constants';
import { createId } from '../lib/id';

const ToastContext = createContext(null);

export function ToastProvider({ children }) {
  const [toasts, setToasts] = useState([]);

  const dismiss = useCallback((id) => setToasts((list) => list.filter((t) => t.id !== id)), []);
  const push = useCallback(
    (message, action) => {
      const id = createId();
      setToasts((list) => [...list, { id, message, action }]);
      setTimeout(() => dismiss(id), TOAST_DURATION_MS);
    },
    [dismiss],
  );
  const value = useMemo(() => ({ push }), [push]);

  return (
    <ToastContext.Provider value={value}>
      {children}
      <div aria-live="polite" className="pointer-events-none fixed inset-x-0 bottom-24 z-[60] flex flex-col items-center gap-2 px-4 lg:bottom-6">
        <AnimatePresence>
          {toasts.map((toast) => (
            <motion.div
              key={toast.id}
              layout
              initial={{ opacity: 0, y: 20, scale: 0.96 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="pointer-events-auto flex w-full max-w-md items-center gap-3 rounded-2xl border border-line bg-card/95 px-4 py-3 shadow-pop backdrop-blur-xl"
            >
              <CheckCircle2 className="h-5 w-5 shrink-0 text-mint" aria-hidden="true" />
              <p className="flex-1 text-sm font-medium">{toast.message}</p>
              {toast.action && (
                <button
                  type="button"
                  onClick={() => { toast.action.onClick(); dismiss(toast.id); }}
                  className="min-h-[44px] rounded-lg px-3 text-sm font-semibold text-mint hover:bg-mint/10"
                >
                  {toast.action.label}
                </button>
              )}
              <button type="button" aria-label="Fermer la notification" onClick={() => dismiss(toast.id)} className="flex h-11 w-11 items-center justify-center rounded-lg text-muted hover:text-ink">
                <X className="h-4 w-4" />
              </button>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </ToastContext.Provider>
  );
}

export function useToast() {
  const ctx = useContext(ToastContext);
  if (!ctx) throw new Error('useToast doit être utilisé dans un ToastProvider');
  return ctx;
}
