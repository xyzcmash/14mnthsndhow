import { useState } from 'react';
import { motion } from 'framer-motion';
import confetti from 'canvas-confetti';

const stripes =
  'repeating-linear-gradient(90deg, rgba(0,0,0,0.35) 0px, rgba(0,0,0,0.35) 14px, transparent 14px, transparent 28px)';

export default function CurtainReveal({ children }) {
  const [opened, setOpened] = useState(false);

  const fireConfetti = () => {
    setOpened(true);
    confetti({
      particleCount: 160,
      spread: 130,
      origin: { y: 0.35 },
      colors: ['#e11d48', '#fbbf24', '#ffffff'],
    });
    confetti({
      particleCount: 80,
      angle: 60,
      spread: 70,
      origin: { x: 0, y: 0.4 },
      colors: ['#e11d48', '#fbbf24'],
    });
    confetti({
      particleCount: 80,
      angle: 120,
      spread: 70,
      origin: { x: 1, y: 0.4 },
      colors: ['#e11d48', '#fbbf24'],
    });
  };

  return (
    <div className="relative">
      {children}

      <motion.div
        aria-hidden
        initial={{ x: '0%' }}
        animate={{ x: '-100%' }}
        transition={{ duration: 1.1, delay: 0.6, ease: [0.65, 0, 0.35, 1] }}
        style={{ pointerEvents: opened ? 'none' : 'auto', backgroundImage: stripes }}
        className="fixed inset-y-0 left-0 z-[500] w-1/2 bg-gradient-to-r from-rose-950 via-rose-900 to-rose-800 shadow-[inset_-20px_0_40px_rgba(0,0,0,0.6)]"
      >
        <div className="absolute inset-y-0 right-0 w-3 bg-gradient-to-b from-amber-400 via-amber-300 to-amber-500" />
        <div className="absolute inset-x-0 top-0 h-3 bg-gradient-to-r from-amber-500 to-amber-300" />
      </motion.div>

      <motion.div
        aria-hidden
        initial={{ x: '0%' }}
        animate={{ x: '100%' }}
        onAnimationComplete={fireConfetti}
        transition={{ duration: 1.1, delay: 0.6, ease: [0.65, 0, 0.35, 1] }}
        style={{ pointerEvents: opened ? 'none' : 'auto', backgroundImage: stripes }}
        className="fixed inset-y-0 right-0 z-[500] w-1/2 bg-gradient-to-l from-rose-950 via-rose-900 to-rose-800 shadow-[inset_20px_0_40px_rgba(0,0,0,0.6)]"
      >
        <div className="absolute inset-y-0 left-0 w-3 bg-gradient-to-b from-amber-400 via-amber-300 to-amber-500" />
        <div className="absolute inset-x-0 top-0 h-3 bg-gradient-to-r from-amber-300 to-amber-500" />
      </motion.div>

      {!opened && (
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: [0, 1, 1, 0] }}
          transition={{ duration: 1.6, times: [0, 0.3, 0.7, 1] }}
          className="pointer-events-none fixed inset-0 z-[600] flex items-center justify-center font-dancing text-3xl text-amber-200 sm:text-4xl"
        >
          for ashu, with love
        </motion.p>
      )}
    </div>
  );
}
