import { cn } from '../../lib/utils';

type ButtonProps = Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, 'children'> & {
  variant?: 'primary' | 'ghost' | 'outline';
  size?: 'sm' | 'md';
  as?: 'button' | 'a';
  href?: string;
  children?: React.ReactNode;
};

export function Button({
  variant = 'primary',
  size = 'md',
  as: Tag = 'button',
  href,
  className,
  children,
  ...props
}: ButtonProps) {
  const base =
    'inline-flex items-center gap-2 font-medium rounded-full transition-all duration-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 select-none';

  const variants = {
    primary:
      'backdrop-blur-xl bg-[color-mix(in_srgb,var(--color-accent)_80%,transparent)] text-white shadow-[0_4px_20px_color-mix(in_srgb,var(--color-accent)_35%,transparent)] hover:bg-[color-mix(in_srgb,var(--color-accent)_92%,transparent)] hover:shadow-[0_6px_28px_color-mix(in_srgb,var(--color-accent)_50%,transparent)] active:scale-[0.97] focus-visible:outline-[var(--color-accent)]',
    ghost:
      'backdrop-blur-xl bg-white/5 text-[var(--color-text)] hover:bg-white/10 active:scale-[0.97] focus-visible:outline-[var(--color-accent)]',
    outline:
      'backdrop-blur-xl bg-[color-mix(in_srgb,var(--color-surface)_30%,transparent)] text-[var(--color-text)] hover:bg-[color-mix(in_srgb,var(--color-surface)_55%,transparent)] hover:text-[var(--color-accent)] active:scale-[0.97] focus-visible:outline-[var(--color-accent)]',
  };

  const sizes = {
    sm: 'px-4 py-1.5 text-sm',
    md: 'px-6 py-2.5 text-sm',
  };

  if (Tag === 'a') {
    return (
      <a
        href={href}
        className={cn(base, variants[variant], sizes[size], className)}
      >
        {children}
      </a>
    );
  }

  return (
    <button
      className={cn(base, variants[variant], sizes[size], className)}
      {...props}
    >
      {children}
    </button>
  );
}
