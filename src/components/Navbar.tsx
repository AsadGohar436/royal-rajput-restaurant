'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useCart } from '@/context/CartContext';
import {
  Crown,
  ShoppingBag,
  PhoneCall,
  Clock,
  Menu as MenuIcon,
  X,
  CalendarCheck,
  ChevronRight,
  Mail,
} from 'lucide-react';

export const Navbar: React.FC = () => {
  const pathname = usePathname();
  const { totalItems, grandTotal, openCart } = useCart();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { label: 'Home', href: '/' },
    { label: 'Royal Menu', href: '/menu' },
    { label: 'Order Online', href: '/order' },
    { label: 'Track Order', href: '/track' },
    { label: 'Our Heritage', href: '/about' },
    { label: 'Reservations', href: '/contact' },
  ];

  return (
    <>
      {/* Top Royal Announcement Micro-Bar */}
      <div className="bg-slate-950 border-b border-amber-900/30 text-[11px] sm:text-xs py-1.5 sm:py-2 px-3 sm:px-6 lg:px-8 text-slate-300">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row justify-between items-center gap-1.5 sm:gap-2">
          <div className="flex items-center gap-2 sm:gap-3 text-center sm:text-left">
            <span className="flex items-center gap-1.5 text-amber-400 font-semibold">
              <Crown className="w-3.5 h-3.5 shrink-0" />
              <span>Royal Rajput Fine Dining & BBQ</span>
            </span>
            <span className="hidden md:inline text-slate-600">•</span>
            <span className="hidden md:flex items-center gap-1 text-slate-400">
              <Clock className="w-3 h-3 text-amber-500 shrink-0" />
              <span>12:30 PM – 1:30 AM (Midnight BBQ)</span>
            </span>
          </div>

          <div className="flex items-center gap-2.5 sm:gap-4 text-[11px] sm:text-xs">
            <Link
              href="/track"
              className="text-amber-400 hover:text-amber-300 font-bold flex items-center gap-1 transition-colors whitespace-nowrap"
            >
              <span>🚚 Track</span>
            </Link>
            <span className="text-slate-600">•</span>
            <a
              href="https://instagram.com/royalrajput.pk"
              target="_blank"
              rel="noopener noreferrer"
              className="text-pink-400 hover:text-pink-300 font-bold flex items-center gap-1 transition-colors whitespace-nowrap"
            >
              <span>📸 Instagram</span>
            </a>
            <span className="text-slate-600">•</span>
            <Link
              href="/social"
              className="text-amber-400 hover:text-amber-300 font-bold flex items-center gap-1 transition-colors whitespace-nowrap"
            >
              <span>🔗 Social Hub</span>
            </Link>
            <span className="hidden md:inline text-slate-600">•</span>
            <Link
              href="/brand-assets"
              className="hidden md:flex items-center gap-1 font-bold text-amber-300 hover:text-amber-200 transition-colors whitespace-nowrap"
            >
              <span>🎨 DPs &amp; Banners</span>
            </Link>
            <span className="hidden lg:inline text-slate-600">•</span>
            <a
              href="mailto:asadgohar21@gmail.com"
              className="hidden lg:flex items-center gap-1 font-bold text-slate-300 hover:text-amber-300 transition-colors whitespace-nowrap"
            >
              <Mail className="w-3 h-3 text-amber-400 shrink-0" />
              <span>asadgohar21@gmail.com</span>
            </a>
          </div>
        </div>
      </div>

      {/* Main Navigation Header */}
      <header className="sticky top-0 z-40 bg-slate-900/90 backdrop-blur-xl border-b border-amber-500/20 shadow-xl transition-all">
        <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 h-16 sm:h-20 flex items-center justify-between">
          
          {/* Brand Logo & Royal Title */}
          <Link href="/" className="flex items-center gap-2.5 sm:gap-3.5 group shrink-0">
            <div className="w-9 h-9 sm:w-11 sm:h-11 rounded-xl sm:rounded-2xl bg-gradient-to-tr from-amber-600 via-amber-500 to-yellow-400 flex items-center justify-center text-slate-950 shadow-lg shadow-amber-500/20 group-hover:scale-105 transition-transform duration-300">
              <Crown className="w-5 h-5 sm:w-6 sm:h-6 stroke-[2.2]" />
            </div>
            <div>
              <div className="font-serif text-xl sm:text-2xl font-black tracking-tight gold-gradient-text uppercase leading-none">
                Royal Rajput
              </div>
              <p className="text-[9px] sm:text-[10px] uppercase tracking-widest text-amber-400/90 font-bold mt-0.5">
                Imperial Pakistani Cuisine
              </p>
            </div>
          </Link>

          {/* Desktop Nav Links */}
          <nav className="hidden lg:flex items-center gap-5 xl:gap-7 text-sm font-semibold text-slate-300">
            {navLinks.map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`relative py-1 transition-colors whitespace-nowrap ${
                    isActive
                      ? 'text-amber-400 font-bold'
                      : 'hover:text-amber-300 text-slate-300'
                  }`}
                >
                  {link.label}
                  {isActive && (
                    <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-amber-500 to-yellow-300 rounded-full" />
                  )}
                </Link>
              );
            })}
          </nav>

          {/* Right Action Icons & Buttons */}
          <div className="flex items-center gap-2 sm:gap-3">
            
            {/* View Cart / Dastarkhwan Button */}
            <button
              onClick={openCart}
              className="relative flex items-center gap-1.5 sm:gap-2.5 px-3 sm:px-4 py-2 sm:py-2.5 rounded-xl bg-slate-800/80 hover:bg-slate-800 text-amber-300 border border-amber-500/30 transition-all font-bold text-xs sm:text-sm shadow-sm hover:border-amber-400 shrink-0"
              aria-label="View Order Cart"
            >
              <ShoppingBag className="w-4 h-4 text-amber-400 shrink-0" />
              <span className="hidden sm:inline font-semibold text-xs uppercase tracking-wider text-slate-200">
                Cart
              </span>
              {totalItems > 0 && (
                <span className="flex items-center gap-1 ml-0.5">
                  <span className="bg-gradient-to-r from-amber-500 to-yellow-400 text-slate-950 text-xs font-black px-1.5 sm:px-2 py-0.5 rounded-full">
                    {totalItems}
                  </span>
                  <span className="text-amber-400 font-extrabold hidden md:inline text-xs">
                    Rs. {grandTotal.toLocaleString()}
                  </span>
                </span>
              )}
            </button>

            {/* Quick Order CTA */}
            <Link
              href="/order"
              className="hidden sm:inline-flex items-center justify-center gap-1.5 px-4 lg:px-5 py-2 sm:py-2.5 rounded-xl bg-gradient-to-r from-amber-500 via-amber-600 to-yellow-500 text-slate-950 text-xs uppercase font-extrabold tracking-wider hover:brightness-110 shadow-lg shadow-amber-500/25 transition-all shrink-0"
            >
              <span>Order Now</span>
            </Link>

            {/* Mobile Hamburger Toggle */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 rounded-xl bg-slate-800 text-slate-300 hover:text-white border border-slate-700 shrink-0"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <MenuIcon className="w-5 h-5" />}
            </button>
          </div>

        </div>

        {/* Mobile Dropdown Menu */}
        {mobileMenuOpen && (
          <div className="lg:hidden bg-slate-900 border-b border-amber-500/20 px-4 py-4 space-y-3 animate-in slide-in-from-top-2 duration-200">
            <div className="space-y-1">
              {navLinks.map((link) => {
                const isActive = pathname === link.href;
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    onClick={() => setMobileMenuOpen(false)}
                    className={`flex items-center justify-between px-3.5 py-2.5 rounded-xl text-sm font-bold transition-colors ${
                      isActive
                        ? 'bg-amber-500/15 text-amber-400 border border-amber-500/30'
                        : 'text-slate-300 hover:bg-slate-800 hover:text-white'
                    }`}
                  >
                    <span>{link.label}</span>
                    <ChevronRight className="w-4 h-4 opacity-50" />
                  </Link>
                );
              })}
            </div>

            <div className="pt-3 border-t border-slate-800 grid grid-cols-2 gap-2">
              <Link
                href="/order"
                onClick={() => setMobileMenuOpen(false)}
                className="py-2.5 text-center bg-gradient-to-r from-amber-500 to-yellow-500 text-slate-950 font-black rounded-xl text-xs uppercase tracking-wider"
              >
                Order Online
              </Link>
              <Link
                href="/contact"
                onClick={() => setMobileMenuOpen(false)}
                className="py-2.5 text-center bg-slate-800 text-amber-300 font-bold border border-amber-500/30 rounded-xl text-xs"
              >
                Book Table
              </Link>
            </div>

            <Link
              href="/brand-assets"
              onClick={() => setMobileMenuOpen(false)}
              className="w-full py-2.5 text-center bg-amber-500/15 hover:bg-amber-500/25 text-amber-300 font-bold border border-amber-500/30 rounded-xl text-xs flex items-center justify-center gap-2 transition-colors"
            >
              <span>🎨 Social Brand Kit &amp; DPs</span>
            </Link>
          </div>
        )}
      </header>
    </>
  );
};
