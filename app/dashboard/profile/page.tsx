import React from "react";
import { auth } from "@/auth";
import { redirect } from "next/navigation";
import { prisma, safeDbQuery } from "@/lib/prisma";
import ProfileClient from "@/components/profile/ProfileClient";

export default async function ProfilePage() {
  const session = await auth();

  if (!session?.user?.email) {
    redirect("/login");
  }

  // Use the safeDbQuery wrapper to handle the "Closed Connection" error from Neon.
  // If the DB fails, it now falls back gracefully instead of crashing the process.
  const user = await safeDbQuery(
    async () => 
      await prisma.user.findUnique({
        where: { email: session.user.email! },
        select: {
          name: true,
          email: true,
          phone: true,
          country: true,
          referralId: true,
        },
      }),
    null // Fallback value if DB is unreachable
  );

  const initialData = {
    fullname: user?.name ?? session.user.name ?? "",
    email: user?.email ?? session.user.email ?? "",
    phone: user?.phone ?? "",
    country: user?.country ?? "",
    referralId: user?.referralId ?? "",
  };

  return <ProfileClient initialData={initialData} />;
}
