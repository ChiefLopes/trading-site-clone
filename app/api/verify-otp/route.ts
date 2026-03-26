import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function POST(request: Request) {
  try {
    const { email, otp } = await request.json();

    if (!email || !otp) {
      return NextResponse.json(
        { error: "Email and OTP are required." },
        { status: 400 },
      );
    }

    const tokenRecord = await prisma.verificationToken.findFirst({
      where: { identifier: email, token: otp },
    });

    if (!tokenRecord) {
      return NextResponse.json({ error: "Invalid OTP code." }, { status: 400 });
    }

    const hasExpired = new Date(tokenRecord.expires) < new Date();

    if (hasExpired) {
      return NextResponse.json(
        { error: "OTP has expired. Please request a new one." },
        { status: 400 },
      );
    }

    // Mark user as verified
    const updatedUser = await prisma.user.update({
      where: { email },
      data: { emailVerified: new Date() },
    });

    // Cleanup the used token
    await prisma.verificationToken.deleteMany({
      where: { identifier: email },
    });

    // Send welcome email (seamless)
    try {
      const { sendWelcomeEmail } = await import("@/lib/mail");
      await sendWelcomeEmail(email, updatedUser.name);
    } catch (e) {
      console.error("Error sending welcome email:", e);
    }

    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error("OTP Verification error:", error);
    return NextResponse.json(
      { error: "Verification failed. Please try again." },
      { status: 500 },
    );
  }
}
