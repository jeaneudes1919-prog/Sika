import { NavLink } from 'react-router-dom';
import { motion } from 'framer-motion';
import clsx from 'clsx';
import Logo from './Logo';
import ThemeToggle from './ThemeToggle';
import { NAV_ITEMS } from './navItems';

export default function Sidebar() {
  return (
    <aside className="fixed inset-y-0 left-0 z-30 hidden w-64 flex-col justify-between border-r border-line bg-card/60 p-5 backdrop-blur-xl lg:flex">
      <div>
        <Logo />
        <nav aria-label="Navigation principale" className="mt-10 flex flex-col gap-1">
          {NAV_ITEMS.map(({ to, label, icon: Icon }) => (
            <NavLink
              key={to}
              to={to}
              end={to === '/'}
              className={({ isActive }) =>
                clsx('relative flex min-h-[44px] items-center gap-3 rounded-xl px-3.5 text-sm font-medium transition-colors', isActive ? 'text-mint' : 'text-muted hover:text-ink')
              }
            >
              {({ isActive }) => (
                <>
                  {isActive && <motion.span layoutId="nav-pill" className="absolute inset-0 rounded-xl border border-mint/25 bg-mint/10" />}
                  <Icon className="relative h-[18px] w-[18px]" aria-hidden="true" />
                  <span className="relative">{label}</span>
                </>
              )}
            </NavLink>
          ))}
        </nav>
      </div>
      <div className="flex items-center justify-between rounded-2xl border border-line bg-ink/5 p-2 pl-4">
        <span className="text-xs text-muted">Apparence</span>
        <ThemeToggle />
      </div>
    </aside>
  );
}
