import { Moon, Sun } from 'lucide-react';
import { useTheme } from '../../context/ThemeContext';
import { THEME } from '../../lib/constants';
import IconButton from '../ui/IconButton';

export default function ThemeToggle() {
  const { theme, toggle } = useTheme();
  const isDark = theme === THEME.dark;
  return <IconButton icon={isDark ? Sun : Moon} label={isDark ? 'Passer au thème clair' : 'Passer au thème sombre'} onClick={toggle} />;
}
