import { useState, useEffect } from 'react';
import { Sun, Moon } from 'lucide-react';
import { cn } from '../../lib/utils';

const navLinks = [
  { label: 'About', href: '#about' },
  { label: 'Experience', href: '#experience' },
  { label: 'Projects', href: '#projects' },
  { label: 'Education', href: '#education' },
  { label: 'Contact', href: '#contact' },
];

export function Nav() {
  const [theme, setTheme] = useState<'light' | 'dark'>(() => {
    const stored = localStorage.getItem('theme');
    if (stored === 'light' || stored === 'dark') return stored;
    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  });
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);
  }, [theme]);

  useEffect(() => {
    function onScroll() {
      setScrolled(window.scrollY > 24);
    }
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  function toggleTheme() {
    setTheme((t) => (t === 'dark' ? 'light' : 'dark'));
  }

  const isDark = theme === 'dark';

  const themeToggle = (
    <button
      onClick={toggleTheme}
      aria-label={`Switch to ${isDark ? 'light' : 'dark'} mode`}
      role="switch"
      aria-checked={isDark}
      className="flex items-center gap-2"
    >
      <Sun
        size={13}
        className={cn(
          'transition-colors duration-200',
          isDark ? 'text-[var(--color-muted)]' : 'text-[var(--color-accent)]',
        )}
      />
      <span
        className={cn(
          'relative inline-flex h-[22px] w-[38px] shrink-0 rounded-full',
          'transition-colors duration-300 ease-in-out',
          isDark
            ? 'bg-[var(--color-accent)]'
            : 'bg-[color-mix(in_srgb,var(--color-text)_20%,transparent)]',
        )}
      >
        <span
          className={cn(
            'pointer-events-none absolute top-[2px] left-[2px] h-[18px] w-[18px] rounded-full bg-white shadow-md',
            'transition-transform duration-300 ease-in-out',
            isDark ? 'translate-x-[16px]' : 'translate-x-0',
          )}
        />
      </span>
      <Moon
        size={13}
        className={cn(
          'transition-colors duration-200',
          isDark ? 'text-[var(--color-accent)]' : 'text-[var(--color-muted)]',
        )}
      />
    </button>
  );

  return (
    <header
      className={cn(
        'fixed top-0 left-0 right-0 z-50 transition-all duration-500',
        scrolled &&
          'backdrop-blur-2xl backdrop-saturate-200 bg-[color-mix(in_srgb,var(--color-bg)_60%,transparent)]',
      )}
    >
      <div className="max-w-5xl mx-auto flex items-center justify-between px-6 py-4">
        <a
          href="#"
          className="font-display font-bold text-[var(--color-text)] hover:text-[var(--color-accent)] transition-colors text-sm tracking-tight"
        >
          JFL
        </a>

        {/* Desktop nav */}
        <nav className="hidden sm:flex items-center gap-6">
          {navLinks.map(({ label, href }) => (
            <a
              key={label}
              href={href}
              className="text-sm font-medium text-[var(--color-text)] hover:text-[var(--color-accent)] transition-colors"
            >
              {label}
            </a>
          ))}
          {themeToggle}
        </nav>

        {/* Mobile: theme toggle only */}
        <div className="flex sm:hidden items-center">
          {themeToggle}
        </div>
      </div>
    </header>
  );
}
