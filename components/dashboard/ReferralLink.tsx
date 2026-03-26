"use client";

import React, { useState } from "react";
import { Copy, Check } from "lucide-react";
import { toast } from "sonner";

export default function ReferralLink({ username }: { username: string }) {
  const link = `https://trading-site-clone.vercel.app/ref/${username || "User"}`;
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(link);
    setCopied(true);
    toast.success("Referral link copied!");
    setTimeout(() => setCopied(false), 1500);
  };

  return (
    <div className="flex items-center gap-2 bg-[#111916] border border-white/10 rounded-xl px-4 py-3">
      <p className="flex-1 text-sm text-white truncate">{link}</p>
      <button
        onClick={handleCopy}
        className="shrink-0 p-2 text-gray-400 hover:text-green-300 transition-colors"
        aria-label="Copy referral link">
        {copied ? (
          <Check size={16} className="text-green-400 transition-colors" />
        ) : (
          <Copy size={16} className="hover:text-green-400 transition-colors duration-200 ease-linear"/>
        )}
      </button>
    </div>
  );
}
