"use client";

import { useEffect, useRef, memo } from "react";

function TradingViewTickerTape({ onLoad }: { onLoad?: () => void }) {
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
      "https://s3.tradingview.com/external-embedding/embed-widget-ticker-tape.js";
    script.type = "text/javascript";
    script.async = true;
    script.innerHTML = JSON.stringify({
      symbols: [
        { proName: "NASDAQ:NVDA", title: "NVIDIA" },
        { proName: "NASDAQ:TSLA", title: "Tesla" },
        { proName: "NASDAQ:AAPL", title: "Apple" },
        { proName: "NASDAQ:AMZN", title: "Amazon" },
        { proName: "NASDAQ:META", title: "Meta" },
        { proName: "NASDAQ:GOOGL", title: "Google" },
        { proName: "BITSTAMP:BTCUSD", title: "Bitcoin" },
        { proName: "BITSTAMP:ETHUSD", title: "Ethereum" },
      ],
      showSymbolLogo: true,
      isTransparent: true,
      displayMode: "adaptive",
      colorTheme: "dark",
      locale: "en",
    });
    script.onload = () => {
      if (onLoad) onLoad();
    };

    container.appendChild(script);

    return () => {
      container.innerHTML = "";
    };
  }, []);

  return <div ref={containerRef} />;
}

export default memo(TradingViewTickerTape);
