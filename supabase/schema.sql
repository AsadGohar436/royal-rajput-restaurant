-- ====================================================================
-- Part A Hackathon: Supabase Database Schema Setup
-- Restaurant Orders Table
-- ====================================================================

-- 1. Create the `orders` table if it does not already exist
CREATE TABLE IF NOT EXISTS public.orders (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    created_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now()),
    customer_name TEXT NOT NULL,
    phone_number TEXT NOT NULL,
    delivery_address TEXT NOT NULL,
    items JSONB NOT NULL,
    total_amount NUMERIC(10, 2) NOT NULL CHECK (total_amount >= 0),
    status TEXT NOT NULL DEFAULT 'Pending' CHECK (status IN ('Pending', 'Confirmed', 'Preparing', 'Out for Delivery', 'Delivered', 'Cancelled')),
    special_instructions TEXT,
    email_notification_sent BOOLEAN DEFAULT false
);

-- 2. Add an index for faster queries on status and created_at
CREATE INDEX IF NOT EXISTS idx_orders_status ON public.orders(status);
CREATE INDEX IF NOT EXISTS idx_orders_created_at ON public.orders(created_at DESC);

-- 3. Enable Row Level Security (RLS)
ALTER TABLE public.orders ENABLE ROW LEVEL SECURITY;

-- 4. Create Policies
-- Policy: Allow anonymous users / customers to INSERT orders (for public ordering)
CREATE POLICY "Allow public insert of orders" 
ON public.orders 
FOR INSERT 
TO anon, authenticated
WITH CHECK (true);

-- Policy: Allow reading orders (useful for order confirmation status screen)
CREATE POLICY "Allow reading orders" 
ON public.orders 
FOR SELECT 
TO anon, authenticated
USING (true);

-- 5. Optional: Sample seed query for testing
-- INSERT INTO public.orders (customer_name, phone_number, delivery_address, items, total_amount, status)
-- VALUES (
--   'Jane Doe',
--   '+1 (555) 234-5678',
--   '123 Culinary Boulevard, Apt 4B, Food City',
--   '[{"dish_id": "dish-1", "name": "Truffle Ribeye Steak", "price": 38.50, "quantity": 1, "subtotal": 38.50}]'::jsonb,
--   38.50,
--   'Pending'
-- );
