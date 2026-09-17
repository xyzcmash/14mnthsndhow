import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function ProtectedRoute({ children }) {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <div className="flex h-screen items-center justify-center bg-black text-rose-400">
        <span className="animate-pulse font-quicksand text-lg">loading our little world...</span>
      </div>
    );
  }

  if (!user) return <Navigate to="/login" replace />;

  return children;
}
