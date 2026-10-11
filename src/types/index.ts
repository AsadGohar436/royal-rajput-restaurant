export interface Dish {
  id: string;
  name: string;
  price: number; // in PKR (Rs.)
  image: string;
  category: 'Biryani & Rice' | 'Karahi & Handi' | 'Charcoal BBQ' | 'Traditional Curries' | 'Tandoor & Breads' | 'Desserts & Beverages';
  description: string;
  spiceLevel?: 'Mild' | 'Medium' | 'Desi Spiced 🔥';
  isChefSpecial?: boolean;
  calories?: number;
  prepTime?: string;
  servingSize?: string;
  rating?: number;
}

export interface CartItem {
  dish: Dish;
  quantity: number;
}

export interface OrderFormInput {
  customerName: string;
  phoneNumber: string;
  deliveryAddress: string;
  specialInstructions?: string;
  paymentMethod?: 'Cash on Delivery' | 'Card on Delivery' | 'JazzCash / EasyPaisa';
}

export interface OrderItemPayload {
  dish_id: string;
  name: string;
  price: number;
  quantity: number;
  subtotal: number;
}

export interface OrderRecord {
  id?: string;
  order_number?: string;
  created_at?: string;
  customer_name: string;
  phone_number: string;
  delivery_address: string;
  items: OrderItemPayload[];
  total_amount: number;
  status: 'Pending' | 'Confirmed' | 'Preparing' | 'Out for Delivery' | 'Delivered' | 'Cancelled';
  special_instructions?: string;
  email_notification_sent?: boolean;
  payment_method?: string;
}

export interface TableReservation {
  id?: string;
  name: string;
  phone: string;
  email?: string;
  guests: number;
  date: string;
  time: string;
  specialRequests?: string;
}

export interface ApiResponse<T = unknown> {
  success: boolean;
  message: string;
  data?: T;
  error?: string;
  emailSent?: boolean;
}
