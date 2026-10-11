'use client';

import React, { useState } from 'react';
import { CartItem } from '@/types';
import {
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
} from 'lucide-react';

interface OrderSectionProps {
  cart: CartItem[];
  onUpdateQuantity: (dishId: string, quantity: number) => void;
  onClearCart: () => void;
  onScrollToMenu: () => void;
}

interface FormErrors {
  customerName?: string;
  phoneNumber?: string;
  deliveryAddress?: string;
  cart?: string;
}

export const OrderSection: React.FC<OrderSectionProps> = ({
  cart,
  onUpdateQuantity,
  onClearCart,
  onScrollToMenu,
}) => {
  const [customerName, setCustomerName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [deliveryAddress, setDeliveryAddress] = useState('');
  const [specialInstructions, setSpecialInstructions] = useState('');

  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submittedOrder, setSubmittedOrder] = useState<{
    id?: string;
    total?: number;
    emailSent?: boolean;
    status?: string;
  } | null>(null);
  const [apiError, setApiError] = useState<string | null>(null);

  // Financials in Pakistani Rupees
  const subtotal = cart.reduce((sum, item) => sum + item.dish.price * item.quantity, 0);
  // Free delivery for orders over Rs. 2,000, otherwise flat Rs. 150 rider delivery fee
  const deliveryFee = subtotal >= 2000 || subtotal === 0 ? 0 : 150;
  // Standard Restaurant GST (5%)
  const gstTax = Math.round(subtotal * 0.05);
  const grandTotal = subtotal + deliveryFee + gstTax;

  const validate = (): boolean => {
    const errs: FormErrors = {};

    if (!customerName.trim()) {
      errs.customerName = 'Customer Name is required.';
    } else if (customerName.trim().length < 2) {
      errs.customerName = 'Name must be at least 2 characters.';
    }

    if (!phoneNumber.trim()) {
      errs.phoneNumber = 'Pakistani Phone Number is required (e.g. 0300-1234567).';
    } else if (phoneNumber.trim().length < 8) {
      errs.phoneNumber = 'Please enter a valid phone number.';
    }

    if (!deliveryAddress.trim()) {
      errs.deliveryAddress = 'Delivery Address is required.';
    } else if (deliveryAddress.trim().length < 5) {
      errs.deliveryAddress = 'Please provide full house/street/sector address.';
    }

    if (cart.length === 0) {
      errs.cart = 'Please select at least one Pakistani dish from the menu before placing order.';
    }

    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handlePlaceOrder = async (e: React.FormEvent) => {
    e.preventDefault();
    setApiError(null);

    if (!validate()) {
      return;
    }

    setIsSubmitting(true);

    try {
      const payload = {
        customerName: customerName.trim(),
        phoneNumber: phoneNumber.trim(),
        deliveryAddress: deliveryAddress.trim(),
        specialInstructions: specialInstructions.trim(),
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
        total: grandTotal,
        emailSent: data.emailSent,
        status: data.data?.status || 'Pending',
      });
      onClearCart();
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
    <section id="order" className="py-20 bg-gradient-to-b from-slate-50 to-emerald-50/30">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Heading */}
        <div className="text-center max-w-2xl mx-auto mb-12">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-100 text-emerald-900 text-xs font-bold uppercase tracking-wider mb-2">
            <ShoppingBag className="w-3.5 h-3.5 text-emerald-700" />
            Direct Online Ordering
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            Place Your Desi Order
          </h2>
          <p className="mt-2 text-slate-600 text-sm sm:text-base">
            Select your dishes, enter your contact and delivery address in Pakistan, and submit your order. It will be recorded in Supabase with status <strong className="text-emerald-900">Pending</strong> and notified instantly to the restaurant via Gmail!
          </p>
        </div>

        {/* Confirmation Screen */}
        {submittedOrder ? (
          <div className="bg-white rounded-3xl p-8 sm:p-12 shadow-xl border border-slate-200 text-center max-w-2xl mx-auto space-y-6">
            <div className="w-16 h-16 bg-emerald-100 text-emerald-700 rounded-full flex items-center justify-center mx-auto shadow-inner">
              <CheckCircle2 className="w-10 h-10" />
            </div>

            <div>
              <span className="inline-block bg-amber-100 text-amber-900 text-xs font-bold px-3 py-1 rounded-full border border-amber-300 mb-2">
                Order Status: {submittedOrder.status || 'Pending'}
              </span>
              <h3 className="text-2xl font-extrabold text-slate-900">
                Order Placed Successfully!
              </h3>
              <p className="text-sm text-slate-600 mt-1 max-w-md mx-auto">
                Shukriya, <strong className="text-slate-900">{customerName}</strong>! Your order has been recorded into our Supabase <code className="text-xs bg-slate-100 px-1.5 py-0.5 rounded font-mono text-emerald-700 font-bold">orders</code> table.
              </p>
            </div>

            <div className="bg-slate-50 rounded-2xl p-6 border border-slate-200 text-left space-y-3 text-sm">
              <div className="flex justify-between items-center pb-2 border-b border-slate-200">
                <span className="text-slate-500 font-medium">Order Reference:</span>
                <span className="font-mono font-bold text-slate-900">
                  #{submittedOrder.id?.slice(0, 8) || 'SUPABASE-ORD'}
                </span>
              </div>
              <div className="flex justify-between items-center pb-2 border-b border-slate-200">
                <span className="text-slate-500 font-medium">Total Payable (COD):</span>
                <span className="font-extrabold text-emerald-700 text-lg">
                  Rs. {submittedOrder.total?.toLocaleString()}
                </span>
              </div>
              <div className="flex justify-between items-center pb-2 border-b border-slate-200">
                <span className="text-slate-500 font-medium">Delivery Address:</span>
                <span className="font-medium text-slate-800 text-right max-w-[260px] truncate">
                  {deliveryAddress}
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-slate-500 font-medium">Kitchen Gmail Notification:</span>
                <span className="inline-flex items-center gap-1 text-emerald-700 font-bold text-xs">
                  <Sparkles className="w-3.5 h-3.5" /> Dispatched to Restaurant Inbox
                </span>
              </div>
            </div>

            <button
              onClick={resetForm}
              className="px-8 py-3.5 bg-emerald-700 hover:bg-emerald-800 text-white font-bold rounded-xl shadow-md transition-colors"
            >
              Order Again
            </button>
          </div>
        ) : (
          <div className="bg-white rounded-3xl shadow-xl border border-slate-200 overflow-hidden">
            <div className="grid grid-cols-1 lg:grid-cols-12">
              
              {/* Left Column: Cart Dish Selection & Quantities */}
              <div className="lg:col-span-6 p-6 sm:p-8 bg-slate-50/70 border-b lg:border-b-0 lg:border-r border-slate-200 space-y-5">
                <div className="flex items-center justify-between">
                  <h3 className="font-bold text-slate-900 text-base uppercase tracking-wider flex items-center gap-2">
                    <ShoppingBag className="w-4 h-4 text-emerald-700" />
                    <span>Selected Dishes</span>
                  </h3>
                  {cart.length > 0 && (
                    <button
                      type="button"
                      onClick={onClearCart}
                      className="text-xs text-slate-400 hover:text-red-500 transition-colors flex items-center gap-1 font-semibold"
                    >
                      <Trash2 className="w-3 h-3" /> Clear
                    </button>
                  )}
                </div>

                {errors.cart && (
                  <div className="p-3 bg-red-50 border border-red-200 text-red-600 text-xs rounded-xl flex items-center gap-2 font-medium">
                    <AlertCircle className="w-4 h-4 shrink-0" />
                    {errors.cart}
                  </div>
                )}

                {cart.length === 0 ? (
                  <div className="text-center py-12 bg-white rounded-2xl border border-dashed border-slate-300 p-6 space-y-3">
                    <ShoppingBag className="w-10 h-10 text-slate-300 mx-auto" />
                    <h4 className="font-bold text-slate-800 text-base">Your dastarkhwan is empty</h4>
                    <p className="text-xs text-slate-500 max-w-xs mx-auto">
                      Choose from our hot chicken biryani, mutton karahi, seekh kababs, and naan above.
                    </p>
                    <button
                      type="button"
                      onClick={onScrollToMenu}
                      className="mt-2 inline-flex items-center gap-1.5 px-4 py-2 bg-emerald-700 text-white text-xs font-bold rounded-xl hover:bg-emerald-800 transition-colors"
                    >
                      <span>Browse Desi Menu</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                ) : (
                  <div className="space-y-3 max-h-80 overflow-y-auto pr-1">
                    {cart.map((item) => (
                      <div
                        key={item.dish.id}
                        className="flex items-center justify-between p-3 bg-white rounded-xl border border-slate-200/80 shadow-sm"
                      >
                        <div className="flex items-center gap-3 min-w-0">
                          <img
                            src={item.dish.image}
                            alt={item.dish.name}
                            className="w-12 h-12 rounded-lg object-cover shrink-0"
                          />
                          <div className="min-w-0">
                            <p className="text-sm font-bold text-slate-800 truncate">
                              {item.dish.name}
                            </p>
                            <p className="text-xs text-emerald-700 font-bold">
                              Rs. {item.dish.price.toLocaleString()} each
                            </p>
                          </div>
                        </div>

                        <div className="flex items-center gap-3 shrink-0">
                          <div className="flex items-center gap-1 bg-slate-50 border border-slate-200 rounded-lg p-1">
                            <button
                              type="button"
                              onClick={() => onUpdateQuantity(item.dish.id, item.quantity - 1)}
                              className="w-6 h-6 rounded flex items-center justify-center text-slate-600 hover:bg-slate-200 transition-colors"
                              aria-label="Decrease quantity"
                            >
                              <Minus className="w-3 h-3" />
                            </button>
                            <span className="w-6 text-center text-xs font-bold text-slate-800">
                              {item.quantity}
                            </span>
                            <button
                              type="button"
                              onClick={() => onUpdateQuantity(item.dish.id, item.quantity + 1)}
                              className="w-6 h-6 rounded flex items-center justify-center text-slate-600 hover:bg-slate-200 transition-colors"
                              aria-label="Increase quantity"
                            >
                              <Plus className="w-3 h-3" />
                            </button>
                          </div>
                          <span className="text-sm font-bold text-slate-900 w-20 text-right">
                            Rs. {(item.dish.price * item.quantity).toLocaleString()}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                )}

                {/* Subtotal Calculation Breakdown */}
                {cart.length > 0 && (
                  <div className="bg-white p-4 rounded-xl border border-slate-200 space-y-2 text-xs sm:text-sm">
                    <div className="flex justify-between text-slate-600">
                      <span>Items Subtotal:</span>
                      <span className="font-semibold">Rs. {subtotal.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between text-slate-600">
                      <span>Delivery Fee:</span>
                      <span className="font-semibold">
                        {deliveryFee === 0 ? (
                          <span className="text-emerald-700 font-bold">FREE (Rs. 0)</span>
                        ) : (
                          `Rs. ${deliveryFee}`
                        )}
                      </span>
                    </div>
                    <div className="flex justify-between text-slate-600">
                      <span>Govt. Restaurant GST (5%):</span>
                      <span className="font-semibold">Rs. {gstTax.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between items-center pt-2 border-t border-slate-100 font-bold text-slate-900 text-base">
                      <span>Total Amount (Cash on Delivery):</span>
                      <span className="text-emerald-700 font-extrabold text-lg">
                        Rs. {grandTotal.toLocaleString()}
                      </span>
                    </div>
                  </div>
                )}
              </div>

              {/* Right Column: Customer Details Form */}
              <div className="lg:col-span-6 p-6 sm:p-8 space-y-5">
                <div>
                  <h3 className="font-bold text-slate-900 text-base uppercase tracking-wider">
                    Customer Information
                  </h3>
                  <p className="text-xs text-slate-500 mt-0.5">
                    Please provide your delivery details in Pakistan. Fields marked (<span className="text-red-500">*</span>) are required.
                  </p>
                </div>

                {apiError && (
                  <div className="p-3 bg-red-50 border border-red-200 text-red-700 text-xs rounded-xl flex items-start gap-2">
                    <AlertCircle className="w-4 h-4 text-red-500 shrink-0 mt-0.5" />
                    <div>
                      <span className="font-bold">Error: </span>
                      {apiError}
                    </div>
                  </div>
                )}

                <form onSubmit={handlePlaceOrder} className="space-y-4">
                  {/* Customer Name */}
                  <div>
                    <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                      Customer Full Name <span className="text-red-500">*</span>
                    </label>
                    <div className="relative">
                      <User className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                      <input
                        type="text"
                        placeholder="e.g. Muhammad Ali Khan"
                        value={customerName}
                        onChange={(e) => {
                          setCustomerName(e.target.value);
                          if (errors.customerName) setErrors((prev) => ({ ...prev, customerName: undefined }));
                        }}
                        className={`w-full pl-10 pr-4 py-2.5 rounded-xl border text-sm transition-all focus:outline-none focus:ring-2 ${
                          errors.customerName
                            ? 'border-red-400 focus:ring-red-200 bg-red-50/20'
                            : 'border-slate-200 focus:border-emerald-600 focus:ring-emerald-500/20'
                        }`}
                      />
                    </div>
                    {errors.customerName && (
                      <p className="text-xs text-red-500 font-medium mt-1">{errors.customerName}</p>
                    )}
                  </div>

                  {/* Phone Number */}
                  <div>
                    <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                      Mobile Number <span className="text-red-500">*</span>
                    </label>
                    <div className="relative">
                      <Phone className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                      <input
                        type="tel"
                        placeholder="e.g. 0300-1234567 or +92 321 9876543"
                        value={phoneNumber}
                        onChange={(e) => {
                          setPhoneNumber(e.target.value);
                          if (errors.phoneNumber) setErrors((prev) => ({ ...prev, phoneNumber: undefined }));
                        }}
                        className={`w-full pl-10 pr-4 py-2.5 rounded-xl border text-sm transition-all focus:outline-none focus:ring-2 ${
                          errors.phoneNumber
                            ? 'border-red-400 focus:ring-red-200 bg-red-50/20'
                            : 'border-slate-200 focus:border-emerald-600 focus:ring-emerald-500/20'
                        }`}
                      />
                    </div>
                    {errors.phoneNumber && (
                      <p className="text-xs text-red-500 font-medium mt-1">{errors.phoneNumber}</p>
                    )}
                  </div>

                  {/* Delivery Address */}
                  <div>
                    <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                      Delivery Address (City / Sector / House) <span className="text-red-500">*</span>
                    </label>
                    <div className="relative">
                      <MapPin className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
                      <textarea
                        rows={2}
                        placeholder="e.g. House 42, Street 7, Sector F-8/2, Islamabad"
                        value={deliveryAddress}
                        onChange={(e) => {
                          setDeliveryAddress(e.target.value);
                          if (errors.deliveryAddress) setErrors((prev) => ({ ...prev, deliveryAddress: undefined }));
                        }}
                        className={`w-full pl-10 pr-4 py-2.5 rounded-xl border text-sm transition-all focus:outline-none focus:ring-2 resize-none ${
                          errors.deliveryAddress
                            ? 'border-red-400 focus:ring-red-200 bg-red-50/20'
                            : 'border-slate-200 focus:border-emerald-600 focus:ring-emerald-500/20'
                        }`}
                      />
                    </div>
                    {errors.deliveryAddress && (
                      <p className="text-xs text-red-500 font-medium mt-1">{errors.deliveryAddress}</p>
                    )}
                  </div>

                  {/* Special Instructions */}
                  <div>
                    <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                      Special Cooking / Delivery Notes (Optional)
                    </label>
                    <div className="relative">
                      <FileText className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
                      <textarea
                        rows={1}
                        placeholder="e.g. Extra raita, less spicy karahi, call rider upon reaching main gate"
                        value={specialInstructions}
                        onChange={(e) => setSpecialInstructions(e.target.value)}
                        className="w-full pl-10 pr-4 py-2 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-600 resize-none"
                      />
                    </div>
                  </div>

                  {/* Submit Button */}
                  <div className="pt-3">
                    <button
                      type="submit"
                      disabled={isSubmitting || cart.length === 0}
                      className={`w-full py-4 px-6 rounded-2xl font-bold text-base text-white shadow-xl transition-all flex items-center justify-center gap-2 ${
                        isSubmitting || cart.length === 0
                          ? 'bg-slate-300 cursor-not-allowed shadow-none'
                          : 'bg-gradient-to-r from-emerald-700 to-amber-600 hover:from-emerald-800 hover:to-amber-700 shadow-emerald-700/25 hover:shadow-emerald-700/35 active:scale-[0.99]'
                      }`}
                    >
                      {isSubmitting ? (
                        <>
                          <Loader2 className="w-5 h-5 animate-spin" />
                          <span>Submitting Order to Kitchen...</span>
                        </>
                      ) : (
                        <>
                          <span>Place Order Now</span>
                          <span>•</span>
                          <span>Rs. {grandTotal.toLocaleString()}</span>
                        </>
                      )}
                    </button>
                    <p className="text-[11px] text-center text-slate-400 mt-2">
                      Saves order into Supabase <code className="font-mono text-emerald-700 font-bold">orders</code> table (Status: Pending) & dispatches Gmail alert.
                    </p>
                  </div>
                </form>
              </div>

            </div>
          </div>
        )}

      </div>
    </section>
  );
};
