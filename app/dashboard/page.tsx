import React from "react";
import Link from "next/link";
import { auth } from "@/auth";
import { ArrowRight } from "lucide-react";
import { FaCoins, FaSackDollar } from "react-icons/fa6";
import { BsGiftFill } from "react-icons/bs";
import SproutIcon from "@/app/assets/svg";
import { MiniChart, SymbolOverview, MarketNews } from "@/components/dashboard/MarketWidgets";
import ReferralLink from "@/components/dashboard/ReferralLink";

export default async function DashboardHome() {
  const session = await auth();
  const userName = session?.user?.name || session?.user?.email?.split('@')[0] || "User";

  return (
    <div className="space-y-6">
      {/* Welcome */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <h1 className="text-2xl md:text-3xl font-semibold text-white">
          Welcome, {userName}
        </h1>
        <div className="text-sm text-gray-500 bg-white/5 px-4 py-2 rounded-lg border border-white/5">
          Real-time Market Status: <span className="text-[#22c55e] font-medium">Active</span>
        </div>
      </div>

      {/* Account Balance Section */}
      <div className="bg-[#141c18] border border-white/5 rounded-2xl p-6 md:p-8">
        <p className="text-xs uppercase tracking-wider text-gray-400 mb-1">
          Account Balance
        </p>
        <p className="text-3xl md:text-4xl font-bold text-white mb-1">$0.00</p>
        <p className="text-sm text-gray-400">
          <span className="text-[#22c55e]">↑ Up by $0.00</span> since you began
          investing
        </p>

        {/* Stats grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
          {/* TradingView Mini Chart (Client Component) */}
          <div className="bg-[#111916] border border-white/5 rounded-2xl overflow-hidden h-[300px] md:col-span-1 shadow-inner">
             <MiniChart />
          </div>

          {/* Stat Cards - 2x2 grid */}
          <div className="md:col-span-2 grid grid-cols-1 sm:grid-cols-2 gap-4">
            {[
              { label: "TOTAL DEPOSIT", value: "$0.00", icon: FaSackDollar },
              { label: "TOTAL PROFIT", value: "$0.00", icon: SproutIcon },
              { label: "REFERRAL BONUS", value: "$0.00", icon: BsGiftFill },
              { label: "WITHDRAWALS", value: "$0.00", icon: FaCoins },
            ].map((stat) => {
              const Icon = stat.icon;
              return (
                <div
                  key={stat.label}
                  className="bg-gradient-to-br from-[#1a2420] to-[#0e1512] border border-white/10 rounded-2xl flex items-center justify-between shadow-xl group hover:border-[#22c55e]/30 transition-all duration-300">
                  <div className="p-6">
                    <p className="text-2xl font-bold text-white group-hover:scale-105 transition-transform origin-left">
                      {stat.value}
                    </p>
                    <p className="text-[10px] uppercase tracking-[0.2em] text-[#22c55e] mt-2 font-black">
                      {stat.label}
                    </p>
                  </div>
                  <div className="bg-white/5 h-full w-20 flex items-center justify-center border-l border-white/5 group-hover:bg-[#22c55e]/5 transition-colors">
                    <Icon size={28} className="text-white/40 group-hover:text-[#22c55e] transition-colors" />
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Market Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-[#141c18] border border-white/5 rounded-2xl p-6 h-[500px] flex flex-col">
          <h2 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-[#22c55e] animate-pulse" />
            Market Overview
          </h2>
          <div className="flex-1 rounded-xl overflow-hidden border border-white/5">
            <SymbolOverview />
          </div>
        </div>

        <div className="bg-[#141c18] border border-white/5 rounded-2xl p-6 h-[500px] flex flex-col">
          <h2 className="text-lg font-semibold text-white mb-4">Latest Market News</h2>
          <div className="flex-1 rounded-xl overflow-hidden border border-white/5">
            <MarketNews />
          </div>
        </div>
      </div>

      {/* Active Investments */}
      <div className="bg-[#141c18] border border-white/5 rounded-2xl p-6 md:p-8">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-lg font-semibold text-white">Active Investments</h2>
          <Link href="/dashboard/packages" className="text-[#22c55e] text-sm hover:underline">View All</Link>
        </div>
        <div className="border border-white/5 rounded-2xl p-10 text-center bg-[#0a0f0d]/50 backdrop-blur-sm border-dashed">
          <div className="w-16 h-16 bg-white/5 rounded-full flex items-center justify-center mx-auto mb-4 border border-white/10">
            <FaCoins size={24} className="text-gray-500" />
          </div>
          <p className="text-sm text-gray-400 mb-6 max-w-xs mx-auto">
            Your portfolio is currently empty. Start your investment journey today.
          </p>
          <Link
            href="/dashboard/packages"
            className="inline-flex items-center gap-2 px-8 py-3.5 bg-white text-black text-sm font-bold rounded-xl hover:bg-gray-200 transition-all hover:scale-[1.02] active:scale-[0.98]">
            Get Started
            <ArrowRight size={18} />
          </Link>
        </div>
      </div>

      {/* Refer Us & Earn */}
      <div className="bg-gradient-to-br from-[#141c18] to-[#0a0f0d] border border-[#22c55e]/20 rounded-2xl p-6 md:p-8">
        <h2 className="text-xl font-bold text-white mb-2">Refer Us & Earn</h2>
        <p className="text-sm text-gray-400 mb-6">
          Invite your friends to Infinity Digital Trade and earn up to 10% on their initial deposit.
        </p>
        <ReferralLink username={userName} />
      </div>
    </div>
  );
}
