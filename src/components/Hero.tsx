'use client';

import React from 'react';
import { Sparkles, ArrowRight, Clock, Flame, Star, ShieldCheck } from 'lucide-react';

interface HeroProps {
  onExploreMenu: () => void;
  onOpenOrder: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onExploreMenu, onOpenOrder }) => {
  return (
    <section id="hero" className="relative overflow-hidden bg-gradient-to-b from-amber-50/60 via-white to-slate-50 pt-10 pb-20 lg:pt-16 lg:pb-28">
      {/* Background Decorative Blur Orbs */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[500px] bg-gradient-to-tr from-amber-200/40 via-emerald-100/40 to-transparent blur-3xl pointer-events-none -z-10 rounded-full" />
      <div className="absolute -top-24 right-0 w-96 h-96 bg-emerald-300/20 blur-2xl rounded-full pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* Left Column: Bold Branding & Typography */}
          <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
            
            {/* Top Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-emerald-100/80 border border-emerald-200/80 text-emerald-900 text-xs sm:text-sm font-bold tracking-wide shadow-sm">
              <Sparkles className="w-4 h-4 text-emerald-700 animate-pulse" />
              <span>CRAFTED WITH PURE DESI GHEE • 100% HALAL PRIME MEAT</span>
            </div>

            {/* Restaurant Title & Headline */}
            <div className="space-y-3">
              <div className="text-emerald-700 font-bold uppercase tracking-widest text-sm font-sans">
                Welcome to Dastarkhwan Pakistan
              </div>
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-slate-900 tracking-tight leading-[1.15]">
                Taste The Rich Heritage of{' '}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-700 via-amber-600 to-rose-700">
                  Pakistani Gastronomy.
                </span>
              </h1>
            </div>

            {/* Subtitle / Description */}
            <p className="text-slate-600 text-base sm:text-lg leading-relaxed max-w-2xl mx-auto lg:mx-0">
              From aromatic Karachi Dum Biryani to sizzling Lahori Desi Ghee Mutton Karahi and Peshawari Chapli Kababs grilled over live charcoal. Order now for piping-hot Pakistani royal flavors delivered straight to your door.
            </p>

            {/* Call to Actions */}
            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 pt-2">
              <button
                onClick={onExploreMenu}
                className="w-full sm:w-auto px-8 py-4 rounded-xl bg-gradient-to-r from-emerald-700 to-amber-600 hover:from-emerald-800 hover:to-amber-700 text-white font-bold text-base shadow-xl shadow-emerald-700/25 hover:shadow-emerald-700/35 transition-all flex items-center justify-center gap-2 group"
              >
                <span>Explore Desi Menu</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>

              <button
                onClick={onOpenOrder}
                className="w-full sm:w-auto px-8 py-4 rounded-xl bg-white hover:bg-slate-50 text-slate-800 font-bold text-base border-2 border-slate-200 hover:border-emerald-300 transition-all shadow-sm flex items-center justify-center gap-2"
              >
                <span>Order Online (Instant Delivery)</span>
              </button>
            </div>

            {/* Key Feature Perks */}
            <div className="pt-6 border-t border-slate-200/80 grid grid-cols-3 gap-4 text-center lg:text-left">
              <div>
                <div className="flex items-center justify-center lg:justify-start gap-1.5 text-emerald-700 font-bold text-lg sm:text-xl">
                  <Clock className="w-5 h-5 text-emerald-600" />
                  <span>30-45 min</span>
                </div>
                <p className="text-xs text-slate-500 mt-0.5">Piping Hot Doorstep Delivery</p>
              </div>

              <div>
                <div className="flex items-center justify-center lg:justify-start gap-1.5 text-amber-600 font-bold text-lg sm:text-xl">
                  <Star className="w-5 h-5 fill-amber-400 text-amber-400" />
                  <span>4.9 / 5.0</span>
                </div>
                <p className="text-xs text-slate-500 mt-0.5">Over 4,500+ Happy Foodies</p>
              </div>

              <div>
                <div className="flex items-center justify-center lg:justify-start gap-1.5 text-rose-600 font-bold text-lg sm:text-xl">
                  <Flame className="w-5 h-5 text-rose-500" />
                  <span>100% Charcoal</span>
                </div>
                <p className="text-xs text-slate-500 mt-0.5">Live Sigri & Desi Karahi</p>
              </div>
            </div>

          </div>

          {/* Right Column: Visual Showcase */}
          <div className="lg:col-span-5 relative">
            <div className="relative mx-auto max-w-md lg:max-w-none">
              
              {/* Main Dish Hero Image Card (Aromatic Biryani / Karahi feast) */}
              <div className="relative rounded-3xl overflow-hidden shadow-2xl border-4 border-white aspect-[4/3] group">
                <img
                  src="https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?auto=format&fit=crop&w=1000&q=80"
                  alt="Royal Pakistani Feast and Karachi Biryani"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/20 to-transparent" />
                <div className="absolute bottom-5 left-5 right-5 text-white">
                  <div className="inline-block bg-emerald-700 text-white text-xs font-bold px-2.5 py-1 rounded-md mb-1.5 shadow-sm">
                    Chef&apos;s Signature
                  </div>
                  <h3 className="font-serif text-xl font-bold">Royal Dum Biryani & Desi Karahi</h3>
                  <p className="text-xs text-slate-200 mt-0.5">Slow-cooked in clay pots with authentic spices of Lahore & Karachi</p>
                </div>
              </div>

              {/* Floating Mini Card 1: Fast Delivery */}
              <div className="absolute -top-6 -left-6 bg-white/95 backdrop-blur-md rounded-2xl p-3.5 shadow-xl border border-slate-100 hidden sm:flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-emerald-100 flex items-center justify-center text-emerald-700">
                  <Clock className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-xs font-bold text-slate-800">Hot & Freshly Sealed</div>
                  <div className="text-[11px] text-slate-500">Delivered within 35 mins</div>
                </div>
              </div>

              {/* Floating Mini Card 2: 100% Halal Verified */}
              <div className="absolute -bottom-6 -right-4 bg-white/95 backdrop-blur-md rounded-2xl p-3.5 shadow-xl border border-slate-100 flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-amber-100 flex items-center justify-center text-amber-700">
                  <ShieldCheck className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-xs font-bold text-slate-800">100% Halal Certified</div>
                  <div className="text-[11px] text-slate-500">Premium Organic Desi Ghee</div>
                </div>
              </div>

            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
