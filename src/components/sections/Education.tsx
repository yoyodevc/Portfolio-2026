import { useRef } from 'react';
import { motion, useInView, useReducedMotion } from 'motion/react';
import { education, type Education as EducationEntry } from '../../data/education';

const EASE = [0, 0, 0.2, 1] as const;

function EducationCard({
  entry,
  index,
  isInView,
}: {
  entry: EducationEntry;
  index: number;
  isInView: boolean;
}) {
  const shouldReduce = useReducedMotion();

  return (
    <motion.div
      initial={{ opacity: 0, y: shouldReduce ? 0 : 16 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, delay: 0.1 + index * 0.1, ease: EASE }}
      className="relative pl-6 before:absolute before:left-0 before:top-2 before:h-full before:w-px before:bg-[var(--color-border)]"
    >
      {/* Timeline dot */}
      <span className="absolute left-[-4px] top-[7px] h-2 w-2 rounded-full bg-[var(--color-accent)]" />

      <div className="flex items-start gap-4 mb-3">
        {/* School logo — replace src in education data once you have the real image */}
        <div className="shrink-0 h-12 w-12 rounded-lg border border-[var(--color-border)] bg-[var(--color-surface)] overflow-hidden flex items-center justify-center">
          {entry.logo ? (
            <img
              src={entry.logo}
              alt={entry.logoAlt ?? entry.institution}
              width={48}
              height={48}
              loading="lazy"
              className="h-full w-full object-contain p-1"
            />
          ) : (
            <span className="text-xs font-mono text-[var(--color-muted)] text-center leading-tight px-1">
              Logo
            </span>
          )}
        </div>

        <div>
          <div className="mb-1 flex flex-wrap items-baseline gap-x-3 gap-y-1">
            <h3 className="font-display font-semibold text-[var(--color-text)]">
              {entry.degree} in {entry.field}
            </h3>
            <span className="text-sm text-[var(--color-accent)] font-medium">
              {entry.institution}
            </span>
          </div>
          <p className="text-xs font-mono text-[var(--color-muted)]">
            {entry.period} · {entry.location}
          </p>
        </div>
      </div>

      <p className="text-sm text-[var(--color-muted)] leading-relaxed mb-4">{entry.description}</p>

      <ul className="space-y-1.5">
        {entry.highlights.map((point) => (
          <li key={point} className="flex gap-2 text-sm text-[var(--color-muted)]">
            <span className="mt-[6px] h-1 w-1 shrink-0 rounded-full bg-[var(--color-accent)]" />
            {point}
          </li>
        ))}
      </ul>
    </motion.div>
  );
}

export function Education() {
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-80px' });

  return (
    <section id="education" ref={ref} className="px-6 py-24 max-w-5xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.5, ease: EASE }}
        className="mb-12"
      >
        <p className="text-sm font-mono text-[var(--color-accent)] mb-3 tracking-wide">
          Education
        </p>
        <h2 className="font-display text-3xl font-semibold text-[var(--color-text)]">
          Academic background.
        </h2>
      </motion.div>

      <div className="space-y-12">
        {education.map((entry, i) => (
          <EducationCard key={entry.id} entry={entry} index={i} isInView={isInView} />
        ))}
      </div>
    </section>
  );
}
