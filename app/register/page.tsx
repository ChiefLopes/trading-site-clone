"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { Eye, EyeOff } from "lucide-react";

const countries = [
  "Afghanistan",
  "Albania",
  "Algeria",
  "Andorra",
  "Angola",
  "Antigua and Barbuda",
  "Argentina",
  "Armenia",
  "Australia",
  "Austria",
  "Azerbaijan",
  "Bahamas",
  "Bahrain",
  "Bangladesh",
  "Barbados",
  "Belarus",
  "Belgium",
  "Belize",
  "Benin",
  "Bhutan",
  "Bolivia",
  "Bosnia and Herzegovina",
  "Botswana",
  "Brazil",
  "Brunei",
  "Bulgaria",
  "Burkina Faso",
  "Burundi",
  "Cabo Verde",
  "Cambodia",
  "Cameroon",
  "Canada",
  "Central African Republic",
  "Chad",
  "Chile",
  "China",
  "Colombia",
  "Comoros",
  "Congo",
  "Costa Rica",
  "Croatia",
  "Cuba",
  "Cyprus",
  "Czech Republic",
  "Denmark",
  "Djibouti",
  "Dominica",
  "Dominican Republic",
  "Ecuador",
  "Egypt",
  "El Salvador",
  "Equatorial Guinea",
  "Eritrea",
  "Estonia",
  "Eswatini",
  "Ethiopia",
  "Fiji",
  "Finland",
  "France",
  "Gabon",
  "Gambia",
  "Georgia",
  "Germany",
  "Ghana",
  "Greece",
  "Grenada",
  "Guatemala",
  "Guinea",
  "Guinea-Bissau",
  "Guyana",
  "Haiti",
  "Honduras",
  "Hungary",
  "Iceland",
  "India",
  "Indonesia",
  "Iran",
  "Iraq",
  "Ireland",
  "Israel",
  "Italy",
  "Jamaica",
  "Japan",
  "Jordan",
  "Kazakhstan",
  "Kenya",
  "Kiribati",
  "Kuwait",
  "Kyrgyzstan",
  "Laos",
  "Latvia",
  "Lebanon",
  "Lesotho",
  "Liberia",
  "Libya",
  "Liechtenstein",
  "Lithuania",
  "Luxembourg",
  "Madagascar",
  "Malawi",
  "Malaysia",
  "Maldives",
  "Mali",
  "Malta",
  "Marshall Islands",
  "Mauritania",
  "Mauritius",
  "Mexico",
  "Micronesia",
  "Moldova",
  "Monaco",
  "Mongolia",
  "Montenegro",
  "Morocco",
  "Mozambique",
  "Myanmar",
  "Namibia",
  "Nauru",
  "Nepal",
  "Netherlands",
  "New Zealand",
  "Nicaragua",
  "Niger",
  "Nigeria",
  "North Korea",
  "North Macedonia",
  "Norway",
  "Oman",
  "Pakistan",
  "Palau",
  "Palestine",
  "Panama",
  "Papua New Guinea",
  "Paraguay",
  "Peru",
  "Philippines",
  "Poland",
  "Portugal",
  "Qatar",
  "Romania",
  "Russia",
  "Rwanda",
  "Saint Kitts and Nevis",
  "Saint Lucia",
  "Saint Vincent and the Grenadines",
  "Samoa",
  "San Marino",
  "Sao Tome and Principe",
  "Saudi Arabia",
  "Senegal",
  "Serbia",
  "Seychelles",
  "Sierra Leone",
  "Singapore",
  "Slovakia",
  "Slovenia",
  "Solomon Islands",
  "Somalia",
  "South Africa",
  "South Korea",
  "South Sudan",
  "Spain",
  "Sri Lanka",
  "Sudan",
  "Suriname",
  "Sweden",
  "Switzerland",
  "Syria",
  "Taiwan",
  "Tajikistan",
  "Tanzania",
  "Thailand",
  "Timor-Leste",
  "Togo",
  "Tonga",
  "Trinidad and Tobago",
  "Tunisia",
  "Turkey",
  "Turkmenistan",
  "Tuvalu",
  "Uganda",
  "Ukraine",
  "United Arab Emirates",
  "United Kingdom",
  "United States",
  "Uruguay",
  "Uzbekistan",
  "Vanuatu",
  "Vatican City",
  "Venezuela",
  "Vietnam",
  "Yemen",
  "Zambia",
  "Zimbabwe",
];

