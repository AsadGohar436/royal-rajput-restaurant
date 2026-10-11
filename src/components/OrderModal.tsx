'use client';

import React, { useState } from 'react';
import { useCart } from '@/context/CartContext';
import {
  X,
  Plus,
  Minus,
  Trash2,
  ShoppingBag,
  CheckCircle2,
  AlertCircle,
  Loader2,
  MapPin,
  Phone,
  User,
  FileText,
  Sparkles,
  Crown,
  CreditCard,
  Banknote,
} from 'lucide-react';
import Link from 'next/link';

export const OrderModal: React.FC = () => {
  const {
    isCartOpen,
    closeCart,
    cart,
    updateQuantity,
    clearCart,
    subtotal,
    deliveryFee,
    gstTax,
    grandTotal,
  } = useCart();

  // Form states
  const [customerName, setCustomerName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [deliveryAddress, setDeliveryAddress] = useState('');
  const [specialInstructions, setSpecialInstructions] = useState('');
  const [paymentMethod, setPaymentMethod] = useState<'Cash on Delivery' | 'Card on Delivery' | 'JazzCash / EasyPaisa'>('Cash on Delivery');

  // Status states
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submissionSuccess, setSubmissionSuccess] = useState(false);
  const [placedOrderDetails, setPlacedOrderDetails] = useState<{
    id?: string;
    order_number?: string;
    total?: number;
    emailSent?: boolean;
    status?: string;
  } | null>(null);
  const [apiErrorMessage, setApiErrorMessage] = useState<string | null>(null);
  const [copiedTracking, setCopiedTracking] = useState(false);

  if (!isCartOpen) return null;

  const validateForm = (): boolean => {
    const newErrors: { [key: string]: string } = {};

    if (!customerName.trim()) {
      newErrors.customerName = 'Please enter your full name.';
    } else if (customerName.trim().length < 2) {
      newErrors.customerName = 'Name must be at least 2 characters.';
    }

    if (!phoneNumber.trim()) {
      newErrors.phoneNumber = 'Pakistani phone number is required (e.g. 0300-1234567).';
    } else if (phoneNumber.trim().length < 8) {
      newErrors.phoneNumber = 'Please enter a valid phone number.';
    }

    if (!deliveryAddress.trim()) {
      newErrors.deliveryAddress = 'Complete delivery address is required.';
    } else if (deliveryAddress.trim().length < 5) {
      newErrors.deliveryAddress = 'Please include complete house/sector details.';
    }

    if (cart.length === 0) {
      newErrors.cart = 'Please add at least one dish to your order.';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmitOrder = async (e: React.FormEvent) => {
    e.preventDefault();
    setApiErrorMessage(null);

    if (!validateForm()) return;

    setIsSubmitting(true);

    try {
      const orderPayload = {
        customerName: customerName.trim(),
        phoneNumber: phoneNumber.trim(),
        deliveryAddress: deliveryAddress.trim(),
        specialInstructions: specialInstructions.trim(),
        paymentMethod: paymentMethod,
        items: cart.map((item) => ({
          dish_id: item.dish.id,
          name: item.dish.name,
          price: item.dish.price,
          quantity: item.quantity,
          subtotal: item.dish.price * item.quantity,
        })),
        total_amount: grandTotal,
      };

      const response = await fetch('/api/orders', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(orderPayload),
      });

      const result = await response.json();

      if (!response.ok || !result.success) {
        throw new Error(result.error || 'Failed to place order.');
      }

      setPlacedOrderDetails({
        id: result.data?.id,
        order_number: result.data?.order_number,
        total: grandTotal,
        emailSent: result.emailSent,
        status: result.data?.status || 'Pending',
      });
      setSubmissionSuccess(true);
      clearCart();
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : 'An unexpected error occurred.';
      setApiErrorMessage(msg);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleResetAndClose = () => {
    setSubmissionSuccess(false);
    setPlacedOrderDetails(null);
    setCustomerName('');
    setPhoneNumber('');
    setDeliveryAddress('');
    setSpecialInstructions('');
    setErrors({});
    setApiErrorMessage(null);
    closeCart();
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/80 backdrop-blur-md flex items-center justify-center p-3 sm:p-4 animate-in fade-in duration-200">
      <div className="relative w-full max-w-2xl bg-slate-900 border border-amber-500/30 rounded-3xl shadow-2xl overflow-hidden my-8 text-slate-100">
        
        {/* Modal Header */}
        <div className="flex items-center justify-between px-6 py-5 border-b border-slate-800 bg-slate-950/60">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-amber-600 to-yellow-500 text-slate-950 flex items-center justify-center shadow-lg shadow-amber-500/20">
              <Crown className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-serif text-lg font-bold text-white flex items-center gap-2">
                <span>{submissionSuccess ? 'Royal Order Confirmation' : 'Complete Your Order'}</span>
              </h3>
              <p className="text-xs text-amber-400/80 font-medium">
                {submissionSuccess ? 'Thank you for choosing Royal Rajput!' : 'Royal Rajput Express Delivery Checkout'}
              </p>
            </div>
          </div>

          <button
            onClick={submissionSuccess ? handleResetAndClose : closeCart}
            className="p-2 text-slate-400 hover:text-white hover:bg-slate-800 rounded-full transition-colors"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        {submissionSuccess ? (
          <div className="p-6 sm:p-8 text-center space-y-6">
            <div className="w-16 h-16 bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 rounded-full flex items-center justify-center mx-auto shadow-inner animate-bounce">
              <CheckCircle2 className="w-10 h-10" />
            </div>

            <div>
              <span className="inline-block bg-amber-500/20 text-amber-300 text-xs font-bold px-3 py-1 rounded-full border border-amber-500/40 mb-2">
                Order Status: {placedOrderDetails?.status || 'Pending'}
              </span>
              <h2 className="text-2xl font-black text-white">
                Royal Order Placed!
              </h2>
              <p className="text-sm text-slate-400 mt-1 max-w-md mx-auto">
                Shukriya, <strong className="text-amber-400">{customerName}</strong>! Your order is saved into our Supabase <code className="text-xs bg-slate-800 px-1.5 py-0.5 rounded text-amber-300 font-mono">orders</code> table.
              </p>
            </div>

            {/* Daraz-Style Tracking Code Box */}
            <div className="p-4 rounded-2xl bg-gradient-to-r from-amber-500/15 via-yellow-500/10 to-amber-500/15 border border-amber-500/40 flex flex-col sm:flex-row items-center justify-between gap-3 max-w-lg mx-auto">
              <div className="text-left">
                <span className="text-[10px] text-amber-400 uppercase tracking-widest font-black block">
                  Daraz Tracking Number
                </span>
                <span className="font-mono text-xl sm:text-2xl font-black text-white">
                  #{placedOrderDetails?.order_number || placedOrderDetails?.id?.slice(0, 8)}
                </span>
              </div>

              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => {
                    const code = placedOrderDetails?.order_number || placedOrderDetails?.id || '';
                    navigator.clipboard.writeText(code);
                    setCopiedTracking(true);
                    setTimeout(() => setCopiedTracking(false), 2000);
                  }}
                  className="px-3 py-1.5 rounded-lg bg-slate-950 hover:bg-slate-800 text-amber-300 text-xs font-bold border border-amber-500/30 transition-colors"
                >
                  {copiedTracking ? 'Copied!' : 'Copy'}
                </button>
                <Link
                  href={`/track?id=${encodeURIComponent(placedOrderDetails?.order_number || placedOrderDetails?.id || '')}`}
                  onClick={handleResetAndClose}
                  className="px-3.5 py-1.5 rounded-lg bg-gradient-to-r from-amber-500 to-yellow-500 text-slate-950 text-xs font-black uppercase hover:brightness-110 shadow"
                >
                  Track Live →
                </Link>
              </div>
            </div>

            {/* Receipt Details Card */}
            <div className="bg-slate-950/80 rounded-2xl p-5 border border-amber-500/20 text-left space-y-3 max-w-lg mx-auto text-sm">
              <div className="flex justify-between items-center pb-2 border-b border-slate-800">
                <span className="text-slate-400 font-medium">Tracking Ref:</span>
                <span className="font-mono font-bold text-amber-400">
                  #{placedOrderDetails?.order_number || placedOrderDetails?.id?.slice(0, 8) || 'CONFIRMED'}
                </span>
              </div>

              <div className="flex justify-between items-center pb-2 border-b border-slate-800">
                <span className="text-slate-400 font-medium">Total Amount ({paymentMethod}):</span>
                <span className="font-black text-amber-400 text-lg">
                  Rs. {placedOrderDetails?.total?.toLocaleString()}
                </span>
              </div>

              <div className="flex justify-between items-center pb-2 border-b border-slate-800">
                <span className="text-slate-400 font-medium">Delivery Address:</span>
                <span className="text-slate-200 font-medium text-right max-w-[240px] truncate">
                  {deliveryAddress}
                </span>
              </div>

              <div className="flex justify-between items-center">
                <span className="text-slate-400 font-medium">Kitchen Gmail Notification:</span>
                <span className="inline-flex items-center gap-1 text-emerald-400 font-bold text-xs">
                  <Sparkles className="w-3.5 h-3.5" /> Dispatched
                </span>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-3 justify-center pt-2">
              <Link
                href={`/track?id=${encodeURIComponent(placedOrderDetails?.order_number || placedOrderDetails?.id || '')}`}
                onClick={handleResetAndClose}
                className="px-6 py-3 rounded-xl bg-gradient-to-r from-amber-500 via-amber-600 to-yellow-500 text-slate-950 font-black text-xs uppercase tracking-wider shadow-md transition-all hover:brightness-110 flex items-center justify-center gap-1.5"
              >
                <span>Track Progress Live</span>
              </Link>
              <button
                onClick={handleResetAndClose}
                className="px-5 py-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 font-bold text-xs transition-all"
              >
                Back to Royal Menu
              </button>
            </div>
          </div>
        ) : (
          <form onSubmit={handleSubmitOrder} className="p-6 space-y-6 max-h-[75vh] overflow-y-auto">
            
            {/* Global API Error */}
            {apiErrorMessage && (
              <div className="p-3.5 bg-red-950/40 border border-red-500/50 text-red-300 rounded-xl text-xs sm:text-sm flex items-start gap-2">
                <AlertCircle className="w-4 h-4 text-red-400 mt-0.5 shrink-0" />
                <div>
                  <span className="font-bold">Error placing order: </span>
                  {apiErrorMessage}
                </div>
              </div>
            )}

            {/* Selected Dishes Review Section */}
            <div>
              <div className="flex items-center justify-between mb-3">
                <h4 className="text-xs font-bold text-amber-400 uppercase tracking-widest flex items-center gap-1.5">
                  <span>1. Selected Royal Dishes</span>
                  <span className="text-slate-400">
                    ({cart.reduce((s, i) => s + i.quantity, 0)} items)
                  </span>
                </h4>
                {cart.length > 0 && (
                  <button
                    type="button"
                    onClick={clearCart}
                    className="text-xs text-slate-400 hover:text-red-400 transition-colors flex items-center gap-1"
                  >
                    <Trash2 className="w-3 h-3" /> Clear Cart
                  </button>
                )}
              </div>

              {errors.cart && (
                <div className="p-2.5 mb-3 bg-red-950/40 border border-red-500/40 text-red-300 text-xs rounded-lg flex items-center gap-1.5 font-medium">
                  <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                  {errors.cart}
                </div>
              )}

              {cart.length === 0 ? (
                <div className="text-center py-8 bg-slate-950/50 rounded-2xl border border-dashed border-slate-800">
                  <ShoppingBag className="w-8 h-8 text-slate-600 mx-auto mb-2" />
                  <p className="text-sm font-semibold text-slate-300">Your dastarkhwan is empty</p>
                  <p className="text-xs text-slate-500 mt-0.5">
                    Browse our royal biryani, mutton karahi, and charcoal BBQ to select your feast.
                  </p>
                  <Link
                    href="/menu"
                    onClick={closeCart}
                    className="mt-3 inline-block px-4 py-2 bg-amber-500/20 text-amber-300 border border-amber-500/30 rounded-xl text-xs font-bold hover:bg-amber-500/30 transition-colors"
                  >
                    Browse Royal Menu
                  </Link>
                </div>
              ) : (
                <div className="space-y-2.5 max-h-56 overflow-y-auto pr-1">
                  {cart.map((item) => (
                    <div
                      key={item.dish.id}
                      className="flex items-center justify-between p-3 bg-slate-950/60 rounded-xl border border-slate-800"
                    >
                      <div className="flex items-center gap-3 min-w-0">
                        <img
                          src={item.dish.image}
                          alt={item.dish.name}
                          className="w-12 h-12 rounded-lg object-cover shrink-0 border border-slate-800"
                        />
                        <div className="min-w-0">
                          <p className="text-sm font-bold text-slate-100 truncate">
                            {item.dish.name}
                          </p>
                          <p className="text-xs text-amber-400 font-semibold">
                            Rs. {item.dish.price.toLocaleString()} each
                          </p>
                        </div>
                      </div>

                      <div className="flex flex-col sm:flex-row items-end sm:items-center gap-2 sm:gap-3 shrink-0">
                        <div className="flex items-center gap-1 bg-slate-900 border border-slate-700 rounded-lg p-1">
                          <button
                            type="button"
                            onClick={() => updateQuantity(item.dish.id, item.quantity - 1)}
                            className="w-6 h-6 rounded flex items-center justify-center text-slate-300 hover:bg-slate-800 transition-colors"
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
                            className="w-6 h-6 rounded flex items-center justify-center text-amber-400 hover:bg-slate-800 transition-colors"
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
            </div>

            {/* Customer Details Form */}
            <div className="border-t border-slate-800 pt-5 space-y-4">
              <h4 className="text-xs font-bold text-amber-400 uppercase tracking-widest">
                2. Delivery & Contact Details (Pakistan)
              </h4>

              {/* Full Name */}
              <div>
                <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-1.5">
                  Customer Full Name <span className="text-red-400">*</span>
                </label>
                <div className="relative">
                  <User className="w-4 h-4 text-slate-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    placeholder="e.g. Raja Farhan Rajput"
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
                <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-1.5">
                  Mobile / WhatsApp Number <span className="text-red-400">*</span>
                </label>
                <div className="relative">
                  <Phone className="w-4 h-4 text-slate-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    type="tel"
                    placeholder="e.g. 0300-1234567 or +92 333 9876543"
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
                <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-1.5">
                  Complete Delivery Address (House / Sector / City) <span className="text-red-400">*</span>
                </label>
                <div className="relative">
                  <MapPin className="w-4 h-4 text-slate-500 absolute left-3.5 top-3" />
                  <textarea
                    rows={2}
                    placeholder="e.g. House 45, Street 12, Sector F-8/2, Islamabad"
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
                <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-1.5">
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
                <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-1.5">
                  Cooking / Delivery Instructions (Optional)
                </label>
                <div className="relative">
                  <FileText className="w-4 h-4 text-slate-500 absolute left-3.5 top-3" />
                  <textarea
                    rows={1}
                    placeholder="e.g. Extra raita, less spicy karahi, call rider upon arrival"
                    value={specialInstructions}
                    onChange={(e) => setSpecialInstructions(e.target.value)}
                    className="w-full pl-10 pr-4 py-2 rounded-xl border border-slate-800 bg-slate-950 text-white text-sm focus:outline-none focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500 resize-none"
                  />
                </div>
              </div>
            </div>

            {/* Price Summary */}
            <div className="border-t border-slate-800 pt-4 bg-slate-950/60 p-4 rounded-2xl space-y-2 text-sm border border-slate-800/80">
              <div className="flex justify-between text-slate-400">
                <span>Items Subtotal:</span>
                <span className="font-semibold text-slate-200">Rs. {subtotal.toLocaleString()}</span>
              </div>
              <div className="flex justify-between text-slate-400">
                <span className="flex items-center gap-1">
                  Delivery Fee:
                  {deliveryFee === 0 && subtotal > 0 && (
                    <span className="text-[10px] bg-emerald-500/20 text-emerald-400 font-bold px-1.5 py-0.2 rounded border border-emerald-500/30">
                      FREE OVER RS. 2,500
                    </span>
                  )}
                </span>
                <span className="font-semibold text-slate-200">
                  {deliveryFee === 0 ? 'Rs. 0' : `Rs. ${deliveryFee}`}
                </span>
              </div>
              <div className="flex justify-between text-slate-400">
                <span>Govt. Restaurant GST (5%):</span>
                <span className="font-semibold text-slate-200">Rs. {gstTax.toLocaleString()}</span>
              </div>
              <div className="flex justify-between items-center pt-2 border-t border-slate-800 font-bold text-base text-white">
                <span>Total Amount Due:</span>
                <span className="text-amber-400 text-xl font-black">
                  Rs. {grandTotal.toLocaleString()}
                </span>
              </div>
            </div>

            {/* Submit Button */}
            <div className="pt-2">
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
                    <span>Transmitting Order to Royal Rajput Kitchen...</span>
                  </>
                ) : (
                  <>
                    <span>Place Royal Order</span>
                    <span>•</span>
                    <span>Rs. {grandTotal.toLocaleString()}</span>
                  </>
                )}
              </button>

              <p className="text-[11px] text-center text-slate-500 mt-2">
                🔒 Orders recorded into Supabase database table with default status &quot;Pending&quot; and confirmation email sent.
              </p>
            </div>

          </form>
        )}

      </div>
    </div>
  );
};
