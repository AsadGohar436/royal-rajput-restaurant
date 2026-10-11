'use client';

import React from 'react';
import Link from 'next/link';
import {
  Crown,
  Flame,
  ShieldCheck,
  Award,
  HeartHandshake,
  Users,
  CheckCircle2,
  ArrowRight,
} from 'lucide-react';

export default function AboutPage() {
  return (
    <div className="py-12 sm:py-20 space-y-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-20">
        
        {/* Hero Section */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-7 space-y-5 text-center lg:text-left">
            <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-amber-500/15 border border-amber-500/30 text-amber-400 text-xs font-bold uppercase tracking-widest">
              <Crown className="w-3.5 h-3.5" />
              The Royal Rajput Legacy
            </div>
            <h1 className="text-4xl sm:text-5xl font-black text-white tracking-tight leading-tight">
              Preserving Centuries of Imperial Subcontinental Flavors.
            </h1>
            <p className="text-slate-300 text-base sm:text-lg leading-relaxed">
              Founded on the principles of royal hospitality (<em className="text-amber-400">Mehman-Nawazi</em>), <strong className="text-white">Royal Rajput</strong> brings the opulent dining traditions of historic dynasties into the modern era.
            </p>
            <p className="text-slate-400 text-sm sm:text-base leading-relaxed">
              From the bustling food streets of Lahore to the charcoal pits of Peshawar and the royal court kitchens of the Mughals and Rajputs, our recipes have been safeguarded and handed down across generations.
            </p>
            <div className="pt-2 flex flex-wrap gap-4 justify-center lg:justify-start">
              <Link
                href="/menu"
                className="px-7 py-3.5 bg-gradient-to-r from-amber-500 to-yellow-500 text-slate-950 font-black rounded-xl text-sm uppercase tracking-wider hover:brightness-110 transition-all"
              >
                Explore Royal Menu
              </Link>
              <Link
                href="/contact"
                className="px-7 py-3.5 bg-slate-800 text-amber-300 border border-amber-500/30 font-bold rounded-xl text-sm hover:border-amber-400 transition-all"
              >
                Book a Table
              </Link>
            </div>
          </div>

          <div className="lg:col-span-5">
            <div className="relative rounded-3xl overflow-hidden border border-amber-500/30 aspect-square shadow-2xl">
              <img
                src="https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&w=1000&q=80"
                alt="Royal Rajput Master Chefs"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent" />
              <div className="absolute bottom-6 left-6 right-6">
                <span className="text-xs uppercase font-extrabold text-amber-400">
                  Established 2014 • Pakistan
                </span>
                <div className="font-serif text-xl font-bold text-white">
                  Over a Decade of Royal Culinary Craft
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* 4 Pillars of Royal Rajput */}
        <div className="space-y-8">
          <div className="text-center max-w-2xl mx-auto space-y-2">
            <span className="text-xs uppercase font-bold text-amber-400 tracking-widest">
              Uncompromising Standards
            </span>
            <h2 className="text-3xl font-black text-white">Our 4 Royal Culinary Pillars</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="royal-card p-6 rounded-2xl space-y-3">
              <div className="w-12 h-12 rounded-xl bg-amber-500/20 text-amber-400 flex items-center justify-center">
                <Flame className="w-6 h-6" />
              </div>
              <h3 className="font-bold text-lg text-white">Live Charcoal Fire</h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                We never use gas grills for our BBQ. Every skewer, chop, and tikka is grilled slowly over natural aromatic oak firewood coals.
              </p>
            </div>

            <div className="royal-card p-6 rounded-2xl space-y-3">
              <div className="w-12 h-12 rounded-xl bg-amber-500/20 text-amber-400 flex items-center justify-center">
                <ShieldCheck className="w-6 h-6" />
              </div>
              <h3 className="font-bold text-lg text-white">100% Pure Desi Ghee</h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                Our mutton and chicken karahis are simmered exclusively in organic clarified butter (Desi Ghee) sourced directly from Punjab dairy farms.
              </p>
            </div>

            <div className="royal-card p-6 rounded-2xl space-y-3">
              <div className="w-12 h-12 rounded-xl bg-amber-500/20 text-amber-400 flex items-center justify-center">
                <Crown className="w-6 h-6" />
              </div>
              <h3 className="font-bold text-lg text-white">Royal Dum Pukht</h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                Biryanis and handis are sealed with dough in copper and earthen degs to trap every vapor of saffron and hand-crushed whole spices.
              </p>
            </div>

            <div className="royal-card p-6 rounded-2xl space-y-3">
              <div className="w-12 h-12 rounded-xl bg-amber-500/20 text-amber-400 flex items-center justify-center">
                <Award className="w-6 h-6" />
              </div>
              <h3 className="font-bold text-lg text-white">Fresh Halal Prime Cuts</h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                We only procure fresh mutton from young pasture-fed lambs and prime poultry, butchered fresh daily with zero frozen compromises.
              </p>
            </div>
          </div>
        </div>

        {/* Master Chefs Narrative */}
        <div className="royal-card p-8 sm:p-12 rounded-3xl border border-amber-500/20 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          <div className="lg:col-span-5 aspect-[4/3] rounded-2xl overflow-hidden border border-slate-800">
            <img
              src="https://images.unsplash.com/photo-1577219491135-ce391730fb2c?auto=format&fit=crop&w=800&q=80"
              alt="Executive Chef"
              className="w-full h-full object-cover"
            />
          </div>

          <div className="lg:col-span-7 space-y-4">
            <span className="text-xs uppercase font-extrabold text-amber-400 tracking-wider">
              Executive Culinary Director
            </span>
            <h3 className="text-2xl sm:text-3xl font-black text-white">
              Chef Zulfiqar Rajput & The Shahi Brigade
            </h3>
            <p className="text-slate-300 text-sm leading-relaxed">
              &quot;Cooking royal Pakistani food is not merely an occupation; it is a sacred heritage. When a guest sits at the Royal Rajput dastarkhwan, they deserve nothing short of the purest clarified butter, the most fragrant long-grain basmati, and meat so tender it melts upon touch.&quot;
            </p>
            <div className="pt-2 flex items-center gap-6 text-xs text-slate-400">
              <div>
                <span className="font-bold text-white block text-sm">28+ Years</span>
                Mastering Desi Karahis & Biryani
              </div>
              <span className="text-slate-700">•</span>
              <div>
                <span className="font-bold text-white block text-sm">3 Cities</span>
                Islamabad, Lahore, Karachi
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
