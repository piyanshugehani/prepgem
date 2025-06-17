import { NextResponse } from 'next/server';
import { db } from '../../../utils/db';
import { allowedUsers } from '../../../utils/schema';
import { eq } from 'drizzle-orm';
import nodemailer from 'nodemailer';

// In-memory timer map (not scalable – resets on server restart)
const tempApprovalTimers = new Map();

export async function GET(req) {
  try {
    const { searchParams } = new URL(req.url);
    const action = searchParams.get('action');
    const email = searchParams.get('email');

    if (!action || !email) {
      return NextResponse.json({ error: 'Missing parameters' }, { status: 400 });
    }

    let status = '';

    if (action === 'approve') {
      status = 'approved';
    } else if (action === 'reject') {
      status = 'rejected';
    } else if (action === 'temporary') {
      status = 'approved';

      // Approve temporarily
      await db.update(allowedUsers).set({ status }).where(eq(allowedUsers.email, email));

      // Clear old timer if exists
      if (tempApprovalTimers.has(email)) {
        clearTimeout(tempApprovalTimers.get(email));
      }

      // Revert to pending after 20 minutes
      const timer = setTimeout(async () => {
        try {
          await db.update(allowedUsers).set({ status: 'pending' }).where(eq(allowedUsers.email, email));
          console.log(`[Auto-Revert] ${email} reverted to pending`);
        } catch (err) {
          console.error(`[Auto-Revert Error]`, err);
        } finally {
          tempApprovalTimers.delete(email);
        }
      }, 20 * 60 * 1000); // 20 minutes

      tempApprovalTimers.set(email, timer);
    } else {
      return NextResponse.json({ error: 'Invalid action' }, { status: 400 });
    }

    // For non-temporary actions
    if (action !== 'temporary') {
      await db.update(allowedUsers).set({ status }).where(eq(allowedUsers.email, email));
    }

    // Send email
    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: parseInt(process.env.SMTP_PORT || '587'),
      secure: false,
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    });

    const subject = action === 'temporary'
      ? 'Temporary Access Granted'
      : `Your access request was ${status}`;

    const html = `
      <p>Hello,</p>
      <p>Your request for 1-1 mock interview access has been <strong>${status}</strong>.</p>
      ${
        action === 'temporary'
          ? '<p>This is a temporary approval. Your status will revert to <strong>pending</strong> in 20 minutes.</p>'
          : status === 'approved'
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
      html,
    });

    return new Response(
      `<h2>User ${email} has been ${status}${action === 'temporary' ? ' (temporarily)' : ''} and notified via email.</h2><p>You can now close this tab.</p>`,
      {
        status: 200,
        headers: {
          'Content-Type': 'text/html',
        },
      }
    );
  } catch (err) {
    console.error('[Error handling request]', err);
    return NextResponse.json({ error: 'Server error' }, { status: 500 });
  }
}