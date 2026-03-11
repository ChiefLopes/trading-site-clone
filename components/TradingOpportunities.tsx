"use client";

import Image from "next/image";
import ScrollAnimation from "./ScrollAnimation";

const TradingOpportunities = () => {
  return (
    <section
      id="about"
      className="relative bg-[#1E2028] py-24 md:py-32 overflow-hidden">
      {/* Subtle ambient glow behind image - on the right side this time */}
      <div className="absolute right-0 top-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-[#c8e632]/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 flex flex-col lg:flex-row items-center gap-12 lg:gap-20">
        {/* Left — Content */}
        <div className="flex-1 max-w-xl order-2 lg:order-1">
          <ScrollAnimation animation="fadeLeft" duration={0.7}>
            <h2 className="text-4xl md:text-5xl font-bold text-white leading-tight">
              Expanding Trading
              <br />
              Opportunities For
              <br />
              Your Success!
            </h2>
          </ScrollAnimation>

          <ScrollAnimation animation="fadeUp" delay={0.2}>
            <p className="mt-8 text-gray-400 text-base leading-relaxed">
              At Infinity Digital Trade, we are relentlessly focused on driving
              growth and expanding our digital agency to ensure your ultimate
              success in the dynamic world of trading.
            </p>
          </ScrollAnimation>

          {/* Stats */}
          <ScrollAnimation animation="fadeUp" delay={0.4}>
            <div className="mt-10 flex flex-wrap gap-10">
              <div>
                <div className="text-[#c8e632] text-3xl md:text-4xl font-bold">
                  11,950+
                </div>
                <p className="mt-2 text-gray-500 text-sm">Happy clients</p>
              </div>
              <div>
                <div className="text-[#7c3aed] text-3xl md:text-4xl font-bold">
                  98%
                </div>
                <p className="mt-2 text-gray-500 text-sm">
                  Customer satisfaction
                </p>
              </div>
            </div>
          </ScrollAnimation>
        </div>

        {/* Right — Image */}
        <ScrollAnimation
          animation="fadeRight"
          duration={0.7}
          className="relative w-full max-w-md lg:max-w-lg flex-shrink-0 order-1 lg:order-2">
          <div className="relative aspect-square">
            <Image
              src="/expand.png"
              alt="Expanding Trading Opportunities illustration"
              fill
              className="object-contain"
              sizes="(max-width: 768px) 100vw, 50vw"
            />
          </div>
        </ScrollAnimation>
      </div>
    </section>
  );
};

export default TradingOpportunities;
