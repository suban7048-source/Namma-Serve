import React from 'react';
import { useApp } from '../../context/AppContext';
import { ShoppingBag, ChevronRight } from 'lucide-react';

export const FloatingCartBar: React.FC = () => {
  const { cart, cartCount, cartTotal, setIsCartOpen, page } = useApp();

  if (cartCount === 0) return null;

  return (
    <aside
      aria-label="Shopping Cart Summary"
      className="fixed bottom-6 left-1/2 -translate-x-1/2 z-40 w-[92%] max-w-lg animate-slide-up"
    >
      <div className="bg-slate-900 text-white rounded-2xl p-3.5 sm:p-4 shadow-2xl border border-slate-700/60 flex items-center justify-between gap-4 backdrop-blur-md">
        
        {/* Left: Cart items count & total */}
        <div className="flex items-center gap-3">
          <div className="relative flex items-center justify-center w-11 h-11 rounded-xl bg-brand-600 text-white font-black shadow-md shadow-brand-500/30">
            <ShoppingBag className="w-5 h-5" />
            <span className="absolute -top-1.5 -right-1.5 bg-emerald-500 text-white text-[11px] font-black w-5 h-5 rounded-full flex items-center justify-center border-2 border-slate-900 shadow">
              {cartCount}
            </span>
          </div>

          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold text-slate-300">
                {cartCount} {cartCount === 1 ? 'service' : 'services'} added
              </span>
            </div>
            <p className="text-base sm:text-lg font-black tracking-tight text-white">
              ₹{cartTotal.toLocaleString('en-IN')}
            </p>
          </div>
        </div>

        {/* Right: Checkout CTA button */}
        <button
          onClick={() => setIsCartOpen(true)}
          className="bg-brand-600 hover:bg-brand-500 text-white font-extrabold text-xs sm:text-sm px-4 sm:px-5 py-2.5 sm:py-3 rounded-xl shadow-md transition-all flex items-center gap-1.5 shrink-0 group hover:scale-[1.02] active:scale-[0.98]"
        >
          <span>View Cart</span>
          <ChevronRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
        </button>

      </div>
    </aside>
  );
};
