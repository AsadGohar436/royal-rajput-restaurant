'use client';

import React, { useState } from 'react';
import { Share2, X, ExternalLink, Mail, Instagram, Facebook, Crown, Sparkles } from 'lucide-react';
import { SOCIAL_CONFIG } from '@/data/social';
import Link from 'next/link';

export const FloatingWhatsApp: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="fixed bottom-6 right-6 z-40 flex flex-col items-end">
      
      {/* Expanded Quick Social Connect Card */}
      {isOpen && (
        <div className="mb-3 w-80 bg-slate-900/95 backdrop-blur-xl border border-amber-500/30 rounded-2xl shadow-2xl overflow-hidden p-4 text-slate-100 animate-in fade-in slide-in-from-bottom-4 duration-200">
          <div className="flex items-center justify-between pb-3 border-b border-slate-800">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-amber-500 to-yellow-500 flex items-center justify-center text-slate-950 shadow-md">
                <Crown className="w-4 h-4 stroke-[2.2]" />
              </div>
              <div>
                <h4 className="text-sm font-bold text-white leading-tight">Royal Rajput Connect</h4>
                <span className="text-[10px] text-amber-400 font-medium flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-pulse" />
                  Official Social Channels
                </span>
              </div>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="text-slate-400 hover:text-white p-1 rounded-lg transition-colors"
              aria-label="Close"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          <div className="py-3 text-xs text-slate-300 space-y-2.5">
            <p className="bg-slate-950/70 p-2.5 rounded-xl border border-slate-800 text-slate-200 leading-relaxed text-[11px]">
              Follow our official media channels, order fresh karahis online, or reach out to our management.
            </p>

            {/* Quick Action Links */}
            <div className="space-y-1.5">
              <a
                href="https://instagram.com/royalrajput.pk"
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-2 px-3 rounded-xl bg-pink-500/10 hover:bg-pink-500/20 text-pink-300 border border-pink-500/30 font-bold text-xs flex items-center justify-between transition-colors"
              >
                <div className="flex items-center gap-2">
                  <Instagram className="w-3.5 h-3.5" />
                  <span>Instagram (@royalrajput.pk)</span>
                </div>
                <ExternalLink className="w-3 h-3 opacity-60" />
              </a>

              <a
                href="https://facebook.com/royalrajput.pk"
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-2 px-3 rounded-xl bg-blue-500/10 hover:bg-blue-500/20 text-blue-300 border border-blue-500/30 font-bold text-xs flex items-center justify-between transition-colors"
              >
                <div className="flex items-center gap-2">
                  <Facebook className="w-3.5 h-3.5" />
                  <span>Facebook (Royal Rajput)</span>
                </div>
                <ExternalLink className="w-3 h-3 opacity-60" />
              </a>

              <a
                href="mailto:asadgohar21@gmail.com"
                className="w-full py-2 px-3 rounded-xl bg-amber-500/10 hover:bg-amber-500/20 text-amber-300 border border-amber-500/30 font-bold text-xs flex items-center justify-between transition-colors"
              >
                <div className="flex items-center gap-2">
                  <Mail className="w-3.5 h-3.5" />
                  <span>Email: asadgohar21@gmail.com</span>
                </div>
                <ExternalLink className="w-3 h-3 opacity-60" />
              </a>
            </div>

            <Link
              href="/brand-assets"
              onClick={() => setIsOpen(false)}
              className="w-full py-2 px-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-amber-300 text-center block text-[11px] font-bold border border-slate-700 transition-colors"
            >
              🎨 View & Download Social Brand Kit & DPs →
            </Link>
          </div>
        </div>
      )}

      {/* Floating Action Trigger Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="group relative flex items-center gap-2.5 px-4 py-3 bg-gradient-to-r from-amber-600 via-amber-500 to-yellow-500 text-slate-950 font-black rounded-full shadow-2xl shadow-amber-500/30 transition-all hover:scale-105 active:scale-95 border border-amber-400/50"
        aria-label="Social Connect"
      >
        <span className="relative flex h-2.5 w-2.5">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-slate-950 opacity-75" />
          <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-slate-950" />
        </span>

        <Share2 className="w-4 h-4 stroke-[2.5]" />
        <span className="text-xs font-black tracking-wide hidden sm:inline">Connect & Social</span>
      </button>

    </div>
  );
};
