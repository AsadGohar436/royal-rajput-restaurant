'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { Dish, CartItem } from '@/types';

interface CartContextType {
  cart: CartItem[];
  addToCart: (dish: Dish) => void;
  updateQuantity: (dishId: string, quantity: number) => void;
  removeFromCart: (dishId: string) => void;
  clearCart: () => void;
  isCartOpen: boolean;
  openCart: () => void;
  closeCart: () => void;
  totalItems: number;
  subtotal: number;
  deliveryFee: number;
  gstTax: number;
  grandTotal: number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isMounted, setIsMounted] = useState(false);

  // Hydrate from localStorage on client mount
  useEffect(() => {
    setIsMounted(true);
    try {
      const saved = localStorage.getItem('royal_rajput_cart');
      if (saved) {
        setCart(JSON.parse(saved));
      }
    } catch {
      // Ignore localStorage errors
    }
  }, []);

  // Sync to localStorage
  useEffect(() => {
    if (isMounted) {
      try {
        localStorage.setItem('royal_rajput_cart', JSON.stringify(cart));
      } catch {
        // Ignore localStorage errors
      }
    }
  }, [cart, isMounted]);

  const addToCart = (dish: Dish) => {
    setCart((prev) => {
      const existing = prev.find((item) => item.dish.id === dish.id);
      if (existing) {
        return prev.map((item) =>
          item.dish.id === dish.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [...prev, { dish, quantity: 1 }];
    });
  };

  const updateQuantity = (dishId: string, quantity: number) => {
    setCart((prev) => {
      if (quantity <= 0) {
        return prev.filter((item) => item.dish.id !== dishId);
      }
      return prev.map((item) =>
        item.dish.id === dishId ? { ...item, quantity } : item
      );
    });
  };

  const removeFromCart = (dishId: string) => {
    setCart((prev) => prev.filter((item) => item.dish.id !== dishId));
  };

  const clearCart = () => {
    setCart([]);
  };

  const openCart = () => setIsCartOpen(true);
  const closeCart = () => setIsCartOpen(false);

  // Financials in Pakistani Rupees
  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
  const subtotal = cart.reduce((sum, item) => sum + item.dish.price * item.quantity, 0);
  const deliveryFee = subtotal >= 2500 || subtotal === 0 ? 0 : 180;
  const gstTax = Math.round(subtotal * 0.05);
  const grandTotal = subtotal + deliveryFee + gstTax;

  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        updateQuantity,
        removeFromCart,
        clearCart,
        isCartOpen,
        openCart,
        closeCart,
        totalItems,
        subtotal,
        deliveryFee,
        gstTax,
        grandTotal,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export function useCart() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
}
