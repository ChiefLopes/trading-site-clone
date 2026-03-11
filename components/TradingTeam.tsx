"use client";

import React, { useState, useEffect, useRef, useCallback } from "react";
import Image from "next/image";
import ScrollAnimation from "./ScrollAnimation";

const teamMembers = [
  {
    name: "Benjamin Mitchell",
    role: "Financial analyst",
    image: "/ben_mitchel.png",
  },
  { name: "Samuel Davis", role: "Account executive", image: "/man1.png" },
  {
    name: "Harper Wilson",
    role: "Investment Analyst",
    image: "/harper_wilson.png",
  },
  { name: "Noah Turner", role: "Research Analyst", image: "/noah_turner.png" },
  {
    name: "Olivia Johnson",
    role: "Compliance Officer",
    image: "/olivia_johnson.png",
  },
];

const GAP = 24; // px gap between cards
const TOTAL = teamMembers.length;

const TradingTeam = () => {
  const viewportRef = useRef<HTMLDivElement>(null);
  const [cardWidth, setCardWidth] = useState(0);
  const [visibleCount, setVisibleCount] = useState(4); // 1 on mobile, 4 on desktop
  const [currentStep, setCurrentStep] = useState(0); // index into the cloned array (starts at clone offset)
  const [transition, setTransition] = useState(true);
  const [dotIndex, setDotIndex] = useState(0);
  const isJumping = useRef(false);

  // Derive how many cards are visible based on viewport width
  const measure = useCallback(() => {
    if (!viewportRef.current) return;
    const vw = viewportRef.current.offsetWidth;
    const vis = vw < 768 ? 1 : 4;
    setVisibleCount(vis);
    setCardWidth((vw - GAP * (vis - 1)) / vis);
  }, []);

  useEffect(() => {
    measure();
    window.addEventListener("resize", measure);
    return () => window.removeEventListener("resize", measure);
  }, [measure]);

  // Reset step when visibleCount changes so clone offset stays correct
  useEffect(() => {
    setTransition(false);
    setCurrentStep(visibleCount); // first real card sits after visibleCount clones
    setDotIndex(0);
  }, [visibleCount]);

  const step = cardWidth + GAP;

  // Auto-advance every 2s
  useEffect(() => {
    if (cardWidth === 0) return;
    const id = setInterval(() => {
      setTransition(true);
      setCurrentStep((s) => s + 1);
      setDotIndex((d) => (d + 1) % TOTAL);
    }, 2000);
    return () => clearInterval(id);
  }, [cardWidth]);

  // Seamless loop: jump back silently after entering a clone zone
  const onTransitionEnd = () => {
    if (isJumping.current) {
      isJumping.current = false;
      return;
    }
    if (currentStep >= TOTAL + visibleCount) {
      isJumping.current = true;
      setTransition(false);
      setCurrentStep(visibleCount);
    }
    if (currentStep < visibleCount) {
      isJumping.current = true;
      setTransition(false);
      setCurrentStep(TOTAL + visibleCount - 1);
    }
  };

  const goTo = (dotIdx: number) => {
    const diff = dotIdx - dotIndex;
    setTransition(true);
    setCurrentStep((s) => s + diff);
    setDotIndex(dotIdx);
  };

  // Build the cloned array dynamically based on current visibleCount
  const cloned = [
    ...teamMembers.slice(-visibleCount),
    ...teamMembers,
    ...teamMembers.slice(0, visibleCount),
  ];

  const offset = cardWidth ? currentStep * step : 0;

  return (
    <section className="bg-black py-24 md:py-32 relative overflow-hidden">
      {/* Decorative star */}
      <div className="hidden md:block absolute top-10 left-10 md:left-24 z-10">
        <Image
          src="/ring2.png"
          alt="star"
          width={100}
          height={100}
          className="opacity-90 animate-pulse"
        />
      </div>

      <div id="team" className="max-w-[1400px] mx-auto px-6">
        <ScrollAnimation animation="fadeUp">
          <h2 className="text-4xl md:text-5xl font-bold text-white text-center mb-20 leading-tight">
            Our Trading Team
          </h2>
        </ScrollAnimation>

        {/* Viewport */}
        <div ref={viewportRef} className="overflow-hidden">
          {cardWidth > 0 && (
            <div
              className="flex"
              style={{
                gap: `${GAP}px`,
                transform: `translateX(-${offset}px)`,
                transition: transition ? "transform 0.6s ease-in-out" : "none",
                willChange: "transform",
              }}
              onTransitionEnd={onTransitionEnd}>
              {cloned.map((member, idx) => (
                <div
                  key={idx}
                  style={{ width: `${cardWidth}px`, flexShrink: 0 }}
                  className="bg-[#0c0d0c] rounded-[24px] overflow-hidden border border-gray-900">
                  <div className="relative bg-[#2a303c] aspect-[4/3] md:aspect-[4/5]">
                    <Image
                      src={member.image}
                      alt={member.name}
                      fill
                      className="object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#0c0d0c] via-transparent to-transparent opacity-70" />
                  </div>
                  <div className="p-6 text-center bg-[#1c1e26]">
                    <h3 className="text-lg font-bold mb-1 text-[#c8e632]">
                      {member.name}
                    </h3>
                    <p className="text-gray-400 text-sm font-medium">
                      {member.role}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Dot Indicators */}
        <div className="flex justify-center gap-2 mt-10">
          {teamMembers.map((_, dot) => (
            <button
              key={dot}
              onClick={() => goTo(dot)}
              className={`h-3 rounded-[2px] transition-all duration-300 ${
                dot === dotIndex ? "bg-amber-400 w-3.5" : "bg-amber-400/20 w-3"
              }`}
              aria-label={`Slide ${dot + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default TradingTeam;
