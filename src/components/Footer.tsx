'use client';

import React from 'react';
import Link from 'next/link';
import { Crown, Phone, Mail, MapPin, Clock, ShieldCheck, Heart } from 'lucide-react';
import { SOCIAL_CONFIG } from '@/data/social';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-slate-950 text-slate-400 text-sm mt-auto border-t border-amber-900/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 sm:gap-10">
          
          {/* Brand Col */}
          <div className="space-y-4">
            <Link href="/" className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-amber-600 to-yellow-500 flex items-center justify-center text-slate-950 shadow-md">
                <Crown className="w-5 h-5" />
              </div>
              <span className="font-serif text-2xl font-black gold-gradient-text uppercase tracking-tight">
                Royal Rajput
              </span>
            </Link>
            <p className="text-slate-400 text-xs sm:text-sm leading-relaxed">
              Imperial Pakistani fine dining, authentic desi ghee karahis, and live natural charcoal BBQ preserving royal Mughlai & Rajput culinary lineages.
            </p>
            <div className="flex items-center gap-2">
              <span className="px-3 py-1 rounded-full bg-amber-500/10 text-xs text-amber-400 font-bold border border-amber-500/30 inline-flex items-center gap-1.5">
                <ShieldCheck className="w-3.5 h-3.5" />
                100% Halal Verified Pakistan
              </span>
            </div>

            {/* Interconnected Social Media Presence */}
            <div className="pt-2">
              <span className="text-[11px] font-bold text-amber-400 uppercase tracking-wider block mb-2">
                Connect With Us
              </span>
              <div className="flex flex-wrap items-center gap-2">
                {SOCIAL_CONFIG.links.map((s) => (
                  <a
                    key={s.name}
                    href={s.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    title={s.description}
                    className={`px-2.5 py-1 rounded-lg border text-xs font-bold transition-all flex items-center gap-1.5 ${s.bgColor} ${s.color}`}
                  >
                    <span>{s.name}</span>
                  </a>
                ))}
              </div>
            </div>
          </div>

          {/* Quick Page Links */}
          <div className="space-y-3">
            <h4 className="text-white font-bold uppercase tracking-wider text-xs">
              Explore Our Restaurant
            </h4>
            <ul className="space-y-2 text-xs sm:text-sm">
              <li>
                <Link href="/" className="hover:text-amber-400 transition-colors">
                  Home & Highlights
                </Link>
              </li>
              <li>
                <Link href="/menu" className="hover:text-amber-400 transition-colors">
                  Royal Desi Menu (12 Dishes)
                </Link>
              </li>
              <li>
                <Link href="/order" className="hover:text-amber-400 transition-colors">
                  Order Online for Delivery
                </Link>
              </li>
              <li>
                <Link href="/track" className="text-amber-400 font-semibold hover:text-amber-300 transition-colors">
                  Track Order (Daraz Style)
                </Link>
              </li>
              <li>
                <Link href="/about" className="hover:text-amber-400 transition-colors">
                  Our Rajput Heritage & Philosophy
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-amber-400 transition-colors">
                  Table Reservations & Branches
                </Link>
              </li>
              <li>
                <Link href="/social" className="text-amber-400 font-bold hover:text-amber-300 transition-colors flex items-center gap-1.5">
                  <span>🔗 Social Bio Hub (All Links)</span>
                </Link>
              </li>
              <li>
                <Link href="/brand-assets" className="text-amber-400/90 font-semibold hover:text-amber-300 transition-colors">
                  Social Brand Kit &amp; DPs
                </Link>
              </li>
              <li>
                <Link href="/admin" className="text-amber-400/80 hover:text-amber-300 transition-colors font-medium">
                  Admin Portal (Password Protected)
                </Link>
              </li>
            </ul>
          </div>

          {/* Operating Hours */}
          <div className="space-y-3">
            <h4 className="text-white font-bold uppercase tracking-wider text-xs">
              Dining & Delivery Hours
            </h4>
            <div className="space-y-2.5 text-xs sm:text-sm">
              <div className="flex items-start gap-2.5">
                <Clock className="w-4 h-4 text-amber-500 shrink-0 mt-0.5" />
                <div>
                  <div className="text-slate-200 font-semibold">Lunch & Family Dinner</div>
                  <div className="text-slate-400 text-xs">12:30 PM – 11:30 PM Daily</div>
                </div>
              </div>
              <div className="flex items-start gap-2.5">
                <Clock className="w-4 h-4 text-amber-500 shrink-0 mt-0.5" />
                <div>
                  <div className="text-slate-200 font-semibold">Midnight Charcoal BBQ</div>
                  <div className="text-slate-400 text-xs">Until 1:30 AM (Thursday - Sunday)</div>
                </div>
              </div>
            </div>
          </div>

          {/* Contact Details in Pakistan */}
          <div className="space-y-3">
            <h4 className="text-white font-bold uppercase tracking-wider text-xs">
              Royal Rajput Branches
            </h4>
            <ul className="space-y-2.5 text-xs sm:text-sm">
              <li className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-amber-500 shrink-0 mt-0.5" />
                <div>
                  <strong className="text-slate-300 block">Islamabad Branch:</strong>
                  <span>Plot 18, Beverly Centre, Blue Area & F-7 Markaz</span>
                </div>
              </li>
              <li className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-amber-500 shrink-0 mt-0.5" />
                <div>
                  <strong className="text-slate-300 block">Lahore Branch:</strong>
                  <span>MM Alam Road, Gulberg III</span>
                </div>
              </li>
              <li className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-amber-500 shrink-0" />
                <a href="tel:+923001234567" className="hover:text-white transition-colors">
                  +92 300 1234567 / +92 51 2345678
                </a>
              </li>
              <li className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 text-amber-500 shrink-0" />
                <a href="mailto:asadgohar21@gmail.com" className="hover:text-amber-400 transition-colors truncate">
                  asadgohar21@gmail.com
                </a>
              </li>
            </ul>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="mt-8 sm:mt-12 pt-6 sm:pt-8 border-t border-slate-900 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500 gap-3 sm:gap-4 text-center sm:text-left">
          <p>© {new Date().getFullYear()} Royal Rajput Fine Dining Pakistan. All rights reserved.</p>
          <div className="flex items-center gap-3 sm:gap-4">
            <Link href="/privacy" className="hover:text-slate-300 transition-colors">
              Privacy Policy
            </Link>
            <span>•</span>
            <Link href="/admin" className="hover:text-amber-400 transition-colors">
              Admin Console (Locked)
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};
