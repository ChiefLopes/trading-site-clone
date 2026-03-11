"use client";

import React, { useState } from "react";

export default function PurchaseStockPage() {
  const [symbol, setSymbol] = useState("");
  const [amount, setAmount] = useState("");

  return (
    <div>
      <h1 className="text-2xl font-bold text-white mb-2">Purchase Stock</h1>
      <p className="text-gray-400 text-sm mb-8">Buy stocks and equities</p>

      <div className="max-w-md">
        <div className="bg-[#111916] border border-white/5 rounded-xl p-6 space-y-5">
          <div>
            <label className="block text-sm font-medium text-white mb-1.5">
              Stock Symbol
            </label>
            <input
              type="text"
              placeholder="e.g. TSLA, AAPL, NVDA"
              value={symbol}
              onChange={(e) => setSymbol(e.target.value)}
              className="w-full px-4 py-2.5 rounded-lg bg-[#1a2420] border border-white/10 text-sm text-white placeholder-gray-500 outline-none focus:border-[#7b6ef6]/50 transition-colors"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-white mb-1.5">
              Amount (USD)
            </label>
            <input
              type="number"
              placeholder="Enter amount"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              className="w-full px-4 py-2.5 rounded-lg bg-[#1a2420] border border-white/10 text-sm text-white placeholder-gray-500 outline-none focus:border-[#7b6ef6]/50 transition-colors"
            />
          </div>

          <button className="w-full py-3 rounded-lg bg-[#3b82f6] hover:bg-[#2563eb] text-white font-semibold text-sm transition-colors">
            Purchase
          </button>
        </div>
      </div>
    </div>
  );
}
