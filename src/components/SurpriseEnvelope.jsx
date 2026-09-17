import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import confetti from 'canvas-confetti';
import { SURPRISES } from '../data/surprises';
import { useAuth } from '../context/AuthContext';

export default function SurpriseEnvelope() {
  const { user } = useAuth();
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState(null);

  if (!user) return null;

  const handleOpen = () => {
    const pick = SURPRISES[Math.floor(Math.random() * SURPRISES.length)];
    setMessage(pick);
    setOpen(true);
    confetti({
      particleCount: 100,
      spread: 75,
      origin: { y: 0.7, x: 0.85 },
      colors: ['#e11d48', '#fbbf24', '#ffffff'],
    });
  };

  return (
    <>
      <motion.button
        onClick={handleOpen}
        animate={{ y: [0, -8, 0] }}
        transition={{ duration: 2.6, repeat: Infinity, ease: 'easeInOut' }}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        aria-label="open a little surprise"
        className="fixed bottom-5 right-5 z-40 flex h-12 w-12 items-center justify-center rounded-full border border-amber-400/40 bg-neutral-950/80 text-xl shadow-[0_0_20px_rgba(251,191,36,0.25)] backdrop-blur"
      >
        💌
      </motion.button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setOpen(false)}
            className="fixed inset-0 z-[200] flex items-center justify-center bg-black/85 px-6 backdrop-blur-sm"
          >
            <motion.div
              initial={{ scale: 0.6, opacity: 0, rotate: -8 }}
              animate={{ scale: 1, opacity: 1, rotate: 0 }}
              exit={{ scale: 0.7, opacity: 0 }}
              transition={{ type: 'spring', stiffness: 220, damping: 16 }}
              onClick={(e) => e.stopPropagation()}
              className="max-w-sm rounded-3xl border border-amber-400/30 bg-neutral-950 p-8 text-center shadow-[0_0_50px_rgba(251,191,36,0.25)]"
            >
              <span className="text-3xl">💌</span>
              <p className="mt-3 font-quicksand text-xs uppercase tracking-[0.3em] text-amber-300/80">
                a little surprise
              </p>
              <p className="mt-4 font-caveat text-2xl leading-snug text-white sm:text-3xl">
                {message}
              </p>
              <button
                onClick={() => setOpen(false)}
                className="mt-6 rounded-full border border-white/10 px-6 py-2 font-quicksand text-sm text-neutral-400 transition hover:text-white"
              >
                close
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
