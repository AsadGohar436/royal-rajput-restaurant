'use client';

import React from 'react';
import { Award, Flame, HeartHandshake, ShieldCheck } from 'lucide-react';

export const StorySection: React.FC = () => {
  return (
    <section id="story" className="py-20 bg-white border-y border-slate-200/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          
          {/* Story Imagery Mosaic */}
          <div className="relative">
            <div className="grid grid-cols-2 gap-4">
              <div className="rounded-2xl overflow-hidden shadow-lg aspect-square">
                <img
                  src="https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&w=600&q=80"
                  alt="Pakistani Charcoal BBQ Preparation"
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                />
              </div>
              <div className="rounded-2xl overflow-hidden shadow-lg aspect-square mt-6">
                <img
                  src="https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=600&q=80"
                  alt="Dastarkhwan Dining Ambience"
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                />
              </div>
            </div>
            
            {/* Experience Badge */}
            <div className="absolute -bottom-6 left-1/2 -translate-x-1/2 bg-slate-900 text-white px-6 py-3.5 rounded-2xl shadow-xl flex items-center gap-3">
              <Award className="w-6 h-6 text-amber-400" />
              <div>
                <div className="text-xs uppercase tracking-wider text-slate-400 font-semibold">Established 2014</div>
                <div className="text-sm font-bold">10+ Years of Desi Culinary Excellence</div>
              </div>
            </div>
          </div>

          {/* Story Narrative */}
          <div className="space-y-6 lg:pl-6">
            <div className="inline-block text-emerald-700 font-bold uppercase tracking-widest text-xs">
              Our Culinary Heritage
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight leading-tight">
              Preserving The Rich Royal Flavors of Pakistan.
            </h2>
            <p className="text-slate-600 leading-relaxed text-base">
              At <strong className="text-slate-900">Dastarkhwan</strong>, we celebrate the diverse culinary landscape of Pakistan — blending the aromatic dum biryanis of Karachi&apos;s Burns Road, the rich desi ghee mutton karahis of Lahore&apos;s Fort Road, and the charcoal shinwari flavors of Peshawar.
            </p>
            <p className="text-slate-600 leading-relaxed text-base">
              We never cut corners: 100% halal fresh meat, stone-ground garam masalas, organic pure clarified butter (desi ghee), and slow coal-smoking make every bite unforgettable.
            </p>

            {/* Highlights Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4">
              <div className="flex items-start gap-3 p-3 rounded-xl bg-emerald-50/50 border border-emerald-100">
                <Flame className="w-5 h-5 text-emerald-700 shrink-0 mt-0.5" />
                <div>
                  <h4 className="font-bold text-sm text-slate-900">Live Natural Charcoal Sigri</h4>
                  <p className="text-xs text-slate-500 mt-0.5">Skewers and tikkas charred over oak coals for authentic smoky aroma.</p>
                </div>
              </div>

              <div className="flex items-start gap-3 p-3 rounded-xl bg-emerald-50/50 border border-emerald-100">
                <ShieldCheck className="w-5 h-5 text-emerald-700 shrink-0 mt-0.5" />
                <div>
                  <h4 className="font-bold text-sm text-slate-900">Pure Desi Ghee & Fresh Meat</h4>
                  <p className="text-xs text-slate-500 mt-0.5">Freshly slaughtered halal mutton & chicken prepared every single morning.</p>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
