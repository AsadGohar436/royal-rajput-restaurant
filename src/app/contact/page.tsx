'use client';

import React, { useState } from 'react';
import {
  Crown,
  MapPin,
  Phone,
  Mail,
  CalendarCheck,
  Clock,
  Users,
  CheckCircle2,
  AlertCircle,
  Loader2,
  MessageSquare,
  ExternalLink,
  MessageCircle,
} from 'lucide-react';
import { SOCIAL_CONFIG } from '@/data/social';

export default function ContactPage() {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [guests, setGuests] = useState('4');
  const [date, setDate] = useState('');
  const [time, setTime] = useState('20:00');
  const [branch, setBranch] = useState('Islamabad - Blue Area & F-7');
  const [requests, setRequests] = useState('');

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [reservationSuccess, setReservationSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleReserve = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!name.trim()) {
      setError('Please enter your full name.');
      return;
    }
    if (!phone.trim() || phone.trim().length < 8) {
      setError('Please enter a valid Pakistani mobile number.');
      return;
    }
    if (!date) {
      setError('Please select a reservation date.');
      return;
    }

    setIsSubmitting(true);
    // Simulate booking reservation
    setTimeout(() => {
      setIsSubmitting(false);
      setReservationSuccess(true);
    }, 800);
  };

  const resetReservation = () => {
    setReservationSuccess(false);
    setName('');
    setPhone('');
    setRequests('');
    setError(null);
  };

  return (
    <div className="py-12 sm:py-20 space-y-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        
        {/* Page Title */}
        <div className="text-center max-w-2xl mx-auto space-y-3">
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-amber-500/15 border border-amber-500/30 text-amber-400 text-xs font-bold uppercase tracking-widest">
            <Crown className="w-3.5 h-3.5" />
            Mehman-Nawazi
          </div>
          <h1 className="text-3xl sm:text-5xl font-black text-white tracking-tight">
            Table Reservations & Branches
          </h1>
          <p className="text-slate-400 text-sm sm:text-base">
            Reserve your royal dastarkhwan for intimate family dinners, business luncheons, or celebratory banquets across Pakistan.
          </p>
        </div>

        {/* Main Grid: Form & Branch Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          
          {/* Left Column: Reservation Form */}
          <div className="lg:col-span-7">
            <div className="royal-card p-6 sm:p-10 rounded-3xl border border-amber-500/20 shadow-2xl">
              
              {reservationSuccess ? (
                <div className="text-center py-10 space-y-5">
                  <div className="w-16 h-16 bg-emerald-500/15 border border-emerald-500/30 text-emerald-400 rounded-full flex items-center justify-center mx-auto animate-bounce">
                    <CheckCircle2 className="w-10 h-10" />
                  </div>
                  <div>
                    <h3 className="text-2xl font-black text-white">Table Reserved Successfully!</h3>
                    <p className="text-sm text-slate-400 mt-1 max-w-sm mx-auto">
                      Shukriya, <strong className="text-amber-400">{name}</strong>! Your table for <strong className="text-white">{guests} guests</strong> on <strong className="text-white">{date} at {time}</strong> has been logged. Our host will confirm via phone call.
                    </p>
                  </div>
                  <div className="p-4 bg-slate-950 rounded-2xl border border-slate-800 text-xs text-slate-300 max-w-xs mx-auto">
                    <span className="text-slate-500 block">Selected Branch:</span>
                    <strong className="text-amber-400 font-bold">{branch}</strong>
                  </div>
                  <button
                    onClick={resetReservation}
                    className="px-6 py-3 bg-gradient-to-r from-amber-500 to-yellow-500 text-slate-950 font-black rounded-xl text-xs uppercase tracking-wider hover:brightness-110"
                  >
                    Make Another Reservation
                  </button>
                </div>
              ) : (
                <form onSubmit={handleReserve} className="space-y-5">
                  <div className="border-b border-slate-800 pb-4">
                    <h3 className="text-lg font-bold text-white flex items-center gap-2">
                      <CalendarCheck className="w-5 h-5 text-amber-400" />
                      <span>Book a Royal Table</span>
                    </h3>
                    <p className="text-xs text-slate-400 mt-0.5">
                      Complimentary table reservation with guaranteed seating.
                    </p>
                  </div>

                  {error && (
                    <div className="p-3 bg-red-950/40 border border-red-500/50 text-red-300 rounded-xl text-xs flex items-center gap-2 font-medium">
                      <AlertCircle className="w-4 h-4 shrink-0 text-red-400" />
                      <span>{error}</span>
                    </div>
                  )}

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {/* Guest Name */}
                    <div>
                      <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-1.5">
                        Guest Full Name <span className="text-red-400">*</span>
                      </label>
                      <input
                        type="text"
                        placeholder="e.g. Tariq Mehmood Rajput"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="w-full px-4 py-2.5 rounded-xl border border-slate-800 bg-slate-950 text-white text-sm focus:outline-none focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500"
                      />
                    </div>

                    {/* Phone Number */}
                    <div>
                      <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-1.5">
                        Mobile Number <span className="text-red-400">*</span>
                      </label>
                      <input
                        type="tel"
                        placeholder="e.g. 0300-1234567"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        className="w-full px-4 py-2.5 rounded-xl border border-slate-800 bg-slate-950 text-white text-sm focus:outline-none focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    {/* Guests Count */}
                    <div>
                      <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-1.5">
                        Number of Guests
                      </label>
                      <select
                        value={guests}
                        onChange={(e) => setGuests(e.target.value)}
                        className="w-full px-4 py-2.5 rounded-xl border border-slate-800 bg-slate-950 text-white text-sm focus:outline-none focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500"
                      >
                        <option value="2">2 Guests (Couple)</option>
                        <option value="4">4 Guests (Family)</option>
                        <option value="6">6 Guests</option>
                        <option value="8">8 Guests (Large Group)</option>
                        <option value="12">12+ Guests (Private Hall)</option>
                      </select>
                    </div>

                    {/* Date */}
                    <div>
                      <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-1.5">
                        Date <span className="text-red-400">*</span>
                      </label>
                      <input
                        type="date"
                        value={date}
                        onChange={(e) => setDate(e.target.value)}
                        className="w-full px-4 py-2.5 rounded-xl border border-slate-800 bg-slate-950 text-white text-sm focus:outline-none focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500"
                      />
                    </div>

                    {/* Time */}
                    <div>
                      <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-1.5">
                        Time
                      </label>
                      <select
                        value={time}
                        onChange={(e) => setTime(e.target.value)}
                        className="w-full px-4 py-2.5 rounded-xl border border-slate-800 bg-slate-950 text-white text-sm focus:outline-none focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500"
                      >
                        <option value="13:00">1:00 PM (Lunch)</option>
                        <option value="14:30">2:30 PM (Late Lunch)</option>
                        <option value="19:30">7:30 PM (Early Dinner)</option>
                        <option value="20:30">8:30 PM (Prime Dinner)</option>
                        <option value="21:30">9:30 PM (Dinner)</option>
                        <option value="23:00">11:00 PM (Midnight BBQ)</option>
                      </select>
                    </div>
                  </div>

                  {/* Branch Selector */}
                  <div>
                    <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-1.5">
                      Select Royal Branch
                    </label>
                    <select
                      value={branch}
                      onChange={(e) => setBranch(e.target.value)}
                      className="w-full px-4 py-2.5 rounded-xl border border-slate-800 bg-slate-950 text-white text-sm focus:outline-none focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500"
                    >
                      <option value="Islamabad - Beverly Centre, Blue Area">Islamabad Branch (Beverly Centre, Blue Area & F-7)</option>
                      <option value="Lahore - MM Alam Road, Gulberg III">Lahore Branch (MM Alam Road, Gulberg III)</option>
                      <option value="Karachi - Khayaban-e-Shamsheer, DHA Phase 5">Karachi Branch (DHA Phase 5 & Clifton)</option>
                    </select>
                  </div>

                  {/* Special Requests */}
                  <div>
                    <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-1.5">
                      Special Requests / Occasion (Optional)
                    </label>
                    <textarea
                      rows={2}
                      placeholder="e.g. Birthday anniversary, quiet corner table, baby highchair needed"
                      value={requests}
                      onChange={(e) => setRequests(e.target.value)}
                      className="w-full px-4 py-2 rounded-xl border border-slate-800 bg-slate-950 text-white text-sm focus:outline-none focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500 resize-none"
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full py-4 rounded-xl bg-gradient-to-r from-amber-500 via-amber-600 to-yellow-500 text-slate-950 font-black text-sm uppercase tracking-wider shadow-lg shadow-amber-500/20 hover:brightness-110 transition-all flex items-center justify-center gap-2"
                  >
                    {isSubmitting ? (
                      <>
                        <Loader2 className="w-5 h-5 animate-spin" />
                        <span>Confirming Royal Reservation...</span>
                      </>
                    ) : (
                      <span>Confirm Table Reservation</span>
                    )}
                  </button>
                </form>
              )}

            </div>
          </div>

          {/* Right Column: Branch Addresses & Direct Contacts */}
          <div className="lg:col-span-5 space-y-6">
            
            {/* Branch 1: Islamabad */}
            <div className="royal-card p-6 rounded-2xl border border-slate-800 space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs uppercase font-extrabold text-amber-400">Federal Capital</span>
                <span className="text-xs px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-400 font-bold border border-emerald-500/20">Open Now</span>
              </div>
              <h4 className="text-base font-bold text-white flex items-center gap-2">
                <MapPin className="w-4 h-4 text-amber-400 shrink-0" />
                <span>Islamabad Branch</span>
              </h4>
              <p className="text-xs text-slate-400">
                Plot 18, Beverly Centre, Jinnah Avenue, Blue Area & F-7 Markaz, Islamabad
              </p>
              <div className="pt-2 border-t border-slate-800/80 flex items-center justify-between text-xs">
                <a href="tel:+92512345678" className="text-amber-400 hover:text-amber-300 font-bold">
                  +92 51 234-5678
                </a>
                <span className="text-slate-500">12:30 PM – 1:00 AM</span>
              </div>
            </div>

            {/* Branch 2: Lahore */}
            <div className="royal-card p-6 rounded-2xl border border-slate-800 space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs uppercase font-extrabold text-amber-400">Heart of Punjab</span>
                <span className="text-xs px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-400 font-bold border border-emerald-500/20">Open Now</span>
              </div>
              <h4 className="text-base font-bold text-white flex items-center gap-2">
                <MapPin className="w-4 h-4 text-amber-400 shrink-0" />
                <span>Lahore Branch</span>
              </h4>
              <p className="text-xs text-slate-400">
                MM Alam Road, Near Hussain Chowk, Gulberg III, Lahore
              </p>
              <div className="pt-2 border-t border-slate-800/80 flex items-center justify-between text-xs">
                <a href="tel:+924235789012" className="text-amber-400 hover:text-amber-300 font-bold">
                  +92 42 3578-9012
                </a>
                <span className="text-slate-500">12:30 PM – 1:30 AM</span>
              </div>
            </div>

            {/* Branch 3: Karachi */}
            <div className="royal-card p-6 rounded-2xl border border-slate-800 space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs uppercase font-extrabold text-amber-400">City of Lights</span>
                <span className="text-xs px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-400 font-bold border border-emerald-500/20">Open Now</span>
              </div>
              <h4 className="text-base font-bold text-white flex items-center gap-2">
                <MapPin className="w-4 h-4 text-amber-400 shrink-0" />
                <span>Karachi Branch</span>
              </h4>
              <p className="text-xs text-slate-400">
                Plot 32-C, Khayaban-e-Shamsheer, DHA Phase 5, Karachi
              </p>
              <div className="pt-2 border-t border-slate-800/80 flex items-center justify-between text-xs">
                <a href="tel:+922135678901" className="text-amber-400 hover:text-amber-300 font-bold">
                  +92 21 3567-8901
                </a>
                <span className="text-slate-500">1:00 PM – 2:00 AM</span>
              </div>
            </div>

          </div>

        </div>

        {/* Official Social Media Channels & Direct Interconnect */}
        <div className="pt-12 border-t border-slate-800 space-y-8">
          <div className="text-center max-w-2xl mx-auto space-y-2">
            <h3 className="text-2xl sm:text-3xl font-black text-white">
              Official Social Channels & Direct Connect
            </h3>
            <p className="text-slate-400 text-xs sm:text-sm">
              Follow our verified culinary accounts, message our team directly on WhatsApp, or email our management.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {SOCIAL_CONFIG.links.map((s) => (
              <a
                key={s.name}
                href={s.url}
                target="_blank"
                rel="noopener noreferrer"
                className={`p-5 rounded-2xl border transition-all hover:scale-[1.02] flex items-start gap-4 ${s.bgColor}`}
              >
                <div className="flex-1 space-y-1">
                  <div className="flex items-center justify-between">
                    <span className={`text-sm font-black ${s.color}`}>{s.name}</span>
                    <ExternalLink className="w-3.5 h-3.5 opacity-60 text-slate-400" />
                  </div>
                  <div className="text-xs font-mono font-bold text-white">{s.handle}</div>
                  <p className="text-[11px] text-slate-400 leading-relaxed pt-1">
                    {s.description}
                  </p>
                </div>
              </a>
            ))}

            {/* Direct Official Management Email Card */}
            <a
              href="mailto:asadgohar21@gmail.com"
              className="p-5 rounded-2xl border border-amber-500/30 bg-amber-500/10 hover:bg-amber-500/15 transition-all hover:scale-[1.02] flex items-start gap-4"
            >
              <div className="flex-1 space-y-1">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-black text-amber-400">Direct Executive Email</span>
                  <ExternalLink className="w-3.5 h-3.5 opacity-60 text-slate-400" />
                </div>
                <div className="text-xs font-mono font-bold text-white truncate">
                  asadgohar21@gmail.com
                </div>
                <p className="text-[11px] text-slate-400 leading-relaxed pt-1">
                  Direct management inbox for official partnerships, feedback, and enterprise bookings.
                </p>
              </div>
            </a>
          </div>
        </div>

      </div>
    </div>
  );
}
