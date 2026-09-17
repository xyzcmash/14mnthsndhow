import { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const SPARKLES = ['🖤', '✨', '💫'];
let idCounter = 0;

export default function CursorTrail() {
  const [points, setPoints] = useState([]);
  const lastSpawn = useRef(0);

  useEffect(() => {
    const isTouch = window.matchMedia('(pointer: coarse)').matches;
    if (isTouch) return;

    const handleMove = (e) => {
      const now = performance.now();
      if (now - lastSpawn.current < 90) return;
      lastSpawn.current = now;

      const id = idCounter++;
      const emoji = SPARKLES[Math.floor(Math.random() * SPARKLES.length)];
      setPoints((prev) => [...prev.slice(-14), { id, x: e.clientX, y: e.clientY, emoji }]);

      setTimeout(() => {
        setPoints((prev) => prev.filter((p) => p.id !== id));
      }, 700);
    };

    window.addEventListener('mousemove', handleMove);
    return () => window.removeEventListener('mousemove', handleMove);
  }, []);

  return (
    <div className="pointer-events-none fixed inset-0 z-[9999] overflow-hidden">
      <AnimatePresence>
        {points.map((p) => (
          <motion.span
            key={p.id}
            className="absolute select-none text-sm"
            style={{ left: p.x, top: p.y }}
            initial={{ opacity: 0.9, scale: 1, x: -8, y: -8 }}
            animate={{ opacity: 0, scale: 0.4, y: -28 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.7, ease: 'easeOut' }}
          >
            {p.emoji}
          </motion.span>
        ))}
      </AnimatePresence>
    </div>
  );
}
