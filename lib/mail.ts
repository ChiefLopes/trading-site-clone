import { sendEmail as brevoEmail } from "@/lib/brevo";

import { prisma } from "@/lib/prisma";

export const generateAndSendOTP = async (email: string) => {
  // Generate a random 6-digit OTP
  const otp = Math.floor(100000 + Math.random() * 900000).toString();
  const expires = new Date(Date.now() + 1000 * 60 * 15); // 15 mins

  // Remove any existing tokens for this email to prevent collisions
  await prisma.verificationToken.deleteMany({
    where: { identifier: email },
  });

  // Save the new OTP
  await prisma.verificationToken.create({
    data: {
      identifier: email,
      token: otp,
      expires,
    },
  });

  try {
    await brevoEmail({
      to: email,
      subject: "Your Verification Code - Infinity Digital Trade",
      html: `
        <div style="background: #0a0f0d; color: #fff; font-family: 'Segoe UI', Arial, sans-serif; max-width: 480px; margin: 40px auto; border-radius: 18px; overflow: hidden; box-shadow: 0 8px 32px rgba(34,197,94,0.12); border: 1px solid #22c55e33;">
          <div style="background: linear-gradient(90deg, #22c55e 0%, #7b6ef6 100%); padding: 24px 0; text-align: center;">
            <img src="https://i.imgur.com/8QfQ2Qp.png" alt="Infinity Digital Trade" style="height: 48px; margin-bottom: 8px;" />
            <h1 style="margin: 0; font-size: 2rem; color: #fff; letter-spacing: 2px;">Verify your email</h1>
          </div>
          <div style="padding: 32px 24px 24px 24px;">
            <p style="font-size: 1.1rem; margin-bottom: 18px;">Thank you for joining <span style="color: #22c55e; font-weight: bold;">Infinity Digital Trade</span>!</p>
            <p style="margin-bottom: 12px;">Enter the code below to verify your email address:</p>
            <div style="background: #181f1b; border-radius: 12px; padding: 18px 0; margin: 24px 0; text-align: center;">
              <span style="font-size: 2.5rem; letter-spacing: 10px; color: #22c55e; font-weight: bold;">${otp}</span>
            </div>
            <p style="color: #aaa; font-size: 0.95rem;">This code will expire in <b>15 minutes</b>.</p>
            <p style="margin-top: 32px; color: #7b6ef6; font-size: 0.95rem;">If you did not request this, you can safely ignore this email.</p>
          </div>
          <div style="background: #181f1b; color: #aaa; text-align: center; padding: 16px 0; font-size: 0.9rem; border-top: 1px solid #22c55e22;">
            &copy; ${new Date().getFullYear()} Infinity Digital Trade
          </div>
        </div>
      `,
    });
    console.log(`Sent OTP to ${email} via Brevo`);
  } catch (error) {
    console.error("Error sending OTP via Brevo:", error);
  }
};

export const sendWelcomeEmail = async (email: string, name?: string | null) => {
  const displayName = name || "there";

  try {
    await brevoEmail({
      to: email,
      subject: "Welcome to Infinity Digital Trade!",
      html: `
        <div style="background: #0a0f0d; color: #fff; font-family: 'Segoe UI', Arial, sans-serif; max-width: 480px; margin: 40px auto; border-radius: 18px; overflow: hidden; box-shadow: 0 8px 32px rgba(123,110,246,0.10); border: 1px solid #7b6ef633;">
          <div style="background: linear-gradient(90deg, #7b6ef6 0%, #22c55e 100%); padding: 24px 0; text-align: center;">
            <img src="https://i.imgur.com/8QfQ2Qp.png" alt="Infinity Digital Trade" style="height: 48px; margin-bottom: 8px;" />
            <h1 style="margin: 0; font-size: 2rem; color: #fff; letter-spacing: 2px;">Welcome, ${displayName}!</h1>
          </div>
          <div style="padding: 32px 24px 24px 24px;">
            <p style="font-size: 1.1rem; margin-bottom: 18px;">Your email <b>${email}</b> has been successfully verified.</p>
            <p style="margin-bottom: 12px;">You now have full access to <span style="color: #22c55e; font-weight: bold;">Infinity Digital Trade</span>. Start exploring our platform to manage your investments and grow your portfolio.</p>
            <div style="margin: 32px 0 0 0; text-align: center;">
              <a href="https://infinitydigitaltrade.com/dashboard" style="display: inline-block; background: linear-gradient(90deg, #22c55e 0%, #7b6ef6 100%); color: #fff; font-weight: bold; padding: 14px 36px; border-radius: 8px; text-decoration: none; font-size: 1.1rem; box-shadow: 0 2px 8px #22c55e22;">Go to Dashboard</a>
            </div>
            <p style="margin-top: 32px; color: #aaa; font-size: 0.95rem;">If you didn't create this account, please contact our support immediately.</p>
          </div>
          <div style="background: #181f1b; color: #aaa; text-align: center; padding: 16px 0; font-size: 0.9rem; border-top: 1px solid #7b6ef622;">
            &copy; ${new Date().getFullYear()} Infinity Digital Trade
          </div>
        </div>
      `,
    });
    console.log(`Sent welcome email to ${email} via Brevo`);
  } catch (error) {
    console.error("Error sending welcome email via Brevo:", error);
  }
};
