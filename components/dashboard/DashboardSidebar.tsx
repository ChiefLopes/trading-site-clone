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
  ChevronLeft,
  ChevronRight,
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
  const [isExpanded, setIsExpanded] = useState(true);

  const SidebarContent = ({ onLinkClick, isDesktopExpanded = true }: { onLinkClick?: () => void, isDesktopExpanded?: boolean }) => (
    <div className={`grid grid-cols-2 lg:grid-cols-1 gap-x-4 gap-y-8 lg:gap-y-2 p-4 ${!isDesktopExpanded ? 'lg:flex lg:flex-col lg:items-center' : ''}`}>
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
            title={!isDesktopExpanded ? link.label.replace('\n', ' ') : undefined}
            className={`flex flex-col lg:flex-row items-center gap-2 lg:gap-3 py-4 lg:py-3 px-2 rounded-xl transition-all duration-200 ${
              isDesktopExpanded ? 'lg:px-4 lg:w-full lg:min-w-max lg:justify-start' : 'lg:p-3 lg:w-12 lg:h-12 lg:justify-center'
            } ${
              isActive
                ? "bg-white/5 border border-white/10 lg:border-none lg:bg-[#22c55e]/10 lg:text-[#22c55e]"
                : "hover:bg-white/5 text-gray-400 lg:hover:text-white"
            }`}>
            <Icon size={isDesktopExpanded ? 22 : 24} className={`shrink-0 ${isActive ? "text-white lg:text-[#22c55e]" : ""}`} />
            <span
              className={`text-xs lg:text-sm text-center lg:text-left leading-tight whitespace-pre-line ${
                isActive ? "text-white lg:text-[#22c55e] font-medium" : ""
              } ${!isDesktopExpanded ? 'lg:hidden' : 'lg:block'}`}>
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
        className="lg:hidden fixed top-[16px] right-4 z-[70] text-white hover:text-[#22c55e] transition-colors flex items-center justify-center p-1"
        aria-label="Toggle menu">
        {mobileOpen ? <X size={24} /> : <Menu size={24} />}
      </button>

      {/* Sidebar - Desktop */}
      <div className={`hidden lg:block relative shrink-0 min-h-[calc(100vh-64px)] sticky top-16 self-start transition-all duration-300 border-r border-white/5 bg-[#0a0f0d] z-20 ${isExpanded ? 'w-[280px]' : 'w-[80px]'}`}>
        <button 
          onClick={() => setIsExpanded(!isExpanded)}
          className="absolute -right-3.5 top-6 bg-[#141c18] border border-white/10 hover:border-white/30 rounded-full p-1.5 text-gray-400 hover:text-white z-50 flex items-center justify-center transition-all shadow-md"
        >
          {isExpanded ? <ChevronLeft size={16} /> : <ChevronRight size={16} />}
        </button>
        <aside className="w-full h-[calc(100vh-64px)] overflow-y-auto py-4 flex flex-col no-scrollbar overflow-x-hidden">
          <SidebarContent isDesktopExpanded={isExpanded} />
        </aside>
      </div>

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
