import nodemailer from 'nodemailer';
import { OrderRecord } from '@/types';

interface SendOrderEmailParams {
  order: OrderRecord;
}

/**
 * Creates a Nodemailer transporter configured for Gmail
 */
function createGmailTransporter() {
  const user = process.env.GMAIL_USER;
  const pass = process.env.GMAIL_APP_PASSWORD;

  if (!user || !pass || user.includes('your-email') || pass.includes('abcd efgh')) {
    return null;
  }

  // Remove spaces if the user pasted a 16-character app password with spaces
  const cleanPass = pass.replace(/\s+/g, '');

  return nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 465,
    secure: true,
    auth: {
      user: user,
      pass: cleanPass,
    },
  });
}

/**
 * Generates an elegant, responsive HTML email for the Pakistani restaurant kitchen
 */
function generateOrderHtmlEmail(order: OrderRecord): string {
  const restaurantName = process.env.RESTAURANT_NAME || 'Royal Rajput';
  const orderDate = order.created_at ? new Date(order.created_at).toLocaleString('en-PK') : new Date().toLocaleString('en-PK');

  const itemsRows = order.items
    .map(
      (item) => `
      <tr style="border-bottom: 1px solid #f1f5f9;">
        <td style="padding: 12px 8px; font-weight: 600; color: #1e293b;">${item.name}</td>
        <td style="padding: 12px 8px; text-align: center; color: #64748b; font-weight: 500;">x${item.quantity}</td>
        <td style="padding: 12px 8px; text-align: right; color: #64748b;">Rs. ${Number(item.price).toLocaleString()}</td>
        <td style="padding: 12px 8px; text-align: right; font-weight: 700; color: #ea580c;">Rs. ${Number(item.subtotal).toLocaleString()}</td>
      </tr>
    `
    )
    .join('');

  return `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>New Order Alert - ${restaurantName}</title>
</head>
<body style="margin: 0; padding: 0; background-color: #f8fafc; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; color: #334155;">
  <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="background-color: #f8fafc; padding: 30px 10px;">
    <tr>
      <td align="center">
        <table role="presentation" width="100%" style="max-width: 620px; background-color: #ffffff; border-radius: 12px; overflow: hidden; box-shadow: 0 4px 12px rgba(0,0,0,0.06); border: 1px solid #e2e8f0;">
          
          <!-- Header Banner -->
          <tr>
            <td style="background: linear-gradient(135deg, #1e1b4b 0%, #b45309 100%); padding: 32px 28px; text-align: center;">
              <h1 style="margin: 0; color: #ffffff; font-size: 26px; font-weight: 800; letter-spacing: -0.5px;">👑 ${restaurantName}</h1>
              <p style="margin: 6px 0 0; color: #fde68a; font-size: 15px; font-weight: 600;">🔔 New Customer Order Alert (Pakistan)</p>
            </td>
          </tr>

          <!-- Status & Order ID Pill -->
          <tr>
            <td style="padding: 24px 28px 12px;">
              <table width="100%" cellspacing="0" cellpadding="0">
                <tr>
                  <td>
                    <span style="font-size: 13px; color: #64748b; text-transform: uppercase; font-weight: 600; letter-spacing: 0.5px;">Order ID</span>
                    <div style="font-size: 15px; font-family: monospace; font-weight: 700; color: #0f172a;">#${order.id?.slice(0, 8) || 'NEW-ORDER'}</div>
                  </td>
                  <td align="right">
                    <span style="display: inline-block; background-color: #fef3c7; color: #92400e; font-size: 13px; font-weight: 700; padding: 4px 12px; border-radius: 9999px; border: 1px solid #fde68a;">
                      Status: ${order.status}
                    </span>
                  </td>
                </tr>
              </table>
              <div style="font-size: 13px; color: #94a3b8; margin-top: 6px;">Placed on: ${orderDate}</div>
            </td>
          </tr>

          <!-- Customer & Delivery Details Section -->
          <tr>
            <td style="padding: 12px 28px;">
              <div style="background-color: #f8fafc; border-radius: 8px; padding: 18px 20px; border: 1px solid #e2e8f0;">
                <h3 style="margin: 0 0 12px; font-size: 14px; text-transform: uppercase; color: #b45309; font-weight: 700; letter-spacing: 0.5px;">
                  📍 Customer & Delivery Information
                </h3>
                <table width="100%" cellspacing="0" cellpadding="4" style="font-size: 14px;">
                  <tr>
                    <td width="130" style="color: #64748b; font-weight: 500;">Customer Name:</td>
                    <td style="color: #0f172a; font-weight: 600;">${order.customer_name}</td>
                  </tr>
                  <tr>
                    <td style="color: #64748b; font-weight: 500;">Phone Number:</td>
                    <td style="color: #0f172a; font-weight: 600;">
                      <a href="tel:${order.phone_number}" style="color: #ea580c; text-decoration: none; font-weight: 700;">${order.phone_number}</a>
                    </td>
                  </tr>
                  <tr>
                    <td style="color: #64748b; font-weight: 500; vertical-align: top;">Delivery Address:</td>
                    <td style="color: #0f172a; font-weight: 600; line-height: 1.4;">${order.delivery_address}</td>
                  </tr>
                  ${
                    order.special_instructions
                      ? `<tr>
                          <td style="color: #64748b; font-weight: 500; vertical-align: top;">Special Notes:</td>
                          <td style="color: #475569; font-style: italic;">"${order.special_instructions}"</td>
                        </tr>`
                      : ''
                  }
                </table>
              </div>
            </td>
          </tr>

          <!-- Dishes Ordered Section -->
          <tr>
            <td style="padding: 16px 28px;">
              <h3 style="margin: 0 0 12px; font-size: 14px; text-transform: uppercase; color: #b45309; font-weight: 700; letter-spacing: 0.5px;">
                🥘 Ordered Dishes (${order.items.reduce((s, i) => s + i.quantity, 0)} Items)
              </h3>
              <table width="100%" cellspacing="0" cellpadding="0" style="font-size: 14px; border-collapse: collapse;">
                <thead>
                  <tr style="border-bottom: 2px solid #e2e8f0; color: #64748b; font-size: 12px; text-transform: uppercase;">
                    <th align="left" style="padding: 8px;">Dish</th>
                    <th align="center" style="padding: 8px;">Qty</th>
                    <th align="right" style="padding: 8px;">Price</th>
                    <th align="right" style="padding: 8px;">Subtotal</th>
                  </tr>
                </thead>
                <tbody>
                  ${itemsRows}
                </tbody>
              </table>
            </td>
          </tr>

          <!-- Total Amount Card -->
          <tr>
            <td style="padding: 12px 28px 24px;">
              <table width="100%" cellspacing="0" cellpadding="6" style="border-top: 2px dashed #cbd5e1; padding-top: 14px; font-size: 15px;">
                <tr>
                  <td style="color: #64748b; font-size: 16px; font-weight: 600;">Total Amount (COD):</td>
                  <td align="right" style="color: #ea580c; font-size: 24px; font-weight: 800;">Rs. ${Number(order.total_amount).toLocaleString()}</td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td style="background-color: #f1f5f9; padding: 18px 28px; text-align: center; border-top: 1px solid #e2e8f0;">
              <p style="margin: 0; font-size: 12px; color: #64748b;">
                This is an automated order alert for <strong>${restaurantName}</strong>.<br/>
                Please dispatch the rider and verify with the customer.
              </p>
            </td>
          </tr>

        </table>
      </td>
    </tr>
  </table>
</body>
</html>
  `.trim();
}

