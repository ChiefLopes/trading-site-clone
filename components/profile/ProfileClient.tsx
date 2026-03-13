"use client";

import React, { useEffect, useState, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { Eye, EyeOff, Upload, ShieldCheck, AlertCircle } from "lucide-react";

type Tab = "personal" | "kyc" | "withdrawal" | "password" | "other";

const tabs: { id: Tab; label: string }[] = [
  { id: "personal", label: "Personal Settings" },
  { id: "kyc", label: "KYC Verification" },
  { id: "withdrawal", label: "Withdrawal Settings" },
  { id: "password", label: "Password/Security" },
  { id: "other", label: "Other Settings" },
];

const countries = [
  "United States of America", "United Kingdom", "Canada", "Australia", "Germany", "France", "India", "China", "Japan", "Brazil", "Nigeria", "South Africa", "Mexico", "Russia", "South Korea", "Italy", "Spain", "Netherlands", "Switzerland", "Sweden",
];

interface ProfileClientProps {
  initialData: {
    fullname: string;
    email: string;
    phone: string;
    country: string;
    referralId: string;
  };
}

function ProfileContent({ initialData }: ProfileClientProps) {
  const searchParams = useSearchParams();
  const [activeTab, setActiveTab] = useState<Tab>("personal");
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  
  const [form, setForm] = useState(initialData);
  const [saveStatus, setSaveStatus] = useState<"idle" | "saving" | "saved" | "error">("idle");

  useEffect(() => {
    const tab = searchParams.get("tab") as Tab;
    if (tab && tabs.find((t) => t.id === tab)) {
      setActiveTab(tab);
    }
  }, [searchParams]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSaveProfile = async () => {
    setSaveStatus("saving");
    try {
      const response = await fetch("/api/profile", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          fullname: form.fullname,
          phone: form.phone,
          country: form.country,
        }),
      });
      if (!response.ok) {
        setSaveStatus("error");
        return;
      }
      setSaveStatus("saved");
      setTimeout(() => setSaveStatus("idle"), 3000);
    } catch (error) {
      setSaveStatus("error");
    }
  };

  return (
    <div className="animate-in fade-in duration-500">
      <h1 className="text-2xl md:text-3xl font-semibold text-white mb-6">Account Settings</h1>
      <div className="border border-white/10 rounded-2xl p-6 md:p-8 bg-[#141c18]/50 backdrop-blur-sm shadow-2xl">
        <div className="flex flex-wrap gap-2 mb-8 border-b border-white/5 pb-4">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-6 py-2.5 text-sm font-medium transition-all rounded-xl ${
                activeTab === tab.id
                  ? "bg-[#22c55e] text-white shadow-lg shadow-[#22c55e]/20"
                  : "text-gray-400 hover:text-white hover:bg-white/5"
              }`}>
              {tab.label}
            </button>
          ))}
        </div>

        {activeTab === "personal" && (
          <div className="space-y-6 animate-in fade-in slide-in-from-bottom-2 duration-300">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm text-gray-400 mb-2 font-medium">Fullname</label>
                <input type="text" name="fullname" value={form.fullname} onChange={handleChange} className="w-full px-4 py-3.5 rounded-xl bg-white/5 border border-white/10 text-sm text-white outline-none focus:border-[#22c55e]/50 focus:ring-1 focus:ring-[#22c55e]/50 transition-all" />
              </div>
              <div>
                <label className="block text-sm text-gray-400 mb-2 font-medium">Email Address</label>
                <input type="email" name="email" value={form.email} readOnly className="w-full px-4 py-3.5 rounded-xl bg-white/5 border border-white/10 text-sm text-gray-500 cursor-not-allowed outline-none" />
              </div>
              <div>
                <label className="block text-sm text-gray-400 mb-2 font-medium">Phone Number</label>
                <input type="tel" name="phone" value={form.phone} onChange={handleChange} className="w-full px-4 py-3.5 rounded-xl bg-white/5 border border-white/10 text-sm text-white outline-none focus:border-[#22c55e]/50 focus:ring-1 focus:ring-[#22c55e]/50 transition-all" />
              </div>
              <div>
                <label className="block text-sm text-gray-400 mb-2 font-medium">Country</label>
                <select name="country" value={form.country} onChange={handleChange} className="w-full px-4 py-3.5 rounded-xl bg-[#0a0f0d] border border-white/10 text-sm text-white outline-none focus:border-[#22c55e]/50 transition-all">
                  <option value="">Select Country</option>
                  {countries.map((c) => (<option key={c} value={c}>{c}</option>))}
                </select>
              </div>
            </div>
            
            <div className="pt-4 border-t border-white/5">
              <button 
                onClick={handleSaveProfile} 
                disabled={saveStatus === "saving"} 
                className={`px-10 py-3.5 font-bold text-sm rounded-xl transition-all shadow-lg ${
                  saveStatus === "saved" 
                    ? "bg-[#22c55e] text-white" 
                    : "bg-white text-black hover:bg-gray-200 active:scale-95"
                } disabled:opacity-50`}>
                {saveStatus === "saving" ? "Saving..." : saveStatus === "saved" ? "✓ Changes Saved" : "Save Changes"}
              </button>
            </div>
          </div>
        )}

        {/* KYC Tab */}
        {activeTab === "kyc" && (
           <div className="space-y-8 animate-in fade-in slide-in-from-bottom-2 duration-300">
             <div className="flex items-center gap-4 p-6 rounded-2xl bg-amber-500/10 border border-amber-500/20">
               <AlertCircle className="text-amber-500 shrink-0" size={24} />
               <div>
                  <h4 className="text-white font-semibold text-sm">Identity Verification Required</h4>
                  <p className="text-xs text-amber-200/60 mt-0.5">Please upload valid government-issued identification to lift withdrawal restrictions.</p>
               </div>
             </div>
             <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="border-2 border-dashed border-white/10 rounded-2xl p-10 flex flex-col items-center justify-center hover:bg-white/5 transition-all group cursor-pointer hover:border-[#22c55e]/40">
                   <div className="w-14 h-14 rounded-full bg-white/5 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                      <Upload className="text-gray-400 group-hover:text-[#22c55e]" size={24} />
                   </div>
                   <p className="text-sm text-white font-medium">Front Side of ID</p>
                   <p className="text-[10px] text-gray-500 mt-1">Passport, Driver's License or National ID</p>
                </div>
                <div className="border-2 border-dashed border-white/10 rounded-2xl p-10 flex flex-col items-center justify-center hover:bg-white/5 transition-all group cursor-pointer hover:border-[#22c55e]/40">
                   <div className="w-14 h-14 rounded-full bg-white/5 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                      <Upload className="text-gray-400 group-hover:text-[#22c55e]" size={24} />
                   </div>
                   <p className="text-sm text-white font-medium">Back Side of ID</p>
                   <p className="text-[10px] text-gray-500 mt-1">Back side with address or security features</p>
                </div>
             </div>
             <button className="w-full md:w-auto px-12 py-4 bg-[#22c55e] text-white font-bold rounded-xl flex items-center justify-center gap-2 hover:bg-[#16a34a] transition-all shadow-xl shadow-[#22c55e]/20 hover:scale-[1.02]">
               Submit for Verification <ShieldCheck size={20} />
             </button>
           </div>
        )}
      </div>
    </div>
  );
}

export default function ProfileClient(props: ProfileClientProps) {
  return (
    <Suspense fallback={<div className="text-white animate-pulse">Loading secure profile environment...</div>}>
      <ProfileContent {...props} />
    </Suspense>
  );
}
