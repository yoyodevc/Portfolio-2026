import { useRef } from 'react';
import { motion, useInView } from 'motion/react';
import { ExternalLink, Code2 } from 'lucide-react';
import { Tag } from '../ui/Tag';
import { cn } from '../../lib/utils';
import { featuredProjects } from '../../data/projects';
import type { Project } from '../../data/projects';

const EASE = [0, 0, 0.2, 1] as const;

function ProjectLinks({ project }: { project: Project }) {
  return (
    <div className="flex gap-2 shrink-0">
      {project.links.github && (
        <a
          href={project.links.github}
          aria-label={`${project.title} GitHub repository`}
          className="text-[var(--color-muted)] hover:text-[var(--color-accent)] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-accent)] rounded"
        >
          <Code2 size={16} />
        </a>
      )}
      {project.links.live && (
        <a
          href={project.links.live}
          aria-label={`${project.title} live site`}
          className="text-[var(--color-muted)] hover:text-[var(--color-accent)] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-accent)] rounded"
        >
          <ExternalLink size={16} />
        </a>
      )}
    </div>
  );
}

function BentoCard({
  project,
  large = false,
  className,
}: {
  project: Project;
  large?: boolean;
  className?: string;
}) {
  return (
    <div
      className={cn(
        'group relative flex flex-col rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)] overflow-hidden',
        'transition-all duration-200 hover:border-[var(--color-accent)] hover:shadow-sm',
        className
      )}
    >
      {/* Cover image */}
      <div
        className={cn(
          'w-full bg-[var(--color-border)] overflow-hidden shrink-0',
          large ? 'h-56 md:h-72' : 'h-36 md:h-44'
        )}
      >
        <img
          src={project.cover}
          alt={project.coverAlt ?? project.title}
          width={800}
          height={large ? 288 : 176}
          loading="lazy"
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
      </div>

      {/* Content */}
      <div className="flex flex-col flex-1 p-5">
        <div className="flex items-start justify-between gap-3 mb-2">
          <div>
            <h3
              className={cn(
                'font-display font-semibold text-[var(--color-text)] mb-0.5',
                large ? 'text-xl' : 'text-base'
              )}
            >
              {project.title}
            </h3>
            <p className="text-sm text-[var(--color-muted)]">{project.tagline}</p>
          </div>
          <ProjectLinks project={project} />
        </div>

        {large && (
          <p className="text-sm text-[var(--color-muted)] leading-relaxed mt-2 mb-4">
            {project.description}
          </p>
        )}

        <div className="flex flex-wrap gap-1.5 mt-auto pt-4">
          {project.stack.map((tech: string) => (
            <Tag key={tech}>{tech}</Tag>
          ))}
        </div>
      </div>
    </div>
  );
}

export function Projects() {
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-80px' });

  const hero = featuredProjects.find((p) => p.id === 'pokeclash') ?? featuredProjects[0];
  const rest = featuredProjects.filter((p) => p !== hero);

  return (
    <section id="projects" ref={ref} className="px-6 py-24 max-w-5xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.5, ease: EASE }}
        className="mb-12"
      >
        <p className="text-sm font-mono text-[var(--color-accent)] mb-3 tracking-wide">Projects</p>
        <h2 className="font-display text-3xl font-semibold text-[var(--color-text)]">
          Personal projects.
        </h2>
      </motion.div>

      {/* Bento grid: hero full-width, rest split */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {hero && (
          <motion.div
            className="md:col-span-2"
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.1, ease: EASE }}
          >
            <BentoCard project={hero} large />
          </motion.div>
        )}

        {rest.map((project: Project, i: number) => (
          <motion.div
            key={project.id}
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.2 + i * 0.1, ease: EASE }}
          >
            <BentoCard project={project} className="h-full" />
          </motion.div>
        ))}
      </div>
    </section>
  );
}
