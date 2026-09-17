import { useRef, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import confetti from 'canvas-confetti';
import { useAuth } from '../context/AuthContext';
import SecretModal from './SecretModal';

export default function NavBar() {
  const { user, logout } = useAuth();
  const { pathname } = useLocation();
  const [secretOpen, setSecretOpen] = useState(false);
  const tapCount = useRef(0);
  const tapTimer = useRef(null);

  if (!user) return null;

  const linkClass = (path) =>
    `font-quicksand text-sm transition ${pathname === path ? 'text-rose-400' : 'text-neutral-400 hover:text-white'}`;

  const handleLogoTap = () => {
    tapCount.current += 1;
    clearTimeout(tapTimer.current);
    tapTimer.current = setTimeout(() => {
      tapCount.current = 0;
    }, 2500);

    if (tapCount.current >= 5) {
      tapCount.current = 0;
      setSecretOpen(true);
      confetti({
        particleCount: 180,
        spread: 110,
        origin: { y: 0.5 },
        colors: ['#e11d48', '#ffffff', '#fbbf24'],
      });
    }
  };

  return (
    <nav className="sticky top-0 z-30 flex items-center justify-between border-b border-white/5 bg-black/70 px-6 py-4 backdrop-blur">
      <SecretModal open={secretOpen} onClose={() => setSecretOpen(false)} />
      <Link to="/home" onClick={handleLogoTap} className="font-dancing text-2xl text-rose-400">
        us 🖤
      </Link>
      <div className="flex flex-wrap items-center justify-end gap-4 sm:gap-6">
        <Link to="/home" className={linkClass('/home')}>
          home
        </Link>
        <Link to="/record" className={linkClass('/record')}>
          send a note
        </Link>
        <Link to="/wall" className={linkClass('/wall')}>
          the wall
        </Link>
        <Link to="/coupons" className={linkClass('/coupons')}>
          coupons
        </Link>
        <Link to="/poems" className={linkClass('/poems')}>
          poems
        </Link>
        <button
          onClick={logout}
          className="font-quicksand text-sm text-neutral-500 transition hover:text-rose-400"
        >
          logout
        </button>
      </div>
    </nav>
  );
}
