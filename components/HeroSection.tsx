"use client";

import React from "react";
import Image from "next/image";
import TradingViewTickerTape from "./TradingViewTickerTape";

const HeroSection = () => {
  return (
    <section
      id="home"
      className="relative min-h-screen flex flex-col justify-center items-center overflow-hidden bg-[#060b09]">
      {/* Background Candlestick Image */}
      <div className="absolute inset-0 z-0 overflow-hidden bg-[#060b09]">
        {/* Infinite Panning Images & Grid */}
        <div className="absolute inset-0 flex w-[110vw] animate-pan-bg">
          {/* Grid Pattern spanning the entire panning canvas */}
          <div
            className="absolute inset-0 z-10 opacity-[0.07]"
            style={{
              backgroundImage:
                "linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)",
              backgroundSize: "50px 50px",
            }}
          />
          <div className="relative w-[55vw] h-full shrink-0">
            <Image
              src="/candlestick-bg.png"
              alt=""
              fill
              className="object-cover opacity-80 mix-blend-lighten"
              priority
            />
          </div>
          <div className="relative w-[55vw] h-full shrink-0">
            <Image
              src="/candlestick-bg.png"
              alt=""
              fill
              className="object-cover opacity-80 mix-blend-lighten"
              priority
            />
          </div>
        </div>

        {/* Brand Green Tint & Fades */}
        <div className="absolute inset-0 bg-[#c8e632]/3 mix-blend-overlay" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#060b09] via-[#060b09]/30 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-b from-[#060b09]/60 via-transparent to-[#0a0f0d]" />

        {/* Corner color shadings */}
        <div className="absolute -top-20 -left-20 w-[500px] h-[500px] bg-[#0f9b58]/15 rounded-full blur-[150px] pointer-events-none" />
        <div className="absolute -bottom-20 -right-20 w-[500px] h-[500px] bg-[#e74c3c]/10 rounded-full blur-[150px] pointer-events-none" />

        {/* Horizontal scanning line */}
        <div
          className="absolute left-0 w-full h-[1px] z-20 animate-scan-line"
          style={{
           
            background:
              "linear-gradient(90deg, transparent, rgba(200,230,50,0.4) 20%, rgba(200,230,50,0.6) 50%, rgba(200,230,50,0.4) 80%, transparent)",
          }}
        />
      </div>

      {/* Hero Content */}
      <div className="relative z-10 flex flex-col items-center text-center px-4 pt-28 pb-32 max-w-3xl mx-auto">
        <div className="mb-4 text-3xl animate-bounce-slow">🏆</div>

        {/* Title */}
        <h1 className="text-4xl font-bold leading-tight">
          <span className="text-[#c8e632]">Infinity Digital Trade</span>
          <br />
          <span className="text-white mt-1.5 block font-semibold mix-blend-plus-lighter">
            Leading investment providers
          </span>
        </h1>

        {/* Description */}
        <p className="mt-6 text-gray-200 text-base md:text-lg leading-relaxed max-w-2xl">
          Our trading platform helps you access real-time data, expert insights,
          and advanced tools to make informed decisions and maximize profits
        </p>

        {/* CTA Button */}
        <a
          href="#get-started"
          className="mt-10 inline-flex items-center px-8 py-5 rounded-lg bg-[#c8e632] text-[#0a0f0d] font-bold text-sm tracking-wide hover:bg-[#b4f12c] hover:shadow-[0_0_30px_rgba(180,241,44,0.3)] transition-all duration-300 hover:scale-105">
          Start Trading
        </a>
      </div>

      {/* Stock Ticker Marquee */}
      <div className="absolute bottom-0 left-0 w-full z-10">
        <TradingViewTickerTape />
      </div>
    </section>
  );
};

export default HeroSection;
