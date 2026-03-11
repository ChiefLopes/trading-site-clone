"use client";

import React, { useEffect, useRef } from "react";
import ScrollAnimation from "./ScrollAnimation";

const TslaFinancials = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    container.innerHTML = "";

    const widgetDiv = document.createElement("div");
    widgetDiv.className = "tradingview-widget-container__widget";
    container.appendChild(widgetDiv);

    const script = document.createElement("script");
    script.src =
      "https://s3.tradingview.com/external-embedding/embed-widget-financials.js";
    script.type = "text/javascript";
    script.async = true;
    script.innerHTML = JSON.stringify({
      isTransparent: true,
      largeChartUrl: "",
      displayMode: "regular",
      width: "100%",
      height: "100%",
      colorTheme: "dark",
      symbol: "NASDAQ:TSLA",
      locale: "en",
    });

    container.appendChild(script);

    return () => {
      container.innerHTML = "";
    };
  }, []);

  return (
    <section className="bg-black/70 relative overflow-hidden">
      <ScrollAnimation animation="fadeUp">
        <div className=" mx-auto px-0">
          <div className="bg-[#121318]  flex flex-col h-[75vh] min-h-[500px] shadow-2xl overflow-hidden relative">
            <div ref={containerRef} className="w-full h-full flex-1" />
          </div>
        </div>
      </ScrollAnimation>
    </section>
  );
};

export default TslaFinancials;
