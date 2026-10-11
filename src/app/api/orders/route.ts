import { NextRequest, NextResponse } from 'next/server';
import { insertOrder, getSupabaseClient, updateOrderStatus, findOrderByQuery } from '@/lib/supabase';
import { sendOrderNotificationEmail } from '@/lib/email';
import { OrderItemPayload, OrderRecord } from '@/types';

export const runtime = 'nodejs'; // Ensure Node.js runtime for nodemailer SMTP

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { customerName, phoneNumber, deliveryAddress, items, specialInstructions } = body;

    // 1. Strict Validation
    if (!customerName || typeof customerName !== 'string' || !customerName.trim()) {
      return NextResponse.json(
        { success: false, error: 'Customer Name is required.' },
        { status: 400 }
      );
    }

    if (!phoneNumber || typeof phoneNumber !== 'string' || !phoneNumber.trim()) {
      return NextResponse.json(
        { success: false, error: 'Phone Number is required.' },
        { status: 400 }
      );
    }

    if (!deliveryAddress || typeof deliveryAddress !== 'string' || !deliveryAddress.trim()) {
      return NextResponse.json(
        { success: false, error: 'Delivery Address is required.' },
        { status: 400 }
      );
    }

    if (!items || !Array.isArray(items) || items.length === 0) {
      return NextResponse.json(
        { success: false, error: 'At least one dish must be selected.' },
        { status: 400 }
      );
    }

    // Validate and sanitize items
    const sanitizedItems: OrderItemPayload[] = [];
    let calculatedTotal = 0;

    for (const item of items) {
      if (!item.dish_id || !item.name || !item.price || !item.quantity) {
        return NextResponse.json(
          { success: false, error: 'Invalid dish item structure.' },
          { status: 400 }
        );
      }

      const qty = parseInt(String(item.quantity), 10);
      const price = parseFloat(String(item.price));

      if (isNaN(qty) || qty <= 0) {
        return NextResponse.json(
          { success: false, error: `Invalid quantity for dish: ${item.name}` },
          { status: 400 }
        );
      }

      const subtotal = Math.round(price * qty * 100) / 100;
      calculatedTotal += subtotal;

      sanitizedItems.push({
        dish_id: String(item.dish_id),
        name: String(item.name).trim(),
        price: price,
        quantity: qty,
        subtotal: subtotal,
      });
    }

    const finalTotal = Math.round(calculatedTotal * 100) / 100;
    // Generate Daraz-style 5-digit Order Number (e.g. RR-84920)
    const generatedOrderNumber = `RR-${Math.floor(10000 + Math.random() * 90000)}`;

    // 2. Prepare Order Record for Database (Default Status 'Pending')
    const newOrderData: Omit<OrderRecord, 'id' | 'created_at'> = {
      order_number: generatedOrderNumber,
      customer_name: customerName.trim(),
      phone_number: phoneNumber.trim(),
      delivery_address: deliveryAddress.trim(),
      items: sanitizedItems,
      total_amount: finalTotal,
      status: 'Pending', // Enforce default 'Pending' requirement
      special_instructions: specialInstructions ? String(specialInstructions).trim() : undefined,
      email_notification_sent: false,
    };

    // 3. Store Order in Supabase Table 'orders'
    const { data: dbOrder, error: dbError, isMock } = await insertOrder(newOrderData);

    if (dbError && !isMock) {
      return NextResponse.json(
        {
          success: false,
          error: `Database insertion failed: ${dbError}`,
        },
        { status: 500 }
      );
    }

    const orderRecord: OrderRecord = dbOrder || {
      ...newOrderData,
      id: `ord_${Date.now()}`,
      order_number: generatedOrderNumber,
      created_at: new Date().toISOString(),
    };

    // 4. Send Gmail Notification to Restaurant
    let emailResult: { sent: boolean; messageId?: string; error?: string } = { sent: false };
    try {
      emailResult = await sendOrderNotificationEmail({ order: orderRecord });
    } catch (emailErr: unknown) {
      console.error('[API Route Email Error]:', emailErr);
      emailResult = { sent: false, error: emailErr instanceof Error ? emailErr.message : 'Unknown email failure' };
    }

    return NextResponse.json(
      {
        success: true,
        message: 'Order placed successfully!',
        data: orderRecord,
        emailSent: emailResult.sent,
        emailNote: emailResult.sent
          ? 'Confirmation email dispatched to restaurant Gmail.'
          : (emailResult.error || 'Simulated email (credentials not yet provided in .env).'),
        isMockDatabase: !!isMock,
      },
      { status: 201 }
    );
  } catch (error: unknown) {
    const errorMsg = error instanceof Error ? error.message : 'Internal server error';
    console.error('[POST /api/orders API Error]:', errorMsg);
    return NextResponse.json(
      { success: false, error: errorMsg },
      { status: 500 }
    );
  }
}

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const trackQuery = searchParams.get('track') || searchParams.get('order_number') || searchParams.get('id');

    // If query provided, search for specific order (for Daraz-style tracking)
    if (trackQuery) {
      const { data, error } = await findOrderByQuery(trackQuery);
      if (error) {
        return NextResponse.json({ success: false, error }, { status: 500 });
      }
      return NextResponse.json({
        success: true,
        orders: data || [],
        order: data && data.length > 0 ? data[0] : null,
      });
    }

    // Default: Return recent orders for Admin Monitor
    const client = getSupabaseClient();
    if (!client) {
      return NextResponse.json({
        success: true,
        orders: [],
        message: 'Supabase client running in local mock mode.',
      });
    }

    const { data, error } = await client
      .from('orders')
      .select('*')
      .order('created_at', { ascending: false })
      .limit(50);

    if (error) {
      return NextResponse.json({ success: false, error: error.message }, { status: 500 });
    }

    return NextResponse.json({ success: true, orders: data });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : 'Internal server error';
    return NextResponse.json({ success: false, error: message }, { status: 500 });
  }
}

export async function PATCH(request: NextRequest) {
  try {
    const body = await request.json();
    const { id, order_number, status } = body;

    const identifier = order_number || id;
    if (!identifier) {
      return NextResponse.json(
        { success: false, error: 'Order ID or Order Number is required.' },
        { status: 400 }
      );
    }

    const validStatuses = ['Pending', 'Confirmed', 'Preparing', 'Out for Delivery', 'Delivered', 'Cancelled'];
    if (!validStatuses.includes(status)) {
      return NextResponse.json(
        { success: false, error: `Invalid status. Must be one of: ${validStatuses.join(', ')}` },
        { status: 400 }
      );
    }

    const { data, error } = await updateOrderStatus(identifier, status);
    if (error) {
      return NextResponse.json({ success: false, error }, { status: 500 });
    }

    return NextResponse.json({
      success: true,
      message: `Order status updated to "${status}"`,
      order: data,
    });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : 'Internal server error';
    return NextResponse.json({ success: false, error: message }, { status: 500 });
  }
}
