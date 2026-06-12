import { useState, useEffect, useCallback, useRef } from 'react';
import { motion } from 'motion/react';
import { cn } from '../../lib/utils';

interface CardData {
  id: number;
  src?: string;
  alt: string;
  bg: string;
}

const CARDS: CardData[] = [
  {
    id: 0,
    src: '/assets/MEITU_20250722_122326242.webp',
    alt: 'John Fredrick — portrait',
    bg: 'bg-[var(--color-surface)]',
  },
  {
    id: 1,
    src: '/assets/1.webp',
    alt: 'John Fredrick',
    bg: 'bg-[var(--color-surface)]',
  },
  {
    id: 2,
    src: '/assets/IMG_1567.webp',
    alt: 'John Fredrick',
    bg: 'bg-[var(--color-surface)]',
  },
  {
    id: 3,
    src: '/assets/cropped.webp',
    alt: 'John Fredrick',
    bg: 'bg-[var(--color-surface)]',
  },
];

// slot 0 = front, slot 1 = mid-front, slot 2 = mid-back, slot 3 = back
const SLOTS = [
  { x: 0,   y: 0,  rotate: 2,  scale: 1,    zIndex: 4 },
  { x: -14, y: 12, rotate: -4, scale: 0.95, zIndex: 3 },
  { x: 12,  y: 22, rotate: 7,  scale: 0.90, zIndex: 2 },
  { x: -8,  y: 32, rotate: -9, scale: 0.85, zIndex: 1 },
];

export function CardStack() {
  // order[cardIndex] = slotIndex — one entry per card
  const [order, setOrder] = useState<[number, number, number, number]>([0, 1, 2, 3]);
  const [paused, setPaused] = useState(false);
  const resumeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const shuffle = useCallback(() => {
    // rotate all four: front card goes to the back, rest move forward
    setOrder(([a, b, c, d]) => [d, a, b, c]);
  }, []);

  const handleClick = useCallback(() => {
    setPaused(true);
    shuffle();

    // resume auto-shuffle 3s after the last click
    if (resumeTimer.current) clearTimeout(resumeTimer.current);
    resumeTimer.current = setTimeout(() => setPaused(false), 3000);
  }, [shuffle]);

  useEffect(() => {
    return () => { if (resumeTimer.current) clearTimeout(resumeTimer.current); };
  }, []);

  useEffect(() => {
    if (paused) return;
    const id = setInterval(shuffle, 2500);
    return () => clearInterval(id);
  }, [shuffle, paused]);

  return (
    <div
      className="relative w-[180px] h-[230px] sm:w-[200px] sm:h-[256px] lg:w-[220px] lg:h-[280px] shrink-0 cursor-pointer"
      onClick={handleClick}
    >
      {CARDS.map((card, i) => {
        const slot = SLOTS[order[i]];
        const isFront = order[i] === 0;

        return (
          <motion.div
            key={card.id}
            style={{ zIndex: slot.zIndex }}
            animate={{
              x: slot.x,
              y: slot.y,
              rotate: slot.rotate,
              scale: slot.scale,
            }}
            transition={{ type: 'spring', stiffness: 260, damping: 28 }}
            className={cn(
              'absolute inset-0 rounded-2xl overflow-hidden',
              'border border-[var(--color-border)] shadow-xl',
              card.bg,
            )}
          >
            {card.src ? (
              <img
                src={card.src}
                alt={card.alt}
                width={440}
                height={560}
                loading={i === 0 ? 'eager' : 'lazy'}
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="w-full h-full flex items-end p-4">
                <span className="text-xs font-mono text-white/30">{card.alt}</span>
              </div>
            )}

            {isFront && (
              <div className="absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-black/40 to-transparent" />
            )}
          </motion.div>
        );
      })}

      <p className="absolute -bottom-7 inset-x-0 text-center text-[10px] font-mono text-[var(--color-muted)] select-none">
        {paused ? 'click to shuffle' : 'click to pause'}
      </p>
    </div>
  );
}