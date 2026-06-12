import { cn } from '../../lib/utils';

type CardProps = {
  children: React.ReactNode;
  className?: string;
  hover?: boolean;
};

export function Card({ children, className, hover = false }: CardProps) {
  return (
    <div
      className={cn(
        'rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)] p-6',
        hover && 'transition-all duration-200 hover:border-[var(--color-accent)] hover:shadow-sm',
        className
      )}
    >
      {children}
    </div>
  );
}
