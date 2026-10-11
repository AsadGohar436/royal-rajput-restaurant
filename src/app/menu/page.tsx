'use client';

import React, { useState, useMemo } from 'react';
import Link from 'next/link';
import { DISHES, MENU_CATEGORIES } from '@/data/dishes';
import { DishCard } from '@/components/DishCard';
import { useCart } from '@/context/CartContext';
import {
  Crown,
  Search,
  SlidersHorizontal,
  Flame,
  Star,
  ShoppingBag,
  ArrowRight,
} from 'lucide-react';

export default function MenuPage() {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [onlyChefSpecials, setOnlyChefSpecials] = useState<boolean>(false);
  const { totalItems, grandTotal, openCart } = useCart();

  const filteredDishes = useMemo(() => {
    return DISHES.filter((dish) => {
      const matchesCategory =
        selectedCategory === 'All' || dish.category === selectedCategory;
      const matchesSearch =
        dish.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        dish.description.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesSpecial = !onlyChefSpecials || dish.isChefSpecial;

      return matchesCategory && matchesSearch && matchesSpecial;
    });
  }, [selectedCategory, searchQuery, onlyChefSpecials]);

  return (
    <div className="py-12 sm:py-16 space-y-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Page Header */}
        <div className="text-center max-w-3xl mx-auto mb-10 space-y-3">
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-amber-500/15 border border-amber-500/30 text-amber-400 text-xs font-bold uppercase tracking-widest">
            <Crown className="w-3.5 h-3.5" />
            Imperial Dastarkhwan Selections
          </div>
          <h1 className="text-3xl sm:text-5xl font-black text-white tracking-tight">
            The Royal Rajput Menu
          </h1>
          <p className="text-slate-400 text-sm sm:text-base leading-relaxed">
            Every dish is prepared using time-honored slow-cooking methods, pure clarified butter (Desi Ghee), and fresh spices from Punjab and Khyber. Select your favorites below.
          </p>
        </div>

        {/* Search & Category Filter Toolbar */}
        <div className="royal-glass p-5 rounded-2xl border border-amber-500/20 shadow-xl mb-12 space-y-4">
          <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
            
            {/* Search Input */}
            <div className="relative w-full md:w-80">
              <Search className="w-4 h-4 text-slate-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Search biryani, karahi, kabab, chops..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-700 bg-slate-950 text-white text-sm focus:outline-none focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500 transition-all placeholder:text-slate-500"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-slate-400 hover:text-white"
                >
                  Clear
                </button>
              )}
            </div>

            {/* Quick Filters */}
            <div className="flex items-center gap-4 w-full md:w-auto justify-end">
              <label className="flex items-center gap-2 cursor-pointer text-xs sm:text-sm font-semibold text-slate-300 select-none">
                <input
                  type="checkbox"
                  checked={onlyChefSpecials}
                  onChange={(e) => setOnlyChefSpecials(e.target.checked)}
                  className="w-4 h-4 rounded text-amber-500 focus:ring-amber-500 border-slate-700 bg-slate-900"
                />
                <span className="flex items-center gap-1 text-amber-400">
                  <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                  Royal Specials Only
                </span>
              </label>

              <span className="text-xs text-slate-600 hidden sm:inline">|</span>
              <span className="text-xs font-semibold text-slate-400">
                Showing {filteredDishes.length} dishes
              </span>
            </div>

          </div>

          {/* Category Tabs */}
          <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none border-t border-slate-800 pt-3">
            {MENU_CATEGORIES.map((cat) => {
              const isActive = selectedCategory === cat;
              return (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold whitespace-nowrap transition-all ${
                    isActive
                      ? 'bg-gradient-to-r from-amber-500 to-yellow-500 text-slate-950 shadow-md shadow-amber-500/20'
                      : 'bg-slate-800/80 hover:bg-slate-800 text-slate-300 hover:text-white border border-slate-700/60'
                  }`}
                >
                  {cat}
                </button>
              );
            })}
          </div>
        </div>

        {/* Dishes Grid */}
        {filteredDishes.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {filteredDishes.map((dish) => (
              <DishCard key={dish.id} dish={dish} />
            ))}
          </div>
        ) : (
          <div className="text-center py-16 bg-slate-950 rounded-2xl border border-slate-800 max-w-lg mx-auto p-8 space-y-3">
            <SlidersHorizontal className="w-10 h-10 text-slate-600 mx-auto" />
            <h3 className="text-lg font-bold text-white">No dishes match your filter</h3>
            <p className="text-xs text-slate-400">
              Try resetting your search query or choosing another royal menu category.
            </p>
            <button
              onClick={() => {
                setSearchQuery('');
                setSelectedCategory('All');
                setOnlyChefSpecials(false);
              }}
              className="mt-2 px-4 py-2 bg-amber-500 text-slate-950 text-xs font-black rounded-lg hover:bg-amber-400 transition-colors"
            >
              Reset Filters
            </button>
          </div>
        )}

        {/* Sticky Proceed to Order Banner if user has items */}
        {totalItems > 0 && (
          <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-40 w-full max-w-md px-4">
            <div className="bg-gradient-to-r from-amber-600 via-amber-500 to-yellow-500 rounded-2xl p-4 shadow-2xl flex items-center justify-between text-slate-950 font-black">
              <div className="flex items-center gap-2">
                <ShoppingBag className="w-5 h-5" />
                <span className="text-sm">
                  {totalItems} Items • Rs. {grandTotal.toLocaleString()}
                </span>
              </div>
              <Link
                href="/order"
                className="px-4 py-2 bg-slate-950 text-amber-400 text-xs font-black uppercase rounded-xl hover:bg-slate-900 transition-colors flex items-center gap-1.5"
              >
                <span>Proceed to Order</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>
        )}

      </div>
    </div>
  );
}
