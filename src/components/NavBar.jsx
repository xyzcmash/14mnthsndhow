import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function NavBar() {
  const { user, logout } = useAuth();
  const { pathname } = useLocation();

  if (!user) return null;

  const linkClass = (path) =>
    `font-quicksand text-sm transition ${pathname === path ? 'text-rose-400' : 'text-neutral-400 hover:text-white'}`;

  return (
    <nav className="sticky top-0 z-30 flex items-center justify-between border-b border-white/5 bg-black/70 px-6 py-4 backdrop-blur">
      <Link to="/home" className="font-dancing text-2xl text-rose-400">
        us 🖤
      </Link>
      <div className="flex items-center gap-6">
        <Link to="/home" className={linkClass('/home')}>
          home
        </Link>
        <Link to="/record" className={linkClass('/record')}>
          send a note
        </Link>
        <Link to="/wall" className={linkClass('/wall')}>
          the wall
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
