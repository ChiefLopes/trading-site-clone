"use client";

import React, { useState } from "react";

const plans = [
  {
    name: "TESLA, INC - Diamond",
    color: "text-red-500",
    min: "$40000",
    max: "$40000",
    duration: "30 Days",
  },
  {
    name: "TESLA, INC - Gold",
    color: "text-yellow-500",
    min: "$15000",
    max: "$15000",
    duration: "1 Months",
  },
  {
    name: "TESLA, INC - Silver",
    color: "text-blue-400",
    min: "$6000",
    max: "$6000",
    duration: "7 Days",
  },
];

export default function PackagesPage() {
  const [amounts, setAmounts] = useState<Record<string, string>>(
    Object.fromEntries(plans.map((p) => [p.name, "$0"])),
  );

  return (
    <div>
      <h1 className="text-2xl font-bold text-[#22c55e] mb-6">
        Investment Plans
      </h1>

      {/* Invest in a Plan card */}
      <div className="bg-[#141c18] border border-white/5 rounded-2xl p-6 md:p-8 mb-6">
        <h2 className="text-lg font-semibold text-white mb-1">
          Invest in a Plan
        </h2>
        <p className="text-sm text-gray-400 mb-6">
          Make your money work for you and earn profits by investing in our
          world-class auto-trading packages.
        </p>

        {/* Account Balance */}
        <div className="bg-[#0e1512] border border-white/10 rounded-xl px-5 py-4 mb-8">
          <p className="text-[10px] uppercase tracking-wider text-gray-400 mb-0.5">
            Account Balance
          </p>
          <p className="text-lg font-bold text-white">$0</p>
        </div>

        {/* Plan Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {plans.map((plan) => (
            <div
              key={plan.name}
              className="bg-[#0e1512] border border-white/5 rounded-xl p-6 flex flex-col">
              {/* Tesla Icon + Name */}
              <div className="flex flex-col items-center mb-5">
                <div className="w-10 h-10 rounded-full bg-red-600 flex items-center justify-center mb-3">
                  <span className="text-white font-bold text-sm">T</span>
                </div>
                <h3
                  className={`text-sm font-semibold text-center ${plan.color}`}>
                  {plan.name}
                </h3>
              </div>

              <hr className="border-white/5 mb-5" />

              {/* Details */}
              <div className="space-y-4 text-center flex-1">
                <div>
                  <p className="text-[11px] text-gray-400 italic">
                    Minimum Amount:
                  </p>
                  <p className="text-lg font-bold text-white">{plan.min}</p>
                </div>
                <div>
                  <p className="text-[11px] text-gray-400 italic">
                    Maximum Amount:
                  </p>
                  <p className="text-lg font-bold text-white">{plan.max}</p>
                </div>
                <div>
                  <p className="text-[11px] text-gray-400 italic">Duration:</p>
                  <p className="text-lg font-bold text-white">
                    {plan.duration}
                  </p>
                </div>
              </div>

              {/* Amount Input + Invest Button */}
              <div className="mt-5 space-y-3">
                <p className="text-xs text-gray-400 text-center">
                  Amount to invest
                </p>
                <input
                  type="text"
                  value={amounts[plan.name]}
                  onChange={(e) =>
                    setAmounts({ ...amounts, [plan.name]: e.target.value })
                  }
                  className="w-full px-4 py-2.5 rounded-lg bg-[#1a2420] border border-white/10 text-sm text-white outline-none focus:border-[#22c55e]/50 transition-colors text-center"
                />
                <button className="w-full py-2.5 rounded-lg border border-white/10 text-white text-sm font-semibold hover:bg-white/5 transition-colors">
                  Invest
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
