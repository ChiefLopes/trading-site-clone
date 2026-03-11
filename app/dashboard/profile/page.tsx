"use client";

import React, { useState } from "react";

type Tab = "personal" | "withdrawal" | "password" | "other";

const tabs: { id: Tab; label: string }[] = [
  { id: "personal", label: "Personal Settings" },
  { id: "withdrawal", label: "Withdrawal Settings" },
  { id: "password", label: "Password/Security" },
  { id: "other", label: "Other Settings" },
];

const countries = [
  "United States of America",
  "United Kingdom",
  "Canada",
  "Australia",
  "Germany",
  "France",
  "India",
  "China",
  "Japan",
  "Brazil",
  "Nigeria",
  "South Africa",
  "Mexico",
  "Russia",
  "South Korea",
  "Italy",
  "Spain",
  "Netherlands",
  "Switzerland",
  "Sweden",
];

export default function ProfilePage() {
  const [activeTab, setActiveTab] = useState<Tab>("personal");
  const [form, setForm] = useState({
    fullname: "evelyn",
    email: "brownevelyn693@gmail.com",
    phone: "+8323900696",
    dob: "",
    country: "United States of America",
    address: "",
  });

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >,
  ) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  return (
    <div>
      {/* Page Title */}
      <h1 className="text-2xl md:text-3xl font-semibold text-white mb-6">
        Account Settings
      </h1>

      {/* Main Card */}
      <div className="border border-white/10 rounded-lg p-6 md:p-8">
        {/* Tabs */}
        <div className="flex flex-wrap gap-0 mb-8">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-5 py-2.5 text-sm font-medium transition-colors ${
                activeTab === tab.id
                  ? "bg-[#22c55e] text-white rounded-md"
                  : "text-gray-400 hover:text-white"
              }`}>
              {tab.label}
            </button>
          ))}
        </div>

        {/* Personal Settings Tab */}
        {activeTab === "personal" && (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Fullname */}
              <div>
                <label className="block text-sm text-gray-400 mb-1.5">
                  Fullname
                </label>
                <input
                  type="text"
                  name="fullname"
                  value={form.fullname}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-lg bg-transparent border border-white/20 text-sm text-white outline-none focus:border-white/40 transition-colors"
                />
              </div>

              {/* Email Address */}
              <div>
                <label className="block text-sm text-gray-400 mb-1.5">
                  Email Address
                </label>
                <input
                  type="email"
                  name="email"
                  value={form.email}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-lg bg-transparent border border-white/20 text-sm text-white outline-none focus:border-white/40 transition-colors"
                />
              </div>

              {/* Phone Number */}
              <div>
                <label className="block text-sm text-gray-400 mb-1.5">
                  Phone Number
                </label>
                <input
                  type="tel"
                  name="phone"
                  value={form.phone}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-lg bg-transparent border border-white/20 text-sm text-white outline-none focus:border-white/40 transition-colors"
                />
              </div>

              {/* Date of Birth */}
              <div>
                <label className="block text-sm text-gray-400 mb-1.5">
                  Date of Birth
                </label>
                <input
                  type="date"
                  name="dob"
                  value={form.dob}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-lg bg-transparent border border-white/20 text-sm text-white outline-none focus:border-white/40 transition-colors"
                />
              </div>

              {/* Country */}
              <div>
                <label className="block text-sm text-gray-400 mb-1.5">
                  Country
                </label>
                <select
                  name="country"
                  value={form.country}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-lg bg-[#1a2420] border border-white/20 text-sm text-white outline-none focus:border-white/40 transition-colors">
                  {countries.map((c) => (
                    <option
                      key={c}
                      value={c}
                      className="bg-[#1a1a1a] text-white">
                      {c}
                    </option>
                  ))}
                </select>
              </div>

              {/* Address */}
              <div>
                <label className="block text-sm text-gray-400 mb-1.5">
                  Address
                </label>
                <textarea
                  name="address"
                  placeholder="Full Address"
                  value={form.address}
                  onChange={handleChange}
                  rows={3}
                  className="w-full px-4 py-3 rounded-lg bg-transparent border border-white/20 text-sm text-white placeholder-gray-500 outline-none focus:border-white/40 transition-colors resize-y"
                />
              </div>
            </div>

            {/* Update Button */}
            <div>
              <button className="px-8 py-3 bg-white text-black font-semibold text-sm rounded-lg hover:bg-gray-200 transition-colors">
                Update Profile
              </button>
            </div>
          </div>
        )}

        {/* Withdrawal Settings Tab */}
        {activeTab === "withdrawal" && (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm text-gray-400 mb-1.5">
                  Default Withdrawal Method
                </label>
                <select className="w-full px-4 py-3 rounded-lg bg-[#1a2420] border border-white/20 text-sm text-white outline-none focus:border-white/40 transition-colors">
                  <option>USDT ERC20</option>
                  <option>USDT TRC20</option>
                  <option>ETHEREUM</option>
                  <option>BITCOIN</option>
                </select>
              </div>
              <div>
                <label className="block text-sm text-gray-400 mb-1.5">
                  Wallet Address
                </label>
                <input
                  type="text"
                  placeholder="Enter wallet address"
                  className="w-full px-4 py-3 rounded-lg bg-transparent border border-white/20 text-sm text-white placeholder-gray-500 outline-none focus:border-white/40 transition-colors"
                />
              </div>
            </div>
            <div>
              <button className="px-8 py-3 bg-white text-black font-semibold text-sm rounded-lg hover:bg-gray-200 transition-colors">
                Save Settings
              </button>
            </div>
          </div>
        )}

        {/* Password/Security Tab */}
        {activeTab === "password" && (
          <div className="space-y-6 max-w-md">
            <div>
              <label className="block text-sm text-gray-400 mb-1.5">
                Current Password
              </label>
              <input
                type="password"
                placeholder="Enter current password"
                className="w-full px-4 py-3 rounded-lg bg-transparent border border-white/20 text-sm text-white placeholder-gray-500 outline-none focus:border-white/40 transition-colors"
              />
            </div>
            <div>
              <label className="block text-sm text-gray-400 mb-1.5">
                New Password
              </label>
              <input
                type="password"
                placeholder="Enter new password"
                className="w-full px-4 py-3 rounded-lg bg-transparent border border-white/20 text-sm text-white placeholder-gray-500 outline-none focus:border-white/40 transition-colors"
              />
            </div>
            <div>
              <label className="block text-sm text-gray-400 mb-1.5">
                Confirm New Password
              </label>
              <input
                type="password"
                placeholder="Re-enter new password"
                className="w-full px-4 py-3 rounded-lg bg-transparent border border-white/20 text-sm text-white placeholder-gray-500 outline-none focus:border-white/40 transition-colors"
              />
            </div>
            <div>
              <button className="px-8 py-3 bg-white text-black font-semibold text-sm rounded-lg hover:bg-gray-200 transition-colors">
                Change Password
              </button>
            </div>
          </div>
        )}

        {/* Other Settings Tab */}
        {activeTab === "other" && (
          <div className="space-y-6 max-w-md">
            <div>
              <label className="block text-sm text-gray-400 mb-1.5">
                Language
              </label>
              <select className="w-full px-4 py-3 rounded-lg bg-[#1a2420] border border-white/20 text-sm text-white outline-none focus:border-white/40 transition-colors">
                <option>English</option>
                <option>Spanish</option>
                <option>French</option>
                <option>German</option>
                <option>Chinese</option>
              </select>
            </div>
            <div>
              <label className="block text-sm text-gray-400 mb-1.5">
                Timezone
              </label>
              <select className="w-full px-4 py-3 rounded-lg bg-[#1a2420] border border-white/20 text-sm text-white outline-none focus:border-white/40 transition-colors">
                <option>UTC</option>
                <option>EST</option>
                <option>PST</option>
                <option>GMT</option>
                <option>CET</option>
              </select>
            </div>
            <div>
              <button className="px-8 py-3 bg-white text-black font-semibold text-sm rounded-lg hover:bg-gray-200 transition-colors">
                Save Settings
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
