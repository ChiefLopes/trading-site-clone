import React from "react";
import { auth } from "@/auth";
import { redirect } from "next/navigation";
import GoogleTranslate from "@/components/GoogleTranslate";
import DashboardHeader from "@/components/dashboard/DashboardHeader";
import DashboardSidebar from "@/components/dashboard/DashboardSidebar";

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await auth();

  if (!session) {
    redirect("/login");
  }

  return (
    <div className="min-h-screen bg-[#0a0f0d]">
      <DashboardHeader user={session.user} />

      <div className="flex pt-16">
        <DashboardSidebar />

        <main className="flex-1 min-h-[calc(100vh-64px)] min-w-0 flex flex-col">
          <div className="p-4 md:p-6 lg:p-8 flex-1">{children}</div>
          
          <footer className="px-4 md:px-6 lg:px-8 py-6 flex flex-col sm:flex-row items-center justify-between gap-4 border-t border-white/5">
            <p className="text-sm text-[#22c55e]/70 italic">
              All Rights Reserved © Infinity Digital Trade 2026
            </p>
            <GoogleTranslate />
          </footer>
        </main>
      </div>
    </div>
  );
}
