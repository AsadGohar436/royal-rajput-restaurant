'use client';

import React from 'react';
import { useCart } from '@/context/CartContext';
import { ShoppingBag, ArrowRight } from 'lucide-react';

export const FloatingCartButton: React.FC = () => {
  const { totalItems, grandTotal, openCart } = useCart();

  if (totalItems === 0) return null;

  return (
    <div className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 z-40 max-w-[calc(100vw-2rem)] animate-in fade-in slide-in-from-bottom-6 duration-300">
      <button
        onClick={openCart}
        className="flex items-center gap-2.5 sm:gap-3.5 px-4 sm:px-5 py-3 sm:py-3.5 bg-gradient-to-r from-amber-500 via-amber-600 to-yellow-500 hover:brightness-110 text-slate-950 rounded-2xl shadow-2xl shadow-amber-500/40 hover:scale-105 active:scale-95 transition-all group border border-amber-300/40"
        aria-label="View Royal Dastarkhwan Cart"
      >
        <div className="relative">
          <ShoppingBag className="w-5 h-5 text-slate-950" />
          <span className="absolute -top-2 -right-2 bg-slate-950 text-amber-400 text-[11px] font-black w-4 h-4 rounded-full flex items-center justify-center border border-amber-400/40">
            {totalItems}
          </span>
        </div>

        <div className="text-left">
          <div className="text-[10px] uppercase tracking-wider font-extrabold text-slate-900/80">
            Your Feast
          </div>
          <div className="text-sm font-black leading-tight text-slate-950">
            Rs. {grandTotal.toLocaleString()}
          </div>
        </div>

        <div className="w-7 h-7 rounded-full bg-slate-950/20 flex items-center justify-center ml-1 group-hover:translate-x-0.5 transition-transform">
          <ArrowRight className="w-4 h-4 text-slate-950" />
        </div>
      </button>
    </div>
  );
};
