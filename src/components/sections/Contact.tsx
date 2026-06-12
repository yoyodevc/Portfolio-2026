import { useRef, useState } from 'react';
import { motion, useInView } from 'motion/react';
import { Mail, Code2, Briefcase } from 'lucide-react';
import { Button } from '../ui/Button';
import { ContactModal } from '../ui/ContactModal';

const links = [
  {
    label: 'GitHub',
    href: 'https://github.com/yoyodevc',
    icon: Code2,
    description: 'My GitHub',
  },
  {
    label: 'LinkedIn',
    href: 'https://www.linkedin.com/in/johnfredricklim/',
    icon: Briefcase,
    description: 'My LinkedIn',
  },
];

export function Contact() {
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-80px' });
  const [modalOpen, setModalOpen] = useState(false);

  return (
    <>
      <section id="contact" ref={ref} className="px-6 py-24 max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, ease: 'easeOut' }}
          className="max-w-xl"
        >
          <p className="text-sm font-mono text-[var(--color-accent)] mb-3 tracking-wide">Contact</p>
          <h2 className="font-display text-3xl font-semibold text-[var(--color-text)] mb-4">
            {"Let's work together."}
          </h2>
          <p className="text-[var(--color-muted)] leading-relaxed mb-8">
            {"I'm open to full-time roles, freelance projects, and interesting collaborations."}
            {' If you have something worth building, I\'d like to hear about it.'}
          </p>

          <div className="relative mb-10 w-fit">
            <Button variant="primary" onClick={() => setModalOpen(true)}>
              <Mail size={16} />
              Email me
            </Button>
            {/* Blinking red dot — sits on top-right edge of button */}
            <span className="pointer-events-none absolute top-0.5 right-0.5 z-10 flex h-2.5 w-2.5">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-red-500 opacity-75" />
              <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-red-500" />
            </span>
          </div>

          <div className="flex flex-wrap gap-3">
            {links.map(({ label, href, icon: Icon, description }) => (
              <a
                key={label}
                href={href}
                aria-label={label}
                className="group inline-flex items-center gap-2 font-medium rounded-full px-6 py-2.5 text-sm backdrop-blur-xl bg-black/5 hover:bg-black/10 [[data-theme=dark]_&]:bg-white/10 [[data-theme=dark]_&]:hover:bg-white/20 text-[var(--color-text)] hover:text-[var(--color-accent)] active:scale-[0.97] transition-all duration-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--color-accent)] select-none"
              >
                <Icon size={16} className="shrink-0" />
                <span>{description}</span>
              </a>
            ))}
          </div>
        </motion.div>
      </section>

      <ContactModal isOpen={modalOpen} onClose={() => setModalOpen(false)} />
    </>
  );
}
