import { useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import confetti from 'canvas-confetti';
import { SPIN_PRIZES } from '../data/spinPrizes';

export default function SpinReel() {
  const [display, setDisplay] = useState(null);
  const [spinning, setSpinning] = useState(false);
  const timeoutRef = useRef(null);

  const spin = () => {
    if (spinning) return;
    setSpinning(true);
    setDisplay(null);

    let delay = 60;
    let ticks = 0;
    const maxTicks = 22;

    const tick = () => {
      const random = SPIN_PRIZES[Math.floor(Math.random() * SPIN_PRIZES.length)];
      setDisplay(random);
      ticks += 1;
      delay += 12;

      if (ticks < maxTicks) {
        timeoutRef.current = setTimeout(tick, delay);
      } else {
        const finalPrize = SPIN_PRIZES[Math.floor(Math.random() * SPIN_PRIZES.length)];
        setDisplay(finalPrize);
        setSpinning(false);
        confetti({
          particleCount: 130,
          spread: 85,
          origin: { y: 0.6 },
          colors: ['#e11d48', '#ffffff', '#fbbf24'],
        });
      }
    };

    tick();
  };

  return (
    <section className="relative z-10 mx-auto max-w-xl px-6 pb-24 text-center">
      <h2 className="font-caveat text-4xl text-rose-400">spin for a little surprise</h2>
      <p className="mt-2 font-quicksand text-sm text-neutral-500">
        one spin, one honest reward, no losing outcomes.
      </p>

      <div className="mt-8 flex min-h-[140px] items-center justify-center rounded-3xl border border-rose-500/20 bg-neutral-950/60 px-6 py-8">
        <AnimatePresence mode="wait">
          {display ? (
            <motion.div
              key={display.text + (spinning ? 'spin' : 'final')}
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.12 }}
            >
              <div className="text-4xl">{display.emoji}</div>
              <p className="mt-3 font-quicksand text-sm text-white sm:text-base">{display.text}</p>
            </motion.div>
          ) : (
            <p className="font-quicksand text-sm text-neutral-600">tap spin to see what you get</p>
          )}
        </AnimatePresence>
      </div>

      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={spin}
        disabled={spinning}
        className="mt-6 rounded-full bg-rose-600 px-8 py-3 font-quicksand font-semibold text-white shadow-[0_0_25px_rgba(225,29,72,0.4)] transition hover:bg-rose-500 disabled:cursor-not-allowed disabled:opacity-50"
      >
        {spinning ? 'spinning...' : 'spin 🎰'}
      </motion.button>
    </section>
  );
}
