"use client";

import React, { useEffect, useState, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { Eye, EyeOff, Upload, ShieldCheck, AlertCircle, ArrowRight } from "lucide-react";

type Tab = "personal" | "kyc" | "withdrawal" | "password" | "other";

const tabs: { id: Tab; label: string }[] = [
  { id: "personal", label: "Personal Settings" },
  { id: "kyc", label: "KYC Verification" },
  { id: "withdrawal", label: "Withdrawal Settings" },
  { id: "password", label: "Password/Security" },
  // { id: "other", label: "Other Settings" },
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
    username: string;
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

  const [withdrawalForm, setWithdrawalForm] = useState({
    bankName: "",
    accountName: "",
    accountNumber: "",
    swiftCode: "",
    bitcoinAddress: "",
    ethereumAddress: "",
    litecoinAddress: "",
  });

  const [passwordForm, setPasswordForm] = useState({
    oldPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const [otherSettings, setOtherSettings] = useState({
    withdrawalOTP: true,
    profitEmail: true,
    planExpiryEmail: true,
  });

  const handleWithdrawalChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setWithdrawalForm({ ...withdrawalForm, [e.target.name]: e.target.value });
  };

  const handleOtherSettingsChange = (key: string, value: boolean) => {
    setOtherSettings({ ...otherSettings, [key]: value });
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPasswordForm({ ...passwordForm, [e.target.name]: e.target.value });
  };

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
          username: form.username,
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
                <label className="block text-sm text-gray-400 mb-2 font-medium">Username</label>
                <input type="text" name="username" value={form.username} onChange={handleChange} placeholder="e.g. johndoe4829" className="w-full px-4 py-3.5 rounded-xl bg-white/5 border border-white/10 text-sm text-white outline-none focus:border-[#22c55e]/50 focus:ring-1 focus:ring-[#22c55e]/50 transition-all" />
                <p className="text-xs text-gray-500 mt-1">Lowercase letters and numbers only. Used for your referral link.</p>
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

        {/* Withdrawal Settings Tab */}
        {activeTab === "withdrawal" && (
          <div className="space-y-6 animate-in fade-in slide-in-from-bottom-2 duration-300">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-6">
              {/* Bank Name */}
              <div>
                <label className="block text-[13px] text-gray-300 mb-2 font-medium tracking-wide">Bank Name</label>
                <input type="text" name="bankName" placeholder="Enter bank name" value={withdrawalForm.bankName} onChange={handleWithdrawalChange} className="w-full px-4 py-3 rounded bg-transparent border border-white/10 text-[13px] text-white outline-none focus:border-[#22c55e] transition-all placeholder:text-gray-500" />
              </div>
              {/* Account Name */}
              <div>
                <label className="block text-[13px] text-gray-300 mb-2 font-medium tracking-wide">Account Name</label>
                <input type="text" name="accountName" placeholder="Enter Account name" value={withdrawalForm.accountName} onChange={handleWithdrawalChange} className="w-full px-4 py-3 rounded bg-transparent border border-white/10 text-[13px] text-white outline-none focus:border-[#22c55e] transition-all placeholder:text-gray-500" />
              </div>
              {/* Account Number */}
              <div>
                <label className="block text-[13px] text-gray-300 mb-2 font-medium tracking-wide">Account Number</label>
                <input type="text" name="accountNumber" placeholder="Enter Account Number" value={withdrawalForm.accountNumber} onChange={handleWithdrawalChange} className="w-full px-4 py-3 rounded bg-transparent border border-white/10 text-[13px] text-white outline-none focus:border-[#22c55e] transition-all placeholder:text-gray-500" />
              </div>
              {/* Swift Code */}
              <div>
                <label className="block text-[13px] text-gray-300 mb-2 font-medium tracking-wide">Swift Code</label>
                <input type="text" name="swiftCode" placeholder="Enter Swift Code" value={withdrawalForm.swiftCode} onChange={handleWithdrawalChange} className="w-full px-4 py-3 rounded bg-transparent border border-white/10 text-[13px] text-white outline-none focus:border-[#22c55e] transition-all placeholder:text-gray-500" />
              </div>
              {/* Bitcoin */}
              <div>
                <label className="block text-[13px] text-gray-300 mb-2 font-medium tracking-wide">Bitcoin</label>
                <input type="text" name="bitcoinAddress" placeholder="Enter Bitcoin Address" value={withdrawalForm.bitcoinAddress} onChange={handleWithdrawalChange} className="w-full px-4 py-3 rounded bg-transparent border border-white/10 text-[13px] text-white outline-none focus:border-[#22c55e] transition-all placeholder:text-gray-500" />
                <p className="text-[11px] text-gray-400 mt-2">Enter your Bitcoin Address that will be used to withdraw your funds</p>
              </div>
              {/* Ethereum */}
              <div>
                <label className="block text-[13px] text-gray-300 mb-2 font-medium tracking-wide">Ethereum</label>
                <input type="text" name="ethereumAddress" placeholder="Enter Etherium Address" value={withdrawalForm.ethereumAddress} onChange={handleWithdrawalChange} className="w-full px-4 py-3 rounded bg-transparent border border-white/10 text-[13px] text-white outline-none focus:border-[#22c55e] transition-all placeholder:text-gray-500" />
                <p className="text-[11px] text-gray-400 mt-2">Enter your Ethereum Address that will be used to withdraw your funds</p>
              </div>
              {/* Litecoin */}
              <div className="md:col-span-1">
                <label className="block text-[13px] text-gray-300 mb-2 font-medium tracking-wide">Litecoin</label>
                <input type="text" name="litecoinAddress" placeholder="Enter Litcoin Address" value={withdrawalForm.litecoinAddress} onChange={handleWithdrawalChange} className="w-full px-4 py-3 rounded bg-transparent border border-white/10 text-[13px] text-white outline-none focus:border-[#22c55e] transition-all placeholder:text-gray-500" />
                <p className="text-[11px] text-gray-400 mt-2">Enter your Litecoin Address that will be used to withdraw your funds</p>
              </div>
            </div>
            
            <div className="pt-2">
              <button className="px-10 py-2.5 bg-white text-black font-semibold text-sm rounded hover:bg-gray-200 transition-colors shadow-sm active:scale-95">
                Save
              </button>
            </div>
          </div>
        )}

        {/* Password/Security Tab */}
        {activeTab === "password" && (
          <div className="space-y-6 animate-in fade-in slide-in-from-bottom-2 duration-300">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-6">
              {/* Old Password */}
              <div>
                <label className="block text-[13px] text-gray-300 mb-2 font-medium tracking-wide">Old Password</label>
                <input type="password" name="oldPassword" value={passwordForm.oldPassword} onChange={handlePasswordChange} className="w-full px-4 py-3 rounded bg-transparent border border-white/10 text-[13px] text-white outline-none focus:border-[#22c55e] transition-all" />
              </div>
              {/* New Password */}
              <div>
                <label className="block text-[13px] text-gray-300 mb-2 font-medium tracking-wide">New Password</label>
                <input type="password" name="newPassword" value={passwordForm.newPassword} onChange={handlePasswordChange} className="w-full px-4 py-3 rounded bg-transparent border border-white/10 text-[13px] text-white outline-none focus:border-[#22c55e] transition-all" />
              </div>
              {/* Confirm New Password */}
              <div className="md:col-span-1">
                <label className="block text-[13px] text-gray-300 mb-2 font-medium tracking-wide">Confirm New Password</label>
                <input type="password" name="confirmPassword" value={passwordForm.confirmPassword} onChange={handlePasswordChange} className="w-full px-4 py-3 rounded bg-transparent border border-white/10 text-[13px] text-white outline-none focus:border-[#22c55e] transition-all" />
              </div>
            </div>
            
            <div className="pt-2">
              <button className="px-6 py-2.5 bg-white text-black font-semibold text-sm rounded hover:bg-gray-200 transition-colors shadow-sm active:scale-95">
                Update Password
              </button>
            </div>

            <div className="pt-4">
              <a href="#advance" className="inline-flex items-center gap-1.5 text-[15px] text-white font-medium hover:text-[#22c55e] transition-colors">
                Advance Account Settings <ArrowRight size={18} strokeWidth={2.5} />
              </a>
            </div>
          </div>
        )}

        {/* Other Settings Tab - commented out
        {activeTab === "other" && (
          <div className="space-y-6 animate-in fade-in slide-in-from-bottom-2 duration-300 mt-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-10">
              <div>
                <p className="block text-[14px] text-gray-300 mb-4 font-medium tracking-wide">
                  Send confirmation OTP to my email when withdrawing my funds.
                </p>
                <div className="flex items-center gap-4">
                  <label className="flex items-center gap-1.5 cursor-pointer group">
                    <input type="radio" name="withdrawalOTP" checked={otherSettings.withdrawalOTP} onChange={() => handleOtherSettingsChange("withdrawalOTP", true)} className="w-4 h-4 accent-[#b062ca] bg-transparent border-gray-500 cursor-pointer" />
                    <span className="text-[14px] text-gray-300 group-hover:text-white transition-colors">Yes</span>
                  </label>
                  <label className="flex items-center gap-1.5 cursor-pointer group">
                    <input type="radio" name="withdrawalOTP" checked={!otherSettings.withdrawalOTP} onChange={() => handleOtherSettingsChange("withdrawalOTP", false)} className="w-4 h-4 accent-[#b062ca] bg-transparent border-gray-500 cursor-pointer" />
                    <span className="text-[14px] text-gray-300 group-hover:text-white transition-colors">No</span>
                  </label>
                </div>
              </div>
              <div>
                <p className="block text-[14px] text-gray-300 mb-4 font-medium tracking-wide">
                  Send me email when i get profit.
                </p>
                <div className="flex items-center gap-4">
                  <label className="flex items-center gap-1.5 cursor-pointer group">
                    <input type="radio" name="profitEmail" checked={otherSettings.profitEmail} onChange={() => handleOtherSettingsChange("profitEmail", true)} className="w-4 h-4 accent-[#b062ca] bg-transparent border-gray-500 cursor-pointer" />
                    <span className="text-[14px] text-gray-300 group-hover:text-white transition-colors">Yes</span>
                  </label>
                  <label className="flex items-center gap-1.5 cursor-pointer group">
                    <input type="radio" name="profitEmail" checked={!otherSettings.profitEmail} onChange={() => handleOtherSettingsChange("profitEmail", false)} className="w-4 h-4 accent-[#b062ca] bg-transparent border-gray-500 cursor-pointer" />
                    <span className="text-[14px] text-gray-300 group-hover:text-white transition-colors">No</span>
                  </label>
                </div>
              </div>
              <div className="md:col-span-1">
                <p className="block text-[14px] text-gray-300 mb-4 font-medium tracking-wide">
                  Send me email when my investment plan expires.
                </p>
                <div className="flex items-center gap-4">
                  <label className="flex items-center gap-1.5 cursor-pointer group">
                    <input type="radio" name="planExpiryEmail" checked={otherSettings.planExpiryEmail} onChange={() => handleOtherSettingsChange("planExpiryEmail", true)} className="w-4 h-4 accent-[#b062ca] bg-transparent border-gray-500 cursor-pointer" />
                    <span className="text-[14px] text-gray-300 group-hover:text-white transition-colors">Yes</span>
                  </label>
                  <label className="flex items-center gap-1.5 cursor-pointer group">
                    <input type="radio" name="planExpiryEmail" checked={!otherSettings.planExpiryEmail} onChange={() => handleOtherSettingsChange("planExpiryEmail", false)} className="w-4 h-4 accent-[#b062ca] bg-transparent border-gray-500 cursor-pointer" />
                    <span className="text-[14px] text-gray-300 group-hover:text-white transition-colors">No</span>
                  </label>
                </div>
              </div>
            </div>
            <div className="pt-6">
              <button className="px-10 py-2.5 bg-white text-black font-semibold text-sm rounded hover:bg-gray-200 transition-colors shadow-sm active:scale-95">
                Save
              </button>
            </div>
          </div>
        )}
        */}
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
