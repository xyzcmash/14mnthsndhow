import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { doc, increment, updateDoc } from 'firebase/firestore';
import { db } from '../firebase/firebase';

export default function WallMessage({ message, delay, formatDate }) {
  const [burst, setBurst] = useState(false);
  const [pending, setPending] = useState(false);

  const handleDoubleClick = async () => {
    setBurst(true);
    setTimeout(() => setBurst(false), 700);

    if (pending) return;
    setPending(true);
    try {
      await updateDoc(doc(db, 'messages', message.id), { hearts: increment(1) });
    } catch {
      // ignore — reaction is a nice-to-have, not critical
    } finally {
      setPending(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay }}
      onDoubleClick={handleDoubleClick}
      className="relative select-none overflow-hidden rounded-2xl border border-white/5 bg-neutral-950/60 p-5"
    >
      <AnimatePresence>
        {burst && (
          <motion.span
            initial={{ opacity: 0, scale: 0.4 }}
            animate={{ opacity: 1, scale: 1.6 }}
            exit={{ opacity: 0, scale: 2 }}
            transition={{ duration: 0.6 }}
            className="pointer-events-none absolute inset-0 flex items-center justify-center text-6xl"
          >
            🖤
          </motion.span>
        )}
      </AnimatePresence>

      <div className="flex items-center justify-between">
        <span className="font-quicksand text-sm font-semibold text-rose-400">{message.name}</span>
        <span className="font-quicksand text-xs text-neutral-600">
          {message.createdAt?.toDate ? formatDate(message.createdAt.toDate()) : 'just now'}
        </span>
      </div>

      {message.text && (
        <p className="mt-2 font-quicksand text-sm leading-relaxed text-neutral-300">{message.text}</p>
      )}

      {message.audioUrl && <audio src={message.audioUrl} controls className="mt-3 h-9 w-full" />}

      <div className="mt-3 flex items-center justify-between">
        <p className="font-quicksand text-[11px] text-neutral-600">double-tap to send a heart</p>
        {message.hearts > 0 && (
          <span className="font-quicksand text-xs text-rose-400">
            🖤 {message.hearts}
          </span>
        )}
      </div>
    </motion.div>
  );
}
