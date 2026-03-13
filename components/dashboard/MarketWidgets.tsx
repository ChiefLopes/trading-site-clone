"use client";

import React, { useEffect, useRef } from "react";

export function MiniChart() {
  const containerRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (containerRef.current && !containerRef.current.querySelector("script")) {
      const script = document.createElement("script");
      script.src = "https://s3.tradingview.com/external-embedding/embed-widget-advanced-chart.js";
      script.async = true;
      script.textContent = JSON.stringify({
        autosize: true,
        symbol: "NASDAQ:TSLA",
        interval: "D",
        timezone: "Etc/UTC",
        theme: "dark",
        style: "1",
        locale: "en",
        allow_symbol_change: false,
        backgroundColor: "rgba(0, 0, 0, 0)",
        width: "100%",
        height: "100%",
      });
      containerRef.current.appendChild(script);
    }
  }, []);
  return <div ref={containerRef} className="h-full w-full" />;
}

export function SymbolOverview() {
  const containerRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (containerRef.current && !containerRef.current.querySelector("script")) {
      const script = document.createElement("script");
      script.src = "https://s3.tradingview.com/external-embedding/embed-widget-symbol-overview.js";
      script.async = true;
      script.textContent = JSON.stringify({
        symbols: [["NASDAQ:TSLA|1D"]],
        chartOnly: false,
        width: "100%",
        height: "100%",
        locale: "en",
        colorTheme: "dark",
        autosize: true,
        gridLineColor: "rgba(255, 255, 255, 0.05)",
        fontFamily: "inherit",
        isTransparent: true,
      });
      containerRef.current.appendChild(script);
    }
  }, []);
  return <div ref={containerRef} className="h-full w-full" />;
}

export function MarketNews() {
  const containerRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (containerRef.current && !containerRef.current.querySelector("script")) {
      const script = document.createElement("script");
      script.src = "https://s3.tradingview.com/external-embedding/embed-widget-timeline.js";
      script.async = true;
      script.textContent = JSON.stringify({
        feedMode: "all_symbols",
        isTransparent: true,
        displayMode: "regular",
        width: "100%",
        height: "100%",
        colorTheme: "dark",
        locale: "en",
        autosize: true,
      });
      containerRef.current.appendChild(script);
    }
  }, []);
  return <div ref={containerRef} className="h-full w-full" />;
}
