import { NextResponse } from "next/server";
import { generateAndSendOTP } from "@/lib/mail";
import { prisma } from "@/lib/prisma";

export async function POST(request: Request) {
  try {
    const { email } = await request.json();
    if (!email) {
      return NextResponse.json(
        { error: "Email is required." },
        { status: 400 },
      );
    }
    // Check if user exists
    const user = await prisma.user.findUnique({ where: { email } });
    if (!user) {
      return NextResponse.json({ error: "User not found." }, { status: 404 });
    }
    await generateAndSendOTP(email);
    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error("Resend OTP error:", error);
    return NextResponse.json(
      { error: "Failed to resend OTP." },
      { status: 500 },
    );
  }
}
