"use client";

import React from "react";
import { Copy } from "lucide-react";

export default function ReferralLink({ username }: { username: string }) {
  const link = `https://infinitydigitaltrade.com/ref/${username || 'User'}`;
  
  const handleCopy = () => {
    navigator.clipboard.writeText(link);
    // You could add a toast here
  };

  return (
    <div className="flex items-center gap-2 bg-[#111916] border border-white/10 rounded-xl px-4 py-3">
      <p className="flex-1 text-sm text-white truncate">
        {link}
      </p>
      <button
        onClick={handleCopy}
        className="shrink-0 p-2 text-gray-400 hover:text-white transition-colors"
        aria-label="Copy referral link">
        <Copy size={16} />
      </button>
    </div>
  );
}
