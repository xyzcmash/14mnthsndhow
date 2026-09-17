import { useMemo } from 'react';
import { motion } from 'framer-motion';

const EMOJIS = ['🖤', '🤍', '✨', '💫'];

export default function FloatingHearts({ count = 18 }) {
  const items = useMemo(
    () =>
      Array.from({ length: count }, (_, i) => ({
        id: i,
        left: Math.random() * 100,
        size: 14 + Math.random() * 20,
        duration: 10 + Math.random() * 12,
        delay: Math.random() * 10,
        emoji: EMOJIS[Math.floor(Math.random() * EMOJIS.length)],
        drift: (Math.random() - 0.5) * 120,
      })),
    [count]
  );

  return (
    <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden">
      {items.map((item) => (
        <motion.span
          key={item.id}
          className="absolute select-none opacity-70"
          style={{ left: `${item.left}%`, fontSize: item.size, bottom: -40 }}
          initial={{ y: 0, x: 0, opacity: 0 }}
          animate={{ y: '-110vh', x: item.drift, opacity: [0, 0.8, 0.8, 0] }}
          transition={{
            duration: item.duration,
            delay: item.delay,
            repeat: Infinity,
            ease: 'linear',
          }}
        >
          {item.emoji}
        </motion.span>
      ))}
    </div>
  );
}
