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
    alt: 'Grad Photo!',
    bg: 'bg-[var(--color-surface)]',
  },
  {
    id: 1,
    src: '/assets/1.webp',
    alt: 'Enjoying Nature',
    bg: 'bg-[var(--color-surface)]',
  },
  {
    id: 2,
    src: '/assets/IMG_1567.webp',
    alt: 'Coffee and Chill',
    bg: 'bg-[var(--color-surface)]',
  },
  {
    id: 3,
    src: '/assets/cropped.webp',
    alt: 'Publication adviser',
    bg: 'bg-[var(--color-surface)]',
  },
];

const SLOTS = [
  { x: 0,   y: 0,  rotate: 2,  scale: 1,    zIndex: 4 },
  { x: -14, y: 12, rotate: -4, scale: 0.95, zIndex: 3 },
  { x: 12,  y: 22, rotate: 7,  scale: 0.90, zIndex: 2 },
  { x: -8,  y: 32, rotate: -9, scale: 0.85, zIndex: 1 },
];

export function CardStack() {
  const [order, setOrder] = useState<[number, number, number, number]>([0, 1, 2, 3]);
  const [paused, setPaused] = useState(false);
  const resumeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const shuffle = useCallback(() => {
    setOrder(([a, b, c, d]) => [d, a, b, c]);
  }, []);

  const handleClick = useCallback(() => {
    setPaused(true);
    shuffle();
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
            style={{
              zIndex: slot.zIndex,
              // Theme-aware polaroid frame: uses your surface token with a warm paper nudge
              backgroundColor: 'oklch(97% 0.012 80)',
              boxShadow: isFront
                ? '0 8px 32px -4px rgba(0,0,0,0.30), 0 2px 8px -2px rgba(0,0,0,0.18), inset 0 0 0 1px rgba(0,0,0,0.06)'
                : '0 4px 16px -4px rgba(0,0,0,0.24), inset 0 0 0 1px rgba(0,0,0,0.05)',
            }}
            animate={{
              x: slot.x,
              y: slot.y,
              rotate: slot.rotate,
              scale: slot.scale,
            }}
            transition={{ type: 'spring', stiffness: 260, damping: 28 }}
            className="absolute inset-0 rounded-[3px] overflow-hidden p-[8px] pb-[40px]"
          >
            {/* Photo area with inset shadow for printed-photo feel */}
            <div
              className="relative w-full h-full overflow-hidden rounded-[1px]"
              style={{
                boxShadow: 'inset 0 1px 4px rgba(0,0,0,0.15)',
              }}
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
                <div className={cn('w-full h-full flex items-end p-3', card.bg)}>
                  <span className="text-xs font-mono text-white/30">{card.alt}</span>
                </div>
              )}

              {isFront && (
                <div className="absolute inset-x-0 bottom-0 h-14 bg-gradient-to-t from-black/35 to-transparent" />
              )}
            </div>

            {/* Caption strip — italic mono, like a handwritten polaroid label */}
            <div className="absolute bottom-0 inset-x-0 h-[40px] flex items-center justify-center px-3">
              <span
                className="text-[9px] font-mono italic tracking-wide truncate"
                style={{
                    color: isFront ? 'rgba(40, 30, 20, 0.55)' : 'rgba(40, 30, 20, 0.28)',
                }}
              >
                {card.alt}
              </span>
            </div>
          </motion.div>
        );
      })}

      <p className="absolute -bottom-7 inset-x-0 text-center text-[10px] font-mono text-[var(--color-muted)] select-none">
        {paused ? 'click to shuffle' : 'click to pause'}
      </p>
    </div>
  );
}