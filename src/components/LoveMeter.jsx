import { useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import confetti from 'canvas-confetti';

export default function LoveMeter() {
  const [phase, setPhase] = useState('idle');
  const [count, setCount] = useState(0);
  const intervalRef = useRef(null);

  const start = () => {
    if (phase === 'counting' || phase === 'done') return;
    setPhase('counting');
    setCount(0);

    let value = 0;
    intervalRef.current = setInterval(() => {
      value += Math.floor(Math.random() * 400) + 100;
      setCount(value);
    }, 40);

    setTimeout(() => {
      clearInterval(intervalRef.current);
      setPhase('done');
      confetti({
        particleCount: 160,
        spread: 100,
        origin: { y: 0.6 },
        colors: ['#e11d48', '#ffffff', '#fbbf24'],
      });
    }, 1600);
  };

  const reset = () => {
    setPhase('idle');
    setCount(0);
  };

  return (
    <section className="relative z-10 mx-auto max-w-xl px-6 pb-24 text-center">
      <h2 className="font-caveat text-4xl text-rose-400">how much do i love you?</h2>
      <p className="mt-2 font-quicksand text-sm text-neutral-500">be honest, you already know. tap anyway.</p>

      <div className="mt-8 flex h-28 items-center justify-center">
        <AnimatePresence mode="wait">
          {phase === 'idle' && (
            <motion.button
              key="btn"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={start}
              className="rounded-full bg-rose-600 px-8 py-3 font-quicksand font-semibold text-white shadow-[0_0_25px_rgba(225,29,72,0.4)] transition hover:bg-rose-500"
            >
              find out 🖤
            </motion.button>
          )}

          {phase === 'counting' && (
            <motion.div
              key="counting"
              className="font-quicksand text-5xl font-bold tabular-nums text-rose-400"
            >
              {count.toLocaleString()}%
            </motion.div>
          )}

          {phase === 'done' && (
            <motion.button
              key="done"
              onClick={reset}
              initial={{ opacity: 0, scale: 0.5, rotate: -10 }}
              animate={{ opacity: 1, scale: 1, rotate: 0 }}
              transition={{ type: 'spring', stiffness: 200, damping: 12 }}
              className="font-dancing text-7xl text-rose-400 drop-shadow-[0_0_25px_rgba(225,29,72,0.5)]"
            >
              ∞
            </motion.button>
          )}
        </AnimatePresence>
      </div>

      {phase === 'done' && (
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="font-quicksand text-sm text-neutral-500"
        >
          yeah. that much. tap it again if you don't believe me.
        </motion.p>
      )}
    </section>
  );
}