export default function RegisterPage() {
  const router = useRouter();
  const [form, setForm] = useState({
    email: "",
    name: "",
    username: "",
    phone: "",
    country: "",
    password: "",
    confirmPassword: "",
    referralId: "",
  });
  const [formError, setFormError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormError("");

    if (form.password !== form.confirmPassword) {
      setFormError("Passwords do not match.");
      return;
    }

    setIsSubmitting(true);

    try {
      const response = await fetch("/api/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: form.email,
          name: form.name,
          username: form.username,
          phone: form.phone,
          country: form.country,
          password: form.password,
          referralId: form.referralId,
        }),
      });

      const data = (await response.json()) as { error?: string };

      if (!response.ok) {
        setFormError(data.error || "Registration failed.");
        return;
      }

      const signInResult = await signIn("credentials", {
        email: form.email,
        password: form.password,
        redirect: false,
        callbackUrl: "/dashboard",
      });

      if (signInResult?.error) {
        setFormError("Account created. Please log in.");
        router.push("/login");
        return;
      }

      router.push(signInResult?.url ?? "/dashboard");
    } catch (error) {
      setFormError("Registration failed. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleOAuthSignIn = (provider: "google") => {
    setFormError("");
    void signIn(provider, { callbackUrl: "/dashboard" });
  };

  return (
    <div className="min-h-screen bg-[#0a0f0d] flex flex-col items-center justify-center px-4 py-12">
      {/* Logo */}
      <Link href="/" className="mb-8">
        <Image
          src="/logo.png"
          alt="Infinity Digital Trade"
          width={80}
          height={80}
          className="mx-auto"
        />
      </Link>

      {/* Card */}
      <div className="w-full max-w-md bg-[#111916]/80 border border-white/10 rounded-xl p-8">
        <h1 className="text-xl font-semibold text-white text-center mb-1">
          Welcome to Infinity Digital Trade
        </h1>
        <p className="text-sm text-gray-400 text-center mb-8">
          Please sign up to continue
        </p>

        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Email */}
          <div>
            <label className="block text-sm font-bold text-white mb-1.5">
              Email
            </label>
            <input
              type="email"
              name="email"
              placeholder="Email"
              value={form.email}
              onChange={handleChange}
              required
              className="w-full px-4 py-2.5 rounded-md bg-[#1a2420] border border-white/10 text-sm text-white placeholder-gray-500 outline-none focus:border-[#22c55e]/50 transition-colors"
            />
          </div>

          {/* Name */}
          <div>
            <label className="block text-sm font-bold text-white mb-1.5">
              Name
            </label>
            <input
              type="text"
              name="name"
              placeholder="Full Name"
              value={form.name}
              onChange={handleChange}
              required
              className="w-full px-4 py-2.5 rounded-md bg-[#1a2420] border border-white/10 text-sm text-white placeholder-gray-500 outline-none focus:border-[#22c55e]/50 transition-colors"
            />
          </div>

          {/* Username */}
          <div>
            <label className="block text-sm font-bold text-white mb-1.5">
              Username
            </label>
            <input
              type="text"
              name="username"
              placeholder="Username"
              value={form.username}
              onChange={handleChange}
              required
              className="w-full px-4 py-2.5 rounded-md bg-[#1a2420] border border-white/10 text-sm text-white placeholder-gray-500 outline-none focus:border-[#22c55e]/50 transition-colors"
            />
          </div>

          {/* Phone Number */}
          <div>
            <label className="block text-sm font-bold text-white mb-1.5">
              Phone Number
            </label>
            <input
              type="tel"
              name="phone"
              placeholder="Phone Number"
              value={form.phone}
              onChange={handleChange}
              required
              className="w-full px-4 py-2.5 rounded-md bg-[#1a2420] border border-white/10 text-sm text-white placeholder-gray-500 outline-none focus:border-[#22c55e]/50 transition-colors"
            />
          </div>

          {/* Country */}
          <div>
            <label className="block text-sm font-bold text-white mb-1.5">
              Country
            </label>
            <select
              name="country"
              value={form.country}
              onChange={handleChange}
              required
              className="w-full px-4 py-2.5 rounded-md bg-[#1a2420] border border-white/10 text-sm text-white appearance-none outline-none focus:border-[#22c55e]/50 transition-colors cursor-pointer"
              style={{
                backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' fill='%239ca3af' viewBox='0 0 16 16'%3E%3Cpath d='M1.5 5.5l6.5 6.5 6.5-6.5'/%3E%3C/svg%3E")`,
                backgroundRepeat: "no-repeat",
                backgroundPosition: "right 12px center",
              }}>
              <option value="" disabled className="text-gray-500">
                Choose Country
              </option>
              {countries.map((c) => (
                <option key={c} value={c} className="bg-[#1a2420] text-white">
                  {c}
                </option>
              ))}
            </select>
          </div>

          {/* Password */}
          <div>
            <label className="block text-sm font-bold text-white mb-1.5">
              Password
            </label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                placeholder="Password"
                value={form.password}
                onChange={handleChange}
                required
                className="w-full px-4 py-2.5 pr-12 rounded-md bg-[#1a2420] border border-white/10 text-sm text-white placeholder-gray-500 outline-none focus:border-[#22c55e]/50 transition-colors"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 hover:text-[#22c55e] transition-colors"
                tabIndex={-1}>
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
          </div>

          {/* Confirm Password */}
          <div>
            <label className="block text-sm font-bold text-white mb-1.5">
              Confirm Password
            </label>
            <div className="relative">
              <input
                type={showConfirmPassword ? "text" : "password"}
                name="confirmPassword"
                placeholder="Confirm Password"
                value={form.confirmPassword}
                onChange={handleChange}
                required
                className="w-full px-4 py-2.5 pr-12 rounded-md bg-[#1a2420] border border-white/10 text-sm text-white placeholder-gray-500 outline-none focus:border-[#22c55e]/50 transition-colors"
              />
              <button
                type="button"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 hover:text-[#22c55e] transition-colors"
                tabIndex={-1}>
                {showConfirmPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
          </div>

          {/* Referral ID */}
          <div>
            <label className="block text-sm font-bold text-white mb-1.5">
              Referral ID
            </label>
            <input
              type="text"
              name="referralId"
              placeholder="Referral ID (optional)"
              value={form.referralId}
              onChange={handleChange}
              className="w-full px-4 py-2.5 rounded-md bg-[#1a2420] border border-white/10 text-sm text-white placeholder-gray-500 outline-none focus:border-[#22c55e]/50 transition-colors"
            />
          </div>

          {/* Submit */}
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full py-3 rounded-md bg-[#dc2626] hover:bg-[#b91c1c] disabled:opacity-60 disabled:cursor-not-allowed text-white font-semibold text-sm transition-colors duration-200">
            {isSubmitting ? "Creating account..." : "Create Account"}
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

        {/* Sign In Link */}
        <p className="text-center mt-5">
          <Link
            href="/login"
            className="text-sm text-gray-400 hover:text-white underline transition-colors">
            Sign In
          </Link>
        </p>
      </div>
    </div>
  );
}
