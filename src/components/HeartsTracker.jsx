import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import confetti from 'canvas-confetti';
import { HEARTS_EVENT, HIDDEN_HEART_IDS, getCollectedHearts } from '../data/hiddenHearts';
import { useAuth } from '../context/AuthContext';

export default function HeartsTracker() {
  const { user } = useAuth();
  const [collected, setCollected] = useState([]);
  const [open, setOpen] = useState(false);
  const [celebrated, setCelebrated] = useState(false);

  useEffect(() => {
    setCollected(getCollectedHearts());

    const handler = (e) => {
      setCollected(e.detail);
      if (e.detail.length === HIDDEN_HEART_IDS.length && !celebrated) {
        setCelebrated(true);
        setOpen(true);
        confetti({
          particleCount: 220,
          spread: 130,
          origin: { y: 0.5 },
          colors: ['#e11d48', '#ffffff', '#fbbf24'],
        });
      }
    };

    window.addEventListener(HEARTS_EVENT, handler);
    return () => window.removeEventListener(HEARTS_EVENT, handler);
  }, [celebrated]);

  if (!user) return null;

  const total = HIDDEN_HEART_IDS.length;
  const found = collected.length;

  return (
    <>
      <motion.button
        onClick={() => setOpen(true)}
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className="fixed bottom-5 left-5 z-40 flex items-center gap-2 rounded-full border border-rose-500/30 bg-neutral-950/80 px-4 py-2 font-quicksand text-xs text-rose-300 shadow-[0_0_20px_rgba(225,29,72,0.2)] backdrop-blur"
      >
        🖤 <span className="tabular-nums">{found}/{total}</span> found
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
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.85, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="max-w-sm rounded-3xl border border-rose-500/30 bg-neutral-950 p-8 text-center shadow-[0_0_50px_rgba(225,29,72,0.35)]"
            >
              <p className="font-quicksand text-xs uppercase tracking-[0.3em] text-rose-400/80">
                the little heart hunt
              </p>

              {found < total ? (
                <>
                  <p className="mt-4 font-dancing text-3xl text-white">{found} of {total} found</p>
                  <p className="mt-3 font-quicksand text-sm leading-relaxed text-neutral-400">
                    there are tiny hearts hiding around the site, tucked into corners you might not
                    look twice at. tap one when you spot it. find them all for something extra.
                  </p>
                </>
              ) : (
                <>
                  <p className="mt-4 font-dancing text-3xl text-rose-400">you found every single one</p>
                  <p className="mt-3 font-quicksand text-sm leading-relaxed text-neutral-300">
                    of course you did. you're thorough, you're a little bit relentless, and honestly
                    that is one of my favorite things about you. that's the whole secret. there was
                    never a bigger prize than just you being you, all the way through this.
                  </p>
                  <p className="mt-4 font-dancing text-2xl text-white">🖤 found me too, i guess</p>
                </>
              )}

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
