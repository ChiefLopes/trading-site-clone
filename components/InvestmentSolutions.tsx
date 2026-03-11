"use client";

import Image from "next/image";
import ScrollAnimation from "./ScrollAnimation";

const plans = [
  {
    name: "TESLA, INC - Silver",
    price: "$6000",
    duration: "7 Days",
    minDeposit: "$6000",
    maxDeposit: "$6000",
    interest: "$500",
  },
  {
    name: "TESLA, INC - Gold",
    price: "$15000",
    duration: "1 Months",
    minDeposit: "$15000",
    maxDeposit: "$15000",
    interest: "$500",
  },
  {
    name: "TESLA, INC - Diamond",
    price: "$40000",
    duration: "30 Days",
    minDeposit: "$40000",
    maxDeposit: "$40000",
    interest: "$500",
  },
];

const InvestmentSolutions = () => {
  return (
    <section  id="plan" className="bg-black py-24 md:py-32">
      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <ScrollAnimation animation="fadeUp">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-white leading-tight">
              Phenomenal Investing
              <br />
              Solutions
            </h2>
            <p className="mt-6 text-gray-400 text-sm md:text-base leading-relaxed">
              We specialize in curating investment strategies that maximize
              returns while mitigating risks associated with the volatility of
              the tech and automotive sectors.
            </p>
          </div>
        </ScrollAnimation>

        {/* Pricing Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {plans.map((plan, index) => (
            <ScrollAnimation
              key={index}
              animation="fadeUp"
              delay={index * 0.15}>
              <div className="bg-[#11161d] border border-white/5 rounded-xl p-8 transition-all duration-300 hover:border-[#c8e632]/30 hover:shadow-[0_0_30px_rgba(200,230,50,0.05)] flex flex-col h-full">
                <h3 className="text-white font-semibold text-lg mb-6">
                  {plan.name}
                </h3>

                <div className="flex items-baseline gap-1 mb-8">
                  <span className="text-4xl font-bold text-white">
                    {plan.price}
                  </span>
                  <span className="text-gray-400 text-sm">
                    / {plan.duration}
                  </span>
                </div>

                <div className="space-y-4 mb-10 flex-grow">
                  <div className="flex items-center gap-3">
                    <img
                      src="/good.png"
                      alt="check"
                      className="w-[18px] h-[18px] object-contain"
                    />
                    <span className="text-gray-300 text-sm font-medium">
                      Min. Deposit:{" "}
                      <span className="text-white ml-1">{plan.minDeposit}</span>
                    </span>
                  </div>
                  <div className="flex items-center gap-3 text-sm">
                    <img
                      src="/good.png"
                      alt="check"
                      className="w-[18px] h-[18px] object-contain"
                    />
                    <span className="text-gray-300 text-sm font-medium">
                      Max. Deposit:{" "}
                      <span className="text-white ml-2">{plan.maxDeposit}</span>
                    </span>
                  </div>
                  <div className="flex items-center gap-3 text-sm">
                    <img
                      src="/good.png"
                      alt="check"
                      className="w-[18px] h-[18px] object-contain"
                    />
                    <span className="text-gray-300 text-sm font-medium">
                      Trading Interest:{" "}
                      <span className="text-white ml-2">{plan.interest}</span>
                    </span>
                  </div>
                </div>

                <button className="w-fit px-6 py-2.5 rounded-lg border border-gray-700 text-gray-300 text-xs font-semibold hover:border-[#c8e632] hover:text-[#c8e632] transition-colors">
                  Choose Plan
                </button>
              </div>
            </ScrollAnimation>
          ))}
        </div>
      </div>
    </section>
  );
};

export default InvestmentSolutions;
