import { cn } from '../../lib/utils';

type TagProps = {
  children: React.ReactNode;
  className?: string;
};

export function Tag({ children, className }: TagProps) {
  return (
    <span
      className={cn(
        'inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-mono font-medium',
        'bg-[var(--color-accent-tint)] text-[var(--color-accent)]',
        className
      )}
    >
      {children}
    </span>
  );
}
