"use client";

import React, { useState } from "react";
import Link from "next/link";
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
} from "lucide-react";

const sidebarLinks = [
  { label: "Home", href: "/dashboard", icon: Home },
  { label: "Packages", href: "/dashboard/packages", icon: Package },
  { label: "Deposit", href: "/dashboard/deposit", icon: Download },
  { label: "Withdraw", href: "/dashboard/withdraw", icon: Upload },
  { label: "Transactions", href: "/dashboard/transactions", icon: FileText },
  { label: "Swap\nCrypto", href: "/dashboard/swap-crypto", icon: MessageSquare },
  { label: "Purchase\nStock", href: "/dashboard/purchase-stock", icon: ShoppingCart },
  { label: "Referrals", href: "/dashboard/referrals", icon: Users },
  { label: "Profile", href: "/dashboard/profile", icon: UserCircle },
];

export default function DashboardSidebar() {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);

  const SidebarContent = ({ onLinkClick }: { onLinkClick?: () => void }) => (
    <div className="grid grid-cols-2 lg:grid-cols-1 gap-x-4 gap-y-8 lg:gap-y-2 p-4">
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
            className={`flex flex-col lg:flex-row items-center gap-2 lg:gap-3 py-4 lg:py-3 px-2 lg:px-4 rounded-xl transition-all duration-200 ${
              isActive
                ? "bg-white/5 border border-white/10 lg:border-none lg:bg-[#22c55e]/10 lg:text-[#22c55e]"
                : "hover:bg-white/5 text-gray-400"
            }`}>
            <Icon size={22} className={isActive ? "text-white lg:text-[#22c55e]" : ""} />
            <span
              className={`text-xs lg:text-sm text-center lg:text-left leading-tight whitespace-pre-line ${
                isActive ? "text-white lg:text-[#22c55e] font-medium" : ""
              }`}>
              {link.label}
            </span>
          </Link>
        );
      })}
    </div>
  );

  return (
    <>
      {/* Mobile Trigger - Absolutely positioned relative to header height */}
      <button
        onClick={() => setMobileOpen(!mobileOpen)}
        className="lg:hidden fixed top-4 right-4 z-[60] text-white p-1"
        aria-label="Toggle menu">
        {mobileOpen ? <X size={22} /> : <Menu size={22} />}
      </button>

      {/* Sidebar - Desktop */}
      <aside className="hidden lg:block w-[280px] shrink-0 min-h-[calc(100vh-64px)] sticky top-16 self-start overflow-y-auto py-4 border-r border-white/5">
        <SidebarContent />
      </aside>

      {/* Mobile Sidebar Overlay */}
      {mobileOpen && (
        <div
          className="lg:hidden fixed inset-0 z-40 bg-black/60 top-0"
          onClick={() => setMobileOpen(false)}
        />
      )}

      {/* Mobile Sidebar */}
      <aside
        className={`lg:hidden fixed left-0 top-0 z-50 w-[80%] max-w-[300px] bg-[#0e1512] h-full transform transition-transform duration-300 overflow-y-auto ${
          mobileOpen ? "translate-x-0" : "-translate-x-full"
        }`}>
        <div className="p-6 border-b border-white/5">
           <span className="text-xl font-bold text-[#22c55e]">INFINITY</span>
        </div>
        <SidebarContent onLinkClick={() => setMobileOpen(false)} />
      </aside>
    </>
  );
}
