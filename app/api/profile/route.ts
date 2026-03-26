export const dynamic = "force-dynamic";
import { NextResponse } from "next/server";
import { auth } from "@/auth";
import { prisma, safeDbQuery } from "@/lib/prisma";

export async function GET() {
  const session = await auth();
  const email = session?.user?.email;

  if (!email) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const user = await safeDbQuery(
    async () => 
      await prisma.user.findUnique({
        where: { email },
        select: {
          name: true,
          email: true,
          phone: true,
          country: true,
          username: true,
          referralId: true,
        },
      }),
    null
  );

  if (!user) {
    return NextResponse.json({ error: "User not found or database unreachable" }, { status: 404 });
  }

  return NextResponse.json({
    fullname: user.name ?? "",
    email: user.email ?? "",
    phone: user.phone ?? "",
    country: user.country ?? "",
    username: user.username ?? "",
    referralId: user.referralId ?? "",
  });
}

export async function PATCH(request: Request) {
  const session = await auth();
  const email = session?.user?.email;

  if (!email) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const body = (await request.json()) as {
    fullname?: string;
    phone?: string;
    country?: string;
    username?: string;
  };

  // Validate username: lowercase alphanumeric only
  let username: string | undefined;
  if (body.username) {
    username = body.username.toString().trim().toLowerCase().replace(/[^a-z0-9]/g, "");
    if (username.length < 3) {
      return NextResponse.json({ error: "Username must be at least 3 characters." }, { status: 400 });
    }
    // Check uniqueness
    const existing = await prisma.user.findFirst({
      where: { username, NOT: { email } },
      select: { id: true },
    });
    if (existing) {
      return NextResponse.json({ error: "Username is already taken." }, { status: 409 });
    }
  }

  try {
    const user = await prisma.user.update({
      where: { email },
      data: {
        name: body.fullname?.toString().trim() || null,
        phone: body.phone?.toString().trim() || null,
        country: body.country?.toString().trim() || null,
        ...(username ? { username } : {}),
      },
      select: {
        name: true,
        email: true,
        phone: true,
        country: true,
        username: true,
      },
    });

    return NextResponse.json({
      fullname: user.name ?? "",
      email: user.email ?? "",
      phone: user.phone ?? "",
      country: user.country ?? "",
      username: user.username ?? "",
    });
  } catch (error) {
    console.error("Database update failed:", error);
    return NextResponse.json({ error: "Failed to update profile. Database might be busy." }, { status: 500 });
  }
}
