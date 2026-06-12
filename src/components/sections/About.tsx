import { motion, useInView, useReducedMotion } from 'motion/react';
import { useRef } from 'react';
import { skills, type Skill } from '../../data/skills';

function SkillTile({ skill, index }: { skill: Skill; index: number }) {
  const shouldReduce = useReducedMotion();
  const bgColor = skill.color + '18';

  return (
    <motion.div
      initial={{ opacity: 0, scale: shouldReduce ? 1 : 0.85 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.25, delay: index * 0.02, ease: 'easeOut' }}
      className="group relative flex items-center justify-center rounded-xl border border-[var(--color-border)] hover:border-[var(--color-accent)]/40 hover:shadow-md transition-all duration-200 cursor-default overflow-hidden aspect-square"
      style={{ backgroundColor: bgColor }}
    >
      {/* Icon — visible by default, fades out on hover */}
      <span
        className={[
          'absolute inset-0 flex items-center justify-center transition-opacity duration-200',
          'opacity-100 group-hover:opacity-0',
          skill.invertDark ? 'icon-invert' : '',
        ].join(' ')}
      >
        {skill.icon}
      </span>

      {/* Label — hidden by default, fades in on hover */}
      <span
        className="absolute inset-0 flex items-center justify-center px-1 opacity-0 group-hover:opacity-100 transition-opacity duration-200"
        style={{ color: skill.invertDark ? 'var(--color-text)' : skill.color }}
      >
        <span className="text-sm font-bold text-center leading-tight line-clamp-2">
          {skill.name}
        </span>
      </span>
    </motion.div>
  );
}

export function About() {
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-80px' });

  return (
    <section id="about" ref={ref} className="px-6 py-24 max-w-5xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.5, ease: 'easeOut' }}
      >
        <p className="text-sm font-mono text-[var(--color-accent)] mb-3 tracking-wide">About</p>
        <h2 className="font-display text-3xl font-semibold text-[var(--color-text)] mb-8">
          Engineering with intention.
        </h2>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.5, delay: 0.1, ease: 'easeOut' }}
        className="space-y-4 text-[var(--color-muted)] leading-relaxed mb-12"
      >
        <p>
          I'm a full-stack and mobile engineer based in the Philippines. I've spent the last few
          years building web apps and mobile products — from initial design systems to production
          infrastructure — with a focus on the details that make things genuinely pleasant to use.
        </p>
        <p>
          I'm drawn to work where design and engineering overlap. I care about things like transition
          timing, focus management, and whether a form error is actually helpful. Not because
          perfection is the goal, but because users notice when something feels right.
        </p>
        <p>
          Outside of work I'm usually exploring new dev tooling, reading about type design, or
          building small tools to scratch my own itches.
        </p>
      </motion.div>

      <motion.p
        initial={{ opacity: 0, y: 8 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.4, delay: 0.2, ease: 'easeOut' }}
        className="text-xs font-mono font-medium text-[var(--color-accent)] uppercase tracking-wider mb-6"
      >
        Stack &amp; Tools
      </motion.p>

      {isInView && (
        <div className="grid grid-cols-6 sm:grid-cols-8 md:grid-cols-10 lg:grid-cols-12 gap-2">
          {skills.map((skill, i) => (
            <SkillTile key={skill.name} skill={skill} index={i} />
          ))}
        </div>
      )}
    </section>
  );
}
