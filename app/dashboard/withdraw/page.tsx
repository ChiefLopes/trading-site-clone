"use client";

import React, { useState } from "react";
import GoogleTranslate from "@/components/GoogleTranslate";
import Image from "next/image";
import { Mail } from "lucide-react";

const withdrawalMethods = [
  {
    id: 1,
    name: "USDT ERC20",
    walletLabel: "USDT ERC20",
    minAmount: "$50",
    maxAmount: "$10,000,000",
    chargeType: "fixed",
    chargeTypeColor: "text-[#22c55e]",
    chargesAmount: "$5",
    duration: "Instant deposit",
  },
  {
    id: 2,
    name: "USDT TRC20",
    walletLabel: "USDT TRC20",
    minAmount: "$50",
    maxAmount: "$10,000,000",
    chargeType: "0",
    chargeTypeColor: "text-[#f59e0b]",
    chargesAmount: "$0",
    duration: "Instant",
  },
  {
    id: 3,
    name: "ETHEREUM",
    walletLabel: "ETHEREUM",
    minAmount: "$50",
    maxAmount: "$10,000,000",
    chargeType: "percentage",
    chargeTypeColor: "text-[#ef4444]",
    chargesAmount: "0%",
    duration: "Instant",
  },
  {
    id: 4,
    name: "BITCOIN",
    walletLabel: "BITCOIN",
    minAmount: "$50",
    maxAmount: "$10,000,000",
    chargeType: "percentage",
    chargeTypeColor: "text-[#22c55e]",
    chargesAmount: "0%",
    duration: "Instant",
  },
];

