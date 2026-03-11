"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import GoogleTranslate from "@/components/GoogleTranslate";
import { usePathname } from "next/navigation";
import {
  Home,
  Package,
  Download,
  Upload,
  FileText,
  MessageSquare,
  ShoppingCart,
  Users,
  UserCircle,
  Menu,
  X,
  Bell,
  Shield,
} from "lucide-react";

const sidebarLinks = [
  { label: "Home", href: "/dashboard", icon: Home },
  { label: "Packages", href: "/dashboard/packages", icon: Package },
  { label: "Deposit", href: "/dashboard/deposit", icon: Download },
  { label: "Withdraw", href: "/dashboard/withdraw", icon: Upload },
  { label: "Transactions", href: "/dashboard/transactions", icon: FileText },
  {
    label: "Swap\nCrypto",
    href: "/dashboard/swap-crypto",
    icon: MessageSquare,
  },
  {
    label: "Purchase\nStock",
    href: "/dashboard/purchase-stock",
    icon: ShoppingCart,
  },
  { label: "Referrals", href: "/dashboard/referrals", icon: Users },
  { label: "Profile", href: "/dashboard/profile", icon: UserCircle },
];

function SidebarGrid({
  pathname,
  onLinkClick,
}: {
  pathname: string;
  onLinkClick?: () => void;
}) {
  return (
    <div className="grid grid-cols-2 gap-x-4 gap-y-8 p-4">
      {sidebarLinks.map((link) => {
        const isActive =
          pathname === link.href ||
          (link.href !== "/dashboard" && pathname.startsWith(link.href));
        const Icon = link.icon;
        return (
          <Link
            key={link.href}
            href={link.href}
            onClick={onLinkClick}
            className={`flex flex-col items-center gap-2 py-4 px-2 rounded-xl transition-all duration-200 ${
              isActive
                ? "bg-white/5 border border-white/10"
                : "hover:bg-white/5"
            }`}>
            <Icon
              size={28}
              className={isActive ? "text-white" : "text-gray-400"}
            />
            <span
              className={`text-xs text-center leading-tight whitespace-pre-line ${
                isActive ? "text-white font-medium" : "text-gray-400"
              }`}>
              {link.label}
            </span>
          </Link>
        );
      })}
    </div>
  );
}

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <div className="min-h-screen bg-[#0a0f0d]">
      {/* Top Navbar */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-[#0a0f0d] border-b border-[#22c55e]/30 h-16 flex items-center justify-between px-4 md:px-8">
        <div className="flex items-center gap-3">
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="lg:hidden text-white p-1 mr-2"
            aria-label="Toggle menu">
            {mobileOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
          <Link href="/" className="flex items-center gap-2">
            <Image
              src="/logo.png"
              alt="Infinity Digital Trade"
              width={40}
              height={40}
              className="rounded-md"
            />
            <div className="hidden sm:block">
              <span className="text-sm font-bold text-[#22c55e] leading-tight block">
                INFINITY
              </span>
              <span className="text-[10px] text-white font-medium tracking-wider">
                DIGITAL TRADE
              </span>
            </div>
          </Link>
        </div>

        <div className="flex items-center gap-4">
          <button className="text-white hover:text-gray-300 transition-colors">
            <Bell size={18} />
          </button>
          <div className="flex items-center gap-1.5 text-gray-300 text-xs">
            <Shield size={14} className="text-[#22c55e]" />
            <span className="hidden sm:inline">KYC</span>
          </div>
          <Link
            href="/dashboard/profile"
            className="flex items-center gap-2 bg-white/5 hover:bg-white/10 rounded-full pl-1 pr-3 py-1 transition-colors">
            <div className="w-7 h-7 rounded-full bg-[#1a2420] border border-white/10 flex items-center justify-center">
              <UserCircle size={18} className="text-[#22c55e]" />
            </div>
            <span className="text-sm text-white hidden sm:inline">evelyn</span>
          </Link>
        </div>
      </header>

      <div className="flex pt-16">
        {/* Sidebar - Desktop (icon grid) */}
        <aside className="hidden lg:block w-[280px] shrink-0 min-h-[calc(100vh-64px)] sticky top-16 self-start overflow-y-auto py-4">
          <SidebarGrid pathname={pathname} />
        </aside>

        {/* Mobile Sidebar Overlay */}
        {mobileOpen && (
          <div
            className="lg:hidden fixed inset-0 z-40 bg-black/60 top-16"
            onClick={() => setMobileOpen(false)}
          />
        )}

        {/* Mobile Sidebar */}
        <aside
          className={`lg:hidden fixed left-0 top-16 z-50 w-[260px] bg-[#0e1512] min-h-[calc(100vh-64px)] transform transition-transform duration-300 overflow-y-auto ${
            mobileOpen ? "translate-x-0" : "-translate-x-full"
          }`}>
          <SidebarGrid
            pathname={pathname}
            onLinkClick={() => setMobileOpen(false)}
          />
        </aside>

        {/* Main Content */}
        <main className="flex-1 min-h-[calc(100vh-64px)] min-w-0 flex flex-col">
          <div className="p-4 md:p-6 lg:p-8 flex-1">{children}</div>
          {/* Footer */}
          <div className="px-4 md:px-6 lg:px-8 py-6 flex flex-col sm:flex-row items-center justify-between gap-4">
            <p className="text-sm text-[#22c55e]/70 italic">
              All Rights Reserved © Infinity Digital Trade 2026
            </p>
            <GoogleTranslate />
          </div>
        </main>
      </div>
    </div>
  );
}
