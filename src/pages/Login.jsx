import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { useAuth } from '../context/AuthContext';
import FloatingHearts from '../components/FloatingHearts';
import HiddenHeart from '../components/HiddenHeart';
import CurtainReveal from '../components/CurtainReveal';

export default function Login() {
  const [mode, setMode] = useState('login');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [busy, setBusy] = useState(false);
  const { loginWithGoogle, loginWithEmail, registerWithEmail } = useAuth();
  const navigate = useNavigate();

  const handleGoogle = async () => {
    setError('');
    setBusy(true);
    try {
      await loginWithGoogle();
      navigate('/home');
    } catch (err) {
      setError(prettyError(err));
    } finally {
      setBusy(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setBusy(true);
    try {
      if (mode === 'login') {
        await loginWithEmail(email, password);
      } else {
        await registerWithEmail(name, email, password);
      }
      navigate('/home');
    } catch (err) {
      setError(prettyError(err));
    } finally {
      setBusy(false);
    }
  };

  return (
    <CurtainReveal>
    <div className="relative flex min-h-screen items-center justify-center overflow-hidden bg-black px-6 py-16">
      <FloatingHearts count={10} />
      <HiddenHeart id="login" className="absolute bottom-4 left-4" />

      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="z-10 w-full max-w-sm rounded-3xl border border-white/10 bg-neutral-950/80 p-8 shadow-[0_0_40px_rgba(225,29,72,0.15)] backdrop-blur"
      >
        <p className="text-center font-dancing text-4xl text-rose-400">only ashu allowed 🖤</p>
        <p className="mt-2 text-center font-quicksand text-sm text-neutral-500">
          {mode === 'login' ? 'welcome back, my love' : "let's make this official"}
        </p>

        <button
          type="button"
          onClick={handleGoogle}
          disabled={busy}
          className="mt-8 flex w-full items-center justify-center gap-3 rounded-full border border-white/15 bg-white py-3 font-quicksand font-semibold text-neutral-900 transition hover:bg-neutral-200 disabled:opacity-50"
        >
          <GoogleIcon />
          continue with google
        </button>

        <div className="my-6 flex items-center gap-3 text-neutral-600">
          <div className="h-px flex-1 bg-white/10" />
          <span className="font-quicksand text-xs uppercase tracking-widest">or</span>
          <div className="h-px flex-1 bg-white/10" />
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <AnimatePresence mode="wait">
            {mode === 'register' && (
              <motion.input
                key="name"
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                type="text"
                placeholder="your name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                className="w-full rounded-xl border border-white/10 bg-black/60 px-4 py-3 font-quicksand text-white placeholder-neutral-600 outline-none focus:border-rose-500"
              />
            )}
          </AnimatePresence>

          <input
            type="email"
            placeholder="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="w-full rounded-xl border border-white/10 bg-black/60 px-4 py-3 font-quicksand text-white placeholder-neutral-600 outline-none focus:border-rose-500"
          />
          <input
            type="password"
            placeholder="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            minLength={6}
            className="w-full rounded-xl border border-white/10 bg-black/60 px-4 py-3 font-quicksand text-white placeholder-neutral-600 outline-none focus:border-rose-500"
          />

          {error && <p className="font-quicksand text-sm text-rose-400">{error}</p>}

          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            type="submit"
            disabled={busy}
            className="w-full rounded-full bg-rose-600 py-3 font-quicksand font-semibold text-white shadow-[0_0_25px_rgba(225,29,72,0.4)] transition hover:bg-rose-500 disabled:opacity-50"
          >
            {busy ? 'one sec...' : mode === 'login' ? 'come in, ashu' : 'create my spot'}
          </motion.button>
        </form>

        <p className="mt-6 text-center font-quicksand text-sm text-neutral-500">
          {mode === 'login' ? "first time here?" : 'already have a spot?'}{' '}
          <button
            type="button"
            onClick={() => setMode(mode === 'login' ? 'register' : 'login')}
            className="text-rose-400 underline-offset-4 hover:underline"
          >
            {mode === 'login' ? 'register' : 'login'}
          </button>
        </p>
      </motion.div>
    </div>
    </CurtainReveal>
  );
}

function prettyError(err) {
  const code = err?.code || '';
  if (code.includes('wrong-password') || code.includes('invalid-credential')) return "that's not it, try again love";
  if (code.includes('user-not-found')) return "don't see you here yet, register first?";
  if (code.includes('email-already-in-use')) return 'this email already has a spot, just login';
  if (code.includes('popup-closed')) return 'closed the popup too soon, try again';
  return 'something went sideways, try again in a sec';
}

function GoogleIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 48 48">
      <path
        fill="#FFC107"
        d="M43.6 20.5H42V20H24v8h11.3c-1.6 4.6-6 8-11.3 8-6.6 0-12-5.4-12-12s5.4-12 12-12c3.1 0 5.9 1.2 8 3.1l5.7-5.7C34.6 6.1 29.6 4 24 4 12.9 4 4 12.9 4 24s8.9 20 20 20 20-8.9 20-20c0-1.3-.1-2.7-.4-3.5z"
      />
      <path
        fill="#FF3D00"
        d="M6.3 14.7l6.6 4.8C14.6 15.9 18.9 13 24 13c3.1 0 5.9 1.2 8 3.1l5.7-5.7C34.6 6.1 29.6 4 24 4c-7.5 0-14 4.2-17.7 10.7z"
      />
      <path
        fill="#4CAF50"
        d="M24 44c5.5 0 10.4-1.9 14.1-5.1l-6.5-5.5C29.5 35 26.9 36 24 36c-5.3 0-9.7-3.4-11.3-8l-6.6 5.1C9.9 39.7 16.4 44 24 44z"
      />
      <path
        fill="#1976D2"
        d="M43.6 20.5H42V20H24v8h11.3c-.8 2.3-2.2 4.2-4.1 5.6l6.5 5.5C39.9 37.2 44 31.5 44 24c0-1.3-.1-2.7-.4-3.5z"
      />
    </svg>
  );
}
