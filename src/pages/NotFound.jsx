import { Link } from 'react-router-dom';
import { Compass } from 'lucide-react';
import Button from '../components/ui/Button';

export default function NotFound() {
  return (
    <div className="flex min-h-[60vh] flex-col items-center justify-center text-center">
      <Compass className="mb-4 h-10 w-10 text-muted" aria-hidden="true" />
      <p className="bg-gradient-to-br from-mint to-sky bg-clip-text text-[clamp(5rem,20vw,9rem)] font-extrabold leading-none tracking-tighter text-transparent">404</p>
      <h1 className="mt-4 font-bold">Page introuvable</h1>
      <p className="mt-2 max-w-sm text-sm text-muted">Cette page n’existe pas ou a été déplacée. Revenez à votre tableau de bord.</p>
      <Link to="/" className="mt-6"><Button>Retour à l’accueil</Button></Link>
    </div>
  );
}
