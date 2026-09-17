import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import confetti from 'canvas-confetti';
import FloatingHearts from '../components/FloatingHearts';
import HiddenHeart from '../components/HiddenHeart';

export default function Landing() {
  const navigate = useNavigate();

  const handleEnter = () => {
    confetti({
      particleCount: 140,
      spread: 90,
      origin: { y: 0.6 },
      colors: ['#e11d48', '#ffffff', '#111111', '#fbbf24'],
    });
    setTimeout(() => navigate('/login'), 500);
  };

  return (
    <div className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden bg-black px-6 text-center">
      <FloatingHearts count={22} />
      <HiddenHeart id="landing" className="absolute bottom-4 right-4" />

      <motion.p
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        className="z-10 font-quicksand text-sm uppercase tracking-[0.4em] text-rose-400/80"
      >
        14 months of us
      </motion.p>

      <motion.h1
        initial={{ opacity: 0, scale: 0.85 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1.1, delay: 0.3, ease: 'easeOut' }}
        className="z-10 mt-4 font-dancing text-6xl text-white drop-shadow-[0_0_25px_rgba(225,29,72,0.35)] sm:text-8xl"
      >
        for ashuuuuu
      </motion.h1>

      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 1.1 }}
        className="z-10 mt-6 max-w-md font-quicksand text-base text-neutral-400 sm:text-lg"
      >
        open this when you have five minutes, your headphones,
        <br />
        and your heart in your hands.
      </motion.p>

      <motion.button
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 1.8 }}
        whileHover={{ scale: 1.06 }}
        whileTap={{ scale: 0.94 }}
        onClick={handleEnter}
        className="z-10 mt-12 rounded-full border border-rose-500/60 bg-rose-600/90 px-10 py-4 font-quicksand text-lg font-semibold text-white shadow-[0_0_30px_rgba(225,29,72,0.45)] transition hover:bg-rose-500"
      >
        click here, ashu 🖤
      </motion.button>

      <motion.div
        className="absolute inset-0 -z-10"
        style={{
          background:
            'radial-gradient(circle at 50% 30%, rgba(225,29,72,0.15), transparent 55%)',
        }}
        animate={{ opacity: [0.6, 1, 0.6] }}
        transition={{ duration: 6, repeat: Infinity }}
      />
    </div>
  );
}
