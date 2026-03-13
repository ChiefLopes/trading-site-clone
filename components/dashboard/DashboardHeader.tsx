"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { UserCircle, Bell, Shield, Layers, Menu, X } from "lucide-react";
import { signOut } from "next-auth/react";

interface DashboardHeaderProps {
  user: {
    name?: string | null;
    email?: string | null;
    image?: string | null;
  } | null;
}

export default function DashboardHeader({ user }: DashboardHeaderProps) {
  const [kycOpen, setKycOpen] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-[#0a0f0d] border-b border-[#22c55e]/30 h-16 flex items-center justify-between px-4 md:px-8">
      <div className="flex items-center gap-3">
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

      <div className="flex items-center gap-3 md:gap-4">
        {/* Mobile menu button could be toggled here if we link it to a state provider, 
            but for now we'll keep it simple or implement a sidebar toggle */}
        
        <button className="text-white hover:text-gray-300 transition-colors hidden xs:block">
          <Bell size={18} />
        </button>

        <div className="relative">
          <button
            onClick={() => setKycOpen(!kycOpen)}
            className="flex items-center gap-1.5 text-gray-300 text-xs hover:text-white transition-colors group">
            <Layers
              size={14}
              className={kycOpen ? "text-white" : "text-[#22c55e] transition-colors"}
            />
            <span className="hidden sm:inline">KYC</span>
          </button>

          {kycOpen && (
            <>
              <div
                className="fixed inset-0 z-50"
                onClick={() => setKycOpen(false)}
              />
              <div className="absolute top-[calc(100%+12px)] right-[-40px] md:right-0 w-72 bg-[#111916] border border-white/10 rounded-xl p-6 shadow-2xl z-[60] animate-in fade-in zoom-in duration-200">
                <div className="absolute -top-[7px] right-[46px] md:right-6 w-3 h-3 bg-[#111916] border-l border-t border-white/10 rotate-45" />
                <h3 className="text-lg font-semibold text-white mb-6">
                  KYC Verification
                </h3>
                <Link
                  href="/dashboard/profile?tab=kyc"
                  onClick={() => setKycOpen(false)}
                  className="block w-full py-3.5 bg-white text-black font-bold text-center rounded-lg hover:bg-gray-100 transition-colors text-sm">
                  Verify Account
                </Link>
              </div>
            </>
          )}
        </div>

        <Link
          href="/dashboard/profile"
          className="flex items-center gap-2 bg-white/5 hover:bg-white/10 rounded-full pl-1 pr-3 py-1 transition-colors">
          <div className="w-7 h-7 rounded-full bg-[#1a2420] border border-white/10 flex items-center justify-center overflow-hidden">
            {user?.image ? (
              <img src={user.image} alt="" className="w-full h-full object-cover" />
            ) : (
              <UserCircle size={18} className="text-[#22c55e]" />
            )}
          </div>
          <span className="text-sm text-white hidden md:inline">
            {user?.name || user?.email || "User"}
          </span>
        </Link>

        <button
          className="bg-[#dc2626] hover:bg-[#b91c1c] text-white font-semibold text-xs rounded-full px-4 py-2 ml-2 transition-colors"
          onClick={() => signOut({ callbackUrl: "/login" })}>
          Logout
        </button>
      </div>
    </header>
  );
}
