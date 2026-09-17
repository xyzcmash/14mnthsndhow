import { useState } from 'react';
import { motion } from 'framer-motion';
import confetti from 'canvas-confetti';
import { doc, serverTimestamp, setDoc } from 'firebase/firestore';
import { db } from '../firebase/firebase';
import { sendToWhatsApp } from '../utils/waLink';
import { useAuth } from '../context/AuthContext';

export default function CouponCard({ coupon, redeemed }) {
  const { user } = useAuth();
  const [flipped, setFlipped] = useState(false);
  const [sending, setSending] = useState(false);

  const handleRedeem = async (e) => {
    e.stopPropagation();
    if (redeemed || sending) return;
    setSending(true);

    try {
      await setDoc(doc(db, 'coupons', coupon.id), {
        redeemed: true,
        title: coupon.title,
        redeemedAt: serverTimestamp(),
      });

      sendToWhatsApp({
        text: `🖤 ${user?.displayName || 'ashu'} just redeemed a coupon\n\n"${coupon.title}"\n\ntime to deliver`,
      });

      confetti({
        particleCount: 120,
        spread: 90,
        origin: { y: 0.6 },
        colors: ['#e11d48', '#ffffff', '#fbbf24'],
      });
    } finally {
      setSending(false);
    }
  };

  return (
    <div className="[perspective:1200px]">
      <motion.div
        onClick={() => setFlipped((f) => !f)}
        animate={{ rotateY: flipped ? 180 : 0 }}
        transition={{ duration: 0.5 }}
        className="relative h-56 w-full cursor-pointer [transform-style:preserve-3d]"
      >
        <div
          className="absolute inset-0 flex flex-col items-center justify-center rounded-2xl border border-rose-500/20 bg-neutral-950/70 p-5 text-center shadow-[0_0_20px_rgba(225,29,72,0.12)] [backface-visibility:hidden]"
        >
          <span className="text-4xl">{coupon.emoji}</span>
          <p className="mt-3 font-quicksand text-xs uppercase tracking-widest text-neutral-500">
            tap to reveal
          </p>
          {redeemed && (
            <span className="absolute right-3 top-3 rounded-full border border-rose-500/40 px-2 py-0.5 font-quicksand text-[10px] uppercase tracking-widest text-rose-400">
              redeemed
            </span>
          )}
        </div>

        <div
          className="absolute inset-0 flex flex-col items-center justify-center rounded-2xl border border-rose-500/30 bg-neutral-900 p-5 text-center [backface-visibility:hidden] [transform:rotateY(180deg)]"
        >
          <h3 className="font-quicksand text-base font-semibold text-white">{coupon.title}</h3>
          <p className="mt-2 font-quicksand text-xs leading-relaxed text-neutral-400">{coupon.text}</p>

          <button
            onClick={handleRedeem}
            disabled={redeemed || sending}
            className="mt-4 rounded-full bg-rose-600 px-4 py-2 font-quicksand text-xs font-semibold text-white shadow-[0_0_15px_rgba(225,29,72,0.4)] transition hover:bg-rose-500 disabled:cursor-not-allowed disabled:opacity-40"
          >
            {redeemed ? 'already redeemed' : sending ? 'sending...' : 'redeem this one'}
          </button>
        </div>
      </motion.div>
    </div>
  );
}
