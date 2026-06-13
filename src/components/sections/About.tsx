import { motion, useInView, useReducedMotion } from 'motion/react';
import { useRef, useState } from 'react';
import { ChevronDown } from 'lucide-react';
import { skills, type Skill, type SkillCategory } from '../../data/skills';
import { cn } from '../../lib/utils';

const categoryOrder: SkillCategory[] = [
  'Languages',
  'Frontend',
  'Backend & APIs',
  'Database',
  'Mobile & IoT',
  'Design & Testing',
  'Tools & DevOps',
  'Networking',
];

function SkillChip({ skill }: { skill: Skill }) {
  return (
    <li
      className={cn(
        'flex items-center gap-1.5 rounded-full border py-1 pl-1.5 pr-2.5 transition-colors duration-200 cursor-default',
        skill.primary
          ? 'border-[var(--color-accent)]/40 bg-[var(--color-accent)]/5 text-[var(--color-text)]'
          : 'border-[var(--color-border)] text-[var(--color-muted)] hover:text-[var(--color-text)] hover:border-[var(--color-accent)]/30'
      )}
    >
      <span
        className={cn(
          'block h-4 w-4 shrink-0 [&>img]:h-full [&>img]:w-full',
          skill.invertDark && 'icon-invert'
        )}
      >
        {skill.icon}
      </span>
      <span className={cn('text-xs whitespace-nowrap', skill.primary ? 'font-semibold' : 'font-medium')}>
        {skill.name}
      </span>
    </li>
  );
}

function CategoryRow({ category, items }: { category: SkillCategory; items: Skill[] }) {
  return (
    <div className="grid grid-cols-[8.5rem_1fr] items-baseline gap-4 py-3 border-b border-[var(--color-border)] last:border-b-0">
      <h3 className="text-xs font-mono text-[var(--color-muted)] uppercase tracking-wider">
        {category}
      </h3>
      <ul className="flex flex-wrap gap-1.5">
        {items.map((skill) => (
          <SkillChip key={skill.name} skill={skill} />
        ))}
      </ul>
    </div>
  );
}

function CategoryAccordion({
  category,
  items,
  isOpen,
  onToggle,
}: {
  category: SkillCategory;
  items: Skill[];
  isOpen: boolean;
  onToggle: () => void;
}) {
  return (
    <div className="border-b border-[var(--color-border)] last:border-b-0">
      <button
        type="button"
        onClick={onToggle}
        aria-expanded={isOpen}
        className="flex w-full items-center justify-between py-3 text-left focus-visible:outline-2 focus-visible:outline-[var(--color-accent)] rounded-sm"
      >
        <span className="text-xs font-mono text-[var(--color-muted)] uppercase tracking-wider">
          {category}
          <span className="ml-2 text-[var(--color-muted)]/60 normal-case">{items.length}</span>
        </span>
        <ChevronDown
          size={14}
          className={cn(
            'text-[var(--color-muted)] transition-transform duration-200',
            isOpen && 'rotate-180'
          )}
        />
      </button>
      {isOpen && (
        <ul className="flex flex-wrap gap-1.5 pb-3">
          {items.map((skill) => (
            <SkillChip key={skill.name} skill={skill} />
          ))}
        </ul>
      )}
    </div>
  );
}

function SkillMatrix() {
  const [showAll, setShowAll] = useState(false);
  const [openCategory, setOpenCategory] = useState<SkillCategory | null>('Languages');

  const primarySkills = skills.filter((skill) => skill.primary);
  const categories = categoryOrder
    .map((category) => ({ category, items: skills.filter((skill) => skill.category === category) }))
    .filter(({ items }) => items.length > 0);

  if (!showAll) {
    return (
      <div>
        <ul className="flex flex-wrap gap-1.5 mb-4">
          {primarySkills.map((skill) => (
            <SkillChip key={skill.name} skill={skill} />
          ))}
        </ul>
        <button
          type="button"
          onClick={() => setShowAll(true)}
          className="text-xs font-mono text-[var(--color-accent)] hover:underline focus-visible:outline-2 focus-visible:outline-[var(--color-accent)] rounded-sm"
        >
          Show all {skills.length} tools
        </button>
      </div>
    );
  }

  return (
    <div>
      {/* Desktop: category rows, label left / chips right */}
      <div className="hidden sm:block">
        {categories.map(({ category, items }) => (
          <CategoryRow key={category} category={category} items={items} />
        ))}
      </div>

      {/* Mobile: accordion, one category open at a time */}
      <div className="sm:hidden">
        {categories.map(({ category, items }) => (
          <CategoryAccordion
            key={category}
            category={category}
            items={items}
            isOpen={openCategory === category}
            onToggle={() => setOpenCategory(openCategory === category ? null : category)}
          />
        ))}
      </div>

      <button
        type="button"
        onClick={() => setShowAll(false)}
        className="mt-4 text-xs font-mono text-[var(--color-accent)] hover:underline focus-visible:outline-2 focus-visible:outline-[var(--color-accent)] rounded-sm"
      >
        Show top skills only
      </button>
    </div>
  );
}

export function About() {
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-80px' });
  const shouldReduce = useReducedMotion();

  return (
    <section id="about" ref={ref} className="px-6 py-24 max-w-5xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: shouldReduce ? 0 : 16 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.5, ease: 'easeOut' }}
      >
        <p className="text-sm font-mono text-[var(--color-accent)] mb-3 tracking-wide">About</p>
        <h2 className="font-display text-3xl font-semibold text-[var(--color-text)] mb-8">
          Engineering with intention.
        </h2>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: shouldReduce ? 0 : 16 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.5, delay: 0.1, ease: 'easeOut' }}
        className="space-y-4 text-[var(--color-muted)] leading-relaxed mb-12 text-justify"
      >
        <p>
          I'm an aspiring full-stack developer and college instructor based in the Zamboanga, Philippines. I've taught about
          core subjects regarding programming, databases, and IoT, subjects that keep me grounded in how things actually work
          under the hood. Explaining these concepts to students every day sharpens the way I think and
          build.
        </p>
        <p>
          I'm passionate about transforming complex problems into seamless digital experiences. My
          curiosity about computers and technology goes back further than I can remember, and it still
          drives how I approach every project, from initial design systems to production infrastructure,
          with attention to the details that make things genuinely pleasant to use.
        </p>
        <p>
          I'm drawn to work where design and engineering overlap. I care about things like transition
          timing, focus management, and whether a form error is actually helpful. Not because perfection
          is the goal, but because users notice when something feels right.
        </p>
        <p>
          Outside of work I'm usually exploring new dev tooling, reading about type design, or building
          small tools to scratch my own itches.
        </p>
      </motion.div>

      <motion.p
        initial={{ opacity: 0, y: shouldReduce ? 0 : 8 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.4, delay: 0.2, ease: 'easeOut' }}
        className="text-xs font-mono font-medium text-[var(--color-accent)] uppercase tracking-wider mb-6"
      >
        Stack &amp; Tools
      </motion.p>

      {isInView && <SkillMatrix />}
    </section>
  );
}
