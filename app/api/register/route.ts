export const dynamic = "force-dynamic";
import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import crypto from "crypto";

import { prisma } from "@/lib/prisma";
import { generateAndSendOTP } from "@/lib/mail";
import { generateUsername } from "@/lib/username";

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as {
      email?: string;
      name?: string;
      username?: string;
      phone?: string;
      country?: string;
      password?: string;
      referralId?: string;
    };

    const email = body.email?.toString().trim().toLowerCase();
    const password = body.password?.toString();

    if (!email || !password) {
      return NextResponse.json(
        { error: "Email and password are required." },
        { status: 400 },
      );
    }

    if (password.length < 8) {
      return NextResponse.json(
        { error: "Password must be at least 8 characters." },
        { status: 400 },
      );
    }

    const existingUser = await prisma.user.findUnique({ where: { email } });

    if (existingUser) {
      return NextResponse.json(
        { error: "An account with this email already exists." },
        { status: 409 },
      );
    }

    const passwordHash = await bcrypt.hash(password, 10);

    // Auto-generate username if not provided
    const username =
      body.username?.toString().trim() ||
      (await generateUsername(body.name, email));

    await prisma.user.create({
      data: {
        email,
        name: body.name?.toString().trim() || null,
        username,
        phone: body.phone?.toString().trim() || null,
        country: body.country?.toString().trim() || null,
        referralId: body.referralId?.toString().trim() || null,
        passwordHash,
      },
    });

    // Generate and Send OTP
    await generateAndSendOTP(email);

    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error("Registration error:", error);
    return NextResponse.json(
      { error: "Registration failed. Please try again." },
      { status: 500 },
    );
  }
}
