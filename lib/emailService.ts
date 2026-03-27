import nodemailer from "nodemailer";

export interface EmailOptions {
  to: string;
  subject: string;
  html: string;
  from?: string;
}

const transporter = nodemailer.createTransport({
  host: "smtp-relay.brevo.com",
  port: 587,
  secure: false,
  auth: {
    user: process.env.BREVO_SMTP_LOGIN!,
    pass: process.env.BREVO_SMTP_PASS!,
  },
});

export async function sendMail({ to, subject, html, from }: EmailOptions) {
  const sender = from || process.env.BREVO_SENDER_EMAIL!;
  try {
    const info = await transporter.sendMail({
      from: sender,
      to,
      subject,
      html,
    });
    console.log("Email sent:", info.messageId);
    return info;
  } catch (error) {
    console.error("Email sending error:", error);
    throw error;
  }
}
