'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import {
  Crown,
  Instagram,
  Facebook,
  Mail,
  ExternalLink,
  Copy,
  Check,
  Sparkles,
  ShoppingBag,
  Clock,
  ArrowRight,
  ShieldCheck,
  Share2,
} from 'lucide-react';
import { SOCIAL_CONFIG } from '@/data/social';

export default function SocialHubPage() {
  const [copiedKey, setCopiedKey] = useState<string | null>(null);

  const copyToClipboard = (text: string, key: string) => {
    navigator.clipboard.writeText(text);
    setCopiedKey(key);
    setTimeout(() => setCopiedKey(null), 2500);
  };

  const bioLinks = [
    {
      title: '📸 Official Instagram',
      subtitle: 'Sizzling Karahi Reels & Food Stories (@royalrajput.pk)',
      href: 'https://instagram.com/royalrajput.pk',
      icon: Instagram,
      badge: 'Follow & Tag Us',
      gradient: 'from-pink-600 via-rose-500 to-amber-500',
      border: 'border-pink-500/40 hover:border-pink-400',
      isExternal: true,
    },
    {
      title: '👥 Official Facebook Page',
      subtitle: 'Exclusive Dining Offers & Customer Reviews',
      href: 'https://facebook.com/royalrajput.pk',
      icon: Facebook,
      badge: 'Like & Review',
      gradient: 'from-blue-600 via-indigo-600 to-sky-500',
      border: 'border-blue-500/40 hover:border-blue-400',
      isExternal: true,
    },
    {
      title: '🎵 Official TikTok',
      subtitle: 'Viral Live Kitchen BBQ & Behind the Scenes (@royalrajput.pk)',
      href: 'https://tiktok.com/@royalrajput.pk',
      icon: Crown,
      badge: 'Watch Viral Videos',
      gradient: 'from-cyan-600 via-teal-600 to-emerald-500',
      border: 'border-cyan-500/40 hover:border-cyan-400',
      isExternal: true,
    },
    {
      title: '🍽️ Order Food Online (Hot Delivery)',
      subtitle: 'Mutton Dum Biryani, Desi Ghee Karahi & Live Charcoal BBQ',
      href: '/order',
      icon: ShoppingBag,
      badge: 'Cash on Delivery',
      gradient: 'from-amber-500 via-yellow-500 to-amber-600 text-slate-950',
      border: 'border-amber-400 hover:border-yellow-300',
      isExternal: false,
    },
    {
      title: '🚚 Track Your Order Live',
      subtitle: 'Daraz-Style Live Tracking for Royal Rajput Orders',
      href: '/track',
      icon: Clock,
      badge: 'Real-Time Status',
      gradient: 'from-slate-800 to-slate-900',
      border: 'border-amber-500/30 hover:border-amber-400',
      isExternal: false,
    },
    {
      title: '✉️ Executive Email Management',
      subtitle: 'asadgohar21@gmail.com — Corporate Bookings & Inquiries',
      href: 'mailto:asadgohar21@gmail.com',
      icon: Mail,
      badge: 'Official Contact',
      gradient: 'from-slate-800 to-slate-900',
      border: 'border-amber-500/30 hover:border-amber-400',
      isExternal: true,
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950 text-slate-100 py-12 px-4 sm:px-6 lg:px-8">
      {/* Background glow effects */}
      <div className="max-w-xl mx-auto relative">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-72 h-72 bg-amber-500/15 blur-3xl rounded-full pointer-events-none -z-10" />

        {/* Profile Card Header */}
        <div className="text-center mb-8">
          <div className="relative inline-block mx-auto mb-4 group">
            <div className="w-28 h-28 sm:w-32 sm:h-32 rounded-full p-1 bg-gradient-to-tr from-amber-600 via-amber-400 to-yellow-300 shadow-2xl shadow-amber-500/20">
              <div className="w-full h-full rounded-full overflow-hidden bg-slate-950 flex items-center justify-center relative">
                <Image
                  src="/images/royal_rajput_dp.svg"
                  alt="Royal Rajput Official Avatar"
                  width={128}
                  height={128}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
              </div>
            </div>
            <div className="absolute bottom-1 right-1 p-1.5 rounded-full bg-gradient-to-tr from-amber-500 to-yellow-400 text-slate-950 shadow-md">
              <ShieldCheck className="w-4 h-4 stroke-[2.5]" />
            </div>
          </div>

          <h1 className="text-2xl sm:text-3xl font-black font-serif gold-gradient-text tracking-tight uppercase">
            Royal Rajput
          </h1>
          <p className="text-xs sm:text-sm text-amber-400/90 font-medium mt-1">
            Imperial Pakistani Fine Dining &amp; Charcoal BBQ
          </p>
          <p className="text-xs text-slate-400 mt-1 max-w-sm mx-auto">
            Islamabad • Lahore • Karachi | Connected Social Hub
          </p>

          {/* Quick share button */}
          <div className="mt-4 flex items-center justify-center gap-2">
            <button
              onClick={() => copyToClipboard('https://heckathon-iota.vercel.app/social', 'page-url')}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-slate-800/80 hover:bg-slate-700 text-amber-300 text-xs font-semibold border border-amber-500/20 transition-all shadow-sm"
            >
              {copiedKey === 'page-url' ? (
                <>
                  <Check className="w-3.5 h-3.5 text-emerald-400" />
                  <span className="text-emerald-300">Link Copied!</span>
                </>
              ) : (
                <>
                  <Share2 className="w-3.5 h-3.5" />
                  <span>Copy Bio Link</span>
                </>
              )}
            </button>
            <Link
              href="/brand-assets"
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-amber-500/10 hover:bg-amber-500/20 text-amber-400 text-xs font-semibold border border-amber-500/30 transition-all"
            >
              <Crown className="w-3.5 h-3.5" />
              <span>Download Brand DPs</span>
            </Link>
          </div>
        </div>

        {/* Action Link List */}
        <div className="space-y-3.5">
          {bioLinks.map((item, idx) => {
            const Icon = item.icon;
            const content = (
              <div
                className={`w-full p-4 rounded-2xl bg-slate-900/90 hover:bg-slate-800/90 border ${item.border} shadow-lg transition-all duration-300 hover:scale-[1.01] hover:shadow-amber-500/10 flex items-center justify-between gap-3 group`}
              >
                <div className="flex items-center gap-3.5 min-w-0">
                  <div
                    className={`w-11 h-11 rounded-xl bg-gradient-to-tr ${item.gradient} flex items-center justify-center shrink-0 shadow-md`}
                  >
                    <Icon className="w-5 h-5 text-white" />
                  </div>
                  <div className="text-left min-w-0">
                    <div className="flex items-center gap-2">
                      <h2 className="text-sm font-bold text-white group-hover:text-amber-400 transition-colors truncate">
                        {item.title}
                      </h2>
                    </div>
                    <p className="text-xs text-slate-400 truncate">{item.subtitle}</p>
                  </div>
                </div>
                <div className="shrink-0 flex items-center gap-1.5">
                  <span className="hidden sm:inline-block text-[11px] font-semibold text-amber-400/80 bg-amber-500/10 px-2 py-0.5 rounded-full border border-amber-500/20">
                    {item.badge}
                  </span>
                  <ArrowRight className="w-4 h-4 text-slate-400 group-hover:text-amber-400 group-hover:translate-x-0.5 transition-all" />
                </div>
              </div>
            );

            return item.isExternal ? (
              <a
                key={idx}
                href={item.href}
                target="_blank"
                rel="noopener noreferrer"
                className="block"
              >
                {content}
              </a>
            ) : (
              <Link key={idx} href={item.href} className="block">
                {content}
              </Link>
            );
          })}
        </div>

        {/* 3 Social Media Interconnection Instructions */}
        <div className="mt-10 p-5 rounded-2xl bg-slate-900/60 border border-amber-500/20 backdrop-blur-sm">
          <div className="flex items-center gap-2 mb-3">
            <Sparkles className="w-4 h-4 text-amber-400" />
            <h3 className="text-xs uppercase tracking-wider font-extrabold text-amber-300">
              Accounts Interconnect Guide (Facebook + Instagram + TikTok)
            </h3>
          </div>
          <p className="text-xs text-slate-300 leading-relaxed mb-3">
            Aapke account <strong className="text-amber-300">asadgohar21@gmail.com</strong> ke teeno accounts ko aapas mein jorne ke liye:
          </p>
          <ol className="text-xs text-slate-400 space-y-2 list-decimal list-inside leading-relaxed">
            <li>
              <strong className="text-slate-200">Facebook + Instagram:</strong>{' '}
              <a
                href="https://accountscenter.instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-pink-400 underline font-semibold"
              >
                Meta Accounts Center
              </a>{' '}
              mein &ldquo;Add accounts&rdquo; karke dono ko select karein.
            </li>
            <li>
              <strong className="text-slate-200">TikTok + Instagram:</strong> TikTok app &gt; Edit Profile &gt; &ldquo;Social&rdquo; mein Instagram link karein.
            </li>
            <li>
              <strong className="text-slate-200">Website in Bio:</strong> Teeno accounts ke Bio mein{' '}
              <span className="text-amber-300 font-mono">https://heckathon-iota.vercel.app</span> add karein.
            </li>
          </ol>
        </div>

        {/* Footer */}
        <div className="mt-8 text-center text-xs text-slate-500">
          <p>© {new Date().getFullYear()} Royal Rajput Pakistan. All Rights Reserved.</p>
          <p className="mt-1">
            Executive Inquiries:{' '}
            <a href="mailto:asadgohar21@gmail.com" className="text-amber-400 hover:underline">
              asadgohar21@gmail.com
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}