/**
 * Automated fallback delivery via FormSubmit API (requires no Google password)
 */
async function sendViaFormSubmit(order: OrderRecord, recipientEmail: string): Promise<{ sent: boolean; messageId?: string; error?: string }> {
  try {
    const orderRef = order.order_number || order.id?.slice(0, 8) || 'WEB';
    const dishesList = order.items.map((i) => `${i.name} (Qty: ${i.quantity}, Rs. ${Number(i.subtotal).toLocaleString()})`).join(' | ');

    const payload = {
      name: `Royal Rajput Kitchen`,
      subject: `👑 New Royal Rajput Order #${orderRef} - Rs. ${Number(order.total_amount).toLocaleString()} from ${order.customer_name}`,
      _subject: `👑 New Royal Rajput Order #${orderRef} - Rs. ${Number(order.total_amount).toLocaleString()} from ${order.customer_name}`,
      Order_ID: `#${orderRef}`,
      Customer_Name: order.customer_name,
      Phone_Number: order.phone_number,
      Delivery_Address: order.delivery_address,
      Ordered_Dishes: dishesList,
      Total_Payable_PKR: `Rs. ${Number(order.total_amount).toLocaleString()} (Cash on Delivery)`,
      Order_Status: order.status,
      Special_Notes: order.special_instructions || 'None',
      Placed_At: order.created_at ? new Date(order.created_at).toLocaleString('en-PK') : new Date().toLocaleString('en-PK'),
    };

    const res = await fetch(`https://formsubmit.co/ajax/${recipientEmail}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)',
        'Referer': 'https://royalrajput.pk',
      },
      body: JSON.stringify(payload),
    });

    const data = await res.json();
    console.log(`[Email Dispatch to ${recipientEmail}]:`, data);

    if (data.success === 'true' || data.success === true) {
      return { sent: true, messageId: `formsubmit_${Date.now()}` };
    } else {
      return { sent: false, error: data.message || 'FormSubmit activation required' };
    }
  } catch (err: unknown) {
    const msg = err instanceof Error ? err.message : 'Automated dispatch error';
    return { sent: false, error: msg };
  }
}

/**
 * Sends order confirmation email via Gmail SMTP or Automated Web Delivery
 */
export async function sendOrderNotificationEmail({ order }: SendOrderEmailParams): Promise<{ sent: boolean; messageId?: string; error?: string }> {
  const transporter = createGmailTransporter();
  const recipientEmail = process.env.RESTAURANT_NOTIFICATION_EMAIL || 'asadgohar21@gmail.com';

  // 1. If user provided a real Gmail App Password, send directly via Google SMTP
  if (transporter) {
    const restaurantName = process.env.RESTAURANT_NAME || 'Royal Rajput';
    const orderRef = order.order_number || order.id?.slice(0, 8) || 'WEB';
    const subject = `👑 New Royal Rajput Order (${orderRef}) - Rs. ${Number(order.total_amount).toLocaleString()} from ${order.customer_name}`;

    try {
      const info = await transporter.sendMail({
        from: `"${restaurantName} Orders" <${process.env.GMAIL_USER}>`,
        to: recipientEmail,
        subject: subject,
        html: generateOrderHtmlEmail(order),
        text: `
New Royal Rajput Order Received!
Order Reference: ${orderRef}
Status: ${order.status}
Customer Name: ${order.customer_name}
Phone Number: ${order.phone_number}
Delivery Address: ${order.delivery_address}
Total Payable: Rs. ${Number(order.total_amount).toLocaleString()}

Ordered Dishes:
${order.items.map((i) => `- ${i.name} x${i.quantity}: Rs. ${Number(i.subtotal).toLocaleString()}`).join('\n')}

Special Instructions: ${order.special_instructions || 'None'}
        `.trim(),
      });

      console.log(`[Gmail Integration] Order confirmation email successfully sent to ${recipientEmail}! Message ID: ${info.messageId}`);
      return { sent: true, messageId: info.messageId };
    } catch (error: unknown) {
      const msg = error instanceof Error ? error.message : 'Failed to send email';
      console.error(`[Gmail SMTP Error, attempting automated web dispatch to ${recipientEmail}]:`, msg);
    }
  }

  // 2. Automated Web Delivery directly to recipient email without requiring local password setup
  return await sendViaFormSubmit(order, recipientEmail);
}
