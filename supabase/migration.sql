-- Drop empty old orders table and create the exact restaurant orders table
DROP TABLE IF EXISTS public.orders CASCADE;

CREATE TABLE public.orders (
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

-- Performance Indexes
CREATE INDEX IF NOT EXISTS idx_orders_status ON public.orders(status);
CREATE INDEX IF NOT EXISTS idx_orders_created_at ON public.orders(created_at DESC);

-- Enable RLS
ALTER TABLE public.orders ENABLE ROW LEVEL SECURITY;

-- Allow public insert
CREATE POLICY "Allow public insert of orders" 
ON public.orders 
FOR INSERT 
TO anon, authenticated
WITH CHECK (true);

-- Allow public read (for order receipt and admin dashboard)
CREATE POLICY "Allow reading orders" 
ON public.orders 
FOR SELECT 
TO anon, authenticated
USING (true);
