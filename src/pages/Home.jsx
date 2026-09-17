import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import NavBar from '../components/NavBar';
import FloatingHearts from '../components/FloatingHearts';
import { useAuth } from '../context/AuthContext';
import { getElapsed, HER_NAME } from '../utils/relationship';

const REASONS = [
  {
    emoji: '👀',
    title: 'the way we look at each other',
    text: "it's stupid how a single look from you can say more than an hour of talking. i still get caught staring, every single time.",
  },
  {
    emoji: '🎭',
    title: 'our rp world',
    text: "all those late-night rps we ran the last year — different characters, same us underneath. that's genuinely one of my favorite versions of you.",
  },
  {
    emoji: '🥺',
    title: 'that childish voice + those faces',
    text: "the voice you do, the faces you pull acting like a whole little boy — i don't know why it melts me every time but it does, without fail.",
  },
  {
    emoji: '⚡',
    title: 'the petty fights',
    text: "we fight over the dumbest things and somehow that's still one of my favorite parts of us, because we always, always find our way back to loving each other harder.",
  },
  {
    emoji: '🖤',
    title: 'black — ours before it was cool',
    text: "your favorite color is black. mine too. i'm not saying it's fate, i'm just saying it's a little bit fate.",
  },
];

export default function Home() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [elapsed, setElapsed] = useState(getElapsed());

  useEffect(() => {
    const id = setInterval(() => setElapsed(getElapsed()), 1000);
    return () => clearInterval(id);
  }, []);

  const firstName = (user?.displayName || HER_NAME).split(' ')[0];

  return (
    <div className="relative min-h-screen bg-black text-white">
      <FloatingHearts count={14} />
      <NavBar />

      <section className="relative z-10 mx-auto flex max-w-3xl flex-col items-center px-6 pb-20 pt-16 text-center">
        <motion.p
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="font-quicksand text-sm uppercase tracking-[0.35em] text-rose-400/80"
        >
          hi {firstName.toLowerCase()} 🖤
        </motion.p>

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15 }}
          className="mt-4 font-dancing text-5xl text-white sm:text-6xl"
        >
          14 months of you and me
        </motion.h1>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="mt-10 grid grid-cols-4 gap-3 sm:gap-6"
        >
          {[
            { label: 'months', value: elapsed.months },
            { label: 'days', value: elapsed.days },
            { label: 'hours', value: elapsed.hours },
            { label: 'minutes', value: elapsed.minutes },
          ].map((item) => (
            <div
              key={item.label}
              className="rounded-2xl border border-rose-500/20 bg-neutral-950/70 px-3 py-4 shadow-[0_0_25px_rgba(225,29,72,0.12)] sm:px-6"
            >
              <div className="font-quicksand text-2xl font-bold text-rose-400 sm:text-4xl">
                {item.value}
              </div>
              <div className="mt-1 font-quicksand text-[10px] uppercase tracking-widest text-neutral-500 sm:text-xs">
                {item.label}
              </div>
            </div>
          ))}
        </motion.div>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="mt-8 max-w-lg font-quicksand text-neutral-400"
        >
          and counting, ashu. not slowing down anytime soon.
        </motion.p>
      </section>

      <section className="relative z-10 mx-auto max-w-3xl px-6 pb-24">
        <h2 className="mb-10 text-center font-caveat text-4xl text-rose-400">
          things i think about way too often
        </h2>

        <div className="space-y-6">
          {REASONS.map((r, i) => (
            <motion.div
              key={r.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.4 }}
              transition={{ duration: 0.5, delay: i * 0.05 }}
              className="flex items-start gap-4 rounded-2xl border border-white/5 bg-neutral-950/60 p-6 text-left shadow-[0_0_20px_rgba(0,0,0,0.4)]"
            >
              <span className="text-3xl">{r.emoji}</span>
              <div>
                <h3 className="font-quicksand text-lg font-semibold text-white">{r.title}</h3>
                <p className="mt-1 font-quicksand text-sm leading-relaxed text-neutral-400">{r.text}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      <section className="relative z-10 mx-auto max-w-2xl px-6 pb-10 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="rounded-3xl border border-rose-500/20 bg-gradient-to-b from-rose-950/30 to-black p-10"
        >
          <p className="font-caveat text-3xl text-rose-300">a little letter, ashu —</p>
          <p className="mt-4 font-quicksand text-sm leading-relaxed text-neutral-300 sm:text-base">
            14 months in and you're still the person i'd pick, over and over, every single time.
            through every dumb argument over nothing, every time we've come back softer and closer
            than before, every voice note, every rp, every one of your ridiculous faces — it's all
            just... us. and i genuinely love that.
            <br />
            <br />
            this whole site exists because i wanted to give you a place that's just ours. so go on —
            record me something. tell me anything. i'm always listening.
          </p>
          <p className="mt-6 font-dancing text-2xl text-white">yours, always 🖤</p>
        </motion.div>
      </section>

      <div className="relative z-10 flex justify-center pb-20">
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => navigate('/record')}
          className="rounded-full bg-rose-600 px-10 py-4 font-quicksand text-lg font-semibold text-white shadow-[0_0_30px_rgba(225,29,72,0.45)] transition hover:bg-rose-500"
        >
          tell me something, ashu 🎙️
        </motion.button>
      </div>
    </div>
  );
}
