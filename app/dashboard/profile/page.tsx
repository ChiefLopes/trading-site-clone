"use client";

import React, { useState } from "react";
import { UserCircle } from "lucide-react";

export default function ProfilePage() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    country: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  return (
    <div>
      <h1 className="text-2xl font-bold text-white mb-2">Profile</h1>
      <p className="text-gray-400 text-sm mb-8">Manage your account settings</p>

      <div className="max-w-md">
        {/* Avatar */}
        <div className="flex items-center gap-4 mb-8">
          <div className="w-16 h-16 rounded-full bg-[#1a2420] border border-white/10 flex items-center justify-center text-gray-500">
            <UserCircle size={40} />
          </div>
          <div>
            <p className="text-white font-medium">User</p>
            <p className="text-xs text-gray-400">Member</p>
          </div>
        </div>

        {/* Form */}
        <div className="bg-[#111916] border border-white/5 rounded-xl p-6 space-y-5">
          {[
            {
              label: "Full Name",
              name: "name",
              type: "text",
              placeholder: "Your full name",
            },
            {
              label: "Email",
              name: "email",
              type: "email",
              placeholder: "Your email",
            },
            {
              label: "Phone",
              name: "phone",
              type: "tel",
              placeholder: "Your phone number",
            },
            {
              label: "Country",
              name: "country",
              type: "text",
              placeholder: "Your country",
            },
          ].map((field) => (
            <div key={field.name}>
              <label className="block text-sm font-medium text-white mb-1.5">
                {field.label}
              </label>
              <input
                type={field.type}
                name={field.name}
                placeholder={field.placeholder}
                value={form[field.name as keyof typeof form]}
                onChange={handleChange}
                className="w-full px-4 py-2.5 rounded-lg bg-[#1a2420] border border-white/10 text-sm text-white placeholder-gray-500 outline-none focus:border-[#7b6ef6]/50 transition-colors"
              />
            </div>
          ))}

          <button className="w-full py-3 rounded-lg bg-[#7b6ef6] hover:bg-[#6a5de6] text-white font-semibold text-sm transition-colors">
            Update Profile
          </button>
        </div>

        {/* Change Password */}
        <div className="bg-[#111916] border border-white/5 rounded-xl p-6 mt-6 space-y-5">
          <h3 className="text-lg font-semibold text-white">Change Password</h3>
          <div>
            <label className="block text-sm font-medium text-white mb-1.5">
              Current Password
            </label>
            <input
              type="password"
              placeholder="Enter current password"
              className="w-full px-4 py-2.5 rounded-lg bg-[#1a2420] border border-white/10 text-sm text-white placeholder-gray-500 outline-none focus:border-[#7b6ef6]/50 transition-colors"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-white mb-1.5">
              New Password
            </label>
            <input
              type="password"
              placeholder="Enter new password"
              className="w-full px-4 py-2.5 rounded-lg bg-[#1a2420] border border-white/10 text-sm text-white placeholder-gray-500 outline-none focus:border-[#7b6ef6]/50 transition-colors"
            />
          </div>
          <button className="w-full py-3 rounded-lg bg-[#dc2626] hover:bg-[#b91c1c] text-white font-semibold text-sm transition-colors">
            Change Password
          </button>
        </div>
      </div>
    </div>
  );
}
