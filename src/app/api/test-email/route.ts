import { NextRequest, NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

export const runtime = 'nodejs';

export async function GET(request: NextRequest) {
  const user = process.env.GMAIL_USER || 'asadgohar21@gmail.com';
  const pass = process.env.GMAIL_APP_PASSWORD || '';
  const recipient = process.env.RESTAURANT_NOTIFICATION_EMAIL || 'asadgohar21@gmail.com';

  const isPlaceholder = !pass || pass.includes('abcd efgh') || pass.length < 8;

  if (isPlaceholder) {
    // Attempt FormSubmit automated delivery
    try {
      const fsRes = await fetch(`https://formsubmit.co/ajax/${recipient}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
          'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)',
          'Referer': 'https://royalrajput.pk',
        },
        body: JSON.stringify({
          name: 'Royal Rajput System Test',
          message: '👑 Assalam-o-Alaikum! This is a test order notification for Royal Rajput restaurant. Your email integration is working!',
        }),
      });

      const fsData = await fsRes.json();
      return NextResponse.json({
        service: 'FormSubmit Automated Email',
        recipient: recipient,
        status: fsData.success === 'true' || fsData.success === true ? 'Delivered' : 'Activation Needed',
        result: fsData,
        note: fsData.success === 'true' || fsData.success === true
          ? `Email successfully sent to ${recipient}!`
          : `FormSubmit has sent an activation email to ${recipient}. Please open your inbox (or spam) and click "Activate Form" once.`,
      });
    } catch (fsErr: unknown) {
      return NextResponse.json({
        configured: false,
        sender: user,
        recipient: recipient,
        message: 'Gmail App Password is not yet set. Current value is placeholder (abcd efgh ijkl mnop).',
        error: fsErr instanceof Error ? fsErr.message : 'Unknown error',
      });
    }
  }

  const cleanPass = pass.replace(/\s+/g, '');

  try {
    const transporter = nodemailer.createTransport({
      host: 'smtp.gmail.com',
      port: 465,
      secure: true,
      auth: {
        user: user,
        pass: cleanPass,
      },
    });

    await transporter.verify();

    const info = await transporter.sendMail({
      from: `"Royal Rajput System" <${user}>`,
      to: recipient,
      subject: '👑 Royal Rajput - Test Notification Email',
      html: `
        <div style="font-family: Arial, sans-serif; padding: 20px; background: #0f172a; color: #ffffff; border-radius: 10px;">
          <h2 style="color: #f59e0b;">👑 Royal Rajput Email System Active!</h2>
          <p>Assalam-o-Alaikum Asad Gohar,</p>
          <p>Your Gmail integration is successfully connected and verified! You will now receive every incoming order directly to this email.</p>
          <hr style="border-color: #334155;" />
          <p style="color: #94a3b8; font-size: 12px;">Sent automatically from Royal Rajput Restaurant System</p>
        </div>
      `,
    });

    return NextResponse.json({
      configured: true,
      success: true,
      message: `Test email successfully delivered to ${recipient}!`,
      messageId: info.messageId,
    });
  } catch (err: unknown) {
    const errorMsg = err instanceof Error ? err.message : 'Failed to send test email';
    return NextResponse.json(
      {
        configured: true,
        success: false,
        error: errorMsg,
        tip: 'If error mentions BadCredentials (535), make sure you are using a 16-character Google App Password, not your regular Gmail account password.',
      },
      { status: 500 }
    );
  }
}
