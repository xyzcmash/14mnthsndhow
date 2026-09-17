import { useEffect, useState } from 'react';
import { collection, onSnapshot, orderBy, query } from 'firebase/firestore';
import NavBar from '../components/NavBar';
import FloatingHearts from '../components/FloatingHearts';
import WallMessage from '../components/WallMessage';
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
            <WallMessage
              key={m.id}
              message={m}
              delay={Math.min(i * 0.05, 0.4)}
              formatDate={formatDate}
            />
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
