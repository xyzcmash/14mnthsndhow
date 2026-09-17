import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import NavBar from '../components/NavBar';
import FloatingHearts from '../components/FloatingHearts';
import { POEMS } from '../data/poems';

function dayOfYear() {
  const now = new Date();
  const start = new Date(now.getFullYear(), 0, 0);
  const diff = now - start;
  return Math.floor(diff / 86400000);
}

export default function Poems() {
  const [index, setIndex] = useState(dayOfYear() % POEMS.length);
  const poem = POEMS[index];

  const another = () => {
    let next = Math.floor(Math.random() * POEMS.length);
    if (next === index) next = (next + 1) % POEMS.length;
    setIndex(next);
  };

  return (
    <div className="relative min-h-screen bg-black text-white">
      <FloatingHearts count={10} />
      <NavBar />

      <div className="relative z-10 mx-auto flex max-w-lg flex-col items-center px-6 py-16 text-center">
        <p className="font-quicksand text-xs uppercase tracking-[0.35em] text-rose-400/80">
          poem of the day
        </p>
        <h1 className="mt-3 font-dancing text-4xl sm:text-5xl">a little vault of words</h1>

        <AnimatePresence mode="wait">
          <motion.div
            key={poem.title}
            initial={{ opacity: 0, rotateX: -20, y: 20 }}
            animate={{ opacity: 1, rotateX: 0, y: 0 }}
            exit={{ opacity: 0, rotateX: 20, y: -20 }}
            transition={{ duration: 0.45 }}
            className="mt-10 w-full rounded-3xl border border-rose-500/20 bg-neutral-950/70 p-10 shadow-[0_0_30px_rgba(225,29,72,0.15)]"
          >
            <h2 className="font-caveat text-3xl text-rose-400">{poem.title}</h2>
            <div className="mt-6 space-y-2">
              {poem.lines.map((line, i) => (
                <motion.p
                  key={i}
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 + i * 0.08 }}
                  className="font-quicksand text-sm leading-relaxed text-neutral-300 sm:text-base"
                >
                  {line}
                </motion.p>
              ))}
            </div>
          </motion.div>
        </AnimatePresence>

        <button
          onClick={another}
          className="mt-8 rounded-full border border-rose-500/40 bg-neutral-950/70 px-6 py-3 font-quicksand text-sm font-semibold text-rose-400 transition hover:bg-rose-950/40"
        >
          read another one
        </button>

        <p className="mt-4 font-quicksand text-xs text-neutral-600">
          {POEMS.length} poems total, this one changes every day on its own too.
        </p>
      </div>
    </div>
  );
}
