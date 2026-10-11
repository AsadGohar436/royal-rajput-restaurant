// ====================================================================
// Supabase Edge Function: place-order
// Runtime: Deno (Supabase Edge Runtime)
// Can be deployed with: supabase functions deploy place-order
// ====================================================================

import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

serve(async (req) => {
  // Handle CORS preflight
  if (req.method === "OPTIONS") {
    return new Response("ok", { headers: corsHeaders });
  }

  try {
    const { customerName, phoneNumber, deliveryAddress, items, totalAmount, specialInstructions } = await req.json();

    // 1. Validation
    if (!customerName || !phoneNumber || !deliveryAddress || !items || items.length === 0) {
      return new Response(
        JSON.stringify({ error: "Missing required order information." }),
        { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    // 2. Initialize Supabase Client
    const supabaseUrl = Deno.env.get("SUPABASE_URL") ?? "";
    const supabaseServiceKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") ?? "";
    const supabase = createClient(supabaseUrl, supabaseServiceKey);

    // 3. Insert into public.orders table with status 'Pending'
    const { data: order, error: dbError } = await supabase
      .from("orders")
      .insert([
        {
          customer_name: customerName,
          phone_number: phoneNumber,
          delivery_address: deliveryAddress,
          items: items,
          total_amount: totalAmount,
          status: "Pending", // Default requirement
          special_instructions: specialInstructions || null,
        },
      ])
      .select()
      .single();

    if (dbError) {
      return new Response(
        JSON.stringify({ error: dbError.message }),
        { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    return new Response(
      JSON.stringify({
        success: true,
        message: "Order placed successfully in Supabase!",
        order: order,
      }),
      { status: 201, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  } catch (err: unknown) {
    const msg = err instanceof Error ? err.message : "Unknown error";
    return new Response(
      JSON.stringify({ error: msg }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }
});