export default function WithdrawPage() {
  const [selectedMethod, setSelectedMethod] = useState<
    (typeof withdrawalMethods)[0] | null
  >(null);
  const [amount, setAmount] = useState("");
  const [otp, setOtp] = useState("");
  const [walletAddress, setWalletAddress] = useState("");

  // Withdrawal Details Form
  if (selectedMethod) {
    return (
      <div className="min-h-[calc(100vh-64px)] flex flex-col">
        <div className="flex-1">
          {/* Page Title */}
          <div className="flex items-center gap-4 mb-6">
            <button
              onClick={() => setSelectedMethod(null)}
              className="px-4 py-2 border border-white/20 rounded-lg text-sm text-white hover:bg-white/5 transition-colors">
              &larr; Back
            </button>
            <h1 className="text-2xl md:text-3xl font-semibold text-[#22c55e]">
              Withdrawal Details
            </h1>
          </div>

          {/* Form Card */}
          <div className="border border-white/10 rounded-lg p-6 md:p-8 max-w-3xl">
            <div className="bg-[#1a1a1a] rounded-lg p-6 md:p-8">
              {/* Payment Method Badge */}
              <div className="mb-8">
                <div className="inline-flex items-center border border-[#22c55e]/40 rounded-full overflow-hidden">
                  <span className="bg-[#22c55e] text-white text-sm font-medium px-4 py-2">
                    Your payment method
                  </span>
                  <span className="text-white text-sm px-4 py-2 flex items-center gap-2">
                    {selectedMethod.name}
                    <span className="text-gray-400">&gt;</span>
                  </span>
                </div>
              </div>

              {/* Enter Amount */}
              <div className="mb-6">
                <label className="block text-sm text-gray-400 mb-2">
                  Enter Amount to withdraw($)
                </label>
                <input
                  type="number"
                  placeholder="Enter Amount"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  className="w-full px-4 py-3 rounded-lg bg-transparent border border-white/20 text-sm text-white placeholder-gray-500 outline-none focus:border-white/40 transition-colors"
                />
              </div>

              {/* Enter OTP */}
              <div className="mb-2">
                <div className="flex items-center justify-between mb-2">
                  <label className="text-sm font-bold text-white">
                    Enter OTP
                  </label>
                  <button className="flex items-center gap-2 px-4 py-2 border border-white/20 rounded-lg text-sm text-white hover:bg-white/5 transition-colors">
                    <Mail size={14} />
                    Request OTP
                  </button>
                </div>
                <input
                  type="text"
                  placeholder="Enter OTP"
                  value={otp}
                  onChange={(e) => setOtp(e.target.value)}
                  className="w-full px-4 py-3 rounded-lg bg-transparent border border-white/20 text-sm text-white placeholder-gray-500 outline-none focus:border-white/40 transition-colors"
                />
                <p className="text-xs text-[#22c55e] mt-2">
                  OTP will be sent to your email when you request
                </p>
              </div>

              {/* Wallet Address */}
              <div className="mt-6 mb-2">
                <label className="block text-base font-bold text-white mb-2">
                  Enter {selectedMethod.walletLabel} Address
                </label>
                <input
                  type="text"
                  placeholder={`Enter ${selectedMethod.walletLabel} Address`}
                  value={walletAddress}
                  onChange={(e) => setWalletAddress(e.target.value)}
                  className="w-full px-4 py-3 rounded-lg bg-transparent border border-white/20 text-sm text-white placeholder-gray-500 outline-none focus:border-white/40 transition-colors"
                />
                <p className="text-xs text-[#22c55e] mt-2">
                  {selectedMethod.walletLabel} is not a default withdrawal
                  option in your account, please enter the correct wallet
                  address to recieve your funds.
                </p>
              </div>

              {/* Complete Request Button */}
              <div className="mt-8">
                <button className="px-8 py-3 bg-white text-black font-semibold text-sm rounded-lg hover:bg-gray-200 transition-colors">
                  Complete Request
                </button>
              </div>
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

  // Withdrawal Methods Grid
  return (
    <div className="min-h-[calc(100vh-64px)] flex flex-col">
      <div className="flex-1">
        {/* Page Title */}
        <h1 className="text-2xl md:text-3xl font-semibold text-[#22c55e] mb-6">
          Place a withdrawal request
        </h1>

        {/* Withdrawal Methods Grid */}
        <div className="border border-white/10 rounded-lg p-6 md:p-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {withdrawalMethods.map((method) => (
              <div
                key={method.id}
                className="bg-[#111111] border border-white/10 rounded-xl p-6 flex flex-col items-center text-center">
                {/* Top bar placeholder */}
                <div className="w-32 md:w-36 h-8 bg-white rounded mb-8" />

                {/* Icon */}
                <div className="relative w-24 h-24 mb-6">
                  <div className="w-24 h-24 rounded-full bg-[#e8e4d4] flex items-center justify-center overflow-hidden">
                    <Image src={"/withdraw.webp"} alt="" fill />
                  </div>
                </div>

                {/* Divider */}
                <div className="w-full border-t border-white/10 mb-6" />

                {/* Details */}
                <div className="space-y-5 w-full">
                  <div>
                    <p className="text-sm text-gray-400">
                      Minimum withdrawable amount
                    </p>
                    <p className="text-xl font-bold text-white">
                      {method.minAmount}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-400">
                      Maximum withdrawable amount
                    </p>
                    <p className="text-xl font-bold text-white">
                      {method.maxAmount}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-white">
                      Charge Type:{" "}
                      <span className="font-bold">{method.chargeType}</span>
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-white">
                      Charges Amount:{" "}
                      <span className="font-bold">{method.chargesAmount}</span>
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-white">
                      Duration:{" "}
                      <span className="font-bold">{method.duration}</span>
                    </p>
                  </div>
                </div>

                {/* Request Button */}
                <button
                  onClick={() => setSelectedMethod(method)}
                  className="mt-8 px-8 py-2.5 border border-white/20 rounded-lg text-sm text-white hover:bg-white/15 active:bg-white/25 transition-colors flex items-center gap-2">
                  <span className="text-[#22c55e] font-bold">+</span> Request
                  withdrawal
                </button>
              </div>
            ))}
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
