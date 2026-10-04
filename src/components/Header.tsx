import { useEffect } from 'react';
import { IconSun, IconMoon, IconLogo } from './Icons';

interface Props {
  theme: 'light' | 'dark';
  onToggleTheme: () => void;
}

export default function Header({ theme, onToggleTheme }: Props) {
  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
  }, [theme]);

  return (
    <header className="app-header">
      <div className="header-left">
        <h1 className="logo">
          <IconLogo /> QR Craft
        </h1>
        <p className="tagline">Generate & style beautiful QR codes</p>
      </div>
      <button
        className="theme-toggle"
        onClick={onToggleTheme}
        aria-label={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
        title={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
      >
        {theme === 'light' ? <IconMoon /> : <IconSun />}
      </button>
    </header>
  );
}
