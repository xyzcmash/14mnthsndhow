import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import confetti from 'canvas-confetti';
import { COMPLIMENTS } from '../data/compliments';

export default function ReasonGenerator() {
  const [current, setCurrent] = useState(null);
  const [usedUp, setUsedUp] = useState([]);

  const reveal = () => {
    let pool = COMPLIMENTS.filter((_, i) => !usedUp.includes(i));
    if (pool.length === 0) {
      setUsedUp([]);
      pool = COMPLIMENTS;
    }
    const idx = COMPLIMENTS.indexOf(pool[Math.floor(Math.random() * pool.length)]);
    setCurrent(COMPLIMENTS[idx]);
    setUsedUp((prev) => [...prev, idx]);

    confetti({
      particleCount: 40,
      spread: 60,
      origin: { y: 0.7 },
      scalar: 0.7,
      colors: ['#e11d48', '#ffffff'],
    });
  };

  return (
    <section className="relative z-10 mx-auto max-w-xl px-6 pb-24 text-center">
      <h2 className="font-caveat text-4xl text-rose-400">tap for a reason, ashu</h2>
      <p className="mt-2 font-quicksand text-sm text-neutral-500">
        there's {COMPLIMENTS.length}+ of these. i could keep going forever, honestly.
      </p>

      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={reveal}
        className="mt-8 rounded-full border border-rose-500/40 bg-neutral-950/70 px-8 py-3 font-quicksand font-semibold text-rose-400 shadow-[0_0_20px_rgba(225,29,72,0.2)] transition hover:bg-rose-950/40"
      >
        tap me 🖤
      </motion.button>

      <div className="mt-8 flex min-h-[100px] items-center justify-center">
        <AnimatePresence mode="wait">
          {current && (
            <motion.p
              key={current}
              initial={{ opacity: 0, y: 12, scale: 0.96 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -12, scale: 0.96 }}
              transition={{ duration: 0.35 }}
              className="rounded-2xl border border-white/5 bg-neutral-950/60 px-6 py-5 font-caveat text-2xl text-white sm:text-3xl"
            >
              {current}
            </motion.p>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
