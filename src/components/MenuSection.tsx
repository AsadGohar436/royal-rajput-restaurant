'use client';

import React, { useState, useMemo } from 'react';
import { Dish, CartItem } from '@/types';
import { DISHES, MENU_CATEGORIES } from '@/data/dishes';
import { DishCard } from './DishCard';
import { Search, SlidersHorizontal, Flame, Star } from 'lucide-react';

interface MenuSectionProps {
  cart: CartItem[];
  onAddToCart: (dish: Dish) => void;
  onUpdateQuantity: (dishId: string, quantity: number) => void;
}

export const MenuSection: React.FC<MenuSectionProps> = ({
  cart,
  onAddToCart,
  onUpdateQuantity,
}) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [onlyChefSpecials, setOnlyChefSpecials] = useState<boolean>(false);

  // Map cart items to quick lookup of quantity
  const cartQuantities = useMemo(() => {
    const map = new Map<string, number>();
    cart.forEach((item) => {
      map.set(item.dish.id, item.quantity);
    });
    return map;
  }, [cart]);

  // Filter dishes based on category, search text, and chef special toggle
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
    <section id="menu" className="py-20 bg-slate-50 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-emerald-100 text-emerald-900 text-xs font-bold uppercase tracking-wider mb-3">
            <Flame className="w-3.5 h-3.5 text-rose-600" />
            Authentic Pakistani Flavors
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            Explore Our Royal Dastarkhwan
          </h2>
          <p className="mt-3 text-slate-600 text-base sm:text-lg">
            Every dish is cooked fresh upon ordering using pure desi ghee, premium spices from Punjab & KPK, and tender halal meat. Select your favorites below.
          </p>
        </div>

        {/* Filter & Search Bar Toolbar */}
        <div className="bg-white p-4 sm:p-5 rounded-2xl border border-slate-200/80 shadow-sm mb-10 space-y-4">
          <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
            
            {/* Search Input */}
            <div className="relative w-full md:w-80">
              <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Search biryani, karahi, kabab, naan..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-600 transition-all placeholder:text-slate-400"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-slate-400 hover:text-slate-600"
                >
                  Clear
                </button>
              )}
            </div>

            {/* Quick Filters */}
            <div className="flex items-center gap-4 w-full md:w-auto justify-end">
              <label className="flex items-center gap-2 cursor-pointer text-xs sm:text-sm font-medium text-slate-700 select-none">
                <input
                  type="checkbox"
                  checked={onlyChefSpecials}
                  onChange={(e) => setOnlyChefSpecials(e.target.checked)}
                  className="w-4 h-4 rounded text-emerald-700 focus:ring-emerald-600 border-slate-300"
                />
                <span className="flex items-center gap-1 font-semibold text-emerald-900">
                  <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-500" /> Chef&apos;s Specials Only
                </span>
              </label>

              <span className="text-xs text-slate-400 hidden sm:inline">|</span>
              <span className="text-xs font-semibold text-slate-500">
                Showing {filteredDishes.length} dishes
              </span>
            </div>

          </div>

          {/* Category Tabs */}
          <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none border-t border-slate-100 pt-3">
            {MENU_CATEGORIES.map((cat) => {
              const isActive = selectedCategory === cat;
              return (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold whitespace-nowrap transition-all ${
                    isActive
                      ? 'bg-emerald-700 text-white shadow-md shadow-emerald-700/25'
                      : 'bg-slate-100 hover:bg-slate-200 text-slate-700 hover:text-slate-900'
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
              <DishCard
                key={dish.id}
                dish={dish}
                currentQuantity={cartQuantities.get(dish.id) || 0}
                onAddToCart={onAddToCart}
                onUpdateQuantity={onUpdateQuantity}
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-16 bg-white rounded-2xl border border-slate-200 max-w-lg mx-auto p-8">
            <SlidersHorizontal className="w-12 h-12 text-slate-300 mx-auto mb-3" />
            <h3 className="text-lg font-bold text-slate-800">No dishes match your filter</h3>
            <p className="text-sm text-slate-500 mt-1">
              Try resetting your search query or selecting another category.
            </p>
            <button
              onClick={() => {
                setSearchQuery('');
                setSelectedCategory('All');
                setOnlyChefSpecials(false);
              }}
              className="mt-4 px-4 py-2 bg-emerald-700 text-white text-xs font-bold rounded-lg hover:bg-emerald-800 transition-colors"
            >
              Reset Filters
            </button>
          </div>
        )}

      </div>
    </section>
  );
};
