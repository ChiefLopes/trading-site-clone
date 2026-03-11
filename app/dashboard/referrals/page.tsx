"use client";

import { useState } from "react";
import { Copy, ChevronUp, ChevronDown, UserCircle } from "lucide-react";

export default function ReferralsPage() {
  const [entriesPerPage, setEntriesPerPage] = useState(10);
  const [search, setSearch] = useState("");

  const handleCopy = () => {
    navigator.clipboard.writeText("https://infinitydigitaltrade.com/ref/Brown");
  };

  const columns = [
    "Client name",
    "Ref. level",
    "Parent",
    "Client status",
    "Date registered",
  ];

  return (
    <div>
      {/* Page Title */}
      <h1 className="text-2xl md:text-3xl font-semibold text-white mb-6">
        Refer users to Infinity Digital Trade community
      </h1>

      {/* Main Card */}
      <div className="border border-white/10 rounded-lg p-6 md:p-10">
        {/* Referral Link Section */}
        <div className="text-center mb-8">
          <p className="text-sm text-gray-400 mb-3">
            You can refer users by sharing your referral link:
          </p>
          <div className="flex items-center justify-center gap-0 max-w-xl mx-auto">
            <div className="flex-1 px-4 py-3 bg-[#1a1a1a] border border-white/20 rounded-l-lg text-sm text-gray-300 text-left truncate">
              https://infinitydigitaltrade.com/ref/Brown
            </div>
            <button
              onClick={handleCopy}
              className="px-4 py-3 bg-[#2a2a2a] border border-white/20 border-l-0 rounded-r-lg text-gray-400 hover:text-white transition-colors">
              <Copy size={16} />
            </button>
          </div>

          <p className="text-sm text-gray-400 mt-4">or your Referral ID</p>
          <p className="text-[#22c55e] text-lg font-medium mt-1">Brown</p>
        </div>

        {/* Referred By Section */}
        <div className="text-center mb-10">
          <p className="text-white font-semibold text-base mb-3">
            You were referred by
          </p>
          <div className="flex flex-col items-center gap-1">
            <UserCircle size={40} className="text-gray-400" />
            <div className="w-10 h-7 bg-gray-500 rounded-md" />
            <p className="text-white font-semibold">null</p>
          </div>
        </div>

        {/* Your Referrals Table Section */}
        <div>
          <h2 className="text-white font-bold text-base mb-4">
            Your Referrals.
          </h2>

          {/* Controls Row */}
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-4">
            <div className="flex items-center gap-2 text-sm text-gray-400">
              <span>Show</span>
              <select
                value={entriesPerPage}
                onChange={(e) => setEntriesPerPage(Number(e.target.value))}
                className="bg-white text-black text-sm px-2 py-1 rounded border border-gray-300 outline-none">
                <option value={10}>10</option>
                <option value={25}>25</option>
                <option value={50}>50</option>
                <option value={100}>100</option>
              </select>
              <span>entries</span>
            </div>

            <div className="flex items-center gap-2 text-sm text-gray-400">
              <span>Search:</span>
              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="px-3 py-1.5 bg-white text-black text-sm rounded border border-gray-300 outline-none w-40"
              />
            </div>
          </div>

          {/* Table */}
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-white/10">
                  {columns.map((col) => (
                    <th
                      key={col}
                      className="text-left py-3 px-3 text-gray-400 font-semibold text-xs whitespace-nowrap">
                      <div className="flex items-center gap-1">
                        {col}
                        <div className="flex flex-col -space-y-1">
                          <ChevronUp size={12} className="text-gray-500" />
                          <ChevronDown size={12} className="text-gray-500" />
                        </div>
                      </div>
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td
                    colSpan={5}
                    className="text-center py-8 text-[#22c55e] text-sm">
                    No data available in table
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mt-4 pt-4 border-t border-white/10">
            <p className="text-sm text-gray-400">Showing 0 to 0 of 0 entries</p>
            <div className="flex items-center gap-2">
              <button className="px-4 py-1.5 border border-white/20 rounded text-sm text-gray-400 hover:text-white transition-colors">
                Previous
              </button>
              <button className="px-4 py-1.5 border border-white/20 rounded text-sm text-gray-400 hover:text-white transition-colors">
                Next
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
