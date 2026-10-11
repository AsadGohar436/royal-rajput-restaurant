'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import {
  Crown,
  Download,
  Copy,
  Check,
  ExternalLink,
  Sparkles,
  Share2,
  Instagram,
  Facebook,
  Youtube,
  Mail,
  ArrowRight,
  ShieldCheck,
} from 'lucide-react';
import { SOCIAL_CONFIG } from '@/data/social';

export default function BrandAssetsPage() {
  const [copiedKey, setCopiedKey] = useState<string | null>(null);

  const copyToClipboard = (text: string, key: string) => {
    navigator.clipboard.writeText(text);
    setCopiedKey(key);
    setTimeout(() => setCopiedKey(null), 2500);
  };

  const bios = {
    instagram: `👑 Royal Rajput | Imperial Pakistani Fine Dining & BBQ
🍗 Authentic Desi Ghee Karahi & Mutton Dum Biryani
📍 Beverly Centre, Islamabad | MM Alam Road, Lahore
🛵 Order & Live Tracking: royalrajput.pk
✉️ Official Inquiries: asadgohar21@gmail.com`,

    facebook: `Royal Rajput Fine Dining preserves imperial Mughlai and Rajput culinary lineages with authentic handi karahis, aromatic dum biryani, and natural charcoal BBQ. 

📍 Branches: Islamabad (Beverly Centre) | Lahore (MM Alam Road) | Karachi (DHA Phase 5)
🛵 Online Orders & Live Tracking available on website.
✉️ Management: asadgohar21@gmail.com`,

    tiktok: `👑 Royal Rajput - Imperial Fine Dining Pakistan 🇵🇰
Sizzling Desi Ghee Karahi & Charcoal BBQ 🔥
Order Online: royalrajput.pk
Management: asadgohar21@gmail.com`,
  };

  const downloadAsPng = (svgPath: string, filename: string, width: number, height: number) => {
    const img = document.createElement('img');
    img.crossOrigin = 'anonymous';
    img.onload = () => {
      const canvas = document.createElement('canvas');
      canvas.width = width;
      canvas.height = height;
      const ctx = canvas.getContext('2d');
      if (ctx) {
        ctx.drawImage(img, 0, 0, width, height);
        const a = document.createElement('a');
        a.href = canvas.toDataURL('image/png');
        a.download = filename;
        a.click();
      }
    };
    img.src = svgPath;
  };

  return (
    <div className="py-12 sm:py-20 space-y-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      
      {/* Page Title */}
      <div className="text-center max-w-3xl mx-auto space-y-3">
        <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-amber-500/15 border border-amber-500/30 text-amber-400 text-xs font-bold uppercase tracking-widest">
          <Crown className="w-3.5 h-3.5" />
          Official Brand Assets & Social Kit
        </div>
        <h1 className="text-3xl sm:text-5xl font-black text-white tracking-tight">
          Social Media Brand Kit & Profile Pictures
        </h1>
        <p className="text-slate-400 text-sm sm:text-base leading-relaxed">
          Royal Rajput ki official **Profile Picture (DP)**, **Cover Banner**, aur **Ready-Made Bios** yahan se 1-click mein download karein aur apne Instagram, Facebook, aur YouTube par set karein.
        </p>
      </div>

      {/* Main Grid: DP and Cover Banner */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Left Column: Profile Picture (DP) */}
        <div className="lg:col-span-5 bg-slate-900 border border-amber-500/30 rounded-3xl p-6 sm:p-8 space-y-6 shadow-2xl relative overflow-hidden">
          <div className="flex items-center justify-between pb-3 border-b border-slate-800">
            <div>
              <span className="text-[10px] text-amber-400 font-black uppercase tracking-widest block">
                Social Profile Picture (DP)
              </span>
              <h3 className="text-lg font-bold text-white">Royal Rajput Official Emblem</h3>
            </div>
            <span className="text-xs bg-amber-500/20 text-amber-300 font-mono font-bold px-2.5 py-1 rounded-full border border-amber-500/30">
              1080 × 1080 (1:1)
            </span>
          </div>

          {/* DP Preview */}
          <div className="relative mx-auto w-64 h-64 sm:w-72 sm:h-72 rounded-full overflow-hidden border-4 border-amber-500/50 shadow-2xl shadow-amber-500/20 bg-slate-950 p-2">
            <img
              src="/images/royal_rajput_dp.svg"
              alt="Royal Rajput Official Profile Picture DP"
              className="w-full h-full object-contain rounded-full"
            />
          </div>

          <div className="space-y-2.5 pt-2">
            <p className="text-xs text-slate-400 text-center">
              Instagram, Facebook, WhatsApp, aur Google account ke liye tailored circular luxury gold crest emblem.
            </p>

            <button
              onClick={() => downloadAsPng('/images/royal_rajput_dp.svg', 'Royal_Rajput_DP_1080x1080.png', 1080, 1080)}
              className="w-full py-3.5 px-4 bg-gradient-to-r from-amber-500 to-yellow-500 hover:from-amber-400 hover:to-yellow-400 text-slate-950 font-black text-xs uppercase tracking-wider rounded-xl shadow-lg shadow-amber-500/20 flex items-center justify-center gap-2 transition-all hover:scale-[1.02] active:scale-[0.98]"
            >
              <Download className="w-4 h-4" />
              <span>Download PNG for Instagram &amp; Facebook (1080×1080)</span>
            </button>

            <a
              href="/images/royal_rajput_dp.svg"
              download="Royal_Rajput_DP_Vector.svg"
              className="w-full py-2.5 px-4 bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-semibold rounded-xl border border-slate-700 flex items-center justify-center gap-2 transition-colors"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Download Vector SVG</span>
            </a>
          </div>
        </div>

        {/* Right Column: Social Media Cover Banner */}
        <div className="lg:col-span-7 bg-slate-900 border border-amber-500/30 rounded-3xl p-6 sm:p-8 space-y-6 shadow-2xl relative overflow-hidden">
          <div className="flex items-center justify-between pb-3 border-b border-slate-800">
            <div>
              <span className="text-[10px] text-amber-400 font-black uppercase tracking-widest block">
                Social Cover Banner
              </span>
              <h3 className="text-lg font-bold text-white">Facebook &amp; YouTube Header</h3>
            </div>
            <span className="text-xs bg-amber-500/20 text-amber-300 font-mono font-bold px-2.5 py-1 rounded-full border border-amber-500/30">
              1200 × 630 (16:9)
            </span>
          </div>

          {/* Banner Preview */}
          <div className="relative w-full aspect-[16/9] rounded-2xl overflow-hidden border-2 border-amber-500/40 shadow-xl bg-slate-950">
            <img
              src="/images/royal_rajput_cover.svg"
              alt="Royal Rajput Social Media Cover Banner"
              className="w-full h-full object-cover"
            />
          </div>

          <div className="space-y-2.5 pt-2">
            <p className="text-xs text-slate-400">
              Facebook Page cover photo, YouTube channel header, aur Twitter banner ke liye widescreen gold-on-navy banner.
            </p>

            <button
              onClick={() => downloadAsPng('/images/royal_rajput_cover.svg', 'Royal_Rajput_Cover_Banner.png', 1200, 630)}
              className="w-full py-3.5 px-4 bg-slate-800 hover:bg-slate-700 text-amber-300 hover:text-white border border-amber-500/40 font-bold text-xs uppercase tracking-wider rounded-xl shadow flex items-center justify-center gap-2 transition-all hover:scale-[1.01]"
            >
              <Download className="w-4 h-4" />
              <span>Download PNG Cover Banner (1200×630)</span>
            </button>

            <a
              href="/images/royal_rajput_cover.svg"
              download="Royal_Rajput_Cover_Vector.svg"
              className="w-full py-2.5 px-4 bg-slate-800/60 hover:bg-slate-700 text-slate-300 text-xs font-semibold rounded-xl border border-slate-700 flex items-center justify-center gap-2 transition-colors"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Download Vector SVG</span>
            </a>
          </div>
        </div>

      </div>

      {/* Copy-Paste Ready Bios for Social Media */}
      <div className="space-y-6">
        <div className="text-center max-w-2xl mx-auto space-y-1">
          <h3 className="text-2xl font-black text-white">
            Ready-Made Bios for Your Social Accounts
          </h3>
          <p className="text-slate-400 text-xs sm:text-sm">
            Neeche diye gaye bios ko 1-click se copy karein aur apne social media accounts par paste karein:
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          
          {/* Instagram Bio */}
          <div className="bg-slate-900/90 border border-pink-500/30 rounded-2xl p-6 space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 text-pink-400 font-bold text-sm">
                <Instagram className="w-4 h-4" />
                <span>Instagram Bio</span>
              </div>
              <button
                onClick={() => copyToClipboard(bios.instagram, 'instagram')}
                className="px-3 py-1 bg-pink-500/20 hover:bg-pink-500/30 text-pink-300 text-xs font-bold rounded-lg border border-pink-500/40 flex items-center gap-1.5 transition-colors"
              >
                {copiedKey === 'instagram' ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copiedKey === 'instagram' ? 'Copied!' : 'Copy'}</span>
              </button>
            </div>
            <pre className="text-xs text-slate-300 bg-slate-950 p-3.5 rounded-xl border border-slate-800 font-sans whitespace-pre-wrap leading-relaxed">
              {bios.instagram}
            </pre>
          </div>

          {/* Facebook About */}
          <div className="bg-slate-900/90 border border-blue-500/30 rounded-2xl p-6 space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 text-blue-400 font-bold text-sm">
                <Facebook className="w-4 h-4" />
                <span>Facebook Page About</span>
              </div>
              <button
                onClick={() => copyToClipboard(bios.facebook, 'facebook')}
                className="px-3 py-1 bg-blue-500/20 hover:bg-blue-500/30 text-blue-300 text-xs font-bold rounded-lg border border-blue-500/40 flex items-center gap-1.5 transition-colors"
              >
                {copiedKey === 'facebook' ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copiedKey === 'facebook' ? 'Copied!' : 'Copy'}</span>
              </button>
            </div>
            <pre className="text-xs text-slate-300 bg-slate-950 p-3.5 rounded-xl border border-slate-800 font-sans whitespace-pre-wrap leading-relaxed">
              {bios.facebook}
            </pre>
          </div>

          {/* TikTok Bio */}
          <div className="bg-slate-900/90 border border-cyan-500/30 rounded-2xl p-6 space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 text-cyan-400 font-bold text-sm">
                <Share2 className="w-4 h-4" />
                <span>TikTok / Short Bio</span>
              </div>
              <button
                onClick={() => copyToClipboard(bios.tiktok, 'tiktok')}
                className="px-3 py-1 bg-cyan-500/20 hover:bg-cyan-500/30 text-cyan-300 text-xs font-bold rounded-lg border border-cyan-500/40 flex items-center gap-1.5 transition-colors"
              >
                {copiedKey === 'tiktok' ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copiedKey === 'tiktok' ? 'Copied!' : 'Copy'}</span>
              </button>
            </div>
            <pre className="text-xs text-slate-300 bg-slate-950 p-3.5 rounded-xl border border-slate-800 font-sans whitespace-pre-wrap leading-relaxed">
              {bios.tiktok}
            </pre>
          </div>

        </div>
      </div>

      {/* Direct Channel Cards */}
      <div className="bg-slate-950 border border-slate-800 rounded-3xl p-6 sm:p-10 text-center space-y-6">
        <h3 className="text-xl sm:text-2xl font-bold text-white">
          Active Social Media Channels
        </h3>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 max-w-4xl mx-auto">
          {SOCIAL_CONFIG.links.map((s) => (
            <a
              key={s.name}
              href={s.url}
              target="_blank"
              rel="noopener noreferrer"
              className={`p-4 rounded-xl border text-center transition-all hover:scale-105 ${s.bgColor}`}
            >
              <div className={`font-bold text-sm ${s.color}`}>{s.name}</div>
              <div className="text-[11px] text-slate-400 font-mono mt-1">{s.handle}</div>
            </a>
          ))}
        </div>

        <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-4 text-xs text-slate-400">
          <Link
            href="/"
            className="text-amber-400 hover:text-amber-300 font-bold flex items-center gap-1"
          >
            ← Back to Royal Rajput Home
          </Link>
          <span className="hidden sm:inline">•</span>
          <Link
            href="/contact"
            className="text-slate-300 hover:text-white font-medium"
          >
            Table Reservations & Branches
          </Link>
        </div>
      </div>

    </div>
  );
}
