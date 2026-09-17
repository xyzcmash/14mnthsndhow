import { motion } from 'framer-motion';
import { TIMELINE } from '../data/timeline';

export default function Timeline() {
  return (
    <section className="relative z-10 mx-auto max-w-3xl px-6 pb-24">
      <h2 className="mb-14 text-center font-caveat text-4xl text-rose-400">our little timeline</h2>

      <div className="relative">
        <div className="absolute left-1/2 top-0 hidden h-full w-px -translate-x-1/2 bg-gradient-to-b from-rose-500/40 via-rose-500/10 to-transparent sm:block" />

        <div className="space-y-10 sm:space-y-16">
          {TIMELINE.map((item, i) => {
            const fromLeft = i % 2 === 0;
            return (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, x: fromLeft ? -40 : 40 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, amount: 0.4 }}
                transition={{ duration: 0.6, ease: 'easeOut' }}
                className={`relative flex sm:w-1/2 ${fromLeft ? 'sm:pr-10' : 'sm:ml-auto sm:pl-10'}`}
              >
                <span
                  className={`absolute top-6 hidden h-3 w-3 rounded-full bg-rose-500 shadow-[0_0_12px_rgba(225,29,72,0.8)] sm:block ${
                    fromLeft ? '-right-1.5' : '-left-1.5'
                  }`}
                />
                <div className="w-full rounded-2xl border border-white/5 bg-neutral-950/60 p-6 text-left shadow-[0_0_20px_rgba(0,0,0,0.4)]">
                  <span className="text-2xl">{item.emoji}</span>
                  <h3 className="mt-2 font-quicksand text-base font-semibold text-white">{item.title}</h3>
                  <p className="mt-1 font-quicksand text-sm leading-relaxed text-neutral-400">{item.text}</p>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
