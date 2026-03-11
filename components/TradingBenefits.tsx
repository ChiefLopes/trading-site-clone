"use client";

import Image from "next/image";
import ScrollAnimation from "./ScrollAnimation";

const TradingBenefits = () => {
  return (
    <section
     
      className="relative bg-black py-24 md:py-32 overflow-hidden">
      {/* Subtle ambient glow behind image */}
      <div className="absolute left-0 top-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-[#c8e632]/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 flex flex-col lg:flex-row items-center gap-12 lg:gap-20">
        {/* Left — Image */}
        <ScrollAnimation
          animation="fadeLeft"
          duration={0.7}
          className="relative w-full max-w-md lg:max-w-lg flex-shrink-0">
          <div className="relative aspect-square">
            <Image
              src="/yellowCoin.png"
              alt="Trading benefits — money bag with gold coins"
              fill
              className="object-contain"
              sizes="(max-width: 768px) 100vw, 50vw"
            />
          </div>
        </ScrollAnimation>

        {/* Right — Content */}
        <div className="flex-1 max-w-xl">
          <ScrollAnimation animation="fadeRight" duration={0.7}>
            <h2 className="text-4xl md:text-5xl font-bold text-white leading-tight">
              Discover Our
              <br />
              Trading Benefits
            </h2>
          </ScrollAnimation>

          <ScrollAnimation animation="fadeUp" delay={0.2}>
            <p className="mt-8 text-gray-400 text-base leading-relaxed">
              We provide novices with an automated system that maximizes profit
              on their capital and guarantees the right trades are made and
              monitored to perform correctly. It is one of the things that sets
              us apart from other brokerage firms. Our trading system primarily
              trades on stocks and blockchain.
            </p>

            <p className="mt-5 text-gray-400 text-base leading-relaxed">
              It is one of the things that sets us apart from other brokerage
              firms. Our trading system primarily trades on stocks and
              blockchain.
            </p>
          </ScrollAnimation>

          {/* CTA Button */}
          <ScrollAnimation animation="fadeUp" delay={0.4}>
            <a
              href="#get-started"
              className="mt-10 inline-flex items-center px-7 py-3 rounded-md border border-[#c8e632] text-[#c8e632] text-sm font-semibold hover:bg-[#c8e632] hover:text-[#0a0f0d] transition-all duration-300 hover:shadow-[0_0_24px_rgba(200,230,50,0.2)]">
              Get Started
            </a>
          </ScrollAnimation>
        </div>
      </div>

      {/* Scroll-to-top button */}
      <a
        href="#home"
        className="fixed bottom-6 right-6 z-50 w-10 h-10 rounded-md bg-[#c8e632] flex items-center justify-center text-[#0a0f0d] shadow-lg hover:bg-[#b4f12c] hover:shadow-[0_0_20px_rgba(200,230,50,0.3)] transition-all duration-300"
        aria-label="Scroll to top">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="18"
          height="18"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round">
          <polyline points="18 15 12 9 6 15" />
        </svg>
      </a>
    </section>
  );
};

export default TradingBenefits;
