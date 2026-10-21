import AuroraBackground from './AuroraBackground';
import Logo from './Logo';
import Sidebar from './Sidebar';
import TabBar from './TabBar';
import ThemeToggle from './ThemeToggle';

export default function AppShell({ children }) {
  return (
    <div className="relative min-h-screen">
      <a href="#contenu" className="sr-only z-[70] rounded-lg bg-mint px-4 py-2 font-semibold text-onmint focus:not-sr-only focus:fixed focus:left-4 focus:top-4">
        Aller au contenu
      </a>
      <AuroraBackground />
      <Sidebar />
      <div className="lg:pl-64">
        <header className="flex items-center justify-between px-4 pt-4 sm:px-6 lg:hidden">
          <Logo />
          <ThemeToggle />
        </header>
        <main id="contenu" className="mx-auto w-full max-w-6xl px-4 pb-28 pt-6 sm:px-6 lg:px-8 lg:pb-12 lg:pt-10">
          {children}
        </main>
        <footer className="hidden px-8 pb-6 text-center text-xs text-muted lg:block">
          Sika — vos données restent stockées localement sur cet appareil.
        </footer>
      </div>
      <TabBar />
    </div>
  );
}
