"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { Mail, KeyRound, Eye, EyeOff } from "lucide-react";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [remember, setRemember] = useState(false);
  const [formError, setFormError] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormError("");

    const result = await signIn("credentials", {
      email,
      password,
      redirect: false,
      callbackUrl: "/dashboard",
    });

    if (result?.error) {
      setFormError("Invalid email or password.");
      return;
    }

    router.push(result?.url ?? "/dashboard");
  };

  const handleOAuthSignIn = (provider: "google") => {
    setFormError("");
    void signIn(provider, { callbackUrl: "/dashboard" });
  };

  return (
    <div className="min-h-screen bg-[#e8e4f0] flex flex-col items-center justify-center px-4 py-12">
      {/* Logo */}
      <Link href="/" className="mb-10">
        <Image
          src="/logo.png"
          alt="Infinity Digital Trade"
          width={100}
          height={100}
          className="mx-auto"
        />
      </Link>

      {/* Card */}
      <div className="w-full max-w-lg bg-[#1a1e2e] rounded-2xl p-10">
        <h1 className="text-2xl font-bold text-white text-center mb-2">
          Welcome Back
        </h1>
        <p className="text-sm text-gray-400 text-center mb-10">
          Please login to continue
        </p>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Email */}
          <div className="relative">
            <div className="absolute left-4 top-1/2 -translate-y-1/2 text-[#7b6ef6]">
              <Mail size={18} />
            </div>
            <input
              type="email"
              placeholder="name@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full pl-12 pr-4 py-3.5 rounded-lg bg-white text-sm text-gray-800 placeholder-gray-400 outline-none focus:ring-2 focus:ring-[#7b6ef6]/50 transition-all"
            />
          </div>

          {/* Password */}
          <div className="relative">
            <div className="absolute left-4 top-1/2 -translate-y-1/2 text-[#7b6ef6]">
              <KeyRound size={18} />
            </div>
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Enter Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full pl-12 pr-12 py-3.5 rounded-lg bg-white text-sm text-gray-800 placeholder-gray-400 outline-none focus:ring-2 focus:ring-[#7b6ef6]/50 transition-all"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-[#7b6ef6] transition-colors"
              tabIndex={-1}>
              {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
            </button>
          </div>

          {/* Remember me & Forgot password */}
          <div className="flex items-center justify-between">
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={remember}
                onChange={(e) => setRemember(e.target.checked)}
                className="w-4 h-4 rounded border-gray-500 bg-transparent accent-[#7b6ef6]"
              />
              <span className="text-sm text-gray-300">Remember me</span>
            </label>
            <Link
              href="#"
              className="text-sm font-semibold text-white hover:text-[#7b6ef6] transition-colors">
              Forgot password ?
            </Link>
          </div>

          {/* Sign In Button */}
          <button
            type="submit"
            className="w-full py-3.5 rounded-lg bg-[#7b6ef6] hover:bg-[#6a5de6] text-white font-semibold text-base transition-colors duration-200">
            Sign in
          </button>
        </form>

        {formError && (
          <p className="mt-4 text-xs text-amber-300 text-center">{formError}</p>
        )}

        <div className="mt-6 flex flex-col gap-3">
          <button
            type="button"
            onClick={() => handleOAuthSignIn("google")}
            className="w-full py-3 rounded-lg bg-white text-gray-900 font-semibold text-sm hover:bg-gray-100 transition-colors">
            Continue with Google
          </button>
        </div>

        {/* Sign Up Link */}
        <p className="text-center mt-8 text-sm text-gray-400">
          Don&apos;t have an account ?{" "}
          <Link
            href="/register"
            className="text-[#7b6ef6] hover:text-[#9b8ff8] font-medium transition-colors">
            Sign Up
          </Link>
        </p>
      </div>
    </div>
  );
}
