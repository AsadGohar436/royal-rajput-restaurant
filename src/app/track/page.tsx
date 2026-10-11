'use client';

import React, { useState, useEffect, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import {
  Crown,
  Search,
  Clock,
  MapPin,
  Phone,
  CheckCircle2,
  Flame,
  Bike,
  PackageCheck,
  RefreshCw,
  Copy,
  Check,
  ArrowRight,
  AlertCircle,
  ShieldCheck,
  Receipt,
  FileText,
  ExternalLink,
  ChevronRight,
  Sparkles,
} from 'lucide-react';
import { OrderRecord } from '@/types';

// Tracking steps definition
interface TrackingStep {
  key: OrderRecord['status'];
  title: string;
  subtitle: string;
  urduHint: string;
  icon: React.ElementType;
}

const TRACKING_STEPS: TrackingStep[] = [
  {
    key: 'Pending',
    title: 'Order Placed',
    subtitle: 'Received in Supabase system',
    urduHint: 'Order received ho gaya hai',
    icon: Receipt,
  },
  {
    key: 'Confirmed',
    title: 'Order Confirmed',
    subtitle: 'Kitchen accepted your feast',
    urduHint: 'Kitchen ne order accept kar liya',
    icon: CheckCircle2,
  },
  {
    key: 'Preparing',
    title: 'Cooking & Charcoal BBQ',
    subtitle: 'Simmering on sigri & desi ghee',
    urduHint: 'Khana cook & grill ho raha hai',
    icon: Flame,
  },
  {
    key: 'Out for Delivery',
    title: 'Out for Delivery',
    subtitle: 'Rider dispatched with food warmer',
    urduHint: 'Rider khana le kar nikal gaya hai',
    icon: Bike,
  },
  {
    key: 'Delivered',
    title: 'Feast Delivered',
    subtitle: 'Delivered hot to your dastarkhwan',
    urduHint: 'Order deliver ho chuka hai',
    icon: PackageCheck,
  },
];

function getStepIndex(status: OrderRecord['status']): number {
  switch (status) {
    case 'Pending':
      return 0;
    case 'Confirmed':
      return 1;
    case 'Preparing':
      return 2;
    case 'Out for Delivery':
      return 3;
    case 'Delivered':
      return 4;
    case 'Cancelled':
      return -1;
    default:
      return 0;
  }
}

function TrackOrderContent() {
  const searchParams = useSearchParams();
  const initialQuery = searchParams.get('id') || searchParams.get('order') || searchParams.get('track') || '';

  const [searchQuery, setSearchQuery] = useState(initialQuery);
  const [order, setOrder] = useState<OrderRecord | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);
  const [lastRefreshed, setLastRefreshed] = useState<Date | null>(null);

  const fetchOrder = async (queryToSearch: string) => {
    if (!queryToSearch.trim()) {
      setError('Please enter your Order Number (e.g. RR-74001) or Mobile Number.');
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const res = await fetch(`/api/orders?track=${encodeURIComponent(queryToSearch.trim())}`);
      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || 'Failed to search order');
      }

      if (data.order) {
        setOrder(data.order);
        setLastRefreshed(new Date());
      } else if (data.orders && data.orders.length > 0) {
        setOrder(data.orders[0]);
        setLastRefreshed(new Date());
      } else {
        setOrder(null);
        setError(`No order found matching "${queryToSearch}". Please check the number and try again.`);
      }
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : 'Error retrieving order status';
      setError(msg);
      setOrder(null);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (initialQuery) {
      setSearchQuery(initialQuery);
      fetchOrder(initialQuery);
    }
  }, [initialQuery]);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    fetchOrder(searchQuery);
  };

  const copyOrderNumber = () => {
    if (order?.order_number || order?.id) {
      navigator.clipboard.writeText(order.order_number || order.id || '');
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const currentStepIdx = order ? getStepIndex(order.status) : 0;
  const isCancelled = order?.status === 'Cancelled';

  return (
    <div className="py-12 sm:py-16">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        
        {/* Header Banner */}
        <div className="text-center max-w-2xl mx-auto space-y-3">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/15 border border-amber-500/30 text-amber-400 text-xs font-bold uppercase tracking-widest">
            <Crown className="w-3.5 h-3.5" />
            Live Daraz-Style Order Tracking
          </div>
          <h1 className="text-3xl sm:text-5xl font-black text-white tracking-tight">
            Track Your Royal Order
          </h1>
          <p className="text-slate-400 text-sm sm:text-base">
            Enter your 5-digit Order Number (e.g. <span className="font-mono text-amber-400 font-bold">RR-74001</span>) or mobile number to track kitchen preparation and delivery progress in real time.
          </p>
        </div>

        {/* Search Input Bar */}
        <div className="royal-card p-4 sm:p-6 rounded-3xl border border-amber-500/30 shadow-2xl max-w-3xl mx-auto">
          <form onSubmit={handleSearchSubmit} className="flex flex-col sm:flex-row gap-3">
            <div className="relative flex-1">
              <Search className="w-5 h-5 text-amber-400/70 absolute left-4 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Enter Order # (e.g. RR-74001) or Mobile (0300-1234567)..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-12 pr-4 py-3.5 rounded-2xl bg-slate-950 border border-slate-800 text-white placeholder-slate-500 text-sm sm:text-base focus:outline-none focus:border-amber-500 focus:ring-2 focus:ring-amber-500/20 font-medium transition-all"
              />
            </div>
            <button
              type="submit"
              disabled={loading}
              className="px-7 py-3.5 bg-gradient-to-r from-amber-500 via-amber-600 to-yellow-500 text-slate-950 font-black text-sm uppercase tracking-wider rounded-2xl shadow-lg hover:brightness-110 active:scale-[0.98] transition-all flex items-center justify-center gap-2 shrink-0 disabled:opacity-60"
            >
              {loading ? (
                <>
                  <RefreshCw className="w-4 h-4 animate-spin" />
                  <span>Searching...</span>
                </>
              ) : (
                <>
                  <span>Track Status</span>
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>
          </form>

          {/* Quick Demo Shortcuts */}
          <div className="mt-3.5 pt-3 border-t border-slate-800 flex flex-wrap items-center justify-between text-xs text-slate-400 gap-2">
            <div className="flex items-center gap-2 flex-wrap">
              <span className="text-slate-500 font-medium">Quick Demo Test:</span>
              <button
                type="button"
                onClick={() => {
                  setSearchQuery('RR-74001');
                  fetchOrder('RR-74001');
                }}
                className="px-2.5 py-1 rounded-lg bg-slate-900 hover:bg-slate-800 text-amber-300 font-mono border border-slate-700 transition-colors"
              >
                RR-74001
              </button>
              <button
                type="button"
                onClick={() => {
                  setSearchQuery('RR-74002');
                  fetchOrder('RR-74002');
                }}
                className="px-2.5 py-1 rounded-lg bg-slate-900 hover:bg-slate-800 text-amber-300 font-mono border border-slate-700 transition-colors"
              >
                RR-74002
              </button>
              <button
                type="button"
                onClick={() => {
                  setSearchQuery('0300-9876543');
                  fetchOrder('0300-9876543');
                }}
                className="px-2.5 py-1 rounded-lg bg-slate-900 hover:bg-slate-800 text-amber-300 font-mono border border-slate-700 transition-colors"
              >
                By Phone
              </button>
            </div>

            <Link
              href="/admin"
              className="text-amber-400/80 hover:text-amber-300 font-semibold inline-flex items-center gap-1 transition-colors"
            >
              <span>Admin Order Updater</span>
              <ExternalLink className="w-3 h-3" />
            </Link>
          </div>
        </div>

        {/* Error Alert */}
        {error && (
          <div className="p-4 bg-red-950/40 border border-red-500/50 text-red-300 rounded-2xl flex items-start gap-3 max-w-3xl mx-auto">
            <AlertCircle className="w-5 h-5 text-red-400 shrink-0 mt-0.5" />
            <div className="text-sm">
              <span className="font-bold">Notice: </span>
              {error}
            </div>
          </div>
        )}

        {/* Order Details Display */}
        {order && (
          <div className="space-y-6 animate-in fade-in duration-300">
            
            {/* Top Order Summary Card */}
            <div className="royal-card p-6 sm:p-8 rounded-3xl border border-amber-500/30 shadow-2xl space-y-6">
              
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-slate-800">
                <div className="space-y-1">
                  <div className="flex items-center gap-3">
                    <span className="font-mono text-2xl sm:text-3xl font-black text-amber-400">
                      #{order.order_number || order.id?.slice(0, 8)}
                    </span>
                    <button
                      onClick={copyOrderNumber}
                      className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white border border-slate-700 transition-colors"
                      title="Copy Order Number"
                    >
                      {copied ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
                    </button>
                  </div>
                  <p className="text-xs text-slate-400">
                    Placed on: <span className="text-slate-300 font-medium">
                      {order.created_at ? new Date(order.created_at).toLocaleString('en-PK', { dateStyle: 'medium', timeStyle: 'short' }) : 'Recently'}
                    </span> • Customer: <strong className="text-white">{order.customer_name}</strong>
                  </p>
                </div>

                <div className="flex items-center gap-3">
                  <div className="text-right">
                    <div className="text-[11px] text-slate-400 uppercase tracking-wider font-semibold">
                      Live Status
                    </div>
                    <div className={`text-base sm:text-lg font-black inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full border mt-0.5 ${
                      order.status === 'Delivered'
                        ? 'bg-emerald-500/15 border-emerald-500/40 text-emerald-300'
                        : order.status === 'Cancelled'
                        ? 'bg-red-500/15 border-red-500/40 text-red-300'
                        : order.status === 'Preparing'
                        ? 'bg-orange-500/15 border-orange-500/40 text-orange-300'
                        : order.status === 'Out for Delivery'
                        ? 'bg-purple-500/15 border-purple-500/40 text-purple-300'
                        : 'bg-amber-500/15 border-amber-500/40 text-amber-300'
                    }`}>
                      <span className="w-2 h-2 rounded-full bg-current animate-ping" />
                      <span>{order.status}</span>
                    </div>
                  </div>

                  <button
                    onClick={() => fetchOrder(order.order_number || order.id || '')}
                    disabled={loading}
                    className="p-3 rounded-2xl bg-slate-900 hover:bg-slate-800 text-amber-400 border border-slate-800 hover:border-amber-500/30 transition-all shadow"
                    title="Refresh Live Status"
                  >
                    <RefreshCw className={`w-5 h-5 ${loading ? 'animate-spin' : ''}`} />
                  </button>
                </div>
              </div>

              {/* Daraz-Style Multi-Stage Stepper Progress Tracker */}
              {!isCancelled ? (
                <div className="space-y-6 pt-2">
                  <div className="flex items-center justify-between">
                    <h3 className="font-bold text-white text-sm uppercase tracking-widest flex items-center gap-2">
                      <Sparkles className="w-4 h-4 text-amber-400" />
                      <span>Order Journey Progress</span>
                    </h3>
                    <span className="text-xs text-slate-400">
                      Step {currentStepIdx + 1} of 5 Completed
                    </span>
                  </div>

                  {/* Horizontal Progress Bar for Desktop */}
                  <div className="relative hidden md:block">
                    {/* Background Track Line */}
                    <div className="absolute top-7 left-12 right-12 h-1.5 bg-slate-800 -z-0 rounded-full" />
                    
                    {/* Active Highlight Line */}
                    <div
                      className="absolute top-7 left-12 h-1.5 bg-gradient-to-r from-amber-500 via-amber-400 to-yellow-400 -z-0 rounded-full transition-all duration-700"
                      style={{
                        width: `${Math.min(100, Math.max(0, (currentStepIdx / (TRACKING_STEPS.length - 1)) * (100 - 15)))}%`,
                      }}
                    />

                    {/* Step Nodes */}
                    <div className="grid grid-cols-5 relative z-10 text-center">
                      {TRACKING_STEPS.map((step, idx) => {
                        const isDone = idx < currentStepIdx;
                        const isCurrent = idx === currentStepIdx;
                        const isUpcoming = idx > currentStepIdx;
                        const Icon = step.icon;

                        return (
                          <div key={step.key} className="flex flex-col items-center px-1">
                            {/* Circle Indicator */}
                            <div
                              className={`w-14 h-14 rounded-2xl flex items-center justify-center transition-all duration-300 shadow-xl ${
                                isDone
                                  ? 'bg-gradient-to-tr from-amber-500 to-yellow-400 text-slate-950 shadow-amber-500/20'
                                  : isCurrent
                                  ? 'bg-amber-500 text-slate-950 ring-4 ring-amber-500/30 scale-110 shadow-amber-500/40 animate-pulse'
                                  : 'bg-slate-900 border border-slate-800 text-slate-500'
                              }`}
                            >
                              <Icon className="w-6 h-6 stroke-[2.2]" />
                            </div>

                            {/* Label */}
                            <div className="mt-3 space-y-0.5">
                              <p
                                className={`text-xs font-black uppercase tracking-wider ${
                                  isCurrent
                                    ? 'text-amber-400 font-extrabold'
                                    : isDone
                                    ? 'text-white'
                                    : 'text-slate-500'
                                }`}
                              >
                                {step.title}
                              </p>
                              <p className="text-[11px] text-slate-400 line-clamp-1">
                                {step.subtitle}
                              </p>
                              <p className="text-[10px] text-amber-500/70 italic">
                                {step.urduHint}
                              </p>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>

                  {/* Vertical Progress Bar for Mobile */}
                  <div className="md:hidden space-y-4 pt-2">
                    {TRACKING_STEPS.map((step, idx) => {
                      const isDone = idx < currentStepIdx;
                      const isCurrent = idx === currentStepIdx;
                      const isUpcoming = idx > currentStepIdx;
                      const Icon = step.icon;

                      return (
                        <div key={step.key} className="flex items-start gap-4">
                          <div className="relative flex flex-col items-center">
                            <div
                              className={`w-11 h-11 rounded-xl flex items-center justify-center transition-all ${
                                isDone
                                  ? 'bg-gradient-to-tr from-amber-500 to-yellow-400 text-slate-950'
                                  : isCurrent
                                  ? 'bg-amber-500 text-slate-950 ring-4 ring-amber-500/30 scale-105'
                                  : 'bg-slate-900 border border-slate-800 text-slate-500'
                              }`}
                            >
                              <Icon className="w-5 h-5 stroke-[2.2]" />
                            </div>
                            {idx < TRACKING_STEPS.length - 1 && (
                              <div
                                className={`w-0.5 h-8 my-1 rounded-full ${
                                  idx < currentStepIdx ? 'bg-amber-500' : 'bg-slate-800'
                                }`}
                              />
                            )}
                          </div>

                          <div className="pt-1 min-w-0">
                            <div className="flex items-center gap-2">
                              <h4
                                className={`text-sm font-bold ${
                                  isCurrent ? 'text-amber-400' : isDone ? 'text-white' : 'text-slate-500'
                                }`}
                              >
                                {step.title}
                              </h4>
                              {isCurrent && (
                                <span className="text-[10px] bg-amber-500/20 text-amber-300 font-bold px-2 py-0.5 rounded-full border border-amber-500/40">
                                  CURRENT STAGE
                                </span>
                              )}
                            </div>
                            <p className="text-xs text-slate-400">{step.subtitle}</p>
                            <p className="text-[11px] text-amber-500/70 italic">{step.urduHint}</p>
                          </div>
                        </div>
                      );
                    })}
                  </div>

                  {/* Stage Context Callout Box */}
                  <div className="mt-4 p-4 rounded-2xl bg-slate-950 border border-slate-800 text-xs sm:text-sm text-slate-300 flex items-start gap-3">
                    <Clock className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
                    <div>
                      {order.status === 'Pending' && (
                        <span>
                          <strong className="text-amber-400">Order Received:</strong> Your feast has been recorded in the Supabase database. Our manager is verifying kitchen readiness.
                        </span>
                      )}
                      {order.status === 'Confirmed' && (
                        <span>
                          <strong className="text-amber-400">Order Confirmed:</strong> Royal Rajput master chef has confirmed ingredients and queued the dishes.
                        </span>
                      )}
                      {order.status === 'Preparing' && (
                        <span>
                          <strong className="text-amber-400">Cooking in Progress:</strong> Your handi & karahi are simmering in pure desi ghee, and BBQ skewers are smoking over natural charcoal.
                        </span>
                      )}
                      {order.status === 'Out for Delivery' && (
                        <span>
                          <strong className="text-amber-400">Rider on the Way:</strong> Dispatched in thermal hot-bags. The rider will contact your mobile upon arrival.
                        </span>
                      )}
                      {order.status === 'Delivered' && (
                        <span>
                          <strong className="text-emerald-400">Feast Delivered:</strong> Alhamdulillah! Bon appétit / Nosh-e-Jaan. Please contact us if you need anything else.
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              ) : (
                <div className="p-6 rounded-2xl bg-red-950/30 border border-red-500/40 text-center space-y-2">
                  <AlertCircle className="w-8 h-8 text-red-400 mx-auto" />
                  <h3 className="text-lg font-bold text-red-200">Order Cancelled</h3>
                  <p className="text-xs text-red-300 max-w-md mx-auto">
                    This order was marked as cancelled. If this was by mistake, please contact our helpline at +92 300 1234567.
                  </p>
                </div>
              )}

            </div>

            {/* Bottom 2 Columns: Order Items & Delivery Information */}
            <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
              
              {/* Items List */}
              <div className="md:col-span-7 royal-card p-6 rounded-3xl border border-slate-800 space-y-4">
                <h3 className="font-bold text-white text-sm uppercase tracking-widest flex items-center gap-2">
                  <Receipt className="w-4 h-4 text-amber-400" />
                  <span>Dishes in this Order</span>
                </h3>

                <div className="space-y-2.5">
                  {Array.isArray(order.items) &&
                    order.items.map((item, i) => (
                      <div
                        key={i}
                        className="flex items-center justify-between p-3 rounded-xl bg-slate-950/70 border border-slate-800/80 text-sm"
                      >
                        <div>
                          <div className="font-bold text-slate-100">{item.name}</div>
                          <div className="text-xs text-slate-400">
                            Rs. {Number(item.price).toLocaleString()} × {item.quantity}
                          </div>
                        </div>
                        <div className="font-mono font-bold text-amber-400">
                          Rs. {Number(item.subtotal || item.price * item.quantity).toLocaleString()}
                        </div>
                      </div>
                    ))}
                </div>

                <div className="pt-3 border-t border-slate-800 flex justify-between items-center font-bold text-base">
                  <span className="text-slate-300">Total Payable ({order.payment_method || 'Cash on Delivery'}):</span>
                  <span className="text-amber-400 text-xl font-black">
                    Rs. {Number(order.total_amount).toLocaleString()}
                  </span>
                </div>
              </div>

              {/* Delivery Details */}
              <div className="md:col-span-5 royal-card p-6 rounded-3xl border border-slate-800 space-y-4">
                <h3 className="font-bold text-white text-sm uppercase tracking-widest flex items-center gap-2">
                  <MapPin className="w-4 h-4 text-amber-400" />
                  <span>Delivery Destination</span>
                </h3>

                <div className="space-y-3 text-xs sm:text-sm text-slate-300">
                  <div className="p-3 bg-slate-950 rounded-xl border border-slate-800 space-y-1">
                    <span className="text-[11px] text-slate-500 uppercase font-semibold block">Customer</span>
                    <div className="font-bold text-white">{order.customer_name}</div>
                  </div>

                  <div className="p-3 bg-slate-950 rounded-xl border border-slate-800 space-y-1">
                    <span className="text-[11px] text-slate-500 uppercase font-semibold block">Mobile Contact</span>
                    <div className="font-mono text-amber-300 font-bold flex items-center gap-1.5">
                      <Phone className="w-3.5 h-3.5" />
                      <span>{order.phone_number}</span>
                    </div>
                  </div>

                  <div className="p-3 bg-slate-950 rounded-xl border border-slate-800 space-y-1">
                    <span className="text-[11px] text-slate-500 uppercase font-semibold block">Delivery Address</span>
                    <div className="text-slate-200">{order.delivery_address}</div>
                  </div>

                  {order.special_instructions && (
                    <div className="p-3 bg-slate-950 rounded-xl border border-slate-800 space-y-1">
                      <span className="text-[11px] text-slate-500 uppercase font-semibold block">Chef Notes</span>
                      <div className="text-amber-200/90 italic">{order.special_instructions}</div>
                    </div>
                  )}
                </div>

                <div className="pt-2">
                  <a
                    href="tel:+923001234567"
                    className="w-full py-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-amber-300 font-bold text-xs uppercase tracking-wider border border-amber-500/20 flex items-center justify-center gap-2 transition-colors"
                  >
                    <Phone className="w-3.5 h-3.5" />
                    <span>Call Helpline (+92 300 1234567)</span>
                  </a>
                </div>
              </div>

            </div>

          </div>
        )}

      </div>
    </div>
  );
}

export default function TrackOrderPage() {
  return (
    <Suspense
      fallback={
        <div className="py-24 text-center text-slate-400">
          <RefreshCw className="w-8 h-8 animate-spin mx-auto text-amber-400 mb-2" />
          <p className="text-sm">Loading Royal Rajput Order Tracking...</p>
        </div>
      }
    >
      <TrackOrderContent />
    </Suspense>
  );
}
