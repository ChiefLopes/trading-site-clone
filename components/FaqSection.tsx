"use client";

import Image from "next/image";
import { useState } from "react";
import { ChevronDown, ChevronRight } from "lucide-react";
import ScrollAnimation from "./ScrollAnimation";

const faqs = [
  {
    question: "Is the Trading Site Safe and Reliable?",
    answer:
      "There are risks in Trading all assets, that is exactly why there we are here for you! all trade risk are done by us, if there is any loss that stalls the trading, the Investor will be Refunded his Capital.",
  },
  {
    question: "Trading Fees, Deposit and withdrawal are processed how?",
    answer:
      "Deposits and withdrawals are processed instantly through our automated systems. We offer competitive trading fees that decrease as your trading volume increases.",
  },
  {
    question: "Key factors for choosing us?",
    answer:
      "We offer industry-leading security, 24/7 customer support, and advanced trading tools designed for both beginners and experienced traders.",
  },
];

const FaqSection = () => {
  const [activeIdx, setActiveIdx] = useState<number | null>(0);

  const toggle = (idx: number) => {
    setActiveIdx((prev) => (prev === idx ? null : idx));
  };

  return (
    <section className="relative bg-[#16181e] py-24 md:py-32 overflow-hidden">
      {/* Decorative stars */}
      <div className="hidden md:block absolute top-10 left-10 md:left-24 z-10">
        <Image
          src="/2star.png"
          alt="Decorative stars"
          width={100}
          height={100}
          className="opacity-90 animate-pulse"
        />
      </div>

      <div id="faq" className="max-w-5xl mx-auto px-6">
        <ScrollAnimation animation="fadeUp">
          <h2 className="text-4xl md:text-5xl font-bold text-white text-center mb-16 leading-tight">
            FAQ Here
          </h2>
        </ScrollAnimation>

        {/* Accordion Container */}
        <ScrollAnimation animation="fadeUp" delay={0.2}>
          <div className="space-y-4">
            {faqs.map((item, idx) => {
              const isOpen = activeIdx === idx;
              return (
                <div
                  key={idx}
                  className="border-b border-white/5 last:border-b-0 max-w-[30rem]">
                  <button
                    onClick={() => toggle(idx)}
                    className="w-full flex items-center justify-between py-4 text-left group gap-4 cursor-pointer ">
                    <div className="flex items-center gap-4 flex-1">
                      {/* ? Badge */}
                      <div className="w-6 h-6 rounded-full bg-[#c8e632] flex items-center justify-center text-[13px] font-black text-black flex-shrink-0">
                        ?
                      </div>

                      {/* Question Text */}
                      <span
                        className={`flex-1 font-bold text-[15px] transition-colors duration-300 ${
                          isOpen
                            ? "text-white"
                            : "text-[#c8e632] group-hover:text-[#d4f04a]"
                        }`}>
                        {item.question}
                      </span>
                    </div>

                    {/* Chevron */}
                    <div className="flex-shrink-0 ml-4">
                      {isOpen ? (
                        <ChevronDown className="w-5 h-5 text-white transition-transform duration-300" />
                      ) : (
                        <ChevronRight className="w-5 h-5 text-[#c8e632] group-hover:text-[#d4f04a] transition-transform duration-300" />
                      )}
                    </div>
                  </button>

                  {/* Expandable Body */}
                  <div
                    className={`overflow-hidden transition-all duration-500 pl-[40px] ${
                      isOpen
                        ? "max-h-40 opacity-100 pb-6 font-medium"
                        : "max-h-0 opacity-0"
                    }`}>
                    <p className="text-gray-400 text-sm leading-relaxed pr-8">
                      {item.answer}
                    </p>
                  </div>
                </div>
              );
            })}
            {/* Added bottom border for the last item matching the image */}
            <div className="border-t border-white/5" />
          </div>

          <div className="mt-8 ml-2">
            <p className="text-gray-400 text-[13px]">
              Still have questions?{" "}
              <a
                href="#contact"
                className="text-yellow-500 font-bold hover:underline">
                Get in touch
              </a>
            </p>
          </div>
        </ScrollAnimation>
      </div>
    </section>
  );
};

export default FaqSection;
