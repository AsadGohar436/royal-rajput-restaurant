'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useCart } from '@/context/CartContext';
import {
  Crown,
  ShoppingBag,
  CheckCircle2,
  AlertCircle,
  Loader2,
  MapPin,
  Phone,
  User,
  FileText,
  Trash2,
  Plus,
  Minus,
  Sparkles,
  ArrowRight,
  ShieldCheck,
  CreditCard,
  Banknote,
} from 'lucide-react';

export default function OrderPage() {
  const {
    cart,
    updateQuantity,
    clearCart,
    subtotal,
    deliveryFee,
    gstTax,
    grandTotal,
  } = useCart();

  const [customerName, setCustomerName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [deliveryAddress, setDeliveryAddress] = useState('');
  const [specialInstructions, setSpecialInstructions] = useState('');
  const [paymentMethod, setPaymentMethod] = useState<'Cash on Delivery' | 'Card on Delivery' | 'JazzCash / EasyPaisa'>('Cash on Delivery');

  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submittedOrder, setSubmittedOrder] = useState<{
    id?: string;
    order_number?: string;
    total?: number;
    emailSent?: boolean;
    status?: string;
  } | null>(null);
  const [apiError, setApiError] = useState<string | null>(null);
  const [copiedTracking, setCopiedTracking] = useState(false);

  const validate = (): boolean => {
    const errs: { [key: string]: string } = {};

    if (!customerName.trim()) {
      errs.customerName = 'Customer Name is required.';
    } else if (customerName.trim().length < 2) {
      errs.customerName = 'Name must be at least 2 characters.';
    }

    if (!phoneNumber.trim()) {
      errs.phoneNumber = 'Pakistani Mobile Number is required (e.g. 0300-1234567).';
    } else if (phoneNumber.trim().length < 8) {
      errs.phoneNumber = 'Please enter a valid phone number.';
    }

    if (!deliveryAddress.trim()) {
      errs.deliveryAddress = 'Complete Delivery Address is required.';
    } else if (deliveryAddress.trim().length < 5) {
      errs.deliveryAddress = 'Please include complete house, street, and sector details.';
    }

    if (cart.length === 0) {
      errs.cart = 'Please add at least one dish from our royal menu before placing order.';
    }

    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handlePlaceOrder = async (e: React.FormEvent) => {
    e.preventDefault();
    setApiError(null);

    if (!validate()) return;

    setIsSubmitting(true);

    try {
      const payload = {
        customerName: customerName.trim(),
        phoneNumber: phoneNumber.trim(),
        deliveryAddress: deliveryAddress.trim(),
        specialInstructions: specialInstructions.trim(),
        paymentMethod: paymentMethod,
        items: cart.map((i) => ({
          dish_id: i.dish.id,
          name: i.dish.name,
          price: i.dish.price,
          quantity: i.quantity,
          subtotal: i.dish.price * i.quantity,
        })),
        total_amount: grandTotal,
      };

      const res = await fetch('/api/orders', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      const data = await res.json();

      if (!res.ok || !data.success) {
        throw new Error(data.error || 'Failed to submit order.');
      }

      setSubmittedOrder({
        id: data.data?.id,
        order_number: data.data?.order_number,
        total: grandTotal,
        emailSent: data.emailSent,
        status: data.data?.status || 'Pending',
      });
      clearCart();
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : 'Order submission failed';
      setApiError(msg);
    } finally {
      setIsSubmitting(false);
    }
  };

  const resetForm = () => {
    setSubmittedOrder(null);
    setCustomerName('');
    setPhoneNumber('');
    setDeliveryAddress('');
    setSpecialInstructions('');
    setErrors({});
    setApiError(null);
  };

  return (
    <div className="py-12 sm:py-16">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Page Title */}
        <div className="text-center max-w-2xl mx-auto mb-12 space-y-2">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/15 border border-amber-500/30 text-amber-400 text-xs font-bold uppercase tracking-widest">
            <Crown className="w-3.5 h-3.5" />
            Direct Online Ordering & Delivery
          </div>
          <h1 className="text-3xl sm:text-5xl font-black text-white tracking-tight">
            Order From Royal Rajput
          </h1>
          <p className="text-slate-400 text-sm sm:text-base">
            Review your dishes, provide your delivery address in Pakistan, and confirm your order. Recorded in Supabase database with status <strong className="text-amber-400">Pending</strong>, assigns an instant tracking number, and notified via Gmail!
          </p>
        </div>

        {/* Confirmation Screen */}
        {submittedOrder ? (
          <div className="bg-slate-900 border border-amber-500/30 rounded-3xl p-8 sm:p-12 shadow-2xl text-center max-w-2xl mx-auto space-y-6">
            <div className="w-16 h-16 bg-emerald-500/15 border border-emerald-500/30 text-emerald-400 rounded-full flex items-center justify-center mx-auto shadow-inner">
              <CheckCircle2 className="w-10 h-10" />
            </div>

            <div className="space-y-1">
              <span className="inline-block bg-amber-500/20 text-amber-300 text-xs font-bold px-3 py-1 rounded-full border border-amber-500/40 mb-2">
                Order Status: {submittedOrder.status || 'Pending'}
              </span>
              <h2 className="text-3xl font-black text-white">
                Order Placed Successfully!
              </h2>
              <p className="text-sm text-slate-400 max-w-md mx-auto">
                Shukriya, <strong className="text-amber-400">{customerName}</strong>! Your order is saved into our Supabase <code className="text-xs bg-slate-950 px-1.5 py-0.5 rounded text-amber-300 font-mono">orders</code> table.
              </p>
            </div>

            {/* Prominent Daraz-Style Tracking Number Banner */}
            <div className="p-4 rounded-2xl bg-gradient-to-r from-amber-500/15 via-yellow-500/10 to-amber-500/15 border border-amber-500/40 flex flex-col sm:flex-row items-center justify-between gap-3">
              <div className="text-left">
                <span className="text-[11px] text-amber-400/90 uppercase tracking-widest font-black block">
                  Your Order Tracking Number
                </span>
                <span className="font-mono text-2xl font-black text-white tracking-wider">
                  #{submittedOrder.order_number || submittedOrder.id?.slice(0, 8)}
                </span>
              </div>

              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => {
                    const code = submittedOrder.order_number || submittedOrder.id || '';
                    navigator.clipboard.writeText(code);
                    setCopiedTracking(true);
                    setTimeout(() => setCopiedTracking(false), 2000);
                  }}
                  className="px-3.5 py-2 rounded-xl bg-slate-950 hover:bg-slate-800 text-amber-300 text-xs font-bold border border-amber-500/30 transition-all flex items-center gap-1.5"
                >
                  {copiedTracking ? 'Copied!' : 'Copy Number'}
                </button>

                <Link
                  href={`/track?id=${encodeURIComponent(submittedOrder.order_number || submittedOrder.id || '')}`}
                  className="px-4 py-2 rounded-xl bg-gradient-to-r from-amber-500 to-yellow-500 text-slate-950 text-xs font-black uppercase tracking-wider hover:brightness-110 shadow-md flex items-center gap-1"
                >
                  <span>Track Live →</span>
                </Link>
              </div>
            </div>

            <div className="bg-slate-950 rounded-2xl p-6 border border-slate-800 text-left space-y-3 text-sm">
              <div className="flex justify-between items-center pb-2 border-b border-slate-800">
                <span className="text-slate-400 font-medium">Tracking Reference:</span>
                <span className="font-mono font-bold text-amber-400">
                  #{submittedOrder.order_number || submittedOrder.id?.slice(0, 8)}
                </span>
              </div>
              <div className="flex justify-between items-center pb-2 border-b border-slate-800">
                <span className="text-slate-400 font-medium">Total Payable ({paymentMethod}):</span>
                <span className="font-black text-amber-400 text-lg">
                  Rs. {submittedOrder.total?.toLocaleString()}
                </span>
              </div>
              <div className="flex justify-between items-center pb-2 border-b border-slate-800">
                <span className="text-slate-400 font-medium">Delivery Address:</span>
                <span className="font-medium text-slate-200 text-right max-w-[260px] truncate">
                  {deliveryAddress}
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-slate-400 font-medium">Kitchen Gmail Notification:</span>
                <span className="inline-flex items-center gap-1 text-emerald-400 font-bold text-xs">
                  <Sparkles className="w-3.5 h-3.5" /> Dispatched to Kitchen Inbox
                </span>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-3 justify-center pt-2">
              <Link
                href={`/track?id=${encodeURIComponent(submittedOrder.order_number || submittedOrder.id || '')}`}
                className="px-8 py-3.5 bg-gradient-to-r from-amber-500 via-amber-600 to-yellow-500 text-slate-950 font-black rounded-xl shadow-md transition-all hover:brightness-110 flex items-center justify-center gap-2 text-sm uppercase tracking-wider"
              >
                <span>Track Order Live (Daraz Style)</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
              <button
                onClick={resetForm}
                className="px-6 py-3.5 bg-slate-800 hover:bg-slate-700 text-slate-200 font-bold rounded-xl border border-slate-700 transition-all text-sm"
              >
                Place Another Order
              </button>
            </div>
          </div>
        ) : (
          <div className="royal-card rounded-3xl overflow-hidden shadow-2xl border border-amber-500/20">
            <div className="grid grid-cols-1 lg:grid-cols-12">
              
              {/* Left Column: Cart Dish Selection & Quantities */}
              <div className="lg:col-span-6 p-6 sm:p-8 bg-slate-950/60 border-b lg:border-b-0 lg:border-r border-slate-800 space-y-6">
                <div className="flex items-center justify-between">
                  <h3 className="font-bold text-white text-sm uppercase tracking-widest flex items-center gap-2">
                    <ShoppingBag className="w-4 h-4 text-amber-400" />
                    <span>Your Selected Dishes</span>
                  </h3>
                  {cart.length > 0 && (
                    <button
                      type="button"
                      onClick={clearCart}
                      className="text-xs text-slate-500 hover:text-red-400 transition-colors flex items-center gap-1"
                    >
                      <Trash2 className="w-3 h-3" /> Clear All
                    </button>
                  )}
                </div>

                {errors.cart && (
                  <div className="p-3 bg-red-950/40 border border-red-500/40 text-red-300 text-xs rounded-xl flex items-center gap-2 font-medium">
                    <AlertCircle className="w-4 h-4 shrink-0" />
                    {errors.cart}
                  </div>
                )}

                {cart.length === 0 ? (
                  <div className="text-center py-14 bg-slate-900/50 rounded-2xl border border-dashed border-slate-800 p-6 space-y-3">
                    <ShoppingBag className="w-10 h-10 text-slate-600 mx-auto" />
                    <h4 className="font-bold text-slate-200 text-base">Your dastarkhwan is empty</h4>
                    <p className="text-xs text-slate-500 max-w-xs mx-auto">
                      Choose from our Royal Dum Biryani, Desi Ghee Mutton Karahi, and Charcoal BBQ.
                    </p>
                    <Link
                      href="/menu"
                      className="mt-2 inline-flex items-center gap-1.5 px-5 py-2.5 bg-gradient-to-r from-amber-500 to-yellow-500 text-slate-950 text-xs font-black uppercase tracking-wider rounded-xl hover:brightness-110 transition-all"
                    >
                      <span>Explore Royal Menu</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </Link>
                  </div>
                ) : (
                  <div className="space-y-3 max-h-80 overflow-y-auto pr-1">
                    {cart.map((item) => (
                      <div
                        key={item.dish.id}
                        className="flex items-center justify-between p-3.5 bg-slate-900 rounded-xl border border-slate-800"
                      >
                        <div className="flex items-center gap-3 min-w-0">
                          <img
                            src={item.dish.image}
                            alt={item.dish.name}
                            className="w-12 h-12 rounded-lg object-cover shrink-0 border border-slate-800"
                          />
                          <div className="min-w-0">
                            <p className="text-sm font-bold text-white truncate">
                              {item.dish.name}
                            </p>
                            <p className="text-xs text-amber-400 font-semibold">
                              Rs. {item.dish.price.toLocaleString()} each
                            </p>
                          </div>
                        </div>

                        <div className="flex flex-col sm:flex-row items-end sm:items-center gap-2 sm:gap-3 shrink-0">
                          <div className="flex items-center gap-1 bg-slate-950 border border-slate-700 rounded-lg p-1">
                            <button
                              type="button"
                              onClick={() => updateQuantity(item.dish.id, item.quantity - 1)}
                              className="w-6 h-6 rounded flex items-center justify-center text-slate-400 hover:text-white transition-colors"
                              aria-label="Decrease quantity"
                            >
                              <Minus className="w-3 h-3" />
                            </button>
                            <span className="w-6 text-center text-xs font-bold text-white">
                              {item.quantity}
                            </span>
                            <button
                              type="button"
                              onClick={() => updateQuantity(item.dish.id, item.quantity + 1)}
                              className="w-6 h-6 rounded flex items-center justify-center text-amber-400 hover:text-white transition-colors"
                              aria-label="Increase quantity"
                            >
                              <Plus className="w-3 h-3" />
                            </button>
                          </div>
                          <span className="text-xs sm:text-sm font-bold text-white text-right whitespace-nowrap">
                            Rs. {(item.dish.price * item.quantity).toLocaleString()}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                )}

                {/* Subtotal Calculation Breakdown */}
                {cart.length > 0 && (
                  <div className="bg-slate-900 p-4 rounded-xl border border-slate-800 space-y-2 text-xs sm:text-sm">
                    <div className="flex justify-between text-slate-400">
                      <span>Items Subtotal:</span>
                      <span className="font-semibold text-slate-200">Rs. {subtotal.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between text-slate-400">
                      <span>Delivery Fee:</span>
                      <span className="font-semibold text-slate-200">
                        {deliveryFee === 0 ? (
                          <span className="text-emerald-400 font-bold">FREE OVER RS. 2,500</span>
                        ) : (
                          `Rs. ${deliveryFee}`
                        )}
                      </span>
                    </div>
                    <div className="flex justify-between text-slate-400">
                      <span>Govt. Restaurant GST (5%):</span>
                      <span className="font-semibold text-slate-200">Rs. {gstTax.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between items-center pt-2 border-t border-slate-800 font-bold text-white text-base">
                      <span>Grand Total:</span>
                      <span className="text-amber-400 font-black text-xl">
                        Rs. {grandTotal.toLocaleString()}
                      </span>
                    </div>
                  </div>
                )}
              </div>

              {/* Right Column: Customer Details Form */}
              <div className="lg:col-span-6 p-6 sm:p-8 space-y-5 bg-slate-900">
                <div>
                  <h3 className="font-bold text-white text-sm uppercase tracking-widest">
                    Delivery & Customer Details
                  </h3>
                  <p className="text-xs text-slate-400 mt-0.5">
                    Please provide complete delivery details in Pakistan. Fields marked (<span className="text-red-400">*</span>) are required.
                  </p>
                </div>

                {apiError && (
                  <div className="p-3 bg-red-950/40 border border-red-500/50 text-red-300 text-xs rounded-xl flex items-start gap-2">
                    <AlertCircle className="w-4 h-4 text-red-400 shrink-0 mt-0.5" />
                    <div>
                      <span className="font-bold">Error: </span>
                      {apiError}
                    </div>
                  </div>
                )}

                <form onSubmit={handlePlaceOrder} className="space-y-4">
                  {/* Customer Name */}
                  <div>
                    <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-1">
                      Customer Full Name <span className="text-red-400">*</span>
                    </label>
                    <div className="relative">
                      <User className="w-4 h-4 text-slate-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
                      <input
                        type="text"
                        placeholder="e.g. Sardar Hamza Rajput"
                        value={customerName}
                        onChange={(e) => {
                          setCustomerName(e.target.value);
                          if (errors.customerName) setErrors((prev) => ({ ...prev, customerName: '' }));
                        }}
                        className={`w-full pl-10 pr-4 py-2.5 rounded-xl border text-sm bg-slate-950 text-white transition-all focus:outline-none focus:ring-2 ${
                          errors.customerName
                            ? 'border-red-500 focus:ring-red-500/20'
                            : 'border-slate-800 focus:border-amber-500 focus:ring-amber-500/20'
                        }`}
                      />
                    </div>
                    {errors.customerName && (
                      <p className="text-xs text-red-400 font-medium mt-1">{errors.customerName}</p>
                    )}
                  </div>

                  {/* Phone Number */}
                  <div>
                    <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-1">
                      Mobile / WhatsApp Number <span className="text-red-400">*</span>
                    </label>
                    <div className="relative">
                      <Phone className="w-4 h-4 text-slate-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
                      <input
                        type="tel"
                        placeholder="e.g. 0300-1234567 or +92 321 9876543"
                        value={phoneNumber}
                        onChange={(e) => {
                          setPhoneNumber(e.target.value);
                          if (errors.phoneNumber) setErrors((prev) => ({ ...prev, phoneNumber: '' }));
                        }}
                        className={`w-full pl-10 pr-4 py-2.5 rounded-xl border text-sm bg-slate-950 text-white transition-all focus:outline-none focus:ring-2 ${
                          errors.phoneNumber
                            ? 'border-red-500 focus:ring-red-500/20'
                            : 'border-slate-800 focus:border-amber-500 focus:ring-amber-500/20'
                        }`}
                      />
                    </div>
                    {errors.phoneNumber && (
                      <p className="text-xs text-red-400 font-medium mt-1">{errors.phoneNumber}</p>
                    )}
                  </div>

                  {/* Delivery Address */}
                  <div>
                    <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-1">
                      Complete Delivery Address <span className="text-red-400">*</span>
                    </label>
                    <div className="relative">
                      <MapPin className="w-4 h-4 text-slate-500 absolute left-3.5 top-3" />
                      <textarea
                        rows={2}
                        placeholder="e.g. House 42, Street 7, Sector F-8/2, Islamabad"
                        value={deliveryAddress}
                        onChange={(e) => {
                          setDeliveryAddress(e.target.value);
                          if (errors.deliveryAddress) setErrors((prev) => ({ ...prev, deliveryAddress: '' }));
                        }}
                        className={`w-full pl-10 pr-4 py-2.5 rounded-xl border text-sm bg-slate-950 text-white transition-all focus:outline-none focus:ring-2 resize-none ${
                          errors.deliveryAddress
                            ? 'border-red-500 focus:ring-red-500/20'
                            : 'border-slate-800 focus:border-amber-500 focus:ring-amber-500/20'
                        }`}
                      />
                    </div>
                    {errors.deliveryAddress && (
                      <p className="text-xs text-red-400 font-medium mt-1">{errors.deliveryAddress}</p>
                    )}
                  </div>

                  {/* Payment Method Selector */}
                  <div>
                    <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-1">
                      Payment Method
                    </label>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                      {(['Cash on Delivery', 'Card on Delivery', 'JazzCash / EasyPaisa'] as const).map((method) => (
                        <button
                          key={method}
                          type="button"
                          onClick={() => setPaymentMethod(method)}
                          className={`p-2.5 rounded-xl border text-xs font-bold text-center transition-all ${
                            paymentMethod === method
                              ? 'bg-amber-500/20 border-amber-500 text-amber-300'
                              : 'bg-slate-950 border-slate-800 text-slate-400 hover:border-slate-700'
                          }`}
                        >
                          {method}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Special Instructions */}
                  <div>
                    <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-1">
                      Cooking / Delivery Instructions (Optional)
                    </label>
                    <div className="relative">
                      <FileText className="w-4 h-4 text-slate-500 absolute left-3.5 top-3" />
                      <textarea
                        rows={1}
                        placeholder="e.g. Extra zeera raita, milder spices, call upon arrival"
                        value={specialInstructions}
                        onChange={(e) => setSpecialInstructions(e.target.value)}
                        className="w-full pl-10 pr-4 py-2 rounded-xl border border-slate-800 bg-slate-950 text-white text-sm focus:outline-none focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500 resize-none"
                      />
                    </div>
                  </div>

                  {/* Submit Button */}
                  <div className="pt-3">
                    <button
                      type="submit"
                      disabled={isSubmitting || cart.length === 0}
                      className={`w-full py-4 px-6 rounded-2xl font-black text-sm uppercase tracking-wider text-slate-950 shadow-xl transition-all flex items-center justify-center gap-2 ${
                        isSubmitting || cart.length === 0
                          ? 'bg-slate-700 cursor-not-allowed text-slate-500'
                          : 'bg-gradient-to-r from-amber-500 via-amber-600 to-yellow-500 hover:brightness-110 shadow-amber-500/25 active:scale-[0.99]'
                      }`}
                    >
                      {isSubmitting ? (
                        <>
                          <Loader2 className="w-5 h-5 animate-spin" />
                          <span>Transmitting Order to Royal Kitchen...</span>
                        </>
                      ) : (
                        <>
                          <span>Place Order Now</span>
                          <span>•</span>
                          <span>Rs. {grandTotal.toLocaleString()}</span>
                        </>
                      )}
                    </button>
                    <p className="text-[11px] text-center text-slate-500 mt-2">
                      Persisted into Supabase database <code className="font-mono text-amber-400">orders</code> table (Status: Pending) & sends Gmail alert.
                    </p>
                  </div>
                </form>
              </div>

            </div>
          </div>
        )}

      </div>
    </div>
  );
}
