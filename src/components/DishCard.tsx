'use client';

import React from 'react';
import { Dish } from '@/types';
import { useCart } from '@/context/CartContext';
import { Plus, Minus, Check, Star, Flame, Users } from 'lucide-react';

interface DishCardProps {
  dish: Dish;
  // Optional custom overrides, defaults to global CartContext
  currentQuantity?: number;
  onAddToCart?: (dish: Dish) => void;
  onUpdateQuantity?: (dishId: string, quantity: number) => void;
}

export const DishCard: React.FC<DishCardProps> = ({
  dish,
  currentQuantity: propQuantity,
  onAddToCart: propAddToCart,
  onUpdateQuantity: propUpdateQuantity,
}) => {
  const { cart, addToCart: ctxAddToCart, updateQuantity: ctxUpdateQuantity } = useCart();

  // Find quantity in cart if not provided as prop
  const currentQuantity =
    propQuantity !== undefined
      ? propQuantity
      : cart.find((i) => i.dish.id === dish.id)?.quantity || 0;

  const handleAdd = () => {
    if (propAddToCart) propAddToCart(dish);
    else ctxAddToCart(dish);
  };

  const handleUpdate = (qty: number) => {
    if (propUpdateQuantity) propUpdateQuantity(dish.id, qty);
    else ctxUpdateQuantity(dish.id, qty);
  };

  return (
    <div className="group royal-card rounded-2xl overflow-hidden flex flex-col justify-between hover:scale-[1.01] duration-300">
      {/* Dish Image Container */}
      <div className="relative aspect-[16/10] overflow-hidden bg-slate-800">
        <img
          src={dish.image}
          alt={dish.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-slate-950/20 to-transparent" />

        {/* Badges Overlay */}
        <div className="absolute top-3 left-3 flex flex-wrap gap-1.5">
          {dish.isChefSpecial && (
            <span className="inline-flex items-center gap-1 bg-gradient-to-r from-amber-500 to-yellow-400 text-slate-950 text-[11px] font-black px-2.5 py-1 rounded-full shadow-md">
              <Star className="w-3 h-3 fill-slate-950" />
              Royal Special
            </span>
          )}
          {dish.spiceLevel && (
            <span className="inline-flex items-center gap-1 bg-rose-900/90 border border-rose-500/40 text-rose-200 text-[11px] font-bold px-2.5 py-1 rounded-full shadow-md">
              <Flame className="w-3 h-3 text-rose-400" />
              {dish.spiceLevel}
            </span>
          )}
        </div>

        {/* Category Pill on Image Bottom Right */}
        <div className="absolute bottom-3 right-3 bg-slate-950/80 backdrop-blur-md text-amber-300 text-[11px] font-bold px-2.5 py-0.5 rounded-md border border-amber-500/30">
          {dish.category}
        </div>
      </div>

      {/* Card Content Details */}
      <div className="p-5 flex-1 flex flex-col justify-between">
        <div>
          {/* Dish Name & Price Header */}
          <div className="flex items-start justify-between gap-2 mb-2">
            <h3 className="font-serif text-lg font-bold text-white group-hover:text-amber-400 transition-colors leading-snug">
              {dish.name}
            </h3>
            <div className="text-right whitespace-nowrap">
              <span className="text-lg font-black text-amber-400">
                Rs. {dish.price.toLocaleString()}
              </span>
            </div>
          </div>

          {/* Description */}
          <p className="text-slate-400 text-xs sm:text-sm line-clamp-2 leading-relaxed mb-4">
            {dish.description}
          </p>

          {/* Meta Information: Serving size, prep time & calories */}
          <div className="flex flex-wrap items-center gap-2.5 text-[11px] text-slate-400 font-medium mb-4">
            {dish.servingSize && (
              <span className="inline-flex items-center gap-1 bg-slate-800/80 px-2 py-0.5 rounded text-amber-300/90 border border-slate-700">
                <Users className="w-3 h-3 text-amber-400" />
                {dish.servingSize}
              </span>
            )}
            {dish.prepTime && <span>• {dish.prepTime}</span>}
            {dish.calories && <span>• {dish.calories} kcal</span>}
          </div>
        </div>

        {/* Quantity Controls / Add to Order Button */}
        <div className="pt-3 border-t border-slate-800 mt-auto">
          {currentQuantity === 0 ? (
            <button
              onClick={handleAdd}
              className="w-full py-2.5 px-4 rounded-xl bg-amber-500/10 hover:bg-gradient-to-r hover:from-amber-500 hover:to-yellow-500 text-amber-300 hover:text-slate-950 border border-amber-500/30 hover:border-transparent font-bold text-sm transition-all duration-200 flex items-center justify-center gap-2 group/btn"
              aria-label={`Add ${dish.name} to order`}
            >
              <Plus className="w-4 h-4 transition-transform group-hover/btn:rotate-90" />
              <span>Add to Dastarkhwan</span>
            </button>
          ) : (
            <div className="flex items-center justify-between bg-amber-500/10 rounded-xl p-1 sm:p-1.5 border border-amber-500/30">
              <button
                onClick={() => handleUpdate(currentQuantity - 1)}
                className="w-7 h-7 sm:w-8 sm:h-8 rounded-lg bg-slate-800 text-amber-300 hover:bg-slate-700 flex items-center justify-center font-bold shadow-sm transition-colors shrink-0"
                aria-label="Decrease quantity"
              >
                <Minus className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
              </button>

              <div className="flex items-center gap-1 sm:gap-1.5 px-1 sm:px-2 min-w-0">
                <Check className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-emerald-400 font-bold shrink-0" />
                <span className="font-bold text-xs sm:text-sm text-white truncate">
                  {currentQuantity} <span className="hidden sm:inline">in cart</span>
                </span>
                <span className="text-[11px] sm:text-xs text-amber-400 font-semibold ml-0.5 whitespace-nowrap">
                  (Rs. {(dish.price * currentQuantity).toLocaleString()})
                </span>
              </div>

              <button
                onClick={() => handleUpdate(currentQuantity + 1)}
                className="w-7 h-7 sm:w-8 sm:h-8 rounded-lg bg-amber-500 text-slate-950 hover:bg-amber-400 flex items-center justify-center font-bold shadow-sm transition-colors shrink-0"
                aria-label="Increase quantity"
              >
                <Plus className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
