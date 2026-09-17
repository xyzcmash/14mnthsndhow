import { Route, Routes, useLocation } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import Landing from './pages/Landing';
import Login from './pages/Login';
import Home from './pages/Home';
import Record from './pages/Record';
import Wall from './pages/Wall';
import Coupons from './pages/Coupons';
import Poems from './pages/Poems';
import ProtectedRoute from './components/ProtectedRoute';
import CursorTrail from './components/CursorTrail';
import HeartsTracker from './components/HeartsTracker';
import SurpriseEnvelope from './components/SurpriseEnvelope';

function App() {
  const location = useLocation();

  return (
    <>
      <CursorTrail />
      <HeartsTracker />
      <SurpriseEnvelope />
      <AnimatePresence mode="wait" initial={false}>
        <motion.div
          key={location.pathname}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25, ease: 'easeInOut' }}
        >
          <Routes location={location}>
            <Route path="/" element={<Landing />} />
            <Route path="/login" element={<Login />} />
            <Route
              path="/home"
              element={
                <ProtectedRoute>
                  <Home />
                </ProtectedRoute>
              }
            />
            <Route
              path="/record"
              element={
                <ProtectedRoute>
                  <Record />
                </ProtectedRoute>
              }
            />
            <Route
              path="/wall"
              element={
                <ProtectedRoute>
                  <Wall />
                </ProtectedRoute>
              }
            />
            <Route
              path="/coupons"
              element={
                <ProtectedRoute>
                  <Coupons />
                </ProtectedRoute>
              }
            />
            <Route
              path="/poems"
              element={
                <ProtectedRoute>
                  <Poems />
                </ProtectedRoute>
              }
            />
          </Routes>
        </motion.div>
      </AnimatePresence>
    </>
  );
}

export default App;
