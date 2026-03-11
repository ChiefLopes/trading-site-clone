"use client";

import React from "react";

export default function PurchaseStockPage() {
  const columns = [
    "Full Name",
    "Contact",
    "Full Address",
    "City",
    "State",
    "Zipcode",
    "Duration",
    "Submitted at",
    "Started at",
    "Expiring at",
    "Status",
  ];

  return (
    <div>
      {/* Page Title */}
      <h1 className="text-2xl md:text-3xl font-semibold text-white mb-6">
        Tesla Application
      </h1>

      {/* Partnership Info Card */}
      <div className="border border-white/10 rounded-lg p-6 md:p-8 mb-6">
        <h2 className="text-2xl md:text-3xl font-bold text-white mb-6">
          Infinity Digital Trade Tesla Partnership
        </h2>

        <p className="text-gray-400 text-sm mb-1">
          Would Love to own a tesla? Kindly make your tesla purchase using the
          balance left in your investment account
        </p>
        <p className="text-gray-400 text-xs mb-1">Terms and Conditions apply</p>
        <p className="text-gray-400 text-xs mb-8">
          Reach us at support@infinitydigitaltrade.com for more info.
        </p>

        {/* Apply Button */}
        <button className="px-10 py-3 bg-white text-black font-semibold text-sm rounded hover:bg-green-600 hover:text-white transition-colors duration-200 ease-linear">
          Purchase
        </button>
      </div>

      {/* Filed Tesla Application Table */}
      <div className="border border-white/10 rounded-lg p-6 md:p-8">
        <h2 className="text-white font-bold text-lg mb-6">
          Filed Tesla Application
        </h2>

        <div className="overflow-x-auto scrollbar-visible">
          <table className="w-full text-sm min-w-[1100px]">
            <thead>
              <tr className="border-b border-white/10">
                {columns.map((col) => (
                  <th
                    key={col}
                    className="text-left py-3 px-3 text-gray-400 font-semibold text-xs whitespace-nowrap">
                    {col}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              <tr>
                <td
                  colSpan={columns.length}
                  className="text-center py-8 text-[#22c55e] text-sm">
                  No data available
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
