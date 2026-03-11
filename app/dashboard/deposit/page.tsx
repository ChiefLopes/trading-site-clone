"use client";

import React, { useState } from "react";
import GoogleTranslate from "@/components/GoogleTranslate";

const paymentMethods = [
  { id: "usdt_erc20", label: "USDT ERC20" },
  { id: "usdt_trc20", label: "USDT TRC20" },
  { id: "ethereum", label: "ETHEREUM" },
  { id: "bitcoin", label: "BITCOIN" },
];

export default function DepositPage() {
  const [amount, setAmount] = useState("");
  const [selectedMethod, setSelectedMethod] = useState("");

  return (
    <div className="min-h-[calc(100vh-64px)] flex flex-col">
      <div className="flex-1">
        {/* Page Title */}
        <h1 className="text-2xl md:text-3xl font-semibold text-[#22c55e] mb-6">
          Fund your account balance
        </h1>

        {/* Main Card */}
        <div className="border border-white/10 rounded-lg p-6 md:p-8">
          <div className="flex flex-col lg:flex-row gap-6">
            {/* Left: Amount Input */}
            <div className="flex-1">
              <h2 className="text-lg font-bold text-white mb-4">
                Enter Amount
              </h2>
              <input
                type="number"
                placeholder="Enter Amount"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                className="w-full px-4 py-3 rounded-lg bg-transparent border border-white/20 text-sm text-[#22c55e] placeholder-[#22c55e]/60 outline-none focus:border-white/40 transition-colors"
              />
            </div>

            {/* Right: Total Deposit Box */}
            <div className="lg:w-[280px] border border-white/10 rounded-lg p-5">
              <div className="flex justify-between items-start mb-1">
                <span className="text-sm font-semibold text-white">
                  Total Deposit
                </span>
                <span className="text-sm font-semibold text-white">$0.00</span>
              </div>
              <div className="flex justify-between items-center mb-6">
                <span className="text-sm text-gray-400">-</span>
                <span className="text-sm text-gray-400">Amount</span>
              </div>
              <div className="border-t border-white/10 pt-4">
                <button className="text-sm text-gray-400 hover:text-white transition-colors">
                  View deposit history
                </button>
              </div>
            </div>
          </div>

          {/* Payment Methods */}
          <div className="mt-8">
            <h2 className="text-lg font-bold text-white mb-6">
              Choose Payment Method from the list below
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-2xl">
              {paymentMethods.map((method) => (
                <label
                  key={method.id}
                  className="flex items-center justify-between cursor-pointer group">
                  <span className="text-sm text-gray-300 group-hover:text-white transition-colors">
                    {method.label}
                  </span>
                  <input
                    type="radio"
                    name="paymentMethod"
                    value={method.id}
                    checked={selectedMethod === method.id}
                    onChange={(e) => setSelectedMethod(e.target.value)}
                    className="w-4 h-4 accent-white bg-transparent border-2 border-white/30 rounded-sm cursor-pointer"
                  />
                </label>
              ))}
            </div>
          </div>

          {/* Submit Button */}
          <div className="mt-8">
            <button className="px-8 py-3 rounded-lg bg-white text-black font-semibold text-sm hover:bg-gray-200 transition-colors">
              Procced to Payment
            </button>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="mt-12 py-6 flex flex-col sm:flex-row items-center justify-between gap-4">
        <p className="text-sm text-[#22c55e]/70 italic">
          All Rights Reserved © Infinity Digital Trade 2026
        </p>
        <GoogleTranslate />
      </div>
    </div>
  );
}
