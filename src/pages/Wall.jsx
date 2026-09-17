import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { collection, onSnapshot, orderBy, query } from 'firebase/firestore';
import NavBar from '../components/NavBar';
import FloatingHearts from '../components/FloatingHearts';
import { db } from '../firebase/firebase';

export default function Wall() {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const q = query(collection(db, 'messages'), orderBy('createdAt', 'desc'));
    const unsub = onSnapshot(
      q,
      (snap) => {
        setMessages(snap.docs.map((d) => ({ id: d.id, ...d.data() })));
        setLoading(false);
      },
      () => setLoading(false)
    );
    return unsub;
  }, []);

  return (
    <div className="relative min-h-screen bg-black text-white">
      <FloatingHearts count={8} />
      <NavBar />

      <div className="relative z-10 mx-auto max-w-2xl px-6 py-16">
        <h1 className="text-center font-dancing text-4xl text-rose-400 sm:text-5xl">the wall</h1>
        <p className="mt-3 text-center font-quicksand text-sm text-neutral-500">
          every note, kept in one place, forever.
        </p>

        <div className="mt-12 space-y-5">
          {loading && (
            <p className="text-center font-quicksand text-neutral-600">loading your notes...</p>
          )}

          {!loading && messages.length === 0 && (
            <p className="text-center font-quicksand text-neutral-600">
              nothing here yet — go send the first one 🖤
            </p>
          )}

          {messages.map((m, i) => (
            <motion.div
              key={m.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: Math.min(i * 0.05, 0.4) }}
              className="rounded-2xl border border-white/5 bg-neutral-950/60 p-5"
            >
              <div className="flex items-center justify-between">
                <span className="font-quicksand text-sm font-semibold text-rose-400">{m.name}</span>
                <span className="font-quicksand text-xs text-neutral-600">
                  {m.createdAt?.toDate ? formatDate(m.createdAt.toDate()) : 'just now'}
                </span>
              </div>
              {m.text && (
                <p className="mt-2 font-quicksand text-sm leading-relaxed text-neutral-300">{m.text}</p>
              )}
              {m.audioUrl && (
                <audio src={m.audioUrl} controls className="mt-3 h-9 w-full" />
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}

function formatDate(date) {
  return date.toLocaleString(undefined, {
    day: 'numeric',
    month: 'short',
    hour: '2-digit',
    minute: '2-digit',
  });
}
