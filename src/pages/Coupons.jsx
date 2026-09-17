import { useEffect, useState } from 'react';
import { collection, onSnapshot } from 'firebase/firestore';
import NavBar from '../components/NavBar';
import FloatingHearts from '../components/FloatingHearts';
import CouponCard from '../components/CouponCard';
import { COUPONS } from '../data/coupons';
import { db } from '../firebase/firebase';

export default function Coupons() {
  const [redeemedMap, setRedeemedMap] = useState({});

  useEffect(() => {
    const unsub = onSnapshot(collection(db, 'coupons'), (snap) => {
      const map = {};
      snap.docs.forEach((d) => {
        map[d.id] = d.data().redeemed;
      });
      setRedeemedMap(map);
    });
    return unsub;
  }, []);

  return (
    <div className="relative min-h-screen bg-black text-white">
      <FloatingHearts count={10} />
      <NavBar />

      <div className="relative z-10 mx-auto max-w-4xl px-6 py-16">
        <h1 className="text-center font-dancing text-4xl text-rose-400 sm:text-5xl">love coupons</h1>
        <p className="mx-auto mt-3 max-w-md text-center font-quicksand text-sm text-neutral-500">
          tap a card to flip it, then redeem whenever you actually want it. it sends straight to
          me so i actually know.
        </p>

        <div className="mt-12 grid grid-cols-2 gap-5 sm:grid-cols-3 lg:grid-cols-4">
          {COUPONS.map((coupon) => (
            <CouponCard key={coupon.id} coupon={coupon} redeemed={!!redeemedMap[coupon.id]} />
          ))}
        </div>
      </div>
    </div>
  );
}
