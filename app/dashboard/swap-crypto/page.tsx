"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";

const balances = [
  { symbol: "Account Balance", value: "$0.00", color: "" },
  { symbol: "BTC", value: "0", color: "text-orange-400", dot: "bg-orange-400" },
  { symbol: "ETH", value: "0", color: "text-blue-400", dot: "bg-blue-400" },
  { symbol: "LTC", value: "0", color: "text-orange-300", dot: "bg-orange-300" },
  { symbol: "LINK", value: "0", color: "text-blue-500", dot: "bg-blue-500" },
  { symbol: "BNB", value: "0", color: "text-yellow-400", dot: "bg-yellow-400" },
  { symbol: "ADA", value: "0", color: "text-blue-300", dot: "bg-blue-300" },
  {
    symbol: "AAVE",
    value: "0",
    color: "text-purple-400",
    dot: "bg-purple-400",
  },
  {
    symbol: "USDT",
    value: "0",
    color: "text-teal-400",
    dot: "bg-teal-400",
    sub: "$0",
  },
  { symbol: "BCH", value: "0", color: "text-gray-400", dot: "bg-gray-400" },
  { symbol: "XRP", value: "0", color: "text-blue-300", dot: "bg-blue-300" },
  { symbol: "XLM", value: "0", color: "text-gray-300", dot: "bg-gray-300" },
];

const cryptoOptions = [
  { value: "BTC", label: "BTC" },
  { value: "ETH", label: "ETH" },
  { value: "LTC", label: "LTC" },
  { value: "LINK", label: "LINK" },
  { value: "BNB", label: "BNB" },
  { value: "ADA", label: "ADA" },
  { value: "AAVE", label: "AAVE" },
  { value: "USDT", label: "USDT" },
  { value: "BCH", label: "BCH" },
  { value: "XRP", label: "XRP" },
  { value: "XLM", label: "XLM" },
];

const destOptions = [{ value: "USD", label: "USD" }, ...cryptoOptions];

export default function SwapCryptoPage() {
  const [source, setSource] = useState("BTC");
  const [destination, setDestination] = useState("USD");
  const [amount, setAmount] = useState("");
  const chartRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (chartRef.current && !chartRef.current.querySelector("script")) {
      const script = document.createElement("script");
      script.src =
        "https://s3.tradingview.com/external-embedding/embed-widget-advanced-chart.js";
      script.async = true;
      script.textContent = JSON.stringify({
        autosize: true,
        symbol: "COINBASE:BTCUSD",
        interval: "1",
        timezone: "Etc/UTC",
        theme: "dark",
        style: "1",
        locale: "en",
        allow_symbol_change: true,
        support_host: "https://www.tradingview.com",
        backgroundColor: "rgba(0, 0, 0, 0)",
        hide_top_toolbar: false,
        hide_legend: false,
        save_image: false,
        calendar: false,
        hide_volume: false,
        width: "100%",
        height: "100%",
      });
      chartRef.current.appendChild(script);
    }
  }, []);

  return (
    <div>
      {/* Page Title */}
      <h1 className="text-2xl md:text-3xl font-semibold text-white mb-6">
        Swap Crypto
      </h1>

      {/* Main Card */}
      <div className="border border-white/10 rounded-lg p-5 md:p-6">
        {/* Header row */}
        <div className="flex items-start justify-between mb-5">
          <p className="text-sm text-[#22c55e]">
            Earn even more when you swap your Account balance to and from
            crypto.
          </p>
          <Link
            href="/dashboard/transactions"
            className="shrink-0 ml-4 px-4 py-1.5 border border-white/20 rounded text-sm text-white hover:bg-white/5 transition-colors">
            Transactions
          </Link>
        </div>

        {/* Balance Cards Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-6">
          {balances.map((b, i) => (
            <div
              key={i}
              className="border border-white/10 rounded-lg px-4 py-3">
              <div className="flex items-center gap-2">
                {b.dot && <span className={`w-3 h-3 rounded-full ${b.dot}`} />}
                <span className="text-sm text-white font-medium">
                  {b.value} {b.symbol !== "Account Balance" && b.symbol}
                </span>
              </div>
              {b.symbol === "Account Balance" && (
                <p className="text-xs text-gray-400 mt-0.5">Account Balance</p>
              )}
              {b.sub && <p className="text-xs text-gray-400 mt-0.5">{b.sub}</p>}
            </div>
          ))}
        </div>

        {/* Chart + Swap Form */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* TradingView Chart */}
          <div>
            <div
              ref={chartRef}
              className="tradingview-widget-container rounded-lg overflow-hidden h-[380px] border border-white/10"
            />
            <p className="text-center text-sm text-[#22c55e] mt-2 italic">
              Personal trading chart
            </p>
          </div>

          {/* Swap Form */}
          <div className="space-y-5">
            {/* Source Account */}
            <div>
              <label className="block text-sm text-white mb-1.5">
                Source Account
              </label>
              <select
                value={source}
                onChange={(e) => setSource(e.target.value)}
                className="w-full px-4 py-2.5 rounded-lg bg-[#1a2420] border border-white/10 text-sm text-white outline-none focus:border-[#22c55e]/50 transition-colors">
                {cryptoOptions.map((o) => (
                  <option key={o.value} value={o.value}>
                    {o.label}
                  </option>
                ))}
              </select>
            </div>

            {/* Destination Account */}
            <div>
              <label className="block text-sm text-white mb-1.5">
                Destination Account
              </label>
              <select
                value={destination}
                onChange={(e) => setDestination(e.target.value)}
                className="w-full px-4 py-2.5 rounded-lg bg-[#1a2420] border border-white/10 text-sm text-white outline-none focus:border-[#22c55e]/50 transition-colors">
                {destOptions.map((o) => (
                  <option key={o.value} value={o.value}>
                    {o.label}
                  </option>
                ))}
              </select>
              <p className="text-xs text-[#22c55e] mt-1.5">
                NOTE:{destination} is your account balance.
              </p>
            </div>

            {/* Amount */}
            <div>
              <label className="block text-sm font-bold text-white mb-1.5">
                Amount
              </label>
              <input
                type="number"
                placeholder={`Enter amount of ${source.toLowerCase()}`}
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                className="w-full px-4 py-2.5 rounded-lg bg-transparent border border-white/20 text-sm text-white placeholder-gray-500 outline-none focus:border-white/40 transition-colors"
              />
            </div>

            {/* You will get */}
            <div>
              <label className="block text-sm text-white mb-1.5">
                You will get
              </label>
              <input
                type="text"
                placeholder={`Quantity of ${destination.toLowerCase()}`}
                disabled
                className="w-full px-4 py-2.5 rounded-lg bg-[#1a2420] border border-white/10 text-sm text-gray-400 outline-none"
              />
            </div>

            {/* Fees */}
            <p className="text-sm font-bold text-white">Fees = 2%</p>

            {/* Swap Button */}
            <button className="w-full py-3 rounded-lg bg-[#22c55e] hover:bg-[#16a34a] text-white font-semibold text-sm transition-colors">
              Swap
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
