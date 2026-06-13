import { useRef, useEffect } from 'react';
import { motion, useReducedMotion } from 'motion/react';
import { ArrowRight } from 'lucide-react';
import { Button } from '../ui/Button';
import { CardStack } from '../ui/CardStack';

const ease = [0, 0, 0.2, 1] as const;

function fadeUp(delay: number) {
  return {
    initial: { opacity: 0, y: 16 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.5, delay, ease },
  } as const;
}

export function Hero() {
  const sectionRef = useRef<HTMLElement>(null);
  const shouldReduceMotion = useReducedMotion();

  useEffect(() => {
    if (shouldReduceMotion) return;
    let frame = 0;
    function handleMouseMove(e: MouseEvent) {
      // Coalesce style writes to one per frame
      if (frame) return;
      frame = requestAnimationFrame(() => {
        document.documentElement.style.setProperty('--glow-x', `${e.clientX}px`);
        document.documentElement.style.setProperty('--glow-y', `${e.clientY}px`);
        frame = 0;
      });
    }
    window.addEventListener('mousemove', handleMouseMove);
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      if (frame) cancelAnimationFrame(frame);
    };
  }, [shouldReduceMotion]);

  return (
    <section
      ref={sectionRef}
      className="hero-glow relative z-10 min-h-screen flex flex-col justify-center px-6 py-20 sm:py-24 lg:py-32 max-w-5xl mx-auto"
    >
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-10 sm:gap-18 lg:gap-16">
        <div className="flex flex-col">
          <motion.p {...fadeUp(0)} className="text-sm font-mono text-[var(--color-accent)] mb-4 tracking-wide">
            Hello, I'm
          </motion.p>

          <motion.h1
            {...fadeUp(0.1)}
            className="font-display text-[clamp(2.5rem,8vw,4.5rem)] font-bold leading-[1.05] tracking-tight text-[var(--color-text)] mb-6"
          >
            John Fredrick
            <br />
            <span className="text-[var(--color-accent)]">N. Lim.</span>
          </motion.h1>

          <motion.p
            {...fadeUp(0.2)}
            className="text-lg text-[var(--color-muted)] max-w-xl leading-relaxed mb-10"
          >
            Educator and tech enthusiast who loves learning and building things. 
            I teach by day and explore web and mobile development by curiosity, 
            chasing better tools, better craft, and experiences worth caring about. 
            I believe the best builders never stop being students, and the best teachers never stop building.
          </motion.p>

          <motion.div {...fadeUp(0.3)} className="flex flex-wrap gap-3">
            <Button as="a" href="#projects" variant="primary" className="justify-center min-w-36">
              View my work <ArrowRight size={16} />
            </Button>
            <Button
              as="a"
              href="#contact"
              variant="outline"
              className="justify-center min-w-36 bg-black/5 hover:bg-black/10 [[data-theme=dark]_&]:bg-white/10 [[data-theme=dark]_&]:hover:bg-white/20 backdrop-blur-xs transition-colors"
            >
              Get in touch
            </Button>
          </motion.div>
        </div>

        <motion.div {...fadeUp(0.4)} className="flex justify-center lg:justify-end lg:pr-12 pb-8">
          <CardStack />
        </motion.div>
      </div>
    </section>
  );
}
