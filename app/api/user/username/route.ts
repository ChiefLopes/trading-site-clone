export const dynamic = "force-dynamic";
import { NextResponse } from "next/server";
import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";
import { generateUsername } from "@/lib/username";

export async function GET() {
  try {
    const session = await auth();

    if (!session?.user?.email) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const user = await prisma.user.findUnique({
      where: { email: session.user.email },
      select: { username: true, name: true },
    });

    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    // If user doesn't have a username, or it has spaces/special chars, generate a clean one
    const needsNewUsername =
      !user.username || /[^a-z0-9]/i.test(user.username);

    if (needsNewUsername) {
      const username = await generateUsername(user.name, session.user.email);
      await prisma.user.update({
        where: { email: session.user.email },
        data: { username },
      });
      return NextResponse.json({ username });
    }

    return NextResponse.json({ username: user.username });
  } catch (error) {
    console.error("Error fetching username:", error);
    return NextResponse.json(
      { error: "Failed to fetch username" },
      { status: 500 },
    );
  }
}
