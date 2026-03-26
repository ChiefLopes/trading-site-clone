"use client";

import React, { useState, useRef, useEffect, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { toast } from "sonner";
import { CheckCircle, Loader2, ArrowRight } from "lucide-react";
import Link from "next/link";

function OTPForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const email = searchParams.get("email");

  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const [loading, setLoading] = useState(false);
  const [verified, setVerified] = useState(false);
  const inputsRef = useRef<(HTMLInputElement | null)[]>([]);

  useEffect(() => {
    if (!email) {
      // If there's no email, it usually means direct navigation without context.
      // It's safe to direct to login.
      router.push("/login");
    }
  }, [email, router]);

  const handleChange = (index: number, e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/[^0-9]/g, ""); // Allow only digits
    
    // Set the state precisely based on input
    const newOtp = [...otp];
    newOtp[index] = value[value.length - 1] || ""; // Always take last character entered if they type fast
    setOtp(newOtp);

    // Auto-focus next
    if (value && index < 5) {
      inputsRef.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Backspace") {
      const newOtp = [...otp];
      if (newOtp[index] === "" && index > 0) {
        inputsRef.current[index - 1]?.focus();
        newOtp[index - 1] = "";
      } else {
        newOtp[index] = "";
      }
      setOtp(newOtp);
    } else if (e.key === "ArrowLeft" && index > 0) {
      inputsRef.current[index - 1]?.focus();
    } else if (e.key === "ArrowRight" && index < 5) {
      inputsRef.current[index + 1]?.focus();
    }
  };

  const handlePaste = (e: React.ClipboardEvent<HTMLInputElement>) => {
    e.preventDefault();
    const pastedData = e.clipboardData.getData("text/plain").replace(/[^0-9]/g, "").slice(0, 6);
    if (!pastedData) return;

    const newOtp = [...otp];
    for (let i = 0; i < pastedData.length; i++) {
        newOtp[i] = pastedData[i];
    }
    setOtp(newOtp);
    inputsRef.current[Math.min(pastedData.length, 5)]?.focus();
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const code = otp.join("");
    
    if (code.length < 6) {
      toast.error("Please enter the complete 6-digit OTP code.");
      return;
    }

    setLoading(true);
    try {
      const response = await fetch("/api/verify-otp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, otp: code }),
      });
      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Invalid or expired OTP code");
      }

      setVerified(true);
      toast.success("Security code verified!");
      
      // Short delay before sending to dashboard so they see the success animation
      setTimeout(() => router.push("/dashboard"), 1500);
      
    } catch (err: any) {
      toast.error(err.message);
    } finally {
      setLoading(false);
    }
  };

  // If email is null initially, we render nothing until useEffect triggers push
  if (!email) return null;

  if (verified) {
    return (
      <div className="text-center space-y-6 animate-in fade-in zoom-in duration-500">
        <div className="mx-auto w-20 h-20 bg-[#22c55e]/10 border border-[#22c55e]/30 flex items-center justify-center rounded-full animate-bounce-slow">
          <CheckCircle className="text-[#22c55e]" size={42} />
        </div>
        <div>
          <h1 className="text-3xl font-bold text-white mb-3">Email Verified</h1>
          <p className="text-gray-400 text-sm leading-relaxed">
            Your identity has been verified successfully. Taking you to the platform...
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-8 animate-in fade-in duration-500 max-w-sm mx-auto">
      <div className="text-center">
        <h1 className="text-3xl font-bold text-white mb-3">Verify email</h1>
        <p className="text-gray-400 text-sm leading-relaxed">
          We've sent a 6-digit verification code to <span className="text-[#c8e632]">{email}</span>.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-8">
        <div className="flex items-center justify-between gap-2 sm:gap-3">
          {otp.map((digit, i) => (
            <input
              key={i}
              ref={(el) => {
                inputsRef.current[i] = el;
              }}
              type="text"
              inputMode="numeric"
              maxLength={1}
              value={digit}
              onChange={(e) => handleChange(i, e)}
              onKeyDown={(e) => handleKeyDown(i, e)}
              onPaste={handlePaste}
              onFocus={(e) => e.target.select()}
              disabled={loading || verified}
              className="w-12 h-14 sm:w-14 sm:h-16 text-center text-xl sm:text-2xl font-bold text-white bg-[#141c18] border border-white/10 rounded-xl outline-none focus:border-[#22c55e]/50 focus:bg-[#1a2420] focus:ring-1 focus:ring-[#22c55e]/50 transition-all disabled:opacity-50"
            />
          ))}
        </div>

        <button
          type="submit"
          disabled={loading || verified || otp.join("").length < 6}
          className="w-full flex items-center justify-center gap-2 py-4 bg-[#c8e632] hover:bg-[#b4f12c] text-[#0a0f0d] font-bold text-base tracking-wide rounded-xl transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed hover:shadow-[0_0_20px_rgba(180,241,44,0.3)] active:scale-[0.98]">
          {loading ? (
            <>
              <Loader2 className="animate-spin" size={20} /> Verifying...
            </>
          ) : (
            <>Verify Account <ArrowRight size={20} strokeWidth={2.5} /></>
          )}
        </button>
      </form>

      <div className="text-center pt-2">
        <p className="text-[13px] text-gray-500">
          Didn't receive the code?{" "}
          <button className="text-white hover:text-[#22c55e] font-medium transition-colors">
            Resend it
          </button>
        </p>
      </div>
    </div>
  );
}

export default function VerifyOTPPage() {
  return (
    <div className="min-h-screen bg-[#060b09] flex flex-col items-center justify-center p-4">
      <div className="absolute inset-0 bg-gradient-to-t from-[#060b09] via-[#060b09]/30 to-transparent z-0" />
      <div className="absolute -top-40 -left-40 w-[600px] h-[600px] bg-[#c8e632]/5 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute top-40 -right-40 w-[500px] h-[500px] bg-[#22c55e]/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="w-full relative z-10">
        <Suspense fallback={<div className="flex justify-center"><Loader2 className="animate-spin text-[#c8e632]" size={32} /></div>}>
          <OTPForm />
        </Suspense>
      </div>
    </div>
  );
}
