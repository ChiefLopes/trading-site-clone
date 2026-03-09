"use client";

import React from "react";
import Image from "next/image";

const stockData = [
  {
    symbol: "A",
    name: "",
    price: "403.10",
    change: "-2.84",
    pct: "-0.70%",
    negative: true,
    icon: "📊",
  },
  {
    symbol: "AAPL",
    name: "",
    price: "258.48",
    change: "-4.04",
    pct: "-1.54%",
    negative: true,
    icon: "🍎",
  },
  {
    symbol: "AMZN",
    name: "",
    price: "215.92",
    change: "-0.90",
    pct: "-0.42%",
    negative: true,
    icon: "🟡",
  },
  {
    symbol: "AMD",
    name: "",
    price: "200.27",
    change: "-1.80",
    pct: "-0.89%",
    negative: true,
    icon: "📐",
  },
  {
    symbol: "META",
    name: "",
    price: "659.93",
    change: "-7.80",
    pct: "-1.17%",
    negative: true,
    icon: "🔵",
  },
  {
    symbol: "MSFT",
    name: "",
    price: "406.38",
    change: "+1.18",
    pct: "+0.29%",
    negative: false,
    icon: "🟦",
  },
  {
    symbol: "GOOGL",
    name: "",
    price: "174.52",
    change: "-1.23",
    pct: "-0.70%",
    negative: true,
    icon: "🔍",
  },
  {
    symbol: "TSLA",
    name: "",
    price: "302.15",
    change: "+4.87",
    pct: "+1.64%",
    negative: false,
    icon: "⚡",
  },
  {
    symbol: "NVDA",
    name: "",
    price: "875.30",
    change: "-12.45",
    pct: "-1.40%",
    negative: true,
    icon: "💚",
  },
  {
    symbol: "NFLX",
    name: "",
    price: "628.90",
    change: "+3.22",
    pct: "+0.51%",
    negative: false,
    icon: "🔴",
  },
];

const TickerItem = ({ stock }: { stock: (typeof stockData)[0] }) => (
  <div className="flex items-center gap-4 px-6 shrink-0">
    <span className="text-base">{stock.icon}</span>
    <span className="text-white font-bold text-sm tracking-wide">
      {stock.symbol}
    </span>
    <span className="text-white/80 text-sm">{stock.price}</span>
    <span
      className={`text-sm font-medium ${stock.negative ? "text-red-400" : "text-[#b4f12c]"}`}>
      {stock.change}
    </span>
    <span
      className={`text-sm ${stock.negative ? "text-red-400" : "text-[#b4f12c]"}`}>
      ({stock.pct})
    </span>
  </div>
);

const HeroSection = () => {
  return (
    <section
      id="home"
      className="relative min-h-screen flex flex-col justify-center items-center overflow-hidden bg-[#060b09]">
      {/* Background Candlestick Image */}
      <div className="absolute inset-0 z-0 overflow-hidden bg-[#060b09]">
        {/* Infinite Panning Images & Grid */}
        <div className="absolute inset-0 flex w-[200vw] animate-pan-bg">
          {/* Grid Pattern spanning the entire panning canvas */}
          <div
            className="absolute inset-0 z-10 opacity-[0.1]"
            style={{
              backgroundImage:
                "linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)",
              backgroundSize: "50px 50px",
            }}
          />
          <div className="relative w-[100vw] h-full shrink-0">
            <Image
              src="/candlestick-bg.png"
              alt=""
              fill
              className="object-cover opacity-60 mix-blend-lighten"
              priority
            />
          </div>
          <div className="relative w-[100vw] h-full shrink-0">
            <Image
              src="/candlestick-bg.png"
              alt=""
              fill
              className="object-cover opacity-60 mix-blend-lighten"
              priority
            />
          </div>
        </div>

        {/* Brand Green Tint & Fades */}
        <div className="absolute inset-0 bg-[#c8e632]/5 mix-blend-overlay" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#060b09] via-[#060b09]/50 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-b from-[#060b09]/80 via-transparent to-[#0a0f0d]" />
      </div>

      {/* Hero Content */}
      <div className="relative z-10 flex flex-col items-center text-center px-4 pt-28 pb-32 max-w-3xl mx-auto">
        <div className="mb-4 text-3xl animate-bounce-slow">🏆</div>

        {/* Title */}
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight">
          <span className="text-[#c8e632]">Infinity Digital Trade</span>
          <br />
          <span className="text-white mt-1.5 block font-semibold mix-blend-plus-lighter">
            Leading investment providers
          </span>
        </h1>

        {/* Description */}
        <p className="mt-6 text-gray-400 text-base md:text-lg leading-relaxed max-w-2xl">
          Our trading platform helps you access real-time data, expert insights,
          and advanced tools to make informed decisions and maximize profits
        </p>

        {/* CTA Button */}
        <a
          href="#get-started"
          className="mt-10 inline-flex items-center px-8 py-3.5 rounded-lg bg-[#c8e632] text-[#0a0f0d] font-bold text-sm tracking-wide hover:bg-[#b4f12c] hover:shadow-[0_0_30px_rgba(180,241,44,0.3)] transition-all duration-300 hover:scale-105">
          Start Trading
        </a>
      </div>

      {/* Stock Ticker Marquee */}
      <div className="absolute bottom-0 left-0 w-full z-20 bg-[#0a0f0d]/90 backdrop-blur-sm border-t border-white/5">
        <div className="relative overflow-hidden h-12 flex items-center">
          <div className="flex animate-marquee whitespace-nowrap">
            {stockData.map((stock, i) => (
              <TickerItem key={`a-${i}`} stock={stock} />
            ))}
            {stockData.map((stock, i) => (
              <TickerItem key={`b-${i}`} stock={stock} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
