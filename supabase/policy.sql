CREATE POLICY "Allow public update of orders"
ON public.orders
FOR UPDATE
TO anon, authenticated
USING (true)
WITH CHECK (true);
