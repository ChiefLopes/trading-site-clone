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
  };

  try {
    const user = await prisma.user.update({
      where: { email },
      data: {
        name: body.fullname?.toString().trim() || null,
        phone: body.phone?.toString().trim() || null,
        country: body.country?.toString().trim() || null,
      },
      select: {
        name: true,
        email: true,
        phone: true,
        country: true,
      },
    });

    return NextResponse.json({
      fullname: user.name ?? "",
      email: user.email ?? "",
      phone: user.phone ?? "",
      country: user.country ?? "",
    });
  } catch (error) {
    console.error("Database update failed:", error);
    return NextResponse.json({ error: "Failed to update profile. Database might be busy." }, { status: 500 });
  }
}
