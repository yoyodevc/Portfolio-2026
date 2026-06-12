import { useRef } from 'react';
import { motion, useInView, useReducedMotion } from 'motion/react';
import { Tag } from '../ui/Tag';
import { experience, type WorkExperience } from '../../data/experience';

const EASE = [0, 0, 0.2, 1] as const;

function ExperienceCard({
  job,
  index,
  isInView,
}: {
  job: WorkExperience;
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

      <div className="mb-1 flex flex-wrap items-baseline gap-x-3 gap-y-1">
        <h3 className="font-display font-semibold text-[var(--color-text)]">{job.role}</h3>
        <span className="text-sm text-[var(--color-accent)] font-medium">{job.company}</span>
      </div>

      <p className="text-xs font-mono text-[var(--color-muted)] mb-3">
        {job.period} · {job.location}
      </p>

      <p className="text-sm text-[var(--color-muted)] leading-relaxed mb-4">{job.description}</p>

      <ul className="space-y-1.5 mb-4">
        {job.highlights.map((point) => (
          <li key={point} className="flex gap-2 text-sm text-[var(--color-muted)]">
            <span className="mt-[6px] h-1 w-1 shrink-0 rounded-full bg-[var(--color-accent)]" />
            {point}
          </li>
        ))}
      </ul>

      <div className="flex flex-wrap gap-1.5">
        {job.stack.map((tech) => (
          <Tag key={tech}>{tech}</Tag>
        ))}
      </div>
    </motion.div>
  );
}

export function Experience() {
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-80px' });

  return (
    <section id="experience" ref={ref} className="px-6 py-24 max-w-5xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.5, ease: EASE }}
        className="mb-12"
      >
        <p className="text-sm font-mono text-[var(--color-accent)] mb-3 tracking-wide">
          Experience
        </p>
        <h2 className="font-display text-3xl font-semibold text-[var(--color-text)]">
          Where I've worked.
        </h2>
      </motion.div>

      <div className="space-y-12">
        {experience.map((job, i) => (
          <ExperienceCard key={job.id} job={job} index={i} isInView={isInView} />
        ))}
      </div>
    </section>
  );
}
