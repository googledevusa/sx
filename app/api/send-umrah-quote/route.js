import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

const escapeHtml = (value) =>
  String(value ?? '')
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&#039;');

export async function POST(req) {
  try {
    const data = await req.json();
    const { name, phone, email, packageDetails, grandTotal } = data;
    const smtpUser = process.env.SMTP_USER;
    const smtpPassword = process.env.SMTP_PASSWORD;
    const recipient = process.env.SMTP_RECIPIENT || smtpUser;

    if (!smtpUser || !smtpPassword || !recipient) {
      throw new Error('Email service is not configured.');
    }

    if (!name || !phone || !Number.isFinite(Number(grandTotal))) {
      return NextResponse.json({ success: false, error: 'Invalid booking details.' }, { status: 400 });
    }

    const transporter = nodemailer.createTransport({
      host: 'smtp.gmail.com',
      port: 587,
      secure: false,
      auth: { user: smtpUser, pass: smtpPassword },
    });

    const safeName = escapeHtml(name);
    const safePhone = escapeHtml(phone);
    const safeEmail = escapeHtml(email);
    const safeTotal = Number(grandTotal).toLocaleString('en-IN');
    const safePackageDetails = Object.entries(packageDetails || {})
      .map(([key, value]) => `<li>${escapeHtml(key)}: ${escapeHtml(value)}</li>`)
      .join('');

    await transporter.sendMail({
      from: `"Sheba Travels" <${smtpUser}>`,
      to: recipient,
      subject: `New Umrah Booking Request from ${name}`,
      html: `<h2>New Booking</h2><p>Name: ${safeName}</p><p>Phone: ${safePhone}</p><p>Email: ${safeEmail}</p><p>Total: ৳${safeTotal}</p><ul>${safePackageDetails}</ul>`,
    });

    if (email) {
      await transporter.sendMail({
        from: `"Sheba Travels International" <${smtpUser}>`,
        to: email,
        subject: 'Your Custom Umrah Package Summary — Sheba Travels',
        html: `<h2>Thank you ${safeName}!</h2><p>We received your Umrah package request totaling ৳${safeTotal}.</p>`,
      });
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Unable to send Umrah quote email:', error);
    return NextResponse.json({ success: false, error: 'Unable to send booking email.' }, { status: 500 });
  }
}