'use client';

import React, { useEffect, useState } from 'react';
import { OrderRecord } from '@/types';
import {
  Lock,
  KeyRound,
  Eye,
  EyeOff,
  LogOut,
  RefreshCw,
  Search,
  CheckCircle2,
  Clock,
  Flame,
  Truck,
  XCircle,
  MapPin,
  Phone,
  ExternalLink,
  ChevronDown,
  ShoppingBag,
  Sparkles,
  UtensilsCrossed,
  ArrowRight,
  ShieldCheck,
  Crown,
} from 'lucide-react';
import Link from 'next/link';

export default function AdminPage() {
  // Authentication states
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [passwordInput, setPasswordInput] = useState<string>('');
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [loginError, setLoginError] = useState<string | null>(null);
  const [isLoggingIn, setIsLoggingIn] = useState<boolean>(false);

  // Dashboard states
  const [orders, setOrders] = useState<OrderRecord[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [activeFilter, setActiveFilter] = useState<'All' | 'Pending' | 'Preparing' | 'Delivered'>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [updatingId, setUpdatingId] = useState<string | null>(null);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Check login session on mount
  useEffect(() => {
    const savedAuth = sessionStorage.getItem('rr_admin_auth');
    if (savedAuth === 'true') {
      setIsAuthenticated(true);
      fetchOrders();
    }
  }, []);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoginError(null);
    setIsLoggingIn(true);

    try {
      const res = await fetch('/api/admin/auth', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ password: passwordInput.trim() }),
      });

      const data = await res.json();

      if (!res.ok || !data.success) {
        throw new Error(data.error || 'Invalid admin password.');
      }

      sessionStorage.setItem('rr_admin_auth', 'true');
      setIsAuthenticated(true);
      fetchOrders();
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : 'Login failed';
      setLoginError(msg);
    } finally {
      setIsLoggingIn(false);
    }
  };

  const handleLogout = () => {
    sessionStorage.removeItem('rr_admin_auth');
    setIsAuthenticated(false);
    setPasswordInput('');
    setLoginError(null);
  };

  const fetchOrders = async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/orders');
      const data = await res.json();
      if (res.ok && data.orders) {
        setOrders(data.orders);
      }
    } catch (err) {
      console.error('Error fetching orders:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleStatusChange = async (order: OrderRecord, newStatus: OrderRecord['status']) => {
    if (order.status === newStatus) return;

    const identifier = order.order_number || order.id || '';
    setUpdatingId(identifier);

    try {
      const res = await fetch('/api/orders', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          id: order.id,
          order_number: order.order_number,
          status: newStatus,
        }),
      });

      const data = await res.json();
      if (!res.ok || !data.success) {
        throw new Error(data.error || 'Failed to update order status');
      }

      // Optimistic update
      setOrders((prev) =>
        prev.map((o) =>
          o.id === order.id || o.order_number === order.order_number
            ? { ...o, status: newStatus }
            : o
        )
      );

      setToastMessage(`Order #${order.order_number || order.id?.slice(0, 8)} set to "${newStatus}"!`);
      setTimeout(() => setToastMessage(null), 3000);
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : 'Update failed';
      alert(`Error updating status: ${msg}`);
    } finally {
      setUpdatingId(null);
    }
  };

  // Metric counts
  const totalOrders = orders.length;
  const pendingOrders = orders.filter((o) => o.status === 'Pending').length;
  const preparingOrders = orders.filter((o) => o.status === 'Preparing').length;
  const deliveredOrders = orders.filter((o) => o.status === 'Delivered').length;

  // Filtered orders
  const filteredOrders = orders.filter((o) => {
    const matchesFilter =
      activeFilter === 'All'
        ? true
        : activeFilter === 'Pending'
        ? o.status === 'Pending'
        : activeFilter === 'Preparing'
        ? o.status === 'Preparing'
        : activeFilter === 'Delivered'
        ? o.status === 'Delivered'
        : true;

    const query = searchQuery.toLowerCase().trim();
    const matchesSearch =
      !query ||
      o.customer_name?.toLowerCase().includes(query) ||
      o.phone_number?.toLowerCase().includes(query) ||
      o.delivery_address?.toLowerCase().includes(query) ||
      o.order_number?.toLowerCase().includes(query) ||
      o.id?.toLowerCase().includes(query);

    return matchesFilter && matchesSearch;
  });

  // 1. Password Protection Screen (if not logged in)
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-[#070b14] flex items-center justify-center p-4">
        <div className="w-full max-w-md bg-[#0f172a] border border-amber-500/30 rounded-3xl p-8 sm:p-10 shadow-2xl relative overflow-hidden">
          {/* Subtle Ambient Glow */}
          <div className="absolute top-0 right-0 w-48 h-48 bg-amber-500/10 blur-3xl pointer-events-none rounded-full" />
          <div className="absolute bottom-0 left-0 w-48 h-48 bg-yellow-500/10 blur-3xl pointer-events-none rounded-full" />

          <div className="text-center space-y-4 mb-8">
            <div className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-amber-600 via-amber-500 to-yellow-400 text-slate-950 flex items-center justify-center mx-auto shadow-lg shadow-amber-500/20">
              <Lock className="w-8 h-8" />
            </div>

            <div>
              <span className="text-[10px] uppercase font-black text-amber-400 tracking-widest bg-amber-500/15 px-3 py-1 rounded-full border border-amber-500/30 inline-block mb-1">
                Restricted Admin Console
              </span>
              <h1 className="text-2xl sm:text-3xl font-black text-white">
                Royal Rajput
              </h1>
              <p className="text-xs text-slate-400 mt-1">
                Please enter the administrator password to view live orders and manage kitchen workflow.
              </p>
            </div>
          </div>

          {loginError && (
            <div className="mb-5 p-3.5 bg-red-950/40 border border-red-500/50 text-red-300 text-xs rounded-xl flex items-center gap-2">
              <span className="font-bold">Error:</span> {loginError}
            </div>
          )}

          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-1.5">
                Admin Password
              </label>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  placeholder="Enter admin password (default: admin123)"
                  value={passwordInput}
                  onChange={(e) => setPasswordInput(e.target.value)}
                  className="w-full pl-4 pr-11 py-3 bg-slate-950 border border-slate-800 rounded-xl text-white text-sm focus:outline-none focus:border-amber-500 focus:ring-2 focus:ring-amber-500/20 transition-all font-medium"
                  autoFocus
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-500 hover:text-slate-300 transition-colors"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            <button
              type="submit"
              disabled={isLoggingIn || !passwordInput}
              className="w-full py-3.5 bg-gradient-to-r from-amber-500 via-amber-600 to-yellow-500 text-slate-950 font-black text-sm uppercase tracking-wider rounded-xl shadow-lg shadow-amber-500/20 hover:brightness-110 active:scale-[0.99] transition-all disabled:opacity-50"
            >
              {isLoggingIn ? 'Verifying Password...' : 'Unlock Admin Dashboard'}
            </button>

            <div className="pt-2 text-center">
              <p className="text-[11px] text-slate-500">
                Default Access Password: <code className="bg-slate-900 text-amber-300 px-1.5 py-0.5 rounded font-mono">admin123</code>
              </p>
              <Link
                href="/"
                className="mt-3 inline-block text-xs text-amber-400 hover:text-amber-300 transition-colors"
              >
                ← Back to Restaurant Website
              </Link>
            </div>
          </form>
        </div>
      </div>
    );
  }

  // 2. Full Admin Dashboard (matching the user's provided screenshot)
  return (
    <div className="min-h-screen bg-[#090d16] text-slate-100 flex flex-col md:flex-row font-sans">
      
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed top-5 right-5 z-50 p-3.5 bg-emerald-950 border border-emerald-500 text-emerald-200 rounded-xl shadow-2xl text-xs font-bold flex items-center gap-2 animate-in slide-in-from-top-3">
          <Sparkles className="w-4 h-4 text-emerald-400 shrink-0" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* LEFT SIDEBAR (Matching Screenshot) */}
      <aside className="w-full md:w-64 bg-[#0d1322] border-b md:border-b-0 md:border-r border-slate-800 flex flex-col justify-between shrink-0">
        <div>
          {/* Logo & Header */}
          <div className="p-6 flex items-center gap-3 border-b border-slate-800/80">
            <div className="w-11 h-11 rounded-2xl bg-gradient-to-tr from-amber-500 to-orange-500 flex items-center justify-center text-slate-950 shadow-md shrink-0">
              <UtensilsCrossed className="w-6 h-6 stroke-[2.2]" />
            </div>
            <div>
              <h2 className="font-black text-base text-white tracking-tight leading-none">
                Royal Rajput
              </h2>
              <span className="text-[10px] uppercase font-bold text-slate-400 tracking-wider">
                ADMIN CONSOLE
              </span>
            </div>
          </div>

          {/* Navigation Links */}
          <div className="p-4 space-y-1.5">
            <button
              onClick={() => setActiveFilter('All')}
              className="w-full flex items-center justify-between px-4 py-3 rounded-2xl bg-[#ea580c] text-white font-bold text-sm shadow-lg shadow-orange-600/30 transition-all"
            >
              <div className="flex items-center gap-3">
                <ShoppingBag className="w-4 h-4" />
                <span>Orders</span>
              </div>
              <span className="w-6 h-6 rounded-full bg-white text-orange-600 text-xs font-black flex items-center justify-center">
                {orders.length}
              </span>
            </button>
          </div>
        </div>

        {/* Bottom Sidebar: Logout & Home Link */}
        <div className="p-4 border-t border-slate-800/80 space-y-2">
          <Link
            href="/"
            className="w-full flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
          >
            <span>View Restaurant Live</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </Link>

          <button
            onClick={handleLogout}
            className="w-full flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-red-400 hover:text-red-300 border border-slate-800 hover:border-red-500/30 text-xs font-bold transition-all"
          >
            <LogOut className="w-4 h-4" />
            <span>Logout</span>
          </button>
        </div>
      </aside>

      {/* RIGHT MAIN AREA (Matching Screenshot) */}
      <main className="flex-1 p-4 sm:p-8 space-y-6 overflow-x-hidden">
        
        {/* Top Header Row */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-2">
          <div>
            <h1 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
              Orders Management
            </h1>
            <p className="text-xs sm:text-sm text-slate-400 mt-0.5">
              Real-time orders synced with Supabase & Gmail
            </p>
          </div>

          <div className="flex items-center gap-3 flex-wrap">
            <button
              onClick={fetchOrders}
              disabled={loading}
              className="px-4 py-2 rounded-xl bg-[#131b2e] hover:bg-[#1a253e] text-slate-200 hover:text-white border border-slate-700/60 text-xs font-bold flex items-center gap-2 transition-all"
            >
              <RefreshCw className={`w-3.5 h-3.5 text-amber-400 ${loading ? 'animate-spin' : ''}`} />
              <span>Refresh</span>
            </button>

            <div className="px-3 py-1.5 rounded-xl bg-[#131b2e] border border-slate-700/60 flex items-center gap-2 text-xs font-semibold text-slate-300">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span>asadgohar21@gmail.com</span>
            </div>
          </div>
        </div>

        {/* 4 Summary Metric Cards (Matching Screenshot) */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          
          {/* Total Orders Card */}
          <div className="bg-[#0f172a]/90 rounded-2xl p-5 border border-slate-800 shadow-lg space-y-2">
            <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400">
              TOTAL ORDERS
            </span>
            <div className="text-3xl sm:text-4xl font-black text-white">
              {totalOrders}
            </div>
          </div>

          {/* Pending Orders Card */}
          <div className="bg-[#0f172a]/90 rounded-2xl p-5 border border-amber-500/30 shadow-lg space-y-2">
            <span className="text-[11px] font-bold uppercase tracking-wider text-amber-400">
              PENDING ORDERS
            </span>
            <div className="text-3xl sm:text-4xl font-black text-amber-400">
              {pendingOrders}
            </div>
          </div>

          {/* Preparing Card */}
          <div className="bg-[#0f172a]/90 rounded-2xl p-5 border border-blue-500/30 shadow-lg space-y-2">
            <span className="text-[11px] font-bold uppercase tracking-wider text-blue-400">
              PREPARING
            </span>
            <div className="text-3xl sm:text-4xl font-black text-blue-400">
              {preparingOrders}
            </div>
          </div>

          {/* Delivered Card */}
          <div className="bg-[#0f172a]/90 rounded-2xl p-5 border border-emerald-500/30 shadow-lg space-y-2">
            <span className="text-[11px] font-bold uppercase tracking-wider text-emerald-400">
              DELIVERED
            </span>
            <div className="text-3xl sm:text-4xl font-black text-emerald-400">
              {deliveredOrders}
            </div>
          </div>

        </div>

        {/* Filter Pills & Search Bar (Matching Screenshot) */}
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4 pt-2">
          
          {/* Left Filter Pills */}
          <div className="flex items-center gap-2 overflow-x-auto pb-1 sm:pb-0">
            {(['All', 'Pending', 'Preparing', 'Delivered'] as const).map((filter) => {
              const isActive = activeFilter === filter;
              return (
                <button
                  key={filter}
                  onClick={() => setActiveFilter(filter)}
                  className={`px-4 py-2 rounded-xl text-xs font-bold transition-all whitespace-nowrap ${
                    isActive
                      ? 'bg-[#ea580c] text-white shadow-md shadow-orange-600/30'
                      : 'bg-[#131b2e] text-slate-300 hover:text-white hover:bg-[#1a253e] border border-slate-800'
                  }`}
                >
                  {filter}
                </button>
              );
            })}
          </div>

          {/* Right Search Input */}
          <div className="relative w-full sm:w-72">
            <input
              type="text"
              placeholder="Search customer, phone..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-4 pr-9 py-2 bg-[#131b2e] border border-slate-800 rounded-xl text-xs text-white placeholder-slate-500 focus:outline-none focus:border-amber-500 transition-colors"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-slate-400 hover:text-white"
              >
                ✕
              </button>
            )}
          </div>

        </div>

        {/* Orders Table (Matching Screenshot Layout) */}
        <div className="bg-[#0f172a]/90 rounded-2xl border border-slate-800 shadow-xl overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse text-xs">
              
              {/* Table Header */}
              <thead>
                <tr className="border-b border-slate-800 text-[11px] font-bold uppercase tracking-wider text-slate-400 bg-[#0d1322]">
                  <th className="py-4 px-5">Customer Name</th>
                  <th className="py-4 px-5">Dishes (quantity ke sath)</th>
                  <th className="py-4 px-5">Total (Rs.)</th>
                  <th className="py-4 px-5">Time</th>
                  <th className="py-4 px-5">Status</th>
                </tr>
              </thead>

              {/* Table Body */}
              <tbody className="divide-y divide-slate-800/80">
                {loading ? (
                  <tr>
                    <td colSpan={5} className="py-12 text-center text-slate-400">
                      <RefreshCw className="w-6 h-6 animate-spin mx-auto text-amber-400 mb-2" />
                      <span>Loading orders from Supabase...</span>
                    </td>
                  </tr>
                ) : filteredOrders.length === 0 ? (
                  <tr>
                    <td colSpan={5} className="py-12 text-center text-slate-400">
                      <ShoppingBag className="w-8 h-8 text-slate-600 mx-auto mb-2" />
                      <span className="font-bold text-slate-300">No orders found</span>
                      <p className="text-[11px] text-slate-500 mt-1">
                        {searchQuery ? 'Try resetting search query' : 'Orders placed on the website will show up here live from Supabase!'}
                      </p>
                    </td>
                  </tr>
                ) : (
                  filteredOrders.map((ord) => {
                    const orderRef = ord.order_number || ord.id?.slice(0, 8) || 'N/A';
                    const orderTime = ord.created_at
                      ? new Date(ord.created_at).toLocaleString('en-PK', {
                          month: 'numeric',
                          day: 'numeric',
                          year: 'numeric',
                          hour: 'numeric',
                          minute: '2-digit',
                          second: '2-digit',
                          hour12: true,
                        })
                      : 'Just now';

                    const isUpdating = updatingId === (ord.order_number || ord.id);

                    return (
                      <tr key={ord.id} className="hover:bg-[#131b2e]/50 transition-colors">
                        
                        {/* 1. CUSTOMER NAME */}
                        <td className="py-4 px-5 align-top">
                          <div className="space-y-1">
                            <div className="font-bold text-white text-sm flex items-center gap-2">
                              <span>{ord.customer_name}</span>
                              <span className="font-mono font-bold text-amber-400 text-xs bg-amber-500/10 px-2 py-0.5 rounded-md border border-amber-500/20">
                                #{orderRef}
                              </span>
                            </div>
                            <div className="flex items-center gap-1.5 text-amber-400 font-mono text-xs">
                              <Phone className="w-3.5 h-3.5 shrink-0" />
                              <span>{ord.phone_number}</span>
                            </div>
                            <div className="flex items-start gap-1.5 text-slate-300 text-[11px] max-w-xs">
                              <MapPin className="w-3.5 h-3.5 text-red-400 shrink-0 mt-0.5" />
                              <span className="line-clamp-2">{ord.delivery_address}</span>
                            </div>
                            {ord.special_instructions && (
                              <div className="text-[10px] text-amber-300/80 italic mt-0.5">
                                Note: {ord.special_instructions}
                              </div>
                            )}
                            <Link
                              href={`/track?id=${encodeURIComponent(orderRef)}`}
                              target="_blank"
                              className="inline-flex items-center gap-1 text-[11px] font-semibold text-blue-400 hover:text-blue-300 transition-colors pt-1"
                            >
                              <span>🔍 Track Live</span>
                            </Link>
                          </div>
                        </td>

                        {/* 2. DISHES (QUANTITY KE SATH) */}
                        <td className="py-4 px-5 align-top">
                          <div className="space-y-1.5">
                            {Array.isArray(ord.items) &&
                              ord.items.map((item, i) => (
                                <div
                                  key={i}
                                  className="text-slate-200 text-xs flex items-center justify-between gap-3 bg-slate-900/60 px-2.5 py-1 rounded-lg border border-slate-800"
                                >
                                  <span className="font-medium text-slate-100">{item.name}</span>
                                  <span className="bg-amber-500/20 text-amber-300 font-bold px-2 py-0.5 rounded text-[11px] shrink-0 border border-amber-500/30">
                                    × {item.quantity}
                                  </span>
                                </div>
                              ))}
                          </div>
                        </td>

                        {/* 3. TOTAL (RS.) */}
                        <td className="py-4 px-5 align-top">
                          <div className="font-black text-amber-400 text-base">
                            Rs. {Number(ord.total_amount).toLocaleString()}
                          </div>
                          <span className="text-[10px] text-slate-500 uppercase font-medium">
                            Cash on Delivery
                          </span>
                        </td>

                        {/* 4. TIME */}
                        <td className="py-4 px-5 align-top">
                          <div className="text-xs font-semibold text-slate-200">
                            {orderTime}
                          </div>
                          <span className="text-[10px] text-slate-500 block mt-0.5">
                            Supabase Timestamp
                          </span>
                        </td>

                        {/* 5. STATUS */}
                        <td className="py-4 px-5 align-top">
                          <div className="relative inline-block">
                            <select
                              value={ord.status}
                              disabled={isUpdating}
                              onChange={(e) =>
                                handleStatusChange(ord, e.target.value as OrderRecord['status'])
                              }
                              className={`appearance-none cursor-pointer py-1.5 pl-3 pr-8 rounded-full text-xs font-bold border transition-all focus:outline-none focus:ring-2 focus:ring-amber-500/30 ${
                                ord.status === 'Delivered'
                                  ? 'bg-emerald-950/60 border-emerald-500/60 text-emerald-300'
                                  : ord.status === 'Preparing'
                                  ? 'bg-blue-950/60 border-blue-500/60 text-blue-300'
                                  : ord.status === 'Out for Delivery'
                                  ? 'bg-purple-950/60 border-purple-500/60 text-purple-300'
                                  : ord.status === 'Cancelled'
                                  ? 'bg-red-950/60 border-red-500/60 text-red-300'
                                  : 'bg-amber-950/60 border-amber-500/60 text-amber-300'
                              }`}
                            >
                              <option value="Pending" className="bg-slate-900 text-amber-300">
                                ⏳ Pending
                              </option>
                              <option value="Confirmed" className="bg-slate-900 text-sky-300">
                                📋 Confirmed
                              </option>
                              <option value="Preparing" className="bg-slate-900 text-blue-300">
                                🔥 Preparing
                              </option>
                              <option value="Out for Delivery" className="bg-slate-900 text-purple-300">
                                🚚 Out for Delivery
                              </option>
                              <option value="Delivered" className="bg-slate-900 text-emerald-300">
                                ✓ Delivered
                              </option>
                              <option value="Cancelled" className="bg-slate-900 text-red-300">
                                ✕ Cancelled
                              </option>
                            </select>
                            <ChevronDown className="w-3.5 h-3.5 text-current absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none opacity-80" />
                          </div>
                        </td>

                      </tr>
                    );
                  })
                )}
              </tbody>

            </table>
          </div>
        </div>

      </main>

    </div>
  );
}
