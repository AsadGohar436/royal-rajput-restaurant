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

      {/* 4-Day Launch Campaign: 3 Posts + 1 Reel (Exact Screenshot Details) */}
      <div className="bg-slate-900 border border-amber-500/40 rounded-3xl p-6 sm:p-10 space-y-8 shadow-2xl">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 pb-6 border-b border-slate-800">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/15 border border-amber-500/30 text-amber-400 text-xs font-bold uppercase tracking-widest mb-2">
              <Sparkles className="w-3.5 h-3.5" />
              Scheduled Social Campaign
            </div>
            <h2 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
              Ready-to-Post Campaign (3 Posts + 1 Video/Reel)
            </h2>
            <p className="text-slate-400 text-xs sm:text-sm mt-1 max-w-2xl">
              Aapke screenshot ke mutabiq exact time, reason, graphics aur copyable captions tayar hain. Inhe Meta Business Suite se schedule karein ya direct post karein.
            </p>
          </div>
          <a
            href="https://business.facebook.com"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-bold text-xs uppercase tracking-wider hover:brightness-110 shadow-lg shadow-blue-600/20 transition-all shrink-0"
          >
            <Facebook className="w-4 h-4" />
            <span>Open Meta Business Suite</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </a>
        </div>

        {/* Campaign Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

          {/* Item 1: Day 1 - 12:30 PM (Menu / Opening Post) */}
          <div className="bg-slate-950 border border-amber-500/30 rounded-2xl p-5 space-y-4 flex flex-col justify-between">
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-black uppercase tracking-wider bg-amber-500/20 text-amber-300 px-3 py-1 rounded-full border border-amber-500/30">
                  Day 1 • ⏰ 12:30 PM
                </span>
                <span className="text-[11px] text-slate-400">Post: Menu / Opening</span>
              </div>
              <div className="text-[11px] text-amber-400/90 font-medium bg-slate-900 px-3 py-1.5 rounded-lg border border-slate-800">
                💡 <strong>Why:</strong> People look for food before lunch
              </div>

              {/* Image Preview */}
              <div className="relative aspect-square rounded-xl overflow-hidden border border-amber-500/20 group">
                <img
                  src="/images/post1_grand_opening.jpg"
                  alt="Royal Rajput Grand Opening Post"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute top-2 right-2 bg-slate-950/80 backdrop-blur-md px-2 py-1 rounded text-[10px] text-amber-300 font-bold border border-amber-500/30">
                  1080×1080 Square
                </div>
              </div>

              <div className="space-y-1.5">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-slate-200">Instagram &amp; Facebook Caption:</span>
                  <button
                    onClick={() =>
                      copyToClipboard(
                        `👑 BISMILLAH-IR-RAHMAN-IR-RAHEEM 👑\nThe Wait Is Officially Over! Welcome to Royal Rajput — Pakistan's Imperial Fine Dining & Charcoal BBQ Sanctuary. 🇵🇰✨\n\nFrom fragrant copper handis of Mutton Dum Biryani slow-steamed with wild saffron, to iron-wok Desi Ghee Mutton Karahi and juicy Shinwari Lamb Chops charred over live coals — imperial Rajput gastronomy is finally here! 🍖🔥\n\n📍 Beverly Centre, Islamabad | MM Alam Road, Lahore | DHA Phase 5, Karachi\n⏰ Serving Daily: 12:30 PM – 1:30 AM (Midnight BBQ)\n🛵 Order Online & Live Tracking: https://heckathon-iota.vercel.app\n\nDM us for VIP reservations or tap the link in bio to order hot to your doorstep! 👑\n\n#RoyalRajput #GrandOpening #PakistaniFood #DesiFood #BiryaniLovers #Karahi #CharcoalBBQ #IslamabadFoodies #LahoreFood #KarachiFood`,
                        'post1'
                      )
                    }
                    className="inline-flex items-center gap-1 text-[11px] font-bold text-amber-400 hover:text-amber-300"
                  >
                    {copiedKey === 'post1' ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                    <span>{copiedKey === 'post1' ? 'Copied!' : 'Copy Caption'}</span>
                  </button>
                </div>
                <div className="text-[11px] text-slate-400 bg-slate-900 p-3 rounded-xl border border-slate-800 line-clamp-3">
                  👑 BISMILLAH-IR-RAHMAN-IR-RAHEEM 👑 The Wait Is Officially Over! Welcome to Royal Rajput — Pakistan&apos;s Imperial Fine Dining &amp; Charcoal BBQ Sanctuary...
                </div>
              </div>
            </div>

            <div className="pt-3 border-t border-slate-800 flex items-center justify-between gap-2">
              <a
                href="/images/post1_grand_opening.jpg"
                download="Royal_Rajput_Post1_Opening.jpg"
                className="w-full py-2 px-3 rounded-xl bg-amber-500/10 hover:bg-amber-500/20 text-amber-300 border border-amber-500/30 text-xs font-bold text-center transition-all flex items-center justify-center gap-1.5"
              >
                <Download className="w-3.5 h-3.5" />
                <span>Download Creative (HD)</span>
              </a>
            </div>
          </div>

          {/* Item 2: Day 1 - 8:00 PM (Reel: A Dish Being Made) */}
          <div className="bg-slate-950 border border-pink-500/30 rounded-2xl p-5 space-y-4 flex flex-col justify-between">
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-black uppercase tracking-wider bg-pink-500/20 text-pink-300 px-3 py-1 rounded-full border border-pink-500/30">
                  Day 1 • ⏰ 8:00 PM
                </span>
                <span className="text-[11px] text-pink-300 font-bold">Reel: A Dish Being Made 🎥</span>
              </div>
              <div className="text-[11px] text-pink-300/90 font-medium bg-slate-900 px-3 py-1.5 rounded-lg border border-slate-800">
                💡 <strong>Why:</strong> Dinner time, most people are online
              </div>

              {/* Reel Preview */}
              <div className="relative aspect-[9/10] rounded-xl overflow-hidden border border-pink-500/20 group">
                <img
                  src="/images/reel1_cooking_karahi.jpg"
                  alt="Desi Ghee Karahi Cooking Reel"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute top-2 right-2 bg-slate-950/80 backdrop-blur-md px-2 py-1 rounded text-[10px] text-pink-300 font-bold border border-pink-500/30">
                  9:16 Vertical Reel
                </div>
              </div>

              <div className="space-y-1.5">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-slate-200">Reel Caption &amp; Audio Tip:</span>
                  <button
                    onClick={() =>
                      copyToClipboard(
                        `🔥 PURE DESI GHEE. ROARING FLAMES. ROYAL TRADITION. 🔥\n\nWatch how our master ustads craft the legendary Shahi Rajput Mutton Karahi in heavy black iron woks — cooked exclusively in 100% organic desi ghee, ripe mountain tomatoes, cracked black pepper, and julienned ginger. 🥩🍲\n\nListen to that sizzle! 🔊🤤 Tag a friend who can never say no to Desi Ghee Karahi!\n\n🛵 Order fresh now with live order tracking: https://heckathon-iota.vercel.app\n📍 Beverly Centre, Islamabad | MM Alam Road, Lahore\n\n🎵 Recommended Audio: Trending Pakistani Food Sizzle / Traditional instrumental\n\n#RoyalRajput #DesiGheeKarahi #CookingReel #StreetFoodPK #BehindTheScenes #FoodPorn #PakistaniCuisine #LahoriFood #BBQReels #ViralFood`,
                        'reel1'
                      )
                    }
                    className="inline-flex items-center gap-1 text-[11px] font-bold text-pink-400 hover:text-pink-300"
                  >
                    {copiedKey === 'reel1' ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                    <span>{copiedKey === 'reel1' ? 'Copied!' : 'Copy Caption'}</span>
                  </button>
                </div>
                <div className="text-[11px] text-slate-400 bg-slate-900 p-3 rounded-xl border border-slate-800 line-clamp-3">
                  🔥 PURE DESI GHEE. ROARING FLAMES. ROYAL TRADITION. Watch how our master ustads craft the legendary Shahi Rajput Mutton Karahi...
                </div>
              </div>
            </div>

            <div className="pt-3 border-t border-slate-800 flex items-center justify-between gap-2">
              <a
                href="/images/reel1_cooking_karahi.jpg"
                download="Royal_Rajput_Reel1_Cooking.jpg"
                className="w-full py-2 px-3 rounded-xl bg-pink-500/10 hover:bg-pink-500/20 text-pink-300 border border-pink-500/30 text-xs font-bold text-center transition-all flex items-center justify-center gap-1.5"
              >
                <Download className="w-3.5 h-3.5" />
                <span>Download Reel Cover (9:16)</span>
              </a>
            </div>
          </div>

          {/* Item 3: Day 2 - 1:00 PM (Post: Today's Deal) */}
          <div className="bg-slate-950 border border-blue-500/30 rounded-2xl p-5 space-y-4 flex flex-col justify-between">
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-black uppercase tracking-wider bg-blue-500/20 text-blue-300 px-3 py-1 rounded-full border border-blue-500/30">
                  Day 2 • ⏰ 1:00 PM
                </span>
                <span className="text-[11px] text-slate-400">Post: Today&apos;s Deal</span>
              </div>
              <div className="text-[11px] text-blue-300/90 font-medium bg-slate-900 px-3 py-1.5 rounded-lg border border-slate-800">
                💡 <strong>Why:</strong> Lunch break
              </div>

              {/* Image Preview */}
              <div className="relative aspect-square rounded-xl overflow-hidden border border-blue-500/20 group">
                <img
                  src="/images/post2_todays_deal.jpg"
                  alt="Royal Rajput Today Deal"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute top-2 right-2 bg-slate-950/80 backdrop-blur-md px-2 py-1 rounded text-[10px] text-blue-300 font-bold border border-blue-500/30">
                  Lunch Promo
                </div>
              </div>

              <div className="space-y-1.5">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-slate-200">Instagram &amp; Facebook Caption:</span>
                  <button
                    onClick={() =>
                      copyToClipboard(
                        `⚡ ROYAL LUNCH FEAST — TODAY’S EXCLUSIVE DEAL! ⚡\n\nLunch break just got an imperial upgrade! Take a break from work and treat yourself to our signature lunch platter:\n\n✨ Special Deal Includes:\n🍗 Royal Mutton Dum Biryani (Aged Basmati & Tender Mutton)\n🔥 2x Charcoal Seekh Kababs\n🫓 Hot Tandoori Garlic Roghani Naan\n🥗 Fresh Zeera Raita & Mint Chutney\n🥤 Chilled Beverage\n\n💰 Flat 20% OFF on all lunch orders placed before 4:00 PM!\n🛵 Fast, piping hot delivery with live GPS tracking on our website:\n👉 https://heckathon-iota.vercel.app/order\n\nOrder right now & conquer your afternoon cravings! 👑\n\n#RoyalRajput #LunchDeal #FoodDealsPK #BiryaniDeal #IslamabadEats #LahoreFoodies #OfficeLunch #DesiFeast`,
                        'post2'
                      )
                    }
                    className="inline-flex items-center gap-1 text-[11px] font-bold text-blue-400 hover:text-blue-300"
                  >
                    {copiedKey === 'post2' ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                    <span>{copiedKey === 'post2' ? 'Copied!' : 'Copy Caption'}</span>
                  </button>
                </div>
                <div className="text-[11px] text-slate-400 bg-slate-900 p-3 rounded-xl border border-slate-800 line-clamp-3">
                  ⚡ ROYAL LUNCH FEAST — TODAY’S EXCLUSIVE DEAL! ⚡ Lunch break just got an imperial upgrade! Take a break from work...
                </div>
              </div>
            </div>

            <div className="pt-3 border-t border-slate-800 flex items-center justify-between gap-2">
              <a
                href="/images/post2_todays_deal.jpg"
                download="Royal_Rajput_Post2_Deal.jpg"
                className="w-full py-2 px-3 rounded-xl bg-blue-500/10 hover:bg-blue-500/20 text-blue-300 border border-blue-500/30 text-xs font-bold text-center transition-all flex items-center justify-center gap-1.5"
              >
                <Download className="w-3.5 h-3.5" />
                <span>Download Creative (HD)</span>
              </a>
            </div>
          </div>

          {/* Item 4: Day 3 - 7:30 PM (Post: Customer Favourite) */}
          <div className="bg-slate-950 border border-emerald-500/30 rounded-2xl p-5 space-y-4 flex flex-col justify-between">
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-black uppercase tracking-wider bg-emerald-500/20 text-emerald-300 px-3 py-1 rounded-full border border-emerald-500/30">
                  Day 3 • ⏰ 7:30 PM
                </span>
                <span className="text-[11px] text-slate-400">Post: Customer Favourite</span>
              </div>
              <div className="text-[11px] text-emerald-300/90 font-medium bg-slate-900 px-3 py-1.5 rounded-lg border border-slate-800">
                💡 <strong>Why:</strong> Evening, time to order
              </div>

              {/* Image Preview */}
              <div className="relative aspect-square rounded-xl overflow-hidden border border-emerald-500/20 group">
                <img
                  src="/images/post3_customer_favourite.jpg"
                  alt="Royal Rajput Customer Favourite"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute top-2 right-2 bg-slate-950/80 backdrop-blur-md px-2 py-1 rounded text-[10px] text-emerald-300 font-bold border border-emerald-500/30">
                  Rated 4.9 ★
                </div>
              </div>

              <div className="space-y-1.5">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-slate-200">Instagram &amp; Facebook Caption:</span>
                  <button
                    onClick={() =>
                      copyToClipboard(
                        `🌟 CROWNED BY YOU: THE #1 CUSTOMER FAVOURITE! 🌟\n\nRated 4.9/5 by over 5,000+ patrons across Pakistan:\n✨ Royal Rajput Special Mutton Dum Biryani & Desi Ghee Shinwari Lamb Chops! ✨\n\n"The mutton simply melts off the bone, and the aroma of real saffron and pure desi ghee took us back to royal Mughal dastarkhwans." — Review by food lovers.\n\nDinner plans tonight? Don't settle for ordinary food when you can dine like royalty. 👑\n\n🛵 Order online with real-time live order tracking:\n👉 https://heckathon-iota.vercel.app\n📍 Beverly Centre, Blue Area, Islamabad | MM Alam, Lahore\n\n#RoyalRajput #CustomerFavourite #BestBiryani #ShinwariLamb #PakistaniFoodBloggers #DinnerTime #KarachiFoodies #IslamabadRestaurants`,
                        'post3'
                      )
                    }
                    className="inline-flex items-center gap-1 text-[11px] font-bold text-emerald-400 hover:text-emerald-300"
                  >
                    {copiedKey === 'post3' ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                    <span>{copiedKey === 'post3' ? 'Copied!' : 'Copy Caption'}</span>
                  </button>
                </div>
                <div className="text-[11px] text-slate-400 bg-slate-900 p-3 rounded-xl border border-slate-800 line-clamp-3">
                  🌟 CROWNED BY YOU: THE #1 CUSTOMER FAVOURITE! Rated 4.9/5 by over 5,000+ patrons across Pakistan: Royal Rajput Special Mutton Dum Biryani...
                </div>
              </div>
            </div>

            <div className="pt-3 border-t border-slate-800 flex items-center justify-between gap-2">
              <a
                href="/images/post3_customer_favourite.jpg"
                download="Royal_Rajput_Post3_Favourite.jpg"
                className="w-full py-2 px-3 rounded-xl bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 text-xs font-bold text-center transition-all flex items-center justify-center gap-1.5"
              >
                <Download className="w-3.5 h-3.5" />
                <span>Download Creative (HD)</span>
              </a>
            </div>
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
