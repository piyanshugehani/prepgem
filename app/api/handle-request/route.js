import { NextResponse } from 'next/server';
import { db } from '../../../utils/db';
import { allowedUsers } from '../../../utils/schema';
import { eq } from 'drizzle-orm';
import nodemailer from 'nodemailer';

export async function GET(req) {
  try {
    const { searchParams } = new URL(req.url);
    const action = searchParams.get('action');
    const email = searchParams.get('email');

    if (!action || !email) {
      return NextResponse.json({ error: 'Missing parameters' }, { status: 400 });
    }

    const status = action === 'approve' ? 'approved' : 'rejected';

    // ✅ 1. Update the status in DB
    await db
      .update(allowedUsers)
      .set({ status })
      .where(eq(allowedUsers.email, email));

    // ✅ 2. Send confirmation email to user
    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: parseInt(process.env.SMTP_PORT || '587'),
      secure: false,
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    });

    const subject = `Your access request was ${status}`;
    const htmlContent = `
      <p>Hello,</p>
      <p>Your request for 1-1 mock interview access has been <strong>${status}</strong>.</p>
      ${
        status === 'approved'
          ? '<p>You may now log in and use the features.</p>'
          : '<p>Unfortunately, your access was not granted at this time.</p>'
      }
      <br/>
      <p>Thanks,<br/>Admin</p>
    `;

    await transporter.sendMail({
      from: `"Mock Interview Admin" <${process.env.SMTP_USER}>`,
      to: email,
      subject,
      html: htmlContent,
    });

    // ✅ 3. Show confirmation to admin
    return new Response(
      `<h2>User ${email} has been ${status} and notified via email.</h2><p>You can now close this tab.</p>`,
      {
        status: 200,
        headers: {
          'Content-Type': 'text/html',
        },
      }
    );
  } catch (error) {
    console.error('[handle-request] Error:', error);
    return NextResponse.json({ error: 'Server error' }, { status: 500 });
  }
}