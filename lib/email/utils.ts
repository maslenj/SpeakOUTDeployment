import { Resend } from 'resend';
import { NextResponse } from 'next/server';

const resend = new Resend(process.env.RESEND_API_KEY);

export default async function sendEmail(email: string, subject: string, text: string) {
    const { data, error } = await resend.emails.send({
        from: 'SpeakOUT Engagements <SpeakOUTEngagments@jimmymaslen.com>',
        to: [email],
        subject: subject,
        text: text,
    });
    return { data, error };
};