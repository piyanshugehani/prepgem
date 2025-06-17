import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';
import { db } from '../../../utils/db'; // update based on your path
import { allowedUsers } from '../../../utils/schema'; // adjust path
import { eq } from 'drizzle-orm';

export async function POST(req) {
  try {
    const body = await req.json();
    const { userEmail } = body;
    console.log("user email", userEmail)

    if (!userEmail) {
      return NextResponse.json({ error: 'Missing userEmail' }, { status: 400 });
    }

    
    // ✅ 1. Check if email already exists warna error dega
    const existing = await db.select().from(allowedUsers).where(eq(allowedUsers.email, userEmail));

    if (existing.length > 0) {
      return NextResponse.json({ message: 'Request already submitted.' }, { status: 200 });
    }
    
    // 2. Insert request into DB
    await db.insert(allowedUsers).values({
      email: userEmail,
      status: 'pending',
    });

    // 3. Setup transporter
    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: parseInt(process.env.SMTP_PORT || '587'),
      secure: false,
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    });

    // 4. Email content
    const approveUrl = `https://ai-prep-gem.vercel.app/api/handle-request?action=approve&email=${encodeURIComponent(userEmail)}`;
    const rejectUrl = `https://ai-prep-gem.vercel.app/api/handle-request?action=reject&email=${encodeURIComponent(userEmail)}`;
    const temporaryUrl = `https://ai-prep-gem.vercel.app/api/handle-request?action=temporary&email=${encodeURIComponent(userEmail)}`;
    
    const html = `
      <h2>Access Request</h2>
      <p>User ${userEmail} has requested access.</p>
      <p>
        <a href="${approveUrl}">Approve</a> | 
        <a href="${rejectUrl}">Reject</a> |
        <a href="${temporaryUrl}">Approve temporarily</a>
      </p>
    `;

    await transporter.sendMail({
      from: `"1-1 Access Request" <${process.env.SMTP_USER}>`,
      to: process.env.ADMIN_EMAIL,
      subject: 'Access Request for 1-1 Feature',
      html,
    });

    return NextResponse.json({ message: 'Request submitted and email sent.' }, { status: 200 });
  } catch (error) {
    console.error('[send-request] Error:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
