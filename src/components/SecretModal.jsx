import { motion, AnimatePresence } from 'framer-motion';

export default function SecretModal({ open, onClose }) {
  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[200] flex items-center justify-center bg-black/85 px-6 backdrop-blur-sm"
          onClick={onClose}
        >
          <motion.div
            initial={{ scale: 0.7, opacity: 0, rotate: -6 }}
            animate={{ scale: 1, opacity: 1, rotate: 0 }}
            exit={{ scale: 0.8, opacity: 0 }}
            transition={{ type: 'spring', stiffness: 220, damping: 18 }}
            onClick={(e) => e.stopPropagation()}
            className="max-w-sm rounded-3xl border border-rose-500/30 bg-neutral-950 p-8 text-center shadow-[0_0_50px_rgba(225,29,72,0.35)]"
          >
            <p className="font-quicksand text-xs uppercase tracking-[0.3em] text-rose-400/80">
              you found the secret spot
            </p>
            <p className="mt-4 font-dancing text-3xl text-white">okay, since you're here —</p>
            <p className="mt-4 font-quicksand text-sm leading-relaxed text-neutral-300">
              i wasn't going to say this part out loud, but you clicked five times so you clearly
              earned it: you are, without any competition, my favorite person i've ever gotten to
              love. childish voice, petty fights, black hoodies and all. thank you for being you,
              ashu.
            </p>
            <p className="mt-6 font-dancing text-2xl text-rose-400">🖤 forever's fine by me</p>
            <button
              onClick={onClose}
              className="mt-6 rounded-full border border-white/10 px-6 py-2 font-quicksand text-sm text-neutral-400 transition hover:text-white"
            >
              close
            </button>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
