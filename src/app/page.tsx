'use client';

import React from 'react';
import Link from 'next/link';
import { DISHES } from '@/data/dishes';
import { DishCard } from '@/components/DishCard';
import {
  Crown,
  Sparkles,
  ArrowRight,
  Clock,
  Star,
  Flame,
  ShieldCheck,
  CalendarCheck,
  Quote,
  CheckCircle2,
} from 'lucide-react';

export default function Home() {
  const featuredDishes = DISHES.filter((d) => d.isChefSpecial).slice(0, 6);

  return (
    <div className="space-y-24 pb-20">
      
      {/* 1. Royal Hero Section */}
      <section className="relative overflow-hidden pt-8 pb-16 sm:pt-14 sm:pb-24 lg:pt-20 lg:pb-32 bg-gradient-to-b from-slate-950 via-slate-900 to-slate-900">
        {/* Decorative Golden Ambient Orbs */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-3xl h-[400px] bg-gradient-to-tr from-amber-500/10 via-yellow-500/15 to-transparent blur-3xl pointer-events-none -z-10 rounded-full" />
        <div className="absolute -top-24 right-0 w-72 sm:w-96 h-72 sm:h-96 bg-amber-600/10 blur-3xl rounded-full pointer-events-none -z-10" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-8 items-center">
            
            {/* Left Content */}
            <div className="lg:col-span-7 space-y-5 sm:space-y-6 text-center lg:text-left">
              
              {/* Crown Badge */}
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-500/15 border border-amber-500/30 text-amber-300 text-xs sm:text-sm font-bold tracking-wide shadow-sm max-w-full truncate">
                <Crown className="w-4 h-4 text-amber-400 shrink-0" />
                <span className="truncate">IMPERIAL DESI GASTRONOMY • 100% PURE DESI GHEE</span>
              </div>

              {/* Headline */}
              <div className="space-y-2">
                <div className="text-amber-400 font-extrabold uppercase tracking-widest text-xs font-sans">
                  The Royal Rajput Heritage
                </div>
                <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black text-white tracking-tight leading-[1.15]">
                  Taste The Majestic Grandeur of{' '}
                  <span className="gold-gradient-text">
                    Royal Pakistani Flavors.
                  </span>
                </h1>
              </div>

              {/* Subtitle */}
              <p className="text-slate-300 text-sm sm:text-base lg:text-lg leading-relaxed max-w-2xl mx-auto lg:mx-0">
                Immerse your senses in centuries of culinary mastery. From slow-steamed mutton dum biryanis to iron-wok desi ghee mutton karahis and Peshawari lamb chops charred over live oak coals.
              </p>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-2.5 sm:gap-3.5 pt-2">
                <Link
                  href="/menu"
                  className="w-full sm:w-auto px-6 sm:px-7 py-3.5 rounded-xl bg-gradient-to-r from-amber-500 via-amber-600 to-yellow-500 text-slate-950 font-black text-xs sm:text-sm uppercase tracking-wider shadow-xl shadow-amber-500/25 hover:brightness-110 transition-all flex items-center justify-center gap-2 group"
                >
                  <span>Explore Menu</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </Link>

                <Link
                  href="/order"
                  className="w-full sm:w-auto px-6 sm:px-7 py-3.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-bold text-xs sm:text-sm border border-amber-500/30 hover:border-amber-400 transition-all shadow-sm flex items-center justify-center gap-2"
                >
                  <span>Order Now</span>
                </Link>

                <Link
                  href="/track"
                  className="w-full sm:w-auto px-5 sm:px-6 py-3.5 rounded-xl bg-slate-900/90 hover:bg-slate-800 text-amber-300 font-bold text-xs sm:text-sm border border-slate-700 hover:border-amber-500/40 transition-all flex items-center justify-center gap-2"
                >
                  <span>🚚 Track Order</span>
                </Link>
              </div>

              {/* Value Metrics */}
              <div className="pt-6 sm:pt-8 border-t border-slate-800 grid grid-cols-3 gap-2 sm:gap-4 text-center lg:text-left">
                <div>
                  <div className="flex items-center justify-center lg:justify-start gap-1 sm:gap-1.5 text-amber-400 font-black text-base sm:text-xl lg:text-2xl">
                    <Clock className="w-4 h-4 sm:w-5 sm:h-5 text-amber-500 shrink-0" />
                    <span>30-45m</span>
                  </div>
                  <p className="text-[11px] sm:text-xs text-slate-400 mt-0.5">Warm Delivery</p>
                </div>

                <div>
                  <div className="flex items-center justify-center lg:justify-start gap-1 sm:gap-1.5 text-amber-400 font-black text-base sm:text-xl lg:text-2xl">
                    <Star className="w-4 h-4 sm:w-5 sm:h-5 fill-amber-400 text-amber-400 shrink-0" />
                    <span>4.9 / 5.0</span>
                  </div>
                  <p className="text-[11px] sm:text-xs text-slate-400 mt-0.5">5,000+ Patrons</p>
                </div>

                <div>
                  <div className="flex items-center justify-center lg:justify-start gap-1 sm:gap-1.5 text-amber-400 font-black text-base sm:text-xl lg:text-2xl">
                    <Flame className="w-4 h-4 sm:w-5 sm:h-5 text-amber-500 shrink-0" />
                    <span className="truncate">Charcoal BBQ</span>
                  </div>
                  <p className="text-[11px] sm:text-xs text-slate-400 mt-0.5">Live Sigri Pit</p>
                </div>
              </div>

            </div>

            {/* Right Visual Image Showcase */}
            <div className="lg:col-span-5 relative mt-4 lg:mt-0">
              <div className="relative mx-auto max-w-sm sm:max-w-md lg:max-w-none">
                
                {/* Main Hero Card */}
                <div className="relative rounded-3xl overflow-hidden shadow-2xl border-2 border-amber-500/30 aspect-[4/3] group">
                  <img
                    src="https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?auto=format&fit=crop&w=1000&q=80"
                    alt="Royal Rajput Special Mutton Dum Biryani"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-950/20 to-transparent" />
                  <div className="absolute bottom-4 sm:bottom-6 left-4 sm:left-6 right-4 sm:right-6 text-white">
                    <div className="inline-block bg-gradient-to-r from-amber-500 to-yellow-400 text-slate-950 text-[11px] sm:text-xs font-black px-2.5 py-0.5 sm:px-3 sm:py-1 rounded-md mb-1.5">
                      Royal Rajput Signature
                    </div>
                    <h3 className="font-serif text-lg sm:text-2xl font-bold leading-tight">Mutton Dum Biryani & Desi Karahi</h3>
                    <p className="text-[11px] sm:text-xs text-slate-300 mt-1 line-clamp-2">Slow-steamed in copper handis with saffron and cracked wild spices</p>
                  </div>
                </div>

                {/* Floating Card 1: Halal Certified */}
                <div className="absolute -top-4 sm:-top-6 -left-3 sm:-left-6 royal-glass rounded-2xl p-2.5 sm:p-4 shadow-xl hidden sm:flex items-center gap-2.5 sm:gap-3">
                  <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-xl bg-amber-500/20 text-amber-400 flex items-center justify-center shrink-0">
                    <ShieldCheck className="w-4 h-4 sm:w-5 sm:h-5" />
                  </div>
                  <div>
                    <div className="text-xs font-bold text-white">100% Halal Prime Cuts</div>
                    <div className="text-[10px] sm:text-[11px] text-slate-400">Pure Organic Desi Ghee</div>
                  </div>
                </div>

                {/* Floating Card 2: Rating */}
                <div className="absolute -bottom-4 right-1 sm:-bottom-6 sm:-right-4 royal-glass rounded-2xl p-2.5 sm:p-4 shadow-xl flex items-center gap-2 sm:gap-3 max-w-[calc(100%-1rem)]">
                  <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-xl bg-amber-500/20 text-amber-400 flex items-center justify-center shrink-0">
                    <Star className="w-4 h-4 sm:w-5 sm:h-5 fill-amber-400" />
                  </div>
                  <div>
                    <div className="text-xs font-bold text-white">Rated #1 Fine Dining</div>
                    <div className="text-[10px] sm:text-[11px] text-slate-400 truncate">Islamabad, Lahore & Karachi</div>
                  </div>
                </div>

              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 2. Featured Signature Dishes Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-400 text-xs font-bold uppercase tracking-wider mb-2">
              <Crown className="w-3.5 h-3.5" />
              Royal Rajput Masterpieces
            </div>
            <h2 className="text-3xl sm:text-4xl font-black text-white tracking-tight">
              Featured Chef Specials
            </h2>
            <p className="mt-2 text-slate-400 text-sm sm:text-base max-w-xl">
              Hand-selected royal dishes cooked with time-honored slow-braising and charcoal-charring techniques.
            </p>
          </div>

          <Link
            href="/menu"
            className="inline-flex items-center gap-2 text-sm font-bold text-amber-400 hover:text-amber-300 transition-colors"
          >
            <span>View Full 12-Dish Menu</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {featuredDishes.map((dish) => (
            <DishCard key={dish.id} dish={dish} />
          ))}
        </div>
      </section>

      {/* 3. The Royal Rajput Culinary Heritage Teaser */}
      <section className="bg-slate-950 border-y border-amber-900/30 py-20 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            <div className="lg:col-span-6 space-y-6">
              <div className="inline-block text-amber-400 font-extrabold uppercase tracking-widest text-xs">
                About Our Royal Dynasty
              </div>
              <h2 className="text-3xl sm:text-4xl font-black text-white tracking-tight leading-tight">
                Crafted for Kings, Perfected for You.
              </h2>
              <p className="text-slate-300 leading-relaxed text-base">
                <strong className="text-amber-400">Royal Rajput</strong> honors the regal banquets of subcontinental history. Our chefs preserve centuries-old secret spice blends, sourcing organic clarified butter (Desi Ghee) directly from Punjab dairies and grilling over genuine timber coals.
              </p>

              <div className="grid grid-cols-2 gap-4 pt-2">
                <div className="p-4 rounded-2xl bg-slate-900 border border-slate-800 space-y-1">
                  <div className="text-amber-400 font-black text-2xl">100%</div>
                  <div className="text-xs font-bold text-white uppercase">Halal & Fresh Meat</div>
                  <p className="text-[11px] text-slate-400">Slaughtered fresh daily</p>
                </div>
                <div className="p-4 rounded-2xl bg-slate-900 border border-slate-800 space-y-1">
                  <div className="text-amber-400 font-black text-2xl">800°F</div>
                  <div className="text-xs font-bold text-white uppercase">Earthen Clay Tandoors</div>
                  <p className="text-[11px] text-slate-400">Baking fluffy sesame naans</p>
                </div>
              </div>

              <div className="pt-2">
                <Link
                  href="/about"
                  className="inline-flex items-center gap-2 text-sm font-bold text-amber-400 hover:text-amber-300"
                >
                  <span>Read our full culinary heritage story</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>

            <div className="lg:col-span-6">
              <div className="relative rounded-3xl overflow-hidden border border-amber-500/30 aspect-[16/10] shadow-2xl">
                <img
                  src="https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=1000&q=80"
                  alt="Royal Rajput Fine Dining Hall"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent" />
                <div className="absolute bottom-6 left-6 right-6">
                  <span className="text-xs uppercase font-extrabold text-amber-400 tracking-wider">
                    Islamabad • Lahore • Karachi
                  </span>
                  <div className="font-serif text-xl font-bold text-white">
                    Unrivaled Mehman-Nawazi & Ambience
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 3.5. Official Social Media Highlights & Viral Kitchen Reels */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-4">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-pink-500/10 border border-pink-500/30 text-pink-400 text-xs font-bold uppercase tracking-wider mb-2">
              <Sparkles className="w-3.5 h-3.5" />
              Live On Instagram, TikTok &amp; Facebook
            </div>
            <h2 className="text-3xl sm:text-4xl font-black text-white tracking-tight">
              Latest From Our Imperial Kitchen &amp; Social Feeds
            </h2>
            <p className="mt-2 text-slate-400 text-sm sm:text-base max-w-xl">
              Catch our daily behind-the-scenes sizzle, grand opening highlights, and limited-time deals across our official social channels.
            </p>
          </div>
          <Link
            href="/social"
            className="inline-flex items-center gap-2 text-sm font-bold text-amber-400 hover:text-amber-300 transition-colors"
          >
            <span>Visit All-in-One Social Hub</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          
          {/* Item 1: Grand Opening */}
          <div className="bg-slate-900 border border-amber-500/30 rounded-2xl overflow-hidden flex flex-col justify-between hover:scale-[1.02] transition-transform duration-300 shadow-xl group">
            <div className="relative aspect-square overflow-hidden bg-slate-950">
              <img
                src="/images/post1_grand_opening.jpg"
                alt="Royal Rajput Grand Opening Post"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute top-2.5 left-2.5 bg-amber-500/90 text-slate-950 text-[10px] font-black px-2 py-0.5 rounded-full shadow">
                Day 1 • 12:30 PM
              </div>
              <div className="absolute bottom-2.5 right-2.5 bg-slate-950/80 backdrop-blur-md text-amber-300 text-[10px] font-bold px-2 py-0.5 rounded border border-amber-500/30">
                Opening Post
              </div>
            </div>
            <div className="p-4 flex-1 flex flex-col justify-between space-y-3">
              <div>
                <h3 className="font-serif text-sm font-bold text-white group-hover:text-amber-400 transition-colors">
                  Grand Opening &amp; Royal Menu Reveal
                </h3>
                <p className="text-xs text-slate-400 mt-1 line-clamp-2">
                  Slow-steamed saffron biryani and iron-wok karahi arrive across Pakistan.
                </p>
              </div>
              <a
                href="https://instagram.com/royalrajput.pk"
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-2 px-3 rounded-xl bg-pink-500/10 hover:bg-pink-500/20 text-pink-300 border border-pink-500/30 text-xs font-bold text-center transition-all flex items-center justify-center gap-1.5"
              >
                <span>Follow on Instagram</span>
              </a>
            </div>
          </div>

          {/* Item 2: Karahi Cooking Reel */}
          <div className="bg-slate-900 border border-pink-500/40 rounded-2xl overflow-hidden flex flex-col justify-between hover:scale-[1.02] transition-transform duration-300 shadow-xl group">
            <div className="relative aspect-square overflow-hidden bg-slate-950">
              <img
                src="/images/reel1_cooking_karahi.jpg"
                alt="Pure Desi Ghee Karahi Reel"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute top-2.5 left-2.5 bg-rose-500 text-white text-[10px] font-black px-2 py-0.5 rounded-full shadow">
                Day 1 • 8:00 PM
              </div>
              <div className="absolute bottom-2.5 right-2.5 bg-slate-950/80 backdrop-blur-md text-pink-300 text-[10px] font-bold px-2 py-0.5 rounded border border-pink-500/30">
                Viral Kitchen Reel 🎥
              </div>
            </div>
            <div className="p-4 flex-1 flex flex-col justify-between space-y-3">
              <div>
                <h3 className="font-serif text-sm font-bold text-white group-hover:text-pink-400 transition-colors">
                  Pure Desi Ghee Karahi Over Roaring Coals
                </h3>
                <p className="text-xs text-slate-400 mt-1 line-clamp-2">
                  Behind the scenes cooking sizzle tossed in heavy iron woks by royal ustads.
                </p>
              </div>
              <a
                href="https://tiktok.com/@royalrajput.pk"
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-2 px-3 rounded-xl bg-cyan-500/10 hover:bg-cyan-500/20 text-cyan-300 border border-cyan-500/30 text-xs font-bold text-center transition-all flex items-center justify-center gap-1.5"
              >
                <span>Watch on TikTok</span>
              </a>
            </div>
          </div>

          {/* Item 3: Today's Deal */}
          <div className="bg-slate-900 border border-blue-500/30 rounded-2xl overflow-hidden flex flex-col justify-between hover:scale-[1.02] transition-transform duration-300 shadow-xl group">
            <div className="relative aspect-square overflow-hidden bg-slate-950">
              <img
                src="/images/post2_todays_deal.jpg"
                alt="Royal Rajput Today Deal"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute top-2.5 left-2.5 bg-blue-500 text-white text-[10px] font-black px-2 py-0.5 rounded-full shadow">
                Day 2 • 1:00 PM
              </div>
              <div className="absolute bottom-2.5 right-2.5 bg-slate-950/80 backdrop-blur-md text-blue-300 text-[10px] font-bold px-2 py-0.5 rounded border border-blue-500/30">
                20% OFF Deal ⚡
              </div>
            </div>
            <div className="p-4 flex-1 flex flex-col justify-between space-y-3">
              <div>
                <h3 className="font-serif text-sm font-bold text-white group-hover:text-blue-400 transition-colors">
                  Royal Lunch Feast — Today&apos;s Deal
                </h3>
                <p className="text-xs text-slate-400 mt-1 line-clamp-2">
                  Special biryani, seekh kababs &amp; hot roghani naan lunch platter deal.
                </p>
              </div>
              <Link
                href="/order"
                className="w-full py-2 px-3 rounded-xl bg-amber-500/10 hover:bg-amber-500/20 text-amber-300 border border-amber-500/30 text-xs font-bold text-center transition-all flex items-center justify-center gap-1.5"
              >
                <span>Order Deal Now</span>
              </Link>
            </div>
          </div>

          {/* Item 4: Customer Favourite */}
          <div className="bg-slate-900 border border-emerald-500/30 rounded-2xl overflow-hidden flex flex-col justify-between hover:scale-[1.02] transition-transform duration-300 shadow-xl group">
            <div className="relative aspect-square overflow-hidden bg-slate-950">
              <img
                src="/images/post3_customer_favourite.jpg"
                alt="Royal Rajput Customer Favourite"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute top-2.5 left-2.5 bg-emerald-500 text-slate-950 text-[10px] font-black px-2 py-0.5 rounded-full shadow">
                Day 3 • 7:30 PM
              </div>
              <div className="absolute bottom-2.5 right-2.5 bg-slate-950/80 backdrop-blur-md text-emerald-300 text-[10px] font-bold px-2 py-0.5 rounded border border-emerald-500/30">
                Rated 4.9 ★
              </div>
            </div>
            <div className="p-4 flex-1 flex flex-col justify-between space-y-3">
              <div>
                <h3 className="font-serif text-sm font-bold text-white group-hover:text-emerald-400 transition-colors">
                  Crowned by You: The #1 Favourite
                </h3>
                <p className="text-xs text-slate-400 mt-1 line-clamp-2">
                  Peshawari Shinwari lamb chops and mutton dum biryani rated #1 in dining.
                </p>
              </div>
              <a
                href="https://facebook.com/royalrajput.pk"
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-2 px-3 rounded-xl bg-blue-500/10 hover:bg-blue-500/20 text-blue-300 border border-blue-500/30 text-xs font-bold text-center transition-all flex items-center justify-center gap-1.5"
              >
                <span>View on Facebook</span>
              </a>
            </div>
          </div>

        </div>
      </section>

      {/* 4. Testimonials from Food Connoisseurs */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-14">
          <div className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-amber-500/10 text-amber-400 text-xs font-bold uppercase tracking-wider mb-2">
            <Quote className="w-3.5 h-3.5" />
            Royal Praise
          </div>
          <h2 className="text-3xl sm:text-4xl font-black text-white tracking-tight">
            Loved By Pakistani Food Connoisseurs
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="royal-card p-6 rounded-2xl space-y-4">
            <div className="flex text-amber-400 gap-1">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-4 h-4 fill-amber-400" />
              ))}
            </div>
            <p className="text-slate-300 text-sm leading-relaxed italic">
              &quot;The Desi Ghee Mutton Karahi is the finest in Islamabad. Rich, perfectly spiced, and the mutton was melting off the bone. A true royal treat.&quot;
            </p>
            <div className="pt-2 border-t border-slate-800">
              <div className="text-sm font-bold text-white">Malik Usman Qureshi</div>
              <div className="text-xs text-slate-500">Islamabad, Sector F-7</div>
            </div>
          </div>

          <div className="royal-card p-6 rounded-2xl space-y-4">
            <div className="flex text-amber-400 gap-1">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-4 h-4 fill-amber-400" />
              ))}
            </div>
            <p className="text-slate-300 text-sm leading-relaxed italic">
              &quot;Their Mutton Dum Biryani has an unmatched aroma. We ordered for a 20-person family dinner in Lahore and the delivery arrived piping hot.&quot;
            </p>
            <div className="pt-2 border-t border-slate-800">
              <div className="text-sm font-bold text-white">Syeda Ayesha Gilani</div>
              <div className="text-xs text-slate-500">Lahore, Gulberg III</div>
            </div>
          </div>

          <div className="royal-card p-6 rounded-2xl space-y-4">
            <div className="flex text-amber-400 gap-1">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-4 h-4 fill-amber-400" />
              ))}
            </div>
            <p className="text-slate-300 text-sm leading-relaxed italic">
              &quot;The Shinwari Lamb Chops and Charcoal Malai Boti are unmatched. The online order system was seamless and payment on delivery was very convenient.&quot;
            </p>
            <div className="pt-2 border-t border-slate-800">
              <div className="text-sm font-bold text-white">Dr. Kamran Siddiqui</div>
              <div className="text-xs text-slate-500">Karachi, DHA Phase 6</div>
            </div>
          </div>
        </div>
      </section>

      {/* 5. Direct Order & Table Reservation Call to Action Banner */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative rounded-3xl overflow-hidden bg-gradient-to-r from-amber-600 via-amber-700 to-yellow-600 p-8 sm:p-14 text-center sm:text-left text-slate-950 shadow-2xl flex flex-col sm:flex-row items-center justify-between gap-8">
          <div className="space-y-3 max-w-xl">
            <div className="inline-block bg-slate-950 text-amber-300 text-xs font-black px-3 py-1 rounded-full uppercase tracking-wider">
              Ready for a Feast?
            </div>
            <h2 className="text-3xl sm:text-4xl font-black tracking-tight text-slate-950">
              Experience Royal Rajput Tonight.
            </h2>
            <p className="text-sm sm:text-base font-semibold text-slate-900/90 leading-relaxed">
              Order your favorite dishes online for 30-45 minute doorstep delivery or book an exclusive table for your family gathering.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto shrink-0">
            <Link
              href="/order"
              className="px-8 py-4 bg-slate-950 hover:bg-slate-900 text-amber-400 font-black rounded-xl text-sm shadow-xl text-center transition-all"
            >
              Order Online Now
            </Link>
            <Link
              href="/contact"
              className="px-8 py-4 bg-white/20 hover:bg-white/30 text-slate-950 font-black border border-slate-950/20 rounded-xl text-sm text-center transition-all"
            >
              Book a Table
            </Link>
          </div>
        </div>
      </section>

    </div>
  );
}
