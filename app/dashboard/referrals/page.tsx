import { Copy } from "lucide-react";

export default function ReferralsPage() {
  return (
    <div>
      <h1 className="text-2xl font-bold text-white mb-2">Referrals</h1>
      <p className="text-gray-400 text-sm mb-8">
        Invite friends and earn rewards
      </p>

      {/* Referral Link */}
      <div className="bg-[#111916] border border-white/5 rounded-xl p-6 mb-6 max-w-lg">
        <p className="text-sm text-gray-400 mb-3">Your Referral Link</p>
        <div className="flex items-center gap-2">
          <div className="flex-1 px-4 py-2.5 rounded-lg bg-[#1a2420] border border-white/10 text-sm text-white truncate">
            https://infinitydigitaltrade.com/register?ref=USER123
          </div>
          <button className="p-2.5 rounded-lg bg-[#7b6ef6] hover:bg-[#6a5de6] text-white transition-colors">
            <Copy size={16} />
          </button>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8 max-w-lg">
        {[
          { label: "Total Referrals", value: "0" },
          { label: "Active Referrals", value: "0" },
          { label: "Earnings", value: "$0.00" },
        ].map((s) => (
          <div
            key={s.label}
            className="bg-[#111916] border border-white/5 rounded-xl p-5">
            <p className="text-xs text-gray-400 mb-1">{s.label}</p>
            <p className="text-lg font-bold text-white">{s.value}</p>
          </div>
        ))}
      </div>

      {/* Referral List */}
      <div className="bg-[#111916] border border-white/5 rounded-xl overflow-hidden max-w-lg">
        <div className="grid grid-cols-3 gap-4 px-6 py-3 border-b border-white/5 text-xs font-semibold text-gray-400 uppercase">
          <span>Username</span>
          <span>Status</span>
          <span>Date Joined</span>
        </div>
        <div className="px-6 py-12 text-center">
          <p className="text-sm text-gray-500">No referrals yet.</p>
        </div>
      </div>
    </div>
  );
}
