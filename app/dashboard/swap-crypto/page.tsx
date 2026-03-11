"use client";

import React, { useState } from "react";

export default function SwapCryptoPage() {
  const [fromCoin, setFromCoin] = useState("btc");
  const [toCoin, setToCoin] = useState("eth");
  const [amount, setAmount] = useState("");

  return (
    <div>
      <h1 className="text-2xl font-bold text-white mb-2">Swap Crypto</h1>
      <p className="text-gray-400 text-sm mb-8">
        Exchange between cryptocurrencies
      </p>

      <div className="max-w-md">
        <div className="bg-[#111916] border border-white/5 rounded-xl p-6 space-y-5">
          <div>
            <label className="block text-sm font-medium text-white mb-1.5">
              From
            </label>
            <select
              value={fromCoin}
              onChange={(e) => setFromCoin(e.target.value)}
              className="w-full px-4 py-2.5 rounded-lg bg-[#1a2420] border border-white/10 text-sm text-white outline-none focus:border-[#7b6ef6]/50 transition-colors">
              <option value="btc">Bitcoin (BTC)</option>
              <option value="eth">Ethereum (ETH)</option>
              <option value="usdt">USDT</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-white mb-1.5">
              Amount
            </label>
            <input
              type="number"
              placeholder="Enter amount"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              className="w-full px-4 py-2.5 rounded-lg bg-[#1a2420] border border-white/10 text-sm text-white placeholder-gray-500 outline-none focus:border-[#7b6ef6]/50 transition-colors"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-white mb-1.5">
              To
            </label>
            <select
              value={toCoin}
              onChange={(e) => setToCoin(e.target.value)}
              className="w-full px-4 py-2.5 rounded-lg bg-[#1a2420] border border-white/10 text-sm text-white outline-none focus:border-[#7b6ef6]/50 transition-colors">
              <option value="btc">Bitcoin (BTC)</option>
              <option value="eth">Ethereum (ETH)</option>
              <option value="usdt">USDT</option>
            </select>
          </div>

          <button className="w-full py-3 rounded-lg bg-[#7b6ef6] hover:bg-[#6a5de6] text-white font-semibold text-sm transition-colors">
            Swap Now
          </button>
        </div>
      </div>
    </div>
  );
}
