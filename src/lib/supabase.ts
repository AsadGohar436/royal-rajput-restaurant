import { createClient, SupabaseClient } from '@supabase/supabase-js';
import { OrderRecord } from '@/types';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
// In server routes, we prefer the service role key for guaranteed write access, but fall back to anon key
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';

let cachedClient: SupabaseClient | null = null;

export function getSupabaseClient(): SupabaseClient | null {
  if (!supabaseUrl || !supabaseKey || supabaseUrl.includes('your-project-id')) {
    return null;
  }
  if (!cachedClient) {
    cachedClient = createClient(supabaseUrl, supabaseKey, {
      auth: {
        persistSession: false,
      },
    });
  }
  return cachedClient;
}

/**
 * Inserts a new order into the Supabase 'orders' table
 */
export async function insertOrder(order: Omit<OrderRecord, 'id' | 'created_at'>): Promise<{ data: OrderRecord | null; error: string | null; isMock?: boolean }> {
  const client = getSupabaseClient();
  const orderNumber = order.order_number || `RR-${Math.floor(10000 + Math.random() * 90000)}`;

  if (!client) {
    console.warn('[Supabase] Missing or dummy NEXT_PUBLIC_SUPABASE_URL / SUPABASE_SERVICE_ROLE_KEY.');
    // Simulated successful insertion for local testing when credentials aren't yet populated
    const mockOrder: OrderRecord = {
      ...order,
      id: `demo-${Date.now()}-${Math.random().toString(36).substring(2, 7)}`,
      order_number: orderNumber,
      created_at: new Date().toISOString(),
      status: 'Pending',
    };
    return {
      data: mockOrder,
      error: null,
      isMock: true,
    };
  }

  try {
    const { data, error } = await client
      .from('orders')
      .insert([
        {
          order_number: orderNumber,
          customer_name: order.customer_name,
          phone_number: order.phone_number,
          delivery_address: order.delivery_address,
          items: order.items,
          total_amount: order.total_amount,
          status: 'Pending', // Enforcing default 'Pending' requirement
          special_instructions: order.special_instructions || null,
          email_notification_sent: order.email_notification_sent || false,
        },
      ])
      .select()
      .single();

    if (error) {
      console.error('[Supabase Insert Error]:', error);
      return { data: null, error: error.message };
    }

    return { data: data as OrderRecord, error: null };
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : 'Unknown Supabase error';
    console.error('[Supabase Unexpected Exception]:', message);
    return { data: null, error: message };
  }
}

/**
 * Updates order status by UUID id or order_number
 */
export async function updateOrderStatus(identifier: string, status: OrderRecord['status']): Promise<{ data: OrderRecord | null; error: string | null }> {
  const client = getSupabaseClient();
  if (!client) {
    return { data: null, error: 'Supabase client not configured' };
  }

  try {
    // Check if identifier looks like UUID or order_number
    const query = identifier.startsWith('RR-')
      ? client.from('orders').update({ status }).eq('order_number', identifier).select().single()
      : client.from('orders').update({ status }).eq('id', identifier).select().single();

    const { data, error } = await query;
    if (error) {
      return { data: null, error: error.message };
    }
    return { data: data as OrderRecord, error: null };
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : 'Unknown error updating status';
    return { data: null, error: message };
  }
}

/**
 * Searches for an order by order_number (e.g. RR-74001), UUID, or phone_number
 */
export async function findOrderByQuery(queryStr: string): Promise<{ data: OrderRecord[] | null; error: string | null }> {
  const client = getSupabaseClient();
  if (!client) {
    return { data: null, error: 'Supabase client not configured' };
  }

  const clean = queryStr.trim();
  try {
    // 1. Try exact order_number match
    const { data: byOrderNum } = await client
      .from('orders')
      .select('*')
      .ilike('order_number', clean);

    if (byOrderNum && byOrderNum.length > 0) {
      return { data: byOrderNum as OrderRecord[], error: null };
    }

    // 2. Try ID match (if valid UUID format)
    const uuidRegex = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;
    if (uuidRegex.test(clean)) {
      const { data: byId } = await client
        .from('orders')
        .select('*')
        .eq('id', clean);
      if (byId && byId.length > 0) {
        return { data: byId as OrderRecord[], error: null };
      }
    }

    // 3. Try phone number match (contains)
    const { data: byPhone, error } = await client
      .from('orders')
      .select('*')
      .ilike('phone_number', `%${clean}%`)
      .order('created_at', { ascending: false })
      .limit(5);

    if (error) {
      return { data: null, error: error.message };
    }

    return { data: (byPhone as OrderRecord[]) || [], error: null };
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : 'Unknown search error';
    return { data: null, error: message };
  }
}
