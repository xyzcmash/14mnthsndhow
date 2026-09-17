import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import confetti from 'canvas-confetti';
import { collectHeart, getCollectedHearts } from '../data/hiddenHearts';

export default function HiddenHeart({ id, className = '' }) {
  const [collected, setCollected] = useState(false);
  const [popping, setPopping] = useState(false);

  useEffect(() => {
    setCollected(getCollectedHearts().includes(id));
  }, [id]);

  if (collected) return null;

  const handleClick = () => {
    setPopping(true);
    confetti({
      particleCount: 30,
      spread: 50,
      origin: { y: 0.8 },
      scalar: 0.6,
      colors: ['#e11d48', '#ffffff'],
    });
    setTimeout(() => {
      collectHeart(id);
      setCollected(true);
    }, 350);
  };

  return (
    <AnimatePresence>
      {!collected && (
        <motion.button
          type="button"
          aria-label="a tiny secret heart"
          onClick={handleClick}
          className={`z-20 text-lg opacity-40 transition hover:opacity-90 ${className}`}
          initial={{ opacity: 0 }}
          animate={popping ? { scale: [1, 1.8, 0], opacity: [1, 1, 0] } : { opacity: 0.4 }}
          transition={popping ? { duration: 0.35 } : { duration: 1 }}
          whileHover={{ scale: 1.2 }}
        >
          🖤
        </motion.button>
      )}
    </AnimatePresence>
  );
}
