"use client";

import React, { useState } from "react";
import {
  Download,
  Upload,
  ArrowLeftRight,
  ChevronUp,
  ChevronDown,
} from "lucide-react";

type Tab = "deposit" | "withdrawal" | "others";

const tabs: { id: Tab; label: string; icon: React.ReactNode }[] = [
  { id: "deposit", label: "Deposit", icon: <Download size={18} /> },
  { id: "withdrawal", label: "Withdrawal", icon: <Upload size={18} /> },
  { id: "others", label: "Others", icon: <ArrowLeftRight size={16} /> },
];

const depositColumns = ["Amount", "Payment mode", "Status", "Date created"];
const withdrawalColumns = [
  "Amount requested",
  "Amount + charges",
  "Recieving mode",
  "Status",
  "Date created",
];
const othersColumns = ["Description", "Amount", "Status", "Date created"];

export default function TransactionsPage() {
  const [activeTab, setActiveTab] = useState<Tab>("deposit");
  const [entriesCount, setEntriesCount] = useState("10");
  const [search, setSearch] = useState("");

  const columns =
    activeTab === "deposit"
      ? depositColumns
      : activeTab === "withdrawal"
        ? withdrawalColumns
        : othersColumns;

  return (
    <div className="min-h-[calc(100vh-64px)] flex flex-col">
      <div className="flex-1">
        {/* Page Title */}
        <h1 className="text-2xl md:text-3xl font-semibold text-white mb-6">
          Transaction Records
        </h1>

        {/* Main Card */}
        <div className="border border-white/10 rounded-lg p-6 md:p-8">
          {/* Tabs */}
          <div className="grid grid-cols-3 gap-3 mb-6">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex flex-col items-center gap-1.5 py-4 rounded-lg text-sm font-medium transition-colors ${
                  activeTab === tab.id
                    ? "bg-[#22c55e] text-white"
                    : "bg-[#1a1a1a] text-gray-400 hover:bg-[#222] hover:text-white"
                }`}>
                {tab.icon}
                {tab.label}
              </button>
            ))}
          </div>

          {/* Controls Row */}
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2 text-sm text-white">
              <span>Show</span>
              <select
                value={entriesCount}
                onChange={(e) => setEntriesCount(e.target.value)}
                className="bg-[#1a1a1a] border border-white/20 text-white text-sm px-2 py-1 rounded outline-none">
                <option value="10">10</option>
                <option value="25">25</option>
                <option value="50">50</option>
                <option value="100">100</option>
              </select>
              <span>entries</span>
            </div>
            <div className="flex items-center gap-2 text-sm text-white">
              <span>Search:</span>
              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="bg-[#1a1a1a] border border-white/20 text-white text-sm px-3 py-1.5 rounded outline-none focus:border-white/40 transition-colors w-32 md:w-48"
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
                      className="text-left text-gray-400 font-medium px-4 py-3 whitespace-nowrap">
                      <div className="flex items-center gap-1">
                        {col}
                        <div className="flex flex-col -space-y-1 text-gray-500">
                          <ChevronUp size={10} />
                          <ChevronDown size={10} />
                        </div>
                      </div>
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td
                    colSpan={columns.length}
                    className="text-center py-8 text-[#22c55e] text-sm">
                    No data available in table
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          <div className="flex items-center justify-between mt-4 text-sm">
            <span className="text-white">Showing 0 to 0 of 0 entries</span>
            <div className="flex gap-2">
              <button className="px-4 py-1.5 border border-white/20 rounded text-white text-sm hover:bg-white/5 transition-colors">
                Previous
              </button>
              <button className="px-4 py-1.5 border border-white/20 rounded text-white text-sm hover:bg-white/5 transition-colors">
                Next
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
